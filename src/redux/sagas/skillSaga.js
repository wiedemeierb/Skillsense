import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//get all skill tags
function* fetchAllSkills() {
  try {
    let response = yield axios.get('/api/info/types/skills');
    yield put({
      type: 'SET_ALL_SKILLS',
      payload: response.data
    });
  } catch (error) {
    console.log('error in fetchAllSkills in skillSaga: ', error);
    alert(
		'Oops!  Something appears to have gone wrong.  Refresh the page to try again, or try logging out and relogging back in.'
	);
  }
}

function* skillSaga() {
  yield takeEvery('FETCH_ALL_SKILLS', fetchAllSkills);
}

export default skillSaga;
