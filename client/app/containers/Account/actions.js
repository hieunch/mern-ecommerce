/*
 *
 * Account actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';
import serverUrl from '../../utils/constant';

import {
  ACCOUNT_CHANGE,
  INFO_CHANGE,
  FETCH_PROFILE,
  FETCH_INFO,
  FETCH_INFO_FORM_DATA,
  CLEAR_ACCOUNT,
  CLEAR_INFO,
  SET_PROFILE_LOADING
} from './constants';
import handleError from '../../utils/error';

export const accountChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: ACCOUNT_CHANGE,
    payload: formData
  };
};

export const infoChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: INFO_CHANGE,
    payload: formData
  };
};

export const clearAccount = () => {
  return {
    type: CLEAR_ACCOUNT
  };
};


export const setProfileLoading = value => {
  return {
    type: SET_PROFILE_LOADING,
    payload: value
  };
};

export const fetchProfile = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setProfileLoading(true));
      const response = await axios.get(serverUrl + `/api/user`);

      dispatch({ type: FETCH_PROFILE, payload: response.data.user });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setProfileLoading(false));
    }
  };
};

export const fetchInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setProfileLoading(true));
      const response = await axios.get(serverUrl + `/api/info`);

      dispatch({ type: FETCH_INFO, payload: response.data.info });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setProfileLoading(false));
    }
  };
};

export const fetchInfoFormData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setProfileLoading(true));
      const response = await axios.get(serverUrl + `/api/info`);

      dispatch({ type: FETCH_INFO_FORM_DATA, payload: response.data.info });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setProfileLoading(false));
    }
  };
};

export const updateProfile = () => {
  return async (dispatch, getState) => {
    const profile = getState().account.user;

    try {
      const response = await axios.put(`/api/user`, {
        profile
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      dispatch({ type: FETCH_PROFILE, payload: response.data.user });

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};


export const updateInfo = () => {
  return async (dispatch, getState) => {
    dispatch(setProfileLoading(true));
    const info = getState().account.infoFormData;

    try {
      const response = await axios.put(`/api/info`, {
        info
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      dispatch({ type: FETCH_INFO, payload: response.data.info });

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setProfileLoading(false));
    }
  };
};
