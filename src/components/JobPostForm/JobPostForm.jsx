import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { OutlinedInput, Button, Typography, Grid, Paper, List, ListItem, ListItemText } from '@material-ui/core';

const styles = theme => ({
    root: {
        margin: 'auto',
        width: '50%'
    },
    paper: {
        width: 200,
        height: 230,
        overflow: 'scroll',
    }
});

class JobPostForm extends Component {
    state = {
        project_title: '',
        position_title: '',
        description: '',
        duration: '',
        budget: 0,
        mentor_required: true,
        status_id: 1,
        client_id: 0,
        selected: []
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_ALL_SKILLS' });
    }

    handleInput = (event, property) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
            this.props.dispatch({
                type: 'POST_JOB',
                payload: this.state
            })
            this.setState({
                project_title: '',
                position_title: '',
                description: '',
                duration: '',
                budget: '',
                mentor_required: true,
                status_id: 1,
                client_id: 0,
                selected: []
            })
        }

    addSkill = skill => {
        console.log(skill);
        this.setState({
            selected: [...this.state.selected, skill]
        });
    };

    removeSkill = skillToRemove => {
        console.log(skillToRemove);
        this.setState({
            selected: this.state.selected.filter(
                skill => skill !== skillToRemove
            )
        });
    };

    render() {
        console.log(this.state)
        const { classes } = this.props;
        const renderAvailable =
            this.props.available
                .filter(skill => !this.state.selected.includes(skill))
                .map(skill => (
                    <ListItem
                        key={skill.id}
                        role='listitem'
                        button
                        onClick={() => this.addSkill(skill)}>
                        <ListItemText primary={skill.tag} />
                    </ListItem>
                ));
        const renderSelected =
            this.state.selected.map(skill => (
                <ListItem
                    key={skill.id}
                    role='listitem'
                    button
                    onClick={() => this.removeSkill(skill)}>
                    <ListItemText primary={skill.tag} />
                </ListItem>
            ));

        let isAuthorized = ()=>{
            return (this.props.user.access_id === 3)
        }
        return (
            <Paper>
            { isAuthorized() ?
            <form onSubmit={this.handleSubmit}>
                <OutlinedInput type="text" title="Project Name" placeholder="Project Name" value={this.state.project_title} onChange={(event) => {this.handleInput(event, 'project_title')}} required={true}/>
                <OutlinedInput type="text" title="Seeking Position" placeholder="Seeking Position" value={this.state.position_title} onChange={(event) => { this.handleInput(event, 'position_title') }} required={true}/>
                <OutlinedInput type="text" title="Project Description" placeholder="Project Description" value={this.state.description} onChange={(event) => { this.handleInput(event, 'description') }} required={true}/>
                <OutlinedInput type="text" title="Project Duration" placeholder="Project Duration" value={this.state.duration} onChange={(event) => { this.handleInput(event, 'duration') }} required={true}/>
                <OutlinedInput type="text" title="Project Budget" placeholder="Project Budget" value={this.state.budget} onChange={(event) => { this.handleInput(event, 'budget') }}  required={true}/>
                {/* <input type="checkbox" label="Mentor required" title="Mentor Required" placeholder="Mentor Required" value={this.state.mentor_required} onChange={(event) => { this.handleInput(event, 'mentor_required') }} /> */}
                <br/>
                <Typography>Skill Tags</Typography>
                <Grid
                    container
                    spacing={2}
                    justify='space-evenly'
                    className={classes.root}
                    >
                    <Grid item xs={5}>
                        <Typography variant='subtitle2' align="center">
                            Available Skills
					</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant='subtitle2' align="center">
                            Selected Skills
					</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper className={classes.paper}>
                            <List>{renderAvailable}</List>
                        </Paper>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper className={classes.paper}>
                            <List>{renderSelected}</List>
                        </Paper>
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
            : <Typography variant="h3">You are not authorized to view this page.</Typography>
            }
            </Paper>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        available: store.allSkillsReducer,
        user: store.user
    }
}

export default withStyles(styles)(connect(mapStateToProps)(JobPostForm));