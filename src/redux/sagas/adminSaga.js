import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* approveMentor(action) {
	try {
		yield axios.patch(`/api/mentors/admin/${action.payload}`, { newStatus: 3 });
		yield put({ type: 'FETCH_PENDING_MENTORS' });
		yield put({ type: 'CLEAR_SELECTED_USER' });
	} catch (error) {
		console.log('error on approve mentor saga: ', error);
	}
}

function* declineMentor(action) {
	try {
		yield axios.patch(`/api/mentors/admin/${action.payload}`, { newStatus: 1 });
		yield put({ type: 'FETCH_PENDING_MENTORS' });
		yield put({ type: 'CLEAR_SELECTED_USER' });
	} catch (error) {
		console.log('error on decline mentor saga: ', error);
	}
}

function* requestAdminReview(action) {
	try {
		yield axios.patch(`/api/mentors/request`)
		yield put({type: 'FETCH_USER'})
	} catch (error) {
		console.log('error on updating mentor status to pending review: ', error)
	}
}
function* adminSaga() {
	yield takeEvery('ADMIN_APPROVE_MENTOR', approveMentor);
	yield takeEvery('ADMIN_DECLINE_MENTOR', declineMentor);
	yield takeEvery('REQUEST_ADMIN_REVIEW', requestAdminReview)
}

export default adminSaga;
