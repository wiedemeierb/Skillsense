import React, { Component } from 'react';
import { connect } from 'react-redux';
// COMPONENT IMPORTS
import OneColumnLayout from '../OneColumnLayout/OneColumnLayout';
// MATERIAL-UI IMPORTS
import {
    TextField,
    Button,
    Typography,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    InputAdornment
} from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// STYLING IMPORTS
import { withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';

const styles = theme => ({
    root: {
        margin: 'auto',
        width: '70vw'
    },
    paper: {
        width: '100%',
        minWidth: 200,
        height: 250,
        overflow: 'scroll'
    },
    formControl: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
        minWidth: 200
    },
    largeFormControl: {
        margin: theme.spacing(3, 0)
    },
    divider: {
        margin: theme.spacing(3, 0)
    },
    button: {
        display: 'block',
        margin: theme.spacing(3, 0),
        padding: theme.spacing(1),
    }
});

class JobPostForm extends Component {
    state = {
        project_title: '',
        position_title: '',
        description: '',
        duration: '',
        budget: '',
        mentor_required: true,
        status_id: 1,
        client_id: 0,
        selected: []
    };

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_ALL_SKILLS' });
    };

    //saves the text from input on change
    handleInput = (event, property) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        });
    };

    //Submits the full job posting details and associated skill tags to save in the database
    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch({
            type: 'POST_JOB',
            payload: this.state
        });
        this.setState({
            project_title: '',
            position_title: '',
            description: '',
            duration: '',
            budget: '',
            mentor_required: true,
            status_id: 1,
            client_id: 0,
            selected: []
        });
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Job has been successfully posted!',
            showConfirmButton: false,
            timer: 1500
        });
        this.props.history.push(`/jobs`);
    };

    //adds clicked skill to list of selected tags
    addSkill = skill => {
        this.setState({
            selected: [...this.state.selected, skill]
        });
    };

    //removes clicked skill from list of selected tags
    removeSkill = skillToRemove => {
        this.setState({
            selected: this.state.selected.filter(skill => skill !== skillToRemove)
        });
    };

    render() {
        const { classes } = this.props;

        //filters the list of all skills to remove the selected skills
        const renderAvailable = this.props.available
            .filter(skill => !this.state.selected.includes(skill))
            .map(skill => (
                <ListItem
                    key={skill.id}
                    role="listitem"
                    button
                    onClick={() => this.addSkill(skill)}>
                    <ListItemText primary={skill.tag} />
                </ListItem>
            ));

        const renderSelected = this.state.selected.map(skill => (
            <ListItem key={skill.id} role="listitem" button onClick={() => this.removeSkill(skill)}>
                <ListItemText primary={skill.tag} />
            </ListItem>
        ));

        //checks if user type should be able to view this page
        let isClient = () => {
            return this.props.user.user_type === 'Client';
        };

        return (
            <OneColumnLayout header="Post New Job">
                {isClient() ? (
                    <form onSubmit={this.handleSubmit}>
                        <Grid
                            item
                            container
                            spacing={4}
                            justify="space-around"
                            align="center"
                            className={classes.root}>
                            {/* NEW JOB DETAILS */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    className={classes.formControl}
                                    label="Project Name"
                                    value={this.state.project_title}
                                    // onClick={() => { this.setState({ 
                                    //     ...this.state,
                                    //     project_title: 'Employee Volunteer Shift Schedule',
                                    //     position_title: 'Full-Stack Developer',
                                    //     description: 'I am looking for a platform for employees to share their availability to work events, either opt-in or opt - out of working on certain dates, and to allow an administrator to schedule additional employees for events as needed.',
                                    //     duration: '2 weeks',
                                    //     budget: '500',
                                    //     mentor_required: true,
                                    //     status_id: 1,
                                    //     client_id: 32,
                                    //     selected: []})}}
                                    onChange={event => {
                                        this.handleInput(event, 'project_title');
                                    }}
                                    required={true}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    className={classes.formControl}
                                    label="Seeking Position"
                                    value={this.state.position_title}
                                    onChange={event => {
                                        this.handleInput(event, 'position_title');
                                    }}
                                    required={true}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    className={classes.formControl}
                                    label="Project Duration"
                                    value={this.state.duration}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ScheduleIcon fontSize="small" color="secondary" />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={event => {
                                        this.handleInput(event, 'duration');
                                    }}
                                    required={true}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    className={classes.formControl}
                                    label="Project Budget"
                                    value={this.state.budget}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoneyIcon
                                                    fontSize="small"
                                                    color="secondary"
                                                />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={event => {
                                        this.handleInput(event, 'budget');
                                    }}
                                    required={true}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        {/* PROJECT DESCRIPTION */}
                        <Grid item xs={12} align="center">
                            <TextField
                                className={classes.largeFormControl}
                                label="Project Description"
                                multiline
                                rows="4"
                                align="left"
                                variant="outlined"
                                helperText="Please write a short description 
                                of any job specifications you might have."
                                value={this.state.description}
                                onChange={event => {
                                    this.handleInput(event, 'description');
                                }}
                                required={true}
                            />
                        </Grid>

                        {/* MENTOR REQUIRED CHECKBOX */}
                        {/* <input
                            type="checkbox"
                            label="Mentor required"
                            title="Mentor Required"
                            placeholder="Mentor Required"
                            value={this.state.mentor_required}
                            onChange={event => {
                                this.handleInput(event, 'mentor_required');
                            }}
                        /> */}

                        <Grid item xs={12} className={classes.divider}>
                            <Divider />
                        </Grid>

                        {/* SKILL SELECTION */}
                        <Grid item container spacing={4} justify="center" align="center">
                            <Grid item xs={12}>
                                <Typography variant="h5" align="center">
                                    Desired Skills
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="subtitle1" align="center" color="primary">
                                    Available Skills
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="subtitle1" align="center" color="secondary">
                                    Selected Skills
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Paper className={classes.paper}>
                                    <List>{renderAvailable}</List>
                                </Paper>
                            </Grid>
                            <Grid item xs={5}>
                                <Paper className={classes.paper}>
                                    <List>{renderSelected}</List>
                                </Paper>
                            </Grid>

                            {/* SUBMIT FORM BUTTON */}
                            <Grid item xs={6} align="center">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    className={classes.button}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                ) : (
                    <Typography variant="h3">You are not authorized to view this page.</Typography>
                )}
            </OneColumnLayout>
        );
    }
}

const mapStateToProps = store => {
    return {
        available: store.allSkillsReducer,
        user: store.user
    };
};

export default withStyles(styles)(connect(mapStateToProps)(JobPostForm));
