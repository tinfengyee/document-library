# vite里的tsconfig_node <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-09-19 21:57:34
> LastEditTime: 2022-09-19 21:59:22
> Description: NO Desc

- vite 里面的 `tsconfig.node.json` 作用是什么？

您需要两个不同的 TS 配置，因为该项目使用两个不同的执行 TypeScript 代码的环境：

您的应用程序（src文件夹）在浏览器内定位（将运行）
Vite 本身（包括它的配置）在您的 Node 内的计算机上运行，​​这是完全不同的环境（与浏览器相比），具有不同的 API 和约束
所以这两个环境有两种不同的配置和两组不同的源文件......

不，您可能不想删除，tsconfig.node.json但您可以将其重命名tsconfig.vite.json为使其目的更清晰

> - [Why does Vite create two TypeScript config files: tsconfig.json and tsconfig.node.json?](https://stackoverflow.com/questions/72027949/why-does-vite-create-two-typescript-config-files-tsconfig-json-and-tsconfig-nod)
> - [Should be able to use Node types in vite.config.ts by default #2031](https://github.com/vitejs/vite/issues/2031)