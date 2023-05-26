# Dual Booting Windows & Unraid

This procedure is intended to help someone with moderate Linux
experience set up a dual boot environment for Linux, Windows, and
Unraid.

## Why do this?

Sometimes, you need Windows to do HW maintenance, like updating firmware
on the motherboard.

## What you need

- Windows Install disk
- Slackware 13.1 install DVD
- Windows drivers for your motherboard, NIC, video card, and controllers
  for any disks that you want to access under Windows. Particularly if
  you use AHCI mode for your SATA connection for the boot/cache drive.

## Preparation

The trick to multiboot Windows and Unraid on a cache drive is that
Unraid requires the cache partition to be the first one in the partition
table, but Windows insists on reordering the partitions when Windows in
installed, to put the Windows partition first. This is complicated by
the fact that different versions and service packs of Windows have
limitations on where it can read the boot files from... i.e., some
versions of Windows can’t boot if the Windows boot partition is starts
after 32GB, and some, if it starts after 136GB.

Select the drive you want to use for cache. You must then decide:

- how big a partition you want for Cache
- how big a partition you want for Windows
- how much for Linux

So lets say you want 12GB for Windows, and 300GB for cache. With the
rest of the disk (170GB) for Linux. You must determine the number of
sectors used by Windows partition.

Multiple the number of desired GB for the Windows partition by 2,000,000

`12 *2,000,000 = 24,000,000`

This will be the starting sector for the cache partition.

## Partition Disk

1. Boot Slackware to partition disk
2. Run fdisk
3. Change units to sectors (u command)
4. You must create the partitions in this order:
   1. Create a new, primary partition, number 1, starting at sector
      24,000,000, size +300G
   2. Create a new, primary partition, number 2, starting at sector 63
      [default] (or 64) size [accept default]
   3. Create a new extended partition, number 3, using the whole rest
      of the disk.
5. Change the type of partition 2 to type 7 (NTFS)
6. Write the partition table and shutdown.

## Install Windows

1. Boot Windows Installation CD.
2. When you boot Windows Installation, and get to the partitions,
   partition 2 should be listed first and have drive letter C, and be
   12GB in size. That will be where you install Windows.
3. Proceed with a normal Windows install to that partition.
   - Be sure to also add your mobo, NIC, video cards, and other drivers
     after getting Windows installed. You should also take care of any
     necessary service packs and Windows Updates.

## Check Partition Order After Windows Install

Many versions of Windows will reorder the partitions you created with
fdisk in Linux, swapping partitions 1 and 2 so the cache partition is
changed to partition 2, and the Windows partition is number 1. Windows
and Linux will boot fine, but you won’t be able to use it as the cache
drive.

Before shutting down Windows, open c:\boot.ini and see if in the
[operating systems] section it says:

`multi(0)disk(0)rdisk(0)partition(1)\WINDOWS=.......`

That means Windows was installed to partition 1 on the first disk. So
Windows reordered the partitions to make the Windows partition the first
partition. (Insert various expletives here).

To fix this brain-dead move by Windows, take these steps:

1. While still in Windows, duplicate the line in the [operating
   systems] section of boot.ini, and change the second copy so it is
   like this

```shell
multi(0)disk(0)rdisk(0)partition(1)\WINDOWS=.......
multi(0)disk(0)rdisk(0)partition(2)\WINDOWS=.......
```

1. Boot Slackware DVD
2. Run sfdisk -luS and write down the starting and ending sectors for
   partitions 1 and 2.
3. Then run fdisk on the cache drive, change the units to sectors,
   delete partitions 1 and 2, and recreate them using the exact same
   starting and ending sectors you captured using sfdisk, but in the
   proper order, with the cache partition first as partition1, and the
   Windows partition second as partition 2.
4. Change the type of the Windows partition back to 7.
5. Reboot Windows and select the SECOND line in the Windows boot menu,
   and make sure it works. Once you have confirmed it works, you can
   remove the first boot option in the boot.ini, and change the
   “default” to match the “partition(2)\WINDOWS” line.

## Install Linux

Now boot Slackware install DVD, create logical partitions for swap,
root, and anything else you want in the extended partition.

Proceed with a standard Slackware installation. Accept the default of
installing lilo to the MBR.

When done, edit /etc/lilo.conf to your liking.

Finally, format the cache partition (partition1) with ReiserFS.

## Finish

Now start Unraid by booting the flash, and assigning the cache drive.

You can boot Windows or Linux by changing the BIOS settings, or using
the appropriate key at boot time key to get a boot menu, or you can also
edit the syslinux config on the flash to give you multi-boot options.
