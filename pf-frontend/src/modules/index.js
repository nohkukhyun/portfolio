import { combineReducers } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
  auth,
});

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
