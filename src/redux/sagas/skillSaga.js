import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//get all skill tags
function* fetchAllSkills() {
  try {
    let response = yield axios.get('/api/skills');
    yield put({
      type: 'SET_ALL_SKILLS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
}

function* skillSaga() {
  yield takeEvery('FETCH_ALL_SKILLS', fetchAllSkills);
}

export default skillSaga;
