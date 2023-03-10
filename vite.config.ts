/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-07 17:18:49
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-10 16:29:38
 * @FilePath: /uni-app-vue3/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig, loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log(env.VITE_BASE_API);

  return {
    plugins: [uni()],
  };
});
