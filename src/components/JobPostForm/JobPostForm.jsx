import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Grid, Paper, List, ListItem, ListItemText } from '@material-ui/core';
import Swal from 'sweetalert2'

const styles = theme => ({
    root: {
        margin: 'auto',
        width: '50%'
    },
    paper: {
        width: 200,
        height: 230,
        overflow: 'scroll',
    },
    formControl: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
        minWidth: 200
    },
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
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_ALL_SKILLS' });
    }

    //Saves the text from input on change
    handleInput = (event, property) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    //Submits the full job posting details and associated skill tags to save in the database
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'POST_JOB',
            payload: this.state
        })
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
        })
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Job has been successfully posted!',
            showConfirmButton: false,
            timer: 1500
        });
        this.props.history.push(`/jobs`);
    }

    //adds clicked skill to list of selected tags
    addSkill = skill => {
        // console.log(skill);
        this.setState({
            selected: [...this.state.selected, skill]
        });
    };

    //removes clicked skill from list of selected tags
    removeSkill = skillToRemove => {
        // console.log(skillToRemove);
        this.setState({
            selected: this.state.selected.filter(
                skill => skill !== skillToRemove
            )
        });
    };

    render() {
        // console.log(this.state)
        const { classes } = this.props;

        //filters the list of all skills to remove the selected skills
        const renderAvailable =
            this.props.available
                .filter(skill => !this.state.selected.includes(skill))
                .map(skill => (
                    <ListItem
                        key={skill.id}
                        role='listitem'
                        button
                        onClick={() => this.addSkill(skill)}>
                        <ListItemText primary={skill.tag} />
                    </ListItem>
                ));

        const renderSelected =
            this.state.selected.map(skill => (
                <ListItem
                    key={skill.id}
                    role='listitem'
                    button
                    onClick={() => this.removeSkill(skill)}>
                    <ListItemText primary={skill.tag} />
                </ListItem>
            ));

        //checks if user type should be able to view this page
        let isClient = () => {
            return (this.props.user.access_id === 3)
        }

        return (
            <Paper>
                {isClient() ?
                    <form onSubmit={this.handleSubmit}>
                        <br/>
                        <Typography variant="h5"align="center">Post New Job</Typography>
                        <TextField className={classes.formControl} label="Project Name" value={this.state.project_title} onChange={(event) => { this.handleInput(event, 'project_title') }} required={true} />
                        <TextField className={classes.formControl} label="Seeking Position" value={this.state.position_title} onChange={(event) => { this.handleInput(event, 'position_title') }} required={true} />
                        <TextField className={classes.formControl} label="Project Description" value={this.state.description} onChange={(event) => { this.handleInput(event, 'description') }} required={true} />
                        <TextField className={classes.formControl} label="Project Duration" value={this.state.duration} onChange={(event) => { this.handleInput(event, 'duration') }} required={true} />
                        <TextField className={classes.formControl} label="Project Budget" value={this.state.budget} onChange={(event) => { this.handleInput(event, 'budget') }} required={true} />
                        {/* <input type="checkbox" label="Mentor required" title="Mentor Required" placeholder="Mentor Required" value={this.state.mentor_required} onChange={(event) => { this.handleInput(event, 'mentor_required') }} /> */}
                        <br />
                        <br/>
                        <Typography variant="h5" align="center">Skill Tags</Typography>
                        <Grid
                            container
                            spacing={2}
                            justify='space-evenly'
                            className={classes.root}
                        >
                            <Grid item xs={5}>
                                <Typography variant='subtitle2' align="center">
                                    Available Skills
					</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant='subtitle2' align="center">
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
                        </Grid>
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                        {/* <Button type="submit" variant="contained" color="primary" onClick={this.postedJob}>Submit</Button> */}
                    </form>
                    : <Typography variant="h3">You are not authorized to view this page.</Typography>
                }
            </Paper>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        available: store.allSkillsReducer,
        user: store.user
    }
}

export default withStyles(styles)(connect(mapStateToProps)(JobPostForm));