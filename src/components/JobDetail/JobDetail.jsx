import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//COMPONENT IMPORTS
import SkillList from '../SkillList/SkillList';
//MATERIAL-UI IMPORTS
import { Typography, Button, Grid } from '@material-ui/core';
import OneColumnLayout from '../OneColumnLayout/OneColumnLayout'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        display: 'block',
        margin: theme.spacing(3, 0),
        padding: theme.spacing(1),
        color: 'white'
    },
});

class JobDetail extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_JOB_DETAIL',
            payload: { id: Number(this.props.match.params.id) }
        });
    }
    //find route to apply for this job.
    applyNow = () => {
        this.props.history.push(`/jobs/detail/apply/${this.props.match.params.id}`);
    };

    viewApplicants = () => {
        this.props.history.push(`/jobs/detail/applications/${this.props.match.params.id}`);
    };

    routeBack = () => {
        this.props.history.push(`/search/jobs`);
    };

    routeBackClient = () => {
        this.props.history.push(`/jobs`);
    };

    markedCompleted = () => {
        console.log('mark completed working')
        this.props.dispatch({
            type: 'MARK_JOB_COMPLETED',
            payload: {id: this.props.match.params.id}
        })
    }

    render() {
        let { details } = this.props;

        //checks if user type should be able to view this element
        let isStudent = () => {
            return this.props.user.access_id === 1;
        };
        let isClient = () => {
            return this.props.user.access_id === 3;
        };

        return (
            <div>
                <OneColumnLayout header="Job Details">
                <Grid spacing={3} container justify="center">
                <Grid item xs={12} align="center">
                    <Typography variant="h3" color="primary">
                    {details.project_title}
                    </Typography> 
                </Grid>
                 <Grid item xs={12} align="center">  
                    <Typography variant="h4" color="secondary">
                    Client: {details.username}
                    </Typography>
                    <Typography>Seeking: {details.position_title}</Typography>
                    <Typography>Location: {details.location}</Typography>
                    <Typography>Duration: {details.duration}</Typography>
                    <Typography>Budget: {details.budget}</Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h5" color="primary">
                    Description:
                    </Typography>
                    <Typography>{details.description}</Typography>
                </Grid>
                <Grid item xs={12} align="center">
                <Typography variant="h5" color="primary">
                    Desired Skills:
                </Typography>
                <SkillList skillList={details.skills} />
                </Grid>

                {isStudent() && this.props.details.hired === null ?
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={this.applyNow}>Apply</Button>
                        <Button
                            variant="contained" color="secondary" align="space-around" onClick={() => this.routeBack()}>
                            Back
                        </Button>
                </Grid> : null}

                {isClient() && (
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={this.viewApplicants}>
                        View Applicants
                    </Button>
                    {this.props.details.status_id === 3 &&
                    <Button variant="outlined" color="primary" onClick={this.markedCompleted}>
                        Completed Project
                    </Button>}
                    <Button
                        variant="contained" color="secondary" align="space-around" onClick={() => this.routeBackClient()}>
                        Back
                    </Button>
                </Grid>
                )}
                </Grid>
                </OneColumnLayout>
            </div>
            
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    skills: state.allSkillsReducer,
    selectedUserSkills: state.userSkillsReducer,
    details: state.selectedJobReducer
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(JobDetail)));
