import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';

//COMPONENT IMPORTS
import TransferList from '../TransferList/TransferList';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
        width: '70vw'
    },
    button: {
        marginTop: theme.spacing(2)
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
        dispatch({
            type: 'EDIT_USER_INFO',
            payload: user
        });
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Your profile has been edited',
            showConfirmButton: false,
            timer: 1500
        });
        props.toggleEdit();
    };

    //checks if user type should be able to view this page
    let isStudent = () => {
        return props.user.user_type === 'Student';
    };

    //checks if user type should be able to view this page
    let isMentor = () => {
        return props.user.user_type === 'Mentor';
    };

    return (
        <Grid className={classes.root} container spacing={4} justify="space-around">
            {/* ROW ONE: NAME, TITLE, LOCATION */}
            <Grid item xs={12} sm={4}>
                <TextField
                    required
                    id="name"
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
            <Grid item xs={12} sm={4}>
                <TextField
                    required
                    id="title"
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
            <Grid item xs={12} sm={4}>
                <TextField
                    required
                    id="location"
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
                    id="bio"
                    label="Bio"
                    defaultValue={user.bio}
                    multiline
                    rows="4"
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    onChange={event => {
                        handleInputChangeFor(event, 'bio');
                    }}
                />
            </Grid>
            {/* ROW THREE: LINKEDIN, GITHUB, WEBSITE */}
            <Grid item xs={12} sm={6}>
                <TextField
                    id="linkedin"
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
            <Grid item xs={12} sm={6}>
                <TextField
                    id="github"
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
            <Grid item xs={12} sm={6}>
                <TextField
                    id="website"
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
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="email"
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
            {isStudent() || isMentor() ? (
                <Grid item xs={12} align="center">
                    <TransferList allSkills={skills} user={reduxUser} />
                </Grid>
            ) : null}

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
