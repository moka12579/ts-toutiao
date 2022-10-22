<template>
  <div>
    <van-popup :value="showPopup" position="bottom" :style="{ height: '30%' }" @close="changeShowPopup(false);text=''" @click-overlay="changeShowPopup(false)">
      <van-field
          v-model="text"
          type="textarea"
          maxlength="1000"
          show-word-limit
          rows="5"
          placeholder="留下你的评论..."
          autosize
      />
      <van-button type="primary" style="width: 100%;margin-top: 8px" @click="sendComment(text,true)">发送评论</van-button>
    </van-popup>
  </div>
</template>

<script lang="ts">
import {Button, Field, Popup} from "vant";
import {Component, Prop, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";
import {computed} from "vue";
const comment = namespace("comment")
@Component({
  components:{
    Comment,
    [Field.name]:Field,
    [Popup.name]:Popup,
    [Button.name]:Button
  }
})
export default class Comment extends Vue{
  text:string = ""
  @Prop() private sendComment!:Function
  @comment.State("showPopup")
  private showPopup!:boolean
  @comment.Mutation("changeShowPopup")
  private changeShowPopup!:(status:boolean) => void

}

</script>

<style scoped>

</style>