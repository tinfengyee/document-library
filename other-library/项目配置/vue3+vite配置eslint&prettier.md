# vue3+vite配置eslint&prettier <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-09-18 16:36:49
> LastEditTime: 2022-09-18 18:07:38
> Description: NO Desc

# 初始化项目

```bash
npm init vue@3
// or
npm create vite@latest
```

# 集成 eslint

## eslint 相关配置说明

### 环境配置 env

**一个环境定义了一组预定义的全局变量。可用的环境包括**

- 一个环境定义了一组预定义的全局变量。可用的环境包括
- `browser` - 浏览器环境中的全局变量。
- `node` - Node.js 全局变量和 Node.js 作用域。
- `commonjs` - CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)。
- `shared-node-browser` - Node.js 和 Browser 通用全局变量。
- `es6` - 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
- `worker` - Web Workers 全局变量。
- `amd` - 将 require() 和 define() 定义为像 amd 一样的全局变量。
- `mocha` - 添加所有的 Mocha 测试全局变量。
- `jasmine` - 添加所有的 Jasmine 版本 1.3 和 2.0 的测试全局变量。
- `jest` - Jest 全局变量。
- `phantomjs` - PhantomJS 全局变量。
- `protractor` - Protractor 全局变量。
- `qunit` - QUnit 全局变量。
- `jquery` - jQuery 全局变量。
- `prototypejs` - Prototype.js 全局变量。
- `shelljs` - ShellJS 全局变量。
- `meteor` - Meteor 全局变量。
- `mongo` - MongoDB 全局变量。
- `applescript` - AppleScript 全局变量。
- `nashorn` - Java 8 Nashorn 全局变量。

### 插件相关 plugins

- `ESLint` 支持使用第三方插件。在使用插件之前，你必须使用 `npm` 安装它。

- 在配置文件里配置插件时，可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略 `eslint-plugin-` 前缀

- `ESLint` 将加载与用户通过从项目 Node 交互解释器运行 (`'eslint-plugin-pluginname'`) 获得的相同的插件

### 规则配置 rules

- 配置定义在插件中的一个规则的时候，你必须使用 插件名/规则ID 的形式
- `"rules": {"plugin1/rule1": "error"}`
- 规则 `plugin1/rule1` 表示来自插件 `plugin1` 的 `rule1` 规则
- 当指定来自插件的规则时，确保删除 `eslint-plugin-` 前缀。`ESLint` 在内部只使用没有前缀的名称去定位规则

### 异常等级配置

- "`off`" 或 0 - 关闭规则
- "`warn`" 或 1 - 开启规则，使用警告级别的错误：`warn` (不会导致程序退出)
- "`error`" 或 2 - 开启规则，使用错误级别的错误：`error` (当被触发的时候，程序会退出)

### extend 规则继承

- `plugins` 属性值 可以省略包名的前缀 `eslint-plugin-`。
- `extends` 属性值可以由以下组成：
- ·  `plugin:`
- ·  包名 (省略了前缀，比如，react)
- ·  /
- ·  配置名称 (比如 `recommended`)

>  例子：`plugin:@typescript-eslint/recommended` ，使用`@typescript-eslint` plugin的`recommended ` config 选项。
>
>  `extends` 集成了`plugin`，`rules`等规则，通常不需要再声明`plugin`，例如: `plugin:prettier/recommended`包含了 `"extends": ["prettier"],"plugins": ["prettier"],"rules":{...}`


## 安装依赖

```bash
npm i typescript eslint eslint-define-config eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

## 配置 `eslint-plugin-vue`

```js
module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  //jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
}
```

这个插件提供了一些预定义的配置。您可以通过将以下配置添加到`extends`.

- `"plugin:vue/base"`... 启用正确 ESLint 解析的设置和规则。
- 使用 Vue.js 3.x 的配置。
  - `"plugin:vue/vue3-essential"`... `base`，以及防止错误或意外行为的规则。
  - `"plugin:vue/vue3-strongly-recommended"`... 上面，加上大大提高代码可读性和/或开发体验的规则。
  - `"plugin:vue/vue3-recommended"`... 上面，加上强制执行主观社区默认值的规则，以确保一致性。
- 使用 Vue.js 2.x 的配置。
  - `"plugin:vue/essential"`... `base`，以及防止错误或意外行为的规则。
  - `"plugin:vue/strongly-recommended"`... 上面，加上大大提高代码可读性和/或开发体验的规则。
  - `"plugin:vue/recommended"`...以上，加上强制执行主观社区默认值以确保一致性的规则

## 配置`eslint-config-prettier`解决冲突

关闭所有不必要或可能与[Prettier](https://github.com/prettier/prettier)冲突的规则。

添加`"prettier"`到`.eslintrc.*`文件中的“扩展”数组。确保把它放在**最后，**这样它就有机会覆盖其他配置。

```js
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

