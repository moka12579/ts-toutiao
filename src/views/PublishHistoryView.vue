<template>
  <div>
    <van-nav-bar
        :title="title"
        left-arrow
        class="navBar"
        @click-left="$router.back()"
    />
    <van-pull-refresh v-model="isLoading"  @refresh="onRefresh">
      <ListItem
       :article-list="list"
       :finish="finish"
       :is-loading="isLoading"
       :err="err"
       :delete-article="deleteArticle"
       :on-load="onLoad"/>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import {Cell, List, PullRefresh, Image, NavBar, Toast, Dialog} from "vant";
import {deleteArt, publishHistory} from "@/api/user";
import store from "@/store";
import ListItem from "@/components/ListItem.vue";
import {Component, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";
import {AxiosError, AxiosResponse} from "axios";
const user = namespace("user")
@Component({
  components:{
    PublishHistoryView,
    [PullRefresh.name]:PullRefresh,
    [List.name]:List,
    [Cell.name]:Cell,
    [Image.name]:Image,
    [NavBar.name]:NavBar,
    ListItem
  }
})
export default class PublishHistoryView extends Vue{
  @user.State("uid")
  private uid!:string
  isLoading:boolean = false
  loading:boolean = false
  finish:boolean = false
  err:boolean = false
  skip:number = 0
  list:Array<{ [propName:string]:any }> = []
  title:string = this.$route.path === "/browseHistory" ? "浏览历史" : "已发布"

  mounted():void{
    store.state.loading=true
    this.data1(true)
  }
  onRefresh():void{
    this.data1(true)
    this.list = []
    store.state.loading = true
    this.err = false
  }
  data1(first:boolean):void{
    if (first) this.skip = 0
    else this.skip+=11
    let url=this.$route.path === "/browseHistory" ? "/api/get_history_list" : "/api/get_user_article_list"
    publishHistory({
      url,
      method:"post",
      data:{
        uid:this.uid,
        skip:this.skip
      }
    }).then((res:AxiosResponse):void => {
      this.isLoading=false
      store.state.loading=false
      if (res.data.data.length <= 10) this.finish=true
      if (res.data.code === 0){
        this.list = res.data.data
      }else{
        this.list = [...this.list,...res.data.data]
      }
    }).catch((err:AxiosError):void => {
      this.isLoading=false
      store.state.loading=false
      store.state.err = true
    })
  }
  deleteArticle(item:{[propName:string]:any}){
    Dialog.confirm({
      title: '确定要删除吗？',
    }).then(() => {
      deleteArt({
        url:"/api/del_user_article",
        method:"post",
        data:{
          _id:item._id,
          uid:this.uid
        }
      }).then((res:AxiosResponse):void => {
        if (res.data.code === 0){
          Toast.success(res.data.msg)
          this.list=[]
          store.state.loading=true
          this.finish=false
          this.data1(true)
        }else{
          Toast.fail(res.data.msg)
        }
      }).catch((err:AxiosError):void => {
        Toast.fail("出错了！！！")
      })
    })
  }
  onLoad():void{
    this.data1(false)
  }
}
</script>

<style lang="scss" scoped>
.jus{
  justify-content: space-between;
}
.flex{
  flex-direction: column;
}
</style>