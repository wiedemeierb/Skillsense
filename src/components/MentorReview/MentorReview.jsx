import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Button, Typography, Divider, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import UserListItem from '../UserListItem/UserListItem';
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
import PublicProfile from '../PublicProfile/PublicProfile';

const styles = theme => ({
	root: {
		display: 'flexbox',
		flexFlow: 'column-wrap',
		width: '100%'
		// margin: 'auto',
		// marginTop: '5%'
	},
	buttonContainer: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	button: {
		margin: theme.spacing(1),
		padding: theme.spacing(1)
	}
});

class MentorReview extends Component {
	componentDidMount = () => {
		this.props.dispatch({ type: 'FETCH_PENDING_MENTORS' });
	};

	declineMentor = () => {
		this.props.dispatch({
			type: 'ADMIN_DECLINE_MENTOR',
			payload: this.props.selectedUser.id
		});
	};

	approveMentor = () => {
		this.props.dispatch({
			type: 'ADMIN_APPROVE_MENTOR',
			payload: this.props.selectedUser.id
		});
	};
	
	render() {
		const { classes } = this.props;
		const mentorsList =
			this.props.pendingMentors &&
			this.props.pendingMentors.map(mentor => (
				<UserListItem key={mentor.id} user={mentor} />
			));
		return (
			<TwoColumnLayout leftHeader='Pending Mentors' rightHeader='Details'>
				<List>{mentorsList}</List>
				{this.props.selectedUser.id ? (
					<Grid
						container
						spacing={4}
						direction='column'
						justify='space-between'
						alignItems='stretch'>
						<Grid item xs={12}>
							<PublicProfile />
						</Grid>
						<Divider />
						<Grid item xs={12}>
							<Typography variant='subtitle1'>Admin Review Actions:</Typography>
							<div className={classes.buttonContainer}>
								<Button className={classes.button} onClick={this.declineMentor}>
									Decline
								</Button>
								<Button className={classes.button} onClick={this.approveMentor}>
									Approve
								</Button>
							</div>
						</Grid>
					</Grid>
				) : (
					<div>
						<Typography variant='h6'>
							Select any user for more information.
						</Typography>
					</div>
				)}
			</TwoColumnLayout>
		);
	}
}

const mapStateToProps = reduxStore => ({
	pendingMentors: reduxStore.pendingMentorsReducer,
	selectedUser: reduxStore.selectedUserReducer
});
export default connect(mapStateToProps)(withStyles(styles)(MentorReview));
