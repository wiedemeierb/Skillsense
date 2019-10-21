import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Button, Typography, Divider, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import UserListItem from '../UserListItem/UserListItem';
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
import PublicProfile from '../PublicProfile/PublicProfile';
import Swal from 'sweetalert2'

const styles = theme => ({
  root: {
    display: 'flexbox',
    flexFlow: 'column-wrap',
    width: '100%'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  }
});

class MentorReview extends Component {
  componentDidMount = () => {
    this.props.dispatch({ type: 'FETCH_PENDING_MENTORS' });
    this.props.dispatch({
      type: 'CLEAR_SELECTED_USER'
    });
  };

  //resets the mentor status to Not Submitted
  declineMentor = () => {
    Swal.fire({
      type: 'error',
      title: 'Declined',
      text: 'You have declined this Mentor',
    })
    this.props.dispatch({
      type: 'ADMIN_DECLINE_MENTOR',
      payload: this.props.selectedUser.id
    });
  };

  //sets the mentor status to Approved
  approveMentor = () => {
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'You have approved this Mentor',
      showConfirmButton: false,
      timer: 1500
    })
    this.props.dispatch({
      type: 'ADMIN_APPROVE_MENTOR',
      payload: this.props.selectedUser.id
    });
  };

  render() {
    const { classes } = this.props;

    //maps over the list of pending mentors
    const mentorsList =
      this.props.pendingMentors &&
      this.props.pendingMentors.map(mentor => (
        <UserListItem key={mentor.id} listUser={mentor} />
      ));

    //checks if user type should be able to view this page
    let isAdmin = () => {
      return (this.props.user.user_type === 'Admin')
    }

    return (
      <Paper>
        {isAdmin() ?
          <TwoColumnLayout leftHeader="Pending Mentors" rightHeader="Details">
            {this.props.pendingMentors.length !== 0 ? <List>{mentorsList}</List> : <Typography variant="h6" align="center">No items to show</Typography>}
            {this.props.selectedUser.id ? (
              <Grid
                container
                spacing={4}
                direction="column"
                justify="space-between"
                alignItems="stretch"
              >
                <Grid item xs={12}>
                  <PublicProfile />
                </Grid>
                <Divider />
                <Grid item xs={12} className={classes.buttonContainer}>
                  <Typography variant="subtitle1">Admin Review Actions:</Typography>
                  <div>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={this.declineMentor}>
                      Decline
                  </Button>
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.approveMentor}>
                      Approve
                  </Button>
                  </div>
                </Grid>
              </Grid>
            ) : (
                <div>
                  <Typography variant="h6" align="center">
                    Select any user for more information.
            </Typography>
                </div>
              )}
          </TwoColumnLayout>
          : <Typography variant="h3">You are not authorized to view this page.</Typography>
        }
      </Paper>)
  }
}

const mapStateToProps = reduxStore => ({
  pendingMentors: reduxStore.pendingMentorsReducer,
  selectedUser: reduxStore.selectedUserReducer,
  user: reduxStore.user
});

export default connect(mapStateToProps)(withStyles(styles)(MentorReview));
