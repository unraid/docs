# Using a physical disk in a VM

The steps for creating a VM using a physical disk (including one with an OS already installed) are similar to that of using a virtual disk. However, there are two use cases for which one would be using a physical disk: creating a VM with a physical disk with no OS installed (new install) and one that already has an OS installed (conversion). We will only cover converting from a previous installation as the other should be straightforward enough. You can use a physical disk with any OS but this conversion guide only covers Windows.

## Prerequisites

- A spare USB flash drive
- Acronis Universal Restore (or similar tool):

http://www.acronis.com/redirector/products/atih2016/aur?build=6569&edition=16&gaID=1987015932.2478000884&language=1&winver=10.0

- It is also recommended you back up an image of your drive just in case. I recommend just using dd in the command line. It's very easy to use, just Google it.

## Step 1: Preparing the disk

Moving a hard drive with a Windows installation on it from one machine to another can be problematic and cause blue screens if not prepped prior. This is because of differences in machine hardware. This applies whether or not it is a physical or a virtual machine. As such we need to make changes to the Windows HAL, or hardware abstraction layer. There are a few tools that can accomplish this, including one built into Windows itself called 'sysprep'. However, sysprep is meant more for cloning a disk image across multiple machines and will activate the Windows OOBE (out-of-box experience) upon restoration, requiring things like user account setup and other changes that are undesirable and unnecessary for our situation. As such we will be using a third-party tool by Acronis (Universal Restore). This software has a 30-Day free trial, although there are likely other freeware versions that accomplish the same thing if you have an issue with that.

* Download and install the following: http://www.acronis.com/redirector/products/atih2016/aur?build=6569&edition=16&gaID=1987015932.2478000884&language=1&winver=10.0
* Insert your USB drive, open the program, and follow the onscreen instruction to create a bootable flash drive
  * Select 'Windows-like representation'
  * No Linux kernel parameters
  * Check 32-bit or 64-bit, depending on your hardware (or both just to be sure)
  * Select your USB device
* Once your bootable media has been created reboot your machine and boot into the USB drive
* Just follow the onscreen instructions to apply a universal restore to your existing Windows installation on the drive. It should only take a second or two.
* Shutdown once that is done and boot back into Unraid

## Step 2: Identify the physical disk to be used in the Unraid WebGUI

- Login to your Unraid WebGUI (`http://tower` or `http://tower.local`)
- Click the **Main** tab.
- If the array hasn't been started yet, start it by clicking **Start**.
- Locate your disk device from the **Unassigned Devices** section on the Main tab.
- Under the identification column, notate the disk id by **letter handle** (e.g. sdb, sdc, sdd, sde, ...)

## Step 3: Add a new Virtual Machine from the VMs tab

- Login to your Unraid WebGUI (`http://tower` or `http://tower.local`)
- Click on the **VMs** tab (if the tab isn't visible, you haven't [completed these preparation steps](http://lime-technology.com/wiki/index.php/UnRAID_Manual_6#System_Preparation) or may not meet the hardware requirements; post in [general support](https://forums.unraid.net/forum/index.php?board=71.0) for further assistance)
- Click the **Add VM** button.
- Follow [this guide](#creating-your-own-virtual-machines) to create your VM, making sure to adhere to these specific settings:
  - Leave the **BIOS** setting to SeaBIOS. (If you have trouble starting your VM using SeaBIOS recreate it using OVMF)
  - Leave **OS Install ISO** blank.
  - Be sure to have the **VirtIO Drivers ISO** specified, you will need these in a later step.
  - Select a location and size for the "primary virtual disk". The name and size don't really matter as we will be changing it in the next step. This step isn't really necessary, but it makes it a little easier to edit later.
  - _Uncheck_ the option to **Start VM after creation**

## Step 4: Edit the XML for your virtual machine

- From the VMs tab, click the VM icon and select Edit XML from the context menu.
- Scroll down the XML and locate the the primary virtual disk you assigned. It will look similar to this:

```xml
<disk type='file' device='disk'>
  <driver name='qemu' type='raw' cache='writeback'/>
  <source file='/mnt/cache/vdisk_share/vmname/vdisk1.img'/>
  <backingStore/>
  <target dev='hda' bus='virtio'/>
  <boot order='1'/>
  <alias name='virtio-disk0'/>
  <address type='pci' domain='0x0000' bus='0x00' slot='0x05' function='0x0'/>
</disk>
```

- Replace it with this, where "sdX" is the location of the disk from Step 2:

```xml
<disk type='block' device='disk'>
  <driver name='qemu' type='raw' cache='writeback'/>
  <source dev='/dev/sdX'/>
  <target dev='hdd' bus='sata'/>
</disk>
```

- If your physical disk is IDE and not SATA, replace the bus from "sata" to "ide" and re-evaluate your life choices.
- Click **Update** to update the virtual machine XML.

## Step 5: Installing drivers

- Start your VM
- Once in Windows go to the device manager in the control panel
- If there are any drivers that have errors (a yellow exclamation mark) update them by right-clicking and selecting 'update'
  - Point to the drive where the VirtIO Drivers ISO is located and make sure you check the 'include subfolders' box.
  - Do this for any drivers that have errors
  - If you have a program that installs software drivers, such as some anti-virus programs do, you may need to reinstall those programs

:::tip

Stuck at SeaBIOS with `Booting from Hard Disk`?

If your OS was installed using UEFI (as opposed to traditional VGA BIOS), start over from step 3, but select OVMF as the BIOS type instead of SeaBIOS. Most OS installations install using a traditional VGA BIOS, but it is possible to have a UEFI installation, in which case SeaBIOS will not work. The remainder of the conversion procedure is identical.

:::
