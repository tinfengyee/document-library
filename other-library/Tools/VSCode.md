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
