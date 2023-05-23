**Problem: You want to consolidate several smaller drives onto a new and
larger drive.**

An example: you have two 2TB data drives and you want to replace them
with a single 4TB drive.

Some notes before you start:

- **IMPORTANT!!! Any time you remove drives from the array, parity
    must be rebuilt. In the example above, there will be one less drive
    at the end, so there will HAVE to be a parity rebuild.**
- Parity drive must be at least as large as the largest single data
    drive. For the example above, parity would have to be at least 4TB.
- You should be reasonably confident in the health of all drives
    before attempting a change to your array configuration. A recent
    parity check and SMART reports for all drives would be a good idea.
- It is recommended that any time a new drive is put in the array, the
    latest version of the preclear script is used on the drive to test
    that it can be trusted in the array. A problem with one disk can
    prevent other disks from being recovered if they have a problem.
- Writing the large amount of data that may be involved with very
    large drives can take many hours. When using a
    [telnet](Terminal_Access.md) session to transfer data, it is
    recommended that the linux **screen** command be used, so the
    session can be resumed if there is any disconnect or timeout. In
    Unraid v6, install the
    **[NerdPack](https://forums.unraid.net/forum/index.php?topic=37541)**
    to obtain **screen** (see the NerdPack notes
    [here](http://lime-technology.com/wiki/index.php/Upgrading_to_UnRAID_v6#Plugins)).
- Ensure that no new files will be written to the affected drives
    during this process. If user shares and caching might involve the
    drives, don't write to the user shares, and run Mover before
    starting to make sure all writes to the drives are finished.
- Any time you change your array configuration, be very careful when
    assigning the parity drive. If you accidentally assign a data drive
    to the parity slot and start the array, that drive will be
    overwritten with parity and the data will be lost!

\
\-\-\-- There are two methods you can use to replace multiple drives
with a single larger drive, the faster method, and the safer method.
Either of these methods can be easily adapted to replace 3 or more
drives with a larger drive.

## Faster Method

This method disables the parity drive while transferring data from the
smaller drives to the larger drive, and then rebuilds parity at the end.
Not having parity allows faster writing to the larger drive.

1. Stop array and power down.
2. Add new larger drive and power up.
3. Stop array and use Tools - New Config.
4. Assign new larger drive to new slot, unassign parity drive, and
    start array.
5. Copy all files from the smaller drives to the larger drive. For
    example, if the smaller drives are Disk 1 and Disk 2, and the larger
    drive is Disk 3, then you could use these commands in console or
    telnet:

    ```shell
    rsync -avX /mnt/disk1/ /mnt/disk3
    rsync -avX /mnt/disk2/ /mnt/disk3
    ```

6. Stop array and power down.
7. Remove smaller drives and power up.
8. Use New Config to unassign removed drives and assign parity. You can
    also change the slot assignment of the new drive or any other drives
    at this point.
9. Start array and let parity rebuild.

## Safer Method

This method rebuilds one of the smaller drives onto the new larger drive
then copies the data from the other smaller drives. This will maintain
parity during the data transfer then rebuild parity after the last of
the smaller drives have been removed.

1. Stop array and power down.
2. Replace one of the smaller drives with the new larger drive and
   power up.
3. Assign new larger drive to replace missing smaller drive, and start
   the array, to let Unraid rebuild onto it.
4. Copy all files from the other smaller drive(s) to the larger drive.
   For example, if a smaller drive is Disk 2 and the larger drive is
   Disk 3, then you could use this command in console or telnet:

   ```shell
   rsync -avX /mnt/disk2/ /mnt/disk3
   ```

5. Stop array and power down.
6. Remove the remaining smaller drive(s) and power up.
7. Use New Config to unassign removed drive(s). You can also change the
    slot assignments of the new drive or any other drives at this point.
8. Start array and let parity rebuild.

**Important! If any user shares are set to include/exclude specific
disks, don't forget to update these settings to reflect the new drive
numbering.**
