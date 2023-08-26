# USB Flash Drive Preparation

## USB Flash Drives

\-\-\-\-- There is now an USB Creator tool
from Limetech, for both Windows and macOS that users are encouraged to
use. The tool can be found [here.](https://unraid.net/download)

---

\-\-\-\-- Important version note: This document is no longer for
**WINDOWS** users. In general, you should use [Unraid Server
Installation](https://unraid.net/download) instead. With the advent of
the all-in-one releases (as of v4.6 Final), a **make_bootable.bat**
batch installation file is included, that replaces the use of the
**syslinux** utility in preparing the flash drives for booting Unraid.
The instructions below do still work, and are necessary for installing
versions of Unraid earlier than v4.6 Final, and for preparing a flash
drive on a Mac. And there is still value in the advanced troubleshooting
tips below.\>

---

The Unraid Server OS is designed to be installed on, and boot from a USB
Flash storage device, 512MB or larger. Use a high quality Flash drive
from reputable manufacturers such as:

- Lexar
- PNY
- Samsung
- Kingston
- And many more

## Instructions

### Windows XP

**Step 1** Plug the Flash into your PC and re-format it using Windows
(right-click the Flash under **My Computer** and select **Format**):

- For **File system**, select **FAT32**
- For **Volume label**, enter **UNRAID** (exactly 6 capital letters)
- Select **Quick Format** and click **Start**
- For many, the above steps were all that was necessary to format the
  drive. For others, selecting a file system of **FAT** or **FAT16**
  was necessary, and others found that formatting it with the **HP
  Flash Formatter Tool** was required, or even other steps. If you
  determine that the Windows formatting did not succeed in creating a
  bootable USB drive, then see the Advanced tips at the bottom.

**Step 2** Download the **syslinux** tool from the [Lime Tech
download](http://lime-technology.com/download/) page, and extract
**syslinux.exe** to a simple directory, for example, **`c:\`**, and then
run it by clicking on **Start** / **Run**. In the dialog box, enter:

`c:\syslinux.exe -ma f:`

If necessary, change the directory from **`c:\`** to whatever directory
you downloaded **syslinux** to, and change the **`f:`** to use whatever
drive letter that Windows mounted your Flash on.

The **syslinux** tool will create a hidden system file named
**`ldlinux.sys`** on the Flash and make the drive bootable. The latest
version and a complete distribution of **syslinux** is available
[here](http://syslinux.zytor.com/).

**Step 3** Download the latest [Unraid
Server](http://lime-technology.com/download), and extract the files from
the zip archive to your Flash. When extracting the files, make sure that
the option to preserve the folder structure is selected. There is a
**config** folder with initial configuration files, that needs to be
correctly extracted. If done correctly, you should see **bzroot** and
**bzimage** on the flash drive, plus a **config** folder containing
files such as **network.cfg** and **ident.cfg**.

**Step 4** Click on the **Safely Remove Hardware** tool tray icon and
select your Flash drive to be safely removed.

### Windows Vista and Windows 7

**Step 1** Plug the Flash into your PC and re-format it using Windows
(Right-Click the Flash under **Computer** and select **Format**):

- For **File system**, leave it as **Default**
- For **Volume label**, enter **UNRAID** (exactly 6 capital letters)
- Check the **Quick Format** box and click **Start**

If you determine that the Windows formatting did not succeed in creating
a bootable USB drive, then see the Advanced tips at the bottom.

**Step 2** Download the latest [Unraid
Server](http://lime-technology.com/download), and extract the files from
the zip archive to your Flash.

**Step 3** On the Flash drive, Right-Click on **make_bootable.bat** and
select **Run as administrator**. Press any key to continue.

**Step 4** The process takes only a moment to complete. You can then
close any open windows and eject the Flash drive.

### MacOS X

You'll need to download the following:

- [unetbootin](http://unetbootin.sourceforge.net) - installs Unraid on
  your flash drive for you
- [syslinux](http://www.kernel.org/pub/linux/utils/boot/syslinux/) - a
  collection of linux tools that will allow you to make the drive
  bootable
- Unraid - don't unzip it\...

**1. Plug in your USB Flash drive and format it using Disk Utility.**

- Open Disk Utility (Applications -\> Utilities-\> Disk Utility) and
  choose your device from the list on the left - note: In recent
  versions of macOS you will need to select View \> Show All Devices.
  Please make sure to read carefully to know when to select "Device"
  or "Partition"
- Select Partition
- Choose Partition Layout: 1 Partition
- Call it 'UNRAID' (no spaces, all caps)
- Click Options and make sure Master Boot Record is selected
- Click Apply and your disk will format

**2. Verify the new partition**

- Choose the UNRAID partition from the list on the left
- Select First Aid and Verify Disk
- Check the "Show Details" box and get the device path for your
  disk, ex: /dev/disk2s1
- Unmount the **partition** by clicking "Unmount" in the top menu
- leave Disk Utility open, you'll need it again

**3. Make the partition Bootable**

- Open Terminal (Applications -\> Utilities -\> Terminal)
- Now you'll need the raw disk device name.. so if your partition
  device path was /dev/disk2s1, the raw device name is /dev/rdisk2,
  basically you drop the s1 off the end (that's the partition number)
  and add in a r before disk
- Type the following command, substituting `<device>`{=html} for your
  raw deivce name ex: /dev/rdisk2 and press enter

` fdisk -e ``<device> `{=html}

- At the \> prompt type the following and press enter between each

`f 1`\
`write`\
`exit`

Note: if you get an error about the device not being available for
writing, ensure you have Unmounted the partition in Disk Utility

- Unmount the partition again in Disk Utility (the above command will
  cause it to be remounted)
- Unzip/tar your syslinux download (you can leave it in the Downloads
  folder
- cd to that folder in terminal by typing the following (you may need
  to change the version number to match your download)

`cd ~/Downloads/syslinux-4.05/mbr`

- Install the bootable MBR on your flash drive with the following
  command (again substituting `<device>`{=html} for your raw device
  name)

` dd conv=notrunc bs=440 count=1 if=mbr.bin of=``<device> `{=html}

**4. Install Unraid on your prepared Flash Drive**

- Change the extension of your Unraid download from zip to iso
- Open unetbootin (it will need your password)
- Choose Disk Image at the bottom and browse for your Unraid iso
- Choose the device path for your partition (it's probably already
  selected)
- Click OK

Note: if you get an error about overwriting menu.c32, click Yes To All

- When it finishes, you can eject your USB Flash Drive and put it in
  your Unraid server and power it up

I Think this would work with Windows, Linux versions also. So if any one
has Windows or Linux can you try this and write here if it works there
also.

## Booting Unraid Server

Safely remove/eject the Flash from your PC and plug it into your server.
Power up your server and see if it immediately boots (with some
motherboards it will). If it does not boot to the Unraid boot screen
that displays a choice of starting Unraid or Memtest, reboot your server
and enter the BIOS setup. Navigate to the appropriate screen(s) and
select your USB Flash device as the boot device. In some BIOS, the flash
drive may show up in the list of hard disks, and you may have to select
it there. Save your BIOS settings and try to boot the Flash. Be aware
that some motherboards will change the boot order when you add hard
drives, and you will have to return to these same BIOS screens to
re-select your flash drive.

Note: You may need to check
[here](http://www.lime-technology.com/joomla/unraid-os) for more _BIOS
Setup Tips_ and _Other BIOS Suggestions_. For machines with an AMI BIOS,
check
[here](https://forums.unraid.net/forum/index.php?topic=2302.msg17664#msg17664).
For more general BIOS suggestions on getting a machine to boot the USB
flash drive, check
[here](http://www.weethet.nl/english/hardware_bootfromusbstick.php),
near the bottom of the page. Also see
[here](/unraid-os/manual/getting-started/getting-started.md#advanced-bios-configuration-guide)

## If the Flash will not boot, read over the following tips

Unfortunately, some motherboards and BIOS versions are very picky about
the geometry or configuration of the USB flash drive. Some combinations
of motherboard, BIOS, and flash drive do not work, or only work after
more advanced 'modifications'. The following tips are what users have
found to work, in different situations. If one does not work for you,
try another.

- If your flash drive had pre-installed "U3" software, it will need
  to be removed before you format and install Unraid on it. U3
  Un-Install software is available
  [here](http://www.u3.com/uninstall/). A U3 removal tool specific to
  SanDisk drives can be found
  [here](http://u3.sandisk.com/launchpadremoval.htm).

- Some instructions for loading **syslinux** on your flash drive leave
  off the "**-ma**" options of the command. If your flash drive does
  not have a preloaded master boot record and a partition marked as
  "active", then it is unlikely to boot unless you use the **-ma**
  options.

- Try formatting the USB drive as FAT instead of FAT32

- You may need to use the **HP formatting tool** to make your flash
  drive bootable on your BIOS. It sets the Cylinders/Heads/Sector
  geometry of a flash drive to an alternate set of geometry values.
  The alternate geometry will often will make it possible to use your
  flash drive as a boot disk when your BIOS does not work with the
  existing geometry. For more info, see
  [here](https://forums.unraid.net/forum/index.php?topic=359.0) and
  [here](https://forums.unraid.net/forum/index.php?topic=366.0) and
  [here](https://forums.unraid.net/forum/index.php?topic=2703.0).

- Apparently, there is more than one version of the **HP format
  tool**. The version of the **HP USB Format Tool** that works best
  has a file name of **SP27213.exe**. Some have had problems with the
  version named **SP27608.exe**. (eg. Sandisk 16GB Cruzer Contour &
  Amicroe 32GB). HP seems to have removed both from their downloads
  section of their website, but Google **HP SP27213.exe** and you
  should be able to find it easily.

- If it appears as if the flash drive tries to boot, but hangs while
  decompressing the **bzroot** or **bzimage** files on the flash, it
  is possible that either the **bzroot** or **bzimage** file is
  corrupt or incomplete. This could happen if you did not safely eject
  the flash drive, after copying the files to it when it was plugged
  into your PC. The file would only have been partially written to the
  flash drive.

- If it appears as if the flash drive tries to boot, but only gets
  part way before hanging, you may need to add additional options to
  your **syslinux.cfg** file on your flash drive to boot your
  motherboard.

- If it appears as if the flash drive gets part way through the boot
  process but stops when loading **bzroot**, you may need to use the
  latest version of **syslinux** in the
  [downloads](http://lime-technology.com/dnlds) folder at
  Lime-Technology. Use of **syslinux version 3.63** in combination
  with the **-ma** option was the solution in [this
  thread](https://forums.unraid.net/forum/index.php?topic=1176.msg15666#msg15666).
  (After downloading [syslinux
  3.63.zip](http://download.lime-technology.com/syslinux%203.63.zip),
  extract **syslinux.exe** from the zip file.) A number of users
  upgrading from a v4.2 version to a v4.3 version have found that the
  new **syslinux** is necessary, even though their flash drive had
  worked fine with v4.2.

- If it appears as if the flash drive gets part way through the boot
  process but reboots when loading **bzroot**, one user found that he
  fixed it be replacing his graphics card with an older (possibly more
  basic) graphics card.
  [1](https://forums.unraid.net/forum/index.php?topic=4769)

- A user has created another procedure based on the **makebootfat**
  tool. This procedure seems especially useful for newer Intel boards,
  such as boards based on the P965, P35, and P45 chipsets and their G
  variants. See
  [this](https://forums.unraid.net/forum/index.php?topic=2407.0)
  post. It worked when nothing else would, on his Intel P965-based
  board.

- Also see
  [this](https://forums.unraid.net/forum/index.php?topic=922.0)
  thread (uses a Knoppix installation or Live CD), if you have a board
  that will only boot from a flash drive as a USB-ZIP drive. Similar
  instructions, using Ubuntu or similar, can be found here:
  <http://www.pendrivelinux.com/booting-linux-from-usb-zip-on-older-systems/>.

- And last of all, try upgrading the BIOS of your motherboard. A later
  BIOS may have better support for booting from USB.
