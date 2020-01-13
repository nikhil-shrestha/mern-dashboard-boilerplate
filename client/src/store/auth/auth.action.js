import {
  LOAD_USER_START,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from './auth.types';

export const loadUserStart = () => ({
  type: LOAD_USER_START
});

export const loadUserSuccess = currentUser => ({
  type: LOAD_USER_SUCCESS,
  payload: currentUser
});

export const loadUserFail = error => ({
  type: LOAD_USER_FAILURE,
  payload: error
});

export const signinStart = (formData, history) => ({
  type: SIGN_IN_START,
  payload: { formData, history }
});

export const signinSuccess = currentUser => ({
  type: SIGN_IN_SUCCESS,
  payload: currentUser
});

export const signinFail = error => ({
  type: SIGN_IN_FAILURE,
  payload: error
});

export const signupStart = (formData, history) => ({
  type: SIGN_UP_START,
  payload: { formData, history }
});

export const signupSuccess = () => ({
  type: SIGN_UP_SUCCESS
});

export const signupFailure = error => ({
  type: SIGN_UP_FAILURE,
  payload: error
});

export const signoutStart = (formData, history) => ({
  type: SIGN_OUT_START
});

export const signoutSuccess = () => ({
  type: SIGN_OUT_SUCCESS
});

export const signoutFail = error => ({
  type: SIGN_OUT_FAILURE,
  payload: error
});
