import React from 'react';
import { Grid, Typography, Button, Link } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';
import EmailIcon from '@material-ui/icons/Email';
import { makeStyles } from '@material-ui/core/styles';
import SkillList from '../SkillList/SkillList';

const useStyles = makeStyles(theme => ({
	root: {
		margin: 'auto',
		width: '90vh'
	},
	section: {
		padding: theme.spacing(2)
	},
	link: {
		fontWeight: 'bold'
	},
}));

function ApplicantDetailStudent(props) {
	const classes = useStyles();

	return (
		<Grid container justify='space-around' spacing={2} className={classes.root}>
			{/* Applicant Info */}
			<Grid item xs={12}>
				<Typography variant='h5' color='secondary'>
					Mentor Information:
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<Typography variant='h6' color='primary'>
					{props.mentor.username}
				</Typography>
				<Typography variant='subtitle1'>{props.mentor.focus_skill}</Typography>
				<Typography variant='subtitle2' gutterBottom>
					{props.mentor.location}
				</Typography>
			</Grid>

			{/* Bio & Resume */}
			<Grid item xs={6}>
				<Grid container direction='row' justify='space-around'>
					{props.mentor.bio !== null && (
						<Grid item xs={12}>
							<Typography variant='h6' color='primary'>
								Bio:
							</Typography>
							<Typography variant='caption' gutterBottom>
								{props.mentor.bio}
							</Typography>
						</Grid>
					)}
				</Grid>
			</Grid>

			{/* User Info */}
			<Grid item container className={classes.section}>
				{/* <Grid item xs={8}> */}
				<Typography variant='h6' color='primary'>
					Mentor's Links:
				</Typography>
				{/* </Grid> */}
				<Grid item container align='center' xs={12}>
					{props.mentor.linkedin_url !== null && (
						<Grid item xs={3}>
							<Link href={props.mentor.linkedin_url}>
								<Typography className={classes.link}>
									<LinkedInIcon fontSize='large' />
								</Typography>
								<Typography className={classes.link}>LinkedIn</Typography>
							</Link>
						</Grid>
					)}
					{props.mentor.github_url !== null && (
						<Grid item xs={3}>
							<Link href={props.mentor.github_url}>
								<Typography className={classes.link}>
									<GitHubIcon fontSize='large' />
								</Typography>
								<Typography className={classes.link}>GitHub</Typography>
							</Link>
						</Grid>
					)}
					{props.mentor.website_url !== null && (
						<Grid item xs={3}>
							<Link href={props.mentor.website_url}>
								<Typography className={classes.link}>
									<LanguageIcon fontSize='large' />
								</Typography>
								<Typography className={classes.link}>Website</Typography>
							</Link>
						</Grid>
					)}
					{props.mentor.email !== null && (
						<Grid item xs={3}>
							<Link target='_blank' href={`mailto:${props.mentor.email}`}>
								<Typography className={classes.link}>
									<EmailIcon fontSize='large' />
								</Typography>
								<Typography className={classes.link}>E-Mail</Typography>
							</Link>
						</Grid>
					)}
				</Grid>
			</Grid>

			{/* Mentor Skill List */}
			<Grid item container align='center' className={classes.section}>
				{props.mentor.skills && (
					<Grid item xs={12}>
						<Typography variant='h6' align='left' color='primary'>
							Mentor's Skills:
						</Typography>
						<SkillList skillList={props.mentor.skills} />
					</Grid>
				)}
			</Grid>
		</Grid>
	);
}
export default ApplicantDetailStudent;
