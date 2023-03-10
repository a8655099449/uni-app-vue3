<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-07 17:18:49
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-08 16:59:37
 * @FilePath: /uni-app-vue3/src/pages/index/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="full-page">
    <view class="content">
      <view v-if="selectIndex == 0">
        <index-page></index-page>
      </view>
      <view v-else-if="selectIndex == 1">
        <center-page></center-page>
      </view>
      <view v-else-if="selectIndex == 2">
        <mine-page></mine-page>
      </view>
    </view>
    <Footer index="0" :list="list" @call-back="didClickIndex"></Footer>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import centerPage from '../center/index.vue';
import indexPage from '../home/index.vue';
import minePage from '../mine/index.vue';
import Footer from '@/components/Footer/index.vue';
const selectIndex = ref(0);

const list = ref([
  { title: '首页', url: '/' },
  { title: '中间', url: '/center' },
  { title: '我的', url: '/mine' },
]);

const didClickIndex = (index: number) => {
  selectIndex.value = index;
  console.log('点击事件：', selectIndex);
};
</script>

<style lang="scss" scoped>
.full-page {
  width: 100%;
  .content {
    width: 100%;
    height: 100%;
  }
  .foot {
    height: 60rpx;
    width: 100%;
  }
}
</style>
