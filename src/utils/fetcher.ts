import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const apiUrl = process.env.API_URL ?? 'http://localhost:8888';

const axiosInstance = axios.create();

// export const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then((res) => res.data);
// export const fetcherWithToken = async (url: string, token: string) =>
//   await axios
//     .get(`${apiUrl}/` + url, {
//       headers: {
//         Authorization: `${token}`,
//         accept: 'application/json',
//       },
//       // withCredentials: true,
//     })
//     .then((res) => res.data)
//     .catch((err) => {
//       if (err) {
//         console.error(err.message);
//       }
//     });

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

  const request = (method: 'GET' | 'POST') => {
    return (url: string, bodyJson?: any) => {
      const requestOptions: AxiosRequestConfig = {
        method,
        headers: authHeader(token ?? null),
        withCredentials: true,
      };
      if (requestOptions.headers && bodyJson && method === 'POST') {
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.data = JSON.stringify(bodyJson);
      }

      return axios(`${apiUrl}` + url, requestOptions).then(handleResponse);
    };
  };

  return {
    get: request('GET'),
    post: request('POST'),
  };
};

//axios refreshtoken controller by intercpetors.
axiosInstance.interceptors.request.use();
