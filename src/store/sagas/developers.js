import { call, put } from 'redux-saga/effects';
import api from '../../services/api';

import { addDeveloperSuccess, addDeveloperFailure } from '../actions/developers';

export function* addDeveloper(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.username}`);

    const repositoryData = {
      id: data.id,
      name: data.name,
      login: data.login,
      avatar: data.avatar_url,
      target: action.payload.target,
    };

    yield put(addDeveloperSuccess(repositoryData));
  } catch (err) {
    yield put(addDeveloperFailure(err));
  }
}
