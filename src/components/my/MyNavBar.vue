<template>
  <div>
    <van-nav-bar
        title="我的"
    >
      <template #right>
        <van-icon name="chat-o" style="margin-right: 10px"/>
        <van-icon name="setting-o" @click="$router.push('/setup')"/>
      </template>
    </van-nav-bar>
  </div>
</template>

<script lang="ts">
import {Icon, NavBar} from "vant";
import {Component, Vue} from "vue-property-decorator";

@Component({
  components:{
    MyNavBar,
    [NavBar.name]:NavBar,
    [Icon.name]:Icon
  }
})
export default class MyNavBar extends Vue{

}
</script>

<style lang="scss" scoped>
::v-deep .van-icon{
  font-size: 20px;
  color: #000;
}
</style>