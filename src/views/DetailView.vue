<template>
  <div>
    <Article :title="title" :articleObj="article"/>
    <ArticleComment
        :article_id="article_id"
        :user_id="userId"
        :send-comment="sendComment"
        :comment-thumbs="commentThumbs"
        :comment-list1="commentList1"
        :list="list"
        :articleObj="articleObj"
        :on-load="onLoad"/>
    <Footer
        :collection="collection"
        :thumbs="thumbs"
    />
    <Comment :send-comment="sendComment"/>
    <van-share-sheet
        v-model="$store.state.showShare"
        title="立即分享给好友"
        :options="options"
    />
    <ReplyComment
        :comment-obj="commentObj"
        :comment-thumbs="commentThumbs"
        :on-load="onLoad"
        :list="list1"
        :info="info"
    />
  </div>
</template>

<script lang="ts">
import { ShareSheet, Toast } from "vant";
import {Component, Vue} from "vue-property-decorator";
import Article from "@/components/detail/Article.vue"
import ArticleComment from "@/components/detail/ArticleComment.vue"
import Footer from "@/components/detail/Footer.vue"
import ReplyComment from "@/components/detail/ReplyComment.vue"
import {collectionUp, commentList, thumbsUp, comment1, getDetail } from "@/api/article";
import {namespace} from "vuex-class";
import Comment from "@/components/detail/Comment.vue";
import {AxiosResponse} from "axios";

const comment = namespace("comment")
const user = namespace("user")
const reply = namespace("reply")

@Component({
  components:{
    DetailView,
    [ShareSheet.name]:ShareSheet,
    Article,
    ArticleComment,
    Comment,
    Footer,
    ReplyComment
  }
})
export default class DetailView extends Vue{
  //导入vuex的东西
  @comment.Mutation("COMMENT_CHANGE_LOADING")
  private changeLoading!:(status:boolean) => void
  @comment.Mutation("COMMENT_CHANGE_FINISHED")
  private changeFinished!:(status:boolean) => void
  @comment.Mutation("COMMENT_CHANGE_ERR")
  private changeErr!:(status:boolean) => void
  @comment.Mutation("changeShowPopup")
  private changeShowPopup!:(status:boolean) => void
  @user.State("user")
  private user!:{[propName:string]:any}
  @reply.Mutation("changeReplyLoading")
  private changeReplyLoading!:(status:boolean) => void
  @reply.Mutation("changeReplyFinished")
  private changeReplyFinished!:(status:boolean) => void
  @reply.Mutation("changeReplyErr")
  private changeReplyErr!:(status:boolean) => void
  @reply.Mutation("changeReplyComment")
  private changeReplyComment!:(status:boolean) => void
  //变量
  title:string = ""
  article:{[propName:string]:any} = {}
  list:Array<{[propName:string]:any}> = []
  finished:boolean = false
  skip:number = 0
  article_id:string = ""
  comment:string = ""
  show:boolean = false
  text:string = ""
  showShare:boolean = false
  options: Array<{ [propName:string]:any }> =[
    { name: '微信', icon: 'wechat' },
    { name: '微博', icon: 'weibo' },
    { name: '复制链接', icon: 'link' },
    { name: '分享海报', icon: 'poster' },
    { name: '二维码', icon: 'qrcode' }
  ]
  skip1:number = 0
  show1:boolean = false
  commentObj:{[propName:string]:any} = {}
  info:{[propName:string]:any} = {}
  list1:Array<{[propName:string]:any}> = []
  articleObj:{[propName:string]:any} = {}

  //计算
  get userId():string{
    console.log(this.user)
    return this.user._id
  }

