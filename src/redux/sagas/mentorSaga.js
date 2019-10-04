import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchAllMentors() {
    try {
        let response = yield axios.get('/api/mentors')
        console.log(response)
        yield put({
            type: 'SET_ALL_MENTORS',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

function* mentorSaga() {
    yield takeEvery('FETCH_ALL_MENTORS', fetchAllMentors);
}

export default mentorSaga;