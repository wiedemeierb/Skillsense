import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import JobTabs from '../JobsTabs/JobTabs';
import JobListItem from '../JobListItem/JobListItem';

class MyJobs extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_ACTIVE_JOBS'
    });
  }

  render() {
    let jobList = this.props.jobs.map((job, i) => {
      return <JobListItem key={i} job={job} />;
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
