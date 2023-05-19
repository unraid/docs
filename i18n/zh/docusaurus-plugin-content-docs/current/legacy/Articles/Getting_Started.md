# 入门指南

第 1 阶段：启动并完美运行 Unraid 所必要的手动设置

感谢您试用 Unraid。为了确保 Unraid
的启动与完美体验，您需要执行一些额外的步骤，从而获得 Unraid OS
的最佳表现。
我们正在努力使这些步骤自动化进行并在系统内部进行更改，以便将来无需手动执行。感谢您在此期间对我们的支持与理解！

## **下载 Unraid 试用版** {#下载_unraid_试用版}

要开始使用 Unraid，请[下载试用版](https://unraid.net/zh/下载) 并使用 USB
Creator Tool。

您也[可以通过手动方式](https://wiki.unraid.net/Articles/Getting_Started#Manual_Method_.28Legacy.29)来准备您的闪存设备\

### 如果您需要帮助，请访问[我们的中文论坛](https://forums.unraid.net/forum/88-chinese-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87/)!

更多 Unraid BIOS 和启动的相关信息，敬请参阅 :

[<https://wiki.unraid.net/Articles/Getting_Started#BIOS_and_Booting_Up>](Articles/Getting_Started#BIOS%20and%20Booting%20Up "wikilink")

## **查找您的局域网 IP** {#查找您的局域网_ip}

如果您选择启动 Unraid OS Headless，您可能需要知道您的局域网 IP 才能访问
OS webgui。通过您的路由器的管理界面，或通过终端 (\>_) 运行 Linux/Unix
命令 ifconfig ，均可完成这一步骤。

注意，仅在您无法直接通过 http://tower/ 或 http://tower.local
访问操作系统 WebGUI 时，才需要使用局域网 IP 访问。\

## **NTP 服务器设置** {#ntp_服务器设置}

为确保正确提交 Unraid 试用申请，您可能需要手动将 NTP
服务器调整为以下一项或多项：

ntp.ntsc.ac.cn

cn.ntp.org.cn

time.pool.aliyun.com

time1.cloud.tencent.com

如需进行调整，请转到"Settings"选项卡，选择 → "Date and
Time"，并将上述内容依次复制/粘贴到 NTP server
部分，然后单击"Apply"。同时，请确保此处也选择了正确的"Time
zone"（时区）。\
![](/docs/legacy/NTP.png "NTP.png")

这将确保您可以申请到 30 天的 Unraid 免费试用。

\

### 如果您需要帮助，请访问[我们的中文论坛](https://forums.unraid.net/forum/88-chinese-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87/)! {#如果您需要帮助请访问我们的中文论坛_1}

\

## **安装社区应用程序**

"Community Applications"（社区应用程序），包括 Unraid 社区的插件、Docker
容器和应用商城。若要安装，请转到"PLUGINS"（插件）标签页，选择"Install
Plugin"（安装插件）并复制粘贴下列 URL 的其中之一：

`https://gitee.com/BlueBuger/community.applications/raw/master/plugins/community.applications.plg`

或

`https://www.52help.net/ad/nas/Squidly271/community.applications/master/plugins/community.applications.plg`

完成上述操作后，Unraid WebGUI
的顶部栏上方将会新增一个"APPS"(应用)选项卡。

![](/docs/legacy/AppsTab.png "AppsTab.png")

## **安装中文语言包**

要安装 Unraid OS 的中文语言包，请转到 APPS→
Language（位于侧边栏）→单击如下图所示的安装按钮来下载"简体中文语言包\"。
![](/docs/legacy/Download.png "Download.png")

使用如下图所示的切换按钮，可以在中文与英文之间切换。
![](/docs/legacy/Switch_toggle.png "Switch_toggle.png")

通过 Unraid WebGUI
右上角的切换按钮，同样也可以实现中文和英文之间的来回切换：

![](/docs/legacy/Toprightbar.png "Toprightbar.png")

另一种找到语言包的方法是使用 CA
中的搜索栏。查找"Chinese"或者"简体中文语言包"都可以奏效！\
![](/docs/legacy/Chinese-Search.png "Chinese-Search.png")

## **使用 Docker** {#使用_docker}

为了能够拉取 Docker 镜像和容器，您可能需要编辑 Go
文件，从而可以在接近或位于中国境内的 CDN 中拉取镜像。相比于
*hub.docker.com*，用户往往能够更快地访问这些 CDN 并拉取镜像。

*注意：*以下文本包含了 Docker 在中国的几个 CDN
的链接，但由于不同用户的网络连接性有所区别，可能并非所有人都能够连接上这些
CDN。因此，我们强烈建议您进行测试，以便找到对您而言最友好的 CDN。在
WebGUI 中点击终端按钮：

![](/docs/legacy/Terminal.png "Terminal.png")

随后将弹出一个窗口。使用以下命令，以测试从选定的 CDN
链接中拉取某个特定镜像需要多长时间：

`time docker pull [CDN's Link]/linuxserver/qbittorrent`

之后您可能会看到如下的输出：

![](/docs/legacy/Output.png "Output.png")

上述图像显示需要 22.751 秒来拉取此镜像。更换 CDN
的链接并逐一测试，您将会找到最适合您的网络的
CDN。作为参考，测试用镜像的大小约为 390
MB。以下为一位用户提供的参考测试结果：\

#### CDN 测试结果 {#cdn_测试结果}

  所属组织        CDN 链接                         用户测试结果   备注
  --------------- -------------------------------- -------------- --------------------------------------------------------------------------------------------------
  网易            hub-mirror.c.163.com             22.751s
  阿里云          \[YourID\].mirror.aliyuncs.com   28.677s        需要注册。点击以下链接以获取 YourID: https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors
  Docker 官方源   docker.io                        20.883s        这是 Docker 的官方源，因此测试时无需在命令中添加\" \[CDN\'s Link\]/\"。
  中国科技大学    docker.mirrors.ustc.edu.cn       无响应
  Docker-cn       registry.docker-cn.com           无响应

可以看到，在该用户的网络情况下，CDN
并不比官方源快。因此，仅当您无法从官方源拉取镜像时，再执行后续步骤，因为与官方来源相比，所有
CDN
的镜像版本都在一定程度上有所延迟。但是，如果确实无法从官方源拉取镜像，则需要选择以下方式之一，将源更改为合适的
CDN。

## **编辑 Go 文件** {#编辑_go_文件}

1.  转至 主→ Flash→ 将"导出"一项的字段设为"是"，以便能够通过 SMB
    共享访问。
2.  在资源管理器中导航至 \\\\\[您的 Unraid 服务器名\]\\flash\\config\\
    并使用合适的文本编辑器来打开 Go 文件，例如 Notepad++、Visual Studio
    Code 等。注意：**请**
    **勿**使用记事本打开，否则可能产生一些错误的格式结尾。mkdir -p
    /etc/docker \# Update mirrors tee /etc/docker/daemon.json
    \<\<-\'EOF\' { \"registry-mirrors\" : \[
    \"http://docker.mirrors.ustc.edu.cn\",
    \"http://hub-mirror.c.163.com\"\] } EOF
3.  在文本编辑器中，添加下列代码：

`mkdir -p /etc/docker`\
`# Update mirrors`\
`tee /etc/docker/daemon.json <<-'EOF'`\
`{`\
` "registry-mirrors" : [`\
`  "http://docker.mirrors.ustc.edu.cn",`\
`  "http://hub-mirror.c.163.com"]`\
`}`\
`EOF`

4\. 保存更改，如有必要的话重启 Docker 服务。\

## 使用"User Scripts"插件 {#使用user_scripts插件}

1.  进入应用→ 搜索"User
    Scripts"，这是一个帮助用户自动运行自定义脚本的插件。单击安装按钮下载并安装它。
2.  转到设置→ 用户实用程序 → User Scripts，单击"ADD NEW
    SCRIPT"（新建脚本），然后为您的脚本输入一个名称，例如"docker.registry_mirrors"。单击"OK"。
3.  单击新脚本旁边的齿轮图标：

![](/docs/legacy/Docker_register_mirrors.png "Docker_register_mirrors.png")

随后单击第三个按钮 "EDIT SCRIPT"（编辑脚本）：
![](/docs/legacy/Edit_Script.png "Edit_Script.png")

4\. 输入下列代码，并单击"SAVE CHANGES"（保存更改）：

`#!/bin/bash`\
`#name=docker.registry_mirrors`\
`# 创建目录`\
`mkdir -p /etc/docker`\
`# 更新镜像源`\
`tee /etc/docker/daemon.json <<-'EOF'`\
`{`\
` "registry-mirrors" : [`\
`  "http://docker.mirrors.ustc.edu.cn",`\
`  "http://hub-mirror.c.163.com"]`\
`}`\
`EOF`\
`# 如有必要时，重启 Docker 服务`\
`is_docker_running=$(/etc/rc.d/rc.docker status | awk 'NR == 1 {print} ' | grep running)`\
`echo $is_docker_running`\
`if [ ! -z "$is_docker_running" ]; then`\
`   /etc/rc.d/rc.docker restart`\
`fi`

5\. 当您返回到用户脚本列表时，单击位于"RUN IN
BACKGROUND"（后台运行）按钮旁边的下拉框，选择"At First Array Start
Only"（仅在第一个阵列启动时），以确保在服务器重启和阵列启动后脚本能够自动运行。
![](/docs/legacy/Run_in_background.png "Run_in_background.png")

### 检查配置

若要检查您对 Go
文件或脚本的编辑是否正确生效，单击系统右上角的终端按钮（\>_），并输入下列命令：

`docker info`

接下来您将看到一些输出的信息。翻阅并查找是否存在下列字段：

`Registry Mirrors:`\
`[CDN 链接]`

\
==重要链接==\

-   中文论坛:
    [如果需要帮助，欢迎访问我们的中文论坛！](https://forums.unraid.net/forum/88-chinese-简体中文/)

\

-   Unraid [官方中文网站](https://unraid.net/zh)

\

-   [系统安装，序列建立，共享设置------司波图 UNRAID 陪玩教程
    01](https://www.bilibili.com/video/BV1nE411B73Y?from=search&seid=11906753235300157281)

\