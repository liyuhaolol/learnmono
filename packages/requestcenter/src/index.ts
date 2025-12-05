import {getForum,getVersion,getAI} from "./RequestCenter";
import {HttpFilterManager} from "@learnmono/network";
import {UseFilter} from "./UseFilter";

HttpFilterManager.instance().setFilter(new UseFilter())

export {
  getForum,
  getVersion,
  getAI
}