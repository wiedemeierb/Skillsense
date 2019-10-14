import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { ReactComponent as SkillSenseLogo } from '../../skillSenseLogo.svg';

const isAdmin = (props) => {
  return props.user.access_id === 4
}

const isClient = (props) => {
  return props.user.access_id === 3

}

const isMentor = (props) => {
  return props.user.access_id === 2
}

const isStudent = (props) => {
  return props.user.access_id === 1
}

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <SkillSenseLogo alt="skill-sense logo" className="logo" />
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {/* Show My Profile if user is logged in, otherwise show Login/Register */}
        {props.user.id ? 'My Profile' : 'Login / Register'}
      </Link>
      {/* Always show this link since the about page is not protected */}

      {/* Show My Mentorships if user is student or mentor */}
      {isStudent(props) || isMentor(props) ? <Link className="nav-link" to="/mentors">
        My Mentorships
      </Link> : null}
      {/* Show Mentor Search if user is student */}
      {isStudent(props) && <Link className="nav-link" to="/search/mentors">
        Mentor Search
          </Link>}
      {/* Show Admin if user is admin */}
      {isAdmin(props) && <Link className="nav-link" to="/admin">
        Admin
      </Link>}
      {/* Show My Jobs if user is student or client */}
      {isStudent(props) || isClient(props) ? <Link className="nav-link" to="/jobs">
        My Jobs
          </Link> : null}
      {/* Show Job Search if user is student */}
      {isStudent(props) && <Link className="nav-link" to="/search/jobs">
        Job Search
      </Link>}
      {isClient(props) && <Link className="nav-link" to="/jobs/new">
        Post New Job
      </Link>}
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Link className="nav-link" to="/messages">Messages</Link>
          <LogOutButton className="nav-link" />
        </>
      )}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
