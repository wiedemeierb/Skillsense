import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import Swal from 'sweetalert2'

//gets all open jobs
function* fetchAllJobs() {
  try {
    let response = yield axios.get('/api/jobs');
    // console.log(response.data);
    yield put({
      type: 'SET_ALL_JOBS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

//gets job search results
function* fetchJobSearch(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      params: action.payload
    };
    let response = yield axios.get(`/api/jobs/search`, config);
    // console.log(response.data);
    yield put({
      type: 'SET_ALL_JOBS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

//get users current jobs
function* fetchActiveJobs() {
  try {
    let response = yield axios.get('/api/jobs/active');
    // console.log(response.data);
    yield put({
      type: 'SET_ALL_JOBS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

//get users jobs pending hire
function* fetchAppliedJobs() {
  try {
    let response = yield axios.get('/api/jobs/applied');
    // console.log(response.data);
    yield put({
      type: 'SET_ALL_JOBS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

//get users job history
function* fetchCompletedJobs() {
  try {
    let response = yield axios.get('/api/jobs/completed');
    // console.log(response.data);
    yield put({
      type: 'SET_ALL_JOBS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

//gets clients current jobs
function* fetchClientJobs(action) {
  let jobType = action.payload;
  try {
    let response = yield axios.get(`/api/jobs/client/${jobType}`);
    // console.log(response.data);
    yield put({
      type: 'SET_ALL_JOBS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

//gets selected job details
function* fetchJobDetail(action) {
  // console.log(action.payload);
  try {
    let response = yield axios.get(`api/jobs/detail/${action.payload.id}`);
    yield put({
      type: 'SET_SELECTED_JOB',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

//posts new job details
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

//posts job application
function* submitApplication(action) {
  // console.log(action.payload);
  try {
    yield axios.post('api/jobs/apply', action.payload);
    Swal.fire(
      'Congrats!',
      'Your application has been submitted!',
      'success',
    )
  } catch (error) {
    console.log(error);
  }
}

function* jobSaga() {
  yield takeEvery('FETCH_ALL_JOBS', fetchAllJobs);
  yield takeEvery('FETCH_JOB_SEARCH', fetchJobSearch);
  yield takeEvery('FETCH_ACTIVE_JOBS', fetchActiveJobs);
  yield takeEvery('FETCH_APPLIED_JOBS', fetchAppliedJobs);
  yield takeEvery('FETCH_COMPLETED_JOBS', fetchCompletedJobs);
  yield takeEvery('FETCH_CLIENT_JOBS', fetchClientJobs);
  yield takeEvery('FETCH_JOB_DETAIL', fetchJobDetail);
  yield takeEvery('POST_JOB', postJob);
  yield takeEvery('SUBMIT_APPLICATION', submitApplication);
}

export default jobSaga;
