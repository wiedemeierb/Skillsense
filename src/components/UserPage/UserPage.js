import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import TransferList from '../TransferList/TransferList';
import Button from '@material-ui/core/Button';
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
import PublicProfile from '../PublicProfile/PublicProfile';

class UserPage extends Component {
	state = {
		username: '',
		email: '',
		location: '',
		focus_skill: '',
		github_url: '',
		linkedin_url: '',
		website_url: '',
		bio: '',
		inEditMode: true
	};

	componentDidMount = () => {
		this.setState({
			...this.props.user
		});
	};
	//handler for all input fields -- go DRY
	handleInputChangeFor = (event, name) => {
		this.setState({
			[name]: event.target.value
		});
	};

	editStudentInfo = () => {
		console.log('handleClick saveSkills operations');
		console.log('this is state on didMount', this.state);
		this.props.dispatch({
			type: 'EDIT_USER_INFO',
			payload: this.state
		});
	};

	render() {
		return (
			<TwoColumnLayout leftHeader='Your Profile' rightHeader='Skills'>
				{this.state.inEditMode ? (
					<div>
						{/* outlined Material-UI textfield input */}
						<TextField
							required
							id='outlined-required'
							label='Name'
							defaultValue={this.props.user.username}
							margin='normal'
							variant='outlined'
							onChange={event => {
								this.handleInputChangeFor(event, 'username');
							}}
						/>
						<TextField
							required
							id='outlined-required'
							label='Title'
							defaultValue={this.props.user.focus_skill}
							margin='normal'
							variant='outlined'
							onChange={event => {
								this.handleInputChangeFor(event, 'focus_skill');
							}}
						/>
						<TextField
							required
							id='outlined-required'
							label='Location'
							defaultValue={this.props.user.location}
							margin='normal'
							variant='outlined'
							onChange={event => {
								this.handleInputChangeFor(event, 'location');
							}}
						/>
						<TextField
							required
							id='outlined-required'
							label='Email'
							defaultValue={this.props.user.email}
							margin='normal'
							variant='outlined'
							onChange={event => {
								this.handleInputChangeFor(event, 'name');
							}}
						/>
						<TextField
							required
							id='outlined-required'
							label='Website'
							defaultValue={this.props.user.website_url}
							margin='normal'
							variant='outlined'
							onChange={event => {
								this.handleInputChangeFor(event, 'website_url');
							}}
						/>
						<TextField
							required
							id='outlined-required'
							label='LinkedIn'
							defaultValue={this.props.user.linkedin_url}
							margin='normal'
							variant='outlined'
							onChange={event => {
								this.handleInputChangeFor(event, 'linkedin_url');
							}}
						/>
						<TextField
							required
							id='outlined-required'
							label='Github'
							defaultValue={this.props.user.github_url}
							margin='normal'
							variant='outlined'
							onChange={event => {
								this.handleInputChangeFor(event, 'github_url');
							}}
						/>
						<Button onClick={this.editStudentInfo}>Edit</Button>

						{/* {studentSkillListId} */}
					</div>
				) : (
					<PublicProfile user={this.props.user} />
				)}
				<div>
					<TransferList allSkills={this.props.skills} user={this.props.user} />
				</div>
			</TwoColumnLayout>
		);
	}
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
	user: state.user,
	skills: state.allSkillsReducer,
	selectedUserSkills: state.userSkillsReducer
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
