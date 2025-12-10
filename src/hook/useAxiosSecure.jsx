import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
const instance = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut, user } = useAuth();
  useEffect(() => {
    // request interceptor
    const reqInterceptor = instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    // response interceptor
    const resInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const statusCode = error.status;

        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);
  return instance;
};

export default useAxiosSecure;
