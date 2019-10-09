import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchAllJobs() {
  try {
    let response = yield axios.get('/api/jobs');
    console.log(response.data);
    yield put({
      type: 'SET_ALL_JOBS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

function* fetchJobSearch(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      params: action.payload
    };
    let response = yield axios.get(`/api/jobs/search`, config);
    console.log(response.data);
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
    console.log(response.data);
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
    console.log(response.data);
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
    console.log(response.data);
    yield put({
      type: 'SET_ALL_JOBS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

function* postJob(action) {
  try {
    yield axios.post('api/jobs/new', action.payload);
    yield put({
      type: 'FETCH_ALL_JOBS'
    });
  } catch (error) {
    console.log(error);
  }
}

function* fetchJobDetail(action){
  console.log(action.payload)
  try {
    let response = yield axios.get(`api/jobs/detail/${action.payload.id}`)
    yield put ({
      type: 'SET_JOB_DETAILS',
      payload: response.data
    });
   } catch(error){
      console.log(error);
    }
  }

function* jobSaga() {
  yield takeEvery('FETCH_ALL_JOBS', fetchAllJobs);
  yield takeEvery('FETCH_JOB_SEARCH', fetchJobSearch);
  yield takeEvery('FETCH_ACTIVE_JOBS', fetchActiveJobs);
  yield takeEvery('FETCH_APPLIED_JOBS', fetchAppliedJobs);
  yield takeEvery('FETCH_COMPLETED_JOBS', fetchCompletedJobs);
  yield takeEvery('POST_JOB', postJob);
  yield takeEvery('FETCH_JOB_DETAIL', fetchJobDetail);
}

export default jobSaga;
