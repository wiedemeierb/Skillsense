import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import UserListItem from '../UserListItem/UserListItem';
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';

const styles = theme => ({
	root: {
		display: 'flexbox',
		flexFlow: 'column-wrap',
		width: '100%'
		// margin: 'auto',
		// marginTop: '5%'
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
				<UserListItem key={mentor.id} user={mentor} />
			));
		return (
			<TwoColumnLayout leftHeader='Pending Mentors' rightHeader=''>
				<List>{mentorsList}</List>
				<div></div>
			</TwoColumnLayout>
		);
	}
}

const mapStateToProps = reduxStore => ({
	pendingMentors: reduxStore.pendingMentorsReducer
});
export default connect(mapStateToProps)(withStyles(styles)(MentorReview));
