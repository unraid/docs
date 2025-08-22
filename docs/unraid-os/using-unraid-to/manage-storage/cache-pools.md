---
sidebar_position: 3
sidebar_label: Cache pools
---

# Cache pools

In Unraid, a %%cache pool|cache-pool%% is a collection of one or more drives, typically SSDs or high-speed HDDs. These drives temporarily store data before it's moved to your main [%%array|array%%](../manage-storage/array-configuration.md). Using %%cache pools|cache-pool%% can significantly enhance write speeds, protect your data, and provide dedicated storage for specific tasks like running Docker containers or [%%virtual machines|vm%%](../create-virtual-machines/overview-and-system-prep.md).

%%Cache pools|cache-pool%% offer several advantages, making them a valuable addition to your Unraid setup, such as:

1. **Faster write speeds:** %%Cache pools|cache-pool%% allow you to quickly write data to faster drives before it gets transferred to the main %%array|array%%. This greatly enhances perceived performance when saving files.

2. **Data protection for cached files:** By using multiple drives in a %%cache pool|cache-pool%% (like setting them up in %%RAID 1|raid1%%), you add redundancy. This means your cached data is protected from drive failure before it even reaches the main %%array|array%%.

3. **Optimized storage for applications:** Storing applications like Docker containers or %%virtual machines|vm%% on a %%cache pool|cache-pool%% improves their performance, reduces wear on your main %%array|array%%, and minimizes the time it takes to access frequently-used files.

4. **Flexible and dedicated storage:** With multiple %%cache pools|cache-pool%%, you can assign specific pools for different tasks. For instance, you could have one pool dedicated to downloads and another for %%virtual machines|vm%%, reducing competition for resources and boosting efficiency.

:::info Keep in Mind

- **Multiple pools:** You can create and name different %%cache pools|cache-pool%%, tailoring them to match your specific needs.
- **SSD vs. HDD:** SSDs are great for speed, while you can use HDDs for large, sequential data workloads. Additionally, HDDs can help prolong the lifespan of your SSDs.
- **Redundancy matters:** To protect your data, use more than one drive in a %%cache pool|cache-pool%%. A single drive pool won't protect you from potential drive failure.
- **File system choice:** The default file system for %%cache pools|cache-pool%% is %%BTRFS|btrfs%%, which supports various %%RAID|raid%% options for added redundancy and flexibility. For more details on file system selection, see [File systems](../manage-storage/file-systems.md).
- **%%Mover|mover%% integration:** Data written to a %%cache pool|cache-pool%% is automatically transferred to your main %%array|array%% based on a schedule you set. This keeps your [%%user shares|user-share%%](../manage-storage/shares.md) organized and easy to manage.
- **Application performance:** By placing Docker containers, app data, and %%VM|vm%% disks on a %%cache pool|cache-pool%%, you enhance access speed and minimize strain on your main storage.
:::

---

## Pool modes

Unraid %%cache pools|cache-pool%% can operate in two main modes: **single device mode** and **multi-device mode**. Knowing the difference between these modes will help you find the right balance between performance, flexibility, and data protection for your needs.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="single-device" label="Single device mode" default>

In **single device mode**, your %%cache pool|cache-pool%% consists of only one device. This means:

- **No redundancy:** If the device fails, any data stored on it that hasn't been transferred to your %%array|array%% will be lost.
- **File system options:** You can use file systems other than %%BTRFS|btrfs%%, like %%XFS|xfs%% or %%ZFS|zfs%%.

:::important 
If you choose a non-%%BTRFS|btrfs%% file system in single device mode and later decide to add more devices to the pool, you will need to reformat the device as %%BTRFS|btrfs%% first. That's why %%BTRFS|btrfs%% is the default file system for %%cache pools|cache-pool%%, even when using just one device. For more information on file system selection and compatibility, see [File systems](../manage-storage/file-systems.md).
:::

