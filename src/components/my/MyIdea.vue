<template>
  <div class="idea">
    <div>再小的想法，都值得被记录</div>
    <div>
      <van-icon name="plus" />
      发布
    </div>
  </div>
</template>

<script lang="ts">
import {Icon} from "vant";
import {Component, Vue} from "vue-property-decorator";
@Component({
  components:{
    MyIdea,
    [Icon.name]:Icon
  }
})
export default class MyIdea extends Vue{

}
</script>

<style lang="scss" scoped>
.idea{
  background: white;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  font-size: 14px;
  div:last-child{
    background: #e54b43;
    color: white;
    width: 72px;
    line-height: 28px;
    text-align: center;
    border-radius: 50px;
  }
}
</style>