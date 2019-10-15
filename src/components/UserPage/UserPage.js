import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import OneColumnLayout from '../OneColumnLayout/OneColumnLayout';
import PublicProfile from '../PublicProfile/PublicProfile';
import EditProfile from '../EditProfile/EditProfile';

//MATERIAL-UI IMPORTS
import { Grid, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        display: 'block',
        padding: theme.spacing(1),
        color: 'white'
    },
    statusBadge: {
        display: 'block',
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    }
});

class UserPage extends Component {
    state = {
        username: '',
        email: '',
        location: '',
        focus_skill: '',
        github_url: '',
        linkedin_url: '',
        website_url: '',
        bio: '',
        skills: [],
        inEditMode: false
    };

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_USER' });
        this.props.dispatch({ type: 'FETCH_ALL_SKILLS' });
        this.setState({
            ...this.props.user
        });
    };
    //handler for all input fields -- go DRY
    handleInputChangeFor = (event, name) => {
        this.setState({
            [name]: event.target.value
        });
    };

    //toggles profile between read mode and edit mode
    toggleEdit = () => {
        this.setState({ inEditMode: !this.state.inEditMode });
    };

    //saves profile changes to database
    editUserInfo = () => {
        // console.log('handleClick saveSkills operations');
        // console.log('this is state on didMount', this.state);
        this.props.dispatch({
            type: 'EDIT_USER_INFO',
            payload: this.state
        });
    };

    //sends mentorship application to database for admin review
    submitForReview = () => {
        this.props.dispatch({
            type: 'REQUEST_ADMIN_REVIEW'
        });
    };

    render() {
        const { classes } = this.props;

        const mentorSectionHtml = () => {
            if (this.props.user.access_id === 2) {
                if (this.props.user.approved_mentor === 3) {
                    return (
                        <Typography className={classes.statusBadge}>Approved by Admin</Typography>
                    );
                } else if (this.props.user.approved_mentor === 2) {
                    return (
                        <Typography className={classes.statusBadge}>
                            Pending Admin Approval
                        </Typography>
                    );
                } else {
                    return (
                        <Button
                            className={classes.statusBadge}
                            variant="contained"
                            color="secondary"
                            onClick={this.submitForReview}>
                            Submit For Admin Review
                        </Button>
                    );
                }
            } else {
                return null;
            }
        };

        return (
            <OneColumnLayout header="Your Profile">
                <Grid container justify="space-around">
                    <Grid item xs={12}>
                        {this.state.inEditMode ? (
                            <EditProfile
                                user={this.props.user}
                                skills={this.props.skills}
                                toggleEdit={this.toggleEdit}
                            />
                        ) : (
                            <PublicProfile user={this.props.user} />
                        )}
                    </Grid>
                    <Grid item xs={3} align="center">
                        <Button
                            variant="contained"
                            fullWidth={true}
                            color="secondary"
                            className={classes.button}
                            onClick={this.toggleEdit}>
                            {this.state.inEditMode ? 'Cancel' : 'Edit'}
                        </Button>
                        {this.state.inEditMode === false && mentorSectionHtml()}
                    </Grid>
                </Grid>
            </OneColumnLayout>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    skills: state.allSkillsReducer
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(UserPage));
