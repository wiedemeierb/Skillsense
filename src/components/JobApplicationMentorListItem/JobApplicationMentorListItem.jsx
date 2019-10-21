import React from 'react';

import { Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	mentorListItem: {
		display: 'inline',
		minWidth: '15vw',
		padding: theme.spacing(2),
		margin: theme.spacing(0, 1, 2)
	},
	selectedMentorListItem: {
		display: 'inline',
		minWidth: '15vw',
		backgroundColor: theme.palette.secondary.dark,
		color: 'white',
		padding: theme.spacing(2),
		margin: theme.spacing(0, 1, 2)
	},
	matchingSkills: {
		display: 'inline',
		padding: theme.spacing(0, 1)
	},
	button: {
		display: 'block',
		margin: theme.spacing(1, 0),
		padding: theme.spacing(1)
	}
}));

function JobApplicationMentorListItem(props) {
	const classes = useStyles();
	return (
		<Grid
			className={props.selected ? classes.selectedMentorListItem : classes.mentorListItem}
			item>
			<Typography color='primary' variant='h5'>
				{props.listUser.username}
			</Typography>
			<Typography variant='h6'>{props.listUser.focus_skill}</Typography>
			<Typography style={{ display: 'inline' }} variant='subtitle1'>
				Matching Skills:
			</Typography>
			<Typography className={classes.matchingSkills} variant='h6' color='primary'>
				<b>{props.listUser.matchingSkillCount}</b>
			</Typography>
			<Button
				size='small'
				variant='contained'
				color='primary'
				fullWidth
				className={classes.button}
				onClick={() => props.selectMentor(props.listUser.id)}>
				{props.selected ? 'Cancel' : 'Select Mentor'}
			</Button>
		</Grid>
	);
}

export default JobApplicationMentorListItem;
