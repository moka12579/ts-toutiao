import Vue from 'vue'
import Vuex from 'vuex'
import {
  CHANGE_LOADING,
  GET_LOADING,
  GET_USER_INFO,
  CHANGE_ERR,
  GET_ERR,
  COMMENT_CHANGE_LOADING, COMMENT_CHANGE_FINISHED, COMMENT_CHANGE_ERR,
} from "@/store/mutation-types";
import {init} from "@/utils/init";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    done:false,
    token:localStorage.getItem("token"),
    showPopup:false,
    showShare:false,
    showReplyComment:false,
    list:[],
    articleObj:{},
    loading:false,
    active:0,
    err:false,
    uid:""
  },
  getters: {
    [GET_LOADING](state:any):boolean{
      return state.loading
    },
    [GET_ERR](state:any):boolean{
      return state.err
    }
  },
  mutations: {
    [CHANGE_LOADING](state:any,status:boolean):void{
      state.loading = status
    },
    [CHANGE_ERR](state:any,status:boolean):void{
      state.err = status
    },
    changeActive(state:any,i:number):void{
      state.active = i
    }
  },
  actions: {
  },
  modules: {
    user:{
      namespaced:true,
      state:() =>({
        token:"",
        user:{},
        uid:""
      }),
      mutations:{
        [GET_USER_INFO](state:any):void{
          init().then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        },
        changeToken(state:any,token:string):void{
          state.token=token
        },
        changeUserInfo(state:any,info:{[propName:string]:any}):void{
          state.user = info
        },
        changeUid(state:any,uid:string):void{
          state.uid = uid
        }
      }
    },
    comment:{
      namespaced:true,
      state:() => ({
        commentLoading:false,
        commentFinished:false,
        commentErr:false,
        showPopup:false
      }),
      mutations:{
        [COMMENT_CHANGE_LOADING](state:any,status:boolean):void{
          state.commentLoading = status
        },
        [COMMENT_CHANGE_FINISHED](state:any,status:boolean):void{
          state.commentFinished = status
        },
        [COMMENT_CHANGE_ERR](state:any,status:boolean):void{
          state.commentErr = status
        },
        changeShowPopup(state:any,status:boolean):void{
          state.showPopup = status
        }
      }
    },
    reply:{
      namespaced:true,
      state:() => ({
        replyLoading:false,
        replyErr:false,
        replyFinished:false,
        replyComment:false
      }),
      mutations:{
        changeReplyLoading(state:any,status:boolean):void{
          state.replyLoading = status
        },
        changeReplyErr(state:any,status:boolean):void{
          state.replyErr = status
        },
        changeReplyFinished(state:any,status:boolean):void{
          state.replyFinished = status
        },
        changeReplyComment(state:any,status:boolean):void{
          state.replyComment = status
        }
      }
    }
  }
})
