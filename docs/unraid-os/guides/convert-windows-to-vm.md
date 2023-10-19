# Convert a physical install to VM

This guide aims to explain the steps required to convert a physical Linux or Windows computer to a VM, and use it in Unraid.

Steps 1-3 apply for almost any modern Linux-based guest. Steps 4-6 apply for Windows-based guests.

## Prerequisites

- Your system must meet the hardware requirements and complete these preparation steps before utilizing virtual machines on Unraid Server OS 6.
- You must have enough disk space available on a single storage device in your array (total free space in the cache pool) that is equal to or greater in size than the physical disk you wish to convert.
- It is highly encouraged to make a complete backup of your most important files before attempting a conversion.

## Step 1: Identify the disk to be converted using the Unraid WebGUI

- With the array stopped, attach the physical disk you wish to convert to your server (SATA and power)
- Login to your Unraid WebGUI (`http://tower` or `http://tower.local`)
- Click the **Main** tab.
- If the array hasn't been started yet, start it by clicking **Start**.
- Locate your disk device from the **Unassigned Devices** section on the Main tab.
- Under the identification column, notate the disk id by **letter handle** (e.g. sdb, sdc, sdd, sde, ...)
- Also make note of the **size**, as you will need at least this much space free on an available array device or the cache (pool) to create your new virtual disk.

## Step 2: Add a new Virtual Machine from the VMs tab

- Login to your Unraid WebGUI (`http://tower` or `http://tower.local`)
- Click on the **VMs** tab (if the tab isn't visible, you haven't [completed these preparation steps](http://lime-technology.com/wiki/index.php/UnRAID_Manual_6#System_Preparation) or may not meet the hardware requirements; post in [general support](https://forums.unraid.net/forum/index.php?board=71.0) for further assistance)
- Click the **Add VM** button.
- Follow [this guide](#creating-your-own-virtual-machines) to create your VM, making sure to adhere to these specific settings:
  - Leave the **BIOS** setting to SeaBIOS.
  - Leave **OS Install ISO** blank.
  - Be sure to have the **VirtIO Drivers ISO** specified, you will need these in a later step.
  - Make the **primary virtual disk** large enough for the physical disk you are copying.
  - _If converting a disk containing a Windows OS_
    - Add a **second virtual disk** by clicking the green plus symbol
    - Make the size of this second virtual disk **1M**.
    - _Uncheck_ the option to **Start VM after creation**

## Step 3: Convert disk to image

- Utilizing a telnet or SSH capable client, connect to your Unraid system over a Local Area Network. The default username is root and there is no password by default.
- Enter the following command to begin the conversion of your physical disk to a virtual image:

```shell
qemu-img convert -p -O raw /dev/sdX /mnt/user/vdisk_share/vmname/vdisk1.img
```

- Replace **sdX** with the device letter handle you noted in step 1, replace **vdisk_share** with the share you created to store your virtual disks, and replace **vmname** with the name you gave it when you created it in step 2.
- The **-p** tag will output progress in the form of a percentage while the conversion is occurring.

## Step 4: Edit the XML for your virtual machine (Windows Guests Only)

- From the VMs tab, click the VM icon and select Edit XML from the context menu.
- Scroll down the XML and locate the `<target>` tag for the `<disk>` with a `<source>` file set to vdisk1.img, which will look like such:

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

- Adjust vdisk1.img by changing the **bus** attribute to the `<target>` tag to **ide**.
- Delete the entire `<address>` line for that `<disk>`.
- Corrected XML example below:

```xml
<disk type='file' device='disk'>
  <driver name='qemu' type='raw' cache='writeback'/>
  <source file='/mnt/cache/vdisk_share/vmname/vdisk1.img'/>
  <backingStore/>
  <target dev='hda' bus='ide'/>
  <boot order='1'/>
</disk>
```

- Click **Update** to update the virtual machine XML.

## Step 5: Install the VirtIO drivers from inside the VM (Windows Guests Only)

- Using **Windows File Explorer**, navigate to the VirtIO virtual CD-ROM to browse its contents.
  - Navigate inside the **Balloon** folder.
  - Navigate to the subfolder named after your **Windows OS version** (e.g. w8.1)
  - Navigate to the **amd64** subfolder
  - Right-click on the **balloon.inf** file inside and click Install from the context menu (you may need to enable viewing of file extensions to do this)
- Repeat the above process for each of the following folders:
  - **NetKVM**
  - **vioserial**
  - **viostor**
- When done installing drivers, navigate inside the virtual cd-rom one more time and open the **guest-agent** folder.
- Double-click on **qemu-ga-x64.msi** to install the QEMU/KVM guest agent.

## Step 6: Remove the secondary vdisk from your VM (Windows Guests Only)

- **Shutdown** your VM if it isn't already.
- From the **VMs** tab, click the VM icon and select **Edit** from the context menu.
- Remove the vdisk2.img virtual disk by clicking the red minus symbol.
- Click **Update** to update the VM.
- Start your newly converted virtual machine!

:::tip

If you are stuck at SeaBIOS with "Booting from Hard Disk"

If your OS was installed using UEFI (as opposed to traditional VGA BIOS), start over from step 3, but select OVMF as the BIOS type instead of SeaBIOS. Most OS installations install using a traditional VGA BIOS, but it is possible to have a UEFI installation, in which case SeaBIOS will not work. The remainder of the conversion procedure is identical.

:::
