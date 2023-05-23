# Checking and fixing file systems

### Is this the right page?

* If you suspect or have been told you may have file system
    corruption, then you are on the right page! If you were told you
    have drive errors, you are most likely not in the right place. If
    the drive appears to be missing, then you are definitely not in the
    right place! This page is only for file system issues.

* Your data is stored in files and folders, which are kept in a file
    system such as XFS, ReiserFS, or BTRFS. File systems are stored on
    physical and other types of drives. **The tools and instructions on
    this page are ONLY for the maintenance and correction of file system
    issues, NOT for hardware or other drive issues.** If you have any
    kind of hardware issues or drive errors (read errors, write errors,
    missing, dropped, or red-balled drive), then this is NOT the right
    page! You need a syslog for the errors, and SMART reports for the
    drives.
  * If hardware or drive issues and running unRAID v6, please see
        [Need help? Read me
        first!](http://lime-technology.com/forum/index.php?topic=39257).
  * If hardware or drive issues  please see the
        [Troubleshooting](/unraid-os/manual/troubleshooting)
        page.

* **Very important!!! Do NOT run these tools
    on the parity drive. It does NOT have a file system, and running ANY
    file system repair tool on your parity drive will likely corrupt
    it!** If you are here because of issues with your
    Parity drive, PLEASE LEAVE NOW! You are in the wrong place! These
    tools and instructions are ONLY for data drives formatted with
    ReiserFS, XFS, or BTRFS.

### Drive names and symbols

* If you will be using the v6 webGui, you don't have to worry about
    using the right drive symbol, as it will be automatically and
    correctly selected for you.

* All others will be working at the command line, and the correct
    drive symbol is vital! You call your drives by names such as **Disk
    5**, and use it in paths like **/mnt/disk5**. Linux has other names
    and symbols internally, for various and important purposes, and your
    success here will depend on using the right one. When the kernel
    identifies a drive and sets it up, it may assign SCSI symbols (e.g.
    **sd 2:0:1:0**), ATA symbols (e.g. **ata7.00**), drive device
    symbols (e.g. **sdj**, full path **/dev/sdj**), and unRAID managed
    drive device symbols (e.g. **md5**, full path **/dev/md5**), all of
    which may refer to the same drive. The SCSI, ATA, and drive device
    symbols will usually be different from each other, but the disk
    number, path name, and unRAID managed drive device name will be
    directly connected. **Disk 7** will always be **/mnt/disk7** and
    will always be **/dev/md7**. However they are not interchangeable,
    each has to be used in the correct context. **Disk 7** is a
    human-readable label, **/mnt/disk7** is a folder, and **/dev/md7**
    is an unRAID managed partition.

* To get a little more technical, we don't actually store data on
    **drives**, we store it in file systems on **partitions** of those
    drives. **NEVER run a file system repair tool on the drive symbol,
    always run it on the partition symbol.** Which one is the partition
    symbol? If **Disk 3** is a data disk associated with **sdj**, then
    the drive symbol is **/dev/sdj**, and the 2 partition symbols are
    **/dev/sdj1** (add a digit one for the first partition, two for the
    second, etc) and **/dev/md3** (for the unRAID managed drive
    partition). Both partition symbols refer to exactly the same
    partition, however I/O access to **sdj1** is direct, access to
    **md3** goes through the unRAID parity management.

* Why is this important for us to understand? Parity protection is
    preserved when the unRAID managed device symbols are used, NOT when
    the Linux device symbols are used. If a drive is **sdj** and has a
    ReiserFS formatted partition on it at **sdj1** and its array name is
    **Disk 5**, then there are 2 ways to check/repair its file system.

* \* **reiserfsck \--fix-fixable /dev/sdj1** *will fix the file system of
the first partition of the drive, but parity won't be updated, parity
will become invalid*

* \* **reiserfsck \--fix-fixable /dev/md5** *will do exactly the same
thing as the command above, EXCEPT the parity protection will be
maintained, parity will stay valid*

* Note: NEVER run the first command on **/dev/sdj**, as it will
        likely corrupt it. ALWAYS run it on the partition, either
        **/dev/sdj1** or **/dev/md5**.

* These file system repair tools can be run against any partition with
    the appropriate file system, not just unRAID data drives. So if the
    drive you want to check or repair is the Cache drive or any other
    drive that is not part of the unRAID array, then parity is
    irrelevant, and you would run the repair tool on the normal
    partition device symbol, e.g **/dev/sdj1**. The examples in the
    sections below however will assume the drive is part of the array
    and you want to preserve parity protection. Adapt the instructions
    as needed for non-array drives.

### Which section?

* Because the instructions are different depending on how your drive
    is formatted AND which version of unRAID you are running, this page
    is divided into 5 sections. Please follow only the instructions in
    the correct section for your drive.

* If you are running unRAID v6, you can use the webGui to check and
    fix the file system of any data drive. Unless you prefer to work at
    the command line, go to [Checking and fixing drives in the
    webGui](#checking-and-fixing-drives-in-the-webgui).

* If you are running unRAID v4 or v5 or prefer working at the command
    line -
  * `<font color=red>`{=html}**It is vitally important that you know
        the file system format of your drive!**`</font>`{=html} **If you
        use the wrong repair tool on your drive, you may severely damage
        it, even worse than it may now be!**
  * If you are running any version of unRAID prior to v5.0-beta8d,
        then go to [Drives formatted with ReiserFS using unRAID
        v4](#drives-formatted-with-reiserfs-using-unraid-v4).
  * If you are running any other v5 version of unRAID, then go to
        [Drives formatted with ReiserFS using unRAID v5 or later](#drives-formatted-with-reiserfs-using-unraid-v5-or-later).
  * If you are running any v6 version of unRAID and the drive is
        formatted with ReiserFS, then go to [Drives formatted with
        ReiserFS using unRAID v5 or
        later](#drives-formatted-with-reiserfs-using-unraid-v5-or-later).
  * If the drive is formatted with XFS, then go to [Drives formatted
        with
        XFS](#drives-formatted-with-xfs).
  * If the drive is formatted with BTRFS, then go to [Drives
        formatted with
        BTRFS](#drives-formatted-with-btrfs).
        *But sorry, that section is not really ready yet.*

## Checking and fixing drives in the webGui

The instructions here are designed to check and fix the integrity of the
file system of a data drive, while maintaining its parity info.

### Preparing to test

* The first step is to identify the file system of the drive you wish
    to test or repair. If you don't know for sure, then go to the Main
    page of the webGui, and click on the name of the drive (Disk 3,
    Cache, etc). Look for **File system type**, and you will see the
    file system format for your drive (should be **xfs**, **reiserfs**,
    or **btrfs**).
* If the file system is **XFS** or **ReiserFS** (but NOT **BTRFS**),
    then you must start the array in Maintenance mode, by clicking the
    Maintenance mode check box before clicking the Start button. This
    starts the unRAID driver but does not mount any of the drives.
* If the file system is **BTRFS**, then make sure the array is
    started, and NOT in Maintenance mode.
* *Important note! Drives formatted with **XFS** or **ReiserFS** must
    be checked and repaired in Maintenance mode. Drives formatted with
    **BTRFS** cannot be checked or repaired in Maintenance mode! They
    must be checked and repaired with the array started in the regular
    mode.*
* From the Main screen of the webGui, click the name of the disk that
    you want to test or repair. For example, if the drive of concern is
    Disk 5, then click on **Disk 5**. If it's the Cache drive, then
    click on **Cache**.
* You should see a page of options for that drive, beginning with
    various partition, file system format, and spin down settings. The
    section following that is the one you want, titled **Check
    Filesystem Status**. There is a box with the 2 words **Not
    available** in it. This is the command output box, where the
    progress and results of the command will be displayed. Below that is
    the **Check** button that starts the test or repair, followed by the
    options box where you can type in options for the test/repair
    command. The options box may already have default options in it, for
    a read-only check of the file system. For more help, click the
    **Help** button in the upper right.

### Running the test

* The default for most file system formats (**XFS** and **ReiserFS**)
    is a read-only check of the file system, with no changes made to the
    drive.
  * If the file system is **ReiserFS**, then the options box will be
        blank initially, which implies the **\--check** option. Always
        begin a ReiserFS drive test session with the **\--check**
        option!
  * If the file system is **XFS**, then the options box will contain
        the **-n** option (it means check only, **n**o modification
        yet). We recommend adding the **-v** option (it means
        "**v**erbose" for greater message display), so add a **v** to
        the **-n**, making it **-nv**.
  * If the file system is **BTRFS**, then you want the **scrub**
        command, not the **Balance** command. The options box should
        already have the recommended options in it.
* Once the options are correct, click the **Check** button to start
    the operation.
* The progress and results will be displayed, and you will review
    them, and decide what action to take next. It is necessary to
    refresh the screen periodically, using the **Refresh** button
    underneath it or your browser's refresh button or keystroke, until
    the display indicates the test or repair is complete.
* If the results display a successful test, with no corruptions found,
    then you are done! Skip down to **After the test and repair**.

### Running the repair

* If however issues were found, the display of results will indicate
    the recommended action to take. Typically, that will involve
    repeating the command with a specific option, clearly stated, which
    you will type into the options box (including any hyphens, usually 2
    leading hyphens).
* Then (if not **BTRFS**) click the **Check** button again to run the
    repair.
* Progress and results will again be displayed, and it's possible
    that you will have to run it again, with perhaps a different option.
    If the repairs were successful, it's recommended to run the
    read-only check one more time, to verify all is well now.

#### For ReiserFS drives

* For more info on the **reiserfsck** tool and its options, see
        [reiserfsck](#reiserfsck).
        There is also more information and some warnings about
        **reiserfsck** options in the [Running
        reiserfsck](#running-reiserfsck-1)
        section below.
* **Important!** If you are instructed to rerun the repair with
        the **\--rebuild-tree** option, then **PLEASE** read the
        warnings in the [Running
        reiserfsck](#running-reiserfsck-1)
        section below!
* **Important!** If you are instructed to rerun the repair with
        the **\--rebuild-sb** option, then **you cannot continue here in
        the webGui!** You will have to follow the instructions in the
        [Drives formatted with ReiserFS using unRAID v5 or
        later](#drives-formatted-with-reiserfs-using-unraid-v5-or-later)
        section below.

#### For XFS drives

* For more info on the **xfs_repair** tool and its options, see
        [xfs_repair](#xfs_repair). See
        also the [Drives formatted with
        XFS](#drives-formatted-with-xfs)
        section below.

#### For BTRFS drives and pools

* Use the **scrub** command. Use your best judgement, we have
        little experience yet. Do read the [Drives formatted with
        BTRFS](#drives-formatted-with-btrfs)
        section below.
* For more info on the **scrub** command and its options, see
        [btrfs scrub](#btrfs-scrub).
* Unfortunately, the **scrub** command can detect but not fix
        errors on single drives. If errors are detected, you will want
        to go to the [Redoing a drive formatted with
        BTRFS](#redoing-a-drive-formatted-with-btrfs)
        section.
* If it's a drive pool, the **scrub** command can fix certain but
        not all errors. So far there is not a reliable BTRFS tool that
        can fix ALL possible errors. If the result indicates that there
        are still uncorrectable errors, then you will have to copy off
        all data and reformat the drive or pool anew (see [Redoing a
        drive formatted with
        BTRFS](#redoing-a-drive-formatted-with-btrfs)).
* unRAID is committed to staying up-to-date with BTRFS
        development, so once better tools are ready, they will be
        available here too.

### Running the repair (continued)

* During and at the conclusion of the command, a report will be
    displayed, in the command output box. If errors are detected, this
    report may specify additional actions to take. For XFS and BTRFS, we
    don't yet have much expertise to advise you. Use your best
    judgement. Most of us will probably do whatever it suggests we do.

* If your file system has only minor issues, then running the first
    option suggested should be all that is necessary. If it finds more
    significant corruption, then it may create a **lost+found** folder
    and place in it the files, folders, and parts of files it can
    recover. It will then be up to you to rename them and restore those
    files and folders to their correct locations. Many times, it will be
    possible to identify them by their contents and size.

* Note: If the repair command performs write operations to repair the
    file system, parity **will** be maintained.

### After the test and repair

* If you are in Maintenance mode, you can resume normal operations by
    stopping the array, then restarting the array with the Maintenance
    mode check box unchecked.

### Additional comments

* These test and repair tools may take a long time on a full file
    system (several minutes to a half hour, or more).

* If there was significant corruption, then it is possible that some
   files were not completely recovered. Check for a **lost+found**
    folder on this drive, which may contain fragments of the
    unrecoverable files. It is up to you to examine these and determine
    what files they are from, and act accordingly. Hopefully, you have
    another copy of each file. When you are finished examining them and
    saving what you can, then delete the fragments and remove the
    **lost+found** folder. Dealing with this folder does not have to be
    done immediately. This is similar to running **chkdsk** or
    **scandisk** within Windows, and finding lost clusters, and dealing
    with files named File0000.chk or similar. You may find one user's
    [story](http://lime-technology.com/forum/index.php?topic=1483) very
    helpful, plus his later
    [tale](http://lime-technology.com/forum/index.php?topic=3367.msg29056#msg29056)
    of the problems of sifting through the recovered files.

## Drives formatted with XFS

* *Note: for more info on the xfs_repair tool and its options, see
    [xfs_repair](#xfs_repair).*
* The **xfs_repair** instructions here are designed to check and fix
    the integrity of the XFS file system of a data drive, while
    maintaining its parity info.

### Preparing to run xfs_repair

* Start the array in Maintenance mode, by clicking the Maintenance
    mode check box before clicking the Start button. This starts the
    unRAID driver but does not mount any of the drives.

### Running xfs_repair

* Now you are ready to run the XFS file system test. At the console or
    in a [terminal session with SSH or
    Telnet](Terminal_Access.md), type this: (*Note: the
    following example refers to Disk 1, as **/dev/md1**. You will need
    to substitute the correct drive for your case. For example, if it is
    your Disk 5 that you are testing, then substitute **md5** for
    **md1**.*)

```shell
xfs_repair -v /dev/md1
```

* During and at the conclusion of the **xfs_repair** command, a report
    will be output. If errors are detected, this report may specify an
    additional action to take. We don't yet have much expertise to
    advise you about this. Use your best judgement. Most of us will
    probably do whatever it suggests we do.

* If your file system has only minor issues, then running **xfs_repair
    -v** should be all that is necessary. If it finds more significant
    corruption, then it may create a **lost+found** folder and place in
    it the files, folders, and parts of files it can recover. It will
    then be up to you to rename them and restore those files and folders
    to their correct locations. Many times, it will be possible to
    identify them by their contents and size.

* Note: If **xfs_repair** performs write operations to repair the file
    system, parity **will** be maintained.

### After running xfs_repair

* If you are in Maintenance mode, you can resume normal operations by
    stopping the array, then restarting the array with the Maintenance
    mode check box unchecked.

### Additional comments

* The **xfs_repair** tool may take a long time on a full file system
    (several minutes to a half hour, or more).

* If the **xfs_repair** command fails, and we're hearing numerous
    reports of this(!), then you will have no recourse but to redo the
    drive. Use the instructions in the [Redoing a drive formatted with
    XFS](#redoing-a-drive-formatted-with-xfs)
    section below. *We're sorry, we hope there will be better XFS
    repair tools some day!*

* If there was significant corruption, then it is possible that some
    files were not completely recovered. Check for a **lost+found**
    folder on this drive, which may contain fragments of the
    unrecoverable files. It is up to you to examine these and determine
    what files they are from, and act accordingly. Hopefully, you have
    another copy of each file. When you are finished examining them and
    saving what you can, then delete the fragments and remove the
    **lost+found** folder. Dealing with this folder does not have to be
    done immediately. This is similar to running **chkdsk** or
    **scandisk** within Windows, and finding lost clusters, and dealing
    with files named File0000.chk or similar. You may find one user's
    [story](http://lime-technology.com/forum/index.php?topic=1483) very
    helpful, plus his later
    [tale](http://lime-technology.com/forum/index.php?topic=3367.msg29056#msg29056)
    of the problems of sifting through the recovered files.

* If you get an error indicating something like trouble opening the
    file system, it may indicate that you attempted to run the file
    system check on the wrong device name. For almost all repairs, you
    would use /dev/md1, /dev/md2, /dev/md3, /dev/md4, etc. If operating
    on the cache drive (which is not protected by parity), you would use
    /dev/sdX1 (note the trailing "1" indicating the first partition on
    the cache drive).

* If you want to test and repair a non-array drive, you would use the
    drive's partition symbol (e.g. sdc1, sdj1, sdx1, etc), not the
    array device symbol (e.g. md1, md13, etc). So the device name would
    be something like /dev/sdj1, /dev/sdx1, etc.

### Redoing a drive formatted with XFS

* If you are here because the XFS repair tool has failed you(!), then
    the best we can recommend is to save the data, reformat, and restore
    the data (NOT a desirable course of action)!

1. Do your best to copy off everything you can, to a safe place. If
    something important is absolutely needed and still inaccessible, try
    [File Scavenger](http://www.quetek.com/prod02.htm) or a live CD of
    [TestDisk](http://www.cgsecurity.org/wiki/TestDisk).
2. Change the file system format for the drive to ReiserFS (just to
    reset the formatting, it's temporary and fairly quick)
3. Start the array and format the drive
4. Stop the array
5. Change the file system format for the drive to XFS again
6. Start the array and format the drive again
7. Copy back everything you saved

* It's certainly not a welcome method, but it does produce a fresh
    and clean XFS format. (*The write-up above has not been tested by
    this author. If corrections are needed, please do them, or PM RobJ
    with the corrections or suggestions.*)

## Drives formatted with BTRFS

* We're sorry, but we don't have enough experience yet with the
    **scrub** command. We recommend reading through this section, then
    either using the
    [webGui](#checking-and-fixing-drives-in-the-webgui)
    to possibly repair a drive formatted with **BTRFS**, or if you are
    comfortable at the command line, checking out the **scrub** command
    and its options, see [btrfs
    scrub](#btrfs-scrub) below. But
    ultimately, if errors are found, you may have to redo the drive.
* **Unfortunately**, the **scrub** command can detect but not fix
    errors on single drives. It can only fix errors on pooled drives. If
    this is a single drive and errors are detected, you will want to go
    to the [Redoing a drive formatted with
    BTRFS](#redoing-a-drive-formatted-with-btrfs)
    section.
* If it's a drive pool, the **scrub** command can fix certain but not
    all errors. So far there is not a reliable BTRFS tool that can fix
    ALL possible errors. If the result indicates that there are still
    uncorrectable errors, then you will have to copy off all data and
    reformat the drive or pool anew (see [Redoing a drive formatted with
    BTRFS](#redoing-a-drive-formatted-with-btrfs)).
* unRAID is committed to staying up-to-date with BTRFS development, so
    once better tools are ready, they will be available here too.
* *\-\-- work in progress \-\--*

### Experimental BTRFS recovery

* If you consider yourself an advanced user (or desperate!), here are
    some advanced tools that \*may\* help (or may make things worse!)

* ***Important Mounting Note**: The repair tools for ReiserFS and
        XFS require the drives to be unmounted, so to use their repair
        tools, you start the array in Maintenance mode. The **btrfs
        scrub** command requires the drive to be \*already\* mounted, so
        you first start the array in regular mode, NOT in Maintenance
        mode. The other BTRFS tools mentioned here may or may not
        require the drive to be mounted, so read their instructions
        carefully. If the tool requires the drive to be unmounted, then
        start the array in Maintenance mode. If the tool requires the
        drive to be mounted, then start the array in regular mode.*

* The first tool you use should be the **btrfs scrub** command
        mentioned above, see [btrfs scrub](#btrfs-scrub) below.
* There is a BTRFS restore tool, that \*may\* be able to recover
        more data from your drive. It works in a read-only mode so it is
        safe to use. Please see the [btrfs
        restore](http://btrfs.wiki.kernel.org/index.php/Restore) wiki
        page.
* The very last resort tool is **btrfs check \--repair**. It's
        reported to fix some issues some of the time, but with a good
        chance it will make others worse! You have been warned! Please
        see the [btrfs check
        \--repair](http://btrfs.wiki.kernel.org/index.php/Btrfsck) wiki
        page.
* General recommendation - try **btrfs scrub** first. If it fails
        to completely fix everything, then redo the drive using the
        following procedure, using **btrfs restore** if needed.

### Redoing a drive formatted with BTRFS

* ***Note: the following is for a single drive formatted in BTRFS, not
    for a drive pool. For a pool, you will have to adapt it, until we
    add adapted instructions. Sorry!***
* BTRFS repair tools aren't very good yet. If you give up on the
    **scrub** command mentioned above, then the best we can recommend is
    to save the data, reformat, and restore the data (NOT a desirable
    course of action)!
* **Note: if this is a single drive, we recommend either adding
    another drive and making it a drive pool, or switching to XFS,
    because**btrfs scrub**cannot fix single drives.**

1. Do your best to copy off everything you can, to a safe place. If
    something important is absolutely needed and still inaccessible, try
    [btrfs restore](http://btrfs.wiki.kernel.org/index.php/Restore)
2. Change the file system format for the drive to ReiserFS (just to
    reset the formatting, it's temporary and fairly quick)
3. Start the array and format the drive
4. Stop the array
5. Change the file system format for the drive to BTRFS again (if it's
    a single drive, consider changing to XFS, we recommend it)
6. Start the array and format the drive again
7. Copy back everything you saved

* It's certainly not a welcome method, but it does produce a fresh
    and clean format. (*The write-up above has not been tested by this
    author. If corrections are needed, please do them, or PM RobJ with
    the corrections or suggestions.*)

## Drives formatted with ReiserFS using unRAID v5 or later

* *Note: for more info on the **reiserfsck** tool and its options, see
    [reiserfsck](#reiserfsck).*
* *Note2: unRAID data disks formatted with ReiserFS use [ReiserFS
    version 3.6](http://en.wikipedia.org/wiki/ReiserFS).*

* This section is only for users who are running unRAID v5.0-beta8d or
    later. If you are running an earlier version, including all unRAID
    v4, please go to the next section, [Drives formatted with ReiserFS
    using unRAID
    v4](#drives-formatted-with-reiserfs-using-unraid-v4).

* The **reiserfsck** instructions here are designed to check and fix
    the integrity of the Reiser file system of a data drive, while
    maintaining its parity info.

* *Note: the following examples refer to Disk 1, as **/dev/md1**. You
    will need to substitute the correct drive for each case. For
    example, if it is your Disk 5 that you are testing, then substitute
    **md5** for **md1**, in all of the instructions below.*

### Preparing to run reiserfsck

* Start the array in Maintenance mode, by clicking the Maintenance
    mode check box before clicking the Start button. This starts the
    unRAID driver but does not mount any of the drives.

### Running reiserfsck

* Now you are ready to run the Reiser file system test. (Note:
    \--check is the default option, not strictly required, but included
    here for clarification.) At the console or in a [terminal session
    with SSH or Telnet](Terminal_Access.md), type this:

```shell
   **reiserfsck \--check /dev/md1** *[answer with the word **Yes**
   when prompted, do not type **yes** or **YES**, but **Yes**
   (capital **Y** and lower case **es**)]*
```

* At the conclusion of the **reiserfsck \--check** command, a report
    will be output. If errors are detected, this report may specify an
    additional action to take. The most common ones are to re-run
    **reiserfsck** specifying the **\--fix-fixable** switch or the
    **\--rebuild-tree** switch, for example:

```shell
    **reiserfsck \--fix-fixable /dev/md1** *[answer with **Yes**
    when prompted. (capital **Y** and lower case **es**)]*
```

* If your file system has only minor issues, then running **reiserfsck
    \--fix-fixable** should be all that is necessary.

* **Important Note!!!** Do NOT run
    **reiserfsck** with the **\--rebuild-sb** or **\--rebuild-tree**
    options, unless you are instructed to by the output of a previous
    run of **reiserfsck** or by an expert user! They are
    last-resort options, to repair a severely damaged Reiser file
    system, and recover as much as possible. They rarely repair the
    system to perfection, and there may be a little data loss. They do a
    great job, and make the drive usable again, but it's possible files
    may be lost or damaged, or moved into the **lost+found** folder. The
    **\--rebuild-tree** option will almost always create a
    **lost+found** folder and place in it the files, folders, and parts
    of files it can recover. It will then be up to you to rename them
    and restore those files and folders to their correct locations. Many
    times, it will be possible to identify them by their contents and
    size.

* **Important Note #2!!!** If
    the option **\--rebuild-sb** is suggested, then please see the
    [Rebuilding the
    superblock](#rebuilding-the-superblock)
    section below, and follow its instructions **VERY CAREFULLY**.
    The **\--rebuild-sb** option requires
    answers that must be **PERFECT**! If you are unsure
    about anything, consider asking for assistance on the unRAID forums.

* Note: If **reiserfsck** performs write operations to repair the file
    system, parity **will** be maintained.

### After running reiserfsck

* If you are in Maintenance mode, you can resume normal operations by
    stopping the array, then restarting the array with the Maintenance
    mode check box unchecked.

### Additional comments

* The **reiserfsck** tool may take a long time on a full file system
    (several minutes to a half hour, or more). Also re-mounting the disk
    can take up to 15 seconds or so.

* If you were instructed to use special parameters such as
    **\--fix-fixable** and **\--rebuild-tree**, then it is possible that
    some files were not completely recovered. Check for a **lost+found**
    folder on this drive, which may contain fragments of the
    unrecoverable files. It is unfortunately up to you to examine these
    and determine what files they are from, and act accordingly.
    Hopefully, you have another copy of each file. When you are finished
    examining them and saving what you can, then delete the fragments
    and remove the **lost+found** folder. Dealing with this folder does
    not have to be done immediately. This is similar to running
    **chkdsk** or **scandisk** within Windows, and finding lost
    clusters, and dealing with files named File0000.chk or similar. You
    may find one user's
    [story](http://lime-technology.com/forum/index.php?topic=1483) very
    helpful, plus his later
    [tale](http://lime-technology.com/forum/index.php?topic=3367.msg29056#msg29056)
    of the problems of sifting through the recovered files.

* If you get an error that says **reiserfs_open: the reiserfs
    superblock cannot be found on /dev/sdX. Failed to open the
    filesystem.** it usually indicates you attempted to run the file
    system check on the wrong device name. For almost all repairs, you
    would use /dev/md1, /dev/md2, /dev/md3, /dev/md4, etc. If operating
    on the cache drive (which is not protected by parity), you would use
    /dev/sdX1 (note the trailing "1" indicating the first partition on
    the cache drive).

* If you want to test and repair a non-array drive, you would use the
    drive's partition symbol (e.g. sdc1, sdj1, sdx1, etc), not the
    array device symbol (e.g. md1, md13, etc). So the device name would
    be something like /dev/sdj1, /dev/sdx1, etc.

## Drives formatted with ReiserFS using unRAID v4

* *Note: for more info on the **reiserfsck** tool and its options, see
    [reiserfsck](#reiserfsck).*
* *Note2: unRAID data disks formatted with ReiserFS use [ReiserFS
    version 3.6](http://en.wikipedia.org/wiki/ReiserFS).*

* This section is only for users who are running any version of unRAID
    prior to v5.0-beta8d, including all unRAID v4 versions. If you are
    running a later version, please go to the previous section, [Drives
    formatted with ReiserFS using unRAID v5 or
    later](#drives-formatted-with-reiserfs-using-unraid-v5-or-later).

* The **reiserfsck** instructions here are designed to check and fix
    the integrity of the Reiser file system of a data drive, while
    maintaining its parity info.

* *Note: the following examples refer to Disk 1, as **/dev/md1**. You
    will need to substitute the correct drive for each case. For
    example, if it is your Disk 5 that you are testing, then substitute
    **md5** for **md1**, and **disk5** for **disk1**, in all of the
    instructions below.*

### Preparing to run reiserfsck

* Start the array, then from the console or in a [terminal session
    with SSH or Telnet](Terminal_Access.md), type this:

```shell
    cd [this will make sure you are in the /root directory]
    samba stop [all your shares will disappear from network]
    umount /dev/md1 ['md1' corresponds to disk1, 'md2' to disk2, etc. note: it is 'umount', not 'unmount']
```

* ***Note:** you will not be able to unmount the disk if it is
    "busy." A disk is busy if any processes are using it, or
    referencing files/folders on it. If the "umount" command is not
    successful, you will need to stop any add-on process you might have
    running that are referencing the disk before you can unmount it. If
    you have "changed directory" to it, you must log off, or "cd"
    elsewhere (off the disk) before the "umount" will succeed.*

### Running reiserfsck

* Now you are ready to run the Reiser file system test. (Note:
    \--check is the default option, not strictly required, but included
    here for clarification.) At the console or in a [terminal session
    with SSH or Telnet](Terminal_Access.md), type this:

```shell
    reiserfsck \--check /dev/md1 
    [answer with the word **Yes** when prompted, do not type **yes** or **YES**, 
    but **Yes** (capital **Y** and lower case **es**)]
```

*  At the conclusion of the **reiserfsck \--check** command, a report
    will be output. If errors are detected, this report may specify an
    additional action to take. The most common ones are to re-run
    **reiserfsck** specifying the **\--fix-fixable** switch or the
    **\--rebuild-tree** switch, for example:

```shell
   reiserfsck \--fix-fixable /dev/md1
   [answer with **Yes** when prompted. (capital **Y** and lower case **es**)]
```

* If your file system has only minor issues, then running **reiserfsck
    \--fix-fixable** should be all that is necessary.

* `<font color=red>`{=html}**Important Note!!!** Do NOT run
    **reiserfsck** with the **\--rebuild-sb** or **\--rebuild-tree**
    options, unless you are instructed to by the output of a previous
    run of **reiserfsck** or by an expert user!`</font>`{=html} They are
    last-resort options, to repair a severely damaged Reiser file
    system, and recover as much as possible. They rarely repair the
    system to perfection, and there may be a little data loss. They do a
    great job, and make the drive usable again, but it's possible files
    may be lost or damaged, or moved into the **lost+found** folder. The
    **\--rebuild-tree** option will almost always create a
    **lost+found** folder and place in it the files, folders, and parts
    of files it can recover. It will then be up to you to rename them
    and restore those files and folders to their correct locations. Many
    times, it will be possible to identify them by their contents and
    size.

* `<font color=red>`{=html}**Important Note #2!!!**`</font>`{=html} If
    the option **\--rebuild-sb** is suggested, then please see the
    [Rebuilding the
    superblock](#rebuilding-the-superblock)
    section below, and follow its instructions **VERY CAREFULLY**.
    `<font color=red>`{=html}The **\--rebuild-sb** option requires
    answers that must be **PERFECT**!`</font>`{=html} If you are unsure
    about anything, consider asking for assistance on the unRAID forums.

* Note: If **reiserfsck** performs write operations to repair the file
    system, parity **will** be maintained.

### After running reiserfsck

* You can resume normal operations by, from the console or in a
    [terminal session with SSH or Telnet](Terminal_Access.md),
    typing this:

```shell
   mount /dev/md1 /mnt/disk1 [important to match up the 'md1' with 'disk1', 'md2' with 'disk2', etc.]
   samba start [all shares should again be visible]
```

### Additional comments

* The **reiserfsck** tool may take a long time on a full file system
    (several minutes to a half hour, or more). Also re-mounting the disk
    can take up to 15 seconds or so.

* If you were instructed to use special parameters such as
    **\--fix-fixable** and **\--rebuild-tree**, then it is possible that
    some files were not completely recovered. Check for a **lost+found**
    folder on this drive, which may contain fragments of the
    unrecoverable files. It is unfortunately up to you to examine these
    and determine what files they are from, and act accordingly.
    Hopefully, you have another copy of each file. When you are finished
    examining them and saving what you can, then delete the fragments
    and remove the **lost+found** folder. Dealing with this folder does
    not have to be done immediately. This is similar to running
    **chkdsk** or **scandisk** within Windows, and finding lost
    clusters, and dealing with files named File0000.chk or similar. You
    may find one user's
    [story](http://lime-technology.com/forum/index.php?topic=1483) very
    helpful, plus his later
    [tale](http://lime-technology.com/forum/index.php?topic=3367.msg29056#msg29056)
    of the problems of sifting through the recovered files.

* If you get an error that says **reiserfs_open: the reiserfs
    superblock cannot be found on /dev/sdX. Failed to open the
    filesystem.** it usually indicates you attempted to run the file
    system check on the wrong device name. For almost all repairs, you
    would use /dev/md1, /dev/md2, /dev/md3, /dev/md4, etc. If operating
    on the cache drive (which is not protected by parity), you would use
    /dev/sdX1 (note the trailing "1" indicating the first partition on
    the cache drive).

* If you want to test and repair a non-array drive, you would use the
    drive's partition symbol (e.g. sdc1, sdj1, sdx1, etc), not the
    array device symbol (e.g. md1, md13, etc). So the device name would
    be something like /dev/sdj1, /dev/sdx1, etc.

# Tools

## xfs_repair

##### Syntax

* **The filesystem to be repaired must be unmounted**, otherwise, the
    resulting filesystem may be inconsistent or corrupt. For unRAID,
    start the array in Maintenance mode.

```shell
xfs_repair [ -dnvLP ] device
xfs_repair -V
```

Source: derived from [Linux man
    page](http://linux.die.net/man/8/xfs_repair) (there are many more
    options, but probably too dangerous for our use)

##### Description

* xfs_repair repairs corrupt or damaged XFS filesystems (see xfs(5)).
    The filesystem is specified using the device argument which should
    be the device name of the disk partition or volume containing the
    filesystem. If given the name of a block device, xfs_repair will
    attempt to find the raw device associated with the specified block
    device and will use the raw device instead.

##### Options

* -n
  * No modify mode. Specifies that xfs_repair should not modify the
    filesystem but should only scan the filesystem and indicate what
    repairs would have been made.
* -v
  * Verbose output.
* -V
  * Prints out the current version number and exits.
* -d
  * Repair dangerously. Allow xfs_repair to repair an XFS filesystem
    mounted read only. This is typically done on a root filesystem
    from single user mode, immediately followed by a reboot.
* -L
  * Force Log Zeroing. Forces xfs_repair to zero the log even if it
    is dirty (contains metadata changes). When using this option the
    filesystem will likely appear to be corrupt, and can cause the
    loss of user files and/or data.
* -P
  * Disable prefetching of inode and directory blocks. Use this
    option if you find xfs_repair gets stuck and stops proceeding.
    Interrupting a stuck xfs_repair is safe.

##### Notes

* **Disk Errors**: xfs_repair aborts on most disk I/O errors.
    Therefore, if you are trying to repair a filesystem that was damaged
    due to a disk drive failure, steps should be taken to ensure that
    all blocks in the filesystem are readable and writeable before
    attempting to use xfs_repair to repair the filesystem. A possible
    method is using dd(8) to copy the data onto a good disk.

* **lost+found**: The directory lost+found does not have to already
    exist in the filesystem being repaired. If the directory does not
    exist, it is automatically created if required. If it already
    exists, it will be checked for consistency and if valid will be used
    for additional orphaned files. Invalid lost+found directories are
    removed and recreated. Existing files in a valid lost+found are not
    removed or renamed.

* **Corrupted Superblocks**: XFS has both primary and secondary
    superblocks. xfs_repair uses information in the primary superblock
    to automatically find and validate the primary superblock against
    the secondary superblocks before proceeding. Should the primary be
    too corrupted to be useful in locating the secondary superblocks,
    the program scans the filesystem until it finds and validates some
    secondary superblocks. At that point, it generates a primary
    superblock.

##### Examples

* These are just examples, replace drive ID with the correct drive
    symbol, either an md number (md2, md15, etc) or an sd symbol (sdc1,
    sdj1, etc).
* `xfs_repair -v /dev/md3` -\> tests and reports, making changes
    when necessary
* `xfs_repair -nv /dev/sdc1` -\> tests and reports without making
    changes
* `xfs_repair -V` -\> displays version and exits
* `xfs_repair` -\> displays options and exits
* Note: As far as I can tell, these are the ONLY options we should be using.

## btrfs scrub

 For a full description, please see the [man page for
    scrub](https://btrfs.wiki.kernel.org/index.php/Manpage/btrfs-scrub).

##### Syntax

* **The filesystem to be repaired must be mounted first.** For unRAID,
    start the array as normal, NOT in Maintenance mode!

```shell
btrfs scrub start [-BdqrR] `<path>`{=html}\|`<device>`{=html}
```

* Start a scrub on all devices of the filesystem identified by
        `<path>`{=html} or on a single `<device>`{=html}.
* Without options, scrub is started as a background process.
        Scrubbing involves reading all data from all disks and verifying
        checksums. Errors are corrected along the way IF POSSIBLE.
* **Unfortunately**, the **scrub** command can detect but not fix
        errors on single drives. If errors are detected, you will want
        to go to the [Redoing a drive formatted with
        BTRFS](#redoing-a-drive-formatted-with-btrfs)
        section.
* If it's a drive pool, the **scrub** command can fix certain but
        not all errors. So far there is not a reliable BTRFS tool that
        can fix ALL possible errors. If the result indicates that there
        are still uncorrectable errors, then you will have to copy off
        all data and reformat the drive or pool anew (see [Redoing a
        drive formatted with
        BTRFS](#redoing-a-drive-formatted-with-btrfs)).

##### Options

* -B
  * Do not run in background; print scrub statistics when finished.
* -d
  * Print separate statistics for each device of the filesystem (-B only).
* -q
  * Quiet. Omit error messages and statistics.
* -r
  * Read only mode. Do not attempt to correct anything.
* -R
  * Raw print mode. Print full data instead of summary.

##### Examples

**Important Note! These are untested yet!**

These are just examples, replace drive ID with the correct drive
    symbol, either cache or an md number (md2, md15, etc) or an sd
    symbol (sdc1, sdj1, etc).
* `btrfs scrub start -B /dev/md3` -\> tests and reports, making
    changes when necessary
* `btrfs scrub start -rdB /dev/cache` -\> tests and reports without
    making changes

*\-\-- work in progress \-\--*

## reiserfsck

For a full description, please see the [About.com page for
    reiserfsck](http://linux.about.com/library/cmd/blcmdl8_reiserfsck.htm).

##### Description

The **reiserfsck** tool checks for a Reiser file system (must be a
    partition like /dev/md3 or /dev/sdc1, not a drive like /dev/sdc),
    replays any transactions, and checks or repairs it.

##### Syntax examples

**The filesystem to be repaired must be unmounted.** For unRAID,
    start the array in Maintenance mode.

*Note: in the following examples, the option is preceded by 2
    hyphens. Drive 3 (/dev/md3) is just used as an example. If you were
    testing Disk 13, you would use /dev/md13.*
    
* `reiserfsck \--check /dev/md3` -\> checks file system for errors
* `reiserfsck \--fix-fixable /dev/md3` -\> fixes file system
    errors
* `reiserfsck \--rebuild-tree /dev/md3` -\> rebuilds the file
    system (may have lost files)
* `reiserfsck \--rebuild-tree -S /dev/md3` -\> rebuilds the file
    system from entire partition (may have lost files, may recover old
    deleted files or their pieces)
* `reiserfsck \--rebuild-sb /dev/md3` -\> rebuilds superblock based
    on series of questions, answers MUST be accurate! Please see the
    [Rebuilding the superblock](#rebuilding-the-superblock)
    section below.

*\-\-- work in progress \-\--*

##### Rebuilding the superblock

* This is an example of the questions and correct answers, when you
    attempt to rebuild a ReiserFS superblock, using the
    **\--rebuild-sb** option. The answers MUST be accurate, or the file
    system may be damaged even more!
* The example below uses **Disk 6** (**/dev/md6**), so you need to
    change that to the correct drive symbol for your drive.
* It is assumed that you have followed the instruction above, and the
    filesystem to be repaired is unmounted, the array is started in
    Maintenance mode.
* The answers you should give are in **bold** below. Some of the
    numbers reported will be different for your file system. The UUID
    will be different too.
* This is based on the experiences of two users, found
    [here](http://lime-technology.com/forum/index.php?topic=1483) and
    [here](http://lime-technology.com/forum/index.php?topic=4021). We
    recommend you read both, for more details.
* *You may want to print this out ahead of time.*

```shell
       root@Tower:\~# reiserfsck --rebuild-sb /dev/md6
       reiserfsck 3.6.19 (2003 www.namesys.com)

       *************************************************************
       ** If you are using the latest reiserfsprogs and it fails **
       ** please email bug reports to reiserfs-list@namesys.com, **
       ** providing as much information as possible -- your **
       ** hardware, kernel, patches, settings, all reiserfsck **
       ** messages (including version), the reiserfsck logfile, **
       ** check the syslog file for any related information. **
       ** If you would like advice on using this program, support **
       ** is available for $25 at www.namesys.com/support.html. **
       *************************************************************
       Will check superblock and rebuild it if needed
       Will put log info to 'stdout'

       Do you want to run this program?[N/Yes] (note need to type Yes
       if you do):**Yes**

       reiserfs_open: the reiserfs superblock cannot be found on
       /dev/md6.

       what the version of ReiserFS do you use[1-4]
           (1) 3.6.x
           (2) >=3.5.9 (introduced in the middle of 1999) (if you use linux 2.2, choose this one)
           (3) < 3.5.9 converted to new format (don't choose if unsure)
           (4) < 3.5.9 (this is very old format, don't choose if unsure)
           (X) exit
       **1**

       Enter block size [4096]:
       **4096**

       No journal device was specified. (If journal is not available,
       re-run with \--no-journal-available option specified).
       Is journal default? (y/n)[y]: **y**

       Did you use resizer(y/n)[n]: **n**
       rebuild-sb: no uuid found, a new uuid was generated
        (b0894fe9-3850-4d57-b70b-a419cbf3823e)

       rebuild-sb: You either have a corrupted journal or have just
       changed the start of the partition with some partition table
       editor. If you are sure that the start of the partition is ok,
       rebuild the journal header.
       Do you want to rebuild the journal header? (y/n)[n]: **y**
       Reiserfs super block in block 16 on 0x906 of format 3.6 with
       standard journal
       Count of blocks on the device: 97677824
       Number of bitmaps: 2981
       Blocksize: 4096
       Free blocks (count of blocks - used [journal, bitmaps, data,
       reserved] blocks): 0
       Root block: 0
       Filesystem is NOT clean
       Tree height: 0
       Hash function used to sort names: not set
       Objectid map size 0, max 972
       Journal parameters:
           Device [0x0]
           Magic [0x0]
           Size 8193 blocks (including 1 for journal header) (first block 18)
           Max transaction length 1024 blocks
           Max batch size 900 blocks
           Max commit age 30
       Blocks reserved by journal: 0
       Fs state field: 0x1:
           some corruptions exist.
       sb_version: 2
       inode generation number: 0
       UUID: b0894fe9-3850-4d57-b70b-a419cbf3823e
       LABEL:
       Set flags in SB:
       Is this ok ? (y/n)[n]: **y**
```

It should be quick. When this completes, hopefully successfully, rerun
the **reiserfsck \--check** on the drive, and proceed according to the
instructions that it gives you.

*\-\-- work in progress \-\--*
