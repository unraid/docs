---
sidebar_position: 3
sidebar_label: Cache pools
---

# Cache pools

In Unraid, a cache pool is a collection of one or more drives, typically SSDs or high-speed HDDs. These drives temporarily store data before it's moved to your main array. Using cache pools can significantly enhance write speeds, protect your data, and provide dedicated storage for specific tasks like running Docker containers or virtual machines. If you're using Unraid version 6.9 or newer, you can even create multiple cache pools, each with its own name and purpose.

Cache pools offer several advantages, making them a valuable addition to your Unraid setup, such as:

1. **Faster write speeds:**  
   Cache pools allow you to quickly write data to faster drives before it gets transferred to the main array. This greatly enhances perceived performance when saving files.

2. **Data protection for cached files:**  
   By using multiple drives in a cache pool (like setting them up in RAID 1), you add redundancy. This means your cached data is protected from drive failure before it even reaches the main array.

3. **Optimized storage for applications:**  
   Storing applications like Docker containers or virtual machines on a cache pool improves their performance, reduces wear on your main array, and minimizes the time it takes to access frequently-used files.

4. **Flexible and dedicated storage:**  
   With multiple cache pools, you can assign specific pools for different tasks. For instance, you could have one pool dedicated to downloads and another for virtual machines, reducing competition for resources and boosting efficiency.

:::info Keep in Mind

- **Multiple pools:** With Unraid 6.9 and later, you can create and name different cache pools, tailoring them to match your specific needs.
- **SSD vs. HDD:** SSDs are great for speed, while you can use HDDs for large, sequential data workloads. Additionally, HDDs can help prolong the lifespan of your SSDs.
- **Redundancy matters:** To protect your data, use more than one drive in a cache pool. A single drive pool won't protect you from potential drive failure.
- **File system choice:** The default file system for cache pools is BTRFS, which supports various RAID options for added redundancy and flexibility.
- **Mover integration:** Data written to a cache pool is automatically transferred to your main array based on a schedule you set. This keeps your user shares organized and easy to manage.
- **Application performance:** By placing Docker containers, app data, and VM disks on a cache pool, you enhance access speed and minimize strain on your main storage.
:::

---

## Pool modes

Unraid cache pools can operate in two main modes: **single device mode** and **multi-device mode**. Knowing the difference between these modes will help you find the right balance between performance, flexibility, and data protection for your needs.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="single-device" label="Single device mode" default>

In **single device mode**, your cache pool consists of only one device. This means:

- **No redundancy:** If the device fails, any data stored on it that hasn't been transferred to your array will be lost.
- **File system options:** You can use file systems other than BTRFS, like XFS or ZFS.

:::important 
If you choose a non-BTRFS file system in single device mode and later decide to add more devices to the pool, you will need to reformat the device as BTRFS first. That's why BTRFS is the default file system for cache pools, even when using just one device.
:::

Single device mode is straightforward. You can easily add or remove the device, but you won't have options for advanced features like redundancy or expansion.

</TabItem>
<TabItem value="multi-device" label="Multi-device mode">

When you set up a cache pool with more than one device, it enters **multi-device mode**. Here's what you should know:

