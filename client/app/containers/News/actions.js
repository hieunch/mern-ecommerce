/*
 *
 * News actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

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

import handleError from '../../utils/error';
import {
  formatSelectOptions,
  unformatSelectOptions
} from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';

export const changeNews = (name, value) => {
  let formData = {};
  formData[name] = value;
  return {
    type: CHANGE_NEWS,
    payload: formData
  };
};

export const editNews = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: EDIT_NEWS,
    payload: formData
  };
};


// fetch news api
export const fetchNewsList = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_NEWS_LOADING, payload: true });
      const response = await axios.get(`/api/news`);

      dispatch({
        type: FETCH_NEWS_LIST,
        payload: response.data.news
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_NEWS_LOADING, payload: false });
    }
  };
};

// fetch news api
export const fetchNews = id => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_NEWS_LOADING, payload: true });
      const response = await axios.get(`/api/news/${id}`);

      const news = response.data.news;

      dispatch({
        type: FETCH_NEWS,
        payload: news
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_NEWS_LOADING, payload: false });
    }
  };
};

// add news api
export const addNews = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_NEWS_LOADING, payload: true });
      const rules = {
        title: 'required',
        content: 'required'
      };

      const news = getState().news.newsFormData;

      const { isValid, errors } = allFieldsValidation(news, rules, {
        'required.title': 'Tiêu đề không được bỏ trống.',
        'required.content': 'Nội dung không được bỏ trống'
      });

      if (!isValid) {
        return dispatch({ type: SET_NEWS_FORM_ERRORS, payload: errors });
      }
      const formData = new FormData();
      for (var key in news) {
        if (news.hasOwnProperty(key)) {
          formData.append(key, news[key]);
        }
      }

      let news_id = Date.now() + Math.random();
      let newsData = {...news, id: news_id};
      formData.append("id", news_id);

      const response = await axios.post(`/api/news/add`, newsData);//formData, {
        // headers: { 'Content-Type': 'multipart/form-data' }
      // });
      
    // const response = await axios.post(`/api/news/add`, fd, {
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //   });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_NEWS,
          payload: response.data.news
        });
        dispatch(resetNews());
        dispatch(goBack());
      }

      console.log(response.data.error);
    } catch (error) {
      console.log(error);
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_NEWS_LOADING, payload: false });
    }
  };
};

// update News api
export const updateNews = () => {
  return async (dispatch, getState) => {
    try {
      console.log('updateNews');
      dispatch({ type: SET_NEWS_LOADING, payload: true });
      const rules = {
        title: 'required',
        content: 'required'
      };

      const news = getState().news.news;

      const { isValid, errors } = allFieldsValidation(news, rules, {
        'required.title': 'Tiêu đề không được bỏ trống.',
        'required.content': 'Nội dung không được bỏ trống'
      });

      if (!isValid) {
        return dispatch({
          type: SET_NEWS_FORM_EDIT_ERRORS,
          payload: errors
        });
      }

      const response = await axios.put(`/api/news/${news._id}`, {
        news
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));

        //dispatch(goBack());
      }
    } catch (error) {
      console.log(error);
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_NEWS_LOADING, payload: false });
    }
  };
};

// delete news api
export const deleteNews = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/news/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_NEWS,
          payload: id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const resetNews = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_NEWS });
  };
};

// fetch store products by filterNews api
export const filterNews = (n, v) => {
  console.log("filterNews");
  return async (dispatch, getState) => {
    try {
      // const s = getState().news.pageInfo;

      dispatch({ type: SET_NEWS_LOADING, payload: true });

      const response = await axios.post(`/api/news/list`, {pageNumber: v});

      dispatch({
        type: SET_PAGE_INFO,
        payload: {
          pages: response.data.pages,
          pageNumber: response.data.page,
          totalNews: response.data.totalNews
        }
      });
      dispatch({
        type: FETCH_NEWS_LIST_INRANGE,
        payload: response.data.listNews
      });
    } catch (error) {
      console.log(error);
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_NEWS_LOADING, payload: false });
    }
  };
};

// fetch store product api
export const fetchNewsListBySlug = slug => {
  return async (dispatch, getState) => {
    console.log("fetchNewsListBySlug");
    dispatch({ type: SET_NEWS_LOADING, payload: true });

    try {
      const response = await axios.get(`/api/news/item/${slug}`);

      dispatch({
        type: FETCH_NEWS_LIST_BY_SLUG,
        payload: response.data.news
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_NEWS_LOADING, payload: false });
    }
  };
};