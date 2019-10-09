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
		overflow: 'scroll',
	}
});

class TransferList extends Component {
	state = {
		// userSkills: this.props.selectedUserSkills,
		availableSkills: [],
		selectedSkills: [],
	};

	// componentDidUpdate(prevProps) {
	// 	//if props userSkills updates then setState
	// 	if(this.props.selectedUserSkills !== prevProps.selectedUserSkills) {
	// 		//update state
	// 		this.setState({
	// 			userSkills: [],
	// 		})
	// 	}
	// }

	// saveSkills = () => {
	// 	console.log('handleClick saveSkills operations')
	// 	this.setState({
	// 		userSkills: [],
	// 	})
	// 	this.props.dispatch({
	// 		type: 'ADD_SKILL',
	// 		payload: this.state,
	// 	})
	// };
	componentDidMount() {
		this.setState({
			//set avail list to not include userskills/selected skills
			availableSkills: this.props.allSkills.filter(skill => 
				!this.props.selectedUserSkills.includes(skill))
		})
	}
	// 	this.props.allSkills
				// .filter(skill =>
				// 	// !this.state.userSkills.includes(skill))
				// 	this.state.userSkills.map((userSkill)=> {
				// 		if (skill.id === userSkill.tag_id){
				// 			return false
				// 		}
				// 		else{
				// 			return true
				// 		}
				// 	}))

	addSkill = skill => {
		console.log(skill);
		this.setState({
			userSkills: [...this.state.userSkills, skill],
		});
	};

	removeSkill = skillToRemove => {
		console.log(skillToRemove);
		this.setState({
			userSkills: this.state.userSkills.filter(
				skill => skill !== skillToRemove
			),
		});
	};

	render() {
		// console.log('UserSkills', this.state.userSkills)
		const { classes } = this.props;
		// const allSkillsHtml =
		// 	this.props.allSkills &&
		// 	this.props.allSkills
				// .filter(skill =>
				// 	// !this.state.userSkills.includes(skill))
				// 	this.state.userSkills.map((userSkill)=> {
				// 		if (skill.id === userSkill.tag_id){
				// 			return false
				// 		}
				// 		else{
				// 			return true
				// 		}
				// 	}))
				// 	//loop over userSkills to get each skill the user has
				// 	//if skill.id is found inside userSkills[x].tag_id return false
				// 	//else return true
				// 	// return !this.state.userSkills.includes(skill)
		const allSkillsHtml =
			this.state.availableSkills
				.map(skill => (
					<ListItem
						key={skill.id}
						role='listitem'
						button
						onClick={() => this.addSkill(skill)}
						onClick={() => this.saveSkills(skill)}>
						<ListItemText primary={skill.tag} />
					</ListItem>
				))
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
					<Typography variant='subtitle2' align="center">
						Available Skills
					</Typography>
				</Grid>
				<Grid item xs={5}>
					<Typography variant='subtitle2' align="center">
						Selected Skills
					</Typography>
				</Grid>
				<Grid item xs={5}>
					<Paper className={classes.paper}>
						<List>{allSkillsHtml}</List>
					</Paper>
				</Grid>
				<Grid item xs={5}>
					<Paper className={classes.paper}>
						{/* <List>{userSkills}</List> */}
					</Paper>
				</Grid>
			</Grid>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	allSkills: state.allSkillsReducer,
	selectedUserSkills: state.userSkillsReducer,
});

export default connect(mapStateToProps)(withStyles(styles)(TransferList));

