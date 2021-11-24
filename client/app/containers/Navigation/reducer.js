/*
 *
 * Navigation reducer
 *
 */

import {
  SHOW_BRAND,
  HIDE_BRAND,
  SHOW_INTRODUCTION,
  HIDE_INTRODUCTION,
  SEARCH_CHANGE,
  SUGGESTIONS_FETCH_REQUEST,
  SUGGESTIONS_CLEAR_REQUEST
} from './constants';

const initialState = {
  isMenuOpen: false,
  isCartOpen: false,
  isBrandOpen: false,
  isIntroductionOpen: false,
  searchValue: '',
  searchSuggestions: []
};

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_INTRODUCTION:
      return {
        ...state,
        isIntroductionOpen: true
      };
    case HIDE_INTRODUCTION:
      return {
        ...state,
        isIntroductionOpen: false
      };
    case SHOW_BRAND:
      return {
        ...state,
        isBrandOpen: true
      };
    case HIDE_BRAND:
      return {
        ...state,
        isBrandOpen: false
      };
    case SEARCH_CHANGE:
      return {
        ...state,
        searchValue: action.payload
      };
    case SUGGESTIONS_FETCH_REQUEST:
      return {
        ...state,
        searchSuggestions: action.payload
      };
    case SUGGESTIONS_CLEAR_REQUEST:
      return {
        ...state,
        searchSuggestions: action.payload
      };
    default:
      return state;
  }
};

export default navigationReducer;
