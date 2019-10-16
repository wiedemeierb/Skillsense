import React, { Component } from 'react';
import { connect } from 'react-redux';
//material-ui imports
import {
	Typography,
	Paper,
	Button,
	Grid,
	List,
	ListItem,
	ListItemText,
	Divider,
	IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

//component import
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
import ConversationListItem from '../ConversationListItem/ConversationListItem';

const styles = theme => ({
	root: {
		display: 'flex'
	},
	messageList: {},
	messageListItem: {}
});

class MessagesCenter extends Component {
	state = {
		selected: null
	};

	componentDidMount() {
		// gets all accepted mentorship relationships from the server and stores them in the allMentorsReducer
		this.props.dispatch({
			type: 'FETCH_ALL_MESSAGES'
		});
	}

	render() {
		return (
			<TwoColumnLayout leftHeader='Inbox' rightHeader='details'>
				<Grid container justify='center' alignItems='center' spacing={2}>
					<Grid item xs={12}>
						<List>
							{this.props.messages &&
								this.props.messages.map((message) => {
									return (
										<ListItem
											button
											key={message.id}
											selected={this.state.selected === message.id}
											onClick={() => {
												this.setState({selected: message.id });
											}}>
											<ListItemText>{message.username}</ListItemText>
										</ListItem>
									);
								})}
						</List>
					</Grid>
				</Grid>
				<Grid container justify='center' alignItems='center' spacing={2}>
					{this.state.selected !== null &&
						this.props.messages &&
						this.props.messages[this.state.selected].messages
							.map((message, index) => {
								return (
									<ConversationListItem message={message} key={message.id}/>
									)
								})
							}
				</Grid>
			</TwoColumnLayout>
		);
	}
}

const mapStateToProps = store => {
	return {
		// mentors: store.allMentorsReducer,
		// selectedUser: store.selectedUserReducer,
		user: store.user,
		messages: store.allMessagesReducer
	};
};

export default connect(mapStateToProps)(MessagesCenter);
