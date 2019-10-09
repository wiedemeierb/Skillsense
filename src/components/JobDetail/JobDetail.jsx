import React, { Component } from 'react';
import { connect } from 'react-redux';

class JobDetail extends Component {
    render() {
        return (
            <div>
            <h1>Job Detail Page</h1>
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

export default connect(mapStateToProps)(JobDetail);