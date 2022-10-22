import {AxiosPromise, AxiosRequestConfig} from "axios";
import http from "@/utils/request";

//获取token
export const getToken = (config:AxiosRequestConfig):AxiosPromise => http.request(config)

//上传文件
export const uploader = (config:AxiosRequestConfig):AxiosPromise => http.request(config)