Single device mode is straightforward. You can easily add or remove the device, but you won't have options for advanced features like redundancy or expansion.

</TabItem>
<TabItem value="multi-device" label="Multi-device mode">

When you set up a %%cache pool|cache-pool%% with more than one device, it enters **multi-device mode**. Here's what you should know:

- **Data protection:** This mode uses %%BTRFS|btrfs%% to mirror data across devices, helping protect your cached data from drive failure. You can lose one device without losing any data.
- **Mix and match:** You can add or remove devices of different sizes and types, including mixing SSDs and HDDs.
- **Capacity management:** Use the [BTRFS disk usage calculator](http://carfax.org.uk/btrfs-usage/) to estimate how much space you'll have based on the %%RAID|raid%% level and sizes of the devices you're using.

</TabItem>
</Tabs>

Common tasks for the %%cache pool|cache-pool%% include:

- Backing up your pool to the %%array|array%%
- Switching between single and multi-device modes
- Adding disks to a pool
- Replacing disks in a pool

## Backing up your cache pool to the array

Backing up your %%cache pool|cache-pool%% to the main %%array|array%% is a crucial step before making any upgrades, reformatting, or replacing your cache devices. This process ensures that important data - like Docker containers, app data, and %%virtual machine|vm%% files - are securely stored on the main %%array|array%%, minimizing the risk during maintenance.

<h3>Why back up your %%cache pool|cache-pool%%?</h3>

- **Data protection:** Safeguard your important files before making hardware changes or upgrades.
- **Accidental loss prevention:** Reduce the risk of losing data while reformatting or replacing devices.
- **Easy restoration:** Ensure you can quickly restore your application and %%virtual machine|vm%% data after maintenance.

:::important
This process will stop all Docker containers and %%virtual machines|vm%%, so make sure to plan for some downtime and notify users if necessary. For more information on managing Docker containers, see [Managing and customizing containers](../run-docker-containers/managing-and-customizing-containers.md).
:::

To back up your %%cache pool|cache-pool%%:

1. **Stop all running Docker containers and %%virtual machines|vm%%**: This is essential for a smooth backup process.
2. **Disable %%virtual machines|vm%%**: 
   - Go to ***Settings → VM Manager***.
   - Turn off %%VMs|vm%% and click **Apply**.
3. **Disable Docker**: 
   - Navigate to ***Settings → Docker***.
   - Turn off Docker and click **Apply**.
4. **Set %%User Shares|user-share%% to Use Cache**:
   - Go to the **Shares** tab.
   - For each %%user share|user-share%%, change **Use cache disk** to **Yes** if it's currently set to **Only** or **Prefer**.
5. **Check space on the %%array|array%%**: Ensure there's enough free space for your files.
6. **Move files to the %%array|array%%**: From the **Main** page, click **Move Now**. This starts the process of transferring files from your %%cache pool|cache-pool%% to the %%array|array%%.
7. **Verify your pool is empty**: Once the %%Mover|mover%% has finished, check that there are no remaining files in the %%cache pool|cache-pool%%.

:::note
Remember that files located directly on the pool device (not part of any share) must be moved manually.
:::

### Restore files to the cache pool

After you've completed your maintenance or replaced your device, you can restore files from the %%array|array%% back to the %%cache pool|cache-pool%% by following these steps:

1. **Set %%User Shares|user-share%% to Use Cache**: 
   - Go to the **Shares** tab.
   - Change the "Use cache" option to "Only" or "Prefer" for each share you want on the %%cache pool|cache-pool%%.
2. **Check space on the pool**: Make sure there's enough free space on the %%cache pool|cache-pool%%.
3. **Move files back to the pool**: Go to the **Main** page and click **Move Now** to transfer files back to the %%cache pool|cache-pool%%.
4. **Verify content in the pool**: After the move completes, check that your %%cache pool|cache-pool%% contains the expected files and that the shares are empty on the %%array|array%%.
5. **Re-enable Docker**: Navigate to ***Settings → Docker*** and turn Docker back on, then click **Apply**.
6. **Re-enable %%virtual machines|vm%%**: Go to ***Settings → VM Manager*** and turn %%VMs|vm%% back on, then click **Apply**.
7. **Restart Docker containers and %%VMs|vm%%**: Finally, start any Docker containers or %%virtual machines|vm%% that you want to run again.

---

## Switching to Multi-Device Mode

%%Cache pools|cache-pool%% in Unraid can be expanded from a single device to multiple devices, allowing for increased capacity and redundancy. To take advantage of multi-device mode, your pool must be formatted as %%BTRFS|btrfs%%.

### Converting a pool to BTRFS

If your %%cache pool|cache-pool%% isn't already formatted as %%BTRFS|btrfs%%, follow these simple steps:

1. **Back up your data**: First, ensure you back up any important content. (See [Backing up your cache pool to the array](#backing-up-your-cache-pool-to-the-array))
2. **Stop the %%array|array%%**: Make sure to stop the %%array|array%% to begin the conversion process.
3. **Change the file system**: Click on the pool in the **Main** tab and select **BTRFS** as the file system format.
4. **Start the %%array|array%%**: After changing the format, start the %%array|array%%.
5. **Format the pool**: The pool will appear as **unmountable** and offer the option to format. Confirm and click the **Format** button.
6. **Complete formatting**: Once formatting is complete, you'll have a %%BTRFS|btrfs%% pool, though it will only have one device at this stage.
7. **Add additional drives if desired**: You can proceed to add more drives to your pool if you wish.
8. **Restore your data**: Finally, follow the restore steps from the backup procedure to move your data back to the pool.

### Adding drives to create a multi-device pool

Once your pool is formatted as %%BTRFS|btrfs%%, you can add more drives for redundancy and to expand storage.

To add more drives for redundancy:

1. **Stop the %%array|array%%**: Again, start by stopping the %%array|array%%.
2. **Assign additional drives**: In the **Main** tab, you can assign one or more new devices to your pool.
3. **Start the %%array|array%%**: Once the drives are assigned, start the %%array|array%%.
4. **Automatic balancing**: Unraid will automatically incorporate the new devices into the pool and initiate the balancing process to distribute data across all drives.
5. **Monitor the balance operation**: Keep an eye on the balance operation in the **Main** tab; this may take some time based on the amount of data and the number of drives.
6. **Pool now in multi-device mode**: Once the balancing is complete, your pool will be operating in **multi-device mode** with enhanced capacity and redundancy.

:::tip
You can use the [BTRFS Disk Usage Calculator](http://carfax.org.uk/btrfs-usage/) to estimate available space and redundancy based on your chosen %%RAID|raid%% level and device sizes.
:::

---

## Adding disks to a pool

As your storage needs grow, you may want to expand your cache pool by adding additional disks. This process allows you to increase both capacity and performance while maintaining data protection through RAID configurations.

:::note
If you want to add disks to your pool, just make sure your pool is already formatted as %%BTRFS|btrfs%%. If it's not, you'll need to format it first, as explained in [the previous section](#converting-a-pool-to-btrfs).
:::

To add a disk to a pool:

1. **Stop the %%array|array%%**: Begin by stopping the current %%array|array%% to ensure the process goes smoothly.
2. **Open the Main tab**: Go to the **Main** tab in the %%WebGUI|web-gui%%. This is where you'll manage your disks.
3. **Find the Pool Devices section**: Scroll down until you see the _Pool Devices_ section. This is where you can make changes to your disk setup.
4. **Adjust the number of slots**: Look for the option labeled **Slots**. Change this number to be at least equal to how many disks you want to add. This allows you to assign space for each new device.
5. **Assign your devices**: Choose which devices (disks) you want to add to the pool and assign them to the available slot(s).
6. **Start the %%array|array%%**: After you've assigned your devices, start the %%array|array%% again to enable these changes.
7. **Format the devices**: You'll need to format the new disks. To do this, check the box that appears and click the button under **Array Operations** to start formatting.

:::important
Before you format, double-check that the devices listed are the ones you actually want to add. This is crucial to avoid accidentally formatting a disk that contains important data you want to keep. For more information on array operations and disk management, see [Array configuration](../manage-storage/array-configuration.md).
:::

---

## Removing disks from a pool

Removing a disk from a %%BTRFS|btrfs%% multi-device %%cache pool|cache-pool%% can help you reclaim hardware, replace a failing drive, or reconfigure your storage. This process is only possible if your pool is set up for redundancy (like %%RAID 1|raid1%% for both data and metadata) and the remaining devices have enough space to hold all of your data.

<Tabs>
  <TabItem value="gui" label="Using the WebGUI" default>

:::note Before you start  
- You can only remove one drive at a time using the GUI.
- Make sure your pool is using a redundant %%RAID|raid%% profile (like %%RAID 1|raid1%% for both data and metadata).
- To check your pool's %%RAID|raid%% level, navigate to the Main tab and click on the pool. Scroll down to the Balance Status section.
:::

To remove a disk using the %%WebGUI|web-gui%%:

1. **Stop the %%array|array%%**: Go to the **Main** tab and look for the option to stop your %%array|array%%.
2. **Unassign the pool drive**: Find the drive you want to remove and unassign it in the **Main** tab.
3. **Start the %%array|array%%**: Restart the %%array|array%% to apply the changes.
4. **Click on the pool**: Return to the **Main** tab and select the pool you just modified.
5. **Balance the pool**: If you still have more than one drive in the pool, run a **Balance** operation to redistribute data. This helps optimize space.
6. **Switch to single %%RAID|raid%% profile**: If there's only one drive left in the pool, change the %%RAID|raid%% profile to **single** for compatibility and data access.

:::note Timing
Keep in mind that removing a drive and rebalancing the pool may take several hours, depending on how much data you have and your device speeds.
:::

</TabItem>
<TabItem value="commandline" label="Using the Command Line (Advanced)" default>

If you're comfortable with the command line, this method gives you more control and can be useful if the %%WebGUI|web-gui%% option isn't available. For more information on using the command line interface, see [Command line interface](../../system-administration/advanced-tools/command-line-interface.md).

:::note Before you start

- Ensure that your pool's %%RAID|raid%% profile allows device removal; you can't remove a device from a 2-device %%RAID 1|raid1%% pool without changing it to a single profile first.
- Check that remaining devices will have enough space for your data.
:::

To remove a disk using the command line:

1. **Open a terminal session**: Make sure the %%array|array%% is running and open your command line interface.
2. **Remove the device**: Type the command below, replacing `X` with the letter corresponding to the drive you want to remove (as shown in the Main tab):

   ```bash
   btrfs device remove /dev/sdX1 /mnt/cache
   ```

   - For encrypted devices, use: `/dev/mapper/sdX1`.
   - For NVMe devices, use: `nvmeXn1p1`.

3. **Wait for completion**: The device will be removed once you see the cursor return.
4. **Make Unraid "forget" the deleted member**:
   - Stop the %%array|array%%.
   - Unassign all pool devices.
   - Start the %%array|array%% (Unraid will clear the pool configuration).
   - If any Docker/%%VM|vm%% services use this pool, disable them before starting the %%array|array%% to prevent Unraid from recreating images elsewhere.

5. **Reassign devices**: Stop the %%array|array%% again, reassign all remaining pool members except the removed device, and then start the %%array|array%%.

**To remove multiple devices**:  

You can do so in one command:

```bash
btrfs device remove /dev/sdX1 /dev/sdY1 /mnt/cache
```

However, keep in mind that the removal will still occur one at a time.

:::note Timing
Similar to the %%WebGUI|web-gui%% method, removing devices and rebalancing may take several hours depending on data volume and device speed.
:::

:::important
If you have only one device left in the pool, you will need to convert the %%RAID|raid%% profile to **single** to ensure everything functions correctly. For further instructions, refer to the section on [Switching the Pool RAID Level to Single](#switching-the-pool-raid-level-to-single). 
:::

 </TabItem>
</Tabs>

### Changing pool RAID levels

%%BTRFS|btrfs%% provides the ability to change %%RAID|raid%% levels for %%cache pools|cache-pool%% dynamically, allowing you to adjust settings without stopping the %%array|array%% or losing any data. This flexibility lets you optimize for performance, redundancy, or storage efficiency as your requirements change.

<h4>Supported %%RAID|raid%% Levels</h4>

| %%RAID&#124;raid%% Level | Data Protection | Space Efficiency | Use Case                                                                 |
|------------|-----------------|------------------|-------------------------------------------------------------------------|
| Single     | None            | 100%             | Temporary storage or non-critical data where redundancy isn't needed.  |
| %%RAID 0&#124;raid0%%     | None            | 100%             | Maximizes performance and capacity, but not recommended for critical data. |
| %%RAID 1&#124;raid1%%     | 1 disk failure  | 50%              | Default for Unraid pools. Ideal for Docker/%%VM&#124;vm%% storage and critical data. |
| %%RAID 10&#124;raid10%%    | 1 disk failure  | 50%              | Combines %%RAID 0&#124;raid0%% speed with %%RAID 1&#124;raid1%% redundancy for high-performance needs. |
| %%RAID 5&#124;raid5%%*    | 1 disk failure  | 67-94%           | **Experimental.** Balances capacity and redundancy for large media storage.  |
| %%RAID 6&#124;raid6%%*    | 2 disk failures | 50-88%           | **Experimental.** Provides extra protection for archival storage with large drives.  |

:::important
%%RAID 5|raid5%% and %%RAID 6|raid6%% are considered experimental in %%BTRFS|btrfs%%. Use with caution and ensure you have backups. Avoid using for critical data.
:::

To change a pool's %%RAID|raid%% level:

1. **Start the %%array|array%%** in normal mode if it is not already running.
2. **Click the pool name** on the **Main** tab.
3. **Scroll to Balance Status**: View the current %%RAID|raid%% levels for both data and metadata.
4. **Select the new %%RAID|raid%% profile**: Choose from a drop-down menu of predefined profiles.
5. **Start the balance operation**: Click **Balance** to begin the conversion.

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Converting from %%RAID 1|raid1%% to Single profile](/img/Btrfs-raid1.jpg) 
<p class="caption-center">*Example: Converting from %%RAID 1|raid1%% to Single profile*</p>

</div>

6. **Monitor progress**: Balance operations can take several hours to days, depending on the amount of data in the pool, drive speeds, and the complexity of the selected %%RAID|raid%% level.

<details>
<summary>Troubleshooting balance operations if stuck - Click to expand/collapse</summary>

If a balance operation seems stuck or unresponsive, follow these steps:

1. **Check the logs**: Go to ***Tools → Logs*** and filter for `btrfs` entries.
2. **Stop and resume the operation**:
   - Click **Cancel Balance**.
   - Restart the %%array|array%%.
   - Initiate the balance operation again.
3. **Verify disk health**: Run %%SMART|smart%% tests on all devices in the pool. For more information on disk health monitoring, see [SMART reports and disk health](../../system-administration/monitor-performance/smart-reports-and-disk-health.md).
4. **Check free space**: Ensure there is at least 10-15% free space available on the pool.
5. **Post diagnostics**: Share the logs on the [Unraid forums](https://forums.unraid.net/) if issues persist. For guidance on capturing diagnostics, see [Capture diagnostics and logs](../../troubleshooting/diagnostics/capture-diagnostics-and-logs.md).
</details>

For advanced %%BTRFS|btrfs%% configuration details, refer to the [BTRFS wiki](https://btrfs.wiki.kernel.org/index.php/Using_Btrfs_with_Multiple_Devices).

---

## Replace a disk in a pool

Replacing a disk in your %%cache pool|cache-pool%% is an important task that helps maintain the performance and reliability of your storage system.

:::note Prerequisites

- **Check your pool configuration:** Make sure your pool is set up with a redundant %%RAID|raid%% profile, like %%RAID 1|raid1%%. You can do this by going to ***Main → Pool → Balance Status*** in your management interface.
- **Choose the right replacement disk:** The new disk must be the same size or larger than the one you're replacing.
- **Hot-swap capability:** If your hardware supports hot-swapping, you won't need to power down your system to replace the disk.
:::

To replace a disk in a pool:

1. **Stop the %%array|array%%**: Go to the **Main** tab, find the **Array Operation** section, and click the **Stop** button. This will safely halt the %%array|array%% to prepare for disk replacement.
2. **(Optional) Remove the old disk**: If you don't have a hot-swap capable setup, you'll need to physically detach the old disk. Make sure you do this carefully to avoid any damage.
3. **Install the replacement disk**: Insert the new disk into your system. Ensure it's properly connected and secured.
4. **Refresh the %%WebGUI|web-gui%%**: Go back to the **Main** tab and refresh the page to allow the system to detect your new disk.
5. **Assign the new disk**: Once detected, find the pool slot where the old disk was located and assign the new disk to that slot.
6. **Start the %%array|array%%**: Click the **Start** button to begin the process of integrating the new disk into the %%array|array%%.
7. **Monitor the rebuild**: The system will automatically start reconstructing the data onto the new disk. You can keep an eye on the progress in the %%WebGUI|web-gui%%.

:::important Timing
Rebuilding can take some time, depending on the size of the disk and the current load on your system. For example, rebuilding a 4TB SSD in a %%RAID 1|raid1%% setup may take approximately 3-6 hours. It's a good idea to plan this when you can allow the system to work uninterrupted.
:::

---

## Minimum free space for a cache pool

Setting a minimum free space for your %%cache pool|cache-pool%% is essential to prevent errors and ensure smooth operation, especially when dealing with large files like high-resolution videos. This setting helps Unraid know when to stop writing to the pool and start writing directly to the larger storage %%array|array%%, avoiding interruptions or data corruption.

:::tip Example
If you often download files around 10 GB, set the minimum free space to at least 10 GB, but ideally 20 GB to allow for adjustments.
:::

You can access Minimum free space by clicking on the pool name in the **Main** tab and going to **Individual Pool Settings**.

<h4>How it works</h4>

- Unraid needs to know how much space is left before starting a file transfer. If it runs out of space, the operation fails and can cause errors.
- The minimum free space setting tells Unraid to stop using the %%cache pool|cache-pool%% when free space drops below this amount.
- If your share uses **Use cache: Yes** or **Prefer**, files go to the pool until it reaches the minimum free space, then they are sent directly to the %%array|array%%.
- If set to **Use cache: Only**, this setting is not applied.
- If set to **Use cache: No**, files go straight to the %%array|array%%.

:::tip Best practice
Set the minimum free space to at least the size of the largest file you expect, preferably double that size. For example, if your largest file is 30 GB, set the minimum to 60 GB.
:::

:::caution
**Do not set the minimum free space to 0.** This can cause disk full errors. Always use a reasonable value.
:::

---

## Moving files between a pool and the array

There are times when you may need to move files between your %%cache pool|cache-pool%% and the main %%array|array%%, such as when preparing for maintenance, upgrading hardware, or optimizing performance. Unraid provides a built-in tool called %%Mover|mover%% to automate this process for [%%user shares|user-share%%](./shares.md).

:::tip
Always disable Docker and %%VM|vm%% services before moving files with the %%Mover|mover%%. This prevents open files from being skipped during the transfer.
:::

<Tabs>
  <TabItem value="pool-to-array" label="Pool to array" default>

:::info Common use case
Moving files off the %%cache pool|cache-pool%% to the %%array|array%% before performing maintenance or upgrades to ensure your data is safe.
:::

To move files from your pool to the %%array|array%%:

1. **Disable Docker and %%VM|vm%% services**: Go to **Settings** and turn off Docker and %%VM|vm%% Manager. This prevents any files from being held open, allowing the %%Mover|mover%% to transfer everything smoothly.
2. **Set share to Use cache: Yes**: In the **Shares** tab, for each share you want to move (like `appdata` or `system`), set the **Use cache** option to **Yes**.
3. **Run %%Mover|mover%%**: Go to the **Main** tab and click on **Move Now** to start the %%Mover|mover%% process. This will transfer files from the %%cache pool|cache-pool%% to the %%array|array%%.
4. **Verify the move**: After the %%Mover|mover%% finishes, check that the files have been moved by clicking the folder icon next to the cache entry on the **Main** tab.
5. **Re-enable Docker and %%VM|vm%% services**: Once all files are on the %%array|array%%, you can safely turn these services back on.

  </TabItem>

  <TabItem value="array-to-pool" label="Array to pool">

:::info Common use case
Moving files back to the %%cache pool|cache-pool%% after maintenance or when you've added a new cache device to improve performance.
:::

To move files from the %%array|array%% to a pool:

1. **Disable Docker and %%VM|vm%% services**: Go to **Settings** and turn off Docker and %%VM|vm%% Manager to prevent any open files from interfering.
2. **Set share to use cache: Prefer**: In the **Shares** tab, for each share you want to move (like `appdata` or `system`), set the **Use cache** option to **Prefer**.
3. **Run the %%Mover|mover%%**: Go to the **Main** tab and click on **Move Now** to start moving files from the %%array|array%% to the %%cache pool|cache-pool%%.
4. **Verify the move**: After the %%Mover|mover%% finishes, check that the files are now on the %%cache pool|cache-pool%%.
5. **Re-enable Docker and %%VM|vm%% services**: Once the move is complete, turn Docker and %%VM|vm%% Manager back on in **Settings**.
6. **(Optional) Set share to use cache: Only**: If you want all files for a share to remain on the %%cache pool|cache-pool%%, set the **Use cache** option to **Only** for that share.

  </TabItem>
</Tabs>

<details>
<summary><strong>Why do files sometimes end up in the wrong pool or cache?</strong> - Click to expand/collapse</summary>

When you move files between [%%user shares|user-share%%](./shares.md) at the Linux level (for example, using `mv` or within a Docker container), Linux tries to optimize the operation. If both the source and destination appear on the same mount point (`/mnt/user`), Linux might rename the file instead of moving it. This can result in files remaining on the original disk or pool, even if the share's "Use cache" setting is set to "No."

To ensure that files move as intended, consider the following options:

- Use the %%Mover|mover%% tool.
- Copy files and then delete the originals.
- Move files over the network.

These methods help prevent files from ending up in the wrong location.
</details>

---

## Multiple pools

Unraid allows you to create and manage up to 35 separate storage pools, each with up to 30 devices. Multiple pools give you flexibility to allocate storage for different tasks, improve performance, and customize redundancy based on your needs. Each pool can use a different file system, %%RAID|raid%% level, and device type (SSD, HDD, NVMe, etc.).

<h4>Why use multiple pools?</h4>

- **Optimize performance:** Separate pools for %%VMs|vm%%, Docker containers, downloads, or media can enhance speed and reduce conflicts.
- **Protect data:** Assign different %%RAID|raid%% levels or file systems to each pool for tailored redundancy and backup options.
- **Isolate workloads:** Keep critical applications on faster, redundant pools and store bulk data on larger, cost-effective devices.
- **Manage flexibly:** You can expand, reduce, or format pools independently without impacting others.

<h4>Common use cases</h4>

| Use case                          | Configuration example                   | Benefit                                 |
|------------------------------------|----------------------------------------------|-----------------------------------------|
| High-performance %%VMs&#124;vm%%               | NVMe SSD pool, %%RAID 1&#124;raid1%%, %%BTRFS&#124;btrfs%% or %%ZFS&#124;zfs%%          | Fast I/O with redundancy                 |
| Docker/Appdata storage             | SSD pool, %%RAID 1&#124;raid1%%, %%BTRFS&#124;btrfs%%                      | Quick access and data protection        |
| Bulk media downloads               | Large HDD pool, %%RAID 0&#124;raid0%% or single, %%XFS&#124;xfs%%/%%BTRFS&#124;btrfs%%  | High capacity with less redundancy      |
| Project/Team isolation             | Separate pools for each team/project          | Reduces resource conflicts              |
| Snapshots and backup targets       | %%ZFS&#124;zfs%% pool, %%RAIDZ1&#124;raidz1%%/%%RAIDZ2&#124;raidz2%% (multi-device)            | Supports native snapshots and backups    |

:::info Supported File Systems

- %%BTRFS|btrfs%%: Best for multi-device pools (supports %%RAID 0|raid0%%, %%RAID 1|raid1%%, %%RAID 10|raid10%%, %%RAID 5|raid5%%, %%RAID 6|raid6%%).
- %%ZFS|zfs%%: Can be used for both single and multi-device pools (Unraid 6.12+). For advanced ZFS features and configuration, see [ZFS storage](../../advanced-configurations/optimize-storage/zfs-storage.md).
- %%XFS|xfs%%: Suitable for single-device pools.
:::

When accessing a [%%user share|user-share%%](./shares.md) from multiple pools and %%array|array%% disks, Unraid merges the directory listings in this order:

1. Pool assigned to the share
2. %%Array|array%% disks (disk1, disk2, ..., disk28)
3. Other pools (in order)

### Moving files between pools

Unraid doesn't allow direct file movement between pools through the %%WebGUI|web-gui%%, but you can do it using the %%Mover|mover%% tool or via command line.

:::note Remember
Any the files belong to a Docker container and/or %%VM|vm%% then the services must be disabled for the files to be moved successfully.
:::

<Tabs>
  <TabItem value="using-mover" label="Using Mover" default>

1. **Disable Docker and %%VM|vm%% services**: Go to **Settings** and turn off Docker and %%VM|vm%% Manager to prevent open files.
2. **Move files from pool1 to the %%array|array%%**:
   - Go to the **Shares** tab. For each share, set **Use cache** to **Yes** (if files are on pool1).
   - In the **Main** tab, click **Move Now** to run %%Mover|mover%%. Wait for it to finish.
3. **Move files from the %%array|array%% to pool2**:  
   - In the **Shares** tab, set **Use cache** to **Prefer** and assign the share to pool2.
   - In the **Main** tab, click **Move Now** again. Files will move from the %%array|array%% to pool2.
4. **Re-enable Docker and %%VM|vm%% services** (if needed).

:::note Timing
Moving large data sets can take hours, depending on file size and device speeds.
:::

  </TabItem>
  <TabItem value="manual-transfer" label="Manual file transfer (Advanced)">

1. **Disable Docker and %%VM|vm%% services** as described above.
2. Use `rsync` or `mv` commands to transfer files between mount points (e.g., `/mnt/pool1/share` to `/mnt/pool2/share`).
3. Verify the files before deleting them from the original pool.
4. Re-enable Docker and %%VM|vm%% services.

:::caution
Always check your file paths and use the correct share names to prevent data loss.
:::
  </TabItem>
</Tabs>

:::warning
If you remove a device from a %%BTRFS|btrfs%% pool and move it to a new pool, Unraid will erase all data on it when the %%array|array%% restarts. Always back up important data before changing pool configurations.
:::
