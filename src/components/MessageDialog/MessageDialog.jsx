import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	button: {
		padding: theme.spacing(0),
		margin: theme.spacing(0)
	}
}));

function MessageDialog(props) {
	const [open, setOpen] = useState(props.open);
	const [message, setMessage] = useState('');
	const classes = useStyles();

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const dispatch = useDispatch();

	return (
		<>
			<Button
				className={classes.button}
				variant='contained'
				color='primary'
				onClick={handleClickOpen}>
				Reply
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle id='message-dialog'>Send Message</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please type your message to send to {props.recipient.username}
					</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						label='Your Message'
						fullWidth
						value={message}
						onChange={e => setMessage(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='secondary'>
						Cancel
					</Button>
					<Button
						onClick={() => {
							dispatch({
								type: 'SEND_MESSAGE',
								payload: { recipient: props.recipient, message: message }
							});
							setMessage('');
							handleClose();
						}}
						color='primary'>
						Send Message
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
export default MessageDialog;
