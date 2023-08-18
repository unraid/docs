---
sidebar_position: 2
---

# Disk shares

:::tip

Enable or disable disk shares in ***Settings > Global Share Settings***. Disk shares are disabled by default.

:::

## Overview

Disk shares correspond to individual array drives or pools within the Unraid system and are visible over the network. Once enabled, disk shares appear in the Unraid GUI under a **Disk Shares** section on the **Shares** tab. If you create a disk share, you should modify the user [access permissions](./access-permissions.md) to restrict network user access.

When viewed at the Linux level, the physical devices or pools will appear directly under `/mnt` with a name corresponding to the array drive or pool. This happens regardless of whether Disk Shares are enabled.
Examples of such names are:

* `/mnt/diskX:` - these are individual drives in the array where X corresponds to the disk number that shows in the Unraid GUI. The corresponding disk share at the network level would be *diskX*.
* `/mnt/pool-name:` - these are pools of disks. A single pool can actually consist of multiple drives but Unraid treats them as if they were one drive. The most common example of a pool name is 'cache', but you can set any name. The corresponding disk share at the network level would be `pool-name`.

:::caution

The Unraid flash device, used to boot Unraid and store all user settings, is also a physical device. However, it is not considered to be a disk share. If you want it visible on the network then you can click on it in the **Main** tab and set it to appear at the network level as the 'flash' share. At the Linux level it is mounted at `/boot`.

Due to the nature of the Unraid boot device, we do not recommend you maintain an active share on the flash device via a disk share.

:::

## Disk share constraints

There is a quirk of the interaction between Linux and the Unraid user share system that users can encounter if they are working at the disk share level. The Linux command for 'move' is implemented by first trying a rename on the file (which is faster) and only if that fails does it do a copy-and-delete operation. This can mean when you try to move files from one user share to another from the command line, Linux will often simply rename the files so they have a different path on the same disk, in violation of any user share settings such as included disks. The workaround for this is to instead explicitly copy from source to destination so that new files get created following the user share settings, then deleting from the source.