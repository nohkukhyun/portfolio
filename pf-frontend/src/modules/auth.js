import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

/** redux Dusks Pattern **/

//redux Action Type
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, //register, login
    key, //username, password, passwordconfirm
    value, //실제 바꾸려는 값
  }),
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form);

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
};

/*
  redux Reducers
  switch 문 대신 handleActions 사용하면 이름이 중첩되어, 에러를 출력할 경우의 수 가 줄어든다.
*/
const authReducer = handleActions(
  {
    CHANGE_FIELD: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value; //ex: state.register.username을 바꾼다.
      }),

    INITIALIZE_FORM: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
  },
  initialState,
);

export default authReducer;
