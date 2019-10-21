import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//COMPONENT IMPORTS
import OneColumnLayout from '../OneColumnLayout/OneColumnLayout';
import JobListItem from '../JobListItem/JobListItem';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Paper,
    Typography,
    TextField,
    FormControl,
    FormGroup,
    Select,
    MenuItem,
    InputLabel,
    IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    search: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(3),
        padding: theme.spacing(0),
        minWidth: 150
    },
    select: {
        minWidth: 150,
        margin: theme.spacing(1, 0)
    },
    placeholder: {
        padding: theme.spacing(2)
    }
});

class JobSearch extends Component {
    state = {
        searchTerm: '',
        skill: ''
    };

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_ALL_JOBS'
        });
        this.props.dispatch({
            type: 'FETCH_ALL_SKILLS'
        });
    }

    //Saves the text from input on change
    handleSearch = event => {
        this.setState({
            ...this.state,
            searchTerm: event.target.value
        });
    };

    //Saves the selected skill ID on change
    handleDropdown = event => {
        this.setState({
            ...this.state,
            skill: Number(event.target.value)
        });
    };

    //sends the local state to the database to GET results
    submitSearch = () => {
        this.props.dispatch({
            type: 'FETCH_JOB_SEARCH',
            payload: this.state
        });
    };

    //When search result is clicked, user is taken to the selected job details page
    viewDetail = (event, id) => {
        this.props.history.push(`/jobs/detail/${id}`);
    };

    //Allows user to login using the Enter key while focus is within the Input area
    handleKeyUp = key => {
        if (key.key === 'Enter') {
            this.submitSearch();
        }
    };

    render() {
        //checks if user type should be able to view this page
        let isStudent = () => {
            return this.props.user.user_type === 'Student';
        };

        const { classes } = this.props;

        //uses the JobListItem component to render the job search results
        let jobList = this.props.jobs.map((job, i) => {
            return <JobListItem key={i} job={job} />;
        });

        //renders the list of available skills within the dropdown
        let skillList = this.props.skills.map(skill => {
            return (
                <MenuItem key={skill.id} value={skill.id}>
                    {skill.tag}
                </MenuItem>
            );
        });

        return (
            <OneColumnLayout header="Search for Jobs">
                {isStudent() ? (
                    <Grid container>
                        <Paper className={classes.search}>
                            <FormGroup row={true}>
                                {/* Search Job input field */}
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        onChange={this.handleSearch}
                                        value={this.state.searchTerm}
                                        label="Search Jobs..."
                                        onKeyUp={this.handleKeyUp}
                                    />
                                </FormControl>

                                {/* Skill select for search */}
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="skill-search">Select Skill</InputLabel>
                                    <Select
                                        className={classes.select}
                                        value={this.state.skill}
                                        onChange={this.handleDropdown}
                                        // onKeyUp={this.handleKeyUp}
                                    >
                                        {/* Skill tag list dropdown options */}
                                        <MenuItem value={0}>Select a skill...</MenuItem>
                                        {skillList}
                                    </Select>
                                </FormControl>

                                {/* Submit Search Button */}
                                <IconButton
                                    className={classes.button}
                                    aria-label="search"
                                    color="primary"
                                    onClick={this.submitSearch}>
                                    <SearchIcon />
                                </IconButton>
                            </FormGroup>
                        </Paper>

                        {/* Job Search List */}
                        <Grid item container xs={12} className="list">
                            {this.props.jobs.length !== 0 ? (
                                jobList
                            ) : (
                                <Typography
                                    variant="subtitle1"
                                    align="center"
                                    color="secondary"
                                    className={classes.placeholder}
                                    gutterBottom>
                                    No items to display.
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                ) : (
                    <Typography>You are not authorized to view this page.</Typography>
                )}
            </OneColumnLayout>
        );
    }
}

const mapStateToProps = store => {
    return {
        jobs: store.allJobsReducer,
        skills: store.allSkillsReducer,
        user: store.user
    };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(JobSearch)));
