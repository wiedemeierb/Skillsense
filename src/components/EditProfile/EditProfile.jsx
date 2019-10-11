import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'

//COMPONENT IMPORTS
import TransferList from '../TransferList/TransferList';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        padding: theme.spacing(2)
    },
    button: {
        color: 'white'
    }
}));

function EditProfile(props) {
    const classes = useStyles();
    let dispatch = useDispatch();
    let [user, setUser] = useState(props.user);
    let skills = useState(props.skills);
    let reduxUser = useSelector(state => state.user);

    const handleInputChangeFor = (event, name) => {
        setUser({ ...user, [name]: event.target.value });
    };

    useEffect(() => {
        setUser(reduxUser);
    }, [reduxUser]);

	const editStudentInfo = () => {
		console.log('handleClick saveSkills operations');
		console.log('this is state on didMount', user);
		Swal.fire({
			position: 'center',
			type: 'success',
			title: 'Your profile has been edited',
			showConfirmButton: false,
			timer: 1500
		})
		dispatch({
			type: 'EDIT_USER_INFO',
			payload: user
		});
		props.toggleEdit();
	};

    return (
        <Grid className={classes.root} container spacing={4} justify="space-around">
            {/* ROW ONE: NAME, TITLE, LOCATION */}
            <Grid item xs={4}>
                <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    defaultValue={user.username}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    onChange={event => {
                        handleInputChangeFor(event, 'username');
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    required
                    id="outlined-required"
                    label="Title"
                    defaultValue={user.focus_skill}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    onChange={event => {
                        handleInputChangeFor(event, 'focus_skill');
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    required
                    id="outlined-required"
                    label="Location"
                    defaultValue={user.location}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    onChange={event => {
                        handleInputChangeFor(event, 'location');
                    }}
                />
            </Grid>
            {/* ROW TWO: BIO */}
            <Grid item xs={12}>
                <TextField
                    id="outlined-required"
                    label="Bio"
                    defaultValue={user.bio}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    onChange={event => {
                        handleInputChangeFor(event, 'bio');
                    }}
                />
            </Grid>
            {/* ROW THREE: LINKEDIN, GITHUB, WEBSITE */}
            <Grid item xs={6}>
                <TextField
                    required
                    id="outlined-required"
                    label="LinkedIn"
                    defaultValue={user.linkedin_url}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    onChange={event => {
                        handleInputChangeFor(event, 'linkedin_url');
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    required
                    id="outlined-required"
                    label="Github"
                    defaultValue={user.github_url}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    onChange={event => {
                        handleInputChangeFor(event, 'github_url');
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    required
                    id="outlined-required"
                    label="Website"
                    defaultValue={user.website_url}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    onChange={event => {
                        handleInputChangeFor(event, 'website_url');
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    defaultValue={user.email}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    onChange={event => {
                        handleInputChangeFor(event, 'email');
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TransferList allSkills={skills} user={reduxUser} />
            </Grid>
            {/* ROW FIVE: SAVE */}
            <Grid item xs={6} align="center">
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth={true}
                    className={classes.button}
                    onClick={editStudentInfo}>
                    Save
                </Button>
            </Grid>
        </Grid>
    );
}

export default EditProfile;
