import React, { Component } from 'react';
import { connect } from 'react-redux';
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
import { Typography, TextField, Button, Grid, FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		display: 'flex'
	},
	formControl: {
		display: 'block',
		margin: theme.spacing(2),
		padding: theme.spacing(2)
	},
	aboutText: {
		margin: theme.spacing(2),
		padding: theme.spacing(2)
	},
	button: {
		color: 'white',
		margin: theme.spacing(1),
		padding: theme.spacing(1)
	}
});

class LoginPage extends Component {
	state = {
		email: '',
		password: ''
	};

	login = event => {
		if (this.state.email && this.state.password) {
			this.props.dispatch({
				type: 'LOGIN',
				payload: {
					username: this.state.email,
					password: this.state.password
				}
			});
			// if(this.props.user.user_type === 'Student'){
			// 	this.props.history.push('/search/jobs')
			// } else if (this.props.user.user_type === 'Mentor'){
			// 	this.props.history.push('/mentors')
			// } else if (this.props.user.user_type === 'Client'){
			// 	this.props.history.push('/jobs')
			// } else if (this.props.user.user_type === 'Admin'){
			// 	this.props.history.push('/admin')
			// }else {
			// 	this.props.history.push('/')
			// }
		} else {
			this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
		}
	}; // end login

	//saves input in local state on change
	handleInputChangeFor = (propertyName, event) => {
		this.setState({
			[propertyName]: event.target.value
		});
	};

	//Allows user to login using the Enter key while focus is within the Input area
	handleKeyUp = (key) => {
		if (key.key === 'Enter') {
			this.login();
		}
	}

	render() {
		const { classes } = this.props;
		return (
			<Grid container>
				{this.props.errors.loginMessage && (
					<Typography variant="h2" className='alert' role='alert'>
						{this.props.errors.loginMessage}
					</Typography>
				)}
				<TwoColumnLayout leftHeader='What is SkillSense?' rightHeader='Log In'>
					<Grid
						container
						spacing={6}
						direction='column'
						alignItems='center'
						justify='space-between'>
						<Grid className={classes.aboutText} item xs={12}>
							<Typography paragraph>
								Freelancing can be especially difficult to break into for new
								software developers, but it is often the connections that
								students make with industry professionals which serve as the
								best avenue for success.
							</Typography>
						</Grid>
						<Grid className={classes.aboutText} item xs={12}>
							<Typography paragraph>
								SkillSense helps create that avenue by bringing together
								students, mentors, and clients alike for freelance projects.
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={12} onKeyUp={this.handleKeyUp}>
						<FormControl onSubmit={this.login}>
							<TextField
								className={classes.formControl}
								onChange={e => this.handleInputChangeFor('email', e)}
								value={this.state.email}
								required
								label='E-Mail'
								placeholder='Your e-mail address...'
							/>
							<TextField
								className={classes.formControl}
								onChange={event => this.handleInputChangeFor('password', event)}
								value={this.state.password}
								required
								type='password'
								label='Password'
								placeholder='***'
							/>
							<Button variant="contained" color="primary" className={classes.button} type="submit">
								Log In
							</Button>
							<Button
								variant="contained" color="secondary"
								className={classes.button}
								onClick={() => {
									this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' });
								}}>
								Create New Account
							</Button>
						</FormControl>
					</Grid>
				</TwoColumnLayout>
			</Grid>
		);
	}
}

const mapStateToProps = state => ({
	errors: state.errors
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
