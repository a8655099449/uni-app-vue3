<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-06 17:59:28
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-13 16:01:48
 * @FilePath: /uni-app-vue3/readme.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# uni-app vue3 模板

## 环境

vscode 版本: 1.7.0 及以上

pnpm 7.29.0、 yarn 1.22.19、npm 8.11.0 （推荐使用 pnpm）

node v16.16.0 及以上(建议)

## 安装

可以使用`npm` \ `cnpm` \ `yarn` \ `pnpm` 等安装工具。

建议使用`pnpm`

```
pnpm i
```

## 工程目录

## 开发目录

```bash
.
┌─components            符合vue组件规范的uni-app组件目录
│  └─Footer             可复用的Footer组件
│     └─index.vue       组件嵌套可建文件夹嵌套，默认index
├─pages                 业务页面文件存放的目录（小程序：  只存放主页及主包页面）
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─index.vue        list页面
├─packA                 注意：小程序才进行分包业务（packA,packB A/B代表业务名称，目录可与主工程类似，可有自己的components,utils...）
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│  │   └─list.vue        list页面
│  └─components
│     └─Footer             可复用的Footer组件
│         └─index.vue       组件嵌套可建文件夹嵌套，默认index
│
│
├─static                存放应用引用的本地静态资源的目录，注意:（由于小程序对资源200k大小有限制,所以该处只存放必须图标资源）
├─libs                  引入第三方库文件
├─store                 采用vuex进行数据缓存
├─utils                 公共工具目录
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
├─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见
├─manifest.json         项目配置文件（如：应用名称、appid、权限配置 ...）
├─.eslintignore         eslint 忽略文件配置
├─.eslintrc             eslint  规则配置
├─.gitignore            git 上传忽略文件配置
├─.prettierignore       prettier 规则效验忽略文件配置
├─commitlint.config.js  提交信息规范配置
├─prettier.config.js    prettier 规则效验文件配置
└─uni.scss              这里是uni-app内置的常用样式变量

├─static 在 src 目录同级有个 static 目录，该目录主要存放 cdn 文件，后部署服务端（该文件不参与打包编译。）

```

## 启动

uni-app 提供了多种环境的启动方式，可以根据`package.json`的`script`字段，来选择执行

比如编译微信小程序的方式

```sh
pnpm run dev:mp-weixin
```

## 已经集成的功能

- eslint 代码验证，以及保存自动修复
- git-commit 代码提交前验证代码格式

## 相关文档地址

- [uni-app 官方文档](https://zh.uniapp.dcloud.io/)
- [vue3 官方文档](https://cn.vuejs.org/)
- [vitejs 官方文档](https://cn.vitejs.dev/)
- [微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

## 关于 git commit 的格式

git commit 的 message 做了格式验证，请参照以下的格式进行提交

```sh
git commit -m 'feat: 我增加了一个功能'
git commit -m 'fix: 修复了某个bug'
git commit -m 'docs: 文档变更'
git commit -m 'style: 样式变更'
```

## 技术栈

1. UI 库：uni-ui
