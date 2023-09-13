---
sidebar_position: 9
---

# OS

## I Need Help with a Build / System Configuration. Where do I go?

For assistance with creating a special build for Unraid OS, we highly advise users to check out our [Compulsive Design forum](https://forums.unraid.net/forum/35-unraid-compulsive-design/%7CUnraid).

Our community is fantastic about helping folks create their ultimate Unraid system.

## Does Unraid Support Hardware-based RAID Controllers?

While some users have been able to use RAID controllers to present devices to Unraid OS for use, they definitely complicate things when it comes to features and maintenance. Disk temperatures and even some SMART values may not come through correctly when presented through a hardware RAID controller.

Therefore, we only officially support the use of non-RAID controllers for storage devices. Most RAID storage controllers offer a way to flash the firmware to convert the card into a basic HBA for devices (eliminating the RAID entirely), but you'll have to search for your specific controller to see if that is an option.

## Can I use a HASP Key within a VM on Unraid? How Does that Work with Multiple VMs?

If the HASP key is a USB dongle, then you can assign it to a single virtual machine at a time. Two VMs cannot be running with concurrent access to the same key.

In addition, depending on how the device works, you may need to assign an entire USB controller to the VM for which you want to use the key. You'll need to test this with a Trial license of our software before committing to a purchase, because all USB devices can be a bit different in how they work within a VM.

## My USB Flash Has Failed and I Don't Have a Backup. How do I Restore my Configuration?

[Unraid Connect](/connect/about.md) has support for Flash Backups to help resolve some of the pain points of a broken flash drive.

First, you'll need to get a new flash device. Remember to get a quality device from manufacturers such as Kingston, PNY, Lexar, or Samsung. Second, you'll need to find the e-mail with your registration key for your previous flash device.

Last, you'll need to install Unraid on the new flash device, boot it up on your server, and then install the old registration key on the new flash (from the Tools \> Registration page). From there you can request and then install a replacement key.

As far as your configuration goes, if you can remember your drive assignments (which disks were assigned to which slots), you should be able to simply re-assign them all and start the array. 

You may need to reconfigure your shares, users, and other system settings, but your data should be intact.

If you cannot remember your drive assignments, [please post on the forum for further assistance (under General
Support)](https://forums.unraid.net/forum/55-general-support/).

## What Should I do if I have Forgotten my Root Password?

See [Lost Root Password](/unraid-os/manual/troubleshooting/#lost-root-password)

_Important: this process only works for user passwords. If you encrypt your drives and forget this password, unfortunately you are hosed. There is no way for Lime Technology or anyone to recover this password. Please remember it or write it down in a secure, locked place!_

## How do I completely start Unraid OS from scratch? How do I wipe my existing configuration / filesystems?

1. Ensure there is no data on the system that you want or need.
2. Stop the array and shut down the server.
3. Remove the USB flash device.
4. Using a Windows or Mac computer, reformat the flash using the USB Flash Creator tool from our website.
5. Reinstall the flash in the server and boot it up.
6. Click on the "terminal" icon in the top right corner of the webGui.
7. From the command line, type: lsblk
8. Note all the devices present excluding your USB flash device.
9. Now for each device in the list (excluding the USB flash device), type the following command: wipefs /dev/sdX (replacing X with the letter of the device from the previous steps). This will remove the filesystem from the device so it can be reformatted by Unraid OS.
10. Now continue reconfiguring Unraid OS per the normal procedure.

## Whenever I Shutdown my Windows 10 VM with my AMD GPU Assigned, if I try to restart it, it doesn't work. What do I do?

This is due to issues with many AMD GPUs not supporting function-level resets. NVIDIA GPUs are recommended as they do not have this problem. A workaround to this issue is to eject the GPU from the VM before shutting it down. You can do this from the bottom right corner in Windows where you would also find any USB devices. Just eject the GPU, then use another machine to shut down the VM from the Unraid webGui. Then when you start it again, it shouldn't have any problems.

## How do I passthrough my primary GPU to a VM when my CPU doesn't have an integrated graphics device?

This can be a challenge, but luckily SpaceInvaderOne [has this covered in a video guide on our
forums!](https://forums.unraid.net/topic/51230-video-guidehow-to-pass-through-an-nvidia-gpu-as-primary-or-only-gpu-in-unraid/)

## What's the best way to add more storage to a system above what the built-in controller supports?

Unraid can easily scale storage across multiple controllers in a system. The controllers must act as standard HBAs and not actual RAID controllers. Most RAID controllers offer an option to either flash their firmware or reconfigure the card into a mode to operate this way.

## Does Unraid support various RAID types such as RAID1/5/6/10?

Unraid manages storage in two separate buckets: the array and the cache. The array itself uses dedicated parity device(s) similar to a MAID.

The array cannot be configured into traditional RAID methods such as RAID 1/5/6/10.

The cache is created using btrfs. When more than one disk is present, the cache is called a "pool" and is by default configured to use btrfs RAID1, which is a slightly different take than a traditional RAID1. The cache can optionally be configured to use btrfs RAID 5/6/10, but RAID 5/6 on btrfs is still considered unstable, so it isn't recommended for production use.

## My system is crashing but my logs don't contain the event. What do I do to obtain support?

Sometimes a hard system crash can prevent you from obtaining vital information in the logs that would help better diagnose the issue. In the event you can't obtain the logs with a remote connection, you'll have to resort to a local one. Attach at least a monitor and keyboard to the server and boot it up into non-GUI mode. Once presented with the login prompt, login as the user 'root' and whatever password you set when you set up the server (if no password was set, leave it blank and press enter again). From the command line now, type the following command:

```shell
tail /var/log/syslog -f
```

This will begin printing the system log to the monitor directly. Now go about using the server as you normally would. When the crash occurs, take a picture of what's visible on the monitor and post it in the support forums. This will hopefully give us some further insight on the issue.

## Is there any way to disable the br0 bridge?

Absolutely! Simply navigate to the Tools \> Network Settings page to disable network bridging. Note that this will result in differences in behavior for virtual machines (including losing the ability to communicate with the host from a guest).

## How do I enable UEFI boot mode if I configured my flash device using the manual method?

Simply remove the dash symbol from the EFI folder on the root of the flash drive and then make sure your motherboard BIOS is configured to boot UEFI.

## I'm having problems passing through my RTX-class GPU to a virtual machine

Posting in the forums for assistance is always recommended when troubleshooting a VM / pass through problem, but there is something
worth noting about these newer devices that is unique compared to previous series cards. These GPUs feature a USB controller built into the GPU. This is quite fortunate as it can be used with a USB hub to then act as a device your Windows VM can interact with more naturally (such as supporting hot plugging USB devices). However, it is recommended that you stub this device to ensure it's driver isn't loaded with Unraid OS. To stub the device, perform the following steps:

1. Locate your IOMMU group containing your GPU and its other devices on the Tools \> System Devices page.

2. Note the vendor and product IDs indicated in the brackets.
Example:

```shell
[10de:1f08] 02:00.0 VGA compatible controller: NVIDIA Corporation Device 1f08 (rev a1)

[10de:10f9] 02:00.1 Audio device: NVIDIA Corporation Device 10f9 (rev a1)

**[10de:1ada]** 02.00.2 USB controller: NVIDIA Corporation Device 1ada (rev a1)

**[10de:1adb]** 03:00.3 Serial bus controller [0c80]: NVIDIA Corporation Device 1adb (rev a1)
```

3. Navigate to the flash device settings page (on the Main tab).

4. Click on the flash device.

5. Edit the Syslinux configuration by adding the following to the append line on the boot mode selected:

```shell
vfio-pci.ids=[####:####],[####:####]
```

Example:

```shell
append vfio-pci.ids=10de:1ada,10de:1adb initrd=/bzroot,/bzroot-gui
```

6. Apply the change and reboot your server.

7. Edit or create your VM and you will now see these additional PCI devices available to assign to your VM without manually editing your XML.

## Does Unraid have a allocation feature that remembers bad sectors on drives to prevent writes to them?

Hard drives and SSDs use SMART data to keep track of bad sectors and prevent writes. This is native functionality of the underlying hardware. That said, if a device is showing a large amount of bad sectors / reallocated sectors, replacing it soon may be a good idea. If you're not sure, try posting in our General Support forum including the SMART data for the drive in question and our community can help determine what to do.

## I currently have an array of devices that are formatted with an MBR-style partition table and I want to convert to GPT. How do I do that?

Any device 2TB or smaller uses MBR-style partition table.

Any device larger then 2TB uses GPT-style partition table.

For Unraid OS version 6.8.x and earlier:

`Starting position of partition 1 for any storage device is 32KiB from start of device (regardless of whether MBR or GPT).`

Starting with Unraid OS 6.9:

`Default starting position of partition 1 for rotational devices is 32KiB from start of device (regardless of whether MBR or GPT).`

`Default starting position of partition 1 for non-rotational devices is 1MiB from start of device (regardless of whether MBR or GPT)`

Presuming user has valid parity and he wants to preserve data:

Must first swap out and rebuild Parity. Swap out each data device and rebuild one-by-one.

For this kind of upgrade, we recommend starting in “Maintenance mode” each time to perform the swap and rebuilds. This will ensure the devices are not written during the process. At the end of the process, the original storage device should be intact.

Also highly recommend downloading flash backup: Main/Flash/Flash Backup

## Installation

**I'm unable to get the USB Flash Creator to install Unraid to my flash device. What do I do?**

In the event the flash creator doesn't see or can't install Unraid to the device, it could be for one of many reasons. The simplest solution would be to try an alternate device, but if that is not an option for you, you can try installing Unraid using the legacy [manual method documented here](./manual-install-method).

**I can't seem to connect to the WebGUI using <http://tower> or <http://tower.local>. What do I do?**

Sometimes your local DNS server won't resolve by hostname and if that is the case here, you can try connecting to the server by IP address. You can discover the IP address of the server in multiple ways (by manually setting it during the creation of the flash device, reviewing your router/switch DHCP address pool, or by connecting a monitor to the server).

**How do I change the hostname of my server?**

You can change the name used for your Unraid server from the WebGUI by going to Settings-\>System Settings-\>Identification

**My flash drive is reporting an invalid GUID. What do I do?**

The USB Flash device **must** be one that has a unique hardware GUID (serial number) built into it. Some manufacturers re-use the same GUID on the drives they manufacture, use a GUID that is all zeroes, or use an obviously made-up number. These drives are not able to be used as an Unraid boot device. Although it is difficult to generalize, drives from most major manufacturers **do** satisfy the requirement of having a unique GUID.

Note: SSDs, USB card readers, SD card readers, or other devices cannot be used to boot Unraid at this time.

**The USB flash creator tool isn't detecting my flash drive. What do I do?**

In the event this tool doesn't work for you, we have additionally documented a manual process by which you can also create your flash
device. As an FYI, the manual method only works on 32 GB devices or smaller.

USB flash devices and the Flash Creator tool are discussed further in this New Users Blog.

**I need to configure my system to boot using UEFI. How do I do this?**

UEFI boot mode can be configured in 3 ways. When creating the flash device using the flash creator, there is an option to enable UEFI boot mode. After booting in legacy mode, you can change to UEFI boot from the Flash Device Settings page. And lastly, you can always rename the folder on the flash drive called **efi~** to **efi** (i.e. removing the trailing **~** character).

**I'm having issues using my web browser with the Unraid WebGUI. What can I do?**

Unraid's management interface (the WebGUI) is incompatible with most ad-blocker solutions. It is for this reason that we strongly suggest that users leveraging an ad-blocker in their browser first add the Unraid server to the ad-blocker whitelist to ensure the ad-blocker doesn't affect the WebGUI. Failure to do so is likely to result in parts of the WebGUI not displaying correctly.

**How Do I Extend My Unraid Trial?**

Did you know that you can extend the [30 day free trial](https://unraid.net/download) of Unraid? Hardware can be ill-suited. Things break. Life happens. We get it. To try out Unraid a little longer, once your original trial shows "expired" in the upper left of the header, stop the array.

Next, go to the **Registration** page. A button shows up where you can select it for a 15 day extension. You can do this a total of two times before you must decide if you would like to purchase Unraid or not.

:::important

You cannot change the USB flash device for Unraid trials if you wish to continue where you left off.

:::