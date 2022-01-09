import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const apiUrl = process.env.API_URL ?? 'http://localhost:8888';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
  withCredentials: true, // for cookie
});

export const requestAPI = (token?: string | null) => {
  const authHeader = (token: string | null) => {
    if (token !== null && token.length > 0) {
      return {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      };
    } else {
      return {
        Authorization: '',
        accept: 'application/json',
      };
    }
  };

  const handleResponse = (response: AxiosResponse) => {
    if (response.status === 401 || response.status === 403) {
      return {
        error: 'bad Response',
      };
    }
    return response.data;
  };

  const request = (method: 'GET' | 'POST' | 'PUT' | 'DELETE') => {
    return (url: string, bodyJson?: any) => {
      const requestOptions: AxiosRequestConfig = {
        method,
        headers: authHeader(token ?? null),
        withCredentials: true,
      };
      if (requestOptions.headers && bodyJson) {
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.data = JSON.stringify(bodyJson);
      }

      return axios(`${apiUrl}` + url, requestOptions).then(handleResponse);
    };
  };

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
  };
};

//axios refreshtoken controller by intercpetors.
axiosInstance.interceptors.request.use();

// Login -> refresh Token , accessToken to Cookie, but when accessToken expires,
// new request need to be prepared with new accessToken.
// requset -> 401 Unauthorized (accessToken expires) -> request new accessToken -> request previous ones
// with newly earned accessToken

axiosInstance.interceptors.response.use(
  (response) => response,
  async (err: AxiosError) => {
    // 401 Unauthorized가 아닌 다른 에러라면
    if (err.response?.status !== 401) {
      return Promise.resolve(err);
    }
    // 무한 루프 방지 eject
    axiosInstance.interceptors.response.eject(0);
    return axiosInstance
      .get('/refresh') // 임의로 정해둔 새로운 accessToken을 발급받기 위한 컨트롤러
      .then(() => {
        return axiosInstance(err.response?.config!); // 이전 request 재요청
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },
);
