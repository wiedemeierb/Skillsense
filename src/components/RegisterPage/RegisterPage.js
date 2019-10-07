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
			<TwoColumnLayout leftHeader='What is SkillSense?' rightHeader='Register'>
				<div>
					<Typography paragraph>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</Typography>
				</div>
				<div>
					<FormControl className={classes.formControl} required>
						<Select
							className={classes.select}
							value={this.state.accountType}
							onChange={e => this.handleInputChangeFor('accountType', e)}>
							<MenuItem value={1}>Student</MenuItem>
							<MenuItem value={2}>Mentor</MenuItem>
							<MenuItem value={3}>Client</MenuItem>
						</Select>
					</FormControl>
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
					<TextField
						className={classes.formControl}
						onChange={e => this.handleInputChangeFor('username', e)}
						value={this.state.username}
						required
						label='Name'
						placeholder='Your Name...'
					/>
					<TextField
						className={classes.formControl}
						onChange={e => this.handleInputChangeFor('location', e)}
						value={this.state.location}
						required
						label='Location'
						placeholder='Your location...'
					/>
					<Button onClick={this.registerUser}>Register Account</Button>
				</div>
			</TwoColumnLayout>
		);

		// return (
		//   <div>
		//     {this.props.errors.registrationMessage && (
		//       <h2
		//         className="alert"
		//         role="alert"
		//       >
		//         {this.props.errors.registrationMessage}
		//       </h2>
		//     )}
		//     <form onSubmit={this.registerUser}>
		//       <h1>Register User</h1>
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
		//           className="register"
		//           type="submit"
		//           name="submit"
		//           value="Register"
		//         />
		//       </div>
		//     </form>
		//     <center>
		//       <button
		//         type="button"
		//         className="link-button"
		//         onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
		//       >
		//         Login
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

export default connect(mapStateToProps)(withStyles(styles)(RegisterPage));
