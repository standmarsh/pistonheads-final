import axios from "axios";
import store from "../store";
import { LOGOUT, CLEAR_PROFILE } from "../actions/types";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/*

intercepting any error messages from the api and checking if the token
is no longer valid
so if the token is expired, 
logout the user if the token has expired

*/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.data.msg === "Token is not valid") {
      store.dispatch({ type: LOGOUT });
      store.dispatch({ type: CLEAR_PROFILE });
    }
    return Promise.reject(err);
  }
);

export default api;