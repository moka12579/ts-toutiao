<template>
  <div>
    <van-nav-bar
        title="修改密码"
        class="navBar"
    />
    <div>
      <van-form @submit="login1">
        <van-field
            v-model="oldPassword"
            type="text"
            name="旧密码"
            placeholder="旧密码"
            label="旧密码"
            :rules="[{ required: true, message: '请填写旧密码' }]"
        />
        <van-field
            v-model="newPassword"
            type="password"
            name="新密码"
            placeholder="新密码"
            label="新密码"
            :rules="[{ required: true, message: '请填写新密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" style="background: #e54b43;border: 1px solid #e54b43">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts">
import {NavBar,Form,Field,Icon,Button,Toast} from "vant"
import {login, updatePwd} from "@/api/user";
import router from "@/router";
import {Component, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";
import {AxiosResponse} from "axios";
const user = namespace("user")
@Component({
  components:{
    UpdatePwd,
    [NavBar.name]:NavBar,
    [Form.name]:Form,
    [Field.name]:Field,
    [Icon.name]:Icon,
    [Button.name]:Button,
    [Toast.name]:Toast
  }
})
export default class UpdatePwd extends Vue{
  tel:string = ""
  oldPassword:string = ""
  newPassword:string = ""
  @user.State("uid")
  private uid!:string
  login1(){
    updatePwd({
      url:"/user/updatePwd",
      data:{
        oldPassword:this.oldPassword,
        newPassword:this.newPassword,
        uid:this.uid
      }
    }).then((response:AxiosResponse):void => {
      if (response.data.code === 0 ){
        localStorage.clear()
        Toast({
          type:"success",
          message:response.data.msg,
          onClose:() => {
            router.replace("/login")
          }
        })
      }else{
        Toast.fail(response.data.msg)
      }
    })
  }
}
</script>

<style scoped>

</style>