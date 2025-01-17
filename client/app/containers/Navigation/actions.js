/*
 *
 * Navigation actions
 *
 */

import axios from 'axios';
import serverUrl from '../../utils/constant';
import handleError from '../../utils/error';
import {
  SHOW_INTRODUCTION,
  HIDE_INTRODUCTION,
  SHOW_BRAND,
  HIDE_BRAND,
  SEARCH_CHANGE,
  SUGGESTIONS_FETCH_REQUEST,
  SUGGESTIONS_CLEAR_REQUEST
} from './constants';

export const showIntroduction = () => {
  return {
    type: SHOW_INTRODUCTION
  };
};

export const hideIntroduction = () => {
  return {
    type: HIDE_INTRODUCTION
  };
};

export const showBrand = () => {
  return {
    type: SHOW_BRAND
  };
};

export const hideBrand = () => {
  return {
    type: HIDE_BRAND
  };
};

export const onSearch = v => {
  return {
    type: SEARCH_CHANGE,
    payload: v
  };
};

export const onSuggestionsFetchRequested = value => {
  const inputValue = value.value.trim().toLowerCase();

  return async (dispatch, getState) => {
    try {
      if (inputValue && inputValue.length % 3 === 0) {
        const response = await axios.get(
          `/api/product/list/search/${inputValue}`
        );
        dispatch({
          type: SUGGESTIONS_FETCH_REQUEST,
          payload: response.data.products
        });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const onSuggestionsClearRequested = () => {
  return {
    type: SUGGESTIONS_CLEAR_REQUEST,
    payload: []
  };
};
