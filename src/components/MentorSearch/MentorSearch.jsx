import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
import UserListItem from '../UserListItem/UserListItem';
import PublicProfile from '../PublicProfile/PublicProfile';
import MentorRequest from '../MentorRequest/MentorRequest';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Paper,
    TextField,
    FormControl,
    FormGroup,
    Select,
    MenuItem,
    InputLabel,
    IconButton,
    Typography
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    root: {
        display: 'flex'
    },
    search: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(3),
        padding: theme.spacing(0),
        minWidth: 125
    },
    select: {
        minWidth: 125,
        margin: theme.spacing(1, 0)
    },
    placeholder: {
        padding: theme.spacing(2)
    }
});

class MentorSearch extends Component {
    state = {
        search: {
            searchTerm: '',
            skill: ''
        }
    };

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_ALL_MENTORS'
        });
        this.props.dispatch({
            type: 'FETCH_ALL_SKILLS'
        });
        this.props.dispatch({
            type: 'CLEAR_SELECTED_USER'
        });
    }

    //Saves the text from input on change
    handleSearch = (searchKey, event) => {
        this.setState({
            search: {
                ...this.state.search,
                [searchKey]: event.target.value
            }
        });
    };

    //sends the local state to the database to GET results
    submitSearch = () => {
        this.props.dispatch({
            type: 'FETCH_MENTOR_SEARCH',
            payload: this.state.search
        });
    };

    //Allows user to login using the Enter key while focus is within the Input area
    handleKeyUp = key => {
        if (key.key === 'Enter') {
            this.submitSearch();
        }
    };

    render() {
        const { classes } = this.props;

        //uses the UserListItem component to render the mentor search results
        let mentorList = this.props.mentors.map((mentor, i) => {
            return <UserListItem key={i} listUser={mentor} />;
        });

        //renders the list of available skills within the dropdown
        let skillList = this.props.skills.map((skill, i) => {
            return (
                <MenuItem key={i} value={skill.id}>
                    {skill.tag}
                </MenuItem>
            );
        });

        //checks if user type should be able to view this page
        let isStudent = () => {
            return this.props.user.user_type === 'Student';
        };

        return (
            <>
                {isStudent() ? (
                    <TwoColumnLayout rightHeader="Details" leftHeader="Search for Mentors">
                        <Grid container>
                            {/* MENTOR SEARCH INPUTS */}
                            <Paper className={classes.search}>
                                <FormGroup row={true}>
                                        <FormControl className={classes.formControl}>
                                            {/* Mentor name search form */}
                                            <TextField
                                                onChange={event =>
                                                    this.handleSearch('searchTerm', event)
                                                }
                                                value={this.state.searchTerm}
                                                label="Search Mentors..."
                                                onKeyUp={this.handleKeyUp}
                                            />
                                        </FormControl>
                                        {/* SKILL SELECT */}
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="skill-search">
                                                Select Skill
                                            </InputLabel>
                                            <Select
                                                className={classes.select}
                                                value={this.state.search.skill}
                                                onChange={event =>
                                                    this.handleSearch('skill', event)
                                                }>
                                                {/* Skill tag list dropdown options */}
                                                <MenuItem value={0}>Select a Skill...</MenuItem>
                                                {skillList}
                                            </Select>
                                        </FormControl>
                                        <IconButton
                                            aria-label="search"
                                            color="primary"
                                            onClick={this.submitSearch}>
                                            <SearchIcon />
                                        </IconButton>
                                </FormGroup>
                            </Paper>

                            {/* MENTOR SEARCH RESULT LIST */}
                            <Grid item container xs={12} className="list">
                                {this.props.mentors.length !== 0 ? (
                                    mentorList
                                ) : (
                                        <Typography variant="h6" align="center">
                                            No items to display.
                                    </Typography>
                                    )}
                            </Grid>
                        </Grid>

                        {this.props.selectedUser.id ? (
                            <Grid container>
                                <PublicProfile />
                                {/* If the user is a mentor, the Request Mentor button will appear in the list row */}
                                {this.props.user.user_type === 'Student' &&
                                    this.props.selectedUser.user_type === 'Mentor' &&
                                    this.props.selectedUser.accepted === null ? (
                                        <Grid item xs={12} align="center">
                                            <MentorRequest mentor={this.props.selectedUser} />
                                        </Grid>
                                    ) : null}
                            </Grid>
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
                    </TwoColumnLayout>
                ) : (
                        <Typography>You are not authorized to view this page.</Typography>
                    )
                }
            </>
        );
    }
}

const mapStateToProps = store => {
    return {
        mentors: store.allMentorsReducer,
        skills: store.allSkillsReducer,
        selectedUser: store.selectedUserReducer,
        user: store.user
    };
};

export default connect(mapStateToProps)(withStyles(styles)(MentorSearch));
