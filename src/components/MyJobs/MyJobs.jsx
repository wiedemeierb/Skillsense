import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import JobTabs from '../JobsTabs/JobTabs';
import JobListItem from '../JobListItem/JobListItem';

class MyJobs extends Component {
  componentDidMount() {
    console.log(this.props.user.access_id);

    if (this.props.user.access_id === 1) {
      this.props.dispatch({
        type: 'FETCH_ACTIVE_JOBS'
      });
    } else if (this.props.user.access_id === 3) {
      this.props.dispatch({
        type: 'FETCH_CLIENT_JOBS',
        //active job status
        payload: 3
      });
    }
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
