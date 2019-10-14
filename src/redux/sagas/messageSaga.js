import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//get all message for current user
function* fetchAllMessages() {
    try {
        let response = yield axios.get('/api/messages')
        // console.log(response)
        yield put({
            type: 'SET_ALL_MESSAGES',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

function* messageSaga() {
    yield takeEvery('FETCH_ALL_MESSAGES', fetchAllMessages);
}

export default messageSaga;