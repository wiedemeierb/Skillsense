import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import JobTabs from '../JobsTabs/JobTabs';

//MATERIAL-UI IMPORTS
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

class MyJobs extends Component {
  state = {
    jobs: [
      {
        project: 'Ecommerce Website',
        client: 'Wall Street',
        mentor: 'Mr. Monopoly'
      },
      {
        project: 'Video Game Project',
        client: 'Mario & Luigi',
        mentor: 'Yoshi'
      }
    ]
  };

  render() {
    let jobList = this.state.jobs.map((job, i) => {
      return (
        <div className="list-item">
          <div>
            <h2>{job.project}</h2>
            <h3>{job.client}</h3>
          </div>
          <div>
            <h3>{job.mentor}</h3>
          </div>
        </div>
      );
    });

    return (
      <div className="job-display">
        {/* Navigation tabs on Job Page:
            (Active, Applied, Completed) */}
        <div>
          <JobTabs />
        </div>
        {/* Selected Job List */}
        <List className="job-list">{jobList}</List>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    store
  };
};

export default connect(mapStateToProps)(MyJobs);
