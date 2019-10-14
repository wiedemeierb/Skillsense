import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
import UserListItem from '../UserListItem/UserListItem';
import PublicProfile from '../PublicProfile/PublicProfile';
import MentorRequest from '../MentorRequest/MentorRequest';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  TextField,
  FormControl,
  FormGroup,
  Select,
  MenuItem,
  IconButton,
  Typography
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

class MentorSearch extends Component {
  state = {
    search: {
      searchTerm: '',
      skill: 0
    }
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_ALL_MENTORS'
    });
    this.props.dispatch({
      type: 'FETCH_ALL_SKILLS'
    });
    this.props.dispatch({
      type: 'CLEAR_SELECTED_USER'
    });
  }

  //Saves the text from input on change
  handleSearch = (searchKey, event) => {
    this.setState({
      search: {
        ...this.state.search,
        [searchKey]: event.target.value
      }
    });
  };

  //sends the local state to the database to GET results
  submitSearch = () => {
    this.props.dispatch({
      type: 'FETCH_MENTOR_SEARCH',
      payload: this.state.search
    });
  };

  //Allows user to login using the Enter key while focus is within the Input area
  handleKeyUp = (key) => {
    if (key.key === 'Enter') {
      this.submitSearch();
    }
  }

  render() {
    const { classes } = this.props;

    //uses the UserListItem component to render the mentor search results
    let mentorList = this.props.mentors.map((mentor, i) => {
      return <UserListItem key={i} listUser={mentor} />;
    });

    //renders the list of available skills within the dropdown
    let skillList = this.props.skills.map((skill, i) => {
      return (
        <MenuItem key={i} value={skill.id}>
          {skill.tag}
        </MenuItem>
      );
    });

    //checks if user type should be able to view this page
    let isStudent = () => {
      return this.props.user.access_id === 1;
    };

    return (<div>
      {isStudent() ? (
        <TwoColumnLayout rightHeader="Details" leftHeader="Search for Mentors">
          <div>
            <Paper className="search">
              <FormControl className={classes.formControl}>
                <FormGroup row={true} className="search">
                  <TextField
                    className={classes.formControl}
                    onChange={e => this.handleSearch('searchTerm', e)}
                    value={this.state.searchTerm}
                    label="Search Mentors"
                    onKeyUp={this.handleKeyUp}
                  />

                  <Select
                    className={classes.select}
                    value={this.state.search.skill}
                    onChange={e => this.handleSearch('skill', e)}
                    // onKeyUp={this.handleKeyUp}
                  >
                    <MenuItem value={0}>Select Skill</MenuItem>
                    {/* Skill tag list dropdown options */}
                    {skillList}
                  </Select>

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

            {/* Mentor Search List */}
            <div className="list">{mentorList}</div>
          </div>

          <div>
            {this.props.selectedUser.id ? (
              <div>
              <PublicProfile />
                       {/* If the user is a mentor, the Request Mentor button will appear in the list row */}
                {this.props.user.access_id === 1 && this.props.selectedUser.access_id === 2 && this.props.selectedUser.accepted === null ? <MentorRequest mentor={this.props.selectedUser} /> : null}
            </div>
            ) : (
                <Typography variant="h6" align="center">
                  Select a mentor to see more information.
            </Typography>
              )}
          </div>
        </TwoColumnLayout>
      ) : (
          <Typography>You are not authorized to view this page.</Typography>
        )}        </div>

    )
  }
}

const mapStateToProps = store => {
  return {
    mentors: store.allMentorsReducer,
    skills: store.allSkillsReducer,
    selectedUser: store.selectedUserReducer,
    user: store.user
  };
};

export default connect(mapStateToProps)(withStyles(styles)(MentorSearch));
