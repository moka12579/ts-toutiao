<template>
  <div style="background: #f0f0f0;height: 100vh">
    <van-nav-bar
        title="设置"
        left-arrow
        @click-left="$router.back()"
    >
    </van-nav-bar>
    <van-cell-group inset style="margin-top: 2.67vw">
      <van-cell title="修改密码" is-link to="/updatePwd"/>
      <van-cell title="忘记密码" is-link to="/forget/login"/>
      <van-cell title="修改信息" is-link to="/updateInfo"/>
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import {Cell, CellGroup, NavBar} from "vant";
import {Component, Vue} from "vue-property-decorator";
@Component({
  components:{
    SetupView,
    [CellGroup.name]:CellGroup,
    [Cell.name]:Cell,
    [NavBar.name]:NavBar,
  }
})
export default class SetupView extends Vue{

}
</script>

<style scoped>

</style>