## 配置 `eslint-plugin-prettier` 

将prettier作为ESLint规范来使用。

```js
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

**推荐配置**：

该插件附带一个`plugin:prettier/recommended`配置，可以一次性设置插件`eslint-config-prettier`。

要添加`plugin:prettier/recommended`作为你的*最后一个*扩展。

```js
{
  "extends": ["plugin:prettier/recommended"]
}
```

究竟是`plugin:prettier/recommended`做什么的？

好吧，这就是它的扩展：

```js
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off"
  }
}
```

- `"extends": ["prettier"]`启用配置 from `eslint-config-prettier`，这会关闭一些与 Prettier 冲突的 ESLint 规则。
- `"plugins": ["prettier"]`注册这个插件。
- `"prettier/prettier": "error"`打开这个插件提供的规则，它在 ESLint 中运行 Prettier。
- `"arrow-body-style": "off"`并`"prefer-arrow-callback": "off"`关闭两个不幸与这个插件有问题的 ESLint 核心规则 

## 配置 ESLint 命令

```json
"lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"
```

## `.eslintrc.js` 规则文件

```js
// @ts-check
// 类型检查（//在 .eslintrc.js 第一行使用@ts-check）
const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  /* 指定如何解析语法。*/
  parser: 'vue-eslint-parser',
  /* 优先级低于parse的语法解析配置 */
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:vue/vue3-recommended', // eslint-plugin-vue 规则 https://eslint.vuejs.org/rules/
    'eslint:recommended', // eslint 规则 https://cn.eslint.org/docs/rules/
    'plugin:@typescript-eslint/recommended', // // typescript-eslint 规则 https://typescript-eslint.io/rules/
    // 'prettier', // 必须放在后面 。 这个应该可以去掉，下面那个配置自带了
    'plugin:prettier/recommended', // 必须放在后面
    // 'plugin:jest/recommended', // jest
  ],
  overrides: [],
  rules: {
    // 'vue/script-setup-uses-vars': 'error', // vue-eslint-parser使用v9.0.0 或更高版本时不需要此规则。
    '@typescript-eslint/no-var-requires': 'off', // 禁止require除导入语句外的语句
    '@typescript-eslint/no-explicit-any': 'off', // 禁止该any类型。explicit（明确的）
    'no-empty-function': 'off', // Note: you must disable the base rule as it can report incorrect errors
    '@typescript-eslint/no-empty-function': 'off', // 禁止空函数。
    'no-use-before-define': 'off', // 在定义之前禁止使用变量。
    '@typescript-eslint/no-use-before-define': 'off', // 在定义之前禁止使用变量。
    '@typescript-eslint/explicit-function-return-type': 'off', // 需要函数和类方法的显式返回类型。
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 要求导出函数和类的公共类方法的显式返回和参数类型。
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off', // 禁止@ts-<directive>注释或要求指令后的描述。
    '@typescript-eslint/ban-types': 'off', // 禁止某些类型
    '@typescript-eslint/no-non-null-assertion': 'off', // !禁止使用后缀运算符的非空断言。foo.bar!.includes('baz'); =》 foo.bar?.includes('baz') ?? false;
    'space-before-function-paren': 'off', // 在函数括号之前强制执行一致的间距。
    '@typescript-eslint/space-before-function-paren': 'off', // 在函数括号之前强制执行一致的间距。
    // vue
    // 强制使用驼峰命名
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false, // 则仅检查已注册的组件
        ignores: [], // 要忽略的元素名称 "/^name/"
      },
    ],
    // 'vue/custom-event-name-casing': 'off', //  强制自定义事件名称为 camelCase
    'vue/attributes-order': 'off', // 强制执行属性顺序
    'vue/v-on-event-hyphenation': 'off', // 对模板中的自定义组件强制执行 v-on 事件命名样式 @customEvent => @custom-event
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为多字 Todo => todo-item
    'vue/one-component-per-file': 'off', // 强制每个组件都应该在自己的文件中
    // 'vue/html-closing-bracket-newline': 'off', // 在标签的右括号之前要求或禁止换行
    'vue/max-attributes-per-line': 'off', // 强制每行的最大属性数
    // 'vue/multiline-html-element-content-newline': 'off', // 在多行元素的内容之前和之后需要换行符
    'vue/singleline-html-element-content-newline': 'off', // 在单行元素的内容之前和之后需要换行符
    'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
    'vue/require-default-prop': 'off', // 需要 props 的默认值
    'vue/html-self-closing': [
      // 强制执行自闭式
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
  },
  globals: {
    Nullable: true,
  },
})

