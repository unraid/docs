# The Parity Swap Procedure

***`First release, tested only on v6.1 & 6.7.2`***

**This page describes how to do the 'Parity Swap' procedure, often
known as the 'Swap Disable' procedure.**

Historically, it was better known as the 'Swap Disable' procedure,
probably because it requires the data drive to be disabled first, then
involves a swap of the parity drive, the disabled drive, and the new
replacement drive. Perhaps it should be called the "3 drive parity
shuffle"?

**Why would you want to do this? To replace a data drive with a larger
one, that is even larger than the Parity drive.**

* unRAID does not require a replacement drive to be the same size as
    the drive being replaced. The replacement drive CANNOT be smaller
    than the old drive, but it CAN be larger, much larger in fact. If
    the replacement drive is the same size or larger, UP TO the same
    size as the parity drive, then there is a simple procedure for that,
    called [Replacing a Data Drive](Replacing_a_Data_Drive.md).
    But if the replacement drive is LARGER than the Parity drive, then a
    special two-step procedure is required, described on this page. It
    will use the larger-than-parity drive to first upgrade the parity
    drive then use the old parity drive to replace the old data drive.
* An example, you have a 1TB data drive that you want to replace (the
    reason does not matter). You have a 2TB parity drive. You buy a 4TB
    drive as a replacement. The 'Parity Swap' procedure will copy the
    parity info from the current 2TB parity drive to the 4TB drive, zero
    the rest, make it the new parity drive, then use the old 2TB parity
    drive to replace the 1TB data drive. Now you can do as you wish with
    the removed 1TB drive.

## Important Notes

* If you have purchased a replacement drive, we always recommend
    Preclearing the replacement drive first, to make sure it's a good
    drive that won't fail for a few years at least. The Preclearing is
    not strictly necessary, as replacement drives don't have to be
    cleared, they are going to be completely overwritten. But
    Preclearing new drives one to three times provides a thorough test
    of the drive, eliminates 'infant mortality' failures.
* **If your replacement drive is the same size or smaller than your
    current Parity drive, then you don't need this procedure. Proceed
    with the [Replacing a Data Drive](Replacing_a_Data_Drive.md)
    procedure.**
* This procedure is strictly for replacing data drives in an unRAID
    array. If all you want to do is replace your Parity drive with a
    larger one, then you don't need the Parity Swap procedure. Just
    remove the old parity drive and add the new one, and start the
    array. The process of building parity will immediately begin. (If
    something goes wrong, you still have the old parity drive that you
    can put back!)
* **IMPORTANT!!!** This procedure REQUIRES that the data drive being
    replaced MUST be disabled first. If the drive failed (has a red
    ball), then it is already 'disabled', but if the drive is OK but
    you want to replace it anyway, then you have to force it to be
    'failed', by unassigning it and starting and stopping the array.
    unRAID only forgets a drive when the array is started without the
    drive, otherwise it still associates it with the slot (but
    'Missing'). The array must be started once with the drive
    unassigned or disabled. Yes, it may seem odd, but is required before
    unRAID will recognize that you are trying to do a 'Parity Swap'.
    It needs to see a disabled data disk with forgotten ID, a new disk
    assigned to its slot that used to be the parity disk, and a new disk
    assigned to the parity slot.
* Obviously, it's very important to identify the drives for
    assignment correctly! Have a list of the drive models that will be
    taking part in this procedure, with the last 4 characters of their
    serial numbers. If the drives are recent Toshiba models, then they
    may all end in **GS** or **S**, so you will want to note the
    preceding 4 characters instead.
* *Lastly, this page was only tested with v6 (and not with a disabled
    drive), and is 'assumed' to be correct for all versions. (You know
    what happens when you 'assume'!) If you see any improvements or
    corrections, please add them, or suggest them to us, either on the
    'discussion' page for this page, or on the unRAID forums. By the
    way, if you are NOT running the latest unRAID v6 release, we
    strongly urge you to Upgrade to Unraid v6!*

## The procedure

:   *If you are running a very old version of unRAID, such as v4.7 or
    older, skip down to the next section.*

:   Note: these steps are the general steps needed. The steps you take
    may differ depending on your situation. If the drive to be replaced
    has failed and unRAID has disabled it, then you may not need steps 1
    and 2, and possibly not steps 3 and 4. If you have already installed
    the new replacement drive (perhaps because you have been Preclearing
    it), then you would skip steps 5 through 8. Revise the steps as
    needed.

1. Stop the array *(if it's started)*
2. Unassign the old drive *(if it's still assigned)*
    *If the drive was a good drive and notifications are enabled, you
    will get error notifications for a missing drive! This is normal.*
3. Start the array (put a check in the **Yes I want to do this**
    checkbox if it appears (older versions: **Yes, I'm sure**))
    *Yes, you need to do this. Your data drive should be showing as
    **Not installed**.*
4. Stop the array again
5. Power down
6. *[ Optional ]* Pull the old drive
    *You may want to leave it installed, for Preclearing or testing or
    reassignment.*
7. Install the new drive (preclear STRONGLY suggested, but formatting
    not needed)
8. Power on
9. Stop the array\
    **If you get an "Array Stopping•Retry unmounting disk
    share(s)..." message, try disabling Docker and/or VM in Settings
    and stopping the array again after rebooting.*
10. Unassign the parity drive
11. Assign the new drive in the parity slot
    *You may see more error notifications! This is normal.*
12. Assign the old parity drive in the slot of the old data drive being
    replaced
    *You should now have blue drive status indicators for both the
    parity drive and the drive being replaced.*
13. Go to the **Main** -\> **Array Operation** section
    *You should now have a **Copy** button, with a statement indicating
    "**Copy** will copy the parity information to the new parity
    disk".*
14. Put a check in the **Yes I want to do this** checkbox (older
    versions: **Yes, I'm sure**), and click the **Copy** button
    *Now patiently watch the copy progress, takes a long time (\~20
    hours for 4TB on a 3GHz Core 2 Duo). All of the contents of the old
    parity drive are being copied onto the new drive, then the remainder
    of the new parity drive will be zeroed.\
    **The array will NOT be available during this operation!**\
    **If you disabled Docker and/or VM in settings earlier, go ahead
    and re-enable now.*\
    When the copy completes, the array will still be stopped
    ("**Stopped**. Upgrading disk/swapping parity.").\
    The **Start** button will now be present, and the description will
    now indicate that it is ready to start a Data-Rebuild.*
15. Put a check in the **Yes I want to do this** checkbox (older
    versions: **Yes, I'm sure**), and click the **Start** button
    *The data drive rebuild begins. Parity is now valid, and the array
    is started.\
    Because the array is started, you can use the array as normal, but
    for best performance, we recommend you limit your usage.\
    Once again, you can patiently watch the progress, takes a long time
    too! All of the contents of the old data drive are now being
    reconstructed on what used to be your parity drive, but is now
    assigned as the replacement data drive.*

:   **That's it!** Once done, you have an array with a larger parity
    drive and a replaced data drive that may also be larger!
:   *Note: many users like to follow up with a parity check, just to
    check everything. It's a good confidence builder!*

## The procedure for unRAID v4

:   *This section is only for old versions of unRAID, such as v4.7 or
    older. If you are running v5 or v6 of unRAID, then go back to the
    previous section.*

:   Note: these steps are taken from the old manual, and they assume the
    data drive has failed and been disabled. If not, then (just as
    above) you may have to 'fail' the drive by removing the drive, and
    starting and stopping the array one time.

1. Stop the array.
2. Power down the unit.
3. Replace the parity disk with the new bigger one.
4. Replace the failed disk with your old parity disk.
5. Power up the unit.
6. Start the array.
7. When you start the array, the system will first copy the parity
    information to the new parity disk, and then reconstruct the
    contents of the failed disk.
