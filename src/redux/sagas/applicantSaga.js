import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//gets list of applicants for specified job
function* fetchApplicants(action) {
    try {
        let id = action.payload.id;
        let response = yield axios.get(`/api/applicants/${id}`);
        // console.log(response)
        yield put({
            type: 'SET_APPLICANTS',
            payload: response.data
        });
    } catch (error) {
        console.log(error);
    }
}

function* applicantSaga() {
    yield takeEvery('FETCH_APPLICANTS', fetchApplicants);
}

export default applicantSaga;
