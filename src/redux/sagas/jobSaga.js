import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchAllJobs() {
    try {
        let response = yield axios.get('/api/jobs')
        console.log(response)
        yield put({
            type: 'SET_ALL_JOBS',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

function* jobSaga() {
    yield takeEvery('FETCH_ALL_JOBS', fetchAllJobs);
}

export default jobSaga;