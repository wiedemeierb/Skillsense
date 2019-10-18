import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';

const styles = theme => ({
	root: {
		display: 'flexbox',
		flexDirection: 'column'
	},
	listItem: {
		display: 'inline-flex',
		justifyContent: 'space-between',
		padding: '20px 20px 10px',
		// borderBottom: '1px solid gray'
	},
	skillTag: {
		display: 'inline-block',
		margin: '2px',
		padding: '2px',
		color: 'white',
		backgroundColor: 'black'
	},
	button: {
		margin: theme.spacing(1),
		color: 'white'
	}
});

class JobListItem extends Component {
	//When list item is clicked, user is taken to that job detail page
	viewDetail = () => {
		this.props.history.push(`/jobs/detail/${this.props.job.job_id || this.props.job.id}`);
	};

	render() {
		const { classes } = this.props;
		return (
			<Grid
				container
				direction='row'
				justify='space-between'
				align='top'
				spacing={3}
				className={classes.listItem}>
				{/* left side info */}
				<Grid item xs={5} display='flex'>
					<Typography variant='h5' color='primary'>
						{this.props.job.project_title}
					</Typography>
					<Typography variant='h6' color='secondary'>
						{this.props.job.position_title}
					</Typography>
					{/* conditionally rendered so only students see client information */}
					{/* {this.props.user.user_type === 'Student' && (
                            <Typography variant="subtitle2">{this.props.job.client}, {this.props.job.location}</Typography>
                    )} */}
				</Grid>

				{/* center info */}
				<Grid item xs={4}>
					<Typography color='secondary'>
						<b>Budget:</b> ${this.props.job.budget}
					</Typography>
					<Typography color='secondary'>
						<b>Duration:</b> {this.props.job.duration}
					</Typography>
				</Grid>

				{/* right side info */}
				<Grid item vs={3} align='right'>
					<Button
						variant='contained'
						color='primary'
						className={classes.button}
						onClick={this.viewDetail}>
						View Details
					</Button>
                </Grid>
			</Grid>
		);
	}
}

const mapStateToProps = store => {
	return {
		user: store.user
	};
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(JobListItem)));
