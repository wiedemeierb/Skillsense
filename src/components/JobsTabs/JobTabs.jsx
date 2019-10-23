import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    tabs: {
        padding: theme.spacing(2)
    },
    tabLabel: {
        fontSize: 14
    }
});

class JobTabs extends React.Component {
    state = {
        value: 0
    };

    //Captures clicked tab and sets to current value
    handleChange = (event, value) => {
        this.setState({
            value
        });

        let jobType = 0;
        if (value === 0) {
            jobType = 3;
        } else if (value === 1) {
            // needs to be updated to also include "offer-extended" (2)
            // `1 OR "status_id" = 2` errors for integer input
            jobType = 1;
        } else if (value === 2) {
            jobType = 4;
        }

        //route simplification of client using jobType
        //can be applied to student jobs as well in future
        if (this.props.user.user_type === 'Student') {
            //dispatch actions for students
            if (value === 0) {
                this.props.dispatch({
                    type: 'FETCH_ACTIVE_JOBS'
                });
            }
            if (value === 1) {
                this.props.dispatch({
                    type: 'FETCH_APPLIED_JOBS'
                });
            }
            if (value === 2) {
                this.props.dispatch({
                    type: 'FETCH_COMPLETED_JOBS'
                });
            }
            // dispatch actions for client
        } else if (this.props.user.user_type === 'Client') {
            this.props.dispatch({
                type: 'FETCH_CLIENT_JOBS',
                payload: jobType
            });
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered>
                    <Tab
                        label={<span className={classes.tabLabel}>Active</span>}
                        className={classes.tabs}
                    />
                    {this.props.user.user_type === 'Student' ? (
                        <Tab
                            label={<span className={classes.tabLabel}>Applied</span>}
                            className={classes.tabs}
                        />
                    ) : (
                            <Tab
                                label={<span className={classes.tabLabel}>Pending Hire</span>}
                                className={classes.tabs}
                            />
                        )}

                    <Tab
                        label={<span className={classes.tabLabel}>Completed</span>}
                        className={classes.tabs}
                    />
                </Tabs>
            </Paper>
        );
    }
}

JobTabs.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = store => {
    return {
        user: store.user
    };
};

export default connect(mapStateToProps)(withStyles(styles)(JobTabs));
