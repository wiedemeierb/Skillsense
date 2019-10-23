import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//STUDENT: get all approved mentors
function* fetchAllMentors() {
	try {
		let response = yield axios.get('/api/mentors/all');
		yield put({
			type: 'SET_ALL_MENTORS',
			payload: response.data
		});
	} catch (error) {
		console.log('error in fetchAllMentors in mentorSaga: ',error);
	}
}

//STUDENT: get mentor search results
function* fetchMentorSearch(action) {
	try {
		const config = {
			headers: { 'Content-Type': 'application/json' },
			params: action.payload
		};
		let response = yield axios.get(`/api/mentors/search`, config);
		yield put({
			type: 'SET_ALL_MENTORS',
			payload: response.data
		});
	} catch (error) {
		console.log('error in fetchMentorSearch in mentorSaga: ',error);
	}
}

//STUDENT: FETCH ACTIVE MENTORS
function* fetchActiveMentors() {
	try {
		let response = yield axios.get('/api/mentors/active');
		yield put({
			type: 'SET_ALL_MENTORS',
			payload: response.data
		});
	} catch (error) {
		console.log('error in fetchActiveMentors in mentorSaga: ',error);
	}
}

//STUDENT: FETCH INVITED MENTORS
function* fetchInvitedMentors() {
	try {
		let response = yield axios.get('/api/mentors/invited');
		for (let user of response.data) {
			let messageResponse = yield axios.get(`/api/messages/last/${user.id}`);
			user.inviteMessage = messageResponse.data;
		}
		yield put({
			type: 'SET_ALL_MENTORS',
			payload: response.data
		});
	} catch (error) {
		console.log('error in fetchInvitedMentors in mentorSaga: ',error);
	}
}

//ADMIN: FETCH MENTORS PENDING APPROVAL
function* fetchPendingMentors() {
	try {
		let response = yield axios.get('/api/mentors/pending');
		yield put({
			type: 'SET_PENDING_MENTORS',
			payload: response.data
		});
	} catch (error) {
		console.log('error in fetchPendingMentors in mentorSaga: ',error);
	}
}

//STUDENT: SEND MENTOR REQUEST
function* sendMentorRequest(action) {
	try {
		let request = action.payload;
		yield axios.post('/api/mentors/request', request);
		yield put({
			type: 'FETCH_ALL_MENTORS'
		});
	} catch (error) {
		console.log('error in sendMentorRequest in mentorSaga: ',error);
	}
}

//MENTORS: UPDATE STUDENT_MENTOR TO APPROVED: TRUE
function* acceptMentorship(action) {
	try {
		yield axios.put(`/api/mentors/accept/${action.payload.student.id}`);
		yield put({
			type: 'SEND_SYSTEM_MESSAGE',
			payload: {
				id: action.payload.student_id,
				message: `***Your request for mentorship with ${action.payload.mentor.username} has been accepted.  You can log in to your SkillSense Mentorships page for more information and contact them through the SkillSense messaging center.***`
			}
		});
		yield put({
			type: 'FETCH_INVITED_MENTORS'
		});
		yield put({
			type: 'CLEAR_SELECTED_USER'
		});
	} catch (error) {
		console.log('error in acceptMentorship in mentorSaga: ',error);
	}
}

//MENTORS: DELETE STUDENT_MENTOR RELATIONSHIP
function* declineMentorship(action) {
	try {
		yield axios.delete(`/api/mentors/decline/${action.payload.student_id}`);
		yield put({
			type: 'FETCH_INVITED_MENTORS'
		});
		yield put({
			type: 'CLEAR_SELECTED_USER'
		});
	} catch (error) {
		console.log('error in declineMentorship in mentorSaga: ',error);
	}
}

function* mentorSaga() {
	yield takeEvery('FETCH_ALL_MENTORS', fetchAllMentors);
	yield takeEvery('FETCH_MENTOR_SEARCH', fetchMentorSearch);
	yield takeEvery('SEND_MENTOR_REQUEST', sendMentorRequest);
	yield takeEvery('FETCH_ACTIVE_MENTORS', fetchActiveMentors);
	yield takeEvery('FETCH_INVITED_MENTORS', fetchInvitedMentors);
	yield takeEvery('FETCH_PENDING_MENTORS', fetchPendingMentors);
	yield takeEvery('ACCEPT_MENTORSHIP', acceptMentorship);
	yield takeEvery('DECLINE_MENTORSHIP', declineMentorship);
}

export default mentorSaga;
