import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
import MentorTabs from '../MentorTabs/MentorTabs';
import UserListItem from '../UserListItem/UserListItem';
import PublicProfile from '../PublicProfile/PublicProfile';

class MyMentorships extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_ACTIVE_MENTORS'
    });
  }

  render() {
    let mentorList = this.props.mentors.map((mentor, i) => {
      return <UserListItem key={i} user={mentor} />;
    });

    return (
      <TwoColumnLayout rightHeader="Details" leftHeader="Your Mentors">
        <div>
          {/* Navigation tabs on Mentorship Page:
            (Active, Invites) */}
          <MentorTabs />
          {/* Selected Mentor List */}
          <div className="list">{mentorList}</div>
        </div>
        <div>
          <PublicProfile/>
        </div>
      </TwoColumnLayout>
    );
  }
}

const mapStateToProps = store => {
  return {
    mentors: store.allMentorsReducer,
    selectedUser: store.selectedUserReducer
  };
};

export default connect(mapStateToProps)(MyMentorships);
