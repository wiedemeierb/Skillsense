import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//CLIENT: gets list of applicants for specified job
function* fetchApplicants(action) {
    try {
        let id = action.payload.id;
        let response = yield axios.get(`/api/applicants/list/${id}`);
        yield put({
            type: 'SET_APPLICANTS',
            payload: response.data
        });
    } catch (error) {
        console.log(error);
    }
}

//CLIENT: gets applicant details
function* fetchApplicantDetail(action) {
    try {
        let id = action.payload.id;
        let response = yield axios.get(`/api/applicants/detail/${id}`);
        yield put({
            type: 'SET_APPLICANT_DETAIL',
            payload: response.data
        });
    } catch (error) {
        console.log(error);
    }
}

//CLIENT: hire applicant and update job listing
function* hireApplicant(action) {
    try {
        let application = action.payload;
        yield axios.patch('/api/applicants/hire', application);
        yield put({
            type: 'FETCH_APPLICANTS',
            payload: {id: application.jobId}
        })
    } catch (error) {
        console.log(error);
    }
}

function* applicantSaga() {
    yield takeEvery('FETCH_APPLICANTS', fetchApplicants);
    yield takeEvery('FETCH_APPLICANT_DETAIL', fetchApplicantDetail);
    yield takeEvery('HIRE_APPLICANT', hireApplicant);
}

export default applicantSaga;
