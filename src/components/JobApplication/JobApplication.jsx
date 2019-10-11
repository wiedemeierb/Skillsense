import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, TextField, Button } from '@material-ui/core';

class JobApplication extends Component {
    state = {
        cover_letter: '',
        resume: 'N/A',
        mentor_id: null,
        payment_terms: 'negotiable'
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_JOB_DETAIL',
            payload: { id: Number(this.props.match.params.id) }
        })
        this.props.dispatch({
            type: 'FETCH_ACTIVE_MENTORS'
        });
    }

    //Saves the text from input on change
    handleInput = (event, property) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    //Submits the full application details from local state to save in the database
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'SUBMIT_APPLICATION',
            payload: {
                ...this.state,
                job_id: Number(this.props.match.params.id)
            }
        })
    }

    render() {
        //checks if user type should be able to view this page
        let isAuthorized = () => {
            return (this.props.user.access_id === 1)
        }

        return (
            <div>
                {isAuthorized() ?
                    <div>
                        <h1>Job Application Page</h1>
                        {/* Client Info */}
                        <div>
                            <Typography>{this.props.job.username}</Typography>
                            <Typography>{this.props.job.location}</Typography>
                        </div>
                        {/* Job Info */}
                        <div>
                            <Typography>{this.props.job.position_title}</Typography>
                            <Typography>{this.props.job.project_title}</Typography>
                            <Typography>Budget: $<span>{this.props.job.budget}</span></Typography>
                            <Typography>Duration: <span>{this.props.job.duration}</span></Typography>
                            {this.props.job.skill_names[0] !== null && this.props.job.skill_names.map((skill, i) => {
                                return (
                                    <Typography key={i} className="skill-tag">
                                        {skill}
                                    </Typography>
                                );
                            })}
                        </div>
                        {/* Cover Letter and Resume */}
                        <div>
                            <Typography variant="h6">Cover Letter</Typography>
                            <TextField id="standard-name"
                                label="Add your cover letter..."
                                value={this.state.cover_letter}
                                onChange={(event) => { this.handleInput(event, 'cover_letter') }}
                                margin="normal"
                                fullWidth={true}
                                multiline={true}
                                rows={4}
                            />
                        </div>
                        {/* Insert Resume attachment functionality here */}
                        {/* Mentor Info */}
                        <div>
                            <Typography variant="h6">Invite a Mentor</Typography>
                            {this.props.mentors.map((user) => {
                                return (
                                    <div value={user.id} onChange={(event) => { this.handleInput(event, 'mentor_id') }}>
                                        <Typography>{user.username}</Typography>
                                        <Typography>{user.focus_skill}</Typography>
                                        <Typography><span>{user.skill_names.length}</span> Matching Skill{user.skill_names.length > 1 && 's'}</Typography>
                                    </div>
                                )
                            })}
                        </div>
                        <br />
                        {/* User Info */}
                        <div>
                            <Typography variant="h6">Your Account Information</Typography>
                            <Typography>{this.props.user.username}</Typography>
                            <Typography>{this.props.user.focus_skill}</Typography>
                            <Typography>{this.props.user.location}</Typography>
                            <Typography>{this.props.user.github_url}</Typography>
                            <Typography>{this.props.user.linkedin_url}</Typography>
                            <Typography>{this.props.user.website}</Typography>
                        </div>
                        {/* <Button variant="contained" color="secondary" onClick={this.props.history.push('/search/jobs')}>Cancel</Button> */}
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
                    </div>
                    : <Typography>You are not authorized to view this page.</Typography>}
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        job: store.allJobsReducer[0],
        user: store.user,
        mentors: store.allMentorsReducer
    }
}

export default connect(mapStateToProps)(JobApplication);