import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	skillTag: {
		display: 'inline-block',
		margin: '2px',
		padding: '2px',
		color: 'white',
		backgroundColor: 'black'
	}
}));

function SkillList(props) {
	const classes = useStyles();
	return (
		<>
			{props.skillList.map((skill, index) => (
				<Typography key={index} variant='body2' className={classes.skillTag}>
					{skill}
				</Typography>
			))}
		</>
	);
}

export default SkillList;
