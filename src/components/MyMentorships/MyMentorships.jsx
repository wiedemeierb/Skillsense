import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import MentorTabs from '../MentorTabs/MentorTabs';

class MyMentorships extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_ACTIVE_MENTORS'
    });
  }

  render() {
    let mentorList = this.props.mentors.map((mentor, i) => {
      return (
        <div key={i} className="list-item">
          <div>
            {/* left side info */}
            <h2>{mentor.username}</h2>
            <h4>{mentor.focus_skill}</h4>
          </div>
          {/* right side info */}
          <div>{/* MORE INFORMATION IF NEEDED */}</div>
        </div>
      );
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
