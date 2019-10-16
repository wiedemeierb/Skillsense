import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//sends Resume attachment to AWS
function* uploadFile(action) {
	try {
		let awsSignedResponse = yield axios.post('/api/upload', {
			fileName: action.payload.fileName,
			fileType: action.payload.fileType
		});
		const returnData = yield awsSignedResponse.data.data.returnData;
		const signedRequest = yield returnData.signedRequest;
		// const url = returnData.url;
		// console.log('url from aws: ', url);
		yield put({ type: 'SET_FILE_URL' })
		yield axios.put(signedRequest, action.payload.file, {
			headers: {
				'Content-Type': action.payload.fileType
			}
		});
	} catch (error) {
		console.log('error uploading file to aws: ', error);
	}
}

function* uploadSaga() {
	yield takeEvery('UPLOAD_FILE', uploadFile);
}

export default uploadSaga;
