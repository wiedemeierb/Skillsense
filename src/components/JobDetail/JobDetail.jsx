import React, { Component } from 'react';
import { connect } from 'react-redux';

class JobDetail extends Component {
    render() {
        return (
            <h1>Job Detail Page</h1>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    }
}

export default connect(mapStateToProps)(JobDetail);