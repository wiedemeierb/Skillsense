import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
  root: {
    flexGrow: 1
  }
};

class JobTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({
      value
    });

    let jobType = 0;
    if (value === 0) {
      jobType = 3;
    } else if (value === 1) {
      //needs to be updated to also include "offer-extended" (2)
      // `1 OR "status_id" = 2` errors for integer input
      jobType = 1;
    } else if (value === 2) {
      jobType = 4;
    }

    //route simplification of client using jobType
    //can be applied to student jobs as well in future
    if (this.props.user.access_id === 1) {
      //dispatch actions for students
      if (value === 0) {
        this.props.dispatch({
          type: 'FETCH_ACTIVE_JOBS'
        });
      }
      if (value === 1) {
        this.props.dispatch({
          type: 'FETCH_APPLIED_JOBS'
        });
      }
      if (value === 2) {
        this.props.dispatch({
          type: 'FETCH_COMPLETED_JOBS'
        });
      }
      // dispatch actions for client
    } else if (this.props.user.access_id === 3) {
      this.props.dispatch({
        type: 'FETCH_CLIENT_JOBS',
        payload: jobType
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Active" />
          {this.props.user.access_id === 1 ? (
            <Tab label="Applied" />
          ) : (
            <Tab label="Pending Hire" />
          )}

          <Tab label="Completed" />
        </Tabs>
      </Paper>
    );
  }
}

JobTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = store => {
  return {
    user: store.user
  };
};

export default connect(mapStateToProps)(withStyles(styles)(JobTabs));
