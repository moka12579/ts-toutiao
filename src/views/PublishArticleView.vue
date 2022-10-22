<template>
  <div>
    <PublishArticle/>
    <TabBar :active="1"/>
  </div>
</template>

<script lang="ts">
import TabBar from "@/components/TabBar.vue";
import PublishArticle from "@/components/PublishArticle.vue";
import {Component, Vue} from "vue-property-decorator";
@Component({
  components:{
    PublishArticleView,
    TabBar,
    PublishArticle
  }
})
export default class PublishArticleView extends Vue{

}
</script>

<style scoped>

</style>