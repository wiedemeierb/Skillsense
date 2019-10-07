import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    search: {
      searchTerm: '',
      skill: 0
    },
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

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_ALL_JOBS'
    });
    this.props.dispatch({
      type: 'FETCH_ALL_SKILLS'
    });
  }

  handleSearch = (searchBy, event) => {
    this.setState({
      search: {
        ...this.state.search,
        [searchBy]: event.target.value
      }
    });
  };

  render() {
    const { classes } = this.props;

    let jobList = this.state.jobs.map((job, i) => {
      return (
        <div key={i} className="list-item">
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

    let skillList = this.props.skills.map((skill, i) => {
      return (
        <MenuItem key={i} value={skill.id}>
          {skill.tag}
        </MenuItem>
      );
    });

    return (
      <div className="list-display">
        <Paper className="search">
          <FormControl className={classes.formControl}>
            <FormGroup row="true" className="search">
              <TextField
                className={classes.formControl}
                onChange={e => this.handleSearch('searchTerm', e)}
                value={this.state.searchTerm}
                label="Search Jobs"
              />

              <Select
                className={classes.select}
                value={this.state.search.skill}
                onChange={e => this.handleSearch('skill', e)}
              >
                <MenuItem value={0}>Select Skill</MenuItem>
                {/* Skill tag list dropdown options */}
                {skillList}
              </Select>

              <IconButton
                className={classes.button}
                aria-label="search"
                color="primary"
              >
                <SearchIcon />
              </IconButton>
            </FormGroup>
          </FormControl>
        </Paper>

        {/* Job Search List */}
        <div className="list">{jobList}</div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    jobs: store.allJobsReducer,
    skills: store.allSkillsReducer
  };
};

export default connect(mapStateToProps)(withStyles(styles)(JobSearch));
