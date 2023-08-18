---
sidebar_position: 5
---

# Create a new share

When you create a new share, plan ahead.

1. On the **Shares** tab select **Add Share**.
2. Enter a name for your share in **Share name**

:::tip Share names

The Linux file systems used by Unraid are case sensitive while the SMB share system - the one used by Windows - is not. However, at the network level, case is ignored so `media`, `Media`, and `MEDIA` would all be the same share. When you view the share on the network, you only get the content of one of those underlying folders to appear - and it would not be clear which one this would be.

:::

3. *(Optional)* Enter a description for the share in the **Comments** field. This is visible when viewed over the network.
4. Set a **Minimum free space** value, in kilobytes, if you plan to use the setting, otherwise leave it empty.
5. Select the **Primary storage** for your share. The dropdown displays all available options, which include: the cache, the array, and any named pool. 
6. Select the **Allocation method**: high-water, fill-up, or most-free, depending on your use case. You can read about the differences [here](./user-shares.md#allocation-method).
7. Select the **Split level** method for your data. You can find more information split level, [here](./user-shares.md#split-level).
8. In **Included disks** choose which disks will be available to the share. By default, all disks will be included.
9. In **Excluded disks** choose which disks will not be available to the share. Note that if you configure **Included disks** there is no need to configure **Excluded disks**.
10. Select a **Secondary storage** if you plan on using it. Think of secondary storage as a fall-back resource when the primary storage is full. By default this is set to *None*.
11. *(Optional)* If you configure a primary and secondary storage, then **Mover action** option becomes active. This sets the direction of file transfers between Primary and Secondary storage.
12. Select **Add share** to complete the creation.

:::important

Note that, by default, a new share will not be shared over the network. You must configure [network access](./network-access.md) after the share is created.

:::