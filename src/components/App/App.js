import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';

import JobApplication from '../JobApplication/JobApplication';
import JobDetail from '../JobDetail/JobDetail';
import JobSearch from '../JobSearch/JobSearch';
import MentorReview from '../MentorReview/MentorReview';
import MentorSearch from '../MentorSearch/MentorSearch';
import MyJobs from '../MyJobs/MyJobs';
import MyMentorships from '../MyMentorships/MyMentorships';

import {CssBaseline} from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import './App.css';
import 'typeface-roboto';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#08b8f4'
    },
    secondary: {
      main: '#bdbdbd'
    }
  }
});

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div>
            <Nav />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />
              {/* Visiting localhost:3000/about will show the about page.
              This is a route anyone can see, no login necessary */}
              <Route exact path="/about" component={AboutPage} />
              {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/home will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
              Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <Route
                exact
                path="/home" //user profile page
                component={UserPage}
              />
              {/* This works the same as the other protected route, except that if the user is logged in,
              they will see the info page instead. */}
              <Route
                exact
                path="/info"
                component={InfoPage}
              />
              <Route
                exact
                path="/search/jobs"
                component={JobSearch}
              />
              <Route
                exact
                path="/search/mentors"
                component={MentorSearch}
              />
              <Route
                exact
                path="/jobs"
                component={MyJobs}
              />
              <Route
                exact
                path="/mentors"
                component={MyMentorships}
              />
              <Route
                exact
                path="/jobs/detail"
                component={JobDetail}
              />
              <Route
                exact
                path="/jobs/detail/apply"
                component={JobApplication}
              />
              <Route
                exact
                path="/admin"
                component={MentorReview}
              />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default connect()(App);
