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
const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value; //ex: state.register.username을 바꾼다.
      }),

    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
  },
  initialState,
);

export default auth;

// import { ajax } from 'rxjs/ajax';
// import { map, mergeMap, catchError } from 'rxjs/operators';
// import { ofType } from 'redux-observable';

// export const CHANGE_FIELD = 'CHANGE_FIELD';
// export const INITIALIZE_FORM = 'INITIALIZE_FORM';

// export const changeField = (payload, path) => {
//   type: CHANGE_FIELD, payload;
// };

// export const initializeForm = () => {
//   type: INITIALIZE_FORM, payload;
// };

// const chageFormField = () => {
//   action$.pipe(
//     ofType(CHANGE_FIELD),
//     mergeMap(action =>
//       ajax
//         .getJSON(
//           `https://newsapi.org/v2/top-headlines?country=kr&apiKey=1f04516a3f5b4157a5b8434ca25acc40`,
//         )
//         .pipe(
//           map(
//             response => (
//               console.log('newsEpic', action),
//               {
//                 type: 'FETCH_NEWS_SUCCESS',
//                 payload: response,
//               }
//             ),
//           ),
//           catchError(e => console.log(e)),
//         ),
//     ),
//   );
// };

// export const initalState = {
//   isLoading: false,
// };

// let nextData = {};
// export const authReducer = (state = initalState, { type, payload, path }) => {
//   switch (type) {
//     case news.FETCH_NEWS_REQUEST:
//       nextData = state;
//       nextData = {
//         ...state.news,
//         isLoading: true,
//         path: path,
//       };
//       return nextData;

//     case news.FETCH_NEWS_SUCCESS:
//       // console.log({ payload });
//       let newsList = payload && payload.articles;
//       nextData = {
//         ...state.news,
//         isLoading: false,
//         path: '',
//         newsList,
//       };
//       return nextData;

//     case news.FETCH_NEWS_FAIL:
//       return {
//         ...state.news,
//         isLoading: false,
//       };

//     default:
//       return state;
//   }
// };

// export default auth;
