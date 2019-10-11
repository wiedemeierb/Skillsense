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
	InputLabel,
	Paper
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
		// display: 'block',
		margin: theme.spacing(1),
		padding: theme.spacing(1)
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
			<Grid container className={classes.root} spacing={2} justify='center'>
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
				<Grid item container justify='center' align='center' xs={12}>
					<Grid item xs={12}>
						<TextField
							className={classes.formControl}
							label='Your Email'
							helperText='@domain.com'
							value={this.state.email}
							required
							onChange={e => this.handleInputChangeFor('email', e)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							className={classes.formControl}
							label='Password'
							type='password'
							helperText='8+ characters'
							value={this.state.password}
							required
							onChange={e => {
								this.handleInputChangeFor('password', e);
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor='userTypeHelper'>You are a...</InputLabel>
							<Select
								value={this.state.userType}
								required
								inputProps={{ name: 'User Type', id: 'userTypeHelper' }}
								onChange={e => this.setState({ userType: e.target.value })}>
								{this.props.userTypes.map((type) => {
									if (type.user_type !== 'Admin') {
										return <MenuItem key={type.id} value={type.id}>
											{type.user_type}
										</MenuItem>
									}
								}
								)}
							</Select>
							<FormHelperText>Choose your account type...</FormHelperText>
						</FormControl>
					</Grid>
				</Grid>
				<Grid item container justify='center' align='center' xs={12}>
					<Grid item xs={4}>
						<TextField
							className={classes.formControl}
							label='Name'
							helperText='Your Full Name/Display Name'
							value={this.state.username}
							required
							onChange={e => this.handleInputChangeFor('username', e)}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							className={classes.formControl}
							label='Location'
							helperText='Your City/State'
							value={this.state.location}
							required
							onChange={e => this.handleInputChangeFor('location', e)}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							className={classes.formControl}
							label='Your Title'
							helperText='e.g. Back End Developer...'
							value={this.state.focus_skill}
							required
							onChange={e => this.handleInputChangeFor('focus_skill', e)}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							className={classes.formControl}
							label='LinkedIn'
							helperText='Link to your LinkedIn Profile'
							value={this.state.linkedin_url}
							onChange={e => this.handleInputChangeFor('linkedin_url', e)}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							className={classes.formControl}
							label='Github'
							helperText='Link to your Github Profile'
							value={this.state.github_url}
							onChange={e => this.handleInputChangeFor('github_url', e)}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							className={classes.formControl}
							label='Other Website'
							helperText='Link to your portfolio, etc...'
							value={this.state.website_url}
							onChange={e => this.handleInputChangeFor('website_url', e)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							className={classes.largeFormControl}
							label='Bio'
							multiline
							rows='6'
							variant='outlined'
							helperText='Please write a short description of who you are and what you do.'
							value={this.state.bio}
							onChange={e => this.handleInputChangeFor('bio', e)}
						/>
					</Grid>
				</Grid>

				<Grid item xs={12}>

					<Button
						variant="contained" color="secondary"
						className={classes.button}
						onClick={() => {
							this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' });
						}}>
						Back to Log In
					</Button>
					<Button variant="contained" color="primary" onClick={this.registerUser}>Register New Account</Button>
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
	errors: state.errors,
	userTypes: state.userTypesReducer
});

export default connect(mapStateToProps)(withStyles(styles)(RegisterPage));
