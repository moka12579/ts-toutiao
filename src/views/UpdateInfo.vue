<template>
  <div>
    <van-nav-bar
        title="修改个人信息"
        class="navBar"
        left-arrow
        @click-left="$router.back()"
    />
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-cell>
          <van-field
              v-model="nickname"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
              style="padding: 0"
          />
        </van-cell>
        <van-cell>
          <div>头像</div>
          <van-uploader v-model="fileList" :max-count="1" ref="uploader" :after-read="afterRead" v-show="false"/>
          <van-image
              width="40"
              height="40"
              :src="avatar"
              style="border-radius: 50%"
              @click="updateAvatar"
          ></van-image>

        </van-cell>
        <van-cell>
          <div>生日</div>
          <div @click="show=true">{{birthday}}</div>
          <van-popup
              v-model="show"
              position="bottom"
              round
              :style="{ height: '50%' }"
          >
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                title="选择年月"
                :max-date="maxDate"
                :min-date="minDate"
                @confirm="changeBirthday"
                :swipe-duration="500"
                @cancel="show=false"
            />
          </van-popup>
        </van-cell>
        <van-cell>
          <div>性别</div>
          <van-radio-group v-model="sex" direction="horizontal" @change="changeSex">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </van-cell>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import {
  Button,
  Cell,
  CellGroup,
  Field,
  Form,
  NavBar,
  Image,
  Uploader,
  Toast,
  Popup,
  DatetimePicker,
  RadioGroup, Radio
} from "vant";
import store from "@/store";
import {getToken, uploader} from "@/api/uploader";
import {updateInfos} from "@/api/user";
import {Component, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";
import {AxiosError, AxiosResponse} from "axios";
const user = namespace("user")
@Component({
  components:{
    UpdateInfo,
    [NavBar.name]:NavBar,
    [CellGroup.name]:CellGroup,
    [Cell.name]:Cell,
    [Button.name]:Button,
    [Form.name]:Form,
    [Field.name]:Field,
    [Image.name]:Image,
    [Uploader.name]:Uploader,
    [Popup.name]:Popup,
    [DatetimePicker.name]:DatetimePicker,
    [RadioGroup.name]:RadioGroup,
    [Radio.name]:Radio
  }
})
export default class UpdateInfo extends Vue{
  nickname:string = ""
  avatar:string = ""
  fileList:Array<{[propName:string]:any}> = []
  currentDate:unknown = ""
  birthday:string = ""
  show:boolean = false
  maxDate:Date = new Date()
  minDate:Date = new Date(1970,0,1)
  sex:unknown = "1"
  sex1:string = ""
  uploadToken:string = ""

  @user.State("uid")
  private uid!:string
  @user.State("user")
  private user!:{[propName:string]:any}
  @user.Mutation("changeUserInfo")
  private changeUserInfo!:Function

  onSubmit():void{
    updateInfos({
      url:"/user/editUserInfo",
      method:"post",
      data:{
        uid:this.uid,
        avatar:this.avatar,
        nickname:this.nickname,
        birthday:this.birthday,
        sex:this.sex1
      }
    }).then((res:AxiosResponse):void => {
      if (res.data.code === 0){
        this.changeUserInfo({
          avatar:this.avatar,
          birthday:this.birthday,
          sex:this.sex1,
          nickname:this.nickname
        })
        Toast({
          type:"success",
          message:res.data.msg,
          onClose:() => {
            this.$router.back()
          }
        })
      }else{
        Toast.fail(res.data.msg)
      }
    })
  }
  updateAvatar(){
    this.$refs.uploader.chooseFile()
  }
  afterRead(file:{[propName:string]:any}){
    Toast.loading({
      message: '上传中...',
      forbidClick: true,
    });
    uploader({
      url:"https://upload-z1.qiniup.com",
      method:"post",
      headers:{
        "Content-Type":"multipart/form-data"
      },
      data:{
        token:this.uploadToken,
        file:file.file,
        key:new Date().getTime()+"-"+file.file.name
      }
    }).then((res:AxiosResponse):void => {
      Toast.success("上传完成")
      this.avatar = `http://toutiao.longxiaokj.com/${res.data.key}`
    }).catch((err:AxiosError):void => {
      Toast.fail("上传失败")
    })
  }
  changeBirthday(value:Date):void{
    this.birthday = new Date(value).toLocaleDateString()
    this.show=false
  }
  changeSex(event:string):void{
    this.sex1 = event === "2" ? "女" : "男"
  }
  mounted(){
    const {nickname,avatar,birthday,sex2} = this.user
    this.nickname = nickname
    this.avatar = avatar
    this.birthday = birthday ? birthday : new Date().toLocaleDateString()
    let arr = birthday.split("/")
    this.currentDate = new Date(arr[0],arr[1],arr[2])
    this.sex = sex2 === "男" ? "1" : "2"
    getToken({
      url:"/upload/token"
    }).then(response => {
      if (response.data.code === 0){
        this.uploadToken = response.data.token
      }
    })
  }
}
</script>

<style lang="scss" scoped>
::v-deep .van-cell__value{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  .van-cell__title{
    line-height: 44px;
  }
}

</style>