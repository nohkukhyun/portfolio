import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import * as readAPI from '../lib/api/read';

// initialState
const initialState = {
  post: null,
  error: null,
};

// Actions
const READ_POST = 'read/READ_POST';
const READ_POST_SUCCESS = 'read/READ_POST_SUCCESS';
const READ_POST_FAILURE = 'read/READ_POST_FAILURE';

const UNLOAD_POST = 'list/UNLOAD_POST'; // 페이지 벗어 났을때.

export const readPost = createAction(READ_POST, id => id);
export const unloadPost = createAction(UNLOAD_POST);
const readPostSaga = createRequestSaga(READ_POST, readAPI.readPost);

export function* readSaga() {
  yield takeLatest(READ_POST, readPostSaga);
}

// Reducers
const read = handleActions(
  {
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
      error: null,
    }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_POST]: () => initialState,
  },
  initialState,
);

export default read;
