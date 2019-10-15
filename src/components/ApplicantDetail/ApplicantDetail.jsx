import React, { Component } from 'react';
import { connect } from 'react-redux';
//SWEETALERTS
import Swal from 'sweetalert2';
//COMPONENT IMPORTS
import SkillList from '../SkillList/SkillList';
//MATERIAL-UI IMPORTS
import { Typography, TextField, Button, Link, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        margin: 'auto',
        width: '90vw'
    },
    link: {
        fontWeight: 'bold',
        padding: theme.spacing(0)
    },
    mentorList: {
        overFlow: 'scroll',
        maxWidth: '100vw'
    }
});
class ApplicantDetail extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_APPLICANT_DETAIL',
            payload: { id: Number(this.props.match.params.id) }
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        Swal.fire({
            title: 'Are you sure you want to hire this applicant?',
            text: "You won't be able to reverse this decision!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#04b8f3',
            cancelButtonColor: '#505d68',
            confirmButtonText: 'Yes, submit it!'
        }).then(result => {
            if (result.value) {
                this.props.dispatch({
                    type: 'HIRE_APPLICANT',
                    payload: {
                        ...this.state,
                        job_id: Number(this.props.match.params.id)
                    }
                });
            }
        });
    };

    render() {
        const { classes } = this.props;

        let isClient = () => {
            return this.props.user.access_id === 3;
        };

        return (
            <Grid
                container
                spacing={8}
                justify="space-around"
                alignItems="center"
                className={classes.root}>
                {isClient() ? (
                    <Grid item container justify="space-around" spacing={4} xs={12}>
                        <Grid item xs={12}>
                            <Typography variant="h3" align="center">
                                Application Details
                            </Typography>
                        </Grid>
                        {/* Applicant Info */}
                        <Grid item xs={12} align="center">
                            <Typography variant="h4" color="primary">{this.props.applicant.username}</Typography>
                            <Typography variant="h5">{this.props.applicant.focus_skill}</Typography>
                            <Typography variant="h6">{this.props.applicant.location}</Typography>
                        </Grid>
                        {/* Cover Letter and Resume */}
                        <Grid item container spacing={4} xs={12} justify="center">
                            <Grid item xs={12}>
                                <Typography variant="h6" align="left">
                                    Cover Letter:
                                </Typography>
                                <Typography variant="body2">
                                    {this.props.applicant.cover_letter}
                                </Typography>
                            </Grid>
                            {/* Resume Attachment*/}
                            <Grid item xs={12}>
                                <Link href={this.props.applicant.attachment_url}>Resume</Link>
                            </Grid>
                        </Grid>
                        {/* User Info */}
                        <Grid item xs={12}>
                            <Typography variant="h6">Student Information</Typography>
                            <Typography className={classes.link}>
                                <Link href={this.props.applicant.github_url}>GitHub Profile</Link>
                            </Typography>
                            <Typography className={classes.link}>
                                <Link href={this.props.applicant.linkedin_url}>
                                    LinkedIn Profile
                                </Link>
                            </Typography>
                            {this.props.applicant.website_url && (
                                <Typography className={classes.link}>
                                    <Link href={this.props.applicant.website_url}>
                                        Portfolio/Personal Website
                                    </Link>
                                </Typography>
                            )}
                        </Grid>
                        {/* <Button variant="contained" color="secondary" onClick={this.props.history.push('/search/jobs')}>Back</Button> */}
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography>You are not authorized to view this page.</Typography>
                )}
            </Grid>
        );
    }
}

const mapStateToProps = store => {
    return {
        job: store.selectedJobReducer,
        applicant: store.selectedApplicantReducer,
        user: store.user
    };
};

export default connect(mapStateToProps)(withStyles(styles)(ApplicantDetail));
