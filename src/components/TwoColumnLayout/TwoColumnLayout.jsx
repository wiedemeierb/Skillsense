import React, { Component } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
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
	},
	paper: {
		// width: 'fill'
	}
});

//reusable component for two column layout -- use in this fashion:
/* <TwoColumnLayout rightHeader='right header text' leftHeader='left header text'>
	<div>
		<p>Left side stuff</p>
	</div>
	<div>
		<p>Right side stuff</p>
	</div>
</TwoColumnLayout>; */

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
						this.props.children.map((child, index) => (
							<Grid
								key={index}
								className={classes.gridItem}
								item
								component={Paper}
								xs={12}
								sm={5}>
								{child}
								{/* <Paper className={classes.paper}>{child}</Paper> */}
							</Grid>
						))}
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(TwoColumnLayout);
