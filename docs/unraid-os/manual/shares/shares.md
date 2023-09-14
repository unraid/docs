---
sidebar_position: 1
---

# Shares

:::tip

Once you have assigned devices to Unraid and started the array, we recommend that you plan and create shares to simplify how you store data across multiple disks in the array.

:::

One key feature of Unraid is the management of shares. Shares represent folders or drives on your Unraid server that can be accessed over a network. You can add as many shares as you like to your Unraid server. For example, you may have a share for your photo library, another for movies, and yet another for important documents, each with their own separate access permissions and configurations. They can be made secure and their configuration determines how data is written and spread out across your array or named pool of drives.

There are two types of shares in Unraid:

* [User Shares](./user-shares.md) that rely on Linux FUSE and represent folders in the overall file system.
* [Disk Shares](./disk-shares.md) that rely on the drives' [file system](https://docs.unraid.net/unraid-os/manual/storage-management#creating-a-file-system-format) to share the disk as a whole.

It is important to highlight that there are two different views of the same underlying file system. Every file/folder that appears under a user share will also appear under the disk share for the physical drive that is storing the file/folder.

When you first initialize your array, Unraid automatically creates a [handful of user shares](./user-shares.md#default-shares). These are needed to support common plugins, containers, and virtual machines. You can create your own shares to store other data.

You manage shares from the **Shares** tab in Unraid. You enable or disable shares in ***Settings > Global Share Settings***, with user shares being enabled by default.
