import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//get all message for current user
function* fetchAllMessages() {
	try {
		let response = yield axios.get('/api/messages');
		yield put({
			type: 'SET_ALL_MESSAGES',
			payload: response.data
		});
	} catch (error) {
		console.log('error in fetchAllMessages in messageSaga: ', error);
		alert(
			'Oops!  Something appears to have gone wrong.  Refresh the page to try again, or try logging out and relogging back in.'
		);
	}
}

function* sendMessage(action) {
	try {
		yield axios.post('/api/messages', action.payload);
		yield put({
			type: 'FETCH_ALL_MESSAGES'
		});
	} catch (error) {
		console.log('error in sendMessage in messageSaga: ', error);
		alert(
			'Oops!  Something appears to have gone wrong.  Refresh the page to try again, or try logging out and relogging back in.'
		);
	}
}

function* sendSystemMessage(action) {
	try {
		let recipientResponse = yield axios.get(`/api/user/specific/${action.payload.id}`);
		let newPayload = { recipient: recipientResponse.data, message: action.payload.message };
		yield put({ type: 'SEND_MESSAGE', payload: newPayload });
		yield axios.post('/api/email', newPayload);
		yield put({
			type: 'FETCH_ALL_MESSAGES'
		});
	} catch (error) {
		console.log('error in sendSystemMessage in messageSaga: ', error);
	}
}

function* messageSaga() {
	yield takeEvery('FETCH_ALL_MESSAGES', fetchAllMessages);
	yield takeEvery('SEND_MESSAGE', sendMessage);
	yield takeEvery('SEND_SYSTEM_MESSAGE', sendSystemMessage);
}

export default messageSaga;
