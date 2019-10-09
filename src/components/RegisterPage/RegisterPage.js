import React, { Component } from 'react';
import { connect } from 'react-redux';
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
import {
	Typography,
	TextField,
	Grid,
	Button,
	FormControl,
	Select,
	MenuItem,
	FormHelperText,
	Paper
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		display: 'flex',
		margin: 'auto',
		height: '80vh'
		// alignContent: 'flex-start'
	},
	formGrid: {},
	formControl: {
		display: 'block',
		margin: theme.spacing(1),
		padding: theme.spacing(1),
		width: 200
	},
	select: {
		minWidth: 150,
		margin: theme.spacing(1)
	},
	button: {
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
		accountType: ''
	};

	registerUser = event => {
		if (this.state.username && this.state.password) {
			this.props.dispatch({
				type: 'REGISTER',
				payload: {
					email: this.state.email,
					username: this.state.username,
					password: this.state.password,
					accountType: this.state.accountType,
					location: this.state.location
				}
			});
		} else {
			this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
		}
	}; // end registerUser

	handleInputChangeFor = (propertyName, event) => {
		this.setState({
			[propertyName]: event.target.value
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<Grid className={classes.formGrid} container spacing={3} justify='center'>
				<Grid item xs={12}>
					{this.props.errors.registrationMessage && (
						<Typography className='alert' role='alert' variant='h4'>
							{this.props.errors.registrationMessage}
						</Typography>
					)}
				</Grid>
				<Grid item xs={12}>
					<Typography variant='h5' align='center'>
						Register New Account
					</Typography>
				</Grid>
				<Grid item xs={5}>
					<TextField
						className={classes.formControl}
						label='Email'
						helperText='@domain.com'
					/>
					<TextField
						className={classes.formControl}
						label='Password'
						helperText='8+ characters'
					/>
					<TextField
						className={classes.formControl}
						label='Name'
						helperText='Your Name'
					/>
				</Grid>
				<Grid item xs={5}>
					<TextField
						className={classes.formControl}
						label='Focus'
						helperText='e.g. Back End Development'
					/>
					<TextField
						className={classes.formControl}
						label='Bio'
						multiline
						rows='6'
						rowsMax='6'
						helperText='A short description of yourself'
					/>
				</Grid>
				<Grid item xs={12}>
					<Button
						className={classes.button}
						onClick={() => {
							this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' });
						}}>
						Back to Log In
					</Button>
					<Button onClick={this.registerUser}>Register New Account</Button>
				</Grid>
			</Grid>
			// </div>
		);
	}
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
	errors: state.errors
});

export default connect(mapStateToProps)(withStyles(styles)(RegisterPage));
