import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';


export default function FormDialog(props) {

  let dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  //When the Request Mentor button is clicked, the modal opens
  const handleClickOpen = () => {
    setOpen(true);
  };

  //When the action buttons within the modal are clicked, the modal closes
  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Your Mentorship request has been sent!',
      timer: 1500
    })
    setOpen(false);
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
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
            multiline={true}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            // onClick={handleClose}
            onClick={() => {
              dispatch({
                type: 'SEND_MENTOR_REQUEST',
                payload: { mentor: props.mentor.id, message: message }
              });
              handleSend();
            }}
            variant="contained"
            color="primary"
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
