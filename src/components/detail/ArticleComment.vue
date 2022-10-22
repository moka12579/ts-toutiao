<template>
  <div>
    <van-overlay :show="show" @click="show = false" />
    <van-list
        v-model="$store.state.comment.commentLoading"
        :finished="$store.state.comment.commentFinished"
        finished-text="没有更多了"
        :error="$store.state.comment.commentErr"
        error-text="加载出错，点击重新加载"
        @load="onLoad"
        :immediate-check="false"
    >
      <van-cell v-for="(item,index) in list" :key="item._id" @click="commentList1(item,true)">
        <div style="display: flex;justify-content: normal">
          <img :src="item.info.avatar" alt="" style="width: 8vw;height: 8vw;border-radius: 50%;margin-right: 2.67vw">
          <div style="display: flex;flex-direction: column;">
            <span style="font-size: 3.73vw;line-height: 8vw">{{!item.info.nickname ? item.info.username : item.info.nickname}}</span>
            <span>{{item.content}}</span>
            <div style="display: flex">
              <div style="background: #f0f0f0;height: 6.67vw;border-radius: 1.33vw;padding: 0 2.67vw;font-size: 3.2vw;width: 12.27vw" @click.stop="$set(list,index,{...item,showPopover:true});show=true" >
                回复
                <van-icon name="arrow" style="display: inline-block;font-size: 3.2vw"/>
              </div>
              <div style="margin-left: 2.13vw">{{new Date(item.create_time).toLocaleDateString()}}</div>
            </div>
            <van-popover
                v-model="item.showPopover"
                trigger="click"
                placement="bottom-start"
            >
              <template #default>
                <van-field
                    v-model="text"
                    type="textarea"
                    maxlength="1000"
                    show-word-limit
                    rows="5"
                    placeholder="留下你的评论..."
                    autosize
                />
                <van-button
                    type="primary"
                    style="width: 100%;margin-top: 8px"
                    @click="sendComment(text,false,item)"
                >
                  发送评论
                </van-button>
              </template>
            </van-popover>
          </div>
        </div>
        <div>
          <van-icon ref="commentGood" name="good-job-o" @click="commentThumbs(item._id)" />
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script lang="ts">

import {Button, Cell, Field, Icon, List, Overlay, Popover, Toast} from "vant";
import store from "@/store";
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
  components:{
    ArticleComment,
    [Icon.name]:Icon,
    [List.name]:List,
    [Cell.name]:Cell,
    [Popover.name]:Popover,
    [Button.name]:Button,
    [Field.name]:Field,
    [Overlay.name]:Overlay
  }
})
export default class ArticleComment extends Vue{
  text:string = ""
  show:boolean = false

  @Prop() private article_id!:string
  @Prop() private sendComment!:Function
  @Prop() private commentThumbs!:Function
  @Prop() private commentList1!:Function
  @Prop() private list!:Array<{[propName:string]:any}>
  @Prop() private onLoad!:Function
}

</script>

<style lang="scss" scoped>
::v-deep .van-cell__value{
  display: flex;
  justify-content: space-between;
}
::v-deep .van-list{
  padding-bottom: 68px;
}
</style>