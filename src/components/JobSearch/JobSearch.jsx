import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import Divider from '@material-ui/core/Divider';

class JobSearch extends Component {
  state = {
    jobs: [
      {
        project: 'Redesign our website',
        client: `John Doe's Doughnuts`,
        location: 'Minneapolis, MN',
        budget: '$500',
        deadline: '10/25/19',
        skills: ['JavaScript', 'React', 'CSS']
      }
    ]
  };

  render() {
    let jobList = this.state.jobs.map((job, i) => {
      return (
        <div className="list-item">
          <div>
            {/* left side info */}
            <h2>{job.project}</h2>
            <h3>{job.client}</h3>
            <h4>{job.location}</h4>
          </div>
          {/* right side info */}
          <div>
            <p>Budget: {job.budget}</p>
            <p>Deadline: {job.deadline}</p>
            {job.skills.map(skill => {
              return <h4 className="skill-tag">{skill}</h4>;
            })}
          </div>
        </div>
      );
    });

    return (
      <div className="job-display">
        {/* Job Search List */}
        <div className="job-list">{jobList}</div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    store
  };
};

export default connect(mapStateToProps)(JobSearch);
