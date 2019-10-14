import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  }

  //sends delete request to the database to remove the relationship to decline
  declineMentorship = () => {
    this.props.dispatch({
      type: 'DECLINE_MENTORSHIP',
      payload: { student_id: this.props.selectedUser.id }
    })
  }

  render() {
    //maps over the allMentorsReducer and feeds each user to the UserListItem component for rendering
    let mentorList = this.props.mentors.map((mentor, i) => {
      return <UserListItem key={i} listUser={mentor} />;
    });

    //checks if user type should be able to view this page
    let isStudent = () => {
      return this.props.user.access_id === 1;
    };

    let isMentor = () => {
      return this.props.user.access_id === 2;
    };

    return (<div>
        {isStudent() || isMentor() ? (
        <TwoColumnLayout rightHeader="Details" leftHeader={this.props.user.access_id === 1 ? "Your Mentors" : "Your Mentorships"}>
          <div>
              {/* Navigation tabs on Mentorship Page:
            (Active, Invites) 
            The MentorTabs component sends a GET request based on which tab is clicked*/}
              <MentorTabs />
              {/* Selected Mentor List */}
              <div className="list">{mentorList}</div>
            </div>
            <div>
              {this.props.selectedUser.id ? (
                <div>
                  <PublicProfile />
                  <br />
                  {isMentor() && this.props.selectedUser.accepted === false ?
                    <div>
                  <Typography variant="subtitle1">Mentor Actions</Typography>
                      <Button variant="contained" color="primary" onClick={this.acceptMentorship}>Accept</Button>
                      <Button variant="contained" color="secondary" onClick={this.declineMentorship}>Decline</Button>
                    </div>
                    : <Button variant="contained" color="primary">Send Message</Button>
                  }
                </div>
              ) : (
                  <Typography variant="h6" align="center">
                    Select a mentor to see more information.
            </Typography>
                )}
              </div>
                  </TwoColumnLayout>
        ) : (
            <Typography>You are not authorized to view this page.</Typography>
        )}            </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    mentors: store.allMentorsReducer,
    selectedUser: store.selectedUserReducer,
    user: store.user
  };
};

export default connect(mapStateToProps)(MyMentorships);
