import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyMentorships extends Component {
    render() {
        return (
            <h1>My Mentorships Page</h1>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    }
}

export default connect(mapStateToProps)(MyMentorships);