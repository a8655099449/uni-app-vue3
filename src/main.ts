/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-07 17:18:49
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-13 14:35:18
 * @FilePath: /uni-app-vue3/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createSSRApp } from 'vue';
import store from './store';
import App from './App.vue';

// import filters from '@/utils/filters.js';
//拦截器
uni.addInterceptor('request', {
  invoke: (config) => {
    console.log(config);
  },
});
export function createApp() {
  const app = createSSRApp(App);
  app.use(store);

  return {
    app,
  };
}
