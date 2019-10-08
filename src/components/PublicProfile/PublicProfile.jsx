import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SkillList from '../SkillList/SkillList';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	}
}));

function PublicProfile(props) {
	let selectedUser = useSelector(state => state.selectedUserReducer);
	// const selectedUser = {
	// 	access_id: 2,
	// 	active: true,
	// 	approved_mentor: 2,
	// 	bio:
	// 		'Back end Dev specializing in Java and PHP.  Apartment handyman on the side.  Students I have tutored in the past have gone on to win many awards.',
	// 	email: 'mentor@mentor.com',
	// 	focus_skill: 'Front End Developer',
	// 	github_url: null,
	// 	id: 7,
	// 	linkedin_url: null,
	// 	location: 'St. Paul, MN',
	// 	mentor_status: 'Pending Approval',
	// 	skill_ids: [1, 4, 19, 10],
	// 	skill_names: [
	// 		'Adobe Photoshop',
	// 		'Sketch',
	// 		'Webpack',
	// 		'Mobile App Development'
	// 	],
	// 	user_type: 'Mentor',
	// 	username: 'mentor',
	// 	website_url: null
	// };

	const classes = useStyles();

	return (
		<Grid container spacing={4} justify='space-around'>
			<Grid item xs={12}>
				<Typography variant='h4' align='center'>
					{selectedUser.username}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant='h5' align='left'>
					{selectedUser.focus_skill}
				</Typography>
				<Typography variant='h6' align='left'>
					Location: {selectedUser.location}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography paragraph>{selectedUser.bio}</Typography>
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
				<SkillList skillList={selectedUser.skill_names} />
			</Grid>
		</Grid>
	);
}
export default PublicProfile;
