import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

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

	// componentDidMount() {
	// 	console.log(this.props.allSkills, this.props.userSkills);
	// }

	addSkill = skillId => {
		console.log(skillId);
		this.props.dispatch({type: 'ADD_SKILL', payload: {id: skillId} })
	};

	// removeSkill = skillToRemove => {
	// 	console.log(skillToRemove);
	// 	this.setState({
	// 		userSkills: this.state.userSkills.filter(skill => skill !== skillToRemove)
	// 	});
	// };

	//function to map over all skills and remove any that are matches of user's skills
	getAvailableSkills = () => {
		return this.props.allSkills.map(skill =>
			this.props.userSkills.some(
				userSkill => userSkill.id === skill.id
			) ? null : (
				<ListItem
					key={skill.id}
					role='listitem'
					button
					onClick={() => this.addSkill(skill.id)}>
					<ListItemText primary={skill.tag} />
				</ListItem>
			)
		);
	};
	//function get list of user's skills
	getUserSkills = () => {
		return this.props.userSkills.map(skill => (
			<ListItem key={skill.id} role='listitem' button>
				<ListItemText primary={skill.tag} />
			</ListItem>
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
