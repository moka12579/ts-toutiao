<template>
  <van-tabbar v-model="active1" route active-color="#e54b43" placeholder>
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/publish" icon="add-o">发布</van-tabbar-item>
    <van-tabbar-item to="/my" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import {Tabbar,TabbarItem} from "vant"
import {Component, Prop, Vue} from "vue-property-decorator";
import {Mutation, State} from "vuex-class";
@Component({
  components:{
    TabBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
})
export default class TabBar extends Vue{
  @State("active") private active!:number
  @Mutation("changeActive") private changeActive!:Function
  get active1():number{
    return this.active
  }
  set active1(val:number){
    this.changeActive(val)
  }

}
</script>

<style scoped>

</style>