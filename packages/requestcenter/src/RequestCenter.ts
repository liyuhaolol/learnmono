import {getRequest,postRequest} from "@learnmono/network"

//请求栏目列表页
export function getForum(id:number){
  return getRequest(
    `http://10.8.3.66:8080/bbs/getForum`,
    {
      bodyParams:{
        parentid:id,
        pageNum:1,
        pageSize:99999
      },
      printLog:true
    }
  )
}
//请求版本信息
export function getVersion(){
  return postRequest(
    "https://api.offshoremedia.net/ums/app/versionInfo",
    {
      bodyParams:{
        appType:1,
        siteId:"924958456908492800"
      },
      printLog:true
    }
  )
}