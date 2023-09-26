---
sidebar_position: 7
---

# Data Recovery

_THIS SECTION IS STILL UNDER CONSTRUCTION_

_A lot more detail still needs to be added_

This section is about recovering your data when Unraid reports problems
with one or more drives.

There are some important points to bear in mind about securing your
data

- **Backup critical data:** Unraid will protect you against most types
  of simple hardware failure, but not catastrophic failure. You should
  **ALWAYS** have backups of any critical data that you cannot afford
  to lose. Ideally one of those copies should be offsite or on the
  cloud to protect yourself against unforeseen issues such as fire,
  theft, flood, etc.
  - Each user has to make their own determination of what they deem
    critical and make an assessment of the level of risk they are
    prepared to take.
  - Personal data such as photographs & documents tend to always be
    deemed critical. Luckily these tend to be relatively small so
    easy to back up.
  - Media files are often deemed non-critical and are relatively
    large so a user may well decide these do not merit being backed
    up
  - Personal video that can never be replaced should fall into the
    critical category regardless of its size
  - Remember that there are things such as _ransomware_ around so
    there should be at least one copy of critical files that cannot
    be accessed online and corrupted if you are unfortunate enough
    to suffer from such an attack!
- _Be proactive_ about resolving any issues that are detected by
  Unraid. Make sure that notifications are enabled under
  _Settings-\>Notifications_ so that you get told as soon as issues
  are detected. For many users, Unraid operates in a _fire-and-forget_
  mode so that they will not be actively checking for problems so need
  such reminders.
- **Ask for Advice:**
  - The Unraid forums have lots of knowledgeable users who can help
    guide you through what needs doing to get your data back into a
    standard if you are not sure what are the best steps to take.
  - Unraid is very good about protecting your data against typical
    hardware failures, but it is not immune to users taking
    inappropriate steps to recover their data after a failure
    occurs.

## Unmountable Disk(s)

If a disk that was previously mounting fine suddenly starts showing as
**unmountable** then this normally means that there is some sort of
corruption at the file system level. This most commonly occurs after an
unclean shutdown but could happen any time a write to a drive fails or
if the drive ends up being marked as 'disabled' (i.e. with a red ','
in the Unraid GUI).

**IMPORTANT:** At this point, the Unraid GUI will be offering an option
to format unmountable drives. This will erase all content on the drive
and update parity to reflect this making recovering the data
impossible/very difficult so do **NOT** do this unless you are happy to
lose the contents of the drive.

