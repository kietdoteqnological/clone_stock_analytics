import axios from "axios";

export const axiosClient = axios.create({
  // baseURL: process.env.NEXT_APP_API_URL,
  baseURL: "https://www.alphavantage.co/",
});

axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
