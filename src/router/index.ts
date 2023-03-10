/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-02-27 13:43:38
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-09 15:58:43
 * @FilePath: /vue-ts-threejs/src/router/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 1、按需引入方法
import { createRouter, createWebHistory } from 'vue-router';
// 2、定义一些路由

const routes = [
  // 每个路由都需要映射到一个组件
  {
    path: '/home',
    component: () => import('../pages/home/index.vue'),
  },
  {
    path: '/center',
    component: () => import('../pages/center/index.vue'),
  },
  {
    path: '/mine',
    component: () => import('../pages/mine/index.vue'),
  },
  {
    path: '/',
    component: () => import('../pages/index.vue'),
  },
  {
    path: '/communication',
    component: () => import('../pages/communication.vue'),
  },
];
// 3、创建路由实例
const router = createRouter({
  routes,
  history: createWebHistory('./'),
});

router.beforeEach((to, from, next) => {
  console.log('前置路由守卫', to, from, next);
  // ...
});

export default router;
