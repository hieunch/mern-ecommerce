/*
 *
 * Product reducer
 *
 */

import {
  FETCH_NEWS_LIST,
  FETCH_NEWS,
  ADD_NEWS,
  CHANGE_NEWS,
  REMOVE_NEWS,
  RESET_NEWS,
  EDIT_NEWS,
  SET_NEWS_LOADING,
  SET_NEWS_FORM_ERRORS,
  SET_PAGE_INFO,
  FETCH_NEWS_LIST_INRANGE,
  FETCH_NEWS_LIST_BY_SLUG,
  SET_NEWS_FORM_EDIT_ERRORS
} from './constants';

const initialState = {
  listNews: [],
  news: {
    _id: ''
  },
  newsFormData: {
    title: '',
    keywords: '',
    content: ''
  },
  isLoading: false,
  formErrors: {},
  editFormErrors: {},
  pageInfo: {
    pageNumber: 1,
    pages: 1,
    totalNews: 0
  },
  newsDisplayed: {}
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS_LIST:
      return {
        ...state,
        listNews: action.payload
      };
    case FETCH_NEWS:
      return {
        ...state,
        news: action.payload,
        editFormErrors: {}
      };
    case SET_NEWS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case ADD_NEWS:
      return {
        ...state,
        listNews: [...state.listNews, action.payload]
      };
    case REMOVE_NEWS:
      const index = state.listNews.findIndex(b => b._id === action.payload);
      return {
        ...state,
        listNews: [
          ...state.listNews.slice(0, index),
          ...state.listNews.slice(index + 1)
        ]
      };
    case CHANGE_NEWS:
      return {
        ...state,
        newsFormData: {
          ...state.newsFormData,
          ...action.payload
        }
      };
    case EDIT_NEWS:
      return {
        ...state,
        news: {
          ...state.news,
          ...action.payload
        }
      };
    case RESET_NEWS:
      return {
        ...state,
        news: {
          _id: ''
        },
        newsFormData: {
          title: '',
          keywords: '',
          content:''
        },
        formErrors: {}
      };
    case SET_NEWS_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case FETCH_NEWS_LIST_INRANGE:
      return {
        ...state,
        listNewsInRange: action.payload
      };
    case SET_PAGE_INFO:
      return {
        ...state,
        pageInfo: {
          ...state.pageInfo,
          ...action.payload
        }
      };
    case FETCH_NEWS_LIST_BY_SLUG:
      return {
        ...state,
        newsDisplayed: action.payload
      };
    case SET_NEWS_FORM_EDIT_ERRORS:
      return {
        ...state,
        editFormErrors: action.payload
      };
    default:
      return state;
  }
};

export default newsReducer;
