<template>
  <div class="more">
    <div class="title">
      更多服务
      <div class="r">
        全部
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="content">
      <ul>
        <li>
          <van-icon name="todo-list-o" size="20"/>
          任务
        </li>
        <li>
          <van-icon name="vip-card-o" size="20" />
          VIP服务
        </li>
        <li>
          <van-icon name="service-o" size="20" />
          客服中心
        </li>
        <li>
          <van-icon name="shield-o" size="20" />
          安全中心
        </li>
        <li>
          <van-icon name="records" size="20" />
          评论
        </li>
        <li>
          <van-icon name="good-job-o" size="20" />
          点赞
        </li>
        <li>
          <van-icon name="question-o" size="20" />
          问题
        </li>
        <li>
          <van-icon name="friends-o" size="20" />
          关于我们
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {Icon} from "vant";
import {Component, Vue} from "vue-property-decorator";
@Component({
  components:{
    MyMore,
    [Icon.name]:Icon
  }
})
export default class MyMore extends Vue{

}
</script>

<style lang="scss" scoped>
.more{
  background: white;
  margin-top: 10px;
  .r{
    font-size: 14px;
    color: #969799;
  }
  .title{
    display: flex;
    justify-content: space-between;
    padding: 10px 16px;
    border-bottom: 1px solid #f0f0f0;
  }
  .content{
    height: 105px;
    ul{
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      flex-wrap: wrap;
      height: 100%;
      li{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;

      }
    }
  }

}
</style>