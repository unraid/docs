---
sidebar_position: 4
sidebar_label: File systems
---

# File systems

### Selecting a file system type

Selecting the right file system for your Unraid array or cache pool is crucial. It helps you achieve a balance between performance, data protection, and advanced features. Unraid supports several modern Linux file systems, each with its own unique strengths and specific use cases:

| File System | Data Protection           | Space Efficiency         | Advanced Features           | Best Use Case                                      |
|-------------|--------------------------|-------------------------|-----------------------------|----------------------------------------------------|
| XFS         | No built-in redundancy   | 100%                    | Robust against corruption   | Default for array drives; high reliability          |
| ZFS         | RAID-Z, mirrors, etc.    | Varies by RAID level    | Checksums, snapshots, RAID  | Multi-device pools, VMs, Docker, advanced users     |
| BTRFS       | RAID 0/1/10/5/6, mirrors | Varies by RAID level    | Checksums, snapshots, RAID  | Multi-device pools, mixed SSD/HDD, flexible pools   |

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="xfs" label="XFS" default>

**XFS** is the default file system for array drives in Unraid. It’s known for its robustness and ability to recover from corruption after unexpected shutdowns or crashes. Each drive formatted with XFS acts as a self-contained file system, making data recovery straightforward on any Linux system.

- **Data protection:** No built-in redundancy; relies on Unraid's parity for protection.
- **Performance:** Consistent and reliable.
- **Best for:** Array drives, especially when stability and ease of data recovery are priorities.

</TabItem>
<TabItem value="zfs" label="ZFS">

**ZFS** is a modern file system that comes with advanced features such as checksums to detect bit corruption, snapshots for backups, and native RAID support options like RAID-Z and mirrors. ZFS can be utilized for both single-device and multi-device pools in Unraid 6.12 and later.

- **Data protection:** Supports various RAID levels for redundancy.
- **Performance:** Excellent, particularly for multi-device pools.
- **Best for:** High-performance environments, virtual machines, Docker, or when advanced features like snapshots are required.

</TabItem>
<TabItem value="btrfs" label="BTRFS">

**BTRFS** provides flexible RAID support, checksums for data integrity, and efficient management of mixed-size drives in pools. It serves as the default file system for cache pools and supports both single-device and multi-device configurations.

- **Data protection:** Supports RAID 0/1/10/5/6 (note that RAID 5/6 are still experimental).
- **Performance:** Good, with flexibility for expansion and contraction.
- **Best for:** Cache pools, especially if you plan to mix SSDs and HDDs or need an easy way to expand.

</TabItem>
</Tabs>

:::note Additional Notes

- Mixing different file system types in your Unraid system is perfectly acceptable; the Unraid parity system works independently of the file system used.
- Always format and partition drives within Unraid to ensure compatibility.
- Linux systems can read these file systems natively; however, Windows and macOS will require additional software for access.
- You can <u>encrypt</u> drives for enhanced security, but keep in mind that encrypted drives might pose challenges for recovery if corruption occurs.
- For transfer drives or external devices, it’s recommended to use the **Unassigned Devices** plugin, which supports additional file systems.
:::

:::tip Still need help choosing?

- **For array drives:** XFS is generally the best choice for most users.
- **For high-performance or advanced features:** Choose ZFS or BTRFS for cache pools or multi-device setups.
- **For mixed or expanding pools:** BTRFS is ideal if you want to use different drive sizes or easily add or remove devices.

If you're uncertain, starting with the defaults is a good approach: use XFS for array drives and BTRFS for cache pools.
:::

---

## Setting a file system type

When adding a new drive to Unraid, you can select the file system type that works best for your needs. The file system determines how data is organized and protected on the disk.

To set the file system type:

1. **Set the default globally:**  
   - Navigate to **Settings → Disk Settings** to set the default file system for new array drives and cache pools.  
   - Unraid defaults to **XFS** for array drives and **BTRFS** for cache pools.

