import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import * as writeAPI from '../lib/api/write';

const CHANGE_FIELD = 'write/CHANGE_FIELD';

const PORTFOLIO = 'write/PORTFOLIO';
const PORTFOLIO_SUCCESS = 'write/PORTFOLIO_SUCCESS';
const PORTFOLIO_FAILURE = 'write/PORTFOLIO_FAILURE';

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, //write
    key, //username, password, passwordconfirm
    value, //실제 바꾸려는 값
  }),
);

export const portfolioWrite = createAction(
  PORTFOLIO,
  ({ title, skils, description }) => ({
    title,
    skils,
    description,
  }),
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form);

const initialState = {
  portfolio: {
    title: '',
    skils: '',
    description: '',
  },
  portfolioError: null,
};
// Make Redux Saga!
const portfolioWriteSaga = createRequestSaga(PORTFOLIO, writeAPI.write);

export function* writeSaga() {
  yield takeLatest(PORTFOLIO, portfolioWriteSaga());
}

// handleActions을 이용한 redux
const write = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [PORTFOLIO_SUCCESS]: (state, action) => ({
      ...state,
      form: action.payload,
    }),
    [PORTFOLIO_FAILURE]: (state, action) => ({
      ...state,
      portfolioError: action.payload.error,
    }),
  },
  initialState,
);

export default write;
