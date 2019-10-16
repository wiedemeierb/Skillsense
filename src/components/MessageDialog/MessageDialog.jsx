import React, {useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button} from '@material-ui/core'

function MessageDialog(props) {
  const [open, setOpen] = useState(props.open)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="message-dialog">Send Message</DialogTitle>
      <DialogContent>
        <DialogContentText>Please input your message to send to {props.recipient}</DialogContentText>
        <TextField autoFocus margin="dense" label="Your Message" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Send Message
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default MessageDialog;
