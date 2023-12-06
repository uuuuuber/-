import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:7001',
  timeout: 5000, // 超时时间，单位为毫秒
  headers: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json', // 请求头的 Content-Type
  },
  //   withCredentials: true,
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 例如，你可以在请求中添加一些全局的 token 或其他验证信息
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
    return Promise.reject(error);
  }
);

export default instance;
