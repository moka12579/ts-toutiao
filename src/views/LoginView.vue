<template>
  <div>
    <van-nav-bar
        title="注册 / 登录"
        class="navBar"
    />
    <div>
      <van-form @submit="login1">
        <van-field
            v-model="tel"
            type="tel"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            maxlength="11"
            :rules="[{ required: true, message: '请填写正确的手机号',pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/}]"
        >
          <template #label>
            <i class="iconfont">&#xe65f;</i>
          </template>
        </van-field>
        <van-field
            v-model="password"
            type="password"
            name="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        >
          <template #label>
            <i class="iconfont">&#xe8b2;</i>
          </template>
        </van-field>
        <div>
          还没注册吗？先去<span style="color: #e54b43" @click="$router.push('/register')">注册</span>吧！
        </div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" style="background: #e54b43;border: 1px solid #e54b43">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Vue from "vue";
import {Button, Field, Form, Icon, NavBar, Toast } from "vant";
import { login } from "@/api/user";
import { namespace } from "vuex-class";
import router from "@/router";

@Component({
  components:{
    [NavBar.name]:NavBar,
    [Form.name]:Form,
    [Field.name]:Field,
    [Icon.name]:Icon,
    [Button.name]:Button,
    [Toast.name]:Toast
  }
})
export default class LoginView extends Vue{
  tel:string = ""
  password:string = ""
  @namespace('user').Mutation("GET_USER_INFO") private getUserInfo!:() => void

  login1(){
    login({
      url:"/user/login",
      method:"post",
      data:{
        username:this.tel,
        password:this.password
      }
    }).then(response => {
      if (response.data.code === 0 ){
        localStorage.setItem("token",response.data.token)
        this.getUserInfo()
        Toast({
          type:"success",
          message:"登录成功",
          onClose:() => {
            router.replace("/")
          }
        })
      }else{
        Toast.fail(response.data.msg)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.navBar{
  background: #e54b43;
  color: white;
  ::v-deep .van-nav-bar__title,::v-deep .van-icon-arrow-left{
    color: white;
  }
}
::v-deep .van-form .van-cell__title{
  width:fit-content;
}
</style>