import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchAllMentors() {
  try {
    let response = yield axios.get('/api/mentors/all');
    console.log(response);
    yield put({
      type: 'SET_ALL_MENTORS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

function* fetchMentorSearch(action) {
  let searchTerm = action.payload.searchTerm;
  try {
    let response = yield axios.get(`/api/mentors/${searchTerm}`);
    console.log(response);
    yield put({
      type: 'SET_ALL_MENTORS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

function* mentorSaga() {
  yield takeEvery('FETCH_ALL_MENTORS', fetchAllMentors);
  yield takeEvery('FETCH_MENTOR_SEARCH', fetchMentorSearch);
}

export default mentorSaga;
