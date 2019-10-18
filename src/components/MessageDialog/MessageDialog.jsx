import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
//material-ui imports
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
		padding: theme.spacing(1),
		margin: theme.spacing(1)
	}
}));

function MessageDialog(props) {
	//re-usable message dialog component, pass it a recipient={id: #, username: 'name'} in props
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const classes = useStyles();

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleSendClick = () => {
		dispatch({
			type: 'SEND_MESSAGE',
			payload: { recipient: props.recipient, message: message }
		});
		Swal.fire({
			position: 'center',
			type: 'success',
			title: 'Your message has been sent!',
			timer: 1500
		});
		setMessage('');
		handleClose();
	};
	const dispatch = useDispatch();

	return (
		<>
			<Button
				className={classes.button}
				variant='contained'
				color='primary'
				onClick={handleClickOpen}>
				Send Message
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
						multiline
						value={message}
						onChange={e => setMessage(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='secondary'>
						Cancel
					</Button>
					<Button
						onClick={handleSendClick}
						color='primary'>
						Send Message
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
export default MessageDialog;
