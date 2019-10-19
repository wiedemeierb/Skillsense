import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
//LOGO IMPORT
import { ReactComponent as SkillSenseLogo } from '../../skillSenseLogo.svg';
//STYLING IMPORTS
import './Nav.css';

//for conditional rendering based on user type
const isAdmin = props => {
    return props.user.user_type === 'Admin';
};
const isClient = props => {
    return props.user.user_type === 'Client';
};
const isMentor = props => {
    return props.user.user_type === 'Mentor';
};
const isStudent = props => {
    return props.user.user_type === 'Student';
};

const Nav = props => (
    <nav className="nav">
        <NavLink to="/home">
            <SkillSenseLogo alt="skill-sense logo" className="logo" />
        </NavLink>
        <div className="nav-right nav-hover">
            {/* Show My Mentorships if user is Student or Mentor */}
            {isStudent(props) || isMentor(props) ? (
                <li>
                    <NavLink
                        data-hover="My Mentorships"
                        className="nav-link"
                        to="/mentors"
                        activeClassName="selected">
                        My Mentorships
                    </NavLink>
                </li>
            ) : null}
            {/* Show Mentor Search if user is Student */}
            {isStudent(props) && (
                <li>
                    <NavLink
                        data-hover="Mentor Search"
                        className="nav-link"
                        to="/search/mentors"
                        activeClassName="selected">
                        Mentor Search
                    </NavLink>
                </li>
            )}
            {/* Show My Jobs if user is Student or Client */}
            {isStudent(props) || isClient(props) ? (
                <li>
                    <NavLink
                        data-hover="My Jobs"
                        className="nav-link"
                        to="/jobs"
                        activeClassName="selected">
                        My Jobs
                    </NavLink>
                </li>
            ) : null}

            {/* Show Job Search if user is Student */}
            {isStudent(props) && (
                <li>
                    <NavLink
                        data-hover="Job Search"
                        className="nav-link"
                        to="/search/jobs"
                        activeClassName="selected">
                        Job Search
                    </NavLink>
                </li>
            )}
            {isClient(props) && (
                <li>
                    <NavLink
                        data-hover="Post New Job"
                        className="nav-link"
                        to="/jobs/new"
                        activeClassName="selected">
                        Post New Job
                    </NavLink>
                </li>
            )}
            {/* Show Admin if user is Admin */}
            {isAdmin(props) && (
                <li>
                    <NavLink
                        data-hover="Admin"
                        className="nav-link"
                        to="/admin"
                        activeClassName="selected">
                        Admin
                    </NavLink>
                </li>
            )}
            <li>
                <NavLink
                    data-hover={props.user.id ? 'Profile' : ''}
                    className="nav-link"
                    to="/home"
                    activeClassName="selected">
                    {/* Show My Profile if user is logged in, otherwise show Login/Register */}
                    {props.user.id ? 'Profile' : ''}
                </NavLink>
            </li>

            {/* Show the link to the logout button if the user is logged in */}
            {props.user.id && (
                <>
                    <li>
                        <NavLink
                            data-hover="Messages"
                            className="nav-link"
                            to="/messages"
                            activeClassName="selected">
                            Messages
                        </NavLink>
                    </li>
                    <li>
                        <Link

                            data-hover="Log Out"
                            className="nav-link"
                            onClick={() => props.dispatch({ type: 'LOGOUT' })}>
                            Log Out
                        </Link>
                    </li>
                </>
            )}
        </div>
    </nav>
);

const mapStateToProps = state => ({
    user: state.user
});

export default withRouter(connect(mapStateToProps)(Nav));
