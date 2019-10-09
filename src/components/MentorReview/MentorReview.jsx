import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Button, Typography, Divider } from '@material-ui/core';
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
	render() {
		const { classes } = this.props;
		const mentorsList =
			this.props.pendingMentors &&
			this.props.pendingMentors.map(mentor => (
				<UserListItem key={mentor.id} user={mentor}/>
			));
		return (
			<TwoColumnLayout leftHeader='Pending Mentors' rightHeader='Details'>
				<List>{mentorsList}</List>
				{this.props.selectedUser.id ? (<div>
					<PublicProfile />
					<Divider />
					<Typography variant='subtitle1'>Admin Review Actions:</Typography>
					<div className={classes.buttonContainer}>
						<Button className={classes.button}>Decline</Button>
						<Button className={classes.button}>Approve</Button>
					</div>
				</div>) : (<div><Typography variant="h6">Select any user for more information.</Typography></div>)}
			</TwoColumnLayout>
		);
	}
}

const mapStateToProps = reduxStore => ({
	pendingMentors: reduxStore.pendingMentorsReducer,
	selectedUser: reduxStore.selectedUserReducer
});
export default connect(mapStateToProps)(withStyles(styles)(MentorReview));
