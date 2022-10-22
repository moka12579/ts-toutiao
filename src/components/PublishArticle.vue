<template>
  <div>
    <van-nav-bar
        title="发布"
        class="navBar"
    />
    <van-form @submit="publish1">
      <van-field
          v-model="publish.title"
          name="文章标题"
          label="文章标题"
          placeholder="文章标题"
          maxlength="10"
          :rules="[{ required: true, message: '请填写文章标题' }]"
      />
      <van-field
          readonly
          clickable
          @click="showPicker=true"
          :value="cate"
          label="分类"
          placeholder="选择分类"
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
            title="选择分类"
            show-toolbar
            :columns="columns"
            @confirm="changeCate"
            @cancel="showPicker=false"
        />
      </van-popup>
      <van-field
          v-model="publish.content"
          type="textarea"
          name="文章内容"
          label="内容"
          placeholder="请输入内容"
          rows="5"
          autosize
          maxlength="1000"
          show-word-limit
          :rules="[{ required: true, message: '请填写文章内容，最少10个字' }]"
      />
      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader
              v-model="uploader"
              :after-read="afterRead"
              :before-delete="beforeDelete"
          />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import {Button, Field, Form, NavBar, Picker, Popup, Toast, Uploader} from "vant";
import {cateList} from "@/api/home";
import {getToken, uploader} from "@/api/uploader";
import store from "@/store";
import {publish} from "@/api/article";
import router from "@/router";
import {Component, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";
import {AxiosError, AxiosResponse} from "axios";

const user = namespace("user")
@Component({
  components:{
    PublishArticle,
    [NavBar.name]:NavBar,
    [Form.name]:Form,
    [Field.name]:Field,
    [Picker.name]:Picker,
    [Popup.name]:Popup,
    [Button.name]:Button,
    [Uploader.name]:Uploader
  }
})
export default class PublishArticle extends Vue{
  @user.State("user")
  private userInfo!:{[propName:string]:any}
  @user.State("uid")
  private uid!:string

  columns:Array<string> = []
  showPicker:boolean = false
  cate:string = ""
  uploader:Array<{[propName:string]:any}> = []
  uploadToken: string = ""
  cate_list:Array<{[propName:string]:any}> = []
  publish: {
    title: string;
    imageSrc: Array<string>;
    content: string;
    cate_id: string;
    cate_name: string;
    author: string;
    author_id: string;
  } = {
    title: "",
    imageSrc: [],
    content: "",
    cate_id: "",
    cate_name: "",
    author: "",
    author_id: ""
  }

  mounted(){
    cateList({
      url:"/api/get_cate_list"
    }).then((response:AxiosResponse):void => {
      if (response.data.code === 0){
        this.cate_list = response.data.data
        this.columns = response.data.data.map((v:{[propName:string]:any}):void=>v.name)
      }
    })
    getToken({
      url:"/upload/token"
    }).then((response:AxiosResponse):void => {
      if (response.data.code === 0){
        this.uploadToken = response.data.token
      }
    })
  }
  changeCate(value:string,index:number):void{
    this.publish.cate_id = this.cate_list[index]._id
    this.publish.cate_name = this.cate_list[index].name
    this.cate=value
    this.showPicker=false
  }
  afterRead(file:{[propName:string]:any}):void{
    let index = this.uploader.findIndex(v => v.content === file.content)
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
      this.$set(this.uploader,index,{...this.uploader[index],status:"done",message:"上传完成"})
      this.publish.imageSrc.push(`${res.data.key}`)
    }).catch((err:AxiosError):void => {
      this.$set(this.uploader,index,{...this.uploader[index],status:"failed",message:"上传失败"})
    })
  }
  publish1():void{
    if (this.publish.imageSrc.length===2||this.publish.imageSrc.length>3){
      Toast.fail("请上传一张或三张照片")
      return
    }
    this.publish.author = this.userInfo._id
    this.publish.author_id = this.uid
    this.publish.imageSrc=this.publish.imageSrc.map((v:string):string => `http://toutiao.longxiaokj.com/${v}`)
    publish({
      url:"/api/add_article",
      method:"post",
      data:{
        ...this.publish
      }
    }).then((res:AxiosResponse):void => {
      if (res.data.code === 0){
        Toast({
          type:"success",
          message:"发布成功",
          onClose:() => {
            router.push("/")
          }
        })
      }else{
        Toast.fail(res.data.msg)
      }
    })
  }
  beforeDelete(file:{[propName:string]:any}):boolean{
    let index = this.publish.imageSrc.findIndex(v => v === file.file.name)
    if (index !== -1){
      this.publish.imageSrc.splice(index,1)
    }
    return true
  }
}
/*export default {
  name: "PublishArticle",
  components:{
    [NavBar.name]:NavBar,
    [Form.name]:Form,
    [Field.name]:Field,
    [Picker.name]:Picker,
    [Popup.name]:Popup,
    [Button.name]:Button,
    [Uploader.name]:Uploader
  },
  mounted() {
    cateList({
      url:"/api/get_cate_list"
    }).then(response => {
      if (response.data.code === 0){
        this.cate_list = response.data.data
        this.columns = response.data.data.map(v=>v.name)
      }
    })
    getToken({
      url:"/upload/token"
    }).then(response => {
      if (response.data.code === 0){
        this.uploadToken = response.data.token
      }
    })
  },
  methods:{
    publish1(){
      if (this.publish.imageSrc.length===2||this.publish.imageSrc.length>3){
        Toast.fail("请上传一张或三张照片")
        return
      }
      this.publish.imageSrc=this.publish.imageSrc.map(v => `http://toutiao.longxiaokj.com/${v}`)
      publish({
        url:"/api/add_article",
        data:{
          ...this.publish
        }
      }).then(res => {
        if (res.data.code === 0){
          Toast({
            type:"success",
            message:"发布成功",
            onClose:() => {
              router.push("/")
            }
          })
        }else{
          Toast.fail(res.data.msg)
        }
      })
    },
    beforeDelete(file){
      let index = this.publish.imageSrc.findIndex(v => v === file.file.name)
      if (index !== -1){
        this.publish.imageSrc.splice(index,1)
      }
      return true
    }
  }
}*/
</script>

<style lang="scss" scoped>
.navBar{
  background: #e54b43;
  color: white;
  ::v-deep .van-nav-bar__title,::v-deep .van-icon-arrow-left{
    color: white;
  }
}
</style>