import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
	Grid,
	List,
	ListItem,
	ListItemText,
	Typography,
	Button,
	Paper,
	Tooltip
} from '@material-ui/core';

const styles = theme => ({
	root: {
		margin: 'auto',
		width: '50%'
	},
	paper: {
		width: 200,
		height: 230,
		overflow: 'scroll'
	}
});

class TransferList extends Component {
	state = {
		availableSkills: [],
		selectedSkills: []
	};

	addSkill = skillId => {
		console.log(skillId);
		this.props.dispatch({ type: 'ADD_SKILL', payload: { id: skillId } });
	};

	removeSkill = skillId => {
		console.log(skillId);
		this.props.dispatch({ type: 'REMOVE_SKILL', payload: { id: skillId } });
	};

	//function to map over all skills and remove any that are matches of user's skills
	getAvailableSkills = () => {
		return this.props.allSkills.map(skill =>
			this.props.userSkills.some(
				userSkill => userSkill.id === skill.id
			) ? null : (
				<Tooltip key={skill.id} title='Add to Your Skills' placement='right'>
					<ListItem
						role='listitem'
						button
						onClick={() => this.addSkill(skill.id)}>
						<ListItemText primary={skill.tag} />
					</ListItem>
				</Tooltip>
			)
		);
	};
	//function get list of user's skills
	getUserSkills = () => {
		return this.props.userSkills.map(skill => (
			<Tooltip key={skill.id} title='Remove From Your Skills' placement='left'>
				<ListItem
					key={skill.id}
					role='listitem'
					button
					onClick={() => this.removeSkill(skill.id)}>
					<ListItemText primary={skill.tag} />
				</ListItem>
			</Tooltip>
		));
	};

	render() {
		const { classes } = this.props;

		return (
			<Grid
				container
				spacing={2}
				justify='space-evenly'
				className={classes.root}>
				<Grid item xs={5}>
					<Typography variant='subtitle2' align='center'>
						Available Skills
					</Typography>
				</Grid>
				<Grid item xs={5}>
					<Typography variant='subtitle2' align='center'>
						Your Skills
					</Typography>
				</Grid>
				<Grid item xs={5}>
					<Paper className={classes.paper}>
						<List>{this.props.userSkills && this.getAvailableSkills()}</List>
					</Paper>
				</Grid>
				<Grid item xs={5}>
					<Paper className={classes.paper}>
						<List>{this.props.userSkills && this.getUserSkills()}</List>
					</Paper>
				</Grid>
			</Grid>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	allSkills: state.allSkillsReducer,
	userSkills: state.userSkillsReducer
});

export default connect(mapStateToProps)(withStyles(styles)(TransferList));
