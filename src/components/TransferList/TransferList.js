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

	// addSkill = skill => {
	// 	console.log(skill);
	// 	this.setState({
	// 		userSkills: [...this.state.userSkills, skill]
	// 	});
	// };

	// removeSkill = skillToRemove => {
	// 	console.log(skillToRemove);
	// 	this.setState({
	// 		userSkills: this.state.userSkills.filter(skill => skill !== skillToRemove)
	// 	});
	// };

	getAvailableSkills = () => {
		return this.props.allSkills.map(skill =>
			this.props.userSkills.some(
				userSkill => userSkill.id === skill.id
			) ? null : (
				<ListItem key={skill.id} role='listitem' button>
					<ListItemText primary={skill.tag} />
				</ListItem>
			)
		);
	};

	getUserSkills = () => {
		return this.props.userSkills.map(skill => (
			<ListItem key={skill.id} role='listitem' button>
				<ListItemText primary={skill.tag} />
			</ListItem>
		));
	};

	render() {
		const { classes } = this.props;

		// const allSkillsHtml = this.props.allSkills.map(skill =>
		// 	!this.props.userSkills.includes(skill) ? (
		// 		<ListItem key={skill.id} role='listitem' button>
		// 			<ListItemText primary={skill.tag} />
		// 		</ListItem>
		// 	) : null
		// );

		const userSkills =
			this.state.userSkills &&
			this.state.userSkills.map(skill => (
				<ListItem
					key={skill.id}
					role='listitem'
					button
					onClick={() => this.removeSkill(skill)}>
					<ListItemText primary={skill.tag} />
				</ListItem>
			));

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
