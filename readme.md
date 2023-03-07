# uni-app vue3 模板

## 安装
可以使用`npm` \ `cnpm` \ `yarn` \ `pnpm` 等安装工具。

建议使用`pnpm`

```
pnpm i
```

## 启动

uni-app提供了多种环境的启动方式，可以根据`package.json`的`script`字段，来选择执行

比如编译微信小程序的方式

```sh
pnpm run dev:mp-weixin
```


## 已经集成的功能
- eslint代码验证，以及保存自动修复
- git-commit 代码提交前验证代码格式



## 相关文档地址

- [uni-app 官方文档](https://zh.uniapp.dcloud.io/)
- [vue3 官方文档](https://cn.vuejs.org/)
- [vitejs 官方文档](https://cn.vitejs.dev/)
- [微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)


## 关于git commit 的格式
git commit的message 做了格式验证，请参照以下的格式进行提交

```sh
git commit -m 'feat: 我增加了一个功能'
git commit -m 'fix: 修复了某个bug'
git commit -m 'docs: 文档变更'
git commit -m 'style: 样式变更'
```
## 相关文档地址
