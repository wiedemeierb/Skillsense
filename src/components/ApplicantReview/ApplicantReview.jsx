import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//COMPONENT IMPORTS
import UserListItem from '../UserListItem/UserListItem';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import {
	Typography,
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
	root: {
		display: 'flex'
	},
	expansionPanel: {
		boxShadow: 'none'
	}
});

class ApplicantReview extends Component {
	state = {
		expanded: false
	};
	componentDidMount() {
		this.props.dispatch({
			type: 'FETCH_APPLICANTS',
			payload: { id: Number(this.props.match.params.id) }
		});
		this.props.dispatch({
			type: 'FETCH_JOB_DETAIL',
			payload: { id: Number(this.props.match.params.id) }
		});
	}

	routeBack = () => {
		this.props.history.push(`/jobs/detail/${this.props.match.params.id}`);
	};

	handleExpandChange = () => {
		this.setState({
			expanded: !this.state.expanded
		});
	};

	render() {
		//uses the UserListItem component to render applicant results
		let applicantList = this.props.applicants.map((applicant, i) => {
			return <UserListItem key={applicant.student_id} listUser={applicant} />;
		});
		//for component styling
		const { classes } = this.props;

		return (
			<ExpansionPanel
				className={classes.expansionPanel}
				expanded={this.state.expanded}
				onChange={this.handleExpandChange}>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='applicant-expansion-panel-content'
					id='applicant-panel-header'>
					<Typography variant='h6' color='primary'>
						View Applications:
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<div className='list'>{applicantList}</div>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	}
}

const mapStateToProps = store => {
	return {
		applicants: store.applicantReducer,
		details: store.selectedJobReducer,
		user: store.user
	};
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ApplicantReview)));
