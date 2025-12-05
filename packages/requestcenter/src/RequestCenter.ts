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

export function getAI(){
  return postRequest(
    "http://testaiapi.newszu.com/aiapi/unification",
    {
      printLog:true,
      bodyParams:{
        aiApiType:2,
        channelCode:"tx_newszu_aiAssistant",
        query:"在中国人民隆重纪念抗日战争胜利80周年之际，中国驻法国大使邓励接受书面采访，回顾了中国人民伟大的抗战精神，提出应在国际上推动更多学术研究，还原中国的历史性贡献和中国人民的巨大牺牲。他指出中法应携手合作，践行多边主义，坚决维护战后国际秩序。他强调中国将高举人类命运共同体旗帜，坚持走和平发展道路。他还特别谈及旅法华侨华人对全民族抗战的贡献，应该永远铭记。",
        userId:"1122334",
        userName:"lx",
        platform:"newszu",
        operationName:"AI助手",
        siteId:"1",
        input:"{\"type\": \"1\"}",
        isMemory:true,
        responseMode:"streaming",
        groupId:"",
        files:"[    {        \"type\": \"image\",        \"transfer_method\": \"remote_url\",        \"url\": \"https://www.oushinet.com/image/2025-05-29/thumb/1377707574526349312.jpg\"    },    {        \"type\": \"image\",        \"transfer_method\": \"remote_url\",        \"url\": \"https://www.oushinet.com/image/2025-05-29/thumb/1377707574526349312.jpg\"    }]"
      }
    }
  )

}