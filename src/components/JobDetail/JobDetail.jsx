import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Chip } from '@material-ui/core';
import SkillList from '../SkillList/SkillList';


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
        let {details} = this.props
        return (
            <div>
                <br></br>
                <Typography variant="h2" color="primary">{details.project_title}</Typography>
                <br></br>
                <Typography variant="h4" color="secondary">{details.username}</Typography>
                <br></br>
                <Typography variant="h5" color="primary">Description:</Typography>
                <Typography>{details.description}</Typography>
                <br></br>
                <Typography variant="h5" color="primary">Desired Skills:</Typography>
                <SkillList skillList={details.skills} />
                <br></br>
                <br></br>
                <Typography variant="h5" color="primary">Application:</Typography>
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
    details: state.selectedJobReducer,
});

export default connect(mapStateToProps)(JobDetail);