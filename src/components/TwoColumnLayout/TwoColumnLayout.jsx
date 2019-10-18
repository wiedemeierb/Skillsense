import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		display: 'flex',
		width: '90%',
		margin: 'auto',
		padding: '2% 0'
	},
	gridHeaders: {
		padding: theme.spacing(1),
		margin: theme.spacing(1)
	},
	headerText: {
		fontWeight: 700
	},
	gridItem: {
		margin: theme.spacing(1),
		padding: theme.spacing(1)
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
			<Grid container className={classes.root} spacing={4}>
				<Grid
					item
					container
					justify='flex-start'
					align='top'
					className={classes.gridHeaders}>
					{/* COLUMN HEADERS */}
					<Grid item xs={12} sm={6}>
						{/* left header */}
						<Typography
							variant='h4'
							align='left'
							color='secondary'
							className={classes.headerText}>
							{this.props.leftHeader}
						</Typography>
					</Grid>
					{/* right header */}
					{/* <Grid item xs={12} sm={6} className={classes.headerText}>
                        <Typography variant="h4" align="right">
                            {this.props.rightHeader}
                        </Typography>
                    </Grid> */}
				</Grid>

				{/* PAGE BODY CONTENT */}
				<Grid container justify='space-around' spacing={2} className={classes.gridItem}>
					{/* CONTENT ENCLOSED IN COMPONENT FROM PAGE */}
					{this.props.children && (
						// this.props.children.map((child, index) => (
						//     <Grid key={index} item xs={12} sm={6}>
						//         {child}
						//     </Grid>
						// ))
						<>
							<Grid item xs={12} sm={5}>
								{this.props.children[0]}
							</Grid>
							<Grid item xs={12} sm={7}>
								{this.props.children[1]}
							</Grid>
						</>
					)}
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(TwoColumnLayout);
