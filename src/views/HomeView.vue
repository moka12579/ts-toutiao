<template>
  <div class="home">
    <van-search disabled background="#8fc92a" placeholder="搜索你想看到的" @click="$router.push('/search')"/>
    <van-pull-refresh v-model="isLoading">
      <van-tabs v-model="active" animated>
        <van-tab :title="item.name" v-for="item in list" :key="item._id">
          <ListItem
              :articleList="articleList"
              :finish="finish"
              :on-load="onLoad"/>
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
    <TabBar :active="0"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import {articleList, cateList} from '@/api/home';
import {PullRefresh, Search, Tab, Tabs, Toast} from 'vant';
import TabBar from "@/components/TabBar.vue"
import ListItem from "@/components/ListItem.vue"
import {Mutation} from "vuex-class";

@Component({
  components: {
    HomeView,
    TabBar,
    ListItem,
    [Tabs.name]:Tabs,
    [Search.name]:Search,
    [PullRefresh.name]:PullRefresh,
    [Tab.name]:Tab
  }
})
export default class HomeView extends Vue {

  @Mutation("CHANGE_LOADING") private changeLoading!:(value:boolean)=>void
  @Mutation("CHANGE_ERR") private changeErr!:(value:boolean)=>void

  list: Array<Object> = []
  active: number = 0
  articleList: Array<Object> = []
  skip: number = 0
  finish: boolean = false
  isLoading: boolean = false
  cate_id: string = "609e99e0f2e56f000175151f"

  mounted():void{
    cateList({
      url:"/api/get_cate_list",
      method:"get"
    }).then((res):void => {
      if (res.data.code === 0){
        this.list=res.data.data
        this.data1(true)
      }else{
        Toast.fail("请求出错！")
      }
    }).catch(err => {
      Toast.fail("请求出错！")
    })
  }
  onLoad():void{
    this.data1(false)
    this.changeLoading(true)
    this.finish=false
  }
  data1(first:boolean):void{
    if (first) this.skip=0
    else this.skip+=11
    articleList({
      url:"/api/get_article_list",
      method:"post",
      data:{
        cate_id:this.cate_id,
        skip:this.skip
      }
    }).then((res):void => {
      this.changeLoading(false)
      if (res.data.code === 0){
        if (first)
         this.articleList = res.data.data
        else{
          if (res.data.data.length < 10) this.finish=true
          this.articleList = [...this.articleList,...res.data.data]
        }
      }else{
        this.changeLoading(false)
        Toast.fail("请求出错！")
        this.changeErr(true)
      }
    }).catch((err):void => {
      this.changeErr(true)
      Toast.fail("请求出错！")
    })
  }

  @Watch('active')
  handleActive(val: number) {
    this.cate_id = (<{[propName:string]:any}>this.list[val])._id
    this.articleList = []
    this.changeLoading(true)
    this.data1(true)
    // console.log(this.list[val])
  }

}

</script>
