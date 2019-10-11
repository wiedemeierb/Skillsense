import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//gets list of skills for active user
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

//posts new user skill
function* addSkill(action) {
    try {
        yield axios.post('/api/userskills', action.payload);
        yield put({
            type: 'FETCH_USER_SKILLS',
        });
    } catch (error) {
        console.log('Error with addskill', error);
    }
}

//removes user's skill
function* removeSkill(action) {
    try {
        yield axios.delete(`/api/userskills/${action.payload.id}`)
        yield put({
            type: 'FETCH_USER_SKILLS'
        })
    } catch (error) {
        console.log('Error on deleting user skill')
    }
}

function* userskillsSaga() {
    yield takeEvery('FETCH_USER_SKILLS', fetchUserSkills)
    yield takeEvery('ADD_SKILL', addSkill)
    yield takeEvery('REMOVE_SKILL', removeSkill)
}

export default userskillsSaga;
