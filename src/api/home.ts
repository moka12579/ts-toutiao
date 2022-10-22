import http from "@/utils/request";
import {AxiosPromise, AxiosRequestConfig} from "axios";

export const cateList = (config:AxiosRequestConfig):AxiosPromise =>  http.request(config)

export const articleList = (config:AxiosRequestConfig):AxiosPromise => http.request(config)