/*
 *
 * Product actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';
import serverUrl from '../../utils/constant';

import {
  FETCH_PRODUCTS,
  FETCH_STORE_PRODUCTS,
  FETCH_PRODUCT,
  FETCH_STORE_PRODUCT,
  PRODUCT_CHANGE,
  PRODUCT_EDIT_CHANGE,
  PRODUCT_SHOP_CHANGE,
  SET_PRODUCT_FORM_ERRORS,
  SET_PRODUCT_FORM_EDIT_ERRORS,
  RESET_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  FETCH_PRODUCTS_SELECT,
  SET_PRODUCTS_LOADING,
  SET_ADVANCED_FILTERS,
  RESET_ADVANCED_FILTERS,
  ADD_PRODUCT_IMAGE,
  CHANGE_SHOW_URL
} from './constants';

import handleError from '../../utils/error';
import {
  formatSelectOptions,
  unformatSelectOptions
} from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';

export const productChange = (name, value) => {
  let formData = {};
  formData[name] = value;
  return {
    type: PRODUCT_CHANGE,
    payload: formData
  };
};

export const changeShowUrl = (imageUrl) => {
  return {
    type: CHANGE_SHOW_URL,
    payload: {imageUrl}
  };
};

export const addProductImage = (name, value) => {
  return {
    type: ADD_PRODUCT_IMAGE,
    payload: value
  };
};

export const productEditChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: PRODUCT_EDIT_CHANGE,
    payload: formData
  };
};

export const productShopChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: PRODUCT_SHOP_CHANGE,
    payload: formData
  };
};

export const resetProduct = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_PRODUCT });
  };
};


// fetch products api
export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: true });
      const response = await axios.get(serverUrl + `/api/product`);

      dispatch({
        type: FETCH_PRODUCTS,
        payload: response.data.products
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

// fetch store products by filterProducts api
export const filterProducts = (n, v) => {

  return async (dispatch, getState) => {
    try {
      n === undefined ? dispatch({ type: RESET_ADVANCED_FILTERS }):'';

      const s = getState().product.advancedFilters;
      let payload = productsFilterOrganizer(n, v, s);

      dispatch({ type: SET_ADVANCED_FILTERS, payload })
      dispatch({ type: SET_PRODUCTS_LOADING, payload: true });

      const sortOrder = getSortOrder(payload.order);

      payload = { ...payload, sortOrder };

      const response = await axios.post(serverUrl + `/api/product/list`, payload);

      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: Object.assign(payload, {
          pages: response.data.pages,
          pageNumber: response.data.page,
          totalProducts: response.data.totalProducts
        })
      });
      dispatch({
        type: FETCH_STORE_PRODUCTS,
        payload: response.data.products
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

// fetch product api
export const fetchProduct = id => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: true });
      const response = await axios.get(serverUrl + `/api/product/${id}`);

      const inventory = response.data.product.quantity;
      if (response.data.product.brand) {
        response.data.product.brand = formatSelectOptions([
          response.data.product.brand
        ])[0];
      }

      const product = { ...response.data.product, inventory };

      dispatch({
        type: FETCH_PRODUCT,
        payload: product
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

// fetch store product api
export const fetchStoreProduct = slug => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_PRODUCTS_LOADING, payload: true });

    try {
      const response = await axios.get(serverUrl + `/api/product/item/${slug}`);

      const inventory = response.data.product.quantity;
      const product = { ...response.data.product, inventory };

      dispatch({
        type: FETCH_STORE_PRODUCT,
        payload: product
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

export const fetchBrandProducts = slug => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_PRODUCTS_LOADING, payload: true });

    try {
      const response = await axios.get(serverUrl + `/api/product/list/brand/${slug}`);

      const s = getState().product.advancedFilters;
      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: Object.assign(s, {
          pages: response.data.pages,
          pageNumber: response.data.page,
          totalProducts: response.data.totalProducts
        })
      });
      dispatch({
        type: FETCH_STORE_PRODUCTS,
        payload: response.data.products
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

export const fetchProductsSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(serverUrl + `/api/product/list/select`);

      const formattedProducts = formatSelectOptions(response.data.products);

      dispatch({
        type: FETCH_PRODUCTS_SELECT,
        payload: formattedProducts
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// add product api
export const addProduct = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: true });
      const rules = {
        id: 'required',
        name: 'required',
        description: 'required',
        price: 'required|numeric',
        uploadedImages: 'required'
      };

      const product = getState().product.productFormData;
      const user = getState().account.user;

      const newProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        uploadedImages: product.uploadedImages,
        isActive: product.isActive,
        shopeeUrl: product.shopeeUrl,
        lazadaUrl: product.lazadaUrl,
        tikiUrl: product.tikiUrl,
      };

      const { isValid, errors } = allFieldsValidation(newProduct, rules, {
        'required.id': 'Product id is required.',
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        // 'max.description':
        //   'Description may not be greater than 200 characters.',
        'required.price': 'Price is required.',
        'required.uploadedImages': 'Please upload files with jpg, jpeg, png format.'
      });

      if (!isValid) {
        return dispatch({ type: SET_PRODUCT_FORM_ERRORS, payload: errors });
      }
      const formData = new FormData();
      // fd.append("a", "bcd");
      if (newProduct.uploadedImages.length > 0) {
        for (var key in newProduct) {
          if (key === 'uploadedImages') {
            continue;
          }
          if (newProduct.hasOwnProperty(key)) {
            formData.append(key, newProduct[key]);
          }
        }
        for (const single_image of newProduct.uploadedImages) {
          formData.append('uploadedImages', single_image)
        }
      }

      const response = await axios.post(serverUrl + `/api/product/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
    // const response = await axios.post(serverUrl + `/api/product/add`, fd, {
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
          type: ADD_PRODUCT,
          payload: response.data.product
        });
        dispatch(resetProduct());
        dispatch(goBack());
      }

    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

// update Product api
export const updateProduct = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: true });
      const rules = {
        id: 'required',
        name: 'required',
        description: 'required',
        price: 'required|numeric',
      };

      const product = getState().product.product;

      const newProduct = {...product};

      const { isValid, errors } = allFieldsValidation(newProduct, rules, {
        'required.id': 'Product id is required.',
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        // 'max.description':
        //   'Description may not be greater than 200 characters.',
        'required.price': 'Price is required.',
      });

      if (!isValid) {
        return dispatch({
          type: SET_PRODUCT_FORM_EDIT_ERRORS,
          payload: errors
        });
      }

      const response = await axios.put(`/api/product/${product._id}`, {
        product: newProduct
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
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

// activate product api
export const activateProduct = (id, value) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(`/api/product/${id}/active`, {
        product: {
          isActive: value
        }
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// delete product api
export const deleteProduct = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/product/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_PRODUCT,
          payload: id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// TODO: Need improvement
const productsFilterOrganizer = (n, v, s) => {
  switch (n) {
    case 'category':
      return {
        name: s.name,
        category: v,
        brand: s.brand,
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: s.order,
        pageNumber: 1//s.pageNumber
      };
    case 'brand':
      return {
        name: s.name,
        category: s.category,
        brand: v,
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: s.order,
        pageNumber: s.pageNumber
      };
    case 'sorting':
      return {
        name: s.name,
        category: s.category,
        brand: s.brand,
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: v,
        pageNumber: s.pageNumber
      };
    case 'price':
      return {
        name: s.name,
        category: s.category,
        brand: s.brand,
        min: v[0],
        max: v[1],
        rating: s.rating,
        order: s.order,
        pageNumber: s.pageNumber
      };
    case 'rating':
      return {
        name: s.name,
        category: s.category,
        brand: s.brand,
        min: s.min,
        max: s.max,
        rating: v,
        order: s.order,
        pageNumber: s.pageNumber
      };
    case 'pagination':
      return {
        name: s.name,
        category: s.category,
        brand: s.brand,
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: s.order,
        pageNumber: v
      };
    default:
      return {
        name: s.name,
        category: s.category,
        brand: s.brand,
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: s.order,
        pageNumber: s.pageNumber
      };
  }
};

const getSortOrder = value => {
  let sortOrder = {};
  switch (value) {
    case 0:
      sortOrder._id = -1;
      break;
    case 1:
      sortOrder.price = -1;
      break;
    case 2:
      sortOrder.price = 1;
      break;

    default:
      break;
  }

  return sortOrder;
};
