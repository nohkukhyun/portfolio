import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import * as listAPI from '../lib/api/list';

const LIST_FETCH = 'list/LIST_FETCH';
const LIST_FETCH_SUCCESS = 'list/LIST_FETCH_SUCCESS';
const LIST_FETCH_FAILURE = 'list/LIST_FETCH_FAILURE';

const READ_POST = 'list/READ_POST';
const READ_POST_SUCCESS = 'list/READ_POST_SUCCESS';
const READ_POST_FAILURE = 'list/READ_POST_FAILURE';

const UNLOAD_POST = 'list/UNLOAD_POST'; // 페이지 벗어 났을때.

export const portfolioList = createAction(LIST_FETCH);
export const readPost = createAction(READ_POST, id => id);
export const unloadPost = createAction(UNLOAD_POST);

// make redux-saga!
const portfolioListSaga = createRequestSaga(LIST_FETCH, listAPI.list);
const readPostSaga = createRequestSaga(READ_POST, listAPI.readPost);
export function* listSaga() {
  yield takeLatest(LIST_FETCH, portfolioListSaga);
  yield takeLatest(READ_POST, readPostSaga);
}

const initialState = {
  allPost: null,
  allPostError: null,
  post: null,
  error: null,
};

// make reducer
const list = handleActions(
  {
    [LIST_FETCH_SUCCESS]: (state, { payload: allPost }) => ({
      ...state,
      allPost,
      allPostError: null,
    }),
    [LIST_FETCH_FAILURE]: (state, { payload: allPostError }) => ({
      ...state,
      allPostError,
    }),
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_POST]: () => initialState,
  },
  initialState,
);

export default list;
