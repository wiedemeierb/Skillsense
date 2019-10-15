import React, { Component } from 'react';
import { connect } from 'react-redux';
//SWEETALERTS
import Swal from 'sweetalert2';
//COMPONENT IMPORTS
import OneColumnLayout from '../OneColumnLayout/OneColumnLayout';
import SkillList from '../SkillList/SkillList';
//MATERIAL-UI IMPORTS
import { Typography, Icon, Button, Link, Grid } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';
import EmailIcon from '@material-ui/icons/Email';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        margin: 'auto',
        width: '90vh'
    },
    section: {
        padding: theme.spacing(2, 0)
    },
    link: {
        fontWeight: 'bold'
    },
    resumeLink: {
        display: 'inline-block',
        fontWeight: 'bold',
        verticalAlign: 'middle'
    },
    button: {
        color: 'white'
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

    routeBack = () => {
        this.props.history.push(`/jobs/detail/${this.props.applicant.job_id}`);
    };

    render() {
        const { classes } = this.props;

        let isClient = () => {
            return this.props.user.access_id === 3;
        };

        return (
            <OneColumnLayout header="Application Details">
                {isClient() ? (
                    <Grid container justify="space-around" spacing={4} className={classes.root}>
                        {/* Applicant Info */}
                        <Grid item xs={6}>
                            <Typography variant="h4" color="primary">
                                {this.props.applicant.username}
                            </Typography>
                            <Typography variant="h5">{this.props.applicant.focus_skill}</Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                {this.props.applicant.location}
                            </Typography>
                        </Grid>

                        {/* Bio & Resume */}
                        <Grid item xs={6}>
                            <Grid container justify="space-around">
                                {this.props.applicant.bio !== null && (
                                    <Grid item xs={12}>
                                        <Typography variant="caption" gutterBottom>
                                            {this.props.applicant.bio}
                                        </Typography>
                                    </Grid>
                                )}
                                {this.props.applicant.attachment_url !== null && (
                                    <Grid item xs={12} align="center">
                                        <Link href={this.props.applicant.attachment_url}>
                                            <Button
                                                color="primary"
                                                size="large"
                                                fullWidth
                                                startIcon={<DescriptionIcon />}
                                                onClick={() => this.viewResume}>
                                                View Resume
                                            </Button>
                                        </Link>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>

                        {/* Cover Letter */}
                        <Grid item container className={classes.section}>
                            <Grid item xs={12}>
                                <Typography variant="h6" align="left">
                                    Cover Letter:
                                </Typography>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        {this.props.applicant.cover_letter}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* User Info */}
                        <Grid item container align="center" className={classes.section}>
                            {this.props.applicant.linkedin_url !== null && (
                                <Grid item xs={3}>
                                    <Link href={this.props.applicant.linkedin_url}>
                                        <Typography className={classes.link}>
                                            <LinkedInIcon fontSize="large" />
                                        </Typography>
                                        <Typography className={classes.link}>LinkedIn</Typography>
                                    </Link>
                                </Grid>
                            )}
                            {this.props.applicant.github_url !== null && (
                                <Grid item xs={3}>
                                    <Link href={this.props.applicant.github_url}>
                                        <Typography className={classes.link}>
                                            <GitHubIcon fontSize="large" />
                                        </Typography>
                                        <Typography className={classes.link}>GitHub</Typography>
                                    </Link>
                                </Grid>
                            )}
                            {this.props.applicant.website_url !== null && (
                                <Grid item xs={3}>
                                    <Link href={this.props.applicant.website_url}>
                                        <Typography className={classes.link}>
                                            <LanguageIcon fontSize="large" />
                                        </Typography>
                                        <Typography className={classes.link}>Website</Typography>
                                    </Link>
                                </Grid>
                            )}
                            {this.props.applicant.email !== null && (
                                <Grid item xs={3}>
                                    <Link
                                        target="_blank"
                                        href={`mailto:${this.props.applicant.email}`}>
                                        <Typography className={classes.link}>
                                            <EmailIcon fontSize="large" />
                                        </Typography>
                                        <Typography className={classes.link}>E-Mail</Typography>
                                    </Link>
                                </Grid>
                            )}
                        </Grid>

                        {/* Buttons: Back & Hire */}
                        <Grid
                            item
                            container
                            align="center"
                            justify="space-between"
                            className={classes.section}>
                            <Grid item xs={4}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    className={classes.button}
                                    onClick={this.routeBack}>
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    className={classes.button}
                                    onClick={this.handleSubmit}>
                                    Hire
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
        applicant: store.selectedApplicantReducer,
        user: store.user
    };
};

export default connect(mapStateToProps)(withStyles(styles)(ApplicantDetail));
