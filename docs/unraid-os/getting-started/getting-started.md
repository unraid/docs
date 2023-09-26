---
sidebar_position: 3
---

# Getting started

In this guide, we cover how to prepare your flash device, boot the system, and configure your first array. The entire process should take less than 15 minutes.

## Prerequisites

Before you begin:

* You should have your server assembled and connected via power and Ethernet.
* You should have a monitor and keyboard attached for the initial configuration and to be ready to alter configuration settings in your
  BIOS.
* You will also need a high-quality, named-brand [USB flash device](../manual/changing-the-flash-device.md#recommendations-on-buying-usb-drives) that is at least 2 GB in size, but no larger than 32 GB, that must contain a unique GUID (Globally Unique Identifier).
* Your system must be capable of booting from a USB device.

### Hardware requirements

As of the [current release](https://unraid.net/product) of Unraid OS, the minimum system hardware requirements for data storage are as follows:

* A 64-bit capable processor, that runs 1 GHz or higher.
* A minimum of 4 GB of RAM for basic NAS functionality.
* Linux hardware driver support for storage, Ethernet, and USB controllers.
* Two hard disk drives to ensure data protection with a parity disk.

:::important

Plan ahead for any containers or VMs you want to add to your Unraid server, consider the hardware requirements for each one. For example, if you add a Windows 11 virtual machine to Unraid, you must meet the minimum requirements for that OS, in addition to those required for Unraid, to maintain functionality.

Virtual Machines, in particular, require that you have a CPU and chipset combination that supports hardware virtualization. In the enterprise space these are usually identified by the Intel VPro® or AMD Ryzen Pro® badge.

:::

For full hardware requirements, visit our [product page](https://unraid.net/product).
