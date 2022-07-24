import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { get, isNil, mergeWith } from 'lodash';
import Router from 'next/router';

import { isBrowser, stringifyParams } from 'shared/utils';
import { CookieKey, RouterPath } from 'shared/constant/common';
import { CookiesStorage } from './cookie';
import { API_URL } from './setting';

const customizer = (objValue: any, srcValue: any, key: string) => {
  if (key === 'Accept-Language') {
    return objValue;
  }
  return null;
};

export const generateToken = () => ({
  Authorization: `Bearer ${CookiesStorage.getAccessToken()}`,
  // todo
});

const defaultOptions = {};

function getApi(path: string, options: any = {}, apiURL?: string) {
  return axios.get(`${apiURL || API_URL}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...generateToken(),
      ...options.headers,
    },
  });
}

function postApi(path: string, data: any, options: any = {}) {
  const headerParams = mergeWith(generateToken(), options.headers, customizer);

  return axios.post(`${API_URL}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: headerParams,
  });
}

function putApi(path: string, data: any, options: any = {}) {
  return axios.put(`${API_URL}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function patchApi(path: string, data: any, options: any = {}) {
  return axios.patch(`${API_URL}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function deleteApi(path: string, options: any = {}) {
  return axios.delete(`${API_URL}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function handleErrorStatus(error: any) {
  const status = error?.status || error?.response?.status || null;
  switch (status) {
    case 401:
      CookiesStorage.clearAccessToken();
      if (isBrowser() && get(Router, 'router.route') !== RouterPath.Login) {
        return Router.push(RouterPath.Login);
      }
      return error.response;
    case 200:
    case 201:
    case 204:
    case 400:
    case 422:
      return error;
    default:
      CookiesStorage.setCookieData(CookieKey.networkError, status ? `ERR-0${status}` : 'ERR-ANOTHER');
      return error;
  }
}

axios.interceptors.response.use(
  response => {
    let data = response?.data;
    if (data) {
      data = camelizeKeys(data);
    }
    return handleErrorStatus({ ...response, data });
  },
  error => {
    const errorResponse = error;
    const errorData = errorResponse?.response?.data || {};
    // const errorCode = errorData?.error?.error_id;
    const errorMessageCode = errorData?.error?.message;

    errorResponse.response = {
      ...errorResponse.response,
      data: {
        ...errorData.error,
        errors: errorData?.error?.errors || [],
      },
    };

    if (error?.response?.status === 401 && isBrowser() && get(Router, 'router.route') !== RouterPath.Login) {
      CookiesStorage.clearAccessToken();
      return Router.push(RouterPath.Login);
    }

    return Promise.reject(handleErrorStatus(errorResponse));
  }
);

axios.interceptors.request.use(config => {
  const newConfig = { ...config };

  if (newConfig?.headers?.['Content-Type'] === 'multipart/form-data') return newConfig;

  return newConfig;
});

axios.defaults.paramsSerializer = params =>
  stringifyParams({
    params,
    option: {
      encode: !isNil(params?.tags) || false,
    },
  });

const Api = {
  get: getApi,
  post: postApi,
  put: putApi,
  delete: deleteApi,
  patch: patchApi,
};

export default Api;
