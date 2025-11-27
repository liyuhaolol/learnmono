//npm install axios
import axios, {AxiosError, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig} from "axios";
import {HttpFilterManager} from "./HttpFilter";

const timeoutTime = 10000//10秒

//post请求
export function postRequest(url:string,params?:requestParams){
  const { bodyParams, headerParams, asJson = false, useInterceptors = true ,printLog = false,timeout = timeoutTime} = params || {};
  return createRequest({
    url: url,
    method: 'post',
    timeout: timeout,
    headers: {
      ...headerParams,
      ...(asJson ? { 'Content-Type': 'application/json' } : {})
    },
    ...(asJson ? { data: bodyParams } : { params: bodyParams })
  }, useInterceptors,printLog)
}

//get请求
export function getRequest(url:string, params?:requestParams):Promise<AxiosResponse>{
  const { bodyParams, headerParams, useInterceptors = true ,printLog = false,timeout = timeoutTime} = params || {};
  return createRequest({
    url:url,
    method:'get',
    timeout:timeout,
    headers:headerParams,
    params:bodyParams,
  },useInterceptors,printLog)
}

//创建请求
function createRequest(option:AxiosRequestConfig,useInterceptors:boolean,printLog:boolean):Promise<AxiosResponse>{
  //打印请求日志,url不可能为空，除非故意
  printRequestData(option.url!!,option.params,option.data,option.headers,printLog)
  const httpClient = axios.create()
  httpClient.interceptors.request.use(
    (config:InternalAxiosRequestConfig)=>{
      return config
    },
    (error:AxiosError)=>{
      return Promise.reject(error)
    })
  httpClient.interceptors.response.use((response:AxiosResponse)=> {
      //打印response日志
      printResponseData(response.config.url,response.data,response.headers,printLog)
      if (useInterceptors) {
        if (HttpFilterManager.instance().getFilter().canPass(response)) {
          return response
        }else{
          return new Promise(() => {})
        }
      }else {
        return response
      }
    },
    (error:AxiosError)=> {
      return Promise.reject(error)
    })
  return httpClient.request(option)
}

//是否在console上打印请求结果，仅在Dev环境下生效，懒，不想去翻Network找请求响应
function printRequestData(url:string, params:any, data:any, headerParams:any,printLog:boolean) {
  if (printLog) {
    const result = params ? params : data;
    let requestData = {
      request: "请求",
      url: url,
      headerParams: headerParams,
      bodyParams: result
    };

    console.log(requestData);
  }
}

//是否在console上打印响应结果，仅在Dev环境下生效，懒，不想去翻Network找请求响应
function printResponseData(url:any,body:any, header:any,printLog:boolean){
  if (printLog){
    let responseData = {
      response:"响应",
      url: url,
      header:header,
      body:body
    }

    console.log(responseData)
  }
}

interface requestParams {
  bodyParams?:Record<string,any>|undefined,//body参数键值对，对HEAD请求不生效 默认值:undefined
  headerParams?:Record<string,string>|undefined,//head参数键值对 默认值:undefined
  useInterceptors?:boolean,//是否将网络响应结果优先统一通过拦截器逻辑后判断是否拦截响应的向下传递 默认值:true
  printLog?:boolean,//是否打印请求日志到console上面，默认值为:false
  asJson?:boolean,//是否作为json格式发送数据，对GET，HEAD请求不生效 默认值:false
  timeout?:number//接口等待超时时间，单位毫秒 默认值:10000毫秒
}