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
    // applyNow = (id) => {
    //     this.props.history.push('/apply')
    // /jobs/detail/apply/{this.props.match.params.id}
    // }

    render() {
        return (
            <div>
            <h1>Job Detail Page</h1>
            <h2>Is this working?</h2>
            <p>{this.props.match.params.id}</p>
            {/* render rest of data here */}
            <p>{this.props.details.budget}</p>
            <Button onClick={this.applyNow}>Apply</Button>
            </div>
        )}}

const mapStateToProps = state => ({
    user: state.user,
    skills: state.allSkillsReducer,
    selectedUserSkills: state.userSkillsReducer,
    details: state.jobDetailsReducer,
});

export default connect(mapStateToProps)(JobDetail);