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
		padding: theme.spacing(2, 0)
	},
	link: {
		fontWeight: 'bold'
	},
	resumeLink: {
		display: 'inline-block',
		fontWeight: 'bold',
		verticalAlign: 'middle'
	},
	button: {
		padding: theme.spacing(1),
		margin: theme.spacing(1)
	}
}));

function ApplicantDetailStudent(props) {
	const classes = useStyles();

	return (
		<Grid container justify='space-around' spacing={2} className={classes.root}>
			{/* Applicant Info */}
			<Grid item xs={12}>
				<Typography variant='h5' color='secondary'>
					Student Information:
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<Typography variant='h5' color='primary'>
					{props.applicant.username}
				</Typography>
				<Typography variant='h6'>{props.applicant.focus_skill}</Typography>
				<Typography variant='subtitle1' gutterBottom>
					{props.applicant.location}
				</Typography>
			</Grid>

			{/* Bio & Resume */}
			<Grid item xs={6}>
				<Grid container direction='row' justify='space-around'>
					{props.applicant.bio !== null && (
						<Grid item xs={12}>
							<Typography variant='h6' color='primary'>
								Bio:
							</Typography>
							<Typography variant='caption' gutterBottom>
								{props.applicant.bio}
							</Typography>
						</Grid>
					)}
				</Grid>
			</Grid>

			{/* Cover Letter */}
			<Grid
				item
				container
				alignItems='flex-start'
				justify='space-between'
				className={classes.section}>
				<Grid item xs={8}>
					<Typography variant='h6' color='primary' align='left'>
						Cover Letter:
					</Typography>
					<Grid item xs={12}>
						<Typography variant='body2'>{props.applicant.cover_letter}</Typography>
					</Grid>
				</Grid>
				{props.applicant.attachment_url !== null && (
					<Grid item xs={3}>
						<Link target='_blank' href={props.applicant.attachment_url}>
							<Button color='primary' startIcon={<DescriptionIcon />}>
								View Attachment
							</Button>
						</Link>
					</Grid>
				)}
			</Grid>

			{/* User Info */}
			<Grid item container className={classes.section}>
				{/* <Grid item xs={8}> */}
				<Typography variant='h6' color='primary'>
					Student Links:
				</Typography>
				{/* </Grid> */}
				<Grid item container align='center' xs={12}>
					{props.applicant.linkedin_url !== null && (
						<Grid item xs={3}>
							<Link href={props.applicant.linkedin_url}>
								<Typography className={classes.link}>
									<LinkedInIcon fontSize='large' />
								</Typography>
								<Typography className={classes.link}>LinkedIn</Typography>
							</Link>
						</Grid>
					)}
					{props.applicant.github_url !== null && (
						<Grid item xs={3}>
							<Link href={props.applicant.github_url}>
								<Typography className={classes.link}>
									<GitHubIcon fontSize='large' />
								</Typography>
								<Typography className={classes.link}>GitHub</Typography>
							</Link>
						</Grid>
					)}
					{props.applicant.website_url !== null && (
						<Grid item xs={3}>
							<Link href={props.applicant.website_url}>
								<Typography className={classes.link}>
									<LanguageIcon fontSize='large' />
								</Typography>
								<Typography className={classes.link}>Website</Typography>
							</Link>
						</Grid>
					)}
					{props.applicant.email !== null && (
						<Grid item xs={3}>
							<Link target='_blank' href={`mailto:${props.applicant.email}`}>
								<Typography className={classes.link}>
									<EmailIcon fontSize='large' />
								</Typography>
								<Typography className={classes.link}>E-Mail</Typography>
							</Link>
						</Grid>
					)}
				</Grid>
			</Grid>

			{/* Applicant Skill List */}
			<Grid item container align='center' className={classes.section}>
				{props.applicant.studentSkills && (
					<Grid item xs={12}>
						<Typography variant='h6' align='left' color='primary'>
							Student's Skills:
						</Typography>
						<SkillList skillList={props.applicant.studentSkills} />
					</Grid>
				)}
			</Grid>
		</Grid>
	);
}
export default ApplicantDetailStudent;
