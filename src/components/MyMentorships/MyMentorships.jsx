import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

//COMPONENT IMPORTS
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
import MentorTabs from '../MentorTabs/MentorTabs';
import UserListItem from '../UserListItem/UserListItem';
import PublicProfile from '../PublicProfile/PublicProfile';
import JobListItem from '../JobListItem/JobListItem';
import MessageDialog from '../MessageDialog/MessageDialog';

//MATERIAL-UI IMPORTS
import { Typography, Button, Grid, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	button: {
		margin: theme.spacing(1),
		padding: theme.spacing(1)
	}
});

class MyMentorships extends Component {
	componentDidMount() {
		// gets all accepted mentorship relationships from the server and stores them in the allMentorsReducer
		this.props.dispatch({
			type: 'FETCH_ACTIVE_MENTORS'
		});

		//clears the details section upon page load until user makes a selection
		this.props.dispatch({
			type: 'CLEAR_SELECTED_USER'
		});
	}

	//sends put request to the database to update the relationship to accepted: true
	acceptMentorship = () => {
		Swal.fire({
			title: 'Are you sure?',
			type: 'success',
			showCancelButton: true,
			confirmButtonColor: '#04b8f3',
			cancelButtonColor: '#505d68',
			confirmButtonText: 'Yes, accept this Mentorship!'
		}).then(result => {
			if (result.value) {
				this.props.dispatch({
					type: 'ACCEPT_MENTORSHIP',
					payload: { student_id: this.props.selectedUser.id }
				});
			}
		});
	};

	//sends delete request to the database to remove the relationship to decline
	declineMentorship = () => {
		Swal.fire({
			title: 'Are you sure?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#04b8f3',
			cancelButtonColor: '#505d68',
			confirmButtonText: 'Yes, decline this Mentorship!'
		}).then(result => {
			if (result.value) {
				this.props.dispatch({
					type: 'DECLINE_MENTORSHIP',
					payload: { student_id: this.props.selectedUser.id }
				});
			}
		});
	};

	sendMessage = () => {
		// this.props.history.push(`/messages/${this.props.selectedUser.id}`)
	};

	render() {
		const { classes } = this.props;
		//checks if user type should be able to view this page
		let isStudent = () => {
			return this.props.user.user_type === 'Student';
		};

		//checks if user type should be able to view this page
		let isMentor = () => {
			return this.props.user.user_type === 'Mentor';
		};

		//maps over the allMentorsReducer and feeds each user to the UserListItem component for rendering
		let mentorList = this.props.mentors.map((mentor, i) => {
			return (
				<>
					<UserListItem listUser={mentor} />
					{mentor.inviteMessage && (
						<Typography variant='subtitle2' align='right'>
							{isStudent() ? 'You sent: ' : 'Student Message: '}
							{mentor.inviteMessage.message}
						</Typography>
					)}
					<Divider />
				</>
			);
		});

		//uses the JobListItem component to render the job search results
		let jobList =
			this.props.selectedUser.job_list &&
			this.props.selectedUser.job_list.map((job, i) => {
				return <JobListItem key={i} job={job} />;
			});

		console.log(this.props.selectedUser.job_list);
		return (
			<>
				{isStudent() || isMentor() ? (
					<TwoColumnLayout
						rightHeader='Details'
						leftHeader={
							this.props.user.user_type === 'Student'
								? 'Your Mentors'
								: 'Your Mentorships'
						}>
						<>
							{/* Navigation tabs on Mentorship Page:
              (Active, Invites)
              The MentorTabs component sends a GET request based on which tab is clicked*/}
							<MentorTabs />
							{/* Applicable Mentor List by Status */}
							<div className='list'>{mentorList}</div>
						</>
						<>
							{this.props.selectedUser.id ? (
								<>
									<PublicProfile />
									{isMentor() && this.props.selectedUser.accepted === false ? (
										<>
											<Grid align='center'>
												<Typography variant='subtitle1'>
													Mentor Actions:
												</Typography>

												<Button
													align='center'
													variant='contained'
													color='primary'
													className={classes.button}
													onClick={this.acceptMentorship}>
													Accept
												</Button>
												<Button
													align='center'
													variant='contained'
													color='secondary'
													className={classes.button}
													onClick={this.declineMentorship}>
													Decline
												</Button>
											</Grid>
										</>
									) : (
										<>
											<Grid align='center'>
												<MessageDialog
													recipient={{
														id: this.props.selectedUser.id,
														username: this.props.selectedUser.username
													}}
												/>
											</Grid>
											{isMentor() &&
											this.props.selectedUser.job_list[0] !== null ? (
												<>
													<br />
													<Typography variant='h5' align='center'>
														Student's Jobs
													</Typography>
													<div className='list'>{jobList}</div>
												</>
											) : null}
										</>
									)}
								</>
							) : (
								<Typography variant='h6' align='center'>
									Select a User to see more information.
								</Typography>
							)}
						</>
					</TwoColumnLayout>
				) : (
					<Typography>You are not authorized to view this page.</Typography>
				)}
			</>
		);
	}
}

const mapStateToProps = store => {
	return {
		mentors: store.allMentorsReducer,
		selectedUser: store.selectedUserReducer,
		user: store.user,
		messages: store.allMessagesReducer
	};
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(MyMentorships)));