2. **Set the file system for an individual drive:**  
   - Stop the array.
   - Click on the drive in the **Main** tab.
   - Choose your desired file system type from the drop-down menu.
   - If you select **auto**, Unraid will use the global default.
   - For multi-device cache pools, only **BTRFS** or **ZFS** are supported.

---

## Creating a file system (formatting)

Before using a new disk in Unraid, you must format it with the selected file system. **Remember, formatting will erase all existing content on the drive.**

To begin with formatting:

1. Start the array.
2. Drives that are not recognized will appear as **unmountable**.
3. Verify that all unmountable drives are the ones you want to format.
4. Check the box to confirm, read the warning dialog carefully, and click **Format**.
5. The format process will begin.  
   - For new disks, Unraid will first rewrite the partition table.
6. Formatting usually takes a few minutes. If you don't see progress, refresh the **Main** tab.

Once formatting is complete, the drive is ready to store files.

---

## Changing a file system type

You may want to change the file system type on a specific drive to take advantage of new features or to ensure compatibility with your other drives. 

:::warning
Changing the file system type will **erase all existing data** on the drive. Always back up any important files before proceeding.
:::

To change the file system type on a particular drive:

1. **Stop the array:** Begin by stopping your array to ensure no operations are occurring during the change.

2. **Select the drive:** In the **Main** tab, click on the drive that you want to change the format for.

3. **Choose the new file system:** From the drop-down menu, select the desired file system format. If you have multiple drives to change, repeat this step for each one.

4. **Start the array:** Once you have selected the new file systems, start your array again.

5. **Format unmountable drives:** The **Main** tab will display an option to format unmountable drives. Take a moment to check the list and ensure that only the drives you intend to change are included.

6. **Confirm and format:** Check the confirmation box to acknowledge the change, then click the **Format** button to proceed.

7. **Wait for the process to finish:** Formatting usually takes just a few minutes. If you notice that the status isn't updating, you can refresh the Main tab to check the progress.

