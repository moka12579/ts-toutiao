import http from "@/utils/request";
import {AxiosRequestConfig} from "axios";

//获取用户信息
export const getUserInfo = (config:AxiosRequestConfig) => http.request(config)

//登录
export const login = (config:AxiosRequestConfig) => http.request(config)

export const startList = (config:AxiosRequestConfig) => http.request(config)