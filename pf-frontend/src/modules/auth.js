import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authApi from '../lib/api/auth';

/** redux Dusks Pattern **/

//redux Action Type
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, //register, login
    key, //username, password, passwordconfirm
    value, //실제 바꾸려는 값
  }),
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form);
//가입
export const register = createAction(REGISTER, ({ username, password }) => ({
  username,
  password,
}));

export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

//리덕스 사가 생성
const registerSaga = createRequestSaga(REGISTER, authApi.register);
const loginSaga = createRequestSaga(LOGIN, authApi.login);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};

/*
  redux Reducers
  switch 문 대신 handleActions 사용하면 이름이 중첩되어, 에러를 출력할 경우의 수 가 줄어든다.
*/
const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value; //ex: state.register.username을 바꾼다.
      }),

    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
    }),
    //회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
      // here: console.log('here', { state, auth }),
    }),
    //회원가입실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
      // here: console.log('here', { state, auth }),
    }),
    //로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    //로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;
