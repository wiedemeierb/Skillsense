import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//COMPONENT IMPORTS
import OneColumnLayout from '../OneColumnLayout/OneColumnLayout';
import UserListItem from '../UserListItem/UserListItem';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex'
    }
});

class ApplicantReview extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_APPLICANTS',
            payload: { id: Number(this.props.match.params.id) }
        });
        this.props.dispatch({
            type: 'FETCH_JOB_DETAIL',
            payload: { id: Number(this.props.match.params.id) }
        });
    }

    routeBack = () => {
        this.props.history.push(`/jobs/detail/${this.props.match.params.id}`);
    };

    render() {
        //checks if user type should be able to view this page
        let isClient = () => {
            return this.props.user.access_id === 3;
        };

        //* for withStyles classes use in future as needed *//
        // const { classes } = this.props;

        //uses the UserListItem component to render applicant results
        let applicantList = this.props.applicants.map((applicant, i) => {
            return <UserListItem key={applicant.student_id} listUser={applicant} />;
        });

        return (
            <OneColumnLayout header="Applicant Review">
                {isClient() ? (
                    <Grid container>
                        <Grid item xs={12} align="center">
                            <Typography variant="h4" color="primary" align="center" gutterBottom>
                                "{this.props.details.project_title}"
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                align="space-around"
                                onClick={() => this.routeBack()}>
                                Back
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {/* Job Search List */}
                            <div className="list">{applicantList}</div>
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
        applicants: store.applicantReducer,
        details: store.selectedJobReducer,
        user: store.user
    };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ApplicantReview)));
