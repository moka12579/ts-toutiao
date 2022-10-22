<template>
  <div class="menu">
    <ul>
      <li>
        <i class="iconfont" style="color: #e54b43;font-size: 24px;margin-bottom: 8px">&#xe60b;</i>
        消息通知
      </li>
      <li>
        <van-icon name="star-o" color="#e54b43" size="24" style="margin-bottom: 8px"/>
        收藏
      </li>
      <li @click="$router.push('/browseHistory')">
        <van-icon name="clock-o" color="#e54b43" size="24" style="margin-bottom: 8px"/>
        浏览历史
      </li>
      <li @click="$router.push('/publishHistory')">
        <i class="iconfont" style="color: #e54b43;font-size: 24px;margin-bottom: 8px">&#xe60a;</i>
        发布历史
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Icon} from "vant";
import {Component, Vue} from "vue-property-decorator";
@Component({
  components:{
    MyMenu,
    [Icon.name]:Icon
  }
})
export default class MyMenu extends Vue{

}
</script>

<style lang="scss" scoped>
.menu{
  background: white;
  padding: 10px 18px;
  ul{
    display: flex;
    justify-content: space-around;
    li{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }
  }
}
</style>