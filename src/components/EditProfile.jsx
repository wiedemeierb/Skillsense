import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, Link, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	}
}));

function EditProfile(props) {
	const classes = useStyles();
	let dispatch = useDispatch();
	let [user, setUser] = useState(props.user);

	const handleInputChangeFor = (event, name) => {
		setUser({ ...user, [name]: event.target.value });
	};

	const editStudentInfo = () => {
		console.log('handleClick saveSkills operations');
		console.log('this is state on didMount', user);
		dispatch({
			type: 'EDIT_USER_INFO',
			payload: user
		});
		props.toggleEdit();
	};

	return (
		<Grid className={classes.root} container spacing={4} justify='space-around'>
			<Grid item xs={12}>
				<TextField
					required
					id='outlined-required'
					label='Name'
					defaultValue={user.username}
					margin='normal'
					variant='outlined'
					onChange={event => {
						handleInputChangeFor(event, 'username');
					}}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					required
					id='outlined-required'
					label='Title'
					defaultValue={user.focus_skill}
					margin='normal'
					variant='outlined'
					onChange={event => {
						handleInputChangeFor(event, 'focus_skill');
					}}
				/>
				<TextField
					required
					id='outlined-required'
					label='Location'
					defaultValue={user.location}
					margin='normal'
					variant='outlined'
					onChange={event => {
						handleInputChangeFor(event, 'location');
					}}
				/>
			</Grid>
			<Grid item xs={12}>
				{/* <Typography variant='body2'>{displayedUser.bio}</Typography> */}
			</Grid>
			<Grid item xs={6}>
				<TextField
					required
					id='outlined-required'
					label='LinkedIn'
					defaultValue={user.linkedin_url}
					margin='normal'
					variant='outlined'
					onChange={event => {
						handleInputChangeFor(event, 'linkedin_url');
					}}
				/>
				<TextField
					required
					id='outlined-required'
					label='Github'
					defaultValue={user.github_url}
					margin='normal'
					variant='outlined'
					onChange={event => {
						handleInputChangeFor(event, 'github_url');
					}}
				/>
			</Grid>
			<Grid item xs={6}>
				<TextField
					required
					id='outlined-required'
					label='Website'
					defaultValue={user.website_url}
					margin='normal'
					variant='outlined'
					onChange={event => {
						this.handleInputChangeFor(event, 'website_url');
					}}
				/>
				<TextField
					required
					id='outlined-required'
					label='Website'
					defaultValue={user.email}
					margin='normal'
					variant='outlined'
					onChange={event => {
						handleInputChangeFor(event, 'email');
					}}
				/>
			</Grid>
			<Grid item xs={12}>
				<Button onClick={editStudentInfo}>Save</Button>
			</Grid>
		</Grid>
	);
}
export default EditProfile;
