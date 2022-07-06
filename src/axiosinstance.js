import axios from "axios";
import store from "./store";

//const jwtToken = store.getState().decodedtoken ? store.getState().decodedtoken : null
/**
 * axios is used to call services we are declering baseurl, timeout and headers seting as common in axiosinstance.
 * we can call axiosinstance insted of axios for every api call.
 * baser url process.env.REACT_APP_API_BASE_URL is from .env.development.
 */
const axiosinstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 1000,

  headers: 
  {'Content-Type': 'application/json'}
});

export default axiosinstance;