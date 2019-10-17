import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
//popup alert on registration success/error
import Swal from 'sweetalert2';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
    try {
        // clear any existing error on the registration page
        yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

        // passes the username and password from the payload to the server
        yield axios.post('/api/user/register', action.payload);

        // automatically log a user in after registration
        yield put({
            type: 'LOGIN',
            payload: { username: action.payload.email, password: action.payload.password }
        });
        // success popup
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Welcome to SkillSense',
            showConfirmButton: false,
            timer: 2500
        });

        // set to 'login' mode so they see the login screen
        // after registration or after they log out
        yield put({ type: 'SET_TO_LOGIN_MODE' });
    } catch (error) {
        console.log('Error with user registration:', error);
        yield put({ type: 'REGISTRATION_FAILED' });

        // error popup
        Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Error Logging In',
            text: 'An account with this email address already exists.'
        });
    }
}

function* registrationSaga() {
    yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
