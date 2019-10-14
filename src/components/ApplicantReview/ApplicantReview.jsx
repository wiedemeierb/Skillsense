import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//COMPONENT IMPORTS
import OneColumnLayout from '../OneColumnLayout/OneColumnLayout';
import UserListItem from '../UserListItem/UserListItem';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import {
    Paper,
    Typography,
    TextField,
    FormControl,
    FormGroup,
    Select,
    MenuItem,
    IconButton
} from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex'
    },
    formControl: {
        display: 'block',
        margin: theme.spacing(1),
        minWidth: 150
    },
    select: {
        minWidth: 150,
        margin: theme.spacing(1)
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

    render() {
        //checks if user type should be able to view this page
        let isClient = () => {
            return this.props.user.access_id === 3;
        };

        const { classes } = this.props;

        //uses the JobListItem component to render the job search results
        let applicantList = this.props.applicants.map((applicant, i) => {
            return <UserListItem key={i} listUser={applicant} />;
        });

        return (
            <OneColumnLayout header="Applicant Review">
                {isClient() ? (
                    <div>
                        {/* Job Search List */}
                        <div className="list">{applicantList}</div>
                    </div>
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
        skills: store.allSkillsReducer,
        user: store.user
    };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ApplicantReview)));
