import {
  LOAD_USER_START,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_IN_START,
  SIGN_IN_FAILURE,
  SIGN_OUT_FAILURE,
  SIGN_OUT_SUCCESS
} from './auth.types';

const INITIAL_STATE = {
  isAuthenticated: null,
  loading: false,
  currentUser: {},
  error: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_IN_START:
    case LOAD_USER_START:
      return {
        ...state,
        loading: true
      };

    case SIGN_IN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: payload,
        loading: false
      };

    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: null,
        currentUser: {},
        error: null
      };

    case LOAD_USER_FAILURE:
    case SIGN_IN_FAILURE:
    case SIGN_OUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};

export default authReducer;
