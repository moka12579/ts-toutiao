<template>
  <div>
    <van-list
        v-model="loading"
        :finished="finish"
        finished-text="没有更多了"
        :error.sync="err"
        error-text="加载出错，点击重新加载"
        @load="onLoad"
        :immediate-check="false"
    >
      <van-cell v-for="item1 in articleList" :key="item1._id" @click="$router.push(`/detail/${item1._id}`)">
        <div style="display: flex;"
             :class="[{'jus':item1.imageSrc.length === 1},{'flex':item1.imageSrc.length === 3}]">
          <div class="title">{{ item1.title }}</div>
          <div v-if="item1.imageSrc.length === 3" style="display: flex">
            <div v-for="(item2,index2) in item1.imageSrc" :key="index2">
              <van-image
                  width="112"
                  height="70"
                  lazy-load
                  :src="item2"
                  referer="mokacui.work"
              />
            </div>
          </div>
          <div v-else-if="item1.imageSrc.length === 1">
            <van-image
                width="112"
                height="70"
                lazy-load
                :src="item1.imageSrc[0]"
                referer="mokacui.work"
            />
          </div>
        </div>
        <div style="display: flex;justify-content: space-between;font-size: 12px;text-align: left;align-items: center">
          <span style="width: 100px;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;">作者：{{item1.author }}</span>
          <span>{{ item1.comment }}评论</span>
          <span>发布日期：{{ new Date(item1.time).toLocaleDateString() }}</span>
          <van-icon name="cross" v-if="$route.path === '/publishHistory'" @click.stop="deleteArticle(item1)"/>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script lang="ts">
import {Search, Tabs, Tab, List, Cell, PullRefresh, Image, Icon} from "vant"
import {articleList, cateList} from "@/api/home";
import store from "@/store";
import {Component, Prop, Vue} from "vue-property-decorator";
import {mapGetters, mapMutations} from "vuex";
import {State} from "vuex-class";

@Component({
  components:{
    [Search.name]: Search,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [List.name]: List,
    [Cell.name]: Cell,
    [PullRefresh.name]: PullRefresh,
    [Image.name]: Image,
    [Icon.name]:Icon,
  },
})
export default class ListItem extends Vue{
  @Prop() private articleList!:Array<Object>
  @Prop() private finish!:boolean
  @Prop() private onLoad!:Function
  @State("loading")
  private loading!:boolean
  @State("err")
  private err!:boolean
}

</script>

<style lang="scss" scoped>
::v-deep .van-cell {
  flex-direction: column;

  .van-cell__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.jus {
  justify-content: space-between;
}

.flex {
  flex-direction: column;
}
.title{
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>