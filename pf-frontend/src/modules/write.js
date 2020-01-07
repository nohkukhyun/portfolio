import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import * as writeAPI from '../lib/api/write';

const CHANGE_FIELD = 'write/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const PORTFOLIO = 'write/PORTFOLIO';
const PORTFOLIO_SUCCESS = 'write/PORTFOLIO_SUCCESS';
const PORTFOLIO_FAILURE = 'write/PORTFOLIO_FAILURE';

const IMAGE_UPLOAD = 'write/IMAGE_UPLOAD';
const IMAGE_UPLOAD_SUCCESS = 'write/IMAGE_UPLOAD_SUCCESS';
const IMAGE_UPLOAD_FAILURE = 'write/IMAGE_UPLOAD_FAILURE';

export const changeField = createAction(
  CHANGE_FIELD,
  ({ portfolio, name, value, files }) => ({
    portfolio,
    name, //username, password, passwordconfirm
    value, //실제 바꾸려는 값
    files, //이미지 값
  }),
);

export const portfolioWrite = createAction(
  PORTFOLIO,
  ({ title, skils, description, image, part }) => ({
    title,
    skils,
    description,
    image,
    part,
  }),
);

export const imageUpload = createAction(IMAGE_UPLOAD, ({ file }) => ({
  file,
}));

export const initializeForm = createAction(
  INITIALIZE_FORM,
  portfolio => portfolio,
);

const initialState = {
  portfolio: {
    title: '',
    skils: '',
    description: '',
    image: '',
    part: '',
  },
  portfolioFull: null,
  portfolioError: null,
  imageFile: null,
  imageFileError: null,
};

// Make Redux Saga!
const portfolioWriteSaga = createRequestSaga(PORTFOLIO, writeAPI.write);
const imageUploadSaga = createRequestSaga(IMAGE_UPLOAD, writeAPI.writeImg);

export function* writeSaga() {
  yield takeLatest(PORTFOLIO, portfolioWriteSaga);
  yield takeLatest(IMAGE_UPLOAD, imageUploadSaga);
}

// handleActions을 이용한 redux
const write = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { name, value } }) =>
      produce(state, draft => {
        draft.portfolio[name] = value;
      }),
    [PORTFOLIO_SUCCESS]: (state, { payload: portfolioFull }) => ({
      ...state,
      portfolioFull,
      portfolioError: null,
    }),
    [PORTFOLIO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      portfolioError: error,
    }),
    [IMAGE_UPLOAD_SUCCESS]: (state, { payload: imageFile }) => ({
      ...state,
      imageFile,
    }),
    [IMAGE_UPLOAD_FAILURE]: (state, { payload: imageFileError }) => ({
      ...state,
      imageFileError,
    }),
  },
  initialState,
);

export default write;
