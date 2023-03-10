<template>
  <view class="index">
    profile {{ count }}

    <button @click="add">add</button>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);

const add = () => {
  count.value++;
};
</script>
<style lang="scss" scoped>
.index {
}
</style>