- **Data protection:** This mode uses BTRFS to mirror data across devices, helping protect your cached data from drive failure. You can lose one device without losing any data.
- **Mix and match:** You can add or remove devices of different sizes and types, including mixing SSDs and HDDs.
- **Capacity management:** Use the [BTRFS disk usage calculator](http://carfax.org.uk/btrfs-usage/) to estimate how much space you'll have based on the RAID level and sizes of the devices you’re using.

</TabItem>
</Tabs>

Common tasks for the cache pool include:

- Backing up your pool to the array
- Switching between single and multi-device modes
- Adding disks to a pool
- Replacing disks in a pool

## Backing up your cache pool to the array

Backing up your cache pool to the main array is a crucial step before making any upgrades, reformatting, or replacing your cache devices. This process ensures that important data—like Docker containers, app data, and virtual machine files—are securely stored on the main array, minimizing the risk during maintenance.

**Why back up your cache pool?**

- **Data protection**: Safeguard your important files before making hardware changes or upgrades.
- **Accidental loss prevention**: Reduce the risk of losing data while reformatting or replacing devices.
- **Easy restoration**: Ensure you can quickly restore your application and virtual machine data after maintenance.

:::important
This process will stop all Docker containers and virtual machines, so make sure to plan for some downtime and notify users if necessary.
:::

To back up your cache pool:

1. **Stop all running Docker containers and virtual machines**: This is essential for a smooth backup process.
2. **Disable virtual machines**: 
   - Go to **Settings → VM Manager**.
   - Turn off VMs and click **Apply**.
3. **Disable Docker**: 
   - Navigate to **Settings → Docker**.
   - Turn off Docker and click **Apply**.
4. **Set User Shares to Use Cache**:
   - Go to the **Shares** tab.
   - For each user share, change "Use cache disk" to "Yes" if it’s currently set to "Only" or "Prefer."
5. **Check space on the array**: Ensure there’s enough free space for your files.
6. **Move files to the array**: From the **Main** page, click **Move Now**. This starts the process of transferring files from your cache pool to the array.
7. **Verify your pool is empty**: Once the mover has finished, check that there are no remaining files in the cache pool.

:::note
Remember that files located directly on the pool device (not part of any share) must be moved manually.
:::

### Restore files to the cache pool

After you’ve completed your maintenance or replaced your device, you can restore files from the array back to the cache pool by following these steps:

1. **Set User Shares to Use Cache**: 
   - Go to the **Shares** tab.
   - Change the "Use cache" option to "Only" or "Prefer" for each share you want on the cache pool.
2. **Check space on the pool**: Make sure there’s enough free space on the cache pool.
3. **Move files back to the pool**: Go to the **Main** page and click **Move Now** to transfer files back to the cache pool.
4. **Verify content in the pool**: After the move completes, check that your cache pool contains the expected files and that the shares are empty on the array.
5. **Re-enable Docker**: Navigate to **Settings → Docker** and turn Docker back on, then click **Apply**.
6. **Re-enable virtual machines**: Go to **Settings → VM Manager** and turn VMs back on, then click **Apply**.
7. **Restart Docker containers and VMs**: Finally, start any Docker containers or virtual machines that you want to run again.

---

## Switching to Multi-Device Mode

Cache pools in Unraid can be expanded from a single device to multiple devices, allowing for increased capacity and redundancy. To take advantage of multi-device mode, your pool must be formatted as BTRFS.

### Converting a pool to BTRFS

If your cache pool isn't already formatted as BTRFS, follow these simple steps:

1. **Back up your data:** First, ensure you back up any important content. (See [Backing up your cache pool to the array](#backing-up-your-cache-pool-to-the-array))
2. **Stop the array:** Make sure to stop the array to begin the conversion process.
3. **Change the file system:** Click on the pool in the **Main** tab and select **BTRFS** as the file system format.
4. **Start the array:** After changing the format, start the array.
5. **Format the pool:** The pool will appear as **unmountable** and offer the option to format. Confirm and click the **Format** button.
6. **Complete formatting:** Once formatting is complete, you'll have a BTRFS pool, though it will only have one device at this stage.
7. **Add additional drives if desired:** You can proceed to add more drives to your pool if you wish.
8. **Restore your data:** Finally, follow the restore steps from the backup procedure to move your data back to the pool.

### Adding drives to create a multi-device pool

Once your pool is formatted as BTRFS, you can add more drives for redundancy and to expand storage. Here’s how:

1. **Stop the array:** Again, start by stopping the array.
2. **Assign additional drives:** In the **Main** tab, you can assign one or more new devices to your pool.
3. **Start the array:** Once the drives are assigned, start the array.
4. **Automatic balancing:** Unraid will automatically incorporate the new devices into the pool and initiate the balancing process to distribute data across all drives.
5. **Monitor the balance operation:** Keep an eye on the balance operation in the **Main** tab; this may take some time based on the amount of data and the number of drives.
6. **Pool now in multi-device mode:** Once the balancing is complete, your pool will be operating in **multi-device mode** with enhanced capacity and redundancy.

:::tip
You can use the [BTRFS Disk Usage Calculator](http://carfax.org.uk/btrfs-usage/) to estimate available space and redundancy based on your chosen RAID level and device sizes.
:::

---

## Adding disks to a pool

:::note
If you want to add disks to your pool, just make sure your pool is already formatted as BTRFS. If it’s not, you'll need to format it first, as explained in [the previous section](#converting-a-pool-to-btrfs).
:::

To add a disk to a pool:

1. **Stop the array**: Begin by stopping the current array to ensure the process goes smoothly.
2. **Open the Main tab**: Go to the **Main** tab in the WebGUI. This is where you'll manage your disks.
3. **Find the Pool Devices section**: Scroll down until you see the _Pool Devices_ section. This is where you can make changes to your disk setup.
4. **Adjust the number of slots**: Look for the option labeled **Slots**. Change this number to be at least equal to how many disks you want to add. This allows you to assign space for each new device.
5. **Assign your devices**: Choose which devices (disks) you want to add to the pool and assign them to the available slot(s).
6. **Start the array**: After you've assigned your devices, start the array again to enable these changes.
7. **Format the devices**: You’ll need to format the new disks. To do this, check the box that appears and click the button under **Array Operations** to start formatting.

:::important
Before you format, double-check that the devices listed are the ones you actually want to add. This is crucial to avoid accidentally formatting a disk that contains important data you want to keep.
:::

---

## Removing disks from a pool

Removing a disk from a BTRFS multi-device cache pool can help you reclaim hardware, replace a failing drive, or reconfigure your storage. This process is only possible if your pool is set up for redundancy (like RAID 1 for both data and metadata) and the remaining devices have enough space to hold all of your data.

<Tabs>
  <TabItem value="gui" label="Using the WebGUI" default>

:::note Before you start  
- You can only remove one drive at a time using the GUI.
- Make sure your pool is using a redundant RAID profile (like RAID 1 for both data and metadata).
- To check your pool's RAID level, navigate to the Main tab and click on the pool. Scroll down to the Balance Status section.
:::

To remove a disk using the WebGUI:

1. **Stop the array**: Go to the **Main** tab and look for the option to stop your array.
2. **Unassign the pool drive**: Find the drive you want to remove and unassign it in the **Main** tab.
3. **Start the array**: Restart the array to apply the changes.
4. **Click on the pool**: Return to the **Main** tab and select the pool you just modified.
5. **Balance the pool**: If you still have more than one drive in the pool, run a **Balance** operation to redistribute data. This helps optimize space.
6. **Switch to single RAID profile**: If there’s only one drive left in the pool, change the RAID profile to **single** for compatibility and data access.

:::note Timing
Keep in mind that removing a drive and rebalancing the pool may take several hours, depending on how much data you have and your device speeds.
:::

</TabItem>
<TabItem value="commandline" label="Using the Command Line (Advanced)" default>

If you’re comfortable with the command line, this method gives you more control and can be useful if the WebGUI option isn't available.

:::note Before you start
- Ensure that your pool's RAID profile allows device removal; you can't remove a device from a 2-device RAID 1 pool without changing it to a single profile first.
- Check that remaining devices will have enough space for your data.
:::

To remove a disk using the command line:

1. **Open a terminal session**: Make sure the array is running and open your command line interface.
2. **Remove the device**: Type the command below, replacing `X` with the letter corresponding to the drive you want to remove (as shown in the Main tab):

   ```bash
   btrfs device remove /dev/sdX1 /mnt/cache
   ```

   - For encrypted devices, use: `/dev/mapper/sdX1`.
   - For NVMe devices, use: `nvmeXn1p1`.

3. **Wait for completion**: The device will be removed once you see the cursor return.
4. **Make Unraid "forget" the deleted member**:
   - Stop the array.
   - Unassign all pool devices.
   - Start the array (Unraid will clear the pool configuration).
   - If any Docker/VM services use this pool, disable them before starting the array to prevent Unraid from recreating images elsewhere.

5. **Reassign devices**: Stop the array again, reassign all remaining pool members except the removed device, and then start the array.

**To remove multiple devices**:  

You can do so in one command:

```bash
btrfs device remove /dev/sdX1 /dev/sdY1 /mnt/cache
```

However, keep in mind that the removal will still occur one at a time.

:::note Timing
Similar to the WebGUI method, removing devices and rebalancing may take several hours depending on data volume and device speed.
:::

:::important
If you have only one device left in the pool, you will need to convert the RAID profile to **single** to ensure everything functions correctly. For further instructions, refer to the section on [Switching the Pool RAID Level to Single](#switching-the-pool-raid-level-to-single). 
:::

 </TabItem>
</Tabs>

### Changing pool RAID levels

BTRFS provides the ability to change RAID levels for cache pools dynamically, allowing you to adjust settings without stopping the array or losing any data. This flexibility lets you optimize for performance, redundancy, or storage efficiency as your requirements change.

**Supported RAID Levels:**

| RAID Level | Data Protection | Space Efficiency | Use Case                                                                 |
|------------|-----------------|------------------|-------------------------------------------------------------------------|
| Single     | None            | 100%             | Temporary storage or non-critical data where redundancy isn't needed.  |
| RAID 0     | None            | 100%             | Maximizes performance and capacity, but not recommended for critical data. |
| RAID 1     | 1 disk failure  | 50%              | Default for Unraid pools. Ideal for Docker/VM storage and critical data. |
| RAID 10    | 1 disk failure  | 50%              | Combines RAID 0 speed with RAID 1 redundancy for high-performance needs. |
| RAID 5*    | 1 disk failure  | 67-94%           | **Experimental.** Balances capacity and redundancy for large media storage.  |
| RAID 6*    | 2 disk failures | 50-88%           | **Experimental.** Provides extra protection for archival storage with large drives.  |

:::important
RAID 5 and RAID 6 are considered experimental in BTRFS. Use with caution and ensure you have backups. Avoid using for critical data.
:::

To change a pool's RAID level:

1. **Start the array** in normal mode if it is not already running.
2. **Click the pool name** on the **Main** tab.
3. **Scroll to Balance Status:** View the current RAID levels for both data and metadata.
4. **Select the new RAID profile:** Choose from a drop-down menu of predefined profiles.
5. **Start the balance operation:** Click **Balance** to begin the conversion.

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Converting from RAID 1 to Single profile](/img/Btrfs-raid1.jpg) 
<p class="caption-center">*Example: Converting from RAID 1 to Single profile*</p>

</div>

6. **Monitor progress:** Balance operations can take several hours to days, depending on the amount of data in the pool, drive speeds, and the complexity of the selected RAID level.

<details> 
<summary>Troubleshooting balance operations if stuck</summary>

If a balance operation seems stuck or unresponsive, follow these steps:

1. **Check the logs:** Go to **Tools > Logs** and filter for `btrfs` entries.
2. **Stop and resume the operation:**
   - Click **Cancel Balance**.
   - Restart the array.
   - Initiate the balance operation again.
3. **Verify disk health:** Run SMART tests on all devices in the pool.
4. **Check free space:** Ensure there is at least 10-15% free space available on the pool.
5. **Post diagnostics:** Share the logs on the [Unraid forums](https://forums.unraid.net/) if issues persist.
</details>

For advanced BTRFS configuration details, refer to the [BTRFS wiki](https://btrfs.wiki.kernel.org/index.php/Using_Btrfs_with_Multiple_Devices).

---

## Replace a disk in a pool

Replacing a disk in your cache pool is an important task that helps maintain the performance and reliability of your storage system.

:::note Prerequisites

- **Check your pool configuration:** Make sure your pool is set up with a redundant RAID profile, like RAID 1. You can do this by going to **Main > Pool > Balance Status** in your management interface.
- **Choose the right replacement disk:** The new disk must be the same size or larger than the one you're replacing.
- **Hot-swap capability:** If your hardware supports hot-swapping, you won’t need to power down your system to replace the disk.
:::

To replace a disk in a pool:

1. **Stop the array:** Go to the **Main** tab, find the **Array Operation** section, and click the **Stop** button. This will safely halt the array to prepare for disk replacement.
2. **(Optional) Remove the old disk:** If you don’t have a hot-swap capable setup, you’ll need to physically detach the old disk. Make sure you do this carefully to avoid any damage.
3. **Install the replacement disk:** Insert the new disk into your system. Ensure it’s properly connected and secured.
4. **Refresh the WebGUI:** Go back to the **Main** tab and refresh the page to allow the system to detect your new disk.
5. **Assign the new disk:** Once detected, find the pool slot where the old disk was located and assign the new disk to that slot.
6. **Start the array:** Click the **Start** button to begin the process of integrating the new disk into the array.
7. **Monitor the Rebuild:** The system will automatically start reconstructing the data onto the new disk. You can keep an eye on the progress in the WebGUI.

:::important Timing
Rebuilding can take some time, depending on the size of the disk and the current load on your system. For example, rebuilding a 4TB SSD in a RAID 1 setup may take approximately 3-6 hours. It's a good idea to plan this when you can allow the system to work uninterrupted.
:::

---

## Minimum free space for a cache pool

Setting a minimum free space for your cache pool is essential to prevent errors and ensure smooth operation, especially when dealing with large files like high-resolution videos. This setting helps Unraid know when to stop writing to the pool and start writing directly to the larger storage array, avoiding interruptions or data corruption.

:::tip Example
If you often download files around 10 GB, set the minimum free space to at least 10 GB, but ideally 20 GB to allow for adjustments.
:::

In Unraid 6.9 and later, you can access Minimum free space by clicking on the pool name in the **Main** tab and going to **Individual Pool Settings**.

**How It Works:**

- Unraid needs to know how much space is left before starting a file transfer. If it runs out of space, the operation fails and can cause errors.
- The minimum free space setting tells Unraid to stop using the cache pool when free space drops below this amount.
- If your share uses **Use cache: Yes** or **Prefer**, files go to the pool until it reaches the minimum free space, then they are sent directly to the array.
- If set to **Use cache: Only**, this setting is not applied.
- If set to **Use cache: No**, files go straight to the array.

**Best practice:**  
Set the minimum free space to at least the size of the largest file you expect, preferably double that size. For example, if your largest file is 30 GB, set the minimum to 60 GB.
:::caution
**Do not set the minimum free space to 0.** This can cause disk full errors. Always use a reasonable value.
:::

---

## Moving files between a pool and the array

There are times when you may need to move files between your cache pool and the main array, such as when preparing for maintenance, upgrading hardware, or optimizing performance. Unraid provides a built-in tool called **Mover** to automate this process for user shares.

:::tip
Always disable Docker and VM services before moving files with the mover. This prevents open files from being skipped during the transfer.
:::

<Tabs>
  <TabItem value="pool-to-array" label="Pool to array" default>

:::info Common use case
Moving files off the cache pool to the array before performing maintenance or upgrades to ensure your data is safe.
:::

To move files from your pool to the array:

1. **Disable Docker and VM services:** Go to **Settings** and turn off Docker and VM Manager. This prevents any files from being held open, allowing the mover to transfer everything smoothly.
2. **Set share to use cache: Yes:** In the **Shares** tab, for each share you want to move (like `appdata` or `system`), set the **Use cache** option to **Yes**.
3. **Run Mover:** Go to the **Main** tab and click on **Move Now** to start the mover process. This will transfer files from the cache pool to the array.
4. **Verify the move:** After the mover finishes, check that the files have been moved by clicking the folder icon next to the cache entry on the **Main** tab.
5. **Re-enable Docker and VM services:** Once all files are on the array, you can safely turn these services back on.

  </TabItem>

  <TabItem value="array-to-pool" label="Array to pool">

:::info Common use case
Moving files back to the cache pool after maintenance or when you’ve added a new cache device to improve performance.
:::

To move files from the array to a pool:

1. **Disable Docker and VM services:** Go to **Settings** and turn off Docker and VM Manager to prevent any open files from interfering.

2. **Set share to use cache: Prefer:** In the **Shares** tab, for each share you want to move (like _appdata_ or _system_), set the **Use cache** option to **Prefer**.

3. **Run the mover:** Go to the **Main** tab and click on **Move Now** to start moving files from the array to the cache pool.

4. **Verify the move:** After the mover finishes, check that the files are now on the cache pool.

5. **Re-enable Docker and VM services:** Once the move is complete, turn Docker and VM Manager back on in **Settings**.

6. **(Optional) Set share to use cache: Only:** If you want all files for a share to remain on the cache pool, set the **Use cache** option to **Only** for that share.

  </TabItem>
</Tabs>

---

## Multiple pools

Unraid allows you to create and manage up to 35 separate storage pools, each with up to 30 devices. Multiple pools give you flexibility to allocate storage for different tasks, improve performance, and customize redundancy based on your needs. Each pool can use a different file system, RAID level, and device type (SSD, HDD, NVMe, etc.).

**Why use multiple pools?**

- **Optimize performance:** Separate pools for VMs, Docker containers, downloads, or media can enhance speed and reduce conflicts.
- **Protect data:** Assign different RAID levels or file systems to each pool for tailored redundancy and backup options.
- **Isolate workloads:** Keep critical applications on faster, redundant pools and store bulk data on larger, cost-effective devices.
- **Manage flexibly:** You can expand, reduce, or format pools independently without impacting others.

**Common use cases include:**

| Use case                          | Configuration example                   | Benefit                                 |
|------------------------------------|----------------------------------------------|-----------------------------------------|
| High-performance VMs               | NVMe SSD pool, RAID 1, BTRFS or ZFS          | Fast I/O with redundancy                 |
| Docker/Appdata storage             | SSD pool, RAID 1, BTRFS                      | Quick access and data protection        |
| Bulk media downloads               | Large HDD pool, RAID 0 or single, XFS/BTRFS  | High capacity with less redundancy      |
| Project/Team isolation             | Separate pools for each team/project          | Reduces resource conflicts              |
| Snapshots and backup targets       | ZFS pool, RAIDZ1/2 (multi-device)            | Supports native snapshots and backups    |

:::info Supported File Systems

- **BTRFS:** Best for multi-device pools (supports RAID 0, 1, 10, 5, 6).
- **ZFS:** Can be used for both single and multi-device pools (Unraid 6.12+).
- **XFS:** Suitable for single-device pools.
:::

When accessing a user share from multiple pools and array disks, Unraid merges the directory listings in this order:

1. Pool assigned to the share
2. Array disks (disk1, disk2, ..., disk28)
3. Other pools (in order)

### Moving files between pools

Unraid doesn’t allow direct file movement between pools through the WebGUI, but you can do it using the **Mover** tool or via command line.

:::note Remember
Any the files belong to a Docker container and/or VM then the services must be disabled for the files to be moved successfully.
:::

<Tabs>
  <TabItem value="using-mover" label="Using Mover" default>

1. **Disable Docker and VM services:**  
   Go to **Settings** and turn off Docker and VM Manager to prevent open files.

2. **Move files from pool1 to the array:**  
   - Go to the **Shares** tab. For each share, set **Use cache** to **Yes** (if files are on pool1).
   - In the **Main** tab, click **Move Now** to run Mover. Wait for it to finish.

3. **Move files from the array to pool2:**  
   - In the **Shares** tab, set **Use cache** to **Prefer** and assign the share to pool2.
   - In the **Main** tab, click **Move Now** again. Files will move from the array to pool2.

4. **Re-enable Docker and VM services** (if needed).

:::note Timing
Moving large data sets can take hours, depending on file size and device speeds.
:::

  </TabItem>
  <TabItem value="manual-transfer" label="Manual file transfer (Advanced)">

1. **Disable Docker and VM services** as described above.
2. Use `rsync` or `mv` commands to transfer files between mount points (e.g., `/mnt/pool1/share` to `/mnt/pool2/share`).
3. Verify the files before deleting them from the original pool.
4. Re-enable Docker and VM services.

:::caution
Always check your file paths and use the correct share names to prevent data loss.
:::
  </TabItem>
</Tabs>

:::warning
If you remove a device from a BTRFS pool and move it to a new pool, Unraid will erase all data on it when the array restarts. Always back up important data before changing pool configurations.
:::
