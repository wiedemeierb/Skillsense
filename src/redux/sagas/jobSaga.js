import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchAllJobs() {
  try {
    let response = yield axios.get('/api/jobs');
    console.log(response);
    yield put({
      type: 'SET_ALL_JOBS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

function* fetchActiveJobs() {
  try {
    let response = yield axios.get('/api/jobs/active');
    console.log(response);
    yield put({
      type: 'SET_ALL_JOBS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

function* fetchAppliedJobs() {
  try {
    let response = yield axios.get('/api/jobs/applied');
    console.log(response);
    yield put({
      type: 'SET_ALL_JOBS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

function* fetchCompletedJobs() {
  try {
    let response = yield axios.get('/api/jobs/completed');
    console.log(response);
    yield put({
      type: 'SET_ALL_JOBS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

function* jobSaga() {
  yield takeEvery('FETCH_ALL_JOBS', fetchAllJobs);
  yield takeEvery('FETCH_ACTIVE_JOBS', fetchActiveJobs);
  yield takeEvery('FETCH_APPLIED_JOBS', fetchAppliedJobs);
  yield takeEvery('FETCH_COMPLETED_JOBS', fetchCompletedJobs);
}

export default jobSaga;
