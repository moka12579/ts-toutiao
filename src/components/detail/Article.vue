<template>
  <div>
    <van-nav-bar
        :title="title"
        left-arrow
        @click-left="$router.back()"
    />
    <h1 style="padding: 10px;word-break:break-all;">{{articleObj.title}}</h1>
    <div style="padding: 10px;display: flex;justify-content: space-between">
      <div style="display: flex">
        <img :src="articleObj.avatar" alt="" style="width: 37px;border-radius: 50%;margin-right: 8px">
        <div style="display: flex;flex-direction: column">
          <h4 style="margin: 0">{{articleObj.nickname}}</h4>
          <span>{{new Date(articleObj.time).toLocaleDateString()}}</span>
        </div>
      </div>
      <van-button type="default">关注</van-button>
    </div>
    <div style="padding: 10px;overflow: hidden;text-overflow:ellipsis;height: fit-content;white-space:pre-wrap;word-break:break-all;">
      {{articleObj.content}}
    </div>
    <div v-for="(item,index) in articleObj.imageSrc" :key="index">
      <van-image
          fit="contain"
          :src="item"
          class="image"
      />
    </div>
    <hr>
    <div style="display: flex;align-items: center;justify-content: space-between;padding: 10px">
      <h3>精彩评论</h3>
      <div style="color: #a19e9e;font-size: 14px">
        <span>{{articleObj.like}} 赞</span> | <span>{{articleObj.fav}} 收藏</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {NavBar, Image, Button} from "vant";
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
  components:{
    Article,
    [NavBar.name]:NavBar,
    [Image.name]:Image,
    [Button.name]:Button
  }
})
export default class Article extends Vue{
  @Prop() private title!:string
  @Prop() private articleObj!:{[propName:string]:any}
}

</script>

<style scoped>

</style>