The correct way to proceed in such a case is to follow the procedure for [checking and repairing](../manual/storage-management.md#checking-a-file-system) the file system. The vast majority of the time this will repair the disk that was previously showing as unmountable and now it will mount correctly and all your data will be intact. If you are not sure how to proceed then ask a question in the Unraid forums.

## Lost Array Configuration

If you have lost the array configuration and do not have a current
backup of the flash drive the data will still be intact on the drives.

All configuration information is stored on the flash drive in the
_config_ folder. In particular, the Unraid array configuration is stored
in the _config/super.dat_ file.

- _Do not attempt to use an out-of-date backup that may have incorrect
  drive assignments._

If you know which drives were the parity drives then you can simply
reassign the drives. However, if you do not know which were the parity
drives then you have to be more careful as incorrectly assigning a drive
to parity that is really a data drive will result in you losing its
contents.

When you do not know which were your parity drives the following steps
can get your array back into operation:

1. Assign all drives as data drives
2. Start the array
3. All the genuine data drives should show as mounted and the parity
   drive(s) show as _unmountable_. If this is not the case and too many
   drives show as unmountable then stop and ask for help in the forums
   giving details of what happened.
4. Make a note of the serial numbers of the parity drives.
5. Stop the array
6. Go to Tools-\>New Config. Select the option to retain current
   assignments (as it reduces the chance of error). Click the yes I
   want to do this and then Apply.
7. Go back to the Main tab and correct the assignments of the parity
   drives. Double-check you have the right drives now assigned as
   parity drives as assigning a data drive to parity will lose its
   contents. You can move any other drives around at this stage as
   well.
8. Start the array and the system will start building parity based on
   the current assignments.

All your User Shares will re-appear (as they are simply the aggregation
of the top-level folders on each drive) but with default settings, so
you may need to re-apply any customization you want.

You can now go configure any other customization that is appropriate and
add any plugins you normally use.

At this point, it is strongly recommended that you click on the flash
drive on the Main tab and select the option to download a backup of
the flash drive. It is always good practice to do this any time you make
a significant change.

## Using _ddrescue_ to recover data from a failing disk

In normal use, a tailed/disabled disk is recovered under Unraid using the [Replacing Disks](../manual/storage-management.md#replacing-disks) procedure.

Occasionally it can happen due to a variety of reasons, like a disk
failing while parity is invalid or two disks failing with single parity,
a user having a failing disk with pending sectors and no way to rebuild
it using parity, the normal Unraid recovery processes cannot be used. In
such a case you can try using **ddrescue** to salvage as much data as
possible.

To install _ddrescue_ install the Nerd Pack plugin then go to Settings
-\> Nerd Pack and install _ddrescue_.

You need an extra disk (same size or larger than the failing disk) to
clone the old disk to, using the console/SSH type:

`ddrescue -f /dev/sdX /dev/sdY /boot/ddrescue.log`

Both source and destination disks can't be mounted, replace X with
source disk, Y with destination disk, always triple-check these, if the
wrong disk is used as destination it will be overwritten deleting all
data.

It's also possible to use an array disk as the destination, though only
if it's the same size as the original, but to maintain parity you can
only clone the partition, so the existing array disk needs to be a
formatted Unraid disk already in any filesystem, still to maintain
parity you need to use the md# device and the array needs to be started
in maintenance mode, i.e., not accessible during the copy, by using the
command:

`ddrescue -f /dev/sdX1 /dev/md# /boot/ddrescue.log`

Replace X with source disk (note the 1 in the source disk identifier), \#
with destination disk number. It is recommend to enable turbo write
first or it will take much longer.

Example output during the 1st pass:

```
GNU ddrescue 1.22
ipos:  926889 MB, non-trimmed:    1695 kB,  current rate:  95092 kB/s
opos:  926889 MB, non-scraped:        0 B,  average rate:  79236 kB/s
non-tried:    1074 GB,  bad-sector:        0 B,    error rate:       0 B/s
rescued:  925804 MB,   bad areas:        0,        run time:  3h 14m 44s
pct rescued:   46.28%, read errors:       54,  remaining time:      3h 18m
time since last successful read:          0s
Copying non-tried blocks... Pass 1 (forwards)
```

After copying all the good blocks ddrescue will retry the bad blocks,
forwards and backwards, this last part can take some time depending on
how bad the disk is, example:

```
GNU ddrescue 1.22
ipos:   17878 MB, non-trimmed:        0 B,  current rate:       0 B/s
opos:   17878 MB, non-scraped:   362496 B,  average rate:  74898 kB/s
non-tried:        0 B,  bad-sector:    93696 B,    error rate:     102 B/s
rescued:    2000 GB,   bad areas:      101,        run time:  7h 25m  8s
pct rescued:   99.99%, read errors:      260,  remaining time:         25m
time since last successful read:         10s
Scraping failed blocks... (forwards)
```

After the clone is complete you can mount the destination disk manually
or using for example the UD plugin (if the cloned disk is unmountable
run the appropriate filesystem repair tool, it might also be a good idea
to run a filesystem check even if it mounts OK) and copy the recovered
data to the array. Some files will likely be corrupt and if you have
checksums or are using BTRFS you can easily find out which ones. If not
see below.

If you don't have checksums for your files (or use btrfs) there's a
way you can still check which files were affected:

Create a temporary text file with a text string not present on your
data, e.g.:

`printf "Unraid " >~/fill.txt`

Then fill the bad blocks on the destination disk with that string:

`ddrescue -f --fill=- ~/fill.txt /dev/sdY /boot/ddrescue.log`

Replace Y with the cloned disk (not the original) and use the existing
ddrescue mapfile.

Finally mount the disk, manually or for example using the UD plugin and
search for that string:

`find /mnt/path/to/disk -type f -exec grep -l "Unraid" '{}' ';'`

Replace /path/to/disk with the correct mount point, all files containing
the string "Unraid" will be output and those are your corrupt files,
this will take some time as all files on the disks will be scanned, the
output is only displayed in the end, and if there's no output then the
bad sectors were in areas without any files.
