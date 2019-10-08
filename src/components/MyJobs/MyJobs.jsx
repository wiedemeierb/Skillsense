import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import JobTabs from '../JobsTabs/JobTabs';

class MyJobs extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_ACTIVE_JOBS'
    });
  }

  render() {
    let jobList = this.props.jobs.map((job, i) => {
      return (
        <div key={i} className="list-item">
          {/* right side info */}
          <div>
            <h2>{job.project_title}</h2>

            <h3>{job.position_title}</h3>
          </div>
          {/* left side info */}
          <div>
            <h3>Client: {job.client}</h3>
          </div>
        </div>
      );
    });

    return (
      <div className="list-display">
        {/* Navigation tabs on Job Page:
            (Active, Applied, Completed) */}
        <div>
          <JobTabs />
        </div>
        {/* Selected Job List */}
        <div className="list">{jobList}</div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
    jobs: store.allJobsReducer
  };
};

export default connect(mapStateToProps)(MyJobs);
