import { createAction } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import * as uploadAPI from '../lib/api/upload';

//Actions
const FILE_UPLOAD = 'upload/FILE_UPLOAD';
const FILE_UPLOAD_SUCCESS = 'upload/FILE_UPLOAD_SUCCESS';
const FILE_UPLOAD_FAILURE = 'upload/FILE_UPLOAD_FAILURE';

//redux saga
export const fileUpload = createAction(FILE_UPLOAD, files);

const initialState = {
  files: null,
  filesError: null,
};

const fileUploadSaga = createRequestSaga(FILE_UPLOAD, uploadAPI.uploadImage);

export function* uploadSaga() {
  yield takeLatest(FILE_UPLOAD, fileUploadSaga);
}

//reducer
const upload = handleActions(
  {
    [FILE_UPLOAD_SUCCESS]: (state, { payload: files }) => ({
      ...state,
      files,
    }),
    [FILE_UPLOAD_FAILURE]: (state, { payload: filesError }) => ({
      ...state,
      filesError,
    }),
  },
  initialState,
);

export default upload;
