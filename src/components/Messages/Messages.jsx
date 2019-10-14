import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Typography} from '@material-ui/core';

class Messages extends Component {
    componentDidMount() {
        // gets all accepted mentorship relationships from the server and stores them in the allMentorsReducer
        this.props.dispatch({
            type: 'FETCH_ALL_MESSAGES'
        });
    }

    render() {
        return(
            <div>
                {this.props.messages.map((message) => {
                    return(
                        <Typography>
                            {message.message}
                        </Typography>
                    )})}
            </div>
        );
    }
};

const mapStateToProps = store => {
    return {
        // mentors: store.allMentorsReducer,
        // selectedUser: store.selectedUserReducer,
        // user: store.user,
        messages: store.allMessagesReducer
    };
};

export default connect(mapStateToProps)(Messages);