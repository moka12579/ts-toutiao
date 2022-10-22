import http from "@/utils/request";
import {AxiosPromise, AxiosRequestConfig} from "axios";

//获取用户信息
export const getUserInfo = (config:AxiosRequestConfig):AxiosPromise => http.request(config)

//登录
export const login = (config:AxiosRequestConfig):AxiosPromise => http.request(config)

export const startList = (config:AxiosRequestConfig):AxiosPromise => http.request(config)