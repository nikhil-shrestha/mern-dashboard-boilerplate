import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from 'axios';

import { SIGN_IN_START, SIGN_OUT_START, LOAD_USER_START } from './auth.types';
import {
  signinSuccess,
  signinFail,
  signoutSuccess,
  signoutFail,
  loadUserSuccess,
  loadUserFail
} from './auth.action';

export function* signin({ payload: { formData, history } }) {
  try {
    const { data } = yield axios.post('/api/v1/auth/login', formData);
    console.log({ data });
    yield localStorage.setItem('auth::token', data.token);
    toast.success('Successfully logged in!!');
    yield put(signinSuccess());
    yield history.push({ pathname: '/' });
  } catch (err) {
    toast.error('Invalid Credentials');
    yield put(signinFail(err.message));
  }
}

export function* signout() {
  console.log('signout clicked');
  try {
    yield axios.get('/api/v1/auth/logout');
    yield put(signoutSuccess());
  } catch (err) {
    yield put(signoutFail(err));
  }
}

export function* loadUser() {
  try {
    const { data } = yield axios.get('/api/v1/auth/me');
    console.log({ data });
    yield put(loadUserSuccess(data.data));
  } catch (err) {
    yield put(loadUserFail(err));
  }
}

export function* watchSignin() {
  yield takeLatest(SIGN_IN_START, signin);
}

export function* watchSignout() {
  yield takeLatest(SIGN_OUT_START, signout);
}

export function* watchLoadUser() {
  yield takeLatest(LOAD_USER_START, loadUser);
}

export function* authSagas() {
  yield all([call(watchLoadUser), call(watchSignin), call(watchSignout)]);
}
