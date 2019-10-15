import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//LOGO IMPORT
import { ReactComponent as SkillSenseLogo } from '../../skillSenseLogo.svg';
//STYLING IMPORTS
import './Nav.css';

//for conditional rendering based on user type
const isAdmin = props => {
    return props.user.access_id === 4;
};
const isClient = props => {
    return props.user.access_id === 3;
};
const isMentor = props => {
    return props.user.access_id === 2;
};
const isStudent = props => {
    return props.user.access_id === 1;
};

const Nav = props => (
    <nav className="nav">
        <Link to="/home">
            <SkillSenseLogo alt="skill-sense logo" className="logo" />
        </Link>
        <div className="nav-right nav-hover">
            {/* Always show this link since the about page is not protected */}

            {/* Show My Mentorships if user is Student or Mentor */}
            {isStudent(props) || isMentor(props) ? (
                <li>
                    <Link data-hover="My MentorShips" className="nav-link" to="/mentors">
                        My Mentorships
                    </Link>
                </li>
            ) : null}
            {/* Show Mentor Search if user is Student */}
            {isStudent(props) && (
                <li>
                    <Link className="nav-link" to="/search/mentors">
                        Mentor Search
                    </Link>
                </li>
            )}
            {/* Show Admin if user is Admin */}
            {isAdmin(props) && (
                <li>
                    <Link className="nav-link" to="/admin">
                        Admin
                    </Link>
                </li>
            )}
            {/* Show My Jobs if user is Student or Client */}
            {isStudent(props) || isClient(props) ? (
                <li>
                    <Link className="nav-link" to="/jobs">
                        My Jobs
                    </Link>
                </li>
            ) : null}

            {/* Show Job Search if user is Student */}
            {isStudent(props) && (
                <li>
                    <Link className="nav-link" to="/search/jobs">
                        Job Search
                    </Link>
                </li>
            )}
            {isClient(props) && (
                <li>
                    <Link className="nav-link" to="/jobs/new">
                        Post New Job
                    </Link>
                </li>
            )}

            {/* Show this link if they are logged in or not,
              but call this link 'Home' if they are logged in,
              and call this link 'Login / Register' if they are not */}
            <li>
                <Link className="nav-link" to="/home">
                    {/* Show My Profile if user is logged in, otherwise show Login/Register */}
                    {props.user.id ? 'Profile' : 'Login / Register'}
                </Link>
            </li>

            {/* Show the link to the info page and the logout button if the user is logged in */}
            {props.user.id && (
                <>
                    <li>
                        <Link className="nav-link" to="/messages">
                            Messages
                        </Link>
                    </li>
                    <li>
                        <a className="nav-link" onClick={() => props.dispatch({ type: 'LOGOUT' })}>
                            Log Out
                        </a>
                    </li>
                </>
            )}
        </div>
    </nav>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Nav);
