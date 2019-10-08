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
          <Tab label="Applied" />
          <Tab label="Completed" />
        </Tabs>
      </Paper>
    );
  }
}

JobTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect()(withStyles(styles)(JobTabs));
