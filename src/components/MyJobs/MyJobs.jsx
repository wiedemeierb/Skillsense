import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyJobs extends Component {
    render() {
        return (
            <h1>My Jobs Page</h1>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    }
}

export default connect(mapStateToProps)(MyJobs);