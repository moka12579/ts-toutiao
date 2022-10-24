import http from "@/utils/request";
import {AxiosPromise, AxiosRequestConfig} from "axios";

//获取用户信息
export const getUserInfo = (config:AxiosRequestConfig):AxiosPromise => http.request(config)

//登录
export const login = (config:AxiosRequestConfig):AxiosPromise => http.request(config)

export const startList = (config:AxiosRequestConfig):AxiosPromise => http.request(config)

export const deleteArt = (config:AxiosRequestConfig):AxiosPromise => http.request(config)

export const publishHistory = (config:AxiosRequestConfig):AxiosPromise => http.request(config)
export const sendSMS = (config:AxiosRequestConfig):AxiosPromise => http.request(config)
export const register = (config:AxiosRequestConfig):AxiosPromise => http.request(config)
export const forget = (config:AxiosRequestConfig):AxiosPromise => http.request(config)
export const updateInfos = (config:AxiosRequestConfig):AxiosPromise => http.request(config)
export const updatePwd = (config:AxiosRequestConfig):AxiosPromise => http.request(config)