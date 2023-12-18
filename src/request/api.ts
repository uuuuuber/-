import { message } from 'antd';
import axios, { InternalAxiosRequestConfig } from 'axios';
import history from '../router/history';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:7001',
  timeout: 5000, // 超时时间，单位为毫秒
  withCredentials: true,
});

function getRequestKey(config: InternalAxiosRequestConfig) {
  const { method, url, params, data } = config;
  // axios中取消请求及阻止重复请求的方法
  // 参数相同时阻止重复请求：
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
  // 请求方法相同，参数不同时阻止重复请求
  // return [method, url].join('&');
}

/**
 * @description 添加请求信息 * */
const pendingRequest = new Map();

function addPendingRequest(config: InternalAxiosRequestConfig) {
  // console.log(config.url)
  const requestKey = getRequestKey(config);
  // eslint-disable-next-line no-param-reassign
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel);
      }
    });
}

/**
 * @description 取消重复请求 * */
function removePendingRequest(config: InternalAxiosRequestConfig) {
  const requestKey = getRequestKey(config);
  if (pendingRequest.has(requestKey)) {
    // 如果是重复的请求，则执行对应的cancel函数
    const cancel = pendingRequest.get(requestKey);
    cancel(requestKey);
    // 将前一次重复的请求移除
    pendingRequest.delete(requestKey);
  }
}

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 检查是否存在重复请求，若存在则取消已发的请求
    removePendingRequest(config);
    // 把当前请求信息添加到pendingRequest对象中
    addPendingRequest(config);

    return config;
  },
  error => {
    // 请求错误时做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response;
  },
  error => {
    // 响应错误时做点什么
    if (error.name === 'CanceledError') {
      return;
    }
    if (`${error.code}` === 'ERR_NETWORK') {
      message.error(error.message);
    }
    if (error.response && `${error.response.status}` === '401') {
      const { data } = error.response.data;
      message.error(`${data}`);
      localStorage.removeItem('token');
      localStorage.removeItem('adminData');
      history.push('/login', { from: history.location.pathname });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
    console.error(error);
  }
);

export default instance;
