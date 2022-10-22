import {AxiosPromise, AxiosRequestConfig} from "axios";
import http from "@/utils/request";


//获取评论列表
export const commentList = (config:AxiosRequestConfig):AxiosPromise => http.request(config)

//点赞和取消点赞
export const thumbsUp = (config:AxiosRequestConfig):AxiosPromise => http.request(config)

//文章收藏和取消收藏
export const collectionUp = (config:AxiosRequestConfig):AxiosPromise => http.request(config)

//评论
export const comment1 = (config:AxiosRequestConfig):AxiosPromise => http.request(config)

export const getDetail = (config:AxiosRequestConfig):AxiosPromise => http.request(config)

export const publish = (config:AxiosRequestConfig):AxiosPromise => http.request(config)