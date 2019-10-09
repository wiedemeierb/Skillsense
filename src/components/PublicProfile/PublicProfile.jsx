import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SkillList from '../SkillList/SkillList';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	}
}));

function PublicProfile(props) {
	const selectedUser = useSelector(state => state.selectedUserReducer);

	const classes = useStyles();

	return (
		<Grid className={classes.root} container spacing={4} justify='space-around'>
			<Grid item xs={12}>
				<Typography variant='h5' align='center'>
					{selectedUser.username}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant='h6' align='left'>
					{selectedUser.focus_skill}
				</Typography>
				<Typography variant='body1' align='left'>
					{selectedUser.location}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant='body2'>{selectedUser.bio}</Typography>
			</Grid>
			<Grid item xs={6}>
				<Typography align='left'>
					<Link href={selectedUser.linkedin_url}>LinkedIn</Link>
				</Typography>
				<Typography align='left'>
					<Link href={selectedUser.github_url}>Github</Link>
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<Typography align='right'>
					<Link href={selectedUser.website_url}>Website</Link>
				</Typography>
				<Typography align='right'>
					<Link target='_blank' href={`mailto:${selectedUser.email}`}>
						E-Mail
					</Link>
				</Typography>
			</Grid>
			<Grid item xs={12}>
				{selectedUser.skill_names && <SkillList skillList={selectedUser.skill_names} />
}
			</Grid>
		</Grid>
	);
}
export default PublicProfile;
