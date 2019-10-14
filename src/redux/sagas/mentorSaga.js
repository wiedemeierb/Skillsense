import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//get all approved mentors
function* fetchAllMentors() {
  try {
    let response = yield axios.get('/api/mentors/all');
    // console.log(response.data);
    yield put({
      type: 'SET_ALL_MENTORS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

//get mentor search results
function* fetchMentorSearch(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      params: action.payload
    };
    let response = yield axios.get(`/api/mentors/search`, config);
    // console.log(response.data);
    yield put({
      type: 'SET_ALL_MENTORS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
}

//STUDENT: FETCH ACTIVE MENTORS
function* fetchActiveMentors() {
  try {
    let response = yield axios.get('/api/mentors/active');
    // console.log(response.data);
    yield put({
      type: 'SET_ALL_MENTORS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

//STUDENT: FETCH INVITED MENTORS
function* fetchInvitedMentors() {
  try {
    let response = yield axios.get('/api/mentors/invited');
    // console.log(response.data);
    yield put({
      type: 'SET_ALL_MENTORS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

//ADMIN: FETCH MENTORS PENDING APPROVAL
function* fetchPendingMentors() {
  try {
    let response = yield axios.get('/api/mentors/pending');
    // console.log(response.data);
    yield put({
      type: 'SET_PENDING_MENTORS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

function* acceptMentorship(action) {
  try {
    yield axios.put(`/api/mentors/accept/${action.payload.student_id}`)
    yield put({
      type: 'FETCH_INVITED_MENTORS'
    });
  } catch (error) {
    console.log(error);
  }
}

function* declineMentorship(action) {
  try {
    yield axios.delete(`/api/mentors/decline/${action.payload.student_id}`)
    yield put({
      type: 'FETCH_INVITED_MENTORS'
    });
  } catch (error) {
    console.log(error);
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
