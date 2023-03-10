/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2022-10-17 11:21:17
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-10 11:28:21
 * @FilePath: /maas-mini/src/store/store.js
 * @Description: vuex + persistedstate 构成数据共享以及本地缓存系统
 */
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import index from './modules/index';
const store = new Vuex.Store({
  modules: {
    index,
  },

  //vuex数据持久化处理
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => uni.getStorageSync(key),
        setItem: (key, value) => uni.setStorageSync(key, value),
        removeItem(key) {
          console.log('删除缓存：', key);
        },
      },
      reducer(val: any) {
        return {
          index: val.index,
        };
      },
    }),
  ],
});

export default store;
