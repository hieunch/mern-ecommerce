/*
 *
 * Account reducer
 *
 */

import {
  ACCOUNT_CHANGE,
  INFO_CHANGE,
  FETCH_PROFILE,
  FETCH_INFO,
  CLEAR_ACCOUNT,
  CLEAR_INFO,
  SET_PROFILE_LOADING,
  FETCH_INFO_FORM_DATA
} from './constants';

const initialState = {
  user: {
    firstName: '',
    lastName: ''
  },
  info: {},
  infoFormData: {
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    icon: '',
    shopeeUrl: '',
    lazadaUrl: '',
    tikiUrl: ''
  },
  isLoading: false
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_CHANGE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    case INFO_CHANGE:
      return {
        ...state,
        infoFormData: {
          ...state.infoFormData,
          ...action.payload
        }
      };
    case FETCH_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    case FETCH_INFO:
      return {
        ...state,
        info: {
          ...state.info,
          ...action.payload
        }
      };
    case FETCH_INFO_FORM_DATA:
      return {
        ...state,
        infoFormData: {
          ...state.infoFormData,
          ...action.payload
        }
      };
    case CLEAR_ACCOUNT:
      return {
        ...state,
        user: {
          firstName: '',
          lastName: ''
        }
      };
    case CLEAR_INFO:
      return {
        ...state,
        info: {
          name: '',
          address: '',
          phoneNumber: '',
          email: '',
          icon: ''
        }
      };
    case SET_PROFILE_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

export default accountReducer;
