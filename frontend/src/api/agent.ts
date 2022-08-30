import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Activity } from '../models/activity';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 400:
        if(error.config.method === 'get' && error.response.data.errors.hasOwnProperty('id')){
          throw error.response.data.errors;
        }
        if(error.response.data.errors){
          const modalStateErrors = [];
          for(const key in error.response.data.errors){
            if (error.response.data.errors[key]){
              modalStateErrors.push(error.response.data.errors[key])
            }
          }
          throw modalStateErrors.flat();
        }else{
          toast.error(error.response.data)
        }
        break;
      case 401:
        toast.error('unauthorized');
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data; //define responseBody that will return date, so we don't need to do that when we send request || with <T> it's made generic so we can specify type when we send request

const requests = {
  //define types of requests and parameters they need
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<Activity[]>('/activities'), // define get request for activities, it will contain list that is function and thanks to things defines above it will return data from request
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post('/activities', activity),
  update: (activity: Activity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
