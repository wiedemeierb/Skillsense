import React, { Component } from 'react';
import { connect } from 'react-redux';
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
import {
	Typography,
	TextField,
	Button,
	FormControl,
	Select,
	MenuItem
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		display: 'flex'
	},
	formControl: {
		display: 'block',
		margin: theme.spacing(1),
		minWidth: 150
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
					email: this.state.email,
					password: this.state.password
				}
			});
		} else {
			this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
		}
	}; // end login

	handleInputChangeFor = (propertyName, event) => {
		this.setState({
			[propertyName]: event.target.value
		});
	};

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
					<Typography paragraph>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</Typography>
					<div>
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
						<Button className={classes.button} onClick={() => this.login()}>
							Log In
						</Button>
						<Button
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
