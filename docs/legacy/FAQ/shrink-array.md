# Shrink Array

**Note: this page has been tested for v6,
but is still fairly new.**

**Why would you want to shrink your array?**

- Maybe you have recently found a red ball on one of your drives, and
    you want to take it out of the array. You've got enough extra
    space, and don't need to replace the drive.
- Or you are consolidating drives, replacing multiple smaller drives
    with new and larger ones.
- Or you have an array drive that you no longer want in the array, for
    whatever reason, and you don't want to replace it.
- Or you are out of SATA ports, and have emptied a smaller drive so
    you can remove it, and reuse the SATA port.
- Or you wish to take one or more data drives to a new or different
    array, intact with all its data.

In general, the best choice is to replace an unwanted or disabled drive
by assigning a replacement drive, and allowing Unraid to rebuild it.
This way, parity protection for the array is maintained. The following
methods are for those who do not want to replace the drive, and are OK
with a temporary loss of parity protection. (There is a method below
that preserves parity!) *Update: a procedure to remove one or more
drives without invalidating parity protection is discussed
[here](https://forums.unraid.net/topic/48707-additional-scripts-for-userscripts-plugin/#comment-490808).
It involves a dangerous command at a command prompt, so command line
experience is desirable.*

Here are the procedures and methods for shrinking the array without
losing any data. Note: these procedures work exactly the same whether
your drive is disabled or not.

## For Unraid v6.2 and later

There are 2 methods here for removing drives from an Unraid v6.2 array.
Check the conditions and comments at the top of each method, to know
which one will work best for your situation.

### The "Remove Drives Then Rebuild Parity" Method

 *For removing one or more drives from an Unraid array - this is the
    tried and true method*
 *Note: this section has been tested for 6.2, but is still fairly
    new*

- This method does not keep the drive's
    data within the array. If the drive to be removed
    has data you want to stay in the array, you must move it yourself to
    the other data drives. Parity will be built based entirely and only
    on the remaining drives and their contents.
- This method is best if you are removing more than one drive.
- This method should be used if you need to preserve the contents of
    the data drive you are removing from the array.
- This method MUST be used if the drive cannot be cleared, that is, it
    is missing, disabled, or has bad sectors.
- This method does NOT preserve parity, so parity will have to be
    rebuilt once the array assignments have been adjusted.

##### Procedure

1. Make sure that the drive or drives you are removing have been
    removed from any inclusions or exclusions for all shares, including
    in the global share settings. Shares should be changed from the
    default of "All" to "Include". This include list should contain
    only the drives that will be retained.
2. Make sure you have a copy of your array assignments, especially the
    parity drive. You may need this list if the "Retain current
    configuration" option doesn't work correctly
3. Stop the array (if it is started)
4. Go to **Tools** then **New Config**
5. Click on the **Retain current configuration** box (says **None** at
    first), click on the box for **All**, then click on **close**
6. Click on the box for **Yes I want to do this**, then click **Apply**
    then **Done**
7. Return to the Main page, and check all assignments. If any are
    missing, correct them. Unassign the drive(s) you are removing.
    **Double check all of the assignments, especially the parity
    drive(s)!**
8. Do not click the check box for **Parity is already valid**; make
    sure it is NOT checked; parity is not valid now and won't be until
    the parity build completes
9. Start the array to commit the changes; system is usable now, but it
    will take a long time rebuilding parity

### The "Clear Drive Then Remove Drive" Method

*For removing a drive from an Unraid array, while maintaining the
    parity protection - this is a new method*
*Note: this section has been tested but is still fairly new*

- This method preserves parity protection at all times.
- This method can only be used if it's a good drive that is
    completely empty, is mounted in the array, and can be completely
    cleared.
- This method is limited to removing only one drive at a time.
- As stated above, the drive must be completely empty. If there are
    still any files on it (including hidden ones), they must be moved to
    another drive, or deleted.
- *One quick way to clean a drive is reformat it! To format an array
    drive, you stop the array and then on the Main page click on the
    link for the drive and change the file system type to something
    different than it currently is, then restart the array. You will
    then be presented with an option to format it. Formatting a drive
    removes all of its data, and the parity drive is updated
    accordingly, so the data cannot be easily recovered.*
- Explanatory note: "*Since you are going to clear the drive anyway,
    why do I have to empty it? And what is the purpose of this
    strange*clear-me*folder?*" Yes it seems a bit draconian to require
    the drive to be empty since we're about to clear and empty it in
    the script, but we're trying to be absolutely certain we don't
    cause data loss. In the past, some users misunderstood the
    procedure, and somehow thought we would preserve their data while
    clearing the drive! This way, by requiring the user to remove all
    data, and then add an odd marker, there **cannot** be any accidents
    or misunderstandings and data loss.

##### Procedure

1. Make sure that the drive you are removing has been removed from any
    inclusions or exclusions for all shares, including in the global
    share settings.
2. Make sure the array is started, with the drive assigned and mounted.
3. Make sure you have a copy of your array assignments, especially the
    parity drive. You may need this list if the "Retain current
    configuration" option doesn't work correctly.
4. It is **highly recommended** to turn on **reconstruct write**, as
    the write method (sometimes called 'Turbo write'). With it on, the
    script can run 2 to 3 times as fast, saving hours!
    In **Settings** -\> **Disk Settings**, change **Tunable
    (md_write_method)** to **reconstruct write**.
5. Make sure ALL data has been copied off the drive; drive MUST be
    completely empty for the clearing script to work.
6. Double check that there are no files or folders left on the drive.
    *Note: one quick way to clean a drive is reformat it! (once you're
    sure nothing of importance is left of course!)*
7. Create a single folder on the drive with the name **clear-me** -
    exactly 7 lowercase letters and one hyphen
8. Run the **[clear an array
    drive](https://forums.unraid.net/topic/48707-additional-scripts-for-userscripts-plugin/#comment-490808)**
    script from the [User
    Scripts](https://forums.unraid.net/topic/48286-plugin-ca-user-scripts/)
    plugin (or run it standalone, at a command prompt).
    - If you prepared the drive correctly, it will completely and
        safely zero out the drive. If you didn't prepare the drive
        correctly, the script will refuse to run, in order to avoid any
        chance of data loss.
    - If the script refuses to run, indicating it did not find a
        marked and empty drive, then very likely there are still files
        on your drive. Check for hidden files. ALL files must be
        removed!
    - Clearing takes a loooong time! Progress info will be displayed,
        in 6.2 or later. Prior to 6.2, nothing will show until it
        finishes.
    - If running in User Scripts, the browser tab will hang for the
        entire clearing process.
    - While the script is running, the Main screen may show invalid
        numbers for the drive, ignore them. **Important! Do not try to
        access the drive, at all!**
9. When the clearing is complete, click done and stop the array - do
    not remove the cleared disk yet.
10. Go to **Tools** then **New Config**
11. Click on the **Retain current configuration** box (says **None** at
    first), click on the box for **All**, then click on **close**
12. Click on the box for **Yes I want to do this**, then click **Apply**
    then **Done**
13. Return to the Main page, and check all assignments. If any are
    missing, correct them. **Unassign the drive(s) you are removing.**
    **Double check all of the assignments, especially the parity
    drive(s)!** If the cleared drive is "hot-swappable" you may now
    remove the cleared drive and follow the steps below. If it is not,
    follow the steps below.
14. Click the check box for **Parity is already valid**, make sure it is
    checked!
15. Start the array! Click the **Start** button then the **Proceed**
    button (on the warning popup that will pop up)
16. Parity should still be valid, however it's highly recommended to do
    a Parity Check
17. If you do not have hot swappable drives, you may now safely shutdown
    your server and remove the cleared drive.

##### Alternate Procedure for Linux proficient users

It's actually the same procedure as above, except that you can
replace steps 7 and 8 by performing the clearing commands yourself
at a command prompt. (Clearing takes just as long though!) If you
would rather do that, than run the script in steps 7 and 8, then
here are the 2 commands to perform:

```shell
umount /mnt/diskX
dd bs=1M if=/dev/zero of=/dev/mdX status=progress
(where X in both lines is the number of the data drive being removed)
```
**Important!!! It is VITAL you use the correct drive number, or you
    will wipe clean the wrong drive!** That's why using the script is
    recommended, because it's designed to protect you from accidentally
    clearing the wrong drive.

## For Unraid v6.0 and 6.1 and possibly 5.0

- **Notice: This section has been partially rewritten, is not well
    tested yet. But it's based on the old tried and true method for
    removing drives**
- *These instructions assume you are using Unraid v6, but may work for
    Unraid v5 also.*
- *This procedure starts by removing all drive assignments. You will
    then need to reenter all of them from your notes, making any changes
    you desire.*

##### Procedure

1. Take a screenshot of your current array assignments, or make good
    notes of them
2. Make sure that the drive or drives you are removing have been
    removed from any inclusions or exclusions for all shares, including
    in the global share settings.
3. Stop the array (if it is started)
4. Go to `<Tools>` and click `<New config>`, then
    `<Apply>`, then `<Done>`
5. Reassign all disks except the ones you are removing, using your
    notes or screen shot
6. Double check that your Parity disk(s) are assigned correctly!
7. Do not click the check box for "Parity is already valid"; make
    sure it is NOT checked; parity is not valid now and won't be until
    the parity build completes
8. Start the array - will take a long time while it rebuilds parity

##### Alternate procedure that maintains parity protection

* If you wish, the "Clear Drive Then Remove Drive" method in the 6.2
    section above can be carefully adapted for use. You won't have the
    "Retain" option, or the "reconstruct write" tunable option, or
    the User Scripts plugin. v5 users may have to use the "Trust
    Parity" method rather than the "Parity is already valid" option.
    And you won't have any progress info at all during the clearing! It
    will be finished when it finishes!
* *In Unraid v6.0 and v6.1 (not v5), you can turn on "reconstruct
    write" (sometimes known as "turbo write" because it runs
    significantly faster) with the following command at the command line
    *after* the array is started:

  ```shell
  mdcmd set md_write_method 1
  ```
