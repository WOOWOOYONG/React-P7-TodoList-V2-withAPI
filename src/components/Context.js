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
