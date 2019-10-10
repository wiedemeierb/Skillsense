import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//COMPONENT IMPORTS
import SkillList from '../SkillList/SkillList';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flexbox',
    flexDirection: 'column'
  },
  listItem: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    // width: '',
    padding: '20px 20px 10px',
    borderBottom: '1px solid gray'
  },
  skillTag: {
    display: 'inline-block',
    margin: '2px',
    padding: '2px',
    color: 'white',
    backgroundColor: 'black'
  },
  button: {
    margin: theme.spacing(1),
    color: 'white'
  }
});

class JobListItem extends Component {

  viewDetail = () => {
    this.props.history.push(`/jobs/detail/${this.props.job.id}`);
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-between"
        align="top"
        className={classes.listItem}
      >
        {/* left side info */}
        <Grid item xs={4}>
          <Typography variant="h5">{this.props.job.project_title}</Typography>
          <Typography>{this.props.job.client}</Typography>
          <Typography>{this.props.job.location}</Typography>
        </Grid>
        {/* center info */}
        <Grid item xs={4}>
          <Typography>Budget: ${this.props.job.budget}</Typography>
          <Typography>Duration: {this.props.job.duration}</Typography>
          {this.props.job.skill_names[0] && (
            <SkillList skillList={this.props.job.skills} />
          )}
        </Grid>
        {/* right side info */}
        <Grid item vs={4}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.viewDetail}
          >
            View Details
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(connect()(withStyles(styles)(JobListItem)));
