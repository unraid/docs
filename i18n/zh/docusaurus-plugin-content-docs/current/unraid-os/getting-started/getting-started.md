---
sidebar_position: 3
---

# 入门指南

本指南将介绍如何准备启动设备、引导系统以及配置首个存储阵列。整个过程预计耗时不超过15分钟。

## 准备工作

开始前请确保：
* 服务器已组装完毕，并接通电源和网线
* 需连接显示器和键盘用于初始配置，并准备好在BIOS中调整设置
* 准备一个4GB以上、带有GUID（全局唯一标识符）的优质品牌[USB闪存设备](../manual/changing-the-flash-device.md#recommendations-on-buying-usb-drives)
* 您的主板支持从USB设备启动

### 硬件要求

当前[Unraid OS版本](https://unraid.net/product)对数据存储的最低硬件要求如下：
* 支持64位的处理器，主频1GHz或更高
* 基础NAS功能需至少4GB内存
* Linux驱动需支持您的存储控制器、网卡和USB控制器
* 至少两块硬盘以通过[奇偶校验盘](../legacy/FAQ/Parity.md)实现数据保护

:::important

若需运行应用程序或虚拟机，请提前规划硬件配置。例如：若需在Unraid中运行Windows 11虚拟机，必须同时满足该操作系统和Unraid的双重要求才能保证功能正常。

虚拟机运行特别要求CPU与芯片组支持硬件虚拟化技术，企业级设备通常标有Intel VPro®或AMD Ryzen Pro®认证标识。

:::

#### 应用服务器要求
运行多个应用建议配置：
* 四核CPU（2.4GHz或更高）
* 4-8GB内存
  应用数量增加时需相应提升硬件配置

#### 虚拟机创建要求
运行虚拟机必须满足：
* 处理器/主板支持硬件虚拟化（HVM）（Intel VT-x/AMD-V）
* 如需将主机PCI设备（如显卡、声卡）直通给虚拟机，需支持IOMMU（Intel VT-d/AMD-Vi）

三类虚拟机对虚拟化支持的具体要求：
* 虚拟服务器：需HVM，无需IOMMU
* 虚拟桌面：需HVM，无需IOMMU
* 混合型虚拟机：需同时支持HVM和IOMMU

更多信息请参阅[虚拟机文档](../manual/vm/vm-support.md)。