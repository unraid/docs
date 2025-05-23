---
sidebar_position: 3
---

# 手动安装

若无法使用USB闪存创建工具或设备未被识别，可通过以下步骤手动创建可启动介质。

1. 将USB闪存设备插入电脑
2. 格式化为FAT32文件系统（**不可使用**exFAT/NTFS）  
   :::important

   若设备容量超过32GB，需使用第三方工具（如[Rufus](https://rufus.ie/)）格式化，这是因为Windows系统对32GB+设备不提供FAT32选项

   :::
3. 设置卷标为全大写`UNRAID`（区分大小写）
4. 前往[下载归档](../download_list.mdx)获取所需版本ZIP文件
5. 下载ZIP文件至临时目录（如"下载"文件夹）
6. 将ZIP内容解压到USB闪存设备根目录
7. 确认设备内已包含解压后的系统文件
8. （可选）启用UEFI启动：将`EFI-`目录重命名为`EFI`（新版本的ZIP文件已默认启用）
9. 根据操作系统运行激活脚本：
   * **Windows XP** - 双击**make_bootable**文件
   * **Windows 7+** - 右键**make_bootable**选择"以管理员身份运行"
   * **Mac** - 双击**make_bootable_mac**，输入管理员密码
   * **Linux**：
      1. 将**make_bootable_linux**脚本复制到硬盘
      2. 卸载（不是弹出）USB设备：`umount /dev/sdX1`
      3. 执行激活命令：`sudo bash ./make_bootable_linux`

:::note

脚本执行期间USB设备可能多次断开重连，这是正常现象

:::