  //函数
  data1(first:boolean):void{
    if (first) this.skip=0
    else this.skip+=10
    commentList({
      url:"/api/get_comment_list",
      method:"post",
      data:{
        article_id:this.article_id,
        skip:this.skip
      }
    }).then((response:{[propName:string]:any}):void => {
      if (response.data.code === 0){
        this.changeLoading(false)
        if (response.data.data.length <= 10)
          this.changeFinished(true)
        if (first){
          this.list = response.data.data
          // store.state.list = this.list
        }else{
          this.list = [...this.list,...response.data.data]
          // store.state.list = this.list
          this.$forceUpdate()
        }
        this.list.forEach(item => item.showPopover=false)
      }
    }).catch(():void => {
      this.changeErr(true)
    })
  }
  onLoad():void {
    this.changeLoading(true)
    this.data1(false)
  }
  thumbs(good:{[propName:string]:any}):void{
    console.log(this.userId)
    let url="/api/unlike"
    if (good.classList[1].indexOf("-o") !== -1)url="/api/like"
    thumbsUp({
      url,
      method:"post",
      data:{
        user_id:this.userId,
        article_id:this.article_id
      }
    }).then((res:{[propName:string]:any}):void => {
      if (res.data.code === 0){
        Toast.success(res.data.msg)
        if (good.classList[1].indexOf("-o") !== -1)
          good.classList.replace("van-icon-good-job-o","van-icon-good-job")
        else
          good.classList.replace("van-icon-good-job","van-icon-good-job-o")
      }else{
        Toast.fail(res.data.msg)
      }
    })
  }
  collection(coll:{[propName:string]:any}):void{
    let url="/api/remove_fav"
    if (coll.classList[1].indexOf("-o") !== -1)
      url = "/api/add_fav"
    collectionUp({
      url,
      method:"post",
      data:{
        user_id:this.userId,
        article_id:this.article_id
      }
    }).then((res:{[propName:string]:any}):void => {
      if (res.data.code === 0){
        Toast.success(res.data.msg)
        if (coll.classList[1].indexOf("-o") !== -1)
          coll.classList.replace("van-icon-star-o","van-icon-star")
        else
          coll.classList.replace("van-icon-star","van-icon-star-o")
      }else{
        Toast.fail(res.data.msg)
      }
    })
  }
  sendComment(content:string,isArticle:boolean,item:{[propName:string]:any}):void{
    this.show=false
    if(!isArticle){
      let index = this.list.findIndex(v => v._id === item._id)
      if (index !== -1) this.list[index].showPopover=false
      this.changeShowPopup(false)
    }
    let data:{[propName:string]:any}
    data={
      user_id:this.userId,
      article_id:this.article_id,
      content
    }
    if (isArticle) data.comment_type = 0
    else {
      data.comment_type = 1
      data.reply_comment_id = item._id
    }
    comment1({
      url: "/api/add_comment",
      method:"post",
      data
    }).then(res => {
      this.changeShowPopup(false)
      if (res.data.code === 0){
        Toast({
          type:"success",
          message:res.data.msg,
          onClose:() => {
            this.changeLoading(true)
            this.changeFinished(false)
            this.list=[]
            this.data1(true)
          }
        })
      }else{
        Toast.fail(res.data.msg)
      }
    })
  }
  commentThumbs(id:string):void{
    let comment = this.$refs.commentGood[0]
    let url="/api/comment_unlike"
    if (comment.classList[1].indexOf("-o") !== -1) url="/api/comment_like"
    thumbsUp({
      url,
      method:"post",
      data:{
        user_id:this.userId,
        comment_id:id
      }
    }).then(res => {
      if (res.data.code === 0){
        Toast.success(res.data.msg)
        if (comment.classList[1].indexOf("-o") !== -1)
          comment.classList.replace("van-icon-good-job-o","van-icon-good-job")
        else
          comment.classList.replace("van-icon-good-job","van-icon-good-job-o")
      }else{
        Toast.fail(res.data.msg)
      }
    })
  }
  commentList1(item:{[propName:string]:any},first:boolean):void{
    this.commentObj=item
    this.info = item.info
    this.show1=true
    this.list1=[]
    this.changeReplyLoading(true)
    this.changeReplyComment(false)
    this.changeReplyFinished(false)
    if (first) this.skip1=0
    else this.skip1+=11
    commentList({
      url: "/api/get_reply_list",
      method:"post",
      data:{
        skip:this.skip1,
        reply_comment_id:item._id,
      }
    }).then(res => {
      this.changeReplyLoading(false)
      if (res.data.code === 0){
        if (first){
          this.list1 = res.data.data
        }
        else{
          if (res.data.data.length <= 10) this.changeReplyFinished(true)
          this.list1 = [...this.list1,...res.data.data]
        }
      }
    }).catch(err => {
      this.changeReplyErr(true)
    })
  }
  mounted():void{
    this.article_id = this.$route.params.article_id
    this.article_id = this.$route.params.articleId
    getDetail({
      url:"/api/get_article_detail",
      method:"post",
      data:{
        article_id:this.article_id
      }
    }).then((response:AxiosResponse):void => {
      if (response.data.code === 0){
        this.title = response.data.data.title
        this.article = {...response.data.data}
        this.articleObj = this.article
      }
    })
    this.data1(true)
  }
}
</script>

<style scoped>

</style>