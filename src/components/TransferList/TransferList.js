import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, ListItemText, Typography, Paper, Tooltip } from '@material-ui/core';

const styles = theme => ({
    paper: {
        width: '100%',
        minWidth: 200,
        height: 250,
        overflow: 'scroll'
    },
    listField: {
        position: 'relative'
    }
});

class TransferList extends Component {
    state = {
        availableSkills: [],
        selectedSkills: []
    };

    //sends post request for clicked skill ID
    addSkill = skillId => {
        this.props.dispatch({ type: 'ADD_SKILL', payload: { id: skillId } });
    };

    //sends delete request for clicked skill ID
    removeSkill = skillId => {
        this.props.dispatch({ type: 'REMOVE_SKILL', payload: { id: skillId } });
    };

    //function to map over all skills and remove any that are matches of user's skills
    getAvailableSkills = () => {
        return this.props.allSkills.map(skill =>
            this.props.user.skills.some(userSkill => userSkill.id === skill.id) ? null : (
                <Tooltip key={skill.id} title="Add to Your Skills" placement="right">
                    <ListItem role="listitem" button onClick={() => this.addSkill(skill.id)}>
                        <ListItemText primary={skill.tag} />
                    </ListItem>
                </Tooltip>
            )
        );
    };

    //function get list of user's skills
    getUserSkills = () => {
        return this.props.user.skills.map(skill => (
            <Tooltip key={skill.id} title="Remove From Your Skills" placement="left">
                <ListItem
                    key={skill.id}
                    role="listitem"
                    button
                    onClick={() => this.removeSkill(skill.id)}>
                    <ListItemText primary={skill.tag} />
                </ListItem>
            </Tooltip>
        ));
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid item container spacing={4} justify="center" align="center">
                {/* AVAILABLE SKILLS LIST */}
                <Grid item container spacing={2} xs={12} sm={5}>
                    <Grid item xs={12} align="center">
                        <Typography variant="subtitle2" color="primary" gutterBottom>
                            <b>AVAILABLE SKILLS</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.listField}>
                        <Paper className={classes.paper} justify="center">
                            <List>{this.getAvailableSkills()}</List>
                        </Paper>
                    </Grid>
                </Grid>

                {/* YOUR SKILLS LIST */}
                <Grid item container spacing={2} xs={12} sm={5}>
                    <Grid item xs={12} align="center">
                        <Typography variant="subtitle2" color="secondary" gutterBottom>
                            <b>YOUR SKILLS</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.listField}>
                        <Paper className={classes.paper} justify="center">
                            <List>{this.props.user.skills && this.getUserSkills()}</List>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    // user: state.user,
    allSkills: state.allSkillsReducer,
    userSkills: state.userSkillsReducer
});

export default connect(mapStateToProps)(withStyles(styles)(TransferList));