If you encounter any issues, feel free to visit the [Unraid forums](https://forums.unraid.net/). Attach your system diagnostics zip file (found under **Tools → Diagnostics**) for assistance.

:::note Note for SSDs  
To securely erase the current contents of an SSD, you can use the following command in the console (ensure you replace `X` with the correct device letter as displayed in the WebGUI):

```
blkdiscard /dev/sdX
```

Be very careful to identify the correct device, as this command will permanently erase all data on the drive.
:::

---

## Converting to a new file system type

If you want to change the file system type on a drive but keep its data, you must migrate the contents before reformatting. This process is especially common for users moving away from the deprecated ReiserFS (used in older Unraid versions) to XFS or BTRFS, but it applies to any file system conversion.

:::important
This process requires temporarily moving your data to another location. Make sure you have enough free space elsewhere in your array or on an external device before you begin.
:::

To safely convert to a new file system type:

1. **Copy all data off the drive:** Move your files to another location. This could be another drive in your array, a cache pool, or an external backup.  
   - If you’re converting multiple drives, do so one at a time to minimize risk and space requirements.
   - Many users schedule conversions after adding a new drive to the array to create the needed free space.
2. **Change the file system type:** Follow the procedure for changing a file system type. This will format the drive and erase all content, leaving you with a blank drive in the new format.
3. **Copy your data back:** Move the saved files back to the newly formatted drive.
4. **Repeat as needed:** If you have more than one drive to convert, repeat these steps for each drive, transferring data as needed.

:::note Timing
The process can take several hours, depending on the amount of data and the speed of your drives. Most of the time is spent copying files, which can run unattended.
:::

:::tip
If you are migrating from ReiserFS, this is the safest way to preserve your data since support for ReiserFS is being removed from Unraid and the Linux kernel.
:::

If you have questions or run into issues, ask for help on the [Unraid forums](https://forums.unraid.net/) and include your system diagnostics for faster assistance.

---

## Reformatting a drive

Reformatting a drive in Unraid will erase all of your data and create a new, empty file system. This process is useful for securely erasing a drive, resolving persistent file system errors, or starting fresh with a new format.

:::warning
Reformatting will permanently erase all data on the drive. Always back up any important files before you begin.
:::

To **safely** reformat your drive:

1. **Stop the array.**
2. **Change the file system type:**
   - Go to the **Main** tab and click on the drive you want to reformat.
   - Select a different file system type (for example, change from XFS to BTRFS).
   - Start the array, and the drive will show as **unmountable**.
   - When prompted, format the drive.
3. **(Optional) Change back to your original file system type:**
   - Stop the array again.
   - Change the file system back to your preferred type.
   - Start the array and format the drive once more.

This simple process ensures that the drive is fully wiped and formatted as you desire. The formatting process usually takes just a few minutes.

### Reformatting a cache drive

Sometimes, you'll need to reformat a cache drive for the following reasons:

- To change the file system type (for example, from BTRFS to XFS or vice versa)
- To fix persistent file system errors
- To start fresh for new workloads

**Recommended procedure for reformatting a cache drive**

1. **Stop the array.**
2. **Disable Docker and VM services** under **Settings**.
3. **Start the array** (this will prevent the Docker and VM tabs from appearing).

**Move data off the cache:**

4. For each share that has files in the cache, set **Use cache** to **Yes**.
   - Note down any shares you change and their original settings.
5. Run **Mover** from the **Main** tab. Wait for it to finish and ensure that the cache is empty.  
   - If any files remain, stop and check the forums for help.

**Reformat the cache drive:**

6. **Stop the array.**
7. **Set the cache drive format** (choose between XFS or BTRFS).
   - For a single-drive cache, XFS is the recommended option.
   - Note that XFS is only available if you have one cache slot.
8. **Start the array.**
9. **Format the cache drive:**  
   - Confirm that only the cache drive is listed as unmountable.
   - Proceed to format the drive.

**Restoring data and settings:**

10. For each share you changed, set **Use cache** back to its original value (like Prefer, Only, or No).
11. Run the **mover** again to move your data back to the cache.
12. **Stop the array.**
13. **Re-enable Docker and VM services.**
14. **Start the array.**

:::note Timing
The time it takes to move data with the mover and format the drive can vary from several minutes to several hours, depending on the amount of data and the speed of the drive.
:::

:::tip  
If you want to securely erase an SSD, you can use this command in the console (replace `X` with the correct device letter):

```
blkdiscard /dev/sdX
```

Be absolutely sure you have the correct device selected, as this will permanently erase all data.
:::

---

## BTRFS operations

Maintaining your BTRFS pools in Unraid is essential for keeping them running well and ensuring your data stays safe. Two key tools you’ll want to use regularly are **Balance** and **Scrub**. These operations help solve space allocation problems, optimize your storage use, and protect your data from hidden corruption.

Let’s break down what each operation does and when to use them:

<Tabs>
  <TabItem value="balance" label="Balance" default>

The **Balance** operation redistributes data and metadata chunks across your BTRFS pool. This process helps free up space, resolves allocation issues, and can fix “no space left on device” errors even when space seems available.

**When to run Balance:**

- When you encounter “no space left on device” errors but have free space.
- After adding or removing drives in a pool.
- To optimize space usage and improve performance.

**How to run Balance:**

1. In the WebGUI, click on the pool in the **Main** tab and select **Balance**.
2. Optionally, add parameters for advanced use (refer to Unraid Help for details).
3. Click **Start** to begin the process.

:::note Timing
Balance operations can take a few minutes to several hours, depending on the pool size and amount of data.
:::

  </TabItem>

  <TabItem value="scrub" label="Scrub">

The **Scrub** operation reads all data and metadata, checks the integrity of checksums, and repairs any corrupt blocks using available redundant copies. Scrubbing helps identify and fix silent data corruption, known as “bit rot,” before it becomes a significant issue.

**When to run Scrub:**

- As part of routine maintenance (see recommended schedule below).
- After unclean shutdowns or if you suspect corruption.
- More frequently on high-usage pools.

**Recommended schedule:**

- High-usage pools: **Once a week**
- All other pools: **Once a month**

**How to run Scrub:**

1. In the WebGUI, click on the pool in the **Main** tab and select **Scrub**.
2. Click **Start** to initiate the process.

:::note Timing
Scrub operations are usually quicker than a full disk scan because they only check allocated data. Based on pool size and usage, expect this to take anywhere from a few minutes to a few hours.
:::

  </TabItem>
</Tabs>

:::tip
Both **Balance** and **Scrub** can be performed while the system is online, but keep in mind that performance may be affected during these operations. You can monitor the progress in the WebGUI.
:::

For more details on advanced BTRFS features, check out the [official BTRFS documentation](https://btrfs.readthedocs.io/en/latest/Introduction.html).

---

## Unassigned drives

Unassigned drives are storage devices connected to your Unraid server that aren't part of the main array or any cache pool. You can use these drives to transfer files, create backups, or provide fast storage for virtual machines.

:::note
All drives connected to your server when the array starts count toward your Unraid Attached Devices license limit, even if they aren’t assigned to the array or a pool.
:::

**Common uses for unassigned drives:**
- Connect removable drives for easy file transfers or backups.
- Use dedicated drives for high-performance tasks like running virtual machines or temporary data storage.

### Using the Unassigned Devices plugins

To make the most of your unassigned drives, consider installing the following plugins from the **Apps** tab:

- **Unassigned Devices:**  
  This plugin allows you to mount, share, and manage drives with file systems that Unraid supports, like XFS, BTRFS, or NTFS.

- **Unassigned Devices Plus:**  
  This extension broadens your options by supporting additional file systems, including ExFAT and HFS+.

**Key features of these plugins include:**

- Easily mounting and unmounting drives from the Unraid web interface.
- Sharing your unassigned drives over the network.
- Automating the mounting process when the server boots up.
- Formatting or erasing drives for future use.
- Safely disconnecting USB or external drives without hassle.

For more details on installing and managing plugins, check out [Plugins](#plugins) in “Customizing your experience.”


















---

## Troubleshooting

### Drive shows as unmountable

If you see that a drive in Unraid is **unmountable**, it could be due to one of two main reasons:

1. **New drive added**:  
   If you just added a new drive to your setup, it will show as unmountable until you format it. Formatting creates a file system that allows the drive to store files. You can find the steps to format a drive [here](#creating-a-file-system-formatting).

2. **File system problems**:  
   If a drive that was previously working suddenly shows as unmountable, it likely has a file system issue. This can happen due to unexpected shutdowns, problems while writing data, or if the drive has been marked as disabled (which appears as a red 'x' in the WebGUI).

:::important
Do not format an unmountable drive unless you are okay with losing all the data on it. Formatting will erase everything and update the parity information, making recovery impossible. Always try to fix the file system first.
:::

**Steps to take if your drive is unmountable:**

| Situation                                      | Action                                                                                                  |
|------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| New drive that has never been used in Unraid   | Format the drive to create a new file system (check the [formatting steps](#creating-a-file-system-formatting)). |
| Drive that was used before but is now unmountable | Perform a file system check or repair (see [Checking a file system](#checking-a-file-system)). Avoid formatting if you want to keep the data. |

:::note
If a drive is both unmountable and disabled (red 'x'), first run the file system check/repair on the **emulated** drive. If the emulated drive is also unmountable and you attempt to rebuild it, the new drive will also be unmountable.
:::

Fixing the file system typically takes less time than rebuilding the drive, allowing you to access your data without losing anything. Remember, rebuilding a drive does **not** fix file system issues; it merely ensures that the physical drive matches the emulated one, carrying over any existing problems.

**Why is parity not enough?**  
While parity helps recover a failed drive, it cannot fix file system problems. If the file system is corrupted, parity will simply replicate that corruption to the new drive.

**If you’re unsure:**  
- Download your system logs by navigating to **Tools → Diagnostics**.
- For expert help, post your issue along with the diagnostics on the [Unraid forums](https://forums.unraid.net/).

:::note Just to reiterate
- Only format unmountable drives if they are brand new or if you want to erase all data.
- Use the file system check/repair for fixing corrupt files; don’t rely on parity to solve these issues.
- For cache pools with multiple drives, consider using either BTRFS or ZFS.
- Always double-check before formatting or repairing drives to avoid accidental loss of data.
:::

---

### Checking a file system

If a disk that previously mounted without issues now shows as **unmountable**, it typically indicates file system corruption. This may result from an unclean shutdown, a failed write operation, or the disk being marked as disabled in the WebGUI. Checking and repairing the file system is generally quicker and safer than performing a rebuild, so it's advisable to try this before formatting or rebuilding the disk.

:::important
If the WebGUI suggests formatting an unmountable drive, <strong>do not format</strong> unless you intend to erase all data. Formatting will destroy the contents of the drive and update parity, making recovery impossible.
:::

**Preparing to check or repair**

1. **Identify the file system type:**  
   - Navigate to the **Main** tab and select your disk (e.g., Disk 3, Cache).
   - Find the **File system type** (should be XFS, BTRFS, or ZFS).

2. **Start the array in the correct mode:**  
   - For **XFS**, start the array in **Maintenance mode**.
   - For **BTRFS**, start the array in **Normal mode** for a scrub or **Maintenance mode** for a repair.
   - For **ZFS**, refer to the ZFS section below.

3. **If the disk is disabled and being emulated:** Run the check/repair on the emulated disk before attempting a rebuild. If the emulated disk is unmountable, the rebuilt disk will also be unmountable.

**Common error messages**

| Message                                      | Meaning / Action                                                    |
|-----------------------------------------------|--------------------------------------------------------------------|
| **Superblock has bad magic number**           | Severe corruption; attempt a file system repair.                   |
| **Filesystem is dirty**                       | Unclean shutdown; execute a file system check.                     |
| **Metadata corruption detected**              | File system structures are damaged; initiate a repair.             |
| **No valid BTRFS found**                      | Disk may not belong to a valid pool; check pool assignments.       |
| **Mount: wrong fs type, bad option, etc.**    | Incorrect file system selection or disk is unformatted.            |
| **Cannot mount /dev/mdX: Structure needs cleaning** | File system is corrupted; perform a repair.                   |

If you're uncertain about an error message, copy the output and seek assistance on the [Unraid forums](https://forums.unraid.net/).

#### Via the WebGUI

1. Start the array in the correct mode (refer to the steps above).
2. Go to the **Main** tab and select the disk you wish to check.
3. Scroll to **Check Filesystem Status**.
4. Enter any necessary options (for details, see Help in the upper right).
5. Click **Check** to initiate the process.
6. Monitor the progress in the output box. Use **Refresh** if required.
7. Review the results. If uncertain, copy the output and post it on the [forums](https://forums.unraid.net/) for advice.

#### Via the command line

<Tabs>
  <TabItem value="xfs" label="XFS">

To check an XFS file system via command line:

- Start the array in **Maintenance mode**.
- Run the following command:
```
xfs_repair -v /dev/mdX
```
- Replace `X` with the disk number (e.g., `/dev/md1`).
- For encrypted XFS, use `/dev/mapper/mdX`.

- For drives not in the array:
```
xfs_repair -v /dev/sdX1
```
- Ensure you are using the correct device identifier.

:::warning
Running this command on an array disk outside of **Maintenance mode** will invalidate parity.
:::

  </TabItem>

  <TabItem value="btrfs" label="BTRFS">

To check a BTRFS file system via command line:

- To perform a scrub (which checks and repairs many errors automatically), start the array in **Normal mode** and run:

```
btrfs scrub start /mnt/diskX
```

- For a read-only check, start the array in **Maintenance mode** and run:

```
btrfs check --readonly /dev/mdX1
```

- Replace `X` with the disk number.

- For drives not in the array:

```
btrfs check --readonly /dev/sdX1
```

:::warning
Running this command on an array disk outside of **Maintenance mode** will invalidate parity.
:::

  </TabItem>

  <TabItem value="zfs" label="ZFS (coming soon)">

Details for ZFS file system checks will be added once full ZFS support is documented in Unraid.

  </TabItem>
</Tabs>

:::tip

- File system repairs are generally faster than a complete rebuild and can restore access without data loss.
- Rebuilding a disk does **not** resolve file system corruption; always run a check or repair first.
- If you have doubts, post your diagnostics and error messages on the Unraid [forums](https://forums.unraid.net/) for expert assistance.

:::

---

### Repairing a file system

If a check of your file system finds errors, you might need to run a repair to get access to your data again. Repairs typically take less time than a full rebuild, but it's important to read the output carefully and reach out for help on the [forums](https://forums.unraid.net/) if you're unsure about anything.

:::note Timing
Repairs can take anywhere from several minutes to several hours, especially for larger or heavily corrupted file systems. Progress might seem slow, but you can check on the activity by looking at the read/write statistics on the Main page.
:::

**Preparing to repair:**

- **Identify the file system type:**  
  Go to the **Main** tab, click on the disk, and find out what type of file system it is (XFS, BTRFS, or ZFS).
  
- **Start the array in the correct mode:**  
  - For **XFS**: Use **Maintenance mode**.
  - For **BTRFS**: Use Normal mode for a scrub; use **Maintenance mode** for a repair.
  - For **ZFS**: Check the upcoming ZFS section (coming soon).
  
- **If the disk is disabled and being emulated:**  
  Run the repair on the emulated disk before trying to do a rebuild.

#### Via the WebGUI


1. Start the array in the correct mode (refer to the section above).
2. Go to the **Main** tab and click on the disk you want to repair.
3. Scroll down to **Check Filesystem Status**.
4. Remove any options that would run the process in check-only mode (like `-n` for XFS or `--readonly` for BTRFS).
5. If prompted (especially for XFS), add the suggested option (e.g., `-L` for XFS) as indicated in the check output.
6. Click on **Check** to begin the repair.
7. Keep an eye on the progress in the output box. Use **Refresh** if needed.
8. If you notice a `lost+found` folder after the repair, it may contain files or folders that couldn't be fully recovered. Use backups or the Linux `file` command to identify the contents if necessary.

:::info
If you're uncertain about the output, copy and share it on the [Unraid forums](https://forums.unraid.net/) for expert help. Use the code formatting option to keep it readable.
:::

#### Via the command line

<Tabs>
  <TabItem value="xfs" label="XFS">

- Start the array in **Maintenance mode**.
- Run the following command:  
`xfs_repair /dev/mdX`  
  Replace `X` with the disk number (e.g., `/dev/md1`).
- For encrypted XFS, use:  
`/dev/mapper/mdX`.

- If you're prompted to use `-L`, re-run the command like this:  
`xfs_repair -L /dev/mdX`  
  This is usually safe and necessary to complete the repair.

- For drives that are not part of the array:  
`xfs_repair /dev/sdX1`.

:::caution
Running this command on an array disk outside of **Maintenance mode** will invalidate parity.
:::

  </TabItem>

  <TabItem value="btrfs" label="BTRFS">

- To perform a scrub (which detects and repairs many errors automatically), start the array in **Normal mode** and run:  
`btrfs scrub start /mnt/diskX`.
  
- For a full repair, start the array in **Maintenance mode** and run:  
`btrfs check --repair /dev/sdX1`.  
  Only use `--repair` if advised by the [forums](https://forums.unraid.net/) or documentation, as it can sometimes lead to further issues.

:::caution
Always get advice before using `--repair` with BTRFS, as it may occasionally cause more problems.
:::

  </TabItem>

  <TabItem value="zfs" label="ZFS (coming soon)">

Information on ZFS file system repairs will be added once full ZFS support documentation is available in Unraid.

  </TabItem>
</Tabs>

:::info After the repair  
- Stop and restart the array in Normal mode.  
- The drive should now mount and be accessible.  
- If you see a `lost+found` folder, check its contents for any important files.
:::

If you don’t understand the repair output or if the process fails, share your diagnostics and repair log on the [Unraid forums](https://forums.unraid.net/) for further assistance.
