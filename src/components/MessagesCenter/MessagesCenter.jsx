import React, { Component } from 'react';
import { connect } from 'react-redux';
//material-ui imports
import {
	Grid,
	List,
	ListItem,
	ListItemText,
	Typography
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
							{this.props.messages.length !== 0 ?
								this.props.messages.map(message => {
									return (
										<ListItem
											button
											divider={true}
											key={message.id}
											selected={this.state.selected === message.id}
											onClick={() => {
												this.setState({
													selected: message.id,
													selectedUser: message.username
												});
											}}>
											<ListItemText
												primary={message.username}
												secondary={message.focus_skill}
												primaryTypographyProps={{
													variant: 'h6',
													color: 'primary'
												}}
												secondaryTypographyProps={{
													variant: 'subtitle1',
													color: 'secondary'
												}}
											/>
										</ListItem>
									);
								}) : <ListItem><Typography variant="h6" align="center">No items to display</Typography></ListItem>}
						</List>
					</Grid>
				</Grid>
				<Grid container justify='center' alignItems='center' spacing={2}>
					<>
						{this.state.selected !== null && (
							<MessageDialog
								recipient={{
									id: this.state.selected,
									username: this.state.selectedUser
								}}
							/>
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
