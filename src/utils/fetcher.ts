import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const apiUrl = process.env.API_URL ?? 'http://localhost:8888';

const axiosInstance = axios.create();

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