```

## `.eslintignore` 忽略文件

```
*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
.husky
.local
/bin
.eslintrc.js
prettier.config.js
/src/mock/*
```

# 集成 prettier

代码格式化工具

## 安装依赖

```bash
npm i prettier eslint-config-prettier eslint-plugin-prettier -D
```

## `.prettierrc.js` 规则文件

```javascript
module.exports = {
  // 一行最多 100 字符
  printWidth: 100,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾不需要有分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 尾随逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 "<lf|crlf|cr|auto>"
  endOfLine: 'lf',
  // 是否缩进 Vue 文件中的代码<script>和<style>标签
  vueIndentScriptAndStyle: true,
  // 如果散文超过打印宽度，则换行。
  // proseWrap: 'never',
  // HTML 空白敏感性 <css (default)|strict|ignore>
  // htmlWhitespaceSensitivity: 'strict',
}

```

## `.prettierignore` 忽略文件

```
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

# 集成 Stylelint 配置

> 我未测试集成，请参考链接：https://juejin.cn/post/6878121082188988430

负责样式文件代码质量检查，规则列表详见[官网](https://link.juejin.cn?target=http%3A%2F%2Fstylelint.cn%2Fuser-guide%2Frules%2F)。

## 安装依赖

- [stylelint-config-standard：](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fstylelint%2Fstylelint-config-standard) 官网提供的 css 标准
- [stylelint-config-recess-order：](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fstormwarning%2Fstylelint-config-recess-order) 属性排列顺序
- [stylelint-prettier：](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fstylelint-prettier) 基于 `prettier` 代码风格的 `stylelint` 规则
- [stylelint-config-prettier：](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fstylelint-config-prettier) 禁用所有与格式相关的 Stylelint 规则，解决 prettier 与 stylelint 规则冲突，确保将其放在 `extends` 队列最后，这样它将覆盖其他配置。

```bash
npm install -D stylelint stylelint-config-standard stylelint-config-rational-order stylelint-prettier stylelint-config-prettier
```

##  `.stylelintrc.js` 文件

```js
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-prettier/recommended'],
  rules: {
    // 'prettier/prettier': [true, { singleQuote: false }],
    // at-rule-no-unknown: 屏蔽一些scss等语法检查
    'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'extend', 'content'] }], // 禁止使用未知的 at 规则
    'rule-empty-line-before': [
      // 要求或禁止在规则声明之前有空行
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'at-rule-empty-line-before': [
      // 要求或禁止在 at 规则之前有空行
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'comment-empty-line-before': [
      // 要求或禁止在注释之前有空行
      'always',
      {
        except: ['first-nested'],
        ignore: ['stylelint-commands'],
      },
    ],
    'block-no-empty': true, // 禁止出现空块
    'declaration-empty-line-before': 'never', // 要求或禁止在声明语句之前有空行。
    'declaration-block-no-duplicate-properties': true, // 在声明的块中中禁止出现重复的属性
    'declaration-block-no-redundant-longhand-properties': true, // 禁止使用可以缩写却不缩写的属性。
    'shorthand-property-no-redundant-values': true, // 禁止在简写属性中使用冗余值。
    'function-url-quotes': 'always', // 要求或禁止 url 使用引号。
    'color-hex-length': 'short', // 指定十六进制颜色是否使用缩写
    'color-named': 'never', // 要求 (可能的情况下) 或 禁止使用命名的颜色
    'comment-no-empty': true, // 禁止空注释
    'font-family-name-quotes': 'always-unless-keyword', // 指定字体名称是否需要使用引号引起来 | 期待每一个不是关键字的字体名都使用引号引起来
    'font-weight-notation': 'numeric', // 要求使用数字或命名的 (可能的情况下) font-weight 值
    'property-no-vendor-prefix': true, // 禁止属性使用浏览器引擎前缀
    'value-no-vendor-prefix': true, // 禁止给值添加浏览器引擎前缀
    'selector-no-vendor-prefix': true, // 禁止使用浏览器引擎前缀
    'no-descending-specificity': null, // 禁止低优先级的选择器出现在高优先级的选择器之后
  },
};
```

## `.stylelintignore` 忽略文件

```
/dist/*
/public/*
public/*
```

# 集成 husky + lint-staged

[使用vite脚手架创建vue3项目配置eslint+stylelint](https://segmentfault.com/a/1190000041844480)

# 集成 VSCode

## 配置工作区 `settings.json`

```json
{
  "typescript.tsdk": "./node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  //===========================================
  //============= Editor ======================
  //===========================================
  "editor.tabSize": 2,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  //===========================================
  //============= files =======================
  //===========================================
  "files.eol": "\n",
  "files.exclude": {
    "**/.cache": true,
    "**/.editorconfig": true,
    "**/.eslintcache": true,
    "**/bower_components": true,
    "**/.idea": true,
    "**/tmp": true,
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true
  },
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/.vscode/**": true,
    "**/node_modules/**": true,
    "**/tmp/**": true,
    "**/bower_components/**": true,
    "**/dist/**": true,
    "**/yarn.lock": true,
    "**/package-lock.json": true
  },
  "stylelint.enable": true,
  "stylelint.packageManager": "npm",
  "path-intellisense.mappings": {
    "/@/": "${workspaceRoot}/src"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // "[markdown]": {
  //   "editor.defaultFormatter": "esbenp.prettier-vscode"
  // },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[vue]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": false
    }
  }
}
```

## Type Support for **`.vue`** Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

# 需要用到的库

- [ESLint](https://cn.eslint.org/docs/user-guide/configuring) : JavaScript 和 JSX 检查工具
- [eslint-define-config](https://www.npmjs.com/package/eslint-define-config) : 提供 `.eslintrc.js` 自动建议
- [eslint-plugin-vue](https://eslint.vuejs.org/) : 使用 ESLint 检查 `.vue文件` 的 `<template>` 和 `<script>`
- [prettier](https://prettier.io/docs/en/install.html) : 代码格式化工具
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) : 将prettier作为ESLint规范来使用

- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) : 解决ESLint中的样式规范和prettier中样式规范的冲突，以prettier的样式规范为准，使ESLint中的样式规范自动失效
- [@typescript-eslint](https://typescript-eslint.io/docs/)
  - `@typescript-eslint/parser` : ESLint的解析器，用于解析typescript，从而检查和规范Typescript代码
  - `@typescript-eslint/eslint-plugin` : ESLint插件，包含了各类定义好的检测Typescript代码的规范 
- [@vue/eslint-config-typescript ](https://github.com/vuejs/eslint-config-typescript) : 用于 Vue 的 `eslint-config-typescript`。可用规则，请参阅[@typescript-eslint/eslint-plugin](https://typescript-eslint.io/rules/)。
- [@vue/eslint-config-prettier](https://github.com/vuejs/eslint-config-prettier) : 用于 Vue 的 `eslint-config-prettier`
- [https://stylelint.io/](https://stylelint.io/)

# 参考文章

- [vue3+vite配置eslint&prettier](https://juejin.cn/post/6975442828386107400)
- [实战--为vite-vue3-ts项目添加 eslint + prettier + lint-staged 项目规范](https://juejin.cn/post/7043702363156119565)
- [项目中 Prettier + Stylelint + ESlint 配置](https://juejin.cn/post/6878121082188988430)
- 参考项目
  - https://github.com/anncwb/vue-vben-admin
  - https://github.com/tinfengyee/chat-system-vue-eslint

