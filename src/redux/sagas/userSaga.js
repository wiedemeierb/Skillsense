import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
	try {
		const config = {
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true
		};

		// the config includes credentials which
		// allow the server session to recognize the user
		// If a user is logged in, this will return their information
		// from the server session (req.user)
		const response = yield axios.get('/api/user', config);

		// now that the session has given us a user object
		// with an id and username set the client-side user object to let
		// the client-side code know the user is logged in
		yield put({ type: 'FETCH_USER_SKILLS' });
		yield put({ type: 'SET_USER', payload: response.data });
	} catch (error) {
		console.log('User get request failed', error);
	}
}

//get user details for selected user
function* fetchSelectedUser(action) {
	try {
		const response = yield axios.get(`/api/user/specific/${action.payload}`);
		const skillsResponse = yield axios.get(
			`api/userskills/?id=${action.payload}`
		);
		yield put({
			type: 'SET_SELECTED_USER',
			payload: { ...response.data, skills: skillsResponse.data }
		});
	} catch (error) {
		console.log('error in fetchSelectedUser in userSaga: ', error);
	}
}

//update user profile details
function* editUserInfo(action) {
	try {
		let id = action.payload.id;
		let response = yield axios.put(`/api/user/edit/${id}`, action.payload);
		yield put({
			type: 'FETCH_USER',
			payload: response.data.id
		});
	} catch (error) {
		console.log('error in editUserInfo in userSaga: ', error);
	}
}

//gets list of user types for registration dropdown
function* fetchUserTypes() {
	try {
		let response = yield axios.get('/api/info/types/user')
		yield put({ type: 'SET_USER_TYPES', payload: response.data })
	} catch (error) {
		console.log('error on retrieving user types from database')
	}
}

function* userSaga() {
	yield takeLatest('FETCH_USER', fetchUser);
	yield takeLatest('FETCH_SELECTED_USER', fetchSelectedUser);
	yield takeLatest('EDIT_USER_INFO', editUserInfo);
	yield takeLatest('FETCH_USER_TYPES', fetchUserTypes);
}

export default userSaga;
