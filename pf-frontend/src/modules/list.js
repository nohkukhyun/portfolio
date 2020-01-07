import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import * as listAPI from '../lib/api/list';

const LIST_FETCH = 'list/LIST_FETCH';
const LIST_FETCH_SUCCESS = 'list/LIST_FETCH_SUCCESS';
const LIST_FETCH_FAILURE = 'list/LIST_FETCH_FAILURE';

export const portfolioList = createAction(LIST_FETCH);

// make redux-saga!
const portfolioListSaga = createRequestSaga(LIST_FETCH, listAPI.list);
export function* listSaga() {
  yield takeLatest(LIST_FETCH, portfolioListSaga);
}

const initialState = {
  allPost: null,
  allPostError: null,
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
  },
  initialState,
);

export default list;
