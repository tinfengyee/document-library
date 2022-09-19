# VS CODE <!-- omit in toc -->

# 1. Settings

设置文件

> 文件路径：C:\Users\tinfe\AppData\Roaming\Code\User\settings.json

```json
{
    "security.workspace.trust.enabled": false,
    "workbench.iconTheme": "vscode-icons",
    "diffEditor.codeLens": true,
    "editor.fontSize": 16,
    "editor.tabSize": 2,
    "files.autoGuessEncoding": true,
    "files.autoSave": "onFocusChange",
    "terminal.integrated.defaultProfile.windows": "Command Prompt",
    "code-runner.runInTerminal": true,
    "editor.suggest.snippetsPreventQuickSuggestions": false,
    "editor.suggestSelection": "recentlyUsedByPrefix",
    "[markdown]": {
        "editor.unicodeHighlight.ambiguousCharacters": false,
        "editor.unicodeHighlight.invisibleCharacters": false,
        "editor.wordWrap": "on",
        "editor.quickSuggestions": true,
        "editor.suggestSelection": "recentlyUsedByPrefix"
    },
    "editor.quickSuggestions": {
        "other": "on",
        "comments": "off",
        "strings": "off"
    },
    "files.insertFinalNewline": true,
    "editor.guides.bracketPairs": "active",
    "editor.bracketPairColorization.enabled": true,
    "markdown-preview-github-styles.colorTheme": "light",
    "markdown.extension.toc.plaintext": true,
    
}
```

# 2. Extensions

拓展插件

```
名称: Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code
ID: MS-CEINTL.vscode-language-pack-zh-hans

名称: Code Runner
ID: formulahendry.code-runner

名称: Color Picker
ID: anseki.vscode-color

名称: file-tree-generator
ID: Shinotatwu-DS.file-tree-generator

名称: Image preview
ID: kisstkondoros.vscode-gutter-preview

名称: Live Server
ID: ritwickdey.LiveServer

名称: Markdown All in One
ID: yzhang.markdown-all-in-one

名称: Markdown Preview Github Styling
ID: bierner.markdown-preview-github-styles

名称: Path Intellisense
ID: christian-kohler.path-intellisense
--
  "path-intellisense.mappings": {
    "/@/": "${workspaceRoot}/src"
  },
--

名称: Renamer 文件批量重命名工具
ID: zdldove.renamer

名称: Vetur
ID: octref.vetur

名称: vscode-icons
ID: vscode-icons-team.vscode-icons

名称: ZipFS - a zip file system
ID: arcanis.vscode-zipfs
```

# 3. Snippets

代码片段

> 文件路径：C:\Users\tinfe\AppData\Roaming\Code\User\snippets

## 3.1. markdown.json

```json
{
	"Table":{
		"prefix": "tab table",
		"body": [
			"| ${1:Head}  |  $2 |",
			"|---|---|",
			"| $3  |   |",
			"$0"
		],
		"description": "Insert a table"
	},
	"Toc": {
		"prefix": "toc",
		"body": [
			"# ${1:Title} <!-- omit in toc -->",
			"$0"
		]
	}
}

```

# 4. Keyboard Shortcuts

快捷指令

> 文件路径：C:\Users\tinfe\AppData\Roaming\Code\User\keybindings.json

# 5. Extensions 推荐

- [插件推荐 1](https://segmentfault.com/a/1190000019936846)
- [插件推荐 2](https://www.cnblogs.com/crab-in-the-northeast/p/great-features-and-plugins-for-vscode.html)

# 6. 多行编辑快捷键

[[ VS Code实用快捷键 00 ] 同时编辑多处](https://zhuanlan.zhihu.com/p/369369584)

```
1. 批量选中全局匹配项
Mac : ⌘ command + ⇧ shift + L
Windows : ⇧ shift + ⌃ ctrl + L
鼠标点击变量，然后按快捷键，即可同时编辑多处

2. 批量选中局部匹配项
Mac : ⌘ command + D
Windows : ⌃ ctrl + D
鼠标点击变量，然后按快捷键会选中当前匹配项，继续每按一次快捷键，都会向下多选中一个相同匹配项。

3. 取消光标操作
抬起快捷键，单击未被选中的位置即可。
或使用 ⌘ command + U (Windows 为 ⌃ ctrl + U) 取消光标操作。

4. 多光标自定义批量编辑
1)按住⌥ alt，用鼠标左键点击，可以出现多个光标：

2)按住 ⌘ command + ⌥ alt (Windows 为 ⌃ ctrl + ⌥ alt)，再按键盘向上或者向下的键，可以使一列上出现多个光标：类似鼠标中键垂直拖动

3)先点击某一位置，按住 ⇧ shift + ⌥ alt，再使用鼠标拖动，也可以出现竖直的列光标，可以同时选中多列：类似鼠标中键拖动
4)选中一段文字，按⇧ shift + ⌥ alt + I，可以在每行末尾出现光标：

5. 重命名变量
快捷键：F2
鼠标点击声明过的变量，然后按F2，即可重构变量名，VScode 会自动分析该变量的引用，将用到的地方一起进行修改。
如果代码较多，这种方式比较保险，因为他会分析变量的使用，而上一种方式只是全局的搜素与替换。

```

# 7. 使用技巧

## 使用内置浏览器

HTML使用 Live Preview 插件。

Vue等框架使用命令，run the `Simple Browser: Show` command that is already built-in with VS Code.
