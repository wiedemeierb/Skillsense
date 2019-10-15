import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

//COMPONENT IMPORTS
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
import MentorTabs from '../MentorTabs/MentorTabs';
import UserListItem from '../UserListItem/UserListItem';
import PublicProfile from '../PublicProfile/PublicProfile';

//MATERIAL-UI IMPORTS
import { Typography, Button } from '@material-ui/core';

class MyMentorships extends Component {
  componentDidMount() {
    // gets all accepted mentorship relationships from the server and stores them in the allMentorsReducer
    this.props.dispatch({
      type: 'FETCH_ACTIVE_MENTORS'
    });

    //clears the details section upon page load until user makes a selection
    this.props.dispatch({
      type: 'CLEAR_SELECTED_USER'
    });
  }

  //sends put request to the database to update the relationship to accepted: true
  acceptMentorship = () => {
    this.props.dispatch({
      type: 'ACCEPT_MENTORSHIP',
      payload: { student_id: this.props.selectedUser.id }
    })
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'You have accepted this Mentorship!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  //sends delete request to the database to remove the relationship to decline
  declineMentorship = () => {
    this.props.dispatch({
      type: 'DECLINE_MENTORSHIP',
      payload: { student_id: this.props.selectedUser.id }
    })
    Swal.fire({
      type: 'error',
      title: 'You have declined this Mentorship!',
      timer: 1500
    })
  }

  sendMessage = () => {
    // this.props.history.push(`/messages/${this.props.selectedUser.id}`)
  }

  render() {
    //maps over the allMentorsReducer and feeds each user to the UserListItem component for rendering
    let mentorList = this.props.mentors.map((mentor, i) => {
      return <UserListItem key={i} listUser={mentor} />;
    });

    //checks if user type should be able to view this page
    let isStudent = () => {
      return this.props.user.user_type === 'Student';
    };

    //checks if user type should be able to view this page
    let isMentor = () => {
      return this.props.user.user_type === 'Mentor';
    };

    return (
      <>
        {isStudent() || isMentor() ? (
          <TwoColumnLayout rightHeader="Details" leftHeader={this.props.user.user_type === 'Student' ? "Your Mentors" : "Your Mentorships"}>
            <>
              {/* Navigation tabs on Mentorship Page:
              (Active, Invites) 
              The MentorTabs component sends a GET request based on which tab is clicked*/}
              <MentorTabs />
              {/* Applicable Mentor List by Status */}
              <div className="list">{mentorList}</div>
            </>
            <>
              {this.props.selectedUser.id ? (
                <>
                  <PublicProfile />
                  {isMentor() && this.props.selectedUser.accepted === false ?
                    <>
                      <Typography variant="subtitle1">Mentor Actions:</Typography>
                      <Button variant="contained" color="primary" onClick={this.acceptMentorship}>Accept</Button>
                      <Button variant="contained" color="secondary" onClick={this.declineMentorship}>Decline</Button>
                    </>
                    : <Button variant="contained" color="primary" onClick={()=>this.sendMessage()}>Send Message</Button>
                  }
                </>
              ) : (
                  <Typography variant="h6" align="center">
                    Select a user to see more information.
                </Typography>
                )}
            </>
          </TwoColumnLayout>
        ) : (
            <Typography>You are not authorized to view this page.</Typography>
          )}
      </>
    );
  }
}

const mapStateToProps = store => {
  return {
    mentors: store.allMentorsReducer,
    selectedUser: store.selectedUserReducer,
    user: store.user,
    messages: store.allMessagesReducer
  };
};

export default withRouter(connect(mapStateToProps)(MyMentorships));
