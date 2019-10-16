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
import MessageDialog from '../MessageDialog/MessageDialog';

const styles = theme => ({
	root: {
		display: 'flex'
	},
	messageList: {},
	messageListItem: {},
	button: {
		display: 'flex',
		padding: theme.spacing(1),
		margin: 'auto'
	}
});

class MessagesCenter extends Component {
	state = {
		selected: null,
		selectedUser: '',
		dialogOpen: false,
		messages: []
	};

	componentDidMount() {
		// gets all accepted mentorship relationships from the server and stores them in the allMentorsReducer
		this.props.dispatch({
			type: 'FETCH_ALL_MESSAGES'
		});
	}

	toggleDialog = () => {
		this.setState({ dialogOpen: !this.state.dialogOpen });
	};

	render() {
		const { classes } = this.props;
		return (
			<TwoColumnLayout leftHeader='Inbox' rightHeader='details'>
				<Grid container justify='center' alignItems='center' spacing={2}>
					<Grid item xs={12}>
						<List>
							{this.props.messages &&
								this.props.messages.map(message => {
									return (
										<ListItem
											button
											key={message.id}
											selected={this.state.selected === message.id}
											onClick={() => {
												this.setState({
													selected: message.id,
													selectedUser: message.username,
												});
											}}>
											<ListItemText>{message.username}</ListItemText>
										</ListItem>
									);
								})}
						</List>
					</Grid>
				</Grid>
				<Grid container justify='center' alignItems='center' spacing={2}>
					<>
						{this.state.selected !== null && (
							<Grid item xs>
								<MessageDialog
									open={this.state.dialogOpen}
									recipient={{
										id: this.state.selected,
										username: this.state.selectedUser
									}}
								/>
							</Grid>
						)}
						{this.state.selected &&
							this.props.messages
								.filter(message => message.id === this.state.selected)[0]
								.messages.map(message => (
									<ConversationListItem message={message} key={message.id} />
								))}
					</>
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

export default connect(mapStateToProps)(withStyles(styles)(MessagesCenter));
