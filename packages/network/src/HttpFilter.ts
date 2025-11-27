import type {AxiosResponse} from "axios";

//拦截器接口
export interface HttpFilter {
  canPass(response: AxiosResponse): boolean
}

//拦截器单例管理
export class HttpFilterManager {
  private static _instance: HttpFilterManager | null = null;

  private _filter: HttpFilter = {
    canPass() {
      return true;
    }
  };

  private constructor() {}

  static instance() {
    if (!this._instance) {
      this._instance = new HttpFilterManager();
    }
    return this._instance;
  }

  setFilter(filter: HttpFilter) {
    this._filter = filter;
  }

  getFilter(): HttpFilter {
    return this._filter;
  }
}