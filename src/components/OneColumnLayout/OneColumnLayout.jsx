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
        margin: theme.spacing(1, 0),
        padding: theme.spacing(1, 0)
    },
    gridItem: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    }
});

//reusable component for two column layout -- use in this fashion:
/* <OneColumnLayout header='header text'>
	<div>
	    ** PAGE CONTENT GOES HERE **
	</div>
</OneColumnLayout>; */

class OneColumnLayout extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.root}>
                <Grid
                    container
                    justify="space-around"
                    align="top"
                    item xs={12}
                    className={classes.gridHeaders}>
                    {/* PAGE HEADER TEXT HERE */}
                    <Grid item xs={12}>
                        <Typography variant="h4" align="center">
                            {this.props.header}
                        </Typography>
                    </Grid>
                </Grid>
                {/* PAGE BODY CONTENT HERE */}
                <Grid container justify="space-around">
                    <Grid className={classes.gridItem} item xs={12}>
                        {/* CONTENT ENCLOSED IN COMPONENT FROM PAGE */}
                        {this.props.children}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(OneColumnLayout);
