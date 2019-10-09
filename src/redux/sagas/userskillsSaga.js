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

function* addSkill(action) {
    try {
        yield axios.post('/api/userskills', action.payload);
        yield put({
            type: 'FETCH_USER_SKILLS',
        });
    } catch (error) {
        console.log('Error with addskill', error);
    }}

function* userskillsSaga() {
    yield takeEvery('FETCH_USER_SKILLS', fetchUserSkills)
    yield takeEvery('ADD_SKILL', addSkill)
}

export default userskillsSaga;