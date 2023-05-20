**This page describes how to replace an unRAID array data drive. Why
would you want to do that? Any number of reasons -**

- *The drive has failed*
- *The drive has been acting strange or reporting errors, and you
    think it might be failing*
- *The drive is old or past its warranty period*
- *The drive is small or full, and you need more storage space*
- *The drive has bad sectors and you want to pull it and replace it so
    you can Preclear/test/fix it*
- *You just bought a new monster of a drive, and want it in the array*
- *Any other reason you can think of*

\
**Important Notes**

- If you have purchased a replacement drive, we always recommend
    Preclearing the replacement drive first, to make sure it's a good
    drive that won't fail for a few years at least. The Preclearing is
    not strictly necessary, as replacement drives don't have to be
    cleared, they are going to be completely overwritten. But
    Preclearing new drives one to three times provides a thorough test
    of the drive, eliminates 'infant mortality' failures.

:   ***It's always good to have a prepared and tested replacement drive
    already on hand!***

- **Important! You cannot replace a drive with one that is LARGER than
    the parity drive!** If your replacement drive is larger than the
    parity drive, then proceed to [The parity swap
    procedure](The_parity_swap_procedure "wikilink").

:   unRAID does not require the replacement drive to be the same size as
    the old drive being replaced. It CANNOT be smaller, but it CAN be a
    larger drive, up to the size of the parity drive. If too large,
    unRAID has a special two-step 'Parity Swap' procedure (often
    called the 'swap-disable') that will use a larger than parity
    drive to first upgrade the parity drive then replace the old drive
    with the old parity drive.

- If you are here because you have a disabled drive, and you have
    already checked the syslog and SMART report (or got instruction from
    the unRAID forums), and are SURE that the drive is good, then you
    can use the procedures below to rebuild it onto itself (below,
    consider the 'old drive' to be the 'new drive'). There is a
    similar procedure just for this though -\> [Re-enable the
    drive](Manual/Storage_Management#Rebuilding_a_drive_onto_itself "wikilink").

\

## The procedure

:   *If you are running a very old version of unRAID, such as v4.7 or
    older, skip down to the next section.*

1. Stop the array
2. Unassign the old drive if still assigned *(to unassign, set it to
    **No Device**)*
3. Power down
4. [ Optional ] Pull the old drive *(you may want to leave it
    installed for Preclearing or testing)*
5. Install the new drive
6. Power on
7. Assign the new drive in the slot of the old drive
8. Go to the **Main** -\> **Array Operation** section
9. Put a check in the **Yes, I'm sure** checkbox (next to the
    information indicating the drive will be rebuilt), and click the
    **Start** button
10. The rebuild will begin, with hefty disk activity on all drives, lots
    of writes on the new drive and lots of reads on all other drives

:   *All of the contents of the old drive will be copied onto the new
    drive, making it an exact replacement, except possibly with more
    capacity than the old drive.*

\

## The procedure for unRAID v4

:   *This section is only for old versions of unRAID, such as v4.7 or
    older. If you are running v5 or v6 of unRAID, then go back to the
    previous section.*

1. Stop the array
2. Power down
3. Replace hard drive with new drive.
4. Turn on
5. Replaced drive appears with blue dot
6. Tick the "I'm sure" checkbox, and press "Start will bring the
    array on-line, start Data-Rebuild, and then expand the file
    system."
7. Hefty disk activity and main page will show lots of reading on "the
    other" disks and writing on new disk as data is being rebuilt.
8. End

\

[Category: How To](Category:_How_To "wikilink") [Category: Hard
drives](Category:_Hard_drives "wikilink") [Category:
Hardware](Category:_Hardware "wikilink")
