import React, { Component } from 'react';
import { connect } from 'react-redux';

class JobApplication extends Component {
    componentDidMount(){
        this.props.dispatch({
            type: 'FETCH_JOB_DETAIL',
            payload: {id: Number(this.props.match.params.id)}
        })
    }
    render(){
        return (
            <div>
            <h1>Job Application Page</h1>
            <p>{this.props.match.params.id}</p>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    }
}

export default connect(mapStateToProps)(JobApplication);