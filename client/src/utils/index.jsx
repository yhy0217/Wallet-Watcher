/** Handle tokens */
import {HOSTNAME, PORT} from '../config';
const localStorageKey = "__auth_provider_token__";
// method for getting local token
export const getToken = () => window.localStorage.getItem(localStorageKey);

// internal method for setting local token
const _storeToken = (user) => {
    window.localStorage.setItem(localStorageKey, user.data || "");
    return user;
};

// method for triggering the login fetch process and get responsed token data
export const login = (data) => {
    return fetch(`http://${HOSTNAME}:${PORT}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      if (response.ok) {
        return _storeToken(await response.json());
      } else {
        throw Promise.reject(await response.json());
      }
    }).catch((err) => {
      console.log(err);
    });
};

// method for triggering the sign up fetch process and get responsed token data
export const signup = (data) => {
  return fetch(`http://${HOSTNAME}:${PORT}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return _storeToken(await response.json());
    } else {
      throw Promise.reject(await response.json());
    }
  }).catch((err) => {
    console.log(err);
  });
};