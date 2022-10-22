<template>
  <div class="footer">
    <div style="position: relative" @click="changeShowPopup(true)">
      <i class="iconfont icon">&#xec7c;</i>
      <input type="text" placeholder="写评论..." class="xie" disabled="">
    </div>
    <div class="icons">
      <van-icon name="star-o" size="24" ref="collect" @click="collection($refs.collect)"/>
      <van-icon name="good-job-o" size="24" ref="good" @click="thumbs($refs.good)"/>
      <van-icon name="share-o" size="24" @click="$store.state.showShare=true"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Icon} from "vant";
import {startList} from "@/api/user";
import store from "@/store";
import {Component, Prop, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";
const user = namespace("user")
const comment = namespace("comment")
@Component({
  components:{
    Footer,
    [Icon.name]:Icon
  }
})
export default class Footer extends Vue{
  @Prop() private collection!:Function
  @Prop() private thumbs!:Function
  @user.State("user")
  private info!:{[propName:string]:any}
  @comment.State("showPopup")
  private showPopup!:boolean
  @comment.Mutation("changeShowPopup")
  private changeShowPopup!:(value:boolean) => void
  mounted():void{
    startList({
      url:'/api/get_fav_list',
      method:"post",
      data:{
        user_id:this.info._id
      }
    }).then(res => {
      let art = store.state.articleObj
      if (res.data.code === 0){
        let index = res.data.data.findIndex((v:{[propName:string]:any}):boolean => v._id === art._id)
        if (index !== -1){
          this.$refs.collect.classList.replace("van-icon-star-o","van-icon-star")
        }
      }
    })
  }
}

</script>

<style lang="scss" scoped>
.footer{
  position: fixed;
  height: 35px;
  border-top: 1px solid #f4f4f4;
  width: 100vw;
  bottom: -1px;
  padding: 16px;
  background: white;
  display: flex;
  align-items: center;
}
.icon{
  position: absolute;
  top: 9.5px;
  left: 10px;
}
.xie{
  border-radius: 10px;
  background: #f3f3f3;
  outline: none;
  border: none;
  height: 35px;
  padding-left: 32px;
  width: 102px;
}
.icons{
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin-left: 10px;
}
::v-deep .van-field__word-limit{
  position: absolute;
  right: 0;
  bottom: 0;
}
::v-deep .van-field__body{
  width: 100%;
}

</style>