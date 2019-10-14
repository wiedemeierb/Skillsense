import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Typography} from '@material-ui/core';

class Messages extends Component {
    render(){
        return (
            <Typography>Message Center</Typography>
        )
    }
}

export default connect()(Messages);