import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';

//action
const MODAL_SHOW = 'MODAL_SHOW';
const MODAL_SHOW_SUCCESS = 'MODAL_SHOW_SUCCESS';
const MODAL_SHOW_FAILURE = 'MODAL_SHOW_FAILURE';

export const modalShow = createAction(MODAL_SHOW);
//redux-saga
const modalShowSaga = createRequestSaga(MODAL_SHOW);

export function* modalSaga() {
  yield takeLatest(modalShowSaga, MODAL_SHOW);
}

//reducer
const initialState = { data: {}, error: false };

const modal = handleActions(
  {
    [MODAL_SHOW_SUCCESS]: (state, action) => ({
      ...state,
      data: action.payload,
      error: false,
    }),
    [MODAL_SHOW_FAILURE]: (state, action) => ({
      ...state,
      data: action.payload,
      error: true,
    }),
  },
  initialState,
);

export default modal;
