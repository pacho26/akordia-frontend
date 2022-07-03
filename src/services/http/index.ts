import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import axios from 'axios';
import type { GenericErrorResponse } from '@/models';
// import {
//   RequestAuthInterceptor,
//   ResponseAuthInterceptor,
// } from '../interceptors';

type RequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig;
type ResponseInterceptor = (response: AxiosResponse) => any;

abstract class HttpClientBase {
  protected readonly _axios: AxiosInstance;

  protected constructor(config?: AxiosRequestConfig) {
    this._axios = axios.create(config);
  }

  protected registerRequestInterceptor = (
    requestInterceptor: RequestInterceptor
  ) => {
    this._axios.interceptors.request.use(requestInterceptor, this._handleError);
  };

  protected registerResponseInterceptor = (
    responseInterceptor: ResponseInterceptor
  ) => {
    this._axios.interceptors.response.use(
      responseInterceptor,
      this._handleError
    );
  };

  protected _handleError = (error: AxiosError<GenericErrorResponse>) => {
    const { request, response, message } = error;
    console.error(error);
    let res = null;
    if (response)
      res =
        response.data?.error ||
        response.data?.message ||
        'Something went wrong';
    else if (request) res = request;
    else if (message) res = message;
    else res = 'Something went wrong';
    return Promise.reject(res);
  };
}

export class HttpClient extends HttpClientBase {
  private static _instance?: HttpClient;

  private constructor() {
    super({
      // TODO: Replace with baseURL: import.meta.env.API_URL_VARIABLE_NAME as string,
      baseURL: 'http://localhost:8081/api' as string,
    });
    // this.registerRequestInterceptor(RequestAuthInterceptor);
    // this.registerResponseInterceptor(ResponseAuthInterceptor);
  }

  static get instance(): AxiosInstance {
    if (!this._instance) this._instance = new HttpClient();

    return this._instance._axios;
  }
}

export const http = HttpClient.instance;
