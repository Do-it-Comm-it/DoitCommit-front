import axios from 'axios';

// fetcher for swr
export const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then((res) => res.data);
export const fetcherWithToken = async (url: string, token: string) => {
  await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    });
};
