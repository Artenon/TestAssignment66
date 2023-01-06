import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://frontappapi.dock7.66bit.ru/api/';

export const createAPI = (): AxiosInstance => {
  return axios.create({
    baseURL: BASE_URL
  });
};
