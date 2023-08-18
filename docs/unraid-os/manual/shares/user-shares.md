---
sidebar_position: 0
---

# User shares

:::tip

Enable or disable user shares in ***Settings > Global Share Settings***. User shares are enabled by default.

:::

## Overview

User shares provide an aggregated view of all top level folders of the same name across the cache and the array drives. The name of this top level folder is used as the share name. From a user perspective this gives a view that can span multiple drives when viewed at the network level. Note that no individual file spans multiple drives - it is just the directory level that is given a unified view.

You manage **User Shares** from the **Shares** tab. There, you can see an overview off all shares on your Unraid server, you can create new shares, and edit or delete existing ones. If you manually create a top level folder on any drive, the system will automatically consider this to be a User Share and assign it default attributes.

When viewed at the Linux level, user shares appear under the path `/mnt/user`. This includes the files on the main array and also any for the share on any pool. A user share is a logical view imposed on top of the underlying physical file system so you can see the same files if you look at the physical level, as described for [Disk Shares](./disk-shares.md).

Note that current releases of Unraid also include the mount point ***/mnt/user0*** that shows the files in User Shares omitting any files for a share that are on any pool. This is a different view of the files on your server. However, this mount point is now deprecated and may stop being available in a future Unraid release.

The physical drive in the main array, used to store a physical file, is controlled by a number of settings for the share, including the [allocation method](#allocation-method), [included or excluded disks](#included-or-excluded-disks), and the [split level](#split-level).

If you change the settings for an existing share, the changes only affect where new files are put after the new settings are applied. Any files already present in the share are left where they are. To move existing files takes manual action.

## Share settings

:::tip

When you configure the settings for the share, select the **Help** icon in the top-right of the Unraid webGUI for detailed information on the individual settings.

:::

### Minimum free space

The **Minimum free space** setting is used with the [allocation method](#allocation-method) and [split level](#split-level). This setting controls how much space must be free for a drive to be chosen for a new file. If the condition is met, Unraid stops putting new data onto the disk (as long as the Split Level setting indicates it can be split to a new disk).

:::note

This parameter must be used when the fill-up allocation method is configured, or disk full errors will occur when there isn't enough space to fit a file you are trying to write.

:::

When Unraid receives a request to store a file, say for example `file.eg`, it has no idea how big the file is. Unraid will pick a spot to place it and begin to store the file data as the data is transferred over the network. Now, this may result in Unraid picking a storage disk with insufficient storage space for the complete file. Unraid is unaware there isn't enough space when it first places the file so it will only find out when the disk is full. At this point, the transfer will fail with a 'disk full' error. So, Unraid will write to a different disk if the minimum free space is set to a value larger than the biggest file size you will ever transfer.

We recommend setting the value to twice the size of the largest file you will ever transfer. For example, if the largest file you have is 8GB in size then set the minimum free space to 16GB. This allows you to transfer files that may vary in size somewhat and not accidentally transfer one too large. The minimum free space is set in Kilobytes (KB).

Here are some examples of the minimum free space setting and their value in KB:

---

| Free space | Value |
| :-- | ---- |
| 500 MB | 500000 |
| 20 GB | 20000000 |
| 40 GB | 40000000 |

Generally, for the purpose of this calculation, consider 1 MB to be 1000 KB, and 1 GB to be 1,000,000 KB.

---

Unraid will still place files on the disk if the [split level](#split-level) does not allow the files to be placed on another disk with more free space. Note that Unraid will typically not move a file onto a new disk if you're overwriting or updating it. For example, a backup file that grows in size over time could end up filling a disk and causing a disk full error.

:::caution

There is also a **Minimum Free Space** setting for cache pools. This is used to determine if a new file for a user share, with the **Use Cache** setting of *Yes* or *Prefer*, should be written to the
cache or, instead, bypass the cache and go directly to the array.

This needs to be set if you want to avoid filling a cache pool which can cause problems. As for this value when used with a User Share it should be larger than the largest file you intend to write, and some people like to make it significantly larger. You get to this setting by clicking on a pool on the Main tab.

:::

### Primary and Secondary storage

The **Primary storage** parameter defines the location - *Cache*, *Array*, or any named pool - to which new files will be written for the selected share. The **Secondary storage** parameter sets the location where files will be moved to if there is not enough room in primary storage.

When primary storage is below the [Minimum Free Space](#minimum-free-space) value, new files and folders are created in secondary storage.

:::important

If you select an *array* or any named pool for your primary or secondary storage, you must also configure its allocation method, split level, and any included or excluded disks.

:::

#### Unraid 6.12 and above

Unraid 6.12 introduces new terminology to make it clearer to users where files are initially placed, and where they will end up. The same functionality is present in earlier releases, but has often been misunderstood by new users.

For the **Primary storage** drop-down:

* This setting is mandatory. You must select a primary storage device or pool. Primary storage has a default value of *Cache*
  * any named pool can be selected.
  * *Array* can be selected.

For the **Secondary storage** drop-down:

* *None*: This means that there is no secondary storage set for this share. Note that secondary storage is optional.
  * if Primary storage is a pool name, then the only options are *None* and *Array*.
  * if Primary storage is *Array*, then only *None* appears as an option.

#### Unraid 6.11 and below

These settings are only found in Unraid 6.11 and earlier. They achieve the same functionality as the settings available in 6.12 but are presented differently.

**Use Cache** (and **Mover Behavior** with user shares)

:::important

Starting with Unraid 6.9, multiple pools can exist and they can have any name you choose. Any of these pools can act as a cache in the way Unraid uses the term. The word cache therefore is referring to this functionality and not necessarily to the pool name.

:::

Unraid includes an application called **Mover** that is used in conjunction with user shares. It's behavior is controlled by the **Use Cache for new files** setting under each user share. The way these settings operate is as follows:

* *Yes*: Write new files to the cache as long as the free space on the cache is above the **Minimum free space** value. If the free space is below that then bypass the cache and write the files directly to the main array.

  When **Mover** runs it will attempt to move files to the main array as long as they are not currently open. Which array drive will get the file is controlled by the combination of the **Allocation Method**, **Split Level**, and **Minimum Free Space** setting for the share.
* *No*: Write new files directly to the array. Which array drive will get the file is controlled by the combination of the **Allocation method**, **Split level**, and **Minimum Free Space** setting for the share.

  When **Mover** runs it will take no action on files for this share even if there are files on the cache that logically belong to this share.
* *Only*: Write new files directly to the cache. If the free space on the cache is below the **Minimum free space** setting for the cache then the write will fail with an out-of-space error.

  When **Mover** runs it will take no action on files for this share even if there are files on the main array that logically belong to this share.
* *Prefer*: Write new files to the cache if the free space on the cache is above the **Minimum free space** setting for the share, and if the free space falls below that value then write the files to the main array instead.

  When **Mover** runs it will attempt to move any files for this share that are on the main array back to the cache as long as the free space on the cache is above the *Minimum free space* setting for the cache

  It is the default setting for the `appdata` and `system` shares that support the Docker and VM subsystems. Generally, you want the files/folders belonging to these shares to reside on the cache as it provides better performance for Docker containers and VMs if their files are not on the main array. This is due to the performance overhead of maintaining parity on the main array which slows down write operations.

  This setting works for a share even if you do not (yet) have a physical cache drive(s) as files will be written directly to the array. If at a later date you add a cache drive, **Mover** will automatically try and move the files in any share set to *Prefer* to the pool defined as the cache for the share. This is why *Prefer* is the default for shares that are located on the cache rather than *Only* as it caters to those who do not (yet) have a cache drive.

##### Moving Files from a Pool (cache) to the Array

This is the more traditional usage of a pool for caching where one wants the files for a particular share initially written to a pool acting as a cache to maximise write speed, but later you want it to be moved to the
main array for long term storage. Most of the time all that is required is to set the **Use Cache** setting for the share to *Yes* and the default behaviour handles the rest with no further user interaction.

Sometimes for one reason or another users find that the files seem to be 'stuck' in a pool. In this situation, the way to get the files belonging to a share from a pool onto the main array is:

* Disable **Docker/VM** services if they are enabled (as files open in these services cannot be moved).
* Change the Use Cache setting for the share to **Yes**
* Manually run mover from the *Main* tab to get it to move *Yes*-type shares from array to the pool (cache).
* When mover finishes you can re-enable the Docker and/or VMs services you use if you disabled them earlier.
* (optional) change the **Use Cache** setting to *Only* to say files for this share can never be written to the array.

##### Moving Files from the Array to a Pool (cache)

One typically wants files associated with running Docker containers or VMs on a pool to maximise performance. It is not unusual for one reason or another to find that one has files on the main array which you really
want to be on a pool. In particular this is likely to happen for the appdata or system shares.

The way to proceed to get the files belonging to a share from the main array onto a pool is:

* Disable **Docker/VM** services if they are enabled (as files open in these services cannot be moved)
* Change the Use Cache setting for the share to **Prefer**
* Manually run **mover** from the *Main* tab to get it to move *Prefer*-type shares from array to the pool (cache).
* When **mover** finishes you can re-enable the Docker and/or VMs services you use.
* (optional) change the **Use Cache** setting to *No* to say files for this share can never be cached on a pool.

### Allocation method

When you create a new user share, or when any object (file or directory) is created within a user share, the system must determine which data disk the user share or object will be stored on. In general, a new user
share, or object within a user share, is created on the data disk with the most free space. However, there are a set of configuration parameters available to fine-tune disk allocation.

The basic allocation strategy for a share is defined by its allocation method configuration parameter. You may select one of three allocation methods for the system to use: **High-water**, **Most-free**, or **Fill-up**.

<!-- * **High-water**: (default) This option attempts to provide a compromise between continually switching drives as is caused by the **Most Free** setting and filling up disks in a sensible manner, but not fill each drive to capacity before using the next one. The aim is to allow related files do be kept together on the same drive and to let unused drives be spun down.
  * It works with switch points based on continually halving the size of the largest drive in the array.
  * Many people find this confusing (particularly in an array with drives of varying size) so, as an example, if you had an array consisting of drives of 8TB, 3TB and 2TB:
    * The largest drive is 8TB so the switch points are 4TB, 2TB, 1TB, and so on, halving the amount in each pass.
    * The 4TB switch point is active so the 8TB drive one would be filled to 4TB free space left.
    * The 2TB switch point becomes active so the 8TB and 3TB drives each get used in disk order until they have 2TB free space
    * The 1TB switch point becomes active so each drive now gets used in disk order until there is only 1TB free space.
* **Fill-up**: Fills up drives in disk order until the free space falls below the Minimum Free Space setting. When this value is reached, it moves onto the next disk. Many users like this setting because their content is static in nature making this a simple way to manage their storage.
* **Most-free**: New files go to the disk with the most free space. This has the downside that the system is continually switching drives which keeps the drives involved spun up.
-->

#### High-water method

The **High-water** setting works with switch points based on continually halving the size of the largest drive in the array. It does multiple passes to fill each disk so at the end of each step there is equal free space left on each disk. This progressively fills each disk but without constantly going back and forth between disks each time new data is written. Most times, only a single disk will be needed when writing a series of files to the array so the array will only spin-up the needed disk. The high-water level is initially set equal to one-half of the size of the largest disk. A new high water level is again set to one-half of the previous high level once all the disks have less free space than the current high water level.

:::important Example

If you have an array that consists of drives of 8 TB, 3 TB and 2 TB, the largest drive is the one that sets the switch points at 4 TB, 2 TB, 1 TB, and so on, halving the amount in each pass.

* While the 4TB switch point is active the 8 TB drive one is filled to 4 TB free space left.
* When the 2 TB switch point becomes active, the 8 TB and 3 TB drives each get used in disk order until they have 2 TB free space
* Finally, the 1TB switch point becomes active, so each drive now gets used in disk order until there is only 1 TB free space.

This pattern continues with progressively smaller high-water levels until the disks are full.

:::

<!-- seems to repeat the already existing content for high-water
Take, for instance, what happens when there is a mix of four disks varying in size from 500 GB to 2 TB in size:

* 1st Pass - The high water level is set to one-half of the size of the 2 TB drive or 1 TB. Each disk will be filled until it has <1 TB of free space remaining. This means no data is stored on disk1 or disk2 since both already have <1 TB of free space. 500 GB of data will be stored on disk3 followed by 1 TB of data being stored on disk4.

* 2nd Pass - The high water level is reset to one-half of the previous level or 500 GB. Each disk will be filled until it has <500 GB of free space remaining. This means no data is stored on disk1 since it already
has <500 GB of free space. 500 GB of data will be stored on disk2 and then 500 GB of data will be stored on disk3 and finally 500 GB of data will be stored on disk4.

* 3rd Pass - The high water level is again reset to one-half of the previous level or 250 GB. Each disk will be filled until it has <250 GB of free space remaining. 250 GB of data will be stored on disk1 and then 250 GB of data will be stored on disk2 and then 250 GB of data will be stored on disk3 and finally 250 GB of data will be stored on disk4. An interesting note is that the 500 GB disk does not get used at all until the third pass. Don't be concerned if the smaller sized disks don't immediately get used with this method.

-->

#### Fill-up method

The fill-up allocation method attempts to fill each disk in order from the lowest numbered disk to the highest numbered disk. The fill-up allocation method must be used in conjunction with the minimum free
space setting. Otherwise, Unraid will begin to give disk full errors and not allow any more transfers once the first disk gets close to being full.

#### Most-free method

The most free allocation method picks the disk with the most free space and writes the data to that disk. Each time a file is written Unraid will check the free space on the included disks and pick the one with the
most free space.

### Split level

The **Split level** setting tells Unraid how many folder levels are allowed to be created on multiple disks. The split level can be used to ensure that the contents of a folder are kept on the same disk. The split level
numbering starts with the user share being the top level and given the number 1.

#### Automatically split any directory as required

When a new file or subdirectory is created in a share, Unraid OS first chooses which disk it is created on, according to the configured [Allocation method](#allocation-method). If the parent directory containing the new file or subdirectory does not exist on this disk, then Unraid OS will first create all necessary parent directories, and then create the new file or subdirectory.

#### Automatically split only the top level directory as required

When a new file or subdirectory is being created in the first level subdirectory of a share, if that first level subdirectory does not exist on the disk being written, then the subdirectory will be created first. If a new file or subdirectory is being created in the second or lower level subdirectory of a share, the new file or subdirectory is created on the same disk as the new file or subdirectory's parent directory.

#### Automatically split only the top "N" level directories as required

Similar to the previous option. When a new file or subdirectory is being created, if the parent directory is at level "N", and does not exist on the chosen disk, Unraid OS will first create all necessary parent directories. If the parent directory of the new file or subdirectory is beyond level "N", then the new file or subdirectory is created on the same disk where the parent directory exists.

#### Manual - do not automatically split directories

When a new file or subdirectory needs to be created in a share, Unraid OS will only consider disks where the parent directory already exists.

:::info

In the event of there being contentions between the **Minimum free space**, **Split Level** and the **Allocation method** settings in deciding which would be an appropriate drive to use, the **Split level** setting always wins. This means that you can get an out-of-space error even though there is plenty of space on other array drives that the share can logically use.

<!-- Move into a Split-level tutorial?

Here is an example showing a possible directory structure for a user share called "Media".

**Note:** I (the original author of this section) consider combining media types into a single large share a poor way to store media. I use a share for each media type. Movies is a share and TV shows is a share. I
combined the movies and TV shows to show the pitfalls in the split levels when doing this as explained after the figure.

Here is an explanation of the different split levels, referenced to the folder structure above;

1. Level 1
   * This is what you have if in the GUI you select the "Automatically split only the top level directory as required" option.
   * The top level Media share can be created on every disk.
   * Every other folder under the Media share must remain on a single disk.
   * This setting does not allow the SD Movies, HD Movies, Kids Movies or TV Shows folders to spread to multiple disks.
   * This setting is too low for all the media.
2. Level 2
   * this is what you have if in the GUI you select the "Automatically split only the top two directory levels as required" option.
   * The top level Media share can be created on every disk.
   * The SD Movies, HD Movies, Kids Movies and TV Shows folders can be created on every disk.
   * Each Movie Folder and TV Show Folder must remain on a single disk.
   * This setting may work well. It will keep each movie and each TV series together on a single disk.
   * This setting may give issues because it keeps each TV series on a single disk. So, a disk may fill as new TV seasons are added to a TV show which is on a disk which is close to full.
3. Level 3
   * This is what you have if in the GUI you select "Automatically split only the top three directory levels as required".
   * The top level Media share can be created on every disk.
   * The SD Movies, HD Movies, Kids Movies and TV Shows folders can be created on every disk.
   * Each Movie Folder and TV Show Folder can be created on every disk.
   * Each Season Folder must remain on a single disk.
   * This setting will allow the contents stored in each Movie Folder to be spread out onto multiple disks.
   * This setting is too high for the different movie types.
4. Level 4
   * This is what you have if in the GUI you select "Automatically split only the top four directory levels as required".
   * The top level Media share can be created on every disk.
   * The SD Movies, HD Movies, Kids Movies and TV Shows folders can be created on every disk.
   * Each Movie Folder and TV Show Folder can be created on every disk.
   * Each Season Folder can be created on every disk.
   * This setting is too high because it will allow the contents of every folder to be spread out onto multiple disks. The split level is not being used to keep similar content together.

The only valid split level for the above example is 2. This causes a split level limitation which forces each complete TV series to a single disk. This can force a new TV season to be placed on a disk which is almost full and result in out of space errors once new episodes completely fill the disk. The split level can't be increased to 3 because each individual movie would not be contained to a single disk.

The first way to fix this split level mismatch issue is to create separate shares for the movies and the TV shows. This way, the movies can be set to use a split level of 2 and the TV shows can use a split level of 3.

For Movies use a split level = 2. This allows the "SD Movies", "HD Movies" and "Kids Movies" folders to be placed on every disk and it keeps each individual movie folder on a single disk. This way, any single movie folder and the contents of the movie folder will remain on a single disk.

For TV_Shows use a split level of either 1 or 2. A split level of 1 will keep each TV series on a single disk and split level of 2 will keep each season on a single disk. The split level of 2 means that the complete TV
series can be stored on multiple disks, however each individual season of that TV series will be on a single disk.

The second way to fix the issue is to add another folder level to the movies, starting first with a Movies folder in the Media share and then placing the different movie types below this.
This user share structure must use split level = 3. SD Movies, HD Movies, Kids Movies and each TV series can exist on multiple disks. This structure means each TV season can be on a different disk. This has the opposite issue compared to the first example. You can not use split level 2 to force each complete TV series to remain on a single disk without messing up the ability of the movies to split to every disk.

Some things to keep in mind.

* The above examples are to demonstrate the use of the split level. It is not necessary to store your media sorted in the same format as the above example illustrates. You may want to use a Movies share and then just place a "Movie Name" folder for each movie directly into the share without sorting the movies by type.
* It is completely valid to force each complete TV series to stay on a single disk. Just understand that a continuing TV series will keep filling the disk where it is first placed. This may require manual intervention to shift some TV series from an almost full disk to an empty disk. Using the Most Free allocation method can help eliminate the issue since a completely new TV series would be placed on the disk with the most free space.

* The above TV example applies to any similar share. It could apply to a Pictures share where you store the pictures in folders based on the year (2010, 2011, 2012 etc) or it could apply to a Music share where you store the music in a folder for each artist. In these cases, a split level of 1 would keep a whole year of pictures on a single disk or it would keep all the music by an artist on a single disk.

#### Disable Split Level

It is also possible to disable the split level by setting a high split level. A file copy or move will fail if a folder is locked to a full disk and an attempt is made to add more files into that folder. Setting a high split level will ensure each file will get written to the server as long as a disk has space for it.

#### Example: Split Level = 1

The following example demonstrates how the share behaves when the split level is set to 1. The Share name is New_Movies. Each movie stored in this share has its own folder. Inside the movie folder is the movie file as well as some metadata files used by MediaBrowser.

The above Windows Explorer screen shot shows the file structure of the New_Movies share on the left and the contents of the A History of Violence movie folder on the right. The levels for this share are labeled on the example. This is what split level = 1 means:

* A New_Movies folder can be created on each disk allowed by the include and exclude disk settings. A new New_Movies folder will be created on the next disk in line when the allocation method calls for Unraid to begin filling the next disk. Note that the New_Movies folder will only be created on the next disk in line when it is necessary and not when the share is created.

* The A History of Violence folder can only exist on one disk. Once it is created on the disk, all of the contents will remain on the same disk. Any changes or additions to this folder will remain on the same disk. For example, a new file called movie.nfo for the XBMC metadata might be created in this folder in the future. The movie.nfo file will be created in the existing A History of Violence folder. A duplicate A History of Violence folder will not be created on another disk to store this new file.

You will notice that the movie folders (500) Days of Summer (2009) and 2 Fast 2 Furious (2003) both appear in the New_Movies share. The next screen shot will show how each of these files is stored on a separate disk.

The above screen shot shows side by side Window Explorer views of the file structure stored on disk1 and disk2. On the left is disk1 and on the right is disk2. The left Explorer window shows the contents of disk1. The New_Movies share is a folder stored at the top level or the root of disk1 with the individual movie directories stored in this directory. The right Explorer window shows the contents of disk2. The New_Movies share is a folder stored at the top level or the root of disk2 with the individual movie folders stored in this directory. As files were being moved into the New_Movies share, Unraid created the New_Movies folder on both disk1 and disk2 to store these files.

The windows side by side can be used to examine the contents of the New_Movies share on a disk by disk basis. You will notice that the movie folder (500) Days of Summer (2009) is stored on disk1 and the movie folder 2 Fast 2 Furious (2003) is stored on disk2. As previously noted, Unraid combines the movies stored on disk1 and disk2 into one network share called New_Movies and both movies appear in the New_Movies network share.

Take note that a share called Movies is also visible on disk2.

##### Split Level 0

This is what you have if in the GUI you select "Manual: do not Automatically split directories".

Split level 0 is a special case. Split level 0 requires you to create the desired top level or parent folder structure. Unraid will unconditionally create an object on the disk that contains the parent folders. Unraid will choose which disk to use according to the allocation method if the parent folders exist on multiple disks.

If you set the Split level to 0, then all directories/files created under that share will be on the same disk where the directory within that share share was originally created. In other words, use level 0 to not allow the share to split automatically across disks.

**NOTE:** If you create the same folder structure on multiple disks then Unraid will apply the other share settings to decide which disk to use.

###### Example

The server has 4 disks. A user share called Media is desired. Different types of media will be stored in this share. The desired structure is:

* disk1 - will hold the DVD movies.
* disk2 - will hold the Blu-ray movies.
* disk3 - will hold the Blu-ray movies.
* disk4 - will hold the TV series.

The desired structure is illustrated below.

On the left side is how the user share will appear and on the right side is the folder structure on each disk. The user will go to each disk and create the folders shown in red to create the storage as listed above.
Then, the Media folder as well as the DVD Movies, Blu-ray Movies and TV Shows folders become the parent folders for everything stored in the Media share. The media will be sorted by disk as follows:

* Movies placed in the DVD Movies folder will go to disk1.
* Movies placed in the Blu-ray Movies folder will go to disk2 or disk3. The disk is selected by the allocation method.
* TV shows placed in the TV Shows folder will go to disk4.

Say one day that disk1 is full and disk5 is added to the server to hold new DVD Movies. The same folders on disk1 must be created on the new disk5. In other words, the folder Media and sub-folder DVD Movies must be created on disk5. Then, Unraid can use either disk1 or disk5 to store DVD Movies.

##### Split By Character

Specify a character in the split level box to use this method. Then, Unraid will not allow any folder name containing the character to split. For example, set the split level to an opening square bracket ( [ ) instead of a number. Then, create each movie folder with the year encased in square brackets after the title in this manner - Iron Man 2 [2010]. Unraid will see the opening square bracket ( [ ) and it will not split this folder or any content stored inside this folder.

This type of split level can allow different levels of sub-folders to be specified as not splitting simply by inserting the character into the folder name which should not split. This can overcome the limitation of having a fixed split level for a share.

-->

:::

### Included or excluded disks

These settings allow you to control which array drives can hold files for the share. Never set both values, set only the one that is most convenient for you. If no drives are specified under these settings then all drives allowed under ***Settings > Global Share settings*** are allowed.

Unraid will first check the included disks(s) set and then the excluded disk(s) set when deciding which disk to place a file on. Then, it will use the split level and allocation method to pick a disk which is allowed to hold the file.

:::important

The include/exclude settings at the individual share level only control which disks new files can be written to. Files on other disks that are in a folder corresponding to the share name will still show up under that share for read purposes.

:::

#### Included disk(s)

The included disks(s) parameter defines the set of disks which are candidates for allocation to that share. All disks may be used by the user share when the Included disk(s) parameter is left blank. Specify the disks to include here. For example, set the included disk(s) to "disk1,disk2,disk3" to allow the share to only use disk1, disk2 and disk3.

#### Excluded disk(s)

The excluded disk(s) parameter defines the set of disks which are excluded from use by the user share. No disks are excluded from use by the user share when the excluded disk(s) parameter is left blank. Specify the disks to exclude here. For example, set the excluded disk(s) to "disk1,disk2" to restrict a share from using disk1 and disk2.

### Default Shares

If [Docker](../docker-management.md) or [VMs](../vm-support.md) are enabled then, Unraid automatically sets up a number of default shares to support their use. You are not required to use these shares, and the system will let you remove them if you do not want to use them for their standard purpose. However, we recommend their use, as it makes it easier to support users who encounter problems.

The shares that fall into this category are:

* `appdata` - This is the default location for storing working files associated with docker containers. Typically there will be a sub-folder for each docker container.
* `system` - This is the default location for storing the docker application binaries, and VM XML templates
* `domains` - This is the default location for storing virtual disk images (vdisks) that are used by VMs.
* `isos` - This is the default location for storing CD ISO images for use with VMs.

:::important

We do not recommend changing the permissions on most default shares, as these may impact the functioning of docker containers and VMs. The exception is the `isos` share that can be shared over the network so you can place new ISOs to use in virtual machines.

:::