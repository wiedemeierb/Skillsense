import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import OneColumnLayout from '../OneColumnLayout/OneColumnLayout';
import SkillList from '../SkillList/SkillList';

//MATERIAL-UI IMPORTS
import { Typography, Button, Link, Grid } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';
import EmailIcon from '@material-ui/icons/Email';

//STYLING IMPORTS
import { withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import ApplicantDetailStudent from '../ApplicantDetailStudent/ApplicantDetailStudent';

const styles = theme => ({
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
});

class ApplicantDetail extends Component {
	componentDidMount() {
		this.props.dispatch({
			type: 'FETCH_APPLICANT_DETAIL',
			payload: { id: Number(this.props.match.params.id) }
		});
	}

	handleSubmit = event => {
		event.preventDefault();

		Swal.fire({
			title: 'Are you sure you want to hire this applicant?',
			text: "You won't be able to reverse this decision!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#04b8f3',
			cancelButtonColor: '#505d68',
			confirmButtonText: 'Yes!'
		}).then(result => {
			if (result.value) {
				this.props.dispatch({
					type: 'HIRE_APPLICANT',
					payload: {
						applicantId: Number(this.props.match.params.id),
						jobId: this.props.applicant.job_id
					}
				});
				this.props.history.push(`/jobs`);
			}
		});
	};

	routeBack = () => {
		this.props.history.push(`/jobs/detail/${this.props.applicant.job_id}`);
	};

	render() {
		const { classes } = this.props;

		let isClient = () => {
			return this.props.user.user_type === 'Client';
		};

		return (
			<OneColumnLayout header='Application Details'>
				{isClient() ? (
					<>
						{this.props.applicant && (
							<ApplicantDetailStudent applicant={this.props.applicant} />
						)}

						{/* Buttons: Back & Hire */}

						<Grid
							item
							container
							align='center'
							justify='space-between'
							className={classes.section}>
							<Grid item xs={4}>
								<Button
									variant='contained'
									color='secondary'
									fullWidth
									className={classes.button}
									onClick={this.routeBack}>
									Back
								</Button>
							</Grid>

							{this.props.applicant.status_id === 1 && (
								<Grid item xs={4}>
									<Button
										variant='contained'
										color='primary'
										fullWidth
										className={classes.button}
										onClick={this.handleSubmit}>
										Hire
									</Button>
								</Grid>
							)}
						</Grid>
					</>
				) : (
					<Typography>You are not authorized to view this page.</Typography>
				)}
			</OneColumnLayout>
		);
	}
}

const mapStateToProps = store => {
	return {
		job: store.selectedJobReducer,
		applicant: store.selectedApplicantReducer,
		user: store.user
	};
};

export default connect(mapStateToProps)(withStyles(styles)(ApplicantDetail));
