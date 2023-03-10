/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-02-27 10:58:25
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-10 11:05:44
 * @FilePath: /vue-ts-threejs/src/store/index.ts
 * @Description: vuex 数据共享模型，可自行定义存储数据
 */
import { ref } from 'vue';
export const dataStore = {
  state: {
    userInfo: ref({}),
    token: ref(''),
  },
  getters: {
    token: (state: any) => state.token,
    userInfo: (state: any) => state.userInfo,
  },
  mutations: {
    setUserInfo(state: any, userInfo: any) {
      state.userInfo = userInfo;
    },
    setToken(state: any, token: string) {
      state.token = token;
    },
  },
  actions: {
    updataUserInfo({ commit }: { commit: any }) {
      return new Promise((resolve) => {
        const data = {
          age: 10,
          name: 'lx1',
          class: '150',
        };
        setTimeout(function () {
          commit('setUserInfo', data);
          console.log('去保存vuex', data);
          return resolve(data);
        }, 3000);
      });
    },
  },
};

export default dataStore;
