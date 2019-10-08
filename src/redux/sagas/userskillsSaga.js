import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchUserSkills() {
    try {
        let response = yield axios.get('/api/userskills')
        console.log(response)
        yield put({
            type: 'SET_USER_SKILLS',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

function* userskillsSaga() {
    yield takeEvery('FETCH_USER_SKILLS', fetchUserSkills)
}

export default userskillsSaga;