//
import { all, takeLatest } from 'redux-saga/effects';

import { addDeveloper } from './developers';

export default function* rootSaga() {
  yield all([takeLatest('ADD_DEVELOPER_REQUEST', addDeveloper)]);
}
