module.exports = {
  root: true, // ESLint的解析器将从当前目录开始查找配置文件
  env: {
    browser: true, // 浏览器环境的全局变量
    node: true, // Node.js全局变量和Node.js范围
    es6: true, // 启用ES6语法
  },
  globals: {
    uni: true,
    wx: true,
    getApp: true,
  },
  parser: 'vue-eslint-parser', // 解析Vue文件的解析器
  parserOptions: {
    parser: '@typescript-eslint/parser', // TypeScript的解析器
    ecmaVersion: 2020, // 使用ECMAScript版本
    sourceType: 'module', // module类型的JavaScript代码
    jsxPragma: 'React', // 设置JSX的pragma
    ecmaFeatures: {
      jsx: true, // 启用JSX
      tsx: true, // 启用TSX
    },
  },
  plugins: ['@typescript-eslint', 'prettier', 'import', 'html'], // 使用的插件
  extends: [
    'eslint:recommended', // ESLint推荐规则
    'plugin:@typescript-eslint/recommended', // 推荐的TypeScript规则
    'plugin:vue/vue3-recommended', // 推荐的Vue3规则
    'prettier', // 使用Prettier的规则
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.vue'], // 应用于这些文件的覆盖规则
      rules: {
        'no-undef': 'off', // 不强制执行未定义变量的检查，因为TypeScript有自己的检查机制
      },
    },
  ],
  rules: {
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'], // 禁止使用特定的语法结构
    camelcase: ['error', { properties: 'never' }], // 强制驼峰命名法
    'no-var': 'error', // 禁用var
    'no-empty': ['error', { allowEmptyCatch: true }], // 不允许空的代码块，除非它们被用作catch块
    'no-void': 'error', // 禁用void操作符
    'prefer-const': ['warn', { destructuring: 'all', ignoreReadBeforeAssign: true }], // 如果可能，使用const
    'prefer-template': 'error', // 建议使用模板字面量而不是字符串连接
    'object-shorthand': ['error', 'always', { ignoreConstructors: false, avoidQuotes: true }], // 要求对象字面量简写语法
    'block-scoped-var': 'error', // 强制在变量声明时使用块作用域
    'no-constant-condition': ['error', { checkLoops: false }], // 禁止在条件语句中出现常量表达式
    'no-redeclare': 'off', // 禁止重复声明变量
    '@typescript-eslint/no-redeclare': 'error', // 禁止重复声明变量
    '@typescript-eslint/ban-ts-comment': 'off', // 允许使用特定类型的注释

    // 禁止使用特定的类型（ban-types）
    '@typescript-eslint/ban-types': 'off', //

    // 禁止在导出的函数和类的公共类方法上省略显式类型声明（explicit-module-boundary-types）
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // 禁止空函数（no-empty-function）
    '@typescript-eslint/no-empty-function': 'off',

    // 禁止使用 any 类型（no-explicit-any）
    '@typescript-eslint/no-explicit-any': 'off',

    // 允许使用非空断言运算符（!）（no-non-null-assertion）
    '@typescript-eslint/no-non-null-assertion': 'off',

    // 允许使用非 null 断言的可选链（no-non-null-asserted-optional-chain）
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',

    // 允许使用 require()（no-var-requires）
    '@typescript-eslint/no-var-requires': 'off',

    // 禁止出现未使用过的变量（no-unused-vars）
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    // 禁止出现未使用过的变量（no-unused-vars）
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    // 禁止使用 v-html 指令（no-v-html）
    'vue/no-v-html': 'off',

    // 强制要求组件 props 定义有默认值（require-default-prop）
    'vue/require-default-prop': 'off',

    // 强制要求显式声明 emits 事件（require-explicit-emits）
    'vue/require-explicit-emits': 'off',

    // 允许使用多个单词的组件名（multi-word-component-names）
    'vue/multi-word-component-names': 'off',

    // 强制使用一致的 prettier 风格（prettier/prettier）
    'prettier/prettier': 'error',

    // 禁止导入顺序错误（import/first）
    'import/first': 'error',

    // 禁止重复导入（import/no-duplicates）
    'import/no-duplicates': 'error',

    // 强制导入顺序（import/order）
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],

        // 配置路径分组规则，根据 pattern 分组
        pathGroups: [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@vue/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'ant-design-vue',
            group: 'internal',
          },
        ],

        // 排除指定的 import 类型
        pathGroupsExcludedImportTypes: ['type'],
      },
    ],
  },
};
