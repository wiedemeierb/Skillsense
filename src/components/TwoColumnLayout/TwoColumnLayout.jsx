import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		display: 'flex'
	},
	gridHeaders: {
		padding: theme.spacing(1),
		margin: theme.spacing(1)
	},
	gridItem: {
		border: '2px solid grey',
		margin: theme.spacing(1),
		padding: theme.spacing(1)
	}
});

class TwoColumnLayout extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Grid container spacing={2} className={classes.root}>
				<Grid
					container
					justify='space-around'
					align='center'
					spacing={4}
					item
					className={classes.gridHeaders}>
					<Grid item xs={5}>
						<Typography variant='h4' align='left'>
							{this.props.leftHeader}
						</Typography>
					</Grid>
					<Grid item xs={5}>
						<Typography variant='h4' align='right'>
							{this.props.rightHeader}
						</Typography>
					</Grid>
				</Grid>
				<Grid container item spacing={4} justify='space-around'>
					{this.props.children &&
						this.props.children.map(child => (
							<Grid className={classes.gridItem} item xs={12} sm={5}>
								{child}
							</Grid>
						))}
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(TwoColumnLayout);
