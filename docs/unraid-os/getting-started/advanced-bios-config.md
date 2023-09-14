---
sidebar_position: 4
---

# Advanced BIOS configuration

![Booting Unraid OS](../assets/Booting.jpg)

Configuring your motherboard BIOS (as well as your storage controller) correctly is an important step to ensuring a solid experience using Unraid. The basic guidelines are as follows:

* You must configure the USB flash device as the primary boot device (most motherboards support this).
* Your storage controller should support AHCI and SATA connections and be configured in standard HBA mode (not RAID mode).
* Enable any and all virtualization support in your BIOS if your hardware supports it or you wish to create virtual machines (Intel
  VT-x / AMD-V).
* Enable IOMMU support in your BIOS if your hardware supports it or you wish to assign physical PCI devices (GPUs, media controllers, USB controllers, etc.) to virtual machines.
* Avoid using front panel USB ports in favor of ports available directly on the motherboard I/O panel.

If after configuring your BIOS you cannot get Unraid to boot properly, try the following:

* Set the boot order to as follows: Forced-FDD, USB-HDD, USB-ZIP
* Try disabling USB 2.0/3.0 support (this will default to USB 1.1).
* Try switching any Fast Boot feature on or off .
* Try switching USB keyboard support on or off .

If you are still unable to boot the OS, please post a message in our [general support](https://forums.unraid.net/forum/index.php?board=71.0) forum.

:::important

Many motherboards support only up to 12 hard drives for purposes of boot selection. This is normally not an issue for Unraid OS. However, if your Flash device is recognized by the BIOS as a hard drive, you may not be able to boot from the Flash after installing your 12th “real” hard drive. To avoid this, if possible set up your BIOS so that the Flash is treated as a removable device.

:::
