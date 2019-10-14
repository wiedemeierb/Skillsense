import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import SkillList from '../SkillList/SkillList';

class JobDetail extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_JOB_DETAIL',
            payload: { id: Number(this.props.match.params.id) }
        });
    }
    //find route to apply for this job.
    applyNow = id => {
        this.props.history.push(`/jobs/detail/apply/${this.props.match.params.id}`);
    };

    viewApplicants = id => {
        this.props.history.push(`/jobs/detail/applicants/${this.props.match.params.id}`);
    };

    render() {
        let { details } = this.props;

        //checks if user type should be able to view this element
        let isStudent = () => {
            return this.props.user.access_id === 1;
        };
        let isClient = () => {
            return this.props.user.access_id === 3;
        };

        // //checks if user type should be able to view this element
        // let isClient = () => {
        //     return (this.props.user.access_id === 3)
        // }

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
                {isStudent() && (
                    <div>
                        <Typography variant="h5" color="primary">
                            Application:
                        </Typography>
                        <Typography>Name: {this.props.user.username}</Typography>
                        <Typography>Focus Skill: {this.props.user.focus_skill}</Typography>
                        <Typography>Location: {this.props.user.location}</Typography>
                        <Button variant="contained" color="primary" onClick={this.applyNow}>
                            Apply
                        </Button>
                    </div>
                )}
                {isClient() && (
                    <Button variant="contained" color="primary" onClick={this.viewApplicants}>
                        View Applicants
                    </Button>
                )}
                {/* {isClient() && <ApplicantsList/>} */}
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

export default connect(mapStateToProps)(JobDetail);
