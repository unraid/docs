---
sidebar_position: 4
sidebar_label: Data recovery
---

# Data recovery

Understanding data protection is important when managing your Unraid server. While Unraid offers strong protection against common hardware failures, no system can guarantee complete immunity to data loss. This section provides guidance on best practices for safeguarding your data, recognizing potential issues, and recovering data when problems occur.

Effective data recovery starts with solid data protection strategies, which include regular backups, proactive monitoring, and careful handling of drive and array configurations.

---

## Backup strategy fundamentals

Even though Unraid offers protection against various hardware failures, having reliable backups of your crucial data is vital. Backups are your last defense against catastrophic failures, ransomware, or accidental deletion.

- **Assess critical data:** Identify irreplaceable or essential files, such as personal documents, photos, and important videos.
- **Multiple backup copies:** Stick to the 3-2-1 rule: keep at least three copies of your data on two different media types, with one copy stored offsite or in the cloud. This minimizes risk from physical disasters like fire or theft.
- **Backup frequency:** Schedule regular backups to reduce the chances of data loss.
- **Ransomware protection:** At least one backup copy should be offline or inaccessible to protect against potential corruption.
- **Backup tools:** For Unraid 7.0 and above, it’s recommended to use **Unraid Connect** for automated backups of your flash and configuration to the cloud. Additional popular backup solutions include:
  - **Duplicati:** A versatile, open-source backup tool that offers deduplication and encryption, supporting cloud, local, USB, and remote destinations.
  - **rclone:** A robust solution for syncing and backing up cloud storage providers.
  - **rsync:** An efficient option for local or remote backups.
  - **borgbackup:** A choice for advanced users interested in deduplicated, encrypted backups.

Users should assess their risk tolerance and backup needs, but utilizing cloud integration and automation is a good starting point for most Unraid users.

:::tip Modern backup strategy

With Unraid 7.0 and up, enable **Unraid Connect** for automated cloud backups of your flash device and configuration. Consider using Duplicati, rclone, or similar tools for important files and shares to create scheduled backups to local, remote, or cloud destinations. Always test your restore process to ensure your backups will work when needed.
:::

:::info Proactive monitoring and support

- **Enable notifications:** Set up notifications in **Settings > Notifications** to receive immediate alerts about system issues.
- **Seek expert guidance:** If you're unsure about recovery steps, consult the [Unraid forums](https://forums.unraid.net/) before taking any action.
- **Regular health checks:** Keep an eye on your drive’s SMART data and perform periodic file system checks.

:::

---

## Unmountable disk(s)

If a previously functional disk becomes **unmountable**, this usually indicates file system corruption, often caused by an unclean shutdown or write failure.

:::danger Critical action
Never format an unmountable disk through the WebGUI! Formatting erases all data and updates parity, making recovery impossible.
:::

### Recovery procedure

When a disk that was previously working fine suddenly becomes unmountable, it’s natural to feel concerned about your data. This type of problem is often caused by file system corruption, which can occur after an unclean shutdown, a power interruption, or a failed write operation. The most important thing to remember is: **do not format the drive** if prompted by the WebGUI. Formatting will erase all existing data and make recovery difficult, if not impossible.

Instead, your first step should be to attempt a file system repair. Unraid provides built-in tools for this, and following the correct procedure can often restore access to your data with minimal risk.

Here’s how to proceed:

