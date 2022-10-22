import {getUserInfo} from "@/api/user";
import router from "@/router";
import {Toast} from "vant";
import store from "@/store";

export const init = ():Promise<string> => {
    return new Promise((resolve, reject) => {
        Toast.loading("加载中")
        getUserInfo({
            url: "/user/getuserInfo",
            method:"post",
            data: {
                token: localStorage.getItem("token")
            }
        }).then(res => {
            Toast.clear()
            if (res.data.code === 0){
                store.commit("user/changeUserInfo",res.data.userInfo)
                store.commit("user/changeUid",res.data.uid)
                store.commit("user/changeToken",localStorage.getItem("token"))
            }else{
                router.replace("/login").then((res):void => {
                    Toast.fail("请重新登录！")
                })
            }
            resolve("success")
        }).catch((err):void => {
            // Toast.fail("请重新登录！")
            router.replace("/login").then((res):void => {
                Toast.fail("请重新登录！")
            })
            reject("fail")
        })
    })

}