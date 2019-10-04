import React, { Component } from 'react';
import { connect } from 'react-redux';

class MentorReview extends Component {
    render() {
        return (
            <h1>Mentor Review Page</h1>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    }
}

export default connect(mapStateToProps)(MentorReview);