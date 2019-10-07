import React, { Component } from 'react';
import { connect } from 'react-redux';

class JobSearch extends Component {
  render() {
    return <h1>Job Search Page</h1>;
  }
}

const mapStateToProps = store => {
  return {
    store
  };
};

export default connect(mapStateToProps)(JobSearch);
