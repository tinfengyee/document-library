# references <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-09-19 19:32:34
> LastEditTime: 2022-09-19 19:35:31
> Description: NO Desc

> [详解TypeScript项目中的tsconfig.json配置](https://blog.51cto.com/u_15689678/5587871)


- ​​references​​ 指定工程引用依赖

在项目开发中，有时候我们为了方便将前端项目和后端​​node​​项目放在同一个目录下开发，两个项目依赖同一个配置文件和通用文件，但我们希望前后端项目进行灵活的分别打包，那么我们可以进行如下配置：

```JSON
Project
  - src
    - client //客户端项目
      - index.ts // 客户端项目文件
      - tsconfig.json // 客户端配置文件
        {
          "extends": "../../tsconfig.json", // 继承基础配置
          "compilerOptions": {
            "outDir": "../../dist/client", // 指定输出目录
          },
          "references": [ // 指定依赖的工程
            {"path": "./common"}
          ]
        }
    - common // 前后端通用依赖工程
      - index.ts  // 前后端通用文件
      - tsconfig.json // 前后端通用代码配置文件
        {
          "extends": "../../tsconfig.json", // 继承基础配置
          "compilerOptions": {
            "outDir": "../../dist/client", // 指定输出目录
          }
        }
    - server // 服务端项目
      - index.ts // 服务端项目文件
      - tsconfig.json // 服务端项目配置文件
        {
          "extends": "../../tsconfig.json", // 继承基础配置
          "compilerOptions": {
            "outDir": "../../dist/server", // 指定输出目录
          },
          "references": [ // 指定依赖的工程
            {"path": "./common"}
          ]
        }
  - tsconfig.json // 前后端项目通用基础配置
    {
      "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "strict": true,
        "composite": true, // 增量编译
        "declaration": true
      }
    }
```
这样配置以后，就可以单独的构建前后端项目。
- 前端项目构建

```
tsc -v src/client
```

- 后端项目构建
```
tsc -b src/server
```
- 输出目录

```
roject
 - dist 
  - client
    - index.js
    - index.d.ts
  - common
    - index.js
    - index.d.ts
  - server
    - index.js
    - index.d.ts
```