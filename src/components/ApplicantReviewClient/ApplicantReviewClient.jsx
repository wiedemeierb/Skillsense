import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//COMPONENT IMPORTS
import UserListItem from '../UserListItem/UserListItem';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import {
	List,
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

class ApplicantReviewClient extends Component {
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
		//finds hired applicant if one exists in list
		let hiredApplicant = this.props.applicants.find(applicant => applicant.hired === true);
		//uses the UserListItem component to render applicant results --filters out hired applciants
		let applicantList = this.props.applicants
			.filter(applicant => !applicant.hired)
			.map((applicant, i) => {
				return <UserListItem key={applicant.student_id} listUser={applicant} />;
			});
		//for component styling
		const { classes } = this.props;
		// console.log(applicantList)
		return (
			<div>
				{hiredApplicant && (
					<UserListItem listUser={hiredApplicant} hired={true} />
				)}

				<ExpansionPanel
					className={classes.expansionPanel}
					expanded={this.state.expanded}
					onChange={this.handleExpandChange}>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='applicant-expansion-panel-content'
						id='applicant-panel-header'>
						<Typography variant='h6' color='primary'>
							{hiredApplicant ? 'View Other Applicants: ' : 'View Applicants'}
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails style={{ display: 'block' }}>
						{applicantList.length === 0 ? <Typography variant="h6">No applications to show</Typography> : <List>{applicantList}</List>}
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	}
}

const mapStateToProps = store => {
	return {
		applicants: store.applicantReducer
	};
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ApplicantReviewClient)));
