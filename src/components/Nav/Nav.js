import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
        <Link to="/home">
            <SkillSenseLogo alt="skill-sense logo" className="logo" />
        </Link>
        <div className="nav-right nav-hover">
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
            {/* Show Admin if user is Admin */}
            {isAdmin(props) && (
                <li>
                    <Link className="nav-link" to="/admin">
                        Admin
                    </Link>
                </li>
            )}
            <li>
                <Link className="nav-link" to="/home">
                    {/* Show My Profile if user is logged in, otherwise show Login/Register */}
                    {props.user.id ? 'Profile' : ''}
                </Link>
            </li>

            {/* Show the link to the logout button if the user is logged in */}
            {props.user.id && (
                <>
                    <li>
                        <Link className="nav-link" to="/messages">
                            Messages
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" onClick={() => props.dispatch({ type: 'LOGOUT' })}>
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

export default connect(mapStateToProps)(Nav);
