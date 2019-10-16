import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//COMPONENT IMPORTS
import OneColumnLayout from '../OneColumnLayout/OneColumnLayout';
// MATERIAL-UI IMPORTS
import {
    TextField,
    Grid,
    Button,
    FormControl,
    Select,
    MenuItem,
    FormHelperText,
    InputLabel,
    Divider
} from '@material-ui/core';
//STYLING IMPORTS
import { withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';

const styles = theme => ({
    root: {
        margin: 'auto',
        width: '70vw'
    },
    formControl: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
        minWidth: 200
    },
    largeFormControl: {
        margin: theme.spacing(1)
    },
    select: {
        minWidth: 150,
        margin: theme.spacing(1)
    },
    button: {
        color: 'white',
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    }
});

class RegisterPage extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        location: '',
        github_url: '',
        linkedin_url: '',
        website_url: '',
        bio: '',
        focus_skill: '',
        userType: ''
    };

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_USER_TYPES' });
    };

    registerUser = event => {
        if (
            this.state.username &&
            this.state.password &&
            this.state.email &&
            this.state.location &&
            this.state.userType &&
            this.state.focus_skill
        ) {
            this.props.dispatch({
                type: 'REGISTER',
                payload: this.state
            });
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Welcome to SkillSense',
                showConfirmButton: false,
                timer: 1500
            });
            this.props.history.push('/home');
        } else {
            this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
            this.errorMessage();
        }
    }; // end registerUser

    errorMessage() {
        Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Error Registering',
            text: `${this.props.errors.registrationMessage}`,
            showConfirmButton: false,
            timer: 1500
        });
    }

    handleInputChangeFor = (propertyName, event) => {
        this.setState({
            [propertyName]: event.target.value
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <OneColumnLayout header="Register New Account">
                <Grid container className={classes.root} spacing={4} align="center">
                    {/* REGISTRATION ACCOUNT INFO */}
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            className={classes.formControl}
                            label="Your Email"
                            helperText="@domain.com"
                            value={this.state.email}
                            required
                            onChange={e => this.handleInputChangeFor('email', e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            className={classes.formControl}
                            label="Password"
                            type="password"
                            helperText="8+ characters"
                            value={this.state.password}
                            required
                            onChange={e => {
                                this.handleInputChangeFor('password', e);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel required htmlFor="userTypeHelper"></InputLabel>
                            <Select
                                value={this.state.userType}
                                required
                                inputProps={{ name: 'User Type', id: 'userTypeHelper' }}
                                onChange={event => this.setState({ userType: event.target.value })}>
                                {this.props.userTypes.map(type => {
                                    if (type.user_type !== 'Admin') {
                                        return (
                                            <MenuItem key={type.id} value={type.id}>
                                                {type.user_type}
                                            </MenuItem>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </Select>
                            <FormHelperText>Choose Your Account Type</FormHelperText>
                        </FormControl>
                    </Grid>

                    {/* USER DETAILS */}
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            className={classes.formControl}
                            label="Name"
                            helperText="Your Full Name/Display Name"
                            value={this.state.username}
                            required
                            onChange={e => this.handleInputChangeFor('username', e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            className={classes.formControl}
                            label="Location"
                            helperText="Your City/State"
                            value={this.state.location}
                            required
                            onChange={e => this.handleInputChangeFor('location', e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            className={classes.formControl}
                            label="Your Title"
                            helperText="e.g. Back End Developer..."
                            value={this.state.focus_skill}
                            required
                            onChange={e => this.handleInputChangeFor('focus_skill', e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            className={classes.formControl}
                            label="LinkedIn"
                            helperText="Link To Your LinkedIn Profile"
                            value={this.state.linkedin_url}
                            onChange={e => this.handleInputChangeFor('linkedin_url', e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            className={classes.formControl}
                            label="Github"
                            helperText="Link To Your Github Profile"
                            value={this.state.github_url}
                            onChange={e => this.handleInputChangeFor('github_url', e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            className={classes.formControl}
                            label="Other Website"
                            helperText="Link To Your Portfolio, Etc..."
                            value={this.state.website_url}
                            onChange={e => this.handleInputChangeFor('website_url', e)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    {/* USER BIO */}
                    <Grid item xs={12}>
                        <TextField
                            className={classes.largeFormControl}
                            label="Bio"
                            align="left"
                            multiline
                            rows="4"
                            variant="outlined"
                            helperText="Please write a short description of who you are and what you do."
                            value={this.state.bio}
                            onChange={e => this.handleInputChangeFor('bio', e)}
                        />
                    </Grid>

                    {/* BUTTONS: BACK + REGISTER */}
                    <Grid item xs={12} align="center">
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={() => {
                                this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' });
                            }}>
                            Back to Log In
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.registerUser}
                            className={classes.button}>
                            Register New Account
                        </Button>
                    </Grid>
                </Grid>
            </OneColumnLayout>
        );
    }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
    errors: state.errors,
    userTypes: state.userTypesReducer
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(RegisterPage)));
