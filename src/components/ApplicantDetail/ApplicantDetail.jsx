import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import OneColumnLayout from '../OneColumnLayout/OneColumnLayout';
import ApplicantDetailStudent from '../ApplicantDetailStudent/ApplicantDetailStudent';
import ApplicantDetailMentor from '../ApplicantDetailMentor/ApplicantDetailMentor';

//MATERIAL-UI IMPORTS
import { Typography, Button, Grid, Divider } from '@material-ui/core';

//STYLING IMPORTS
import { withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';

const styles = theme => ({
	root: {
		margin: 'auto',
		width: '90vh'
	},
	divider: {
		margin: theme.spacing(2)
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
		// sweetalerts2
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
						applicant: this.props.applicant
					}
				});
				this.props.history.push(`/jobs`);
			}
		});
	};

	routeBack = () => {
		this.props.dispatch({ type: 'CLEAR_APPLICANT_DETAIL' })
		this.props.history.push(`/jobs/detail/${this.props.applicant.job_id}`);
	};

	render() {
		const { classes } = this.props;

		let isClient = () => {
			return this.props.user.user_type === 'Client';
		};

		return (
			<OneColumnLayout header='Application Details'>
				<Divider className={classes.divider} variant='fullWidth' />
				{this.props.applicant && (
					<ApplicantDetailStudent applicant={this.props.applicant} />
				)}
				<Divider className={classes.divider} variant='fullWidth' />
				{this.props.applicant.mentor && (
					<ApplicantDetailMentor mentor={this.props.applicant.mentor} />
				)}
				<Divider className={classes.divider} variant='fullWidth' />
				{/* Buttons: Back & Hire */}
				<Typography variant='h5' align='center' color='primary'>
					Actions
						</Typography>
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

					{isClient() && this.props.applicant.status_id === 1 && (
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
