import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

//COMPONENT IMPORTS
////constants
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
////routes
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
////views
import UserPage from '../UserPage/UserPage';
import JobApplication from '../JobApplication/JobApplication';
import JobDetail from '../JobDetail/JobDetail';
import ApplicantReview from '../ApplicantReview/ApplicantReview';
import ApplicantDetail from '../ApplicantDetail/ApplicantDetail';
import JobPostForm from '../JobPostForm/JobPostForm';
import JobSearch from '../JobSearch/JobSearch';
import MentorReview from '../MentorReview/MentorReview';
import MentorSearch from '../MentorSearch/MentorSearch';
import Messages from '../Messages/Messages';
import MyJobs from '../MyJobs/MyJobs';
import MyMentorships from '../MyMentorships/MyMentorships';

//STYLING/MATERIAL-UI IMPORTS
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Ubuntu'
    },
    palette: {
        primary: {
            main: '#08b8f4'
        },
        secondary: {
            main: '#505d68'
        },
        error: {
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
                            {/* For protected routes, the view could show one of several things on the same route.
                              Visiting localhost:3000/home will show the UserPage if the user is logged in.
                              If the user is not logged in, the ProtectedRoute will show 'Login' or 'Register' page.
                              Even though it seems like they are different pages, 
                              the user is always on localhost:3000/home */}
                            <ProtectedRoute
                                exact
                                path="/home" //user profile page
                                component={UserPage}
                            />
                            {/* This works the same as the other protected route, 
                            except that if the user is logged in, they will see the info page instead. */}
                            <ProtectedRoute exact path="/search/jobs" component={JobSearch} />
                            <ProtectedRoute exact path="/search/mentors" component={MentorSearch} />
                            <ProtectedRoute exact path="/jobs" component={MyJobs} />
                            <ProtectedRoute exact path="/mentors" component={MyMentorships} />
                            <ProtectedRoute exact path="/jobs/new" component={JobPostForm} />
                            <ProtectedRoute exact path="/jobs/detail/:id" component={JobDetail} />
                            <ProtectedRoute
                                exact
                                path="/jobs/detail/apply/:id"
                                component={JobApplication}
                            />
                            <ProtectedRoute
                                exact
                                path="/jobs/detail/applications/:id"
                                component={ApplicantReview}
                            />
                            <ProtectedRoute
                                exact
                                path="/jobs/detail/applicant/:id"
                                component={ApplicantDetail}
                            />
                            <ProtectedRoute exact path="/admin" component={MentorReview} />
                            <ProtectedRoute exact path="/messages" component={Messages} />
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
