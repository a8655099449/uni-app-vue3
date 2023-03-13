/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-07 17:18:49
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-13 11:24:36
 * @FilePath: /uni-app-vue3/prettier.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  // 设置每行的最大长度为100
  printWidth: 100,
  // 使用分号
  semi: true,
  // 对 Vue 文件中的 <script> 和 <style> 部分进行缩进
  vueIndentScriptAndStyle: false,
  // 使用单引号
  singleQuote: true,
  // 在对象或数组最后一个元素后面添加逗号
  trailingComma: 'all',
  // 不自动换行
  proseWrap: 'never',
  // HTML 中空格的敏感性设置为 strict
  htmlWhitespaceSensitivity: 'strict',
  // 根据操作系统自动设置换行符
  endOfLine: 'auto',
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html',
      },
    },
  ],
};
