import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		display: 'flexbox',
		flexDirection: 'column'
	},
	listItem: {
		display: 'inline-flex',
		justifyContent: 'space-between',
		width: '100%',
		padding: '20px 20px 10px',
		borderBottom: '1px solid gray'
	},
	skillTag: {
		display: 'inline-block',
		margin: '5px',
		padding: ' 5px 10px',
		color: 'white',
		backgroundColor: 'black'
	}
});

class UserListItem extends Component {
	render() {
		const {classes} = this.props;
		return (
			<div className={classes.listItem}>
				<div>
					{/* left side info */}
					<h2>{this.props.user.username}</h2>
					<h4>{this.props.user.focus_skill}</h4>
				</div>
				{/* right side info */}
				<div>
					{this.props.user.skill_names && this.props.user.skill_names.map((skill, i) => {
						return (
							<h4 key={i} className={classes.skillTag}>
								{skill}
							</h4>
						);
					})}
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(UserListItem);
