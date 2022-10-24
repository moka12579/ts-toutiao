import {AxiosPromise, AxiosRequestConfig} from "axios";
import http from "@/utils/request";

export const search = (config:AxiosRequestConfig):AxiosPromise => http.request(config)