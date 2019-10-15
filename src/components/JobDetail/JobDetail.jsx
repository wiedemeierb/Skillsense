import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//COMPONENT IMPORTS
import SkillList from '../SkillList/SkillList';
//MATERIAL-UI IMPORTS
import { Typography, Button } from '@material-ui/core';

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
                <br />
                <Typography variant="h3" align="center">
                    Job Details
                </Typography>
                <br />
                <Typography variant="h2" color="primary">
                    {details.project_title}
                </Typography>
                <br />
                <Typography variant="h4" color="secondary">
                    {details.username}
                </Typography>
                <br />
                <Typography>Seeking: {details.position_title}</Typography>
                <Typography>Location: {details.location}</Typography>
                <Typography>Duration: {details.duration}</Typography>
                <Typography>Budget: {details.budget}</Typography>
                <br />
                <Typography variant="h5" color="primary">
                    Description:
                </Typography>
                <Typography>{details.description}</Typography>
                <br />
                <Typography variant="h5" color="primary">
                    Desired Skills:
                </Typography>
                <SkillList skillList={details.skills} />
                <br />
                <br />

                {isStudent() && this.props.details.hired === null ?
                    <div>
                        <Typography variant="h5" color="primary">
                            Application:
                        </Typography>
                        <Typography>Name: {this.props.user.username}</Typography>
                        <Typography>Focus Skill: {this.props.user.focus_skill}</Typography>
                        <Typography>Location: {this.props.user.location}</Typography> 
                    <Button variant="contained" color="primary" onClick={this.applyNow}>Apply</Button>
                        <Button
                            variant="contained" color="secondary" align="space-around" onClick={() => this.routeBack()}>
                            Back
                        </Button>
                    </div> : null}
                {isClient() && (
                    <div>
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
                    </div>
                )}
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

export default withRouter(connect(mapStateToProps)(JobDetail));
