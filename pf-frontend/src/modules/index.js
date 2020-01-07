import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import list, { listSaga } from './list';
import read, { readSaga } from './read';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  list,
  read,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), writeSaga(), listSaga(), readSaga()]);
}

export default rootReducer;
