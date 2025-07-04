---
sidebar_position: 3
sidebar_label: FAQ
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Frequently Asked Questions

If you need help with Unraid OS, you have several support options:

- **Unraid Forums:** [General Support](https://forums.unraid.net/forum/55-general-support/), [Compulsive Design](https://forums.unraid.net/forum/35-unraid-compulsive-design/)
- **Official Documentation:** [Unraid Docs](https://docs.unraid.net/)
- **Discord:** [Unraid Discord Community](https://discord.unraid.net)
- **Support Portal:** [Unraid Support](https://unraid.net/support)

---

## Index

- [**Build & Hardware**](#build--hardware)
  - [I need help with a build or system configuration. Where do I go?](#build-help)
  - [What controllers are recommended for Unraid?](#hardware-raid-support)
  - [What's the best way to add more storage if my built-in controller is full?](#add-more-storage)
  - [Does Unraid have an allocation feature that remembers bad sectors on drives to prevent writes to them?](#bad-sector-allocation)
- [**OS & Configuration**](#os--configuration)
  - [Can I use a HASP key within a VM on Unraid? How does that work with multiple VMs?](#hasp-key-vm)
  - [My USB flash has failed, and I don't have a backup. How do I restore my configuration?](#usb-failed-restore)
  - [What should I do if I have forgotten my root password?](#forgot-root-password)
  - [How do I completely start Unraid OS from scratch? (Factory reset procedure)](#factory-reset)
  - [How do I change the hostname of my server?](#change-hostname)
  - [My flash drive is reporting an invalid GUID. What do I do?](#invalid-guid)
- [**Virtualization & Devices**](#virtualization--devices)
  - [Whenever I shut down my Windows VM with an AMD GPU assigned, it won't restart. What can I do?](#amd-gpu-vm-restart)
  - [How do I pass through my primary GPU to a VM if my CPU has no integrated graphics?](#primary-gpu-passthrough)
  - [I’m having problems passing through my RTX-class GPU to a virtual machine](#rtx-gpu-passthrough)
- [**Storage & RAID**](#storage--raid)
  - [Does Unraid support various RAID types such as RAID1/5/6/10?](#raid-types-support)
  - [I currently have an array of devices formatted with an MBR-style partition table and want to convert to GPT. How do I do that?](#mbr-to-gpt-conversion)
- [**Networking**](#networking)
  - [Is there any way to disable the br0 bridge?](#disable-br0-bridge)
  - [I can't seem to connect to the WebGUI using `http://tower` or `http://tower.local`. What do I do?](#webgui-connection)
- [**Installation**](#installation)
  - [I can't get the USB flash creator to install Unraid on my flash device. What do I do?](#usb-creator-issue)
  - [I need to configure my system to boot using UEFI. How do I do this?](#uefi-boot-config)
  - [I'm having issues using my web browser with the WebGUI. What can I do?](#webgui-browser-issues)
  - [How do I extend my Unraid trial?](#extend-trial)
- [**Licensing**](#licensing)
  - [Do I own my software license?](#own-license)
  - [How do I purchase Unraid?](#purchase-unraid)
  - [How do I redeem a license activation code?](#redeem-activation-code)
  - [How do I upgrade my Unraid license?](#upgrade-license)
  - [Is Unraid OS a subscription?](#subscription)
  - [What happens if I don't extend my Starter or Unleashed license?](#no-extension)
  - [What happens with pre-releases (Beta/RC versions)?](#pre-release-policy)
  - [What does "unlimited" mean for attached storage devices?](#unlimited-storage)
  - [What happens if my USB flash device fails? Do I have to repurchase a license?](#usb-failure-license)
  - [How do I manually install my license keyfile to my USB flash device?](#manual-keyfile-install)
  - [What should I do if I get an error registering my flash device: '####-####-####-#############' is already registered to another user?](#guid-error)
  - [How can I determine my registration type?](#registration-type)
  - [How do Unraid trials work?](#trial-license)
  - [Can I transfer my trial key to a new flash device?](#trial-key-transfer)
  - [I’m a reseller/OEM needing to purchase a license on behalf of my customer. What should I do?](#oem-purchase)

---

## Build & Hardware

<a id="build-help" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>I need help with a build or system configuration. Where do I go?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

For guidance on building or upgrading your Unraid server, visit the [Compulsive Design forum](https://forums.unraid.net/forum/35-unraid-compulsive-design/) or join the [Unraid Discord](https://discord.unraid.net). The community is active and ready to assist you, no matter your level of experience.
</details><br />

<a id="hardware-raid-support" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>What controllers are recommended for Unraid?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

Unraid performs best with non-RAID Host Bus Adapters (HBAs). It's best to avoid hardware RAID controllers, which can obscure drive health information and complicate maintenance.

Always check for firmware updates and ensure the controller is set to HBA/IT mode, not RAID mode. You can refer to the [Recommended Controllers thread](https://forums.unraid.net/topic/102010-recommended-controllers-for-unraid/) for models that the community has tested successfully.
</details><br />

<a id="add-more-storage" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>What's the best way to add more storage if my built-in controller is full?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

Unraid allows for the expansion of storage across multiple controllers. You can add a compatible HBA (as mentioned above). Ensure the controller operates in standard HBA (non-RAID) mode and supports AHCI/SATA. Avoid using RAID-only cards, as Unraid requires direct disk access for parity and monitoring.
</details><br />

<a id="bad-sector-allocation" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>Does Unraid have an allocation feature that remembers bad sectors on drives to prevent writes to them?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

Unraid utilizes SMART (Self-Monitoring, Analysis, and Reporting Technology) data from your drives to monitor their health and detect issues such as bad sectors. SMART is built into modern hard drives and SSDs, tracking attributes such as reallocated and pending sectors.

While Unraid doesn’t have a specific allocation feature to avoid bad sectors, it does use SMART data to notify you if a drive displays signs of failure or has an increasing number of bad sectors. This information can be found in the WebGUI under the drive's health status and SMART attributes.

If a drive shows a high count of reallocated or pending sectors, consider replacing it soon to prevent data loss.

If you're uncertain about a drive's health, you can share your SMART data in the [General Support forum](https://forums.unraid.net/forum/55-general-support/) for assistance from the community.
</details><br />

---

## OS & Configuration

<a id="hasp-key-vm" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>Can I use a HASP key within a VM on Unraid? How does that work with multiple VMs?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

If your HASP key is a USB dongle, you can assign it to only one VM at a time. Note that two VMs cannot use the same key simultaneously. You might need to pass through an entire USB controller for better compatibility. Always run tests with a Trial license to confirm that your hardware performs as expected.
</details><br />

<a id="usb-failed-restore" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>My USB flash has failed, and I don't have a backup. How do I restore my configuration?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

If you had [Unraid Connect](http://www.google.com) enabled for Flash Backups, you can use it to restore. If not, get a new, high-quality flash drive, install Unraid on it, and use the registration key you received via email. Reassign your drives as they were. If you can't recall the assignments, post for assistance in the [General Support forum](https://forums.unraid.net/forum/55-general-support/).
</details><br />

<a id="forgot-root-password" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>What should I do if I have forgotten my root password?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

Refer to [Resetting your Unraid password](../system-administration/secure-your-server/user-management.md#reset-your-password).

:::note
If you’re using encrypted drives and forget the password, data recovery isn't possible - there is no backdoor.
:::
</details><br />

<a id="factory-reset" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>How do I completely start Unraid OS from scratch? (Factory reset procedure)</h3></a>

<details>
<summary>Click to expand/collapse</summary>

1. Backup any data you wish to keep.
2. Stop the array and shut down your server.
3. Remove the USB flash device.
4. Use the Unraid USB Flash Creator tool to reformat and reinstall Unraid onto the flash drive.
5. Reinsert the flash device and boot your server.
6. In the WebGUI, open a terminal and run `lsblk` to list all drives (excluding the flash).
7. For each data drive, run `wipefs /dev/sdX` (replace X with the drive letter) to eliminate existing filesystems.
8. Continue with the normal Unraid setup and configuration.
</details><br />

<a id="change-hostname" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>How do I change the hostname of my server?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

To change your Unraid server's hostname, navigate the WebGUI to **Settings → System Settings → Identification**.

**Effects of changing your hostname:**
- The new hostname will be used for network identification (e.g., access via `http://newname`).
- You might need to reconnect any mapped network drives or shortcuts using the new hostname.
- Some devices or services may cache the old name; a reboot may be required to recognize the new name.
</details><br />

<a id="invalid-guid" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>My flash drive is reporting an invalid GUID. What do I do?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

Unraid requires a USB flash device with a unique hardware GUID (serial number). Some manufacturers may reuse GUIDs or use generic values, making these drives incompatible with each other.

**Field-tested brands:**
- Samsung FIT Plus / Bar Plus
- Kingston DataTraveler Exodia
- Lexar JumpDrive M45
- PNY Elite-X
(Avoid newer SanDisk Ultra Fit/Cruzer models unless you can confirm a unique GUID.)

It's best to avoid generic or unbranded drives, SSDs, USB card readers, and SD card adapters, as these often lack unique GUIDs and may not be supported for booting Unraid.
</details><br />

---

## Virtualization & Devices

<a id="amd-gpu-vm-restart" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>Whenever I shut down my Windows VM with an AMD GPU assigned, it fails to restart. What can I do?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

Many AMD GPUs experience issues with function-level resets, which contribute to this problem. Workarounds include ejecting the GPU from within Windows before shutting down or using an NVIDIA GPU, which generally avoids this issue.
</details><br />

<a id="primary-gpu-passthrough" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>How do I pass through my primary GPU to a VM if my CPU has no integrated graphics?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

This is feasible but requires additional steps. Check out [SpaceInvaderOne’s video guide](https://forums.unraid.net/topic/51230-video-guidehow-to-pass-through-an-nvidia-gpu-as-primary-or-only-gpu-in-unraid/) for detailed instructions on how to do this properly.
</details><br />

<a id="rtx-gpu-passthrough" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>I’m having problems passing through my RTX-class GPU to a virtual machine.</h3></a>

<details>
<summary>Click to expand/collapse</summary>

Remember that these newer models come with an integrated USB controller, which is useful when troubleshooting GPU passthrough issues with RTX-class GPUs. This controller can enhance your Windows VM's USB device interaction, enabling features such as hot-plugging support.

To ensure proper passthrough and avoid driver conflicts with Unraid OS, it's best to stub the GPU’s USB controller. Follow these steps:

1. Identify the IOMMU group that includes your GPU and related devices on the **Tools → System Devices** page.
2. Note the vendor and product IDs for the USB controller devices associated with your GPU. For example:

```
[10de:1f08] 02:00.0 VGA compatible controller: NVIDIA Corporation Device 1f08 (rev a1)
[10de:10f9] 02:00.1 Audio device: NVIDIA Corporation Device 10f9 (rev a1)
[10de:1ada] 02:00.2 USB controller: NVIDIA Corporation Device 1ada (rev a1)
[10de:1adb] 03:00.3 Serial bus controller [0c80]: NVIDIA Corporation Device 1adb (rev a1)
```

3. Go to the Flash Device Settings page on the **Main** tab.
4. Click on the flash device to edit its settings.
5. Modify the Syslinux configuration by adding the following to the append line for your selected boot mode:

```
vfio-pci.ids=[vendor_id:product_id],[vendor_id:product_id]
```

For example:

```
append vfio-pci.ids=10de:1ada,10de:1adb initrd=/bzroot,/bzroot-gui
```

6. Apply the changes and reboot your server.
7. When you edit or create your VM, you should see the additional PCI devices available for assignment without needing to edit the XML manually.

</details><br />

---

## Storage & RAID

<a id="raid-types-support" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>Does Unraid support various RAID types such as RAID1/5/6/10?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

Unraid features a unique storage architecture that distinguishes it from traditional RAID systems. Here's a comparison of different storage options:

| Feature / Capability           | Unraid parity array (md) | Btrfs pool (cache)          | **ZFS pool (7.x+)**         | Traditional RAID 5/6/10     |
|--------------------------------|--------------------------|-----------------------------|------------------------------|-----------------------------|
| Parity / redundancy model      | Dedicated parity disk(s) | Software RAID-1/10/5/6 via Btrfs | RAID-Z1/Z2/Z3 or mirrors    | Striped parity (5/6) or mirrors (10) |
| Data striping                  | No                       | Yes (except RAID-1)        | Yes                          | Yes                         |
| Disk size flexibility          | Mix any sizes            | Best when similar sizes     | Best when similar per vdev   | Requires matched sizes      |
| Expand one disk at a time     | Yes                      | Yes (add or replace devices) | Yes (per vdev*)             | Typically no                |
| File system per disk           | Yes                      | No                          | No                           | No                          |
| Single-disk read speed         | Native disk speed        | Aggregate (multi-disk)     | Aggregate (multi-disk)      | Aggregate                   |
| Write degradation during rebuild| Minimal (only failed drive) | Depends on level         | Depends on vdev layout      | Significant                 |
| Bit-rot detection              | Optional (Btrfs/ZFS checksum)   | ✅ Built-in         | ✅ End-to-end checksums      | ❌ Not inherent             |
| Snapshot / send-receive        | ❌                       | ✅ (Btrfs)                  | ✅ Native                    | ❌                          |
| Recommended production use      | General media storage    | RAID-1/10 (avoid RAID-5/6)** | ✅ All levels stable       | Enterprise arrays           |

\* ZFS vdevs must be expanded by replacing **all** drives in the vdev or adding a new vdev.  
\* Btrfs RAID-5/6 remains flagged as “experimental” upstream; use with caution.

- **Unraid parity array** is excellent for incremental expansion, allowing mismatched drive sizes with minimal rebuild stress.  
- **ZFS pools** (available in 7.x) provide enterprise-class redundancy, snapshots, and checksums, making them ideal for virtual machines and databases.  
- **Btrfs pools** excel for fast SSD caches, especially in mirrored RAID-1/10 mode.  
- Traditional hardware RAID cards are *not* necessary; you can use simple HBAs to allow Unraid to manage drives directly.
</details><br />

<a id="mbr-to-gpt-conversion" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>I currently have an array of devices formatted with an MBR-style partition table and want to convert to GPT. How do I do that?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

<h3>Why convert from MBR to GPT?</h3>
MBR (Master Boot Record) partitioning supports disks up to 2TB and only allows a maximum of four primary partitions. On the other hand, GPT (GUID Partition Table) can handle much larger disks and nearly unlimited partitions. Converting to GPT is advisable if you work with larger drives or want better partition management.

:::important Use **Maintenance Mode**
Before starting the conversion process, put your array into **Maintenance Mode**. This step ensures no writes occur during the conversion, protecting your data.
:::

<h3>Conversion process</h3>  
1. Ensure you have a valid parity and a current backup of your flash drive.
2. Enter **Maintenance Mode** from the **Main** tab.
3. Replace and rebuild your parity drive first.
4. Swap out each data drive one at a time, rebuilding the array after each replacement.
5. The new drive will be formatted with GPT partitioning each time you rebuild.
6. Once all drives are replaced and rebuilt, exit **Maintenance Mode**.

This process keeps your data safe while changing the partitioning style.

:::note Additional notes

- Drives of 2TB or smaller usually use MBR; drives larger than 2TB typically use GPT.
- Starting with Unraid OS 6.9, partition 1 starts at 32KiB for rotational devices and 1MiB for non-rotational devices, regardless of the partition style.
- Always back up your flash drive before starting this conversion process.
:::
</details><br />

---

## Networking

<a id="disable-br0-bridge" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>Is there any way to disable the br0 bridge?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

Yes. The **br0** bridge is a Linux network bridge allowing Docker containers and VMs to connect directly to your local area network (LAN) with their IP addresses. It acts as a virtual network switch that connects your physical network interface to the virtual interfaces used by containers and VMs. 

:::note
Disabling br0 means that VMs and Docker containers will not have direct access to the LAN and may lose some advanced networking features.
:::
</details><br />

<a id="webgui-connection" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>I can't seem to connect to the WebGUI using `http://tower` or `http://tower.local`. What do I do?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

If you're having trouble connecting to the WebGUI by hostname, the issue might be with your local DNS not resolving the server name. Instead, try connecting directly using the IP address.

**How to find your server's IP address:**

- Check your router or switch's DHCP client list for a device listed as "Tower" or something similar.
- If you assigned a static IP during flash creation, use that address.
- Plug in a monitor and keyboard to your server; the IP address will appear on the local console after it boots.

**Common causes for this issue:**

- Your computer and server might be on different subnets or VLANs.
- Your router may not support local hostname resolution.
- The Unraid server might not be connected to the network or have a misconfigured network setting.
- Firewall or security software may be blocking access.

If you are unable to connect, try rebooting your server and network equipment, and ensure that all cables are securely connected.
</details><br />

---

## Installation

<a id="usb-creator-issue" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>I can't get the USB flash creator to install Unraid on my flash device. What do I do?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

If the USB flash creator tool isn't working for your system or flash drive, you can utilize the [manual installation method](../getting-started/set-up-unraid/create-your-bootable-media.md#manual-install-method) to prepare your Unraid boot device. This method is compatible with Windows, macOS, and Debian/Ubuntu Linux.
</details><br />

<a id="uefi-boot-config" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>I need to configure my system to boot using UEFI. How do I do this?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

You can set up UEFI boot mode in a few different ways:

**Option 1: During flash creation**

- When using the USB flash creator, select the option to enable UEFI boot mode before writing Unraid to the flash drive.

**Option 2: After booting in Legacy Mode**

- In the WebGUI, head to the Flash Device **Settings → Flash Device** page.
- Enable UEFI boot mode and reboot your server.

**Option 3: Manual folder rename**

- On the flash drive, rename the `efi-` folder to `efi` (remove the dash `-`).
- Insert the flash drive into your server, then enter your motherboard BIOS/UEFI settings.
- Set the USB flash as the primary boot device and enable UEFI boot mode (be sure to disable CSM/Legacy/Compatibility mode, if available).
</details><br />

<a id="webgui-browser-issues" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>I'm having issues using my web browser with the WebGUI. What can I do?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

If you're encountering display or functionality issues with the WebGUI, consider the following:

- **Ad-blockers and content blockers:** These browser extensions may interfere with the WebGUI. Try adding your Unraid server to your ad-blocker's whitelist or disabling the blocker for your server's address.
- **Browser extensions:** Some extensions could block scripts or alter page content. Disable extensions or try using a private/incognito window.
- **Outdated browsers:** Ensure you use a modern, up-to-date browser (like Chrome, Firefox, or Edge). Older browsers may not fully support the WebGUI.
- **Cache issues:** Clear your browser cache or try a hard refresh (Ctrl+F5 or Cmd+Shift+R).
- **Network issues:** Ensure that your computer and server are connected to the same network and subnet.

If problems persist, try accessing the WebGUI from another browser or device.
</details><br />

<a id="extend-trial" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>How do I extend my Unraid trial?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

If you need more time with your [30-day free trial](https://unraid.net/download) of Unraid, you can extend it. Once your original trial expires, stop the array and go to the **Registration** page. You should see a button that allows you to request a 15-day extension. You can do this twice for a total of 60 days before you need to purchase a license.

:::important
You must use the same USB flash device to continue your trial. Changing the flash device will require starting a new trial from scratch.
:::
</details><br />

---

## Licensing

<a id="own-license" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>Do I own my software license?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

When you [purchase an Unraid OS license](https://unraid.net/pricing), you own a perpetual copy of the software. Your license is valid forever and does not expire, even if you choose not to pay for future updates.
</details><br />

<a id="purchase-unraid" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>How do I purchase Unraid?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

You have two options for purchasing Unraid:  
1. **From the WebGUI:** If you have started a trial, you can purchase a license or upgrade directly from the top-right menu in the WebGUI.
2. **With an activation code:** Purchase an Unraid license activation code from the [Unraid website](https://unraid.net/pricing). Activation codes do not expire and can be redeemed at any time.

All licenses are per server. Use the free 30-day trial to ensure Unraid meets your needs before purchasing, as all sales are final.
</details><br />

<a id="redeem-activation-code" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>How do I redeem a license activation code?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

1. Purchase an activation code from the [Unraid website](https://unraid.net/pricing). Your code will be on your purchase receipt.
2. Set up your Unraid server using the [Getting started guide](../getting-started/getting-started.md).
3. Log in to your Unraid server's WebGUI (`http://tower` or `http://tower.local` by default).
4. Sign in to your Unraid.net account.
5. Select **Redeem activation code** and enter your code.
6. Your registration key will be emailed to you along with installation instructions.

:::important
Activation codes are one-time use for generating your Unraid license key file.
:::

:::note Instructional Video
Watch the [Activation Code Instructional Video](https://www.loom.com/share/3ceb40440240474aaa80a0b7e3e69cb2) for step-by-step guidance.
:::
</details><br />

<a id="upgrade-license" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>How do I upgrade my Unraid license?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

You can upgrade your license at any time from within the WebGUI (Tools → Registration) or at account.unraid.net/keys (select "Upgrade" from the menu).

All pricing information for each license can be found [here](https://unraid.net/pricing).

- **Starter:** Up to 6 attached storage devices  
- **Unleashed:** Unlimited attached storage devices  
- **Lifetime:** Unlimited attached storage devices, lifetime updates  
</details><br />

<a id="subscription" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>Is Unraid OS a subscription?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

Unraid is **not a traditional subscription service**:

- You own your license permanently after purchase.
- Your license never expires or stops working.
- **Starter** and **Unleashed** include 1 year of updates, then optional extensions for an annual fee.
- **Lifetime** includes updates for the product's lifetime.
- If you don't pay for updates, you keep using your current version indefinitely.
- You can re-enable updates at any time by paying the current extension fee.

</details><br />

<a id="no-extension" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>What happens if I don't extend my Starter or Unleashed license?</h3></a>

<details> 
<summary>Click to expand/collapse</summary>

- You keep your license and can use your current version of Unraid OS indefinitely.
- You won’t receive new feature updates or major version upgrades.
- You remain eligible for patch releases and security updates within the same minor version (e.g., 7.1.x if your license lapsed at 7.1.0).
- Once a new minor version is released (e.g., 7.2.0), only security patches are provided for the previous minor version.
- When a version reaches end-of-life (EOL), no further updates are provided.
- You can pay the extension fee at any time to regain access to the latest updates.

</details><br />

<a id="pre-release-policy" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>What happens with pre-releases (Beta/RC versions)?</h3></a>

<details> 
<summary>Click to expand/collapse</summary>

- Pre-release (Beta and Release Candidate) versions are for testing and may contain bugs.
- Only install pre-releases on non-production systems.
- Support for pre-releases ends when the stable version is released.
- Your license must be eligible for OS updates on the stable release date to receive the stable version.
- If your license expires before the stable release, you must extend your license to upgrade or roll back to a supported stable version.
- Your license remains valid after expiration; you only need an active license for new updates.

</details><br />

<a id="unlimited-storage" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>What does "unlimited" mean for attached storage devices?</h3></a>

<details> 
<summary>Click to expand/collapse</summary>

"Unlimited" refers to the maximum number of storage devices you can attach to your Unraid server, based on your license tier. 

Here are the current limits:

| License Tier | Parity-Protected Array    | Named Pools | Devices per Pool | Total Storage Devices |
|--------------|---------------------------|-------------|------------------|-----------------------|
| Starter      | Up to 6                   | 1           | Up to 6          | 6                     |
| Unleashed    | Up to 30 (28 data + 2 parity) | Up to 35 | Up to 60         | Unlimited*            |
| Lifetime     | Up to 30 (28 data + 2 parity) | Up to 35 | Up to 60         | Unlimited*            |

\* *"Unlimited" means you are not limited by the license, but by hardware and OS constraints. Additional storage devices can be used for virtual machines, unassigned devices, or other Unraid features.*
</details><br />

<a id="usb-failure-license" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>What happens if my USB flash device fails? Do I have to repurchase a license?</h3></a>

<details> 
<summary>Click to expand/collapse</summary>

No, you do not need to repurchase your license if your USB flash device fails.

To transfer your license:

1. Prepare a new, high-quality [USB flash device](../../getting-started/set-up-unraid/create-your-bootable-media.md).
2. Install Unraid OS on the new device using the USB Flash Creator or a manual method.
3. Boot your server with the new flash device.
4. Go to **Tools → Registration** in the WebGUI.
5. Click **Replace Key** and follow the prompts to transfer your license to the new device.

The first transfer can be done at any time, while subsequent transfers are allowed once every 12 months using the automated system. If you need to transfer your license again before the 12-month period, contact Unraid support with your old and new USB GUIDs for manual assistance.

:::tip
Routinely back up your USB device using Unraid Connect to simplify recovery and avoid data loss.
:::
</details><br />

<a id="manual-keyfile-install" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>How do I manually install my license keyfile to my USB flash device?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

<Tabs>
<TabItem value="offline" label="Manual (Offline) method">

1. Ensure you have a recent backup of your USB drive. Use [Unraid Connect](http://www.google.com) (recommended) or the local backup option at **Main → Flash → Flash Backup**.
2. Shut down your Unraid server and remove the USB flash device.
3. Insert the USB flash into another computer.
4. Open the USB drive and copy your `.key` file into the `/config` folder.  
*Make sure this is the only `.key` file present—delete any others.*
5. Safely eject the USB flash device, reinstall it in your server, and reboot.
</TabItem>

<TabItem value="network" label="Network (Online) method">

1. If your server is running and the flash share is visible on your network, navigate to the flash share under **Network**.
2. Drag and drop the registration key file into the `config` directory.
3. In the WebGUI, **Stop** the array, then **Start** the array again to apply the new key.

</TabItem>
</Tabs>
</details><br />

<a id="guid-error" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>What should I do if I get an error registering my flash device: '####-####-####-#############' is already registered to another user?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

This error indicates that your USB flash device does not have a unique hardware ID (GUID), which prevents it from being registered with the Unraid OS. To resolve this issue, use a different USB flash drive. Brands known for having unique GUIDs include Lexar, Samsung, Kingston, and PNY.
</details><br />

<a id="registration-type" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>How can I determine my registration type?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

Navigate to **Tools → Registration** in the WebGUI. Here, you can find your current license type and registration details.
</details><br />

<a id="trial-license" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>How do Unraid trials work?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

- Trial licenses last 30 days and provide full Unraid Pro functionality without a storage device limit. 
- You’ll need a quality USB flash drive and the Unraid USB Creator tool.
- Consult the [Getting Started guide](../getting-started/set-up-unraid/create-your-bootable-media.md) for server setup instructions.
- Trial licenses require an internet connection at boot for initial validation.
- You can extend your trial up to two times (details below).
</details><br />

<a id="trial-key-transfer" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>Can I transfer my trial key to a new flash device?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

No, trial registrations are only valid on the original USB flash device. If you want to purchase a license, you can transfer your configuration to a new flash device and then purchase a registration key; however, the trial cannot be continued on a new device.
</details><br />

<a id="oem-purchase" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>I’m a reseller/OEM needing to purchase a license on behalf of my customer. What should I do?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

You can purchase a license through the WebGUI or by obtaining an activation code from the [Unraid website](https://unraid.net/pricing).

At checkout, select the "OEM" option and enter your purchase details, including your customer's name and email address. The license key will be issued in your customer's name and sent directly to them. You'll also find an invoice download link after checkout.

For bulk OEM/reseller pricing (10 licenses or more), [contact Unraid](https://unraid.net/contact) for special pricing.
</details><br />
