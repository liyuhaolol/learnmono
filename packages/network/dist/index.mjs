// src/HttpClient.ts
import axios from "axios";

// src/HttpFilter.ts
var HttpFilterManager = class _HttpFilterManager {
  static _instance = null;
  _filter = {
    canPass() {
      return true;
    }
  };
  constructor() {
  }
  static instance() {
    if (!this._instance) {
      this._instance = new _HttpFilterManager();
    }
    return this._instance;
  }
  setFilter(filter) {
    this._filter = filter;
  }
  getFilter() {
    return this._filter;
  }
};

// src/HttpClient.ts
var timeoutTime = 1e4;
function postRequest(url, params) {
  const { bodyParams, headerParams, asJson = false, useInterceptors = true, printLog = false, timeout = timeoutTime } = params || {};
  return createRequest({
    url,
    method: "post",
    timeout,
    headers: {
      ...headerParams,
      ...asJson ? { "Content-Type": "application/json" } : {}
    },
    ...asJson ? { data: bodyParams } : { params: bodyParams }
  }, useInterceptors, printLog);
}
function getRequest(url, params) {
  const { bodyParams, headerParams, useInterceptors = true, printLog = false, timeout = timeoutTime } = params || {};
  return createRequest({
    url,
    method: "get",
    timeout,
    headers: headerParams,
    params: bodyParams
  }, useInterceptors, printLog);
}
function putRequest(url, params) {
  const { bodyParams, headerParams, asJson = false, useInterceptors = true, printLog = false, timeout = timeoutTime } = params || {};
  return createRequest({
    url,
    method: "put",
    timeout,
    headers: {
      ...headerParams,
      ...asJson ? { "Content-Type": "application/json" } : {}
    },
    ...asJson ? { data: bodyParams } : { params: bodyParams }
  }, useInterceptors, printLog);
}
function deleteRequest(url, params) {
  const { bodyParams, headerParams, asJson = false, useInterceptors = true, printLog = false, timeout = timeoutTime } = params || {};
  return createRequest({
    url,
    method: "delete",
    timeout,
    headers: {
      ...headerParams,
      ...asJson ? { "Content-Type": "application/json" } : {}
    },
    ...asJson ? { data: bodyParams } : { params: bodyParams }
  }, useInterceptors, printLog);
}
function headRequest(url, params) {
  const { headerParams, useInterceptors = true, printLog = false, timeout = timeoutTime } = params || {};
  return createRequest({
    url,
    method: "head",
    timeout,
    headers: headerParams
  }, useInterceptors, printLog);
}
function createRequest(option, useInterceptors, printLog) {
  printRequestData(option.url, option.params, option.data, option.headers, printLog);
  const httpClient = axios.create();
  httpClient.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  httpClient.interceptors.response.use(
    (response) => {
      printResponseData(response.config.url, response.data, response.headers, printLog);
      if (useInterceptors) {
        if (HttpFilterManager.instance().getFilter().canPass(response)) {
          return response;
        } else {
          return new Promise(() => {
          });
        }
      } else {
        return response;
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return httpClient.request(option);
}
function printRequestData(url, params, data, headerParams, printLog) {
  if (printLog) {
    const result = params ? params : data;
    let requestData = {
      request: "\u8BF7\u6C42",
      url,
      headerParams,
      bodyParams: result
    };
    console.log(requestData);
  }
}
function printResponseData(url, body, header, printLog) {
  if (printLog) {
    let responseData = {
      response: "\u54CD\u5E94",
      url,
      header,
      body
    };
    console.log(responseData);
  }
}
export {
  HttpFilterManager,
  deleteRequest,
  getRequest,
  headRequest,
  postRequest,
  putRequest
};
