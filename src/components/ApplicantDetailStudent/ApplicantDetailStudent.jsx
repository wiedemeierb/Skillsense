import React from 'react';
import { Grid, Typography, Link } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';
import { makeStyles } from '@material-ui/core/styles';
import SkillList from '../SkillList/SkillList';

const useStyles = makeStyles(theme => ({
	root: {
		margin: 'auto',
		width: '90%'
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
			<Grid item xs={12} md={6}>
				<Typography variant='h5' color='primary'>
					{props.applicant.username}
				</Typography>
				<Typography variant='h6'>{props.applicant.focus_skill}</Typography>
				<Typography variant='subtitle1' gutterBottom>
					{props.applicant.location}
				</Typography>
			</Grid>

			{/* Bio */}
			<Grid item container xs={12} md={6}>
				<Grid item container direction='row' justify='space-around' xs={12}>
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
				className={classes.section} xs={12}>
				<Grid item container xs={12} md={8}>
					<Typography variant='h6' color='primary' align='left'>
						Cover Letter:
					</Typography>
					<Grid item xs={12}>
						<Typography variant='body2'>{props.applicant.cover_letter}</Typography>
					</Grid>
				</Grid>
				{/* ATTACHMENT SECTION */}
				{/* {props.applicant.attachment_url !== null && (
					<Grid item xs={12} md={3}>
						<Link target='_blank' href={props.applicant.attachment_url}>
							<Button color='primary' startIcon={<DescriptionIcon />}>
								View Attachment
							</Button>
						</Link>
					</Grid>
				)} */}
			</Grid>

			{/* User Info */}
			<Grid item container className={classes.section} xs={12}>
				<Grid item xs={12}>
					<Typography variant='h6' color='primary'>
						Student Links:
				</Typography>
				</Grid>
				<Grid item container align='center' justify="space-around" xs={12}>
					<Grid item xs={4} align='center' >
						<Link
							target='_blank'
							href={props.applicant.linkedin_url}
							color={props.applicant.linkedin_url ? 'primary' : 'error'}
							style={props.applicant.linkedin_url ? {} : { pointerEvents: 'none' }}>
							<Typography className={classes.link}>
								<LinkedInIcon fontSize='large' />
							</Typography>
							<Typography className={classes.link}>LinkedIn</Typography>
						</Link>
					</Grid>
					<Grid item xs={4} align='center' >
						<Link
							target='_blank'
							href={props.applicant.github_url}
							color={props.applicant.github_url ? 'primary' : 'error'}
							style={props.applicant.github_url ? {} : { pointerEvents: 'none' }}>
							<Typography className={classes.link}>
								<GitHubIcon fontSize='large' />
							</Typography>
							<Typography className={classes.link}>GitHub</Typography>
						</Link>
					</Grid>
					<Grid item xs={4} align='center'>
						<Link
							target='_blank'
							href={props.applicant.website_url}
							color={props.applicant.website_url ? 'primary' : 'error'}
							style={props.applicant.website_url ? {} : { pointerEvents: 'none' }}>
							<Typography className={classes.link}>
								<LanguageIcon fontSize='large' />
							</Typography>
							<Typography className={classes.link}>Website</Typography>
						</Link>
					</Grid>
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
