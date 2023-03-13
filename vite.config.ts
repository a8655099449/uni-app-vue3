/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-07 17:18:49
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-10 21:24:10
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

    server: {
      host: '127.0.0.1', // 指定服务器应该监听哪个 IP 地址
      port: 5000, // 指定开发服务器端口
      strictPort: true, // 若端口已被占用则会直接退出
      https: false, // 启用 TLS + HTTP/2
      open: true, // 启动时自动在浏览器中打开应用程序
      proxy: {
        // 配置自定义代理规则
        '/service-provide': {
          target: env.VITE_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
