# Expanding Windows VM VDisk Partitions

## Overview

If you've followed the steps outlined in [this
article](/unraid-os/manual/vm/vm-management.md#expanding-a-vdisk) to expand a
vdisk for your Windows installation, this article will teach you how to
expand your partition in Windows so you can take advantage of that extra
space. Windows has this pesky habit of adding a recovery partition to
vdisks that gets in the way of allowing you to easily expand your
existing C:\\ partition to take advantage of newly provisioned space in
the vdisk. To get around this, we need to delete that recovery partition
first, then we can use the standard disk management utility in Windows
to extend the C:\\ partition.

## Guide

![](../assets/Resize_vdisk_2_(using_diskpart_to_delete_recovery_partition).PNG)

Perform the following steps _after_ completing the steps in [this
article](/unraid-os/manual/vm/vm-management.md#expanding-a-vdisk) to expand
the vdisk itself:

- Start your Windows VM.
- Open a command prompt (hit the Windows key and type 'cmd' and press
  enter)
- Open diskpart (type 'diskpart' and press enter)
- Type 'list disk' and press enter
- Identify the disk you extended and select it by typing 'select disk
  \#" replacing \# with the numbered disk in the list.
- Type 'list partition' and press enter.
- Take note of which is the 'recovery' partition
  - You specifically are looking for the recovery partition that comes
    after the primary partition (in case there are multiple).
- Type 'select partition \#' and press enter, replacing \# with the
  numbered partition in the list (for recovery).
- Type 'delete partition override' and press enter.
- Right-click the start menu and select 'Disk Management'
- Right-click on the partition you wish to extend and click 'Extend
  Partition'
- Follow the on-screen prompts to complete the process.

![](../assets/Resize_vdisk_3_(extend_partition_in_disk_management).PNG)
![](../assets/Resize_vdisk_4_(partition_has_been_extended_in_disk_management).PNG)
