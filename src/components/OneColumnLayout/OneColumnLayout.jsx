import React, { Component } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    height: '80vh',
    alignContent: 'flex-start'
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
/* <OneColumnLayout header='header text'>
	<div>
	    ** PAGE CONTENT GOES HERE **
	</div>
</OneColumnLayout>; */

class OneColumnLayout extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={2}
        className={classes.root}
        justify="space-around"
      >
        <Grid
          container
          justify="space-around"
          align="top"
          item
          className={classes.gridHeaders}
        >
          {/* PAGE HEADER TEXT HERE */}
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              {this.props.header}
            </Typography>
          </Grid>
        </Grid>
        {/* PAGE BODY CONTENT HERE */}
        <Grid container item spacing={2} justify="space-evenly">
          <Grid
            className={classes.gridItem}
            item
            component={Paper}
            xs={12}
          >
            {this.props.children}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(OneColumnLayout);
