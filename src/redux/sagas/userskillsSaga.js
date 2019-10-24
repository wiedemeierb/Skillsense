import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//gets list of skills for active user
function* fetchUserSkills() {
    try {
        let response = yield axios.get('/api/userskills')
        yield put({
            type: 'SET_USER_SKILLS',
            payload: response.data
        })
    } catch (error) {
        console.log('error in fetchUserSkills in userskillsSaga: ', error)
        alert(
			'Oops!  Something appears to have gone wrong.  Refresh the page to try again, or try logging out and relogging back in.'
		);
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
        console.log('error in addSkill in userskillsSaga: ', error);
        alert(
			'Oops!  Something appears to have gone wrong.  Refresh the page to try again, or try logging out and relogging back in.'
		);
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
        console.log('error in removeSkill in userskillsSaga: ', error)
        alert(
			'Oops!  Something appears to have gone wrong.  Refresh the page to try again, or try logging out and relogging back in.'
		);
    }
}

function* userskillsSaga() {
    yield takeEvery('FETCH_USER_SKILLS', fetchUserSkills)
    yield takeEvery('ADD_SKILL', addSkill)
    yield takeEvery('REMOVE_SKILL', removeSkill)
}

export default userskillsSaga;
