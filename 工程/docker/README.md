# [get started](https://docs.docker.com/get-started/)

[get started](https://docs.docker.com/get-started/)

https://nodejs.org/zh-cn/docs/guides/nodejs-docker-webapp/

https://www.runoob.com/docker/docker-hello-world.html

[如何通俗解释Docker是什么？](https://www.zhihu.com/question/28300645)

[使用 PM2 在 Docker 上部署 Node.js Web 应用 _](https://yorkyu.cn/pm2-deploy-nodejs-on-docker-1f8acea34fa4.html)

[前端搞部署-docker遇见pm2](https://juejin.cn/post/6976834360511037453)



## docker copy

https://www.cnblogs.com/sparkdev/p/9573248.html

```
WORKDIR 命令为后续的 RUN、CMD、COPY、ADD 等命令配置工作目录。在设置了 WORKDIR 命令后，接下来的 COPY 和 ADD 命令中的相对路径就是相对于 WORKDIR 指定的路径。比如我们在 Dockerfile 中添加下面的命令：

WORKDIR /app
COPY checkredis.py .
```



# 问题

## pipe错误

[Error response from daemon: open \\.\pipe\docker_engine_windows: The system cannot find the fi](https://forums.docker.com/t/error-response-from-daemon-open-pipe-docker-engine-windows-the-system-cannot-find-the-file-specified/131750)

```
Try add Optional Feature - Container and Hyper-V to windows.
In Windows 11:
Apps → Optional features → More Windows features → Check Containers and Hyper-V and click OK

or try run:
Enable-WindowsOptionalFeature -Online -FeatureName containers –All
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V –All
```

或者

```
Enable-WindowsOptionalFeature -Online -FeatureName $(“Microsoft-Hyper-V”, “Containers”) -All
```

## 重启服务

尝试在 Powershell 中运行以下命令并启动 docker

```
Net stop com.docker.service
```

然后

```
Net start com.docker.service
```

## [Unable to find docker image locally](https://stackoverflow.com/questions/56512769/unable-to-find-docker-image-locally)

## [no matching manifest for windows/amd64 in the manifest list entries](https://stackoverflow.com/questions/48066994/docker-no-matching-manifest-for-windows-amd64-in-the-manifest-list-entries)

I had this same issue on Windows 10. I bypassed it by running the Docker daemon in experimental mode:

1. Right click Docker icon in the Windows System Tray
2. Go to *Settings*
3. Daemon
4. Advanced
5. Set the `"experimental": true`
6. Restart Docker