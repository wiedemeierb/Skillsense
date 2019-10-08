import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	List,
	ListItem,
	ListItemText,
	Paper,
} from '@material-ui/core';

import UserListItem from '../UserListItem/UserListItem'

class MentorReview extends Component {
	componentDidMount = () => {
		this.props.dispatch({ type: 'FETCH_PENDING_MENTORS' });
	};
	render() {
		const mentorsList =
			this.props.pendingMentors &&
			this.props.pendingMentors.map((mentor) => (
				<UserListItem key={mentor.id} user={mentor} />
			));
		return (
			<Paper>
				<List>{mentorsList}</List>
			</Paper>
		);
	}
}

const mapStateToProps = reduxStore => ({
	pendingMentors: reduxStore.pendingMentorsReducer
});
export default connect(mapStateToProps)(MentorReview);
