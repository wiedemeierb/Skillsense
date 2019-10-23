import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Divider } from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flexbox',
        flexDirection: 'column'
    },
    listItem: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        padding: '20px 20px 10px'
    },
    skillTag: {
        display: 'inline-block',
        margin: '2px',
        padding: '2px',
        color: 'white',
        backgroundColor: 'black'
    },
    button: {
        margin: theme.spacing(1),
        color: 'white'
    }
});

class JobListItem extends Component {
    viewDetail = () => {
        this.props.history.push(`/jobs/detail/${this.props.job.job_id || this.props.job.id}`);
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid container>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    align="top"
                    spacing={2}
                    className={classes.listItem}>
                    {/* left side info */}
                    <Grid item xs={12} sm={6} display="flex">
                        <Typography variant="h5" color="primary">
                            {this.props.job.project_title}
                        </Typography>
                        <Typography variant="h6" color="secondary">
                            {this.props.job.position_title}
                        </Typography>
                    </Grid>

                    {/* center info */}
                    <Grid item xs={6} sm={3}>
                        <Typography color="secondary">
                            <b>Budget:</b> ${this.props.job.budget}
                        </Typography>
                        <Typography color="secondary">
                            <b>Duration:</b> {this.props.job.duration}
                        </Typography>
                    </Grid>

                    {/* right side info */}
                    <Grid item xs={6} sm={3} align="right">
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.viewDetail}>
                            View Details
                        </Button>
                    </Grid>
                </Grid>

                {/* list item divider */}
                <Grid item xs={12}>
                    <Divider />
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = store => {
    return {
        user: store.user
    };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(JobListItem)));
