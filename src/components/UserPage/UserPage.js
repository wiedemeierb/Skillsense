import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import TransferList from '../TransferList/TransferList';
import Button from '@material-ui/core/Button';
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
import PublicProfile from '../PublicProfile/PublicProfile';
import SkillList from '../SkillList/SkillList';
import EditProfile from '../EditProfile';

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
		skills: [],
		inEditMode: false
	};

	componentDidMount = () => {
		this.props.dispatch({ type: 'FETCH_USER' });
		this.props.dispatch({ type: 'FETCH_ALL_SKILLS' });
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

	toggleEdit = () => {
		this.setState({ inEditMode: !this.state.inEditMode });
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
			<TwoColumnLayout leftHeader='Your Profile'>
				<div>
					{this.state.inEditMode ? (
						<EditProfile user={this.props.user} toggleEdit={this.toggleEdit} />
					) : (
						<PublicProfile user={this.props.user} />
					)}
					<Button onClick={this.toggleEdit}>
						{this.state.inEditMode ? 'Cancel' : 'Edit'}
					</Button>
				</div>
				{this.state.inEditMode && (
					<TransferList allSkills={this.props.skills} user={this.props.user} />
				)}
			</TwoColumnLayout>
		);
	}
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
	user: state.user,
	skills: state.allSkillsReducer
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
