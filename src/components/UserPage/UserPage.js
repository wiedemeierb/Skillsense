import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import TransferList from '../TransferList/TransferList';

class UserPage extends Component {
  state = {
    username: this.props.user.username,
    email: this.props.user.email,
    location: this.props.user.location,
    focus_skill: this.props.user.focus_skill,
    github_url: this.props.user.github_url,
    linkedin_url: this.props.user.linkedin_url,
    website_url: this.props.user.website_url,
    access_id: '1',
    active: true,
    approved_mentor: false,
  }


  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_ALL_SKILLS'});
    this.props.dispatch({type: 'FETCH_USER_SKILLS'});
  }
  render() {

    let studentSkillListId = this.props.selectedUserSkills.map((skillId) => {
      return (<tr key={skillId.tag_id}>
              <td>{skillId.tag}</td>
              </tr>)
    })
  
  return (
  <div>
    {/* outlined Material-UI textfield input */}
    <TextField
      required
      id="outlined-required"
      label="Name"
      defaultValue={this.state.username}
      margin="normal"
      variant="outlined"
    />
      <TextField
      required
      id="outlined-required"
      label="Title"
      defaultValue={this.state.focus_skill}
      margin="normal"
      variant="outlined"
    />
       <TextField
      required
      id="outlined-required"
      label="Location"
      defaultValue={this.state.location}
      margin="normal"
      variant="outlined"
    />
        <TextField
      required
      id="outlined-required"
      label="Email"
      defaultValue={this.state.email}
      margin="normal"
      variant="outlined"
    />
        <TextField
      required
      id="outlined-required"
      label="Website"
      defaultValue={this.state.website_url}
      margin="normal"
      variant="outlined"
    />
         <TextField
      required
      id="outlined-required"
      label="LinkedIn"
      defaultValue={this.state.linkedin_url}
      margin="normal"
      variant="outlined"
    />
         <TextField
      required
      id="outlined-required"
      label="Github"
      defaultValue={this.state.github_url}
      margin="normal"
      variant="outlined"
    />
      <TransferList allSkills={this.props.skills} user={this.props.user}/>
      {studentSkillListId}
  </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  skills: state.allSkillsReducer,
  selectedUserSkills: state.userSkillsReducer,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
