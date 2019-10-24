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
		yield put({ type: 'SET_FILE_URL' })
		yield axios.put(signedRequest, action.payload.file, {
			headers: {
				'Content-Type': action.payload.fileType
			}
		});
	} catch (error) {
		console.log('error uploading file to aws, uploadFile in uploadSaga: ', error);
		alert(
			'Oops!  Something appears to have gone wrong.  Refresh the page to try again, or try logging out and relogging back in.'
		);
	}
}

function* uploadSaga() {
	yield takeEvery('UPLOAD_FILE', uploadFile);
}

export default uploadSaga;
