import {AxiosRequestConfig} from "axios";
import http from "@/utils/request";


//获取评论列表
export const commentList = (config:AxiosRequestConfig) => http.request(config)

//点赞和取消点赞
export const thumbsUp = (config:AxiosRequestConfig) => http.request(config)

//文章收藏和取消收藏
export const collectionUp = (config:AxiosRequestConfig) => http.request(config)

//评论
export const comment1 = (config:AxiosRequestConfig) => http.request(config)

export const getDetail = (config:AxiosRequestConfig) => http.request(config)
