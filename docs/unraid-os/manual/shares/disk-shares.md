---
sidebar_position: 2
---

# Disk shares

:::tip

Enable or disable disk shares in ***Settings > Global Share Settings***. Disk shares are disabled by default.

:::

## Overview

Disk shares correspond to individual array drives or pools within the Unraid system and are visible over the network. Once enabled, disk shares appear in the Unraid GUI under a **Disk Shares** section on the **Shares** tab. If you create a disk share, you should modify the user [access permissions](./network-access.md#access-permissions-at-share-level) to restrict network user access.

When viewed at the Linux level, the physical devices or pools will appear directly under `/mnt` with a name corresponding to the array drive or pool. This happens regardless of whether Disk Shares are enabled.

Examples of such names are:

* `/mnt/diskX:` - these are individual drives in the array where X corresponds to the disk number that shows in the Unraid GUI. The corresponding disk share at the network level would be *diskX*.
* `/mnt/pool-name:` - these are pools of disks. A single pool can actually consist of multiple drives but Unraid treats them as if they were one drive. The most common example of a pool name is 'cache', but you can set any name. The corresponding disk share at the network level would be `pool-name`.

:::caution

The Unraid flash device, used to boot Unraid and store all user settings, is also a physical device. However, it is not considered to be a disk share. If you want it visible on the network then you can click on it in the **Main** tab and set it to appear at the network level as the 'flash' share. At the Linux level it is mounted at `/boot`.

Due to the nature of the Unraid boot device, we recommend you maintain your shares in *Private* mode, with read/write access given to trusted users.

:::

## Disk share constraints

If you have both disk shares and user shares enabled in **Global Share Settings**, then there is an important restriction that you must observe to avoid potential data loss.

You must ***never*** copy between a user share and a disk share in the same copy operation where the folder name on the disk share matches the name of the user share. For example, `cp /mnt/user/share/file /mnt/disk1/share/file`.

At the base system level, Linux does not understand user shares, and cannot tell apart a file in a disk share from one in a user share. If you mix the share types in the same copy command you can end up trying to copy the file to itself which results in the file being truncated to zero length and its content being lost.

There is no problem if the copy is between shares of the same type, or copying to/from a disk mounted as an
[Unassigned Disk](../storage-management.md#unassigned-drives).
