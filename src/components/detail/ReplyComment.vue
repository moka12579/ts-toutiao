<template>
  <van-popup v-model="$store.state.showReplyComment" position="bottom" :style="{ height: '70%' }" style="padding: 3.2vw;box-sizing: border-box" closeable>
    <div style="width: 100%;display: flex;justify-content: normal">
      <img :src="info.avatar" alt="" style="width: 30px;height: 30px;border-radius: 50%;margin-right: 10px">
      <div style="display: flex;flex-direction: column;">
        <span style="font-size: 14px;line-height: 30px">{{info.nickname}}</span>
        <span style="padding-right: 5.33vw">{{commentObj.content}}</span>
      </div>
    </div>
    <hr>
    <van-list
        v-model="replyLoading"
        :finished="replyFinished"
        finished-text="没有更多了"
        @load="onLoad"
        :error="replyErr"
        error-text="加载出错，点击重新加载"
        :immediate-check="false"
    >
      <van-cell v-for="(item,index) in list" :key="item._id">
        <div style="display: flex;justify-content: normal">
          <img :src="item.info.avatar" alt="" style="width: 30px;height: 30px;border-radius: 50%;margin-right: 10px">
          <div style="display: flex;flex-direction: column;">
            <span style="font-size: 14px;line-height: 30px">{{item.info.nickname}}</span>
            <span>{{item.content}}</span>
          </div>
        </div>
      </van-cell>
    </van-list>
  </van-popup>

</template>

<script lang="ts">
import {Cell, Icon, List, Popup} from "vant";
import store from "@/store";
import {Component, Prop, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";

const reply = namespace("reply")
@Component({
  components:{
    ReplyComment,
    [List.name]:List,
    [Popup.name]:Popup,
    [Icon.name]:Icon,
    [Cell.name]:Cell
  }
})
export default class ReplyComment extends Vue{
  @Prop() private commentObj!:{[propName:string]:any}
  @Prop() private commentThumbs!:Function
  @Prop() private onLoad!:Function
  @Prop() private list!:Array<{[propName:string]:any}>
  @Prop() private info!:{[propName:string]:any}
  @reply.State("replyLoading") private replyLoading!:boolean
  @reply.State("replyFinished") private replyFinished!:boolean
  @reply.State("replyErr") private replyErr!:boolean
}
</script>

<style scoped>

</style>