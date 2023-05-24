# Cache Disk

**Important!** This page is a basic introduction to the Unraid Cache
  drive, but was written for v4 and v5. There is no mention of
  Dockers, VM's, or Cache Pools. For v6 users, this page serves as an
  introduction, but you should also check these resources:
* [FAQ](https://forums.unraid.net/forum/index.php?topic=48508) -
  look for the *Cache Drive/Pool* section, has a number of related
  procedures
* [How to add a cache drive, replace a cache drive, and create a
  cache pool](https://forums.unraid.net/forum/index.php?topic=56005) -
  a nice video guide

The cache disk feature of Unraid greatly increases the perceived
performance of the system when writing data to a parity-protected array.
It is particularly useful for users who write data to the array on a
regular basis, and can also be used as a scratch disc for certain
applications. The feature was introduced in version 4.3.

## Overview

A cache disk is a hard drive that is not part of the normal
parity-protected array. When a cache disk exists in the system, it is
visible as a disk share named 'cache' (provided disk shares are being
exported). You may read data from or write data to the cache share just
as you would any other disk share. As the cache disk is outside of the
parity-protected array, writes will be much faster, but of course if
this disk fails, all its data may be lost.

The real power of a cache disk is realized when User Shares are enabled.
The cache disk may be automatically 'included' in every user share.
Hence any object -- a file or directory - created on a user share is
created on the cache disk (provided that enough space is available).
Therefore, when you browse the files on a user share, the listings will
transparently include objects on the cache disk as well as those on the
other data disks.

In order to prevent the cache disk from filling up, a utility called the
'mover' will move objects from the cache disk to the array proper. You
can set a schedule that defines when the mover will 'wake up'. The
default schedule is to wake up at 3:40AM every day.

As there is a lag between the time objects are created on the cache
disk, and when they are moved to the array, it may be desirable to
disable the cache disk for certain shares. Each user share therefore has
the option to disable the use of the cache disk for that share.

## Adding a cache disk to the array

In order to create a cache disk using the GUI:

1. Stop the array
2. Click on "Disk" at the top.
3. Look at the very bottom of the page in the Disk Devices section for
    a disk 'slot' labeled Cache (the very last slot).
4. Select any disk not in the array into that slot.
5. Start the array

## Cache settings

This section is present on the Share Settings page when user shares are
enabled, and a cache disk is present and formatted.

**Min. free space** specifies the minimum amount of free space that must
exist on the Cache disk in order for the user share file system to
create objects on the Cache disk. If there is less than this amount of
free space then the object will be created on the array instead.

:   Main article: [Storage Management](/unraid-os/manual/storage-management.md)

## Speed

### Perceived write speed increases

The emphasis here is on 'perceived'. The real, behind-the-scenes write
speed of your Unraid server is unchanged by the addition of a cache
drive. A cache drive simply grants you the fastest transfer that your
hardware will allow by deferring the inevitable parity calculation until
a later time (3:40 am server time, by default).

### Actual write speed increases

How much of a write speed improvement can you expect to see from using a
cache drive? That depends on your hardware. Slower hardware will of
course result in slower transfer speeds. Assuming that you have Gigabit
LAN (GigE) capable network controllers on both sides of the transfer
(the client PC and the Unraid server), a Gigabit LAN router or switch,
appropriate network cables (Cat5e or Cat6), and modern SATA I or better
hard drives, then you should see write speeds in the following ranges:

These numbers represent average transfer speeds when writing data to
Unraid:

**Without a cache drive:** Unraid 4.5.3 - average 20-30 MB/s, peak
reported [40
MB/s](https://forums.unraid.net/forum/index.php?topic=5496.msg51190#msg51190)*

**With a cache drive:** Unraid 4.5.3 - average 50-60 MB/s, peak reported
[101
MB/s](https://forums.unraid.net/forum/index.php?topic=5754.msg120084#msg120084)*

So generally speaking, a server with a cache drive has write speeds
**2-3x faster** than the same server without a cache drive.

- Note: These figures (especially the averages) are based upon
    personal observations by Rajahal and upon reports from other
    reputable sources in these forums.

## The Mover

The Mover is a utility that runs periodically to move files off the
cache disk and onto parity-protected data disk(s). If Mover logging is
enabled, the mover will record all its activity to the system log.

By default the mover is scheduled to run every day at 3:40AM. This may
be changed by defining your own Mover schedule string in crontab format.

If the mover finds no files to move, and the disks are spun-down, the
disks will not spin up. Conversely, file(s) will only be moved if they
are not open for reading/writing -- they will move the next night, when
they are no longer open.

:   Main article: [Storage Management](/unraid-os/manual/storage-management.md)

- The mover will not move any top-level directories which begin with a
    '.' character. Such directories will not exist in normal use, but
    an advanced user may use this knowledge to create directories which
    won't get moved.

- The mover will not move any files that exist in the root of the
    cache disk. Such files will not exist in normal use, but an advanced
    user may use this knowledge to create files which won't get moved
    (for example, a swap file).
- The mover is just a script called '/usr/local/sbin/mover' which
    invokes 'find' to traverse the cache disk and move files to the
    array using the 'mv' command. Advanced users may edit this script
    to fine-tune the mover. For example, it's possible to set
    conditions such as 'move only files older than N days', or 'only
    move files greater than N bytes in size', etc. Refer to the script
    itself and the 'man' page of the 'find' command.

## Other uses for a cache disk

### Warm spare

The purpose of a 'warm spare' is to minimize the amount of time that
your array is without parity protection after a drive failure. A warm
spare is a hard drive that you have installed in your server to prepare
for the eventuality of one of your other hard drives failing. It
requires that the warm spare drive be as large or larger than your
parity drive and your largest data drive

When a drive does eventually fail, you simply stop the array (via the
Main page), unassign the dead drive (via the Devices page), assign the
warm spare (also on the Devices page), and then start the array (back on
the Main page). At this point, your data from the dead drive will be
automatically rebuilt onto your warm spare - this will take many hours,
but your array and all your data is still available for use during this
time (though performance will likely be degraded).

In the classic application, a Warm Spare sits in your server
pre-installed (therefore taking up a SATA/PATA slot and using a small
amount of power), but constantly spun down and unused (as it is not
assigned to a disk slot in Unraid).

However, why not use a warm spare as a cache drive while you wait around
for another drive to fail? This application will of course add a bit of
wear and tear to your warm spare, but nothing outside the scope of
ordinary use.

### Running other software on top of Unraid

As a cache drive is outside of the parity-protected array, it can be
used for alternate software and Unraid add-ons that need to read and
write data often.

### Scratch space

The cache disk can be used as scratch space for torrent client(s), news
clients or web servers. The advantage here is that, for most of the day,
only the one cache disk in the array needs to be spun up. Otherwise, at
least two drives - parity and one data -- will be spun up.

## Disadvantages of a cache disk

### 'Wasted' HDD and HDD slot

One of your hard drives and SATA/PATA slots is dedicated to your cache
drive, instead of long-term data storage

### Short-term risk of data loss

If your cache drive dies, it will take all of the data currently
residing on it to the grave. While it is possible to run ReiserFS data
recovery software on your dead cache drive, there is still a good
possibility of permanent data loss.

By default, the mover script will run once a day at 3:40 am. If you are
concerned about data loss, you can edit the script so that it runs more
frequently and at different times.

## Hardware

The two key factors to consider to when choosing a hard drive to be your
cache disk are:

- Your intended purpose.
- Amount of data

### Purpose

**Increased perceived write speed:** You will want a drive that is as
fast as possible. For the fastest possible speed, you'll want an SSD
(which has the added benefit of being low power) or a 10,000 rpm drive.
If you are on a tighter budget, a 7200 rpm drive such as a WD Black will
do fine. Unless you write a lot of very small files, the size of the
hard drive's cache (8, 16, 32, 64 mb etc.) won't matter much. You can
also eek a bit more performance out of a slower drive by short stroking
it (meaning confine it to only the outside sectors, which are higher
density and can therefore be written to and read from faster), but this
is of course an advanced maneuver.

**As a Warm Spare:** you will want a drive that is the same size or
larger than your parity disk. This drive can be any speed you choose,
just remember that in the event of a parity rebuild (if your parity disk
dies) or a rebuild from parity (if a data disk dies), the process will
proceed at the speed of your slowest disk.

### Amount of data

The final consideration in choosing a cache drive is to think about the
amount of data you expect to pass through it. If you write \~10 GBs per
day, then any drive 10 GB or larger will do (a 30 GB SSD may be a good
fit in this case). If you write 100 GB in one day every few weeks, then
you will want a cache drive that is larger than 100 GB. If you attempt a
data transfer that is larger than the size of your cache drive, the
transfer will fail.
