import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import MentorTabs from '../MentorTabs/MentorTabs';
import UserListItem from '../UserListItem/UserListItem';

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
      <div className="list-display">
        {/* Navigation tabs on Mentorship Page:
            (Active, Invites) */}
        <div>
          <MentorTabs />
        </div>
        {/* Selected Mentor List */}
        <div className="list">{mentorList}</div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    mentors: store.allMentorsReducer
  };
};

export default connect(mapStateToProps)(MyMentorships);
