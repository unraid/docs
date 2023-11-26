---
sidebar_position: 3
---

# Manual install method

If for some reason the USB Flash Creator tool cannot be used, or your USB flash device is not detected, it is possible to manually format and prepare a bootable USB flash device.

1. Plug the USB flash device into your Mac or PC.
2. If your device is 32GB or smaller then format the device using the FAT32 file system and set ‘volume label’ to `UNRAID` (case-sensitive, use all caps). It must **not** be ex-FAT or NTFS.
   If your device is larger than 32GB then create a 32GB FAT32 partition and name it `UNRAID` (case-sensitive, use all caps)
      On Windows:
         2a. right click the start button and open `disk management`
         2b. find your drive in the GUI on the lower half of the screen
         2c. then delete any partitions currently on the drive by right clicking the blue bar and selecting `delete volume` (be really careful at this stage as a misclick could result in deleting the wrong drive easily) do this until the whole drive is `unallocated` with a black bar along the top
         2d. then right click the black bar and select `new simple volume`
         2e. on the popup window now select next to get past the introduction
         2f. now for the `simple volume size in MB` enter `32000` and click next
         2g. on the `assign drive letter or path` screen just let windows go with the letter it picks and select next
         2h. on the `format partition` screen you want to ensure that `Format this volume with the following settings` is selected, the file system is 'FAT32' and the volume lable is `UNRAID` (case-sensitive, use all caps), then click next
         2i. now click finish
4. [Go to the downloads page.](http://lime-technology.com/download/) to get the zip file for the release you want to use.
5. Choose a version and download it to a temporary location on your computer (e.g. a “downloads” folder).
6. Extract the contents of the newly downloaded ZIP file onto your USB flash device.
7. Browse to the USB flash device to see the newly extracted contents from your Mac or PC.
8. If you need to enable UEFI boot, rename the `EFI-` directory to `EFI`.
9. Run the _make bootable_ script appropriate to the OS you are using:
    * **Windows XP** - double-click the **make_bootable.bat** file.
    * **Windows 7 or later** - right-click the **make_bootable** file and select _Run as Administrator_.
    * **Mac** - double-click the file **make_bootable_mac** file and enter your admin password when prompted.
    * **Linux**:
      1. copy **make_bootable_linux** file to hard drive
      2. unmount (not eject) USB drive
      3. run the following command from wherever you unpacked on your Linux system: `sudo bash ./make_bootable_linux`

:::note

During the process of running this script, the flash device may seem to disappear and reappear on your workstation a few times – this is expected behavior.

:::
