import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

//Local Storage
export const setLocalUser = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};

export const setLocalToken = (data) => {
  localStorage.setItem("authorization", JSON.stringify(data));
};
export const getLocalUser = () => {
  JSON.parse(localStorage.getItem("user"));
};

export const getLocalToken = () => {
  JSON.parse(localStorage.getItem("authorization"));
};

export const clearLocalUser = () => localStorage.clear();
