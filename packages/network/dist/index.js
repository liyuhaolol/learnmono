"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  HttpFilterManager: () => HttpFilterManager,
  deleteRequest: () => deleteRequest,
  getRequest: () => getRequest,
  headRequest: () => headRequest,
  postRequest: () => postRequest,
  putRequest: () => putRequest
});
module.exports = __toCommonJS(index_exports);

// src/HttpClient.ts
var import_axios = __toESM(require("axios"));

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
  debugger;
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
  const httpClient = import_axios.default.create();
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HttpFilterManager,
  deleteRequest,
  getRequest,
  headRequest,
  postRequest,
  putRequest
});
