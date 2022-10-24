<template>
  <div class="banner">
    <div class="up">
      <div style="display: flex;align-items: center">
        <img :src="!user.avatar ? 'http://toutiao.longxiaokj.com/1635908337872_9r24h3e9vq4.image/svg+xml' : user.avatar" alt="">
        <div style="font-size: 4.27vw;margin-left: 2.13vw">
          {{user.nickname}}
        </div>
      </div>
      <div style="color: #908d8d">
        个人主页
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="down">
      <ul>
        <li>
          <span>{{publish_num}}</span>
          <span>已发布</span>
        </li>
        <li>
          <span>{{liked_num}}</span>
          <span>已点赞</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {Icon} from "vant";
import store from "@/store";
import {Component, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";
const user = namespace("user")
@Component({
  components:{
    MyBanner,
    [Icon.name]:Icon
  }
})
export default class MyBanner extends Vue{
  @user.State("user")
  private user!:{[propName:string]:any}
  @user.State("publish_num")
  private publish_num!:string
  @user.State("liked_num")
  private liked_num!:string
}
</script>

<style lang="scss" scoped>
.banner{
  padding: 30px 15px;
  .up{
    display: flex;
    align-items: center;
    justify-content: space-between;
    img{
      width: 65px;
      height: 65px;
    }
    div{
      font-size: 12px;
    }
  }
  .down{
    margin-top: 16px;
    ul{
      display: flex;
      justify-content: space-around;
    }
    li{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>