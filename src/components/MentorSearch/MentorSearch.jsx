import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import MentorTabs from '../MentorTabs/MentorTabs';

class MentorSearch extends Component {
  state = {
    mentors: [
      {
        mentor: 'Mr. Miyagi',
        focus_skill: 'Full Stack Development',
        skills: ['JavaScript', 'React', 'CSS', 'HTML']
      },
      {
        mentor: 'Yoda',
        focus_skill: 'UI/UX Design',
        skills: ['JavaScript', 'React', 'CSS', 'HTML']
      }
    ]
  };

  render() {
    let mentorList = this.state.mentors.map((mentor, i) => {
      return (
        <div className="list-item">
          <div>
            {/* left side info */}
            <h2>{mentor.mentor}</h2>
            <h4>{mentor.focus_skill}</h4>
          </div>
          {/* right side info */}
          <div>
            {mentor.skills.map(skill => {
              return <h4 className="skill-tag">{skill}</h4>;
            })}
          </div>
        </div>
      );
    });

    return (
      <div className="list-display">
        {/* Navigation tabs on Job Page:
            (Active, Applied, Completed) */}
        <div>
          <MentorTabs />
        </div>
        {/* Selected Job List */}
        <div className="list">{mentorList}</div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    store
  };
};

export default connect(mapStateToProps)(MentorSearch);
