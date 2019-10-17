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
		let returnPayload;
		const response = yield axios.get(`/api/applicants/detail/${id}`);
		returnPayload = { ...response.data };
		const studentSkillsResponse = yield axios.get(
			`/api/userskills/?id=${response.data.student_id}`
		);
		returnPayload.studentSkills = studentSkillsResponse.data
		if (response.data.mentor_id) {
			const mentorResponse = yield axios.get(`/api/user/specific/${response.data.mentor_id}`);
			const mentorSkillsResponse = yield axios.get(
				`api/userskills/?id=${response.data.mentor_id}`
			);
			returnPayload.mentor = {...mentorResponse.data, skills: mentorSkillsResponse.data}
		}
		yield put({
			type: 'SET_APPLICANT_DETAIL',
			payload: returnPayload
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
			payload: { id: application.jobId }
		});
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
