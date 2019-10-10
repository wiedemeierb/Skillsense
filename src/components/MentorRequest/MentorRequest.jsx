import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
  let dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Request Mentor
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Send a mentor request to {props.mentor.username}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please outline what you would like this mentor to assist you with:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add your comments here..."
            value={message}
            type="text"
            fullWidth
            onChange={e => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            // onClick={handleClose}
            onClick={() => {
              dispatch({
                type: 'SEND_MENTOR_REQUEST',
                payload: { mentor: props.mentor.id, message: message }
              });
              handleClose();
            }}
            color="primary"
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
