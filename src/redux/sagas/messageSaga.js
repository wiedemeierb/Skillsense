import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//get all message for current user
function* fetchAllMessages() {
	try {
		let response = yield axios.get('/api/messages');
		console.log(response);
		yield put({
			type: 'SET_ALL_MESSAGES',
			payload: response.data
		});
	} catch (error) {
		console.log(error);
	}
}

function* sendMessage(action) {
	try {
		yield axios.post('/api/messages', action.payload);

		yield put({
			type: 'FETCH_ALL_MESSAGES'
		});
	} catch (error) {
		console.log('error on sending message: ', error);
	}
}

function* sendSystemMessage(action) {
	try {
		//needs an action payload set up like: {recipient: {id: #, name: '', email: ''}, message: ''}
		yield axios.post('/api/messages', action.payload);
		yield axios.post('/api/email', action.payload);
		yield put({
			type: 'FETCH_ALL_MESSAGES'
		});
	} catch (error) {
		console.log('error on sending system generated message: ', error);
	}
}

function* messageSaga() {
	yield takeEvery('FETCH_ALL_MESSAGES', fetchAllMessages);
	yield takeEvery('SEND_MESSAGE', sendMessage);
	yield takeEvery('SEND_SYSTEM_MESSAGE', sendSystemMessage);
}

export default messageSaga;
