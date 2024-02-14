---
sidebar_position: 3
---

# Manual install method

If for some reason the USB Flash Creator tool cannot be used, or your USB flash device is not detected, it is possible to manually format and prepare a bootable USB flash device.

:::important

This method only works for devices 32GB and smaller.

:::

1. Plug the USB flash device into your Mac or PC.
2. Format the device using the FAT32 file system. It must **not** be ex-FAT or NTFS. If your drive is larger than 32GB then you need to use a 3rd party tool (e.g. Rufus) to format it to FAT32 as Windows will not give this as an option on drives larger than 32GB.
3. Set the ‘volume label’ to `UNRAID` (case-sensitive, use all caps).
4. [Go to the downloads page.](https://unraid.net/download/) to get the zip file for the release you want to use.
5. Choose a version and download it to a temporary location on your computer (e.g. a “downloads” folder).
6. Extract the contents of the newly downloaded ZIP file onto your USB flash device.
7. Browse to the USB flash device to see the newly extracted contents from your Mac or PC.
8. If you need to enable UEFI boot, rename the `EFI-` directory to `EFI`.
9. Run the _make bootable_ script appropriate to the OS you are using:
    * **Windows XP** - double-click the **make_bootable** file.
    * **Windows 7 or later** - right-click the **make_bootable** file and select _Run as Administrator_.
    * **Mac** - double-click the file **make_bootable_mac** file and enter your admin password when prompted.
    * **Linux**:
      1. copy **make_bootable_linux** file to hard drive
      2. unmount (not eject) USB drive
      3. run the following command from wherever you unpacked on your Linux system: `sudo bash ./make_bootable_linux`

:::note

During the process of running this script, the flash device may seem to disappear and reappear on your workstation a few times – this is expected behavior.

:::