1. Review the [file system repair section](../../using-unraid-to/manage-storage/file-systems.md#repairing-a-file-system) in the Unraid documentation. This guide walks you through the process for your specific file system.

2. For disks using the XFS file system (the default for most Unraid setups), run:

   ```bash
   xfs_repair -v /dev/[disk]
   ```

   The `-v` flag provides detailed progress information. This command checks and attempts to repair the file system on the specified disk.

3. For disks formatted with BTRFS, first run a read-only check:

   ```bash
   btrfs check /dev/[disk]
   ```

   Only use repair mode if absolutely necessary and after understanding the risks:

   ```bash
   btrfs check --repair /dev/[disk]
   ```

   :::warning 
   The `--repair` option is extremely dangerous and can cause further data loss. Always backup or image the disk first. Review [the documentation](https://btrfs.readthedocs.io/en/latest/btrfs-check.html) and consider seeking additional advice if you’re unsure.
   :::

If these repair attempts do not resolve the issue or if you encounter errors you don’t understand, it’s best to pause and ask for help on the [Unraid forums](https://forums.unraid.net/). Many experienced users and moderators are available to help guide you through the next steps, and getting a second opinion before proceeding further is always safer.

---

## Lost array configuration

Losing your array configuration can be stressful, but it doesn’t mean your data is gone. The array configuration file (located at `config/super.dat` on your flash device) tells Unraid how your drives are assigned and which ones serve as parity. If you've lost your flash drive or don’t have a recent backup, you can recover your array by carefully reassigning the drives.

Here’s what to do if you find yourself in this situation:

1. In the WebGUI, assign all available drives as data drives. Don't assign any as parity yet.
2. Start the array. Drives previously used for parity will appear as *unmountable* because they don't contain a file system.
3. Write down or take a screenshot of the serial numbers for these unmountable drives—these are your parity drives.
4. Stop the array.
5. Go to **Tools > New Config** and select the option to retain current assignments.
6. Click the checkbox confirming you want to proceed and click **Apply**.
7. Return to the **Main** tab and correctly assign the parity drives using the serial numbers you noted.
8. Start the array to rebuild parity based on your correct assignments.

---

## Recover data using ddrescue

When standard Unraid recovery methods, such as the [replacing disks](../../using-unraid-to/manage-storage/array-configuration.md#replacing-disks) procedure, aren't feasible due to multiple disk failures or invalid parity, specialized tools like **ddrescue** can help you salvage as much data as possible from a failing drive.

:::note Best practices for data recovery

Before you begin, remember that data recovery is a delicate process. Always work from a copy of your failing disk when possible, and avoid writing new data to the source disk. If your data is irreplaceable, consider professional recovery services before attempting advanced recovery yourself. Document your actions and take time—rushing increases the risk of permanent data loss.
:::

The recommended method to install ddrescue is through the **Nerd Tools** plugin (which replaced the deprecated NerdPack in 2022).

To enable ddrescue:

1. Install [Nerd Tools](https://unraid.net/community/apps/c/plugins/p4?srsltid=AfmBOoopT6iVZD4eLH_gtKTkTZgRKdgxBRgNXxdrH_fALqsa8a9SWB9G#:~:text=to%20a%20topic.-,Nerd%20Tools,-unRaid.es) from the **Apps** tab in the Unraid WebGUI.
2. Open **Settings > Nerd Tools** and enable **ddrescue**.

### Cloning a failing disk

You'll need a healthy destination disk that is at least as large as the failing source disk. Make sure neither disk is mounted during the process. Double-check your device assignments before starting; the wrong destination will overwrite and destroy its data.

To clone the entire disk, open a terminal or SSH session and run the following command:

```bash
ddrescue -f /dev/sdX /dev/sdY /boot/ddrescue.log
```

- Replace **X** with the letter of your source disk and **Y** with the letter of your destination disk.
- The `/boot/ddrescue.log` file will track progress and allow you to resume if the process is interrupted.

If you want to clone directly to an array disk while maintaining parity, use the `md#` device and start the array in maintenance mode:

```bash
ddrescue -f /dev/sdX1 /dev/md# /boot/ddrescue.log
```

- Replace **X** with the letter of your source disk (note the `1` for the partition).
- Replace **#** with the number of your destination disk.

:::caution
Always verify device assignments before running ddrescue. Using the wrong destination could lead to total data loss on that disk.
:::

### Translating ddrescue output

During the recovery process, ddrescue will display real-time progress.

Here’s an example of what you might see during the first pass:

```
GNU ddrescue 1.27
ipos: 926889 MB, non-trimmed: 1695 kB, current rate: 95092 kB/s
opos: 926889 MB, non-scraped: 0 B, average rate: 79236 kB/s
non-tried: 1074 GB, bad-sector: 0 B, error rate: 0 B/s
rescued: 925804 MB, bad areas: 0, run time: 3h 14m 44s
pct rescued: 46.28%, read errors: 54, remaining time: 3h 18m
time since last successful read: 0s
Copying non-tried blocks... Pass 1 (forwards)
```

:::note What does this mean?
- **ipos/opos**: Current read/write positions on the source and destination disks.
- **rescued**: Amount of data successfully copied.
- **bad areas/read errors**: Number of problematic regions and read errors encountered.
- **pct rescued**: Percentage of the disk recovered so far.
- **remaining time**: Estimated time to completion.
- **Copying non-tried blocks...**: ddrescue is making its first attempt to read all sectors.
:::

After the initial copy, ddrescue will work on recovering data from bad sectors by making multiple passes and sometimes reading blocks in both directions. This phase can take much longer, especially if the disk is seriously damaged. 

Here’s an example output during this phase:

```
GNU ddrescue 1.27
ipos: 17878 MB, non-trimmed: 0 B, current rate: 0 B/s
opos: 17878 MB, non-scraped: 362496 B, average rate: 74898 kB/s
non-tried: 0 B, bad-sector: 93696 B, error rate: 102 B/s
rescued: 2000 GB, bad areas: 101, run time: 7h 25m 8s
pct rescued: 99.99%, read errors: 260, remaining time: 25m
time since last successful read: 10s
Scraping failed blocks... (forwards)
```

:::note What’s happening now?

- **Scraping failed blocks...**: ddrescue is making repeated attempts to recover unreadable sectors.
- **bad areas/read errors**: These numbers may increase as ddrescue finds more damage, but the goal is to minimize unrecoverable data.
:::

### Mounting and checking the recovered disk

Once ddrescue is complete, you can try to mount the destination disk. Use the **Unassigned Devices (UD)** plugin for easy mounting in the WebGUI. If the disk doesn’t mount, run the appropriate file system repair tool, such as `xfs_repair` or `btrfs check`. Even if the disk mounts, it’s a good idea to run a file system check to ensure integrity.

Once you have recovered the files, copy them to a safe location on your array. Be mindful that some files may be corrupt, especially if the disk had many unreadable sectors. Using checksums (or BTRFS with built-in checksumming) can help you identify damaged files.

### Identifying corrupt files without checksums

If you don’t have checksums, you can still identify files affected by bad sectors using ddrescue’s fill mode:

1. Create a temporary file with a unique string:

   ```bash
   printf "Unraid " > ~/fill.txt
   ```

2. Fill the bad blocks on the cloned disk with that string:

   ```bash
   ddrescue --fill-mode='-' ~/fill.txt /dev/sdY /boot/ddrescue.log
   ```

   Replace **Y** with the destination disk and use the existing ddrescue mapfile.

