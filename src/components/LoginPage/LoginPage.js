import React, { Component } from 'react';
import { connect } from 'react-redux';
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
import { Typography, TextField, Button, Grid } from '@material-ui/core';
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
			this.props.history.push('/home')
		} else {
			this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
		}
	}; // end login

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
			<div>
				{this.props.errors.loginMessage && (
					<h2 className='alert' role='alert'>
						{this.props.errors.loginMessage}
					</h2>
				)}
				<TwoColumnLayout leftHeader='What is SkillSense?' rightHeader='Log In'>
					<Grid
						container
						spacing={6}
						direction='column'
						alignItems='center'
						justify='space-between'>
						<Grid className={classes.aboutText} item xs={8}>
							<Typography paragraph>
								Freelancing can be especially difficult to break into for new
								software developers, but it is often the connections that
								students make with industry professionals which serve as the
								best avenue for success.
							</Typography>
						</Grid>
						<Grid className={classes.aboutText} item xs={8}>
							<Typography paragraph>
								SkillSense helps create that avenue by bringing together
								students, mentors, and clients alike for freelance projects.
							</Typography>
						</Grid>
					</Grid>
					<div onKeyUp={this.handleKeyUp}>
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
							onChange={e => this.handleInputChangeFor('password', e)}
							value={this.state.password}
							required
							type='password'
							label='Password'
							placeholder='***'
						/>
						<Button variant="contained" color="primary" className={classes.button} onClick={() => this.login()}>
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
					</div>
				</TwoColumnLayout>
			</div>
		);
		// return (
		//   <div>
		//     {this.props.errors.loginMessage && (
		//       <h2
		//         className="alert"
		//         role="alert"
		//       >
		//         {this.props.errors.loginMessage}
		//       </h2>
		//     )}
		//     <form onSubmit={this.login}>
		//       <h1>Login</h1>
		//       <div>
		//         <label htmlFor="username">
		//           Username:
		//           <input
		//             type="text"
		//             name="username"
		//             value={this.state.username}
		//             onChange={this.handleInputChangeFor('username')}
		//           />
		//         </label>
		//       </div>
		//       <div>
		//         <label htmlFor="password">
		//           Password:
		//           <input
		//             type="password"
		//             name="password"
		//             value={this.state.password}
		//             onChange={this.handleInputChangeFor('password')}
		//           />
		//         </label>
		//       </div>
		//       <div>
		//         <input
		//           className="log-in"
		//           type="submit"
		//           name="submit"
		//           value="Log In"
		//         />
		//       </div>
		//     </form>
		//     <center>
		//       <button
		//         type="button"
		//         className="link-button"
		//         onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
		//       >
		//         Register
		//       </button>
		//     </center>
		//   </div>
		// );
	}
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
	errors: state.errors
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
