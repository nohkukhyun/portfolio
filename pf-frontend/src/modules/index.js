import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';

const rootReducer = combineReducers({
  auth,
  loading,
});

export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;

// import { combineEpics } from 'redux-observable';
// import { combineReducers } from 'redux';
// import auth from './auth';

// const rootEpic = combineEpics({
//   auth,
// });

// const rootReducer = combineReducers({
//   authReducer,
// });
