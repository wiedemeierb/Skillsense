import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import TransferList from '../TransferList/TransferList';
import Button from '@material-ui/core/Button';

class UserPage extends Component {
  state = {
    username: [],
    email: [],
    location: [],
    focus_skill: [],
    github_url: [],
    linkedin_url: [],
    website_url: [],
    
    // access_id: '1',
    // active: true,
    // approved_mentor: false,
  }


  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_ALL_SKILLS'});
    this.props.dispatch({type: 'FETCH_USER_SKILLS'});
  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value
    })}

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })}

  handleLocationChange = (event) => {
    this.setState({
      location: event.target.value
    })}

  handleFocusSkillChange = (event) => {
    this.setState({
      focus_skill: event.target.value
    })}

  handleGithubChange = (event) => {
    this.setState({
      github_url: event.target.value
    })}
  
  handleLinkedInChange = (event) => {
    this.setState({
      linkedin_url: event.target.value
    })}

  handleWebsiteChange = (event) => {
    this.setState({
      website_url: event.target.value
    })}


  editStudentInfo = () => {
    console.log('handleClick saveSkills operations')
    this.props.dispatch({
      type: 'EDIT_USER_INFO',
      payload: this.state,
    })
  };

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
      defaultValue={this.props.user.username}
      margin="normal"
      variant="outlined"
      onChange={this.handleUsernameChange}
    />
      <TextField
      required
      id="outlined-required"
      label="Title"
      defaultValue={this.props.user.focus_skill}
      margin="normal"
      variant="outlined"
      onChange={this.handleFocusSkillChange}
    />
       <TextField
      required
      id="outlined-required"
      label="Location"
      defaultValue={this.props.user.location}
      margin="normal"
      variant="outlined"
      onChange={this.handleLocationChange}
    />
        <TextField
      required
      id="outlined-required"
      label="Email"
      defaultValue={this.props.user.email}
      margin="normal"
      variant="outlined"
      onChange={this.handleEmailChange}
    />
        <TextField
      required
      id="outlined-required"
      label="Website"
      defaultValue={this.props.user.website_url}
      margin="normal"
      variant="outlined"
      onChange={this.handleWebsiteChange}
    />
         <TextField
      required
      id="outlined-required"
      label="LinkedIn"
      defaultValue={this.props.user.linkedin_url}
      margin="normal"
      variant="outlined"
      onChange={this.handleLinkedInChange}
    />
         <TextField
      required
      id="outlined-required"
      label="Github"
      defaultValue={this.props.user.github_url}
      margin="normal"
      variant="outlined"
      onChange={this.handleGithubChange}
    />
      <Button onClick={this.editStudentInfo}>Edit</Button>
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
