<template>
  <div class="result">
    <van-nav-bar
        left-arrow
        @click-left="$router.back()"
    >
      <template #title>
        <van-cell-group>
          <van-field v-model="$route.params.value" placeholder="输入你想搜索的" disabled @click="$router.replace('/search')" />
        </van-cell-group>
      </template>
    </van-nav-bar>
    <van-list
        v-model="loading"
        :finished="finish"
        finished-text="没有更多了"
        @load="onLoad"
        :error="err"
        error-text="加载出错，点击重新加载"
    >
      <van-cell v-for="item1 in list" :key="item1._id" :title="item1.title" @click="$router.push(`/detail/${item1._id}`)" style="display: flex;flex-direction: column">
        <div v-if="item1.imageSrc.length !== 0" style="display: flex">
          <div v-for="(item2,index2) in item1.imageSrc" :key="index2">
            <van-image
                width="112"
                height="70"
                lazy-load
                :src="item2"
            />
          </div>
        </div>
        <div style="display: flex;justify-content: space-between;font-size: 12px;text-align: left">
          <span style="width: 100px;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;">作者：{{item1.author}}</span>
          <span>{{item1.comment}}评论</span>
          <span>发布日期：{{new Date(item1.time).toLocaleDateString()}}</span>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script lang="ts">
import {search} from "@/api/search";
import {List, Image, Cell, NavBar, CellGroup, Field} from "vant";
import {Component, Vue} from "vue-property-decorator";
import {AxiosError, AxiosResponse} from "axios";

@Component({
  components:{
    ResultView,
    [List.name]:List,
    [Image.name]:Image,
    [Cell.name]:Cell,
    [NavBar.name]:NavBar,
    [CellGroup.name]:CellGroup,
    [Field.name]:Field
  }
})
export default class ResultView extends Vue{
  skip:number = 0
  loading:boolean = false
  finish:boolean = false
  err:boolean = false
  list:Array<{[propName:string]:any}> = []

  mounted(){
    this.loading=true
    this.data1(true)
  }
  onLoad(){
    this.data1(false)
  }
  data1(first:boolean):void{
    if (first) this.skip = 0
    else this.skip+=11
    search({
      url: "/api/search",
      method:"post",
      data:{
        skip:this.skip,
        "key_word":this.$route.params.value
      }
    }).then((res:AxiosResponse):void => {
      this.loading=false
      if (res.data.data.length <= 10) this.finish = true
      if (res.data.code === 0){
        if (first){
          this.list = res.data.data
        }else{
          this.list = [...this.list,...res.data.data]
        }
      }else{
        this.err=true
      }
    }).catch((err:AxiosError):void => {
      this.err=true
    })
  }
}
</script>

<style scoped>

</style>