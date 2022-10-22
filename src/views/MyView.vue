<template>
  <div class="view">
    <MyNavBar/>
    <MyBanner/>
    <MyMenu/>
    <MyIdea/>
    <MyMore/>
    <TabBar :active="2"/>
  </div>
</template>

<script lang="ts">
import TabBar from "@/components/TabBar.vue";
import MyNavBar from "@/components/my/MyNavBar.vue";
import {Icon} from "vant";
import MyBanner from "@/components/my/MyBanner.vue";
import MyMenu from "@/components/my/MyMenu.vue";
import MyIdea from "@/components/my/MyIdea.vue";
import MyMore from "@/components/my/MyMore.vue";
import {Component, Vue} from "vue-property-decorator";
@Component({
  components:{
    MyView,
    MyIdea,
    TabBar,
    MyNavBar,
    [Icon.name]:Icon,
    MyBanner,
    MyMenu,
    MyMore
  }
})
export default class MyView extends Vue{
  
}
</script>

<style lang="scss" scoped>
.view{
  background: #f0f0f0;
  height: 100vh;
}
</style>