import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SkillList from '../SkillList/SkillList';

const styles = theme => ({
	root: {
		display: 'flexbox',
		flexDirection: 'column'
	},
	listItem: {
		display: 'inline-flex',
		justifyContent: 'space-between',
		// width: '',
		padding: '20px 20px 10px',
		borderBottom: '1px solid gray'
	},
	skillTag: {
		display: 'inline-block',
		margin: '2px',
		padding: '2px',
		color: 'white',
		backgroundColor: 'black'
	}
});

class UserListItem extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Grid
				container
				spacing={2}
				direction='row'
				justify='space-between'
				align='top'
				className={classes.listItem}
				onClick={() =>
					this.props.dispatch({
						type: 'FETCH_SELECTED_USER',
						payload: this.props.user.id
					})
				}>
				{/* left side info */}
				<Grid item xs={5}>
					<Typography variant='h5'>{this.props.user.username}</Typography>
					<Typography variant='h6'>{this.props.user.focus_skill}</Typography>
				</Grid>
				{/* right side info */}
				<Grid item xs={7}>
					{this.props.user.skill_names && (
						<SkillList skillList={this.props.user.skill_names} />
					)}
				</Grid>
			</Grid>
		);
	}
}

export default connect()(withStyles(styles)(UserListItem));
