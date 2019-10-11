import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//COMPONENT IMPORTS
import OneColumnLayout from '../OneColumnLayout/OneColumnLayout';
import JobListItem from '../JobListItem/JobListItem';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  TextField,
  FormControl,
  FormGroup,
  Select,
  MenuItem,
  IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    display: 'block',
    margin: theme.spacing(1),
    minWidth: 150
  },
  select: {
    minWidth: 150,
    margin: theme.spacing(1)
  }
});

class JobSearch extends Component {
  state = {
    searchTerm: '',
    skill: 0
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_ALL_JOBS'
    });
    this.props.dispatch({
      type: 'FETCH_ALL_SKILLS'
    });
  }

  //Saves the text from input on change
  handleSearch = event => {
    this.setState({
      ...this.state,
      searchTerm: event.target.value
    });
  };

  //Saves the selected skill ID on change
  handleDropdown = event => {
    this.setState({
      ...this.state,
      skill: Number(event.target.value)
    });
  };

  //sends the local state to the database to GET results
  submitSearch = () => {
    this.props.dispatch({
      type: 'FETCH_JOB_SEARCH',
      payload: this.state
    });
  };

  //When search result is clicked, user is taken to the selected job details page
  viewDetail = (event, id) => {
    this.props.history.push(`/jobs/detail/${id}`);
  };

  render() {
    //checks if user type should be able to view this page
    let isAuthorized = () => {
      return this.props.user.access_id === 1;
    };

    const { classes } = this.props;

    //uses the JobListItem component to render the job search results
    let jobList = this.props.jobs.map((job, i) => {
      return <JobListItem key={i} job={job} />;
    });

    //renders the list of available skills within the dropdown
    let skillList = this.props.skills.map(skill => {
      return (
        <MenuItem key={skill.id} value={skill.id}>
          {skill.tag}
        </MenuItem>
      );
    });

    return (
        <OneColumnLayout header="Search for Jobs">
          {isAuthorized() ? (
            <div>
              <Paper className="search">
                <FormControl className={classes.formControl}>
                  <FormGroup row="true" className="search">
                    {/* Search Job input field */}
                    <TextField
                      className={classes.formControl}
                      onChange={this.handleSearch}
                      value={this.state.searchTerm}
                      label="Search Jobs"
                    />
                    {/* Skill select for search */}
                    <Select
                      className={classes.select}
                      value={this.state.skill}
                      onChange={this.handleDropdown}
                    >
                      <MenuItem value={0}>Select Skill</MenuItem>
                      {/* Skill tag list dropdown options */}
                      {skillList}
                    </Select>

                    {/* Submit Search Button */}
                    <IconButton
                      className={classes.button}
                      aria-label="search"
                      color="primary"
                      onClick={this.submitSearch}
                    >
                      <SearchIcon />
                    </IconButton>
                  </FormGroup>
                </FormControl>
              </Paper>

              {/* Job Search List */}
              <div className="list">{jobList}</div>
            </div>
          ) : (
            <Typography>You are not authorized to view this page.</Typography>
          )}
        </OneColumnLayout>
    );
  }
}

const mapStateToProps = store => {
  return {
    jobs: store.allJobsReducer,
    skills: store.allSkillsReducer,
    user: store.user
  };
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(JobSearch))
);
