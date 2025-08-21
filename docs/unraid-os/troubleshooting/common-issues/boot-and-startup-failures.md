---
sidebar_position: 1
sidebar_label: Boot & startup failures
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Boot & startup failures

When your Unraid server fails to start correctly, it can be challenging to identify the cause without a clear understanding of the boot process. Following this guide lets you quickly diagnose and resolve most startup problems, ensuring that your %%array|array%%, %%WebGUI|web-gui%%, and services are operational with minimal downtime.

## Preparing the flash device

This topic is covered in detail under the [Prepare your USB device](../../getting-started/set-up-unraid/create-your-bootable-media.md#prepare-your-usb-device) section.

:::caution
Always [back up your flash drive](../../system-administration/maintain-and-update/changing-the-flash-device.md#backing-up-your-flash-device) before making changes. All user-specific settings, including your license key, are stored in the `config` folder. Restoring this folder after re-prepping your flash device will help preserve your current configuration.
:::

## Enabling UEFI boot

Modern systems typically require **UEFI boot mode** for enhanced security and faster startup times. When creating your Unraid boot device, you can enable %%UEFI|uefi%% support during setup. If you need to enable %%UEFI|uefi%% boot later, simply rename the folder on the flash device from `EFI-` to `EFI` by removing the trailing hyphen `-`.

To configure %%UEFI|uefi%% boot in your system BIOS/%%UEFI|uefi%% settings:

1. Enter your motherboard's BIOS/%%UEFI|uefi%% setup during startup (usually by pressing F2, DEL, or ESC)
2. Locate the boot options or boot mode settings
3. Set the boot mode to **UEFI** or **UEFI with CSM disabled**
4. Ensure the Unraid flash device is selected as the UEFI boot device
5. Save your changes and exit

## Understanding the boot sequence

The Unraid boot sequence has a number of stages:

<details>
<summary><strong>1. BIOS boot</strong> - Click to expand/collapse</summary>

The BIOS/UEFI firmware initializes hardware and locates the bootable device. This is the foundation of the entire boot process.

- The motherboard BIOS recognizes the Unraid bootable flash device.
- Setting the flash device as the default boot device varies based on your BIOS; check your motherboard manual for guidance.
- The flash device supports both **legacy (CSM)** and **%%UEFI|uefi%%** boot modes.
- For %%UEFI|uefi%% boot, ensure the `EFI` folder on the flash device does not have a trailing hyphen (`-`).

</details>

<details>
<summary><strong>2. Syslinux loader</strong> - Click to expand/collapse</summary>

The bootloader presents startup options and loads the Linux kernel into memory. This stage determines which operating system or diagnostic tool will run.

- Boot menu entries are defined in the `syslinux/syslinux.cfg` file on the flash device.
- You can edit this file through the %%WebGUI|web-gui%% under ***Main → Syslinux configuration***.
- **Memtest86+**, which ships with current builds of Unraid, works in both legacy and %%UEFI|uefi%% modes. For older Unraid versions, obtain a compatible version from [the official Memtest site](https://www.memtest86.com/) for %%UEFI|uefi%%.
- If no option is selected, the default boots after a timeout, which is useful for headless operation.

</details>

<details>
<summary><strong>3. Linux core</strong> - Click to expand/collapse</summary>

The Linux kernel initializes and begins hardware detection. This is where the operating system takes control from the bootloader.

- **Syslinux** loads the Linux core from the flash device into RAM.
- You’ll see console messages showing bz* files loading.
- Errors at this stage often indicate issues with the flash device.
- Linux detects hardware during startup.

</details>

<details>
<summary><strong>4. Flash dependent services</strong> - Click to expand/collapse</summary>

The flash device becomes accessible and essential services begin loading. This stage is critical for configuration and network access.

- The flash device mounts at `/boot`.
- If it fails to mount, you may still see a login prompt, but this indicates an incomplete boot.
- Use the `df` command to check if `/boot` is mounted.
- The flash device must be labeled **UNRAID** (all caps) for proper mounting.
- Additional drivers and firmware will become available at this stage.
- Configuration is loaded into RAM.
- Standard Linux services, including networking and %%WireGuard|wireguard%% VPN (if enabled), start here.

</details>

<details>
<summary><strong>5. Plugins</strong> - Click to expand/collapse</summary>

Third-party extensions and customizations are loaded to enhance system functionality. Plugin issues can prevent successful startup.

- Installed plugins are loaded during this step.
- **Safe boot** options can suppress plugin loading if needed.

</details>

<details>
<summary><strong>6. WebGUI</strong> - Click to expand/collapse</summary>

The web-based management interface becomes available, allowing remote administration and configuration of your server.

- The %%WebGUI|web-gui%% starts at this point.
- The `config/go` file on the flash device can run user commands before or after the %%WebGUI|web-gui%% starts.

</details>

<details>
<summary><strong>7. Array</strong> - Click to expand/collapse</summary>

Storage devices are mounted and made available, completing the boot process. This is where your data becomes accessible.

- If auto-start is enabled, the %%array|array%% starts here; otherwise, a manual start will be required.
- Drives will be mounted as `/dev/diskX` and `/mnt/cache` (if present).
- Shares become available on the network as `/mnt/user/sharename`.
- Docker containers will start in the order specified on the Docker tab, with customizable delays.
- Auto-start virtual machines (%%VMs|vm%%) will also launch.

</details>

At this point, the Unraid server is fully operational.

---

## Boot failure

When your server won't start, systematic troubleshooting helps identify and resolve the root cause quickly. Follow these steps in order to avoid missing critical issues or making unnecessary changes. Each step builds on the previous one, so don't skip ahead even if a step seems unrelated to your specific problem.

1. Use a USB 2.0 port for the flash device if possible. It's generally more reliable and less prone to issues than USB 3.0.
2. Check your BIOS/%%UEFI|uefi%% settings to ensure that the flash device is set as the primary boot device.
3. Inspect the flash device for any physical or logical errors on a Windows or macOS computer.
4. Re-extract the Unraid release bz* files onto the flash device to prevent any potential corruption.
5. Rebuild the flash device by starting with a clean Unraid copy, then restore your `config` folder.
6. Try booting in [Safe Mode](../../using-unraid-to/customize-your-experience/plugins.md#troubleshooting-with-safe-mode) to check for any plugin-related problems.
7. Test with a new flash device and perform a clean Unraid installation. This helps determine if there are issues with the server hardware.
8. If necessary, transfer your license to a new flash device.

---

## Recovering from a lost boot drive and unknown parity drives

:::important
This recovery process involves risk of data loss if drives are incorrectly assigned. Before proceeding:

1. **Do not start the array** until you're confident about drive assignments
2. **Document** which drives were previously parity vs. data drives
3. **Consider seeking help** on the [Unraid forums](https://forums.unraid.net/) if you're unsure

If you have any recent backups or documentation of your array configuration, review those first.
:::

If your Unraid boot drive fails and you don’t have a recent backup or knowledge of which drives are parity, you can recover your system by using Unraid’s ability to recognize data drives by their file systems. %%Parity drives|parity-drives%% do not have a valid file system, which helps differentiate them.

Unraid identifies data drives by detecting existing valid file systems. %%Parity drives|parity-drives%%, which lack a file system, appear unmountable. This characteristic allows you to distinguish %%parity drives|parity-drives%% from data drives after booting with a new flash device.

### Recovery procedure

This procedure helps you restore your array configuration when you've lost your boot drive and can't remember which drives were parity vs. data. Follow each step carefully to avoid data loss.

1. Create a new Unraid boot drive.
2. Boot the server from this new drive (do not assign any drives yet).
3. Activate a license, using either a trial or transferring an existing one.
4. Identify %%parity drives|parity-drives%% using one of the methods outlined below.
5. Use ***Tools → New Config*** to reset the %%array|array%% while retaining previous assignments if possible.
6. Correct drive assignments on the ***Main*** tab, making sure to distinguish between %%parity|parity%% and data drives.
7. Start the %%array|array%% to commit the drive assignments.
8. If the %%parity|parity%% is valid, check the box for ***Parity is Already Valid***. If not, allow the %%parity|parity%% to rebuild.
9. Review and adjust any user share includes/excludes based on the new assignments.
10. Run a %%parity check|parity-check%% to verify integrity, especially if %%parity|parity%% wasn’t rebuilt.

---

### Identifying the parity drives

<details>
<summary><strong>Using Unraid’s built-in capability (preferred method)</strong> - Click to expand/collapse</summary>

This method does not require plugins, but it will invalidate %%parity|parity%%, necessitating a rebuild.

To use this method:

1. Assign all data drives to the %%array|array%% and start it.
2. %%Parity drives|parity-drives%% will show as unmountable since they lack a valid file system.
3. Confirm that the number of unmountable drives matches your %%parity|parity%% count.
4. Take note of the serial numbers of these drives.
5. If relevant, you can check mounted data drives to confirm their order.

</details>

<details>
<summary><strong>Using the Unassigned Devices plugin</strong> - Click to expand/collapse</summary>

This plugin-based method preserves the validity of %%parity|parity%% by mounting drives in read-only mode.

To use this method:

1. Install the [**Unassigned Devices** plugin](https://unraid.net/community/apps?q=unassigned+devices#r:~:text=don%27t%20be%20carefull!!!-,Unassigned%20Devices,-dlandon) from the ***Apps*** tab.
2. Mount each disk read-only, one at a time.
3. Drives that fail to mount are likely %%parity drives|parity-drives%% (you cannot differentiate between parity1 and parity2).
4. Inspect mounted data drives to identify their order, if necessary.

</details>

For more information, see the [Unassigned Devices plugin thread](https://forums.unraid.net/topic/55481-unassigned-devices-managing-unassigned-devices-without-rebooting/) in the Unraid forums.

---

\* *"%%WireGuard|wireguard%%" and the "%%WireGuard|wireguard%%" logo are registered trademarks of Jason A. Donenfeld.*
