import {HttpFilter} from "@learnmono/network"
import {AxiosResponse} from "axios";

export class UseFilter implements HttpFilter{
  canPass(response: AxiosResponse): boolean {
    console.log("走了拦截器")
    return true;
  }

}