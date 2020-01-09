import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import list, { listSaga } from './list';
import read, { readSaga } from './read';
import upload, { uploadSaga } from './upload';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  list,
  read,
  upload,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    writeSaga(),
    listSaga(),
    readSaga(),
    uploadSaga(),
  ]);
}

export default rootReducer;
