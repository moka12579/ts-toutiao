<template>
  <div>
    <van-nav-bar
        right-text="搜索"
        left-arrow
        @click-left="$router.back()"
        @click-right="search"
    >
      <template #title>
        <van-cell-group>
          <van-field v-model="searchValue" placeholder="输入你想搜索的" />
        </van-cell-group>
      </template>
    </van-nav-bar>
    <div class="hot">
      <div>
        猜你想搜
      </div>
      <hr>
      <ul>
        <li v-for="item in list" :key="item.id">
          {{item.word}}
        </li>
      </ul>
    </div>
    <div class="history">
      <div>
        搜索历史
      </div>
      <hr>
      <ul>
        <li v-for="item in historyList" :key="item.id" @click="useHistory(item)" class="item" style="width: fit-content">
          <span style="width: fit-content">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {Cell, CellGroup, Field, NavBar, Toast} from "vant";
import axios from "axios";
import router from "@/router";
import {nanoid} from "nanoid";
import {Component, Vue} from "vue-property-decorator";

@Component({
  components:{
    SearchView,
    [NavBar.name]:NavBar,
    [Cell.name]:Cell,
    [Field.name]:Field,
    [CellGroup.name]:CellGroup,
  }
})
export default class SearchView extends Vue{
  searchValue:string = ""
  list:Array< {[propName:string]:any} > = []
  historyList:Array< {[propName:string]:any} > = JSON.parse(<string>localStorage.getItem("history"))

  mounted(){
    axios.get("https://so.toutiao.com/search/suggest/initial_page/?aid=1455")
        .then(res => {
          this.list = res.data.data.suggest_word_list
        })
  }

  search():void{
    let value:string=this.searchValue.trim()
    if (value === '') {
      Toast.fail("请先输入文字")
      return
    }
    let arr:Array< {[propName:string]:any} > | null = JSON.parse(<string>localStorage.getItem("history"))
    if (arr === null) arr=[]
    if (arr.length === 10){
      arr.pop()
    }
    let obj={
      id:nanoid(),
      name:value
    }
    if (arr.findIndex((v:{[propName:string]:any}):boolean =>v.name===value) === -1) arr.unshift(obj)
    localStorage.setItem("history",JSON.stringify(arr))
    router.push(`/result/${value}`)
  }
  useHistory(item:{[propName:string]:any}):void{
    router.push(`/result/${item.name}`)
  }
}
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar__title{
  border-radius: 30px;
  border: 1px solid #f0f0f0;
  height: 20px;
  width: 50%;
  .van-cell{
    padding-top: 0;
    padding-bottom: 0;
  }
  .van-field__control{
    line-height: 20px;
  }
}
.hot,.history{
  padding: 0 10px;
  margin-top: 16px;
  ul{
    display: flex;
    flex-wrap: wrap;
  }
  li{
    font-size: 14px;
    width: 50%;
    margin-top: 10px;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
.item{
  background: #f0f0f0;
  border-radius: 8vw;
  border: 1px solid #f2f2f2;
  margin-left: 16px;
}
</style>