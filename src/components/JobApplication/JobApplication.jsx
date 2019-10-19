import React, { Component } from 'react';
import { connect } from 'react-redux';
//COMPONENT IMPORTS
import OneColumnLayout from '../OneColumnLayout/OneColumnLayout';
import SkillList from '../SkillList/SkillList';
import JobApplicationMentorListItem from '../JobApplicationMentorListItem/JobApplicationMentorListItem';
//MATERIAL-UI IMPORTS
import {
    Grid,
    Typography,
    TextField,
    Button,
    Divider
    // InputAdornment
} from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
//STYLING IMPORTS
import { withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';

const styles = theme => ({
    root: {
        margin: 'auto',
        width: '70vw'
    },
    mentorList: {
        overflowX: 'scroll',
        overflowY: 'hidden',
        maxHeight: '50vh'
    },
    largeFormControl: {
        margin: theme.spacing(1)
    },
    file: {
        margin: theme.spacing(1)
    },
    button: {
        padding: theme.spacing(0,2,0,0)
    }
});
class JobApplication extends Component {
//START BRANCH
    state = {
        cover_letter: '',
        mentor_id: null,
        payment_terms: 'negotiable',
        attachment_url: '',
        file: { name: '' }
    };
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_JOB_DETAIL',
            payload: { id: Number(this.props.match.params.id) }
        });
        this.props.dispatch({
            type: 'FETCH_ACTIVE_MENTORS'
        });
    }

    handleInput = (event, property) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to redact your application!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#04b8f3',
            cancelButtonColor: '#505d68',
            confirmButtonText: 'Yes, submit it!'
        }).then(result => {
            if (result.value) {
                this.props.dispatch({
                    type: 'SUBMIT_APPLICATION',
                    payload: {
                        application: {...this.state },
                        job: this.props.job
                    }
                });
                this.props.history.push(`/jobs/detail/${this.props.match.params.id}`);
            }
        });
    };

    //on application submission, return to job search
    routeBack = () => {
        this.props.history.push(`/search/jobs`);
    };

    //upload resume file
    handleUploadInputChange = e => {
        console.log(e.target.files[0]);
        this.setState({ file: e.target.files[0] });
    };

    //select mentor for job
    handleSelect = id => {
        this.state.mentor_id === id
            ? this.setState({ mentor_id: null })
            : this.setState({ mentor_id: id });
    };

    //list of mentors will be sorted by matching skills
    sortMentors = (mentors, jobSkills) => {
        mentors.forEach(mentor => {
            mentor.matchingSkillCount = mentor.skills.filter(tag =>
                jobSkills.map(skill => skill.id).includes(tag.id)
            ).length;
        });
        return mentors.sort((a, b) => b.matchingSkillCount - a.matchingSkillCount);
    };

    render() {
        const { classes } = this.props;

        //checks if user should be able to view page
        let isStudent = () => {
            return this.props.user.user_type === 'Student';
        };

        return (
            <OneColumnLayout header="Job Application">
                {isStudent() ? (
                    <Grid container className={classes.root} spacing={4}>
                        {/* JOB INFO */}
                        <Grid item container xs={12} sm={6} spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4" color="primary">
                                    {this.props.job.position_title}
                                </Typography>
                                <Typography variant="h5" >
                                    {this.props.job.project_title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" color="secondary">
                                    <b>Client:</b>  <span>{this.props.job.username}</span>
                                </Typography>
                                <Typography variant="subtitle2" color="secondary">
                                    <b>Location:</b>  <span>{this.props.job.location}</span>
                                </Typography>
                                <Typography variant="subtitle2" color="secondary">
                                    <b>Duration:</b>  <span>{this.props.job.duration}</span>
                                </Typography>
                                <Typography variant="subtitle2" color="secondary">
                                    <b>Budget:</b>  <span>${this.props.job.budget}</span>
                                </Typography>
                            </Grid>
                        </Grid>

                        {/* DESIRED SKILLS */}
                        <Grid item xs={12} sm={6} align="right">
                            {this.props.job.skills && (
                                <SkillList skillList={this.props.job.skills} />
                            )}
                        </Grid>

                        {/* SECTION DIVIDER BETWEEN FORM */}
                        <Grid item xs={12} className={classes.divider}>
                            <Divider />
                        </Grid>

                        {/* COVER LETTER FORM */}
                        <Grid item container xs={12} spacing={4} justify="center">
                            <Grid item xs={12}>
                                <Typography variant="h6" align="left">
                                    Cover Letter
                                </Typography>
                                <TextField
                                    id="standard-name"
                                    align="center"
                                    multiline
                                    rows="4"
                                    fullWidth
                                    variant="outlined"
                                    helperText="Write your cover letter to the client here.
                                    Explain what would make you a good fit for this job."
                                    value={this.state.cover_letter}
                                    // onClick={() => { this.setState({ ...this.state, cover_letter: "Hi Jim! I've been working on React primarily for the last couple months, and Full-Stack Javascript before that. I would love the opportunity to work on your event scheduler!"}) }}
                                    onChange={event => {
                                        this.handleInput(event, 'cover_letter');
                                    }}
                                    className={classes.largeFormControl}
                                />
                            </Grid>
                        </Grid>

                        {/* RESUME UPLOAD */}
                        <Grid
                            item
                            container
                            xs={12}
                            spacing={4}
                            align="left"
                            justify="space-around">
                            <Grid item xs={12}>
                                <Typography variant="h6">Attach Resume</Typography>
                            </Grid>
                            <Grid item>
                                <input
                                    accept=".pdf"
                                    className={classes.input}
                                    style={{ display: 'none' }}
                                    id="file-upload"
                                    multiple
                                    type="file"
                                    onChange={this.handleUploadInputChange}
                                />
                                <label htmlFor="file-upload">
                                    <Button variant="contained" color="primary" component="span" className={classes.button}>
                                        <AttachFileIcon fontSize="small" className={classes.file}/>{' '}
                                        <Typography>Upload PDF File</Typography>
                                    </Button>
                                </label>
                            </Grid>
                            <Grid item xs={4} sm={6} md={8}>
                                <TextField
                                    id="resume-file-name"
                                    value={this.state.file.name}
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        readOnly: true
                                    }}
                                />
                            </Grid>
                        </Grid>

                        {/* alternate option for upload display => */}
                        {/* <TextField
                                    type="file"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachFileIcon
                                                    fontSize="small"
                                                    color="secondary"
                                                />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={this.handleUploadInputChange}
                                    className={classes.fileUpload}
                                /> */}

                        {/* MENTOR SELECT */}
                        <Grid item container xs={12} spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant="h6">Select a Mentor</Typography>
                            </Grid>
                            <Grid
                                item
                                container
                                direction="column"
                                alignContent="flex-start"
                                justify="flex-start"
                                className={classes.mentorList}>
                                {this.props.mentors &&
                                    this.props.job &&
                                    this.props.job.skills &&
                                    this.sortMentors(this.props.mentors, this.props.job.skills).map(
                                        listUser => {
                                            return (
                                                <JobApplicationMentorListItem
                                                    key={listUser.id}
                                                    selected={listUser.id === this.state.mentor_id}
                                                    listUser={listUser}
                                                    selectMentor={this.handleSelect}
                                                />
                                            );
                                        }
                                    )}
                            </Grid>
                        </Grid>

                        {/* SUBMIT & BACK BUTTONS */}
                        <Grid
                            item
                            container
                            xs={12}
                            spacing={4}
                            justify="space-around"
                            align="center">
                            <Grid item xs={6} sm={4}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    onClick={() => this.routeBack()}>
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={this.handleSubmit}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography>You are not authorized to view this page.</Typography>
                )}
            </OneColumnLayout>
        );
    }
}

const mapStateToProps = store => {
    return {
        job: store.selectedJobReducer,
        user: store.user,
        mentors: store.allMentorsReducer
    };
};

export default connect(mapStateToProps)(withStyles(styles)(JobApplication));
