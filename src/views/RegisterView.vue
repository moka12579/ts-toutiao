<template>
  <div>
    <van-nav-bar
        :title="title"
        class="navBar"
    />
    <van-form @submit="register1">
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
          :rules="[{ required: true, message: '请尝试重新填写密码', pattern: /^[a-zA-Z]\w{5,17}$/}]"
      >
        <template #label>
          <i class="iconfont">&#xe8b2;</i>
        </template>
      </van-field>
      <van-field
          v-model="sms"
          center
          clearable
          placeholder="请输入短信验证码"
          :rules="[{ required: true, message: '请填写验证码', pattern: /^\d{6}$/}]"
      >
        <template #button>
          <van-button size="small" :loading="show" :loading-text="text" ref="sendSMS" @click="send" native-type="button" type="primary">发送验证码</van-button>
        </template>
        <template #label>
          <i class="iconfont">&#xe647;</i>
        </template>
      </van-field>
      <div style="display: flex;justify-content: space-around">
        <span>注册完成了吗？去<span style="color: #e54b43" @click="$router.push('/login')">登录</span>吧！</span>
        <span style="color: #e54b43;text-align: right" @click="$router.push('/forget/login')">忘记密码</span>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" style="background: #e54b43;border: 1px solid #e54b43">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import {NavBar,Form,Field,Icon,Button,Toast} from "vant"
import {sendSMS, register, forget} from "@/api/user";
import router from "@/router";
import {Component, Vue} from "vue-property-decorator";
import {AxiosError, AxiosResponse} from "axios";

@Component({
  components:{
    RegisterView,
    [NavBar.name]:NavBar,
    [Form.name]:Form,
    [Field.name]:Field,
    [Icon.name]:Icon,
    [Button.name]:Button,
    [Toast.name]:Toast
  }

})
export default class RegisterView extends Vue{
  tel:string = ""
  password:string = ""
  sms:string = ""
  show:boolean = false
  text:string = "60秒后重新发送"
  smsType:string = "register"
  title:string = "注册 / 登录"

  register1():void{
    switch (this.smsType) {
      case "register":
        register({
          url:"/user/reg",
          method:"post",
          data:{
            username:this.tel,
            password:this.password,
            vercode:this.sms
          }
        }).then((response:AxiosResponse):void => {
          if (response.data.code == 0){
            localStorage.setItem("token",response.data.token)
            Toast({
              type:"success",
              message:response.data.msg,
              onClose:() => router.push("/login")
            })
          }else{
            Toast.fail(response.data.msg)
          }
        })
        break;
      case "login":
        forget({
          url:"/user/forget",
          method:"POST",
          data:{
            username:this.tel,
            password:this.password,
            vercode:this.sms
          }
        }).then((response:AxiosResponse):void => {
          if (response.data.code == 0){
            localStorage.removeItem("token")
            Toast({
              type:"success",
              message:response.data.msg+"请重新登录",
              onClose:() => router.push("/login")
            })
          }else{
            Toast.fail(response.data.msg)
          }
        })
        break;
    }
  }
  send():void{
    this.show=true
    if (this.tel.trim().length === 0){
      Toast.fail("请先输入手机号")
      this.show=false
      return
    }
    sendSMS({
      url:"/user/sendSms",
      method:"POST",
      data:{
        mobile:this.tel,
        type:this.smsType
      }
    }).then((response:AxiosResponse):void => {
      switch (response.data.code) {
        case 1:
          Toast.fail(response.data.msg)
          break;
        case 0:
          Toast.success(response.data.msg)
          let s:any = 60
          let s1 = setInterval(() => {
            s--
            if (s == "00"){
              this.show=false
              this.text="60秒后重新发送"
              s=60
              clearInterval(s1)
              return
            }
            s=Math.floor(s/10) === 0 ? "0"+s : s
            this.text = s+this.text.slice(2)
          },1000)
          break;
      }
    }).catch((err:AxiosError):void => {
      this.show=false
      Toast.fail("请求出错")
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