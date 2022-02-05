import axios, { AxiosError, AxiosResponse } from 'axios';

const apiUrl = process.env.API_URL ?? 'http://localhost:8888';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    accept: 'application/json',
  },
  withCredentials: true, // for cookie
});

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
      .get('/auth/refreshToken') // 임의로 정해둔 새로운 accessToken을 발급받기 위한 컨트롤러
      .then(() => {
        return axiosInstance(err.response?.config!); // 이전 request 재요청
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },
);

export const requestAPI = () => {
  const handleResponse = (response: AxiosResponse) => {
    if (response.status === 401 || response.status === 403) {
      return {
        error: 'bad Response',
      };
    }
    return response.data;
  };

  const request = (method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH') => {
    return (url: string, bodyJson?: any, contentType?: string) => {
      return axiosInstance({
        url,
        method: method,
        data: bodyJson,
        headers: {
          'Content-Type': contentType ?? 'application/json',
        },
      }).then(handleResponse);
    };
  };

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
    patch: request('PATCH'),
  };
};
