import { AxiosResponse } from 'axios';

declare function postRequest(url: string, params?: requestParams): Promise<AxiosResponse<any, any, {}>>;
declare function getRequest(url: string, params?: requestParams): Promise<AxiosResponse>;
declare function putRequest(url: string, params?: requestParams): Promise<AxiosResponse<any, any, {}>>;
declare function deleteRequest(url: string, params?: requestParams): Promise<AxiosResponse<any, any, {}>>;
declare function headRequest(url: string, params?: requestParams): Promise<AxiosResponse>;
interface requestParams {
    bodyParams?: Record<string, any> | undefined;
    headerParams?: Record<string, string> | undefined;
    useInterceptors?: boolean;
    printLog?: boolean;
    asJson?: boolean;
    timeout?: number;
}

interface HttpFilter {
    canPass(response: AxiosResponse): boolean;
}
declare class HttpFilterManager {
    private static _instance;
    private _filter;
    private constructor();
    static instance(): HttpFilterManager;
    setFilter(filter: HttpFilter): void;
    getFilter(): HttpFilter;
}

export { type HttpFilter, HttpFilterManager, deleteRequest, getRequest, headRequest, postRequest, putRequest, type requestParams };
