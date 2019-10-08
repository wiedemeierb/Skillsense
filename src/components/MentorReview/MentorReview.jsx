import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	List,
	ListItem,
	ListItemText,
	Paper,
} from '@material-ui/core';

class MentorReview extends Component {
	componentDidMount = () => {
		this.props.dispatch({ type: 'FETCH_PENDING_MENTORS' });
	};
	render() {
		const mentorsList =
			this.props.allMentors &&
			this.props.allMentors.map(mentor => (
				<ListItem key={mentor.id}>
					<ListItemText>{mentor.username}<br />{mentor.email}</ListItemText>
				</ListItem>
			));
		return (
			<Paper>
				<List>{mentorsList}</List>
			</Paper>
		);
	}
}

const mapStateToProps = reduxStore => ({
	allMentors: reduxStore.allMentorsReducer
});
export default connect(mapStateToProps)(MentorReview);
