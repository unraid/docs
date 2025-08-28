---
sidebar_position: 1
sidebar_label: Create your bootable media
---

# Create your bootable media

Unraid OS is installed on a USB flash drive, which acts as the boot device for your server. You can create this bootable media using our recommended [Automated install method](./create-your-bootable-media.md#automated-install-method) with our [USB Flash Creator](https://unraid.net/download) tool or by following the [Manual installation method](./create-your-bootable-media.md#manual-install-method). In both cases, you will need a high-quality USB flash drive (between 4 and 32 GB) that has a unique %%GUID|guid%%.

  :::important

  For drives larger than 32 GB, use a tool like [Rufus](https://rufus.ie/en/) to format as FAT32.

  :::

## Automated install method

The automated installation method is the best way to set up Unraid OS. It simplifies the process, reduces errors, and ensures your USB flash drive is ready for most hardware configurations. This method offers the quickest and most reliable path to a successful installation for most users.

1. **Prepare your USB Device:**  
   Insert a high-quality USB flash drive into your computer.

2. **Download the Unraid USB Flash Creator and install Unraid OS onto the drive.**  
   [Windows](https://releases.unraid.net/dl/stable/usb-creator.exe) | [Mac](https://releases.unraid.net/dl/stable/usb-creator.dmg) | [Linux](https://releases.unraid.net/dl/stable/usb-creator.deb)
 
3. **Complete Setup:**  
   Customize your server name and network settings.
4. **Eject and Install:**  
   Safely remove the USB drive and insert it into your server.
5. **Configure your server's BIOS settings**
   - Set the boot device to the USB flash drive.
   - Enable %%hardware virtualization|hvm%% features, including %%IOMMU|iommu%%.  (See [Advanced BIOS configuration](../explore-the-user-interface/key-features.md) for details.)
6. **Boot into Unraid OS:**  
   Save your BIOS configuration, then exit to boot into Unraid OS.

## Manual install method

The manual installation method is designed for situations where the USB Flash Creator tool is either unavailable or incompatible with your hardware. This approach provides complete control over the formatting and setup process, making it ideal for advanced users or for troubleshooting specific issues with a USB device.

### Prepare your USB device

  1. Plug in the USB flash device.
  2. Format it to FAT32 (**not** ex-FAT or NTFS).  
  3. Set the volume label to `UNRAID` (case-sensitive, all caps).

### Download and extract

  1. Go to the [Unraid Download Archive](../../download_list.mdx) and download the ZIP file of your chosen release.
  2. Extract the ZIP contents to the USB device.
  3. Confirm that the files have been copied.

### Make the USB device bootable

:::note
This section is only needed to enable Legacy boot. If setting up for UEFI boot, there is no need to run these scripts.
:::

  Run the appropriate script for your OS:

  **Windows 7 or later:**  
    - Right-click `make_bootable` and select **Run as administrator**.

  **Mac:**  
    - Double-click `make_bootable_mac` and enter your admin password.

  **Linux:**  
    - Copy `make_bootable_linux` to your hard drive.
    - Unmount the USB drive.
    - In the terminal, run:  
      ```
      sudo bash ./make_bootable_linux
      ```

  :::note
  
  The flash device may briefly disappear and reappear a few times during this process. This is normal.

  :::
