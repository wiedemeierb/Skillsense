import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TransferList from '../TransferList/TransferList';
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
import PublicProfile from '../PublicProfile/PublicProfile';
import EditProfile from '../EditProfile/EditProfile';

const styles = theme => ({
	button: {
		display: 'block',
		margin: theme.spacing(1),
		padding: theme.spacing(1)
	}
});

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

	//Toggles profile between read mode and edit mode
	toggleEdit = () => {
		this.setState({ inEditMode: !this.state.inEditMode });
	};

	//saves Profile changes to database
	editUserInfo = () => {
		console.log('handleClick saveSkills operations');
		console.log('this is state on didMount', this.state);
		this.props.dispatch({
			type: 'EDIT_USER_INFO',
			payload: this.state
		});
	};

	//Sends mentorship application to database for admin review
	submitForReview = () => {
		this.props.dispatch({
			type: 'REQUEST_ADMIN_REVIEW'
		});
	};
	//determines what additional info to display if user is a mentor

	render() {
		const { classes } = this.props;
		const mentorSectionHtml =
			//only show mentor section if access id is 2 (mentor)
			this.props.user.access_id === 2 ? (
				//only show approval note if approved
				this.props.user.approved_mentor === 3 ? (
					<Typography className={classes.button}>Approved by Admin</Typography>
				) : (
						//show button to submit for review if not approved yet
						<Button className={classes.button} onClick={this.submitForReview}>
							Submit For Admin Review
					</Button>
					)
			) : null;

		return (
			<TwoColumnLayout leftHeader='Your Profile'>
				<div>
					{this.state.inEditMode ? (
						<EditProfile user={this.props.user} toggleEdit={this.toggleEdit} />
					) : (
							<PublicProfile user={this.props.user} />
						)}
					<Button variant="contained" color="primary" className={classes.button} onClick={this.toggleEdit}>
						{this.state.inEditMode ? 'Cancel' : 'Edit'}
					</Button>
					{mentorSectionHtml}
				</div>
				{this.state.inEditMode && (
					<TransferList allSkills={this.props.skills} user={this.props.user} />
				)}
			</TwoColumnLayout>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	skills: state.allSkillsReducer
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(UserPage));
