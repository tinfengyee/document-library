# ESlint <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-07-29 18:22:16
> LastEditTime: 2022-08-05 23:38:32
> Description:

## [CLI](https://cn.eslint.org/docs/user-guide/command-line-interface)

命令行工具有几个选项，你可以通过运行 `eslint -h` 查看所有选项。

```
eslint [options] file.js [file.js] [dir]

Basic configuration:
  --no-eslintrc                  Disable use of configuration from .eslintrc.*
  -c, --config path::String      Use this configuration, overriding .eslintrc.* config options if present
  --env [String]                 Specify environments
  --ext [String]                 Specify JavaScript file extensions - default: .js
  --global [String]              Define global variables
  --parser String                Specify the parser to be used
  --parser-options Object        Specify parser options
  --resolve-plugins-relative-to path::String  A folder where plugins should be resolved from, CWD by default

Specifying rules and plugins:
  --rulesdir [path::String]      Use additional rules from this directory
  --plugin [String]              Specify plugins
  --rule Object                  Specify rules

Fixing problems:
  --fix                          Automatically fix problems
  --fix-dry-run                  Automatically fix problems without saving the changes to the file system
  --fix-type Array               Specify the types of fixes to apply (problem, suggestion, layout)

Ignoring files:
  --ignore-path path::String     Specify path of ignore file
  --no-ignore                    Disable use of ignore files and patterns
  --ignore-pattern [String]      Pattern of files to ignore (in addition to those in .eslintignore)

Using stdin:
  --stdin                        Lint code provided on <STDIN> - default: false
  --stdin-filename String        Specify filename to process STDIN as

Handling warnings:
  --quiet                        Report errors only - default: false
  --max-warnings Int             Number of warnings to trigger nonzero exit code - default: -1

Output:
  -o, --output-file path::String  Specify file to write report to
  -f, --format String            Use a specific output format - default: stylish
  --color, --no-color            Force enabling/disabling of color

Inline configuration comments:
  --no-inline-config             Prevent comments from changing config or rules
  --report-unused-disable-directives  Adds reported errors for unused eslint-disable directives

Caching:
  --cache                        Only check changed files - default: false
  --cache-file path::String      Path to the cache file. Deprecated: use --cache-location - default: .eslintcache
  --cache-location path::String  Path to the cache file or directory

Miscellaneous:
  --init                         Run config initialization wizard - default: false
  --debug                        Output debugging information
  -h, --help                     Show help
  -v, --version                  Output the version number
  --print-config path::String    Print the configuration for the given file
```

## install

```
npm i eslint -D
npm init @eslint/config
```

## [.eslintignore](https://cn.eslint.org/docs/user-guide/configuring#eslintignore)

Globs 匹配使用 [node-ignore](https://github.com/kaelzhang/node-ignore)，所以大量可用的特性有：

- 以 `#` 开头的行被当作注释，不影响忽略模式。
- 路径是相对于 `.eslintignore` 的位置或当前工作目录。通过 `--ignore-pattern` [command](https://cn.eslint.org/docs/user-guide/command-line-interface#--ignore-pattern) 传递的路径也是如此。
- 忽略模式同 `.gitignore` [规范](https://git-scm.com/docs/gitignore)
- 以 `!` 开头的行是否定模式，它将会重新包含一个之前被忽略的模式。
- 忽略模式依照 `.gitignore` [规范](https://git-scm.com/docs/gitignore).

你可以通过在项目根目录创建一个 .eslintignore 文件告诉 ESLint 去忽略特定的文件和目录。.eslintignore 文件是一个纯文本文件，其中的每一行都是一个 glob 模式表明哪些路径应该忽略检测。例如，以下将忽略所有的 JavaScript 文件：

```
**/*.js

 # Valid
/root/src/*.js

# Invalid
\root\src\*.js
```

# [Prettier](https://prettier.io/docs/en/rationale.html)

## 用法

总结：

- 在您的项目中本地安装 Prettier 的精确版本。这可以确保项目中的每个人都获得完全相同版本的 Prettier。即使是 Prettier 的补丁版本也可能导致格式略有不同，因此您不希望不同的团队成员使用不同的版本并来回格式化彼此的更改。
- 添加一个`.prettierrc.json`让您的编辑知道您正在使用 Prettier。
- 添加一个`.prettierignore`让您的编辑器知道哪些文件*不要*触摸，以及能够运行`prettier --write .`以格式化整个项目（不会破坏您不想要的文件，或阻塞生成的文件）。
- 在 CI 中运行`prettier --check .`以确保您的项目保持格式化。
- 从您的编辑器运行 Prettier 以获得最佳体验。
- 使用[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)让 Prettier 和 ESLint 一起玩得很好。
- 设置一个预提交挂钩以确保每个提交都被格式化。

## INSTALL

```
npm install --save-dev --save-exact prettier

echo {}> .prettierrc.json
```
## .prettierignore

```
# Ignore artifacts:
build
coverage

# Ignore all HTML files:
*.html
```

现在，使用 Prettier 格式化所有文件：

```
npx prettier --write .
```

`prettier --write .`非常适合格式化所有内容，但对于大型项目可能需要一点时间。你可以运行`prettier --write app/`格式化某个目录，或者`prettier --write app/components/Button.js`格式化某个文件。或者使用*glob* like`prettier --write "app/**/*.test.js"`格式化目录中的所有测试（请参阅[fast-glob](https://github.com/mrmlnc/fast-glob#pattern-syntax)以了解支持的 glob 语法）。

如果您有 CI 设置，请在其中运行以下命令以确保每个人都运行 Prettier。这避免了合并冲突和其他协作问题！

```bash
npx prettier --check .
```

`--check`就像`--write`，但只检查文件是否已经格式化，而不是覆盖它们。`prettier --write`并且`prettier --check`是运行 Prettier 最常用的方法。

## 与 ESlint、Pre-commit Hook、Vue 集成

- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) (解决与 eslint 冲突)
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)

- [Pre-commit Hook](https://prettier.io/docs/en/precommit.html)

- [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) 

# [配置 Git 处理行结束符](https://docs.github.com/cn/get-started/getting-started-with-git/configuring-git-to-handle-line-endings)

EOL (End of line)

# [Expected linebreaks to be 'LF' but found 'CRLF' linebreak-style](https://stackoverflow.com/questions/37826449/expected-linebreaks-to-be-lf-but-found-crlf-linebreak-style)

