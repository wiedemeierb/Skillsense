import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';


class JobDetail extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_JOB_DETAIL',
            payload: { id: Number(this.props.match.params.id) }
        })
    }
    //find route to apply for this job.
    applyNow = (id) => {
        this.props.history.push(`/jobs/detail/apply/${this.props.match.params.id}`)
    }

    render() {
        return (
            <div>
                <Typography variant="h2" color="primary">{this.props.details.project_title}</Typography>
                <Typography variant="h4" color="secondary">Client Name Here</Typography>
                <br></br>
                <Typography variant="h5" color="primary">Description:</Typography>
                <Typography>{this.props.details.description}</Typography>
                <br></br>
                <Typography variant="h5" color="primary">Desired Skills:</Typography>

                {/* {this.props.job.skill_names[0] !== null && this.props.job.skill_names.map((skill, i) => {
                    return (
                        <Typography key={i} className="skill-tag">
                            {skill}
                        </Typography>
                    )
                })} */}

                <Typography>{this.props.details.skill_names}</Typography>
                <br></br>
                <Typography variant="h5" color="primary">Application</Typography>
                <Typography>Name: {this.props.user.username}</Typography>
                <Typography>Focus Skill: {this.props.user.focus_skill}</Typography>
                <Typography>Location: {this.props.user.location}</Typography>
                <Button variant="contained" color="primary" onClick={this.applyNow}>Apply</Button>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    skills: state.allSkillsReducer,
    selectedUserSkills: state.userSkillsReducer,
    details: state.jobDetailsReducer,
});

export default connect(mapStateToProps)(JobDetail);