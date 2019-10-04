import React, { Component } from 'react';
import { connect } from 'react-redux';

class JobApplication extends Component {
    render(){
        return (
            <h1>Job Application Page</h1>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    }
}

export default connect(mapStateToProps)(JobApplication);