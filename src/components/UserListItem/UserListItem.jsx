import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
// import SkillList from '../SkillList/SkillList';
// import MentorRequest from '../MentorRequest/MentorRequest';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flexbox',
        flexDirection: 'column'
    },
    listItem: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        // width: '',
        padding: '20px 20px 10px',
        borderBottom: '1px solid gray'
    },
    skillTag: {
        display: 'inline-block',
        margin: '2px',
        padding: '2px',
        color: 'white'
        // backgroundColor: 'black'
    },
    button: {
        margin: theme.spacing(1),
        color: 'white'
    }
});

class UserListItem extends Component {
    viewDetails = () => {
        //this dispatch for clients viewing student applications
        if (this.props.user.access_id === 3) {
            this.props.dispatch({
                type: 'FETCH_APPLICATION',
                payload: this.props.listUser.id
            });
            
        } else {
            //dispatch for any other user details
            this.props.dispatch({
                type: 'FETCH_SELECTED_USER',
                payload: this.props.listUser.id
            });
        }
    };

    render() {
        const { classes } = this.props;

        let isClient = () => {
            return this.props.user.access_id === 1;
        };

        return (
            <Grid
                container
                spacing={2}
                direction="row"
                justify="space-between"
                align="top"
                className={classes.listItem}>
                {/* left side info */}
                <Grid item xs={5}>
                    <Typography color="primary" variant="h5">
                        {this.props.listUser.username}
                    </Typography>
                    <Typography variant="h6">{this.props.listUser.focus_skill}</Typography>
                    {/* user skillList if desired on userItem... */}
                    {/* {this.props.user.skill_names[0] && (
                        <SkillList skillList={this.props.user.skills} />)} */}
                </Grid>
                {/* right side info */}
                <Grid item xs={7}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.viewDetails()}>
                        View Details
                    </Button>
                    {/* If the user is a mentor, the Request Mentor button will appear in the list row */}
                    {this.props.user.access_id === 1 &&
                    this.props.listUser.access_id === 2 &&
                    this.props.listUser.accepted === undefined ? (
                        <MentorRequest mentor={this.props.listUser} />
                    ) : null}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(UserListItem));
