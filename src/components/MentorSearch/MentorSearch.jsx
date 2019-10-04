import React, { Component } from 'react';
import { connect } from 'react-redux';

class MentorSearch extends Component {
    render() {
        return (
            <h1>Mentor Search Page</h1>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    }
}

export default connect(mapStateToProps)(MentorSearch);