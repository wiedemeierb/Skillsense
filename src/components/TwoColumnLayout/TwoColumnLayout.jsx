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
        padding: theme.spacing(1, 0),
        margin: theme.spacing(1, 0)
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
            <Grid container className={classes.root}>
                <Grid
                    item
                    container
                    justify="space-around"
                    align="top"
                    spacing={3}
                    className={classes.gridHeaders}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h4" align="center">
                            {this.props.leftHeader}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h4" align="right">
                            {this.props.rightHeader}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justify="space-around" spacing={8}>
                    {this.props.children &&
                        this.props.children.map((child, index) => (
                            <Grid key={index} item xs={12} sm={6}>
                                {child}
                            </Grid>
                        ))}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(TwoColumnLayout);
