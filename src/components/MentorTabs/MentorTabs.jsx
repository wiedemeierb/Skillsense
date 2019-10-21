import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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

class MentorTabs extends React.Component {
    state = {
        value: 0
    };

    //Captures clicked tab and sets to current value
    handleChange = (event, value) => {
        this.setState({
            value
        });

        if (value === 0) {
            this.props.dispatch({
                type: 'FETCH_ACTIVE_MENTORS'
            });
        }
        if (value === 1) {
            this.props.dispatch({
                type: 'FETCH_INVITED_MENTORS'
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
                    <Tab
                        label={<span className={classes.tabLabel}>Invites</span>}
                        className={classes.tabs}
                    />
                </Tabs>
            </Paper>
        );
    }
}

MentorTabs.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect()(withStyles(styles)(MentorTabs));
