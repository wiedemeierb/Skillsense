import React, { Component } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        height: '80vh',
        width: '98%',
        alignContent: 'flex-start',
        margin: 'auto'
    },
    gridHeaders: {
        padding: theme.spacing(1),
        margin: theme.spacing(1)
    },
    gridItem: {
        border: '2px solid grey',
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        height: '70vh',
        overflow: 'scroll'
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
            <Grid
                container
                spacing={2}
                className={classes.root}
                justify="space-around">
                <Grid
                    container
                    justify="space-around"
                    align="top"
                    item
                    className={classes.gridHeaders}>
                    <Grid item xs={4}>
                        <Typography variant="h4" align="left">
                            {this.props.leftHeader}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h4" align="right">
                            {this.props.rightHeader}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item spacing={2} justify="space-evenly">
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
                            </Grid>
                        ))}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(TwoColumnLayout);
