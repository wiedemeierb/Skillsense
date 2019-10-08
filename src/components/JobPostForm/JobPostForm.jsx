import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Select, OutlinedInput, MenuItem, Button, Typography } from '@material-ui/core';


class JobPostForm extends Component {
    state = {
        project_title: '',
        position_title: '',
        description: '',
        duration: '',
        budget: 0,
        mentor_required: true,
        status_id: 1,
        client_id: 0
    }

    handleInput = (event, property) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
            this.props.dispatch({
                type: 'ADD_BUSINESS',
                payload: this.state
            })
            this.setState({
                project_title: '',
                position_title: '',
                description: '',
                duration: '',
                budget: 0,
                mentor_required: true,
                status_id: 1,
                client_id: 0
            })
        }

    render() {
        console.log(this.state)
        return (
            <form onSubmit={this.handleSubmit}>
                <OutlinedInput type="text" title="Project Name" placeholder="Project Name" value={this.state.project_title} onChange={(event) => {this.handleInput(event, 'project_title')}} required={true}/>
                <OutlinedInput type="text" title="Seeking Position" placeholder="Seeking Position" value={this.state.position_title} onChange={(event) => { this.handleInput(event, 'position_title') }} required={true}/>
                <OutlinedInput type="text" title="Project Description" placeholder="Project Description" value={this.state.description} onChange={(event) => { this.handleInput(event, 'description') }} required={true}/>
                <OutlinedInput type="text" title="Project Duration" placeholder="Project Duration" value={this.state.duration} onChange={(event) => { this.handleInput(event, 'duration') }} required={true}/>
                <OutlinedInput type="text" title="Project Budget" placeholder="Project Budget" value={this.state.budget} onChange={(event) => { this.handleInput(event, 'budget') }}  required={true}/>
                {/* <input type="checkbox" label="Mentor required" title="Mentor Required" placeholder="Mentor Required" value={this.state.mentor_required} onChange={(event) => { this.handleInput(event, 'mentor_required') }} /> */}
                <br/>
                <Typography>Skill Tags Go Here</Typography>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    }
}

export default connect(mapStateToProps)(JobPostForm);