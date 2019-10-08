import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserListItem from '../UserListItem/UserListItem';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import {
	Paper,
	Typography,
	TextField,
	FormControl,
	FormGroup,
	Select,
	MenuItem,
	IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
	root: {
		display: 'flex'
	},
	formControl: {
		display: 'block',
		margin: theme.spacing(1),
		minWidth: 150
	},
	select: {
		minWidth: 150,
		margin: theme.spacing(1)
	}
});

class MentorSearch extends Component {
	state = {
		search: {
			searchTerm: '',
			skill: 'Select Skill'
		},
		mentors: [
			{
				username: 'Mr. Miyagi',
				focus_skill: 'Full Stack Development',
				skills: ['JavaScript', 'CSS', 'HTML']
			},
			{
				username: 'Yoda',
				focus_skill: 'UI/UX Design',
				skills: ['JavaScript', 'React', 'HTML']
			}
		]
	};

	componentDidMount() {
		this.props.dispatch({
			type: 'FETCH_ALL_MENTORS'
		});
		this.props.dispatch({
			type: 'FETCH_ALL_SKILLS'
		});
	}

	handleSearch = (searchBy, event) => {
		this.setState({
			search: {
				...this.state.search,
				[searchBy]: event.target.value
			}
		});
	};

	render() {
		const { classes } = this.props;

		let mentorList = this.state.mentors.map((mentor, i) => {
			return <UserListItem key={i} user={mentor} />;
		});

		let skillList = this.props.skills.map((skill, i) => {
			return (
				<MenuItem key={i} value={skill.id}>
					{skill.tag}
				</MenuItem>
			);
		});

		return (
			<div className='list-display'>
				<Paper className='search'>
					<FormControl className={classes.formControl}>
						<FormGroup row={true} className='search'>
							<TextField
								className={classes.formControl}
								onChange={e => this.handleSearch('searchTerm', e)}
								value={this.state.searchTerm}
								label='Search Mentors'
							/>

							<Select
								className={classes.select}
								value={this.state.search.skill}
								onChange={e => this.handleSearch('skill', e)}>
								{/* Skill tag list dropdown options */}
								{skillList}
							</Select>

							<IconButton
								className={classes.button}
								aria-label='search'
								color='primary'>
								<SearchIcon />
							</IconButton>
						</FormGroup>
					</FormControl>
				</Paper>

				{/* Mentor Search List */}
				<div className='list'>{mentorList}</div>
			</div>
		);
	}
}

const mapStateToProps = store => {
	return {
		mentors: store.allMentorsReducer,
		skills: store.allSkillsReducer
	};
};

export default connect(mapStateToProps)(withStyles(styles)(MentorSearch));
