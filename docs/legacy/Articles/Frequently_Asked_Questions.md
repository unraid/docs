# FAQ

# Pre-Sales Questions

## Is Pricing for Unraid OS "one time"? Are There Additional Fees for OS Updates?

Unraid OS license pricing is a one-time fee and updates are included.

## How do I Purchase Unraid?

Unraid OS can be purchased from within the OS via the Tools-\>
Registration page or, in OS version 6.10 and beyond, via the top right
[User Profile Component
(UPC)](My_Servers#Navigating_the_User_Profile_Component "wikilink").

You can also purchase a [license activation code directly from our
website](https://unraid.net/pricing) and redeem the code for a license
later when your server is up and running. The activation code will be on
your receipt.

### How to Redeem a License Activation Code:

First, buy an activation code via [our
website](https://unraid.net/pricing). Your unique activation code will
be on your purchase receipt.

Next, follow our [Getting Started
guide](Articles/Getting_Started "wikilink") to set up an Unraid server.

Once your server is up and running:

1.  Login to your Unraid server's webgui. (http://tower or
    http://tower.local from Mac by default)
2.  For Unraid 6.10 and newer, Sign in to your Unraid.net account (or
    [create one](https://forums.unraid.net/register/)) from the
    [top-right of the
    webgui](My_Servers#Navigating_the_User_Profile_Component "wikilink")
    and select "Redeem Activation Code" and enter the activation code to
    activate your license. For Unraid 6.9 and older, navigate to the
    Tools -\> Registration page in the webGui and click "Purchase Key."
3.  Select the corresponding license you purchased via activation code
    and enter the activation code in the "Your Activation Code" box to
    complete the activation process. Your registration key will be
    emailed to you with instructions for installation! *Note: Activation
    Codes are one-time use for generating your Unraid license keyfile.*

If you have any issues or questions with the above, there is also a walk
through video: [Activation Code Instructional
Video](https://www.loom.com/share/3ceb40440240474aaa80a0b7e3e69cb2)

### [Cómo Canjear un Código de Activación de Licencia en Español](Cómo_Canjear_un_Código_de_Activación_de_Licencia_en_Español "wikilink")

### [购买并收到激活码后如何兑换您的激活码](购买并收到激活码后如何兑换您的激活码 "wikilink")

## How do I Upgrade my Unraid License?

If you want or need to upgrade your license to a higher tier, upgrades
are done from within the OS WebGUI via the Tools → Registration page or
via the top right [User Profile Component
(UPC)](My_Servers#Navigating_the_User_Profile_Component "wikilink"):

![](/docs/legacy/Upgrade-UPC.png "Upgrade-UPC.png")
**Unraid Basic** allows for up to *6 attached storage
devices<sup>1</sup>.*

**Unraid Plus** allows for up to *12 attached storage
devices<sup>1</sup>.*

**Unraid Pro** allows for *unlimited<sup>2</sup> attached storage
devices<sup>1</sup>.*

License upgrades are priced as follows:

Basic license → Plus license: *\$39 USD*

Basic license → Pro license: *\$79 USD*

Plus license → Pro license: *\$49 USD*

<sup>*1*</sup>*Attached storage devices* refer to the total number of
storage devices you are allowed to have attached to the server before
starting the array, not counting the USB Flash boot device. There are
*no other limitations* in the software based on license type.

## What does "Unlimited" mean for trial and Pro licenses?

Unraid OS Pro supports up to 30 storage devices in the parity-protected
array (28 data and 2 parity) and up to 35 named pools, of up to 30
storage devices in the [cache
pool(s)](Manual/Release_Notes/Unraid_OS_6.9.0#Multiple%20Pools "wikilink").
Additional storage devices can still be utilized directly with other
Unraid features such as [Virtual
Machines](Manual/VM_Management "wikilink") or the unassigned devices
plugin.

## What Happens if my USB Fails? Do I Have to Repurchase a License?

If your USB Flash boot device fails, you can [transfer
your](Manual/Changing_The_Flash_Device "wikilink") license to a new USB
Flash device initially at any time, and subsequently using the automated
transfer system once per 12 months.

If you need to make another license transfer before 12 months has
elapsed, [you need to contact us](https://unraid.net/contact) and we
will transfer your license manually. Please provide the old and new USB
GUIDs [with your support ticket.](https://unraid.net/contact)

**IMPORTANT:** Please ensure you routinely back up your USB device! To
do so, [download the My Servers
Plugin](My_Servers#Automated_Flash_Backup "wikilink") via Community Apps
and/or [see this video](https://youtu.be/NEkgAhFI_GM?t=695).

## How do I Manually Install my License keyfile to my USB Flash?

First, ensure you have a recent backup of your USB drive via
Main-\>Flash-\> Flash Backup.

To install the license key manually, first save the key file (.key file)
to a different PC/Mac.

Next:

1.  Shutdown the server, remove the USB flash and install the USB into
    the other computer.
2.  Open the USB folder and drag and drop the .key file into the /config
    folder. Please ensure this is the only .key file present (delete any
    others).
3.  Then, safely eject/remove the flash and reinstall in your server and
    reboot.

Alternately, if your server is running and your flash share is visible
on the network, navigate to the flash share under Network, and drag the
registration key file into the config directory. Next, using the webGUI,
**Stop** the array, and then **Start** the array again.

## Can I Transfer my Trial Key to a New Flash Device?

No. Trial registrations are only valid on the USB flash device that
initiated the trial. If you wish to purchase a license, you can transfer
your Trial configuration to a new flash device and then purchase a
registration key, but you cannot continue using a Trial configuration on
a new USB flash device without purchasing.

## I Need Help with a Build / System Configuration. Where do I go?

For assistance with creating a special build for Unraid OS, we highly
advise users to check out our [Compulsive Design
forum](https://forums.unraid.net/forum/35-unraid-compulsive-design/%7CUnraid).

Our community is fantastic about helping folks create their ultimate
Unraid system.

## Does Unraid Support Hardware-based RAID Controllers?

While some users have been able to use RAID controllers to present
devices to Unraid OS for use, they definitely complicate things when it
comes to features and maintenance. Disk temperatures and even some SMART
values may not come through correctly when presented through a hardware
RAID controller.

Therefore, we only officially support the use of non-RAID controllers
for storage devices. Most RAID storage controllers offer a way to flash
the firmware to convert the card into a basic HBA for devices
(eliminating the RAID entirely), but you'll have to search for your
specific controller to see if that is an option.

## Can I use a HASP Key within a VM on Unraid? How Does that Work with Multiple VMs?

If the HASP key is a USB dongle, then you can assign it to a single
virtual machine at a time. Two VMs cannot be running with concurrent
access to the same key.

In addition, depending on how the device works, you may need to assign
an entire USB controller to the VM for which you want to use the key.
You'll need to test this with a Trial license of our software before
committing to a purchase, because all USB devices can be a bit different
in how they work within a VM.

## I'm a Reseller/OEM that needs to Purchase a License on Behalf of my Customer: How do I do that?

You will need to [purchase a license either via the Unraid
webGui](Articles/Frequently_Asked_Questions#How_do_I_purchase_Unraid.3F "wikilink")
or you can [purchase an activation code via the
website](https://unraid.net/pricing).

At checkout, you will be presented with three options:

- Individual
- Business/Organization
- OEM

Select 'OEM', enter your purchase details, and then enter your customer
name and email address in the Customer section. The purchase will be
made by you but the license key will be in your customer’s name and sent
to them. There will also be an invoice download link upon completion of
the checkout.

For bulk OEM/reseller pricing of 10 licenses or more, [please contact
us](https://unraid.net/contact)!

# Troubleshooting and Support

## My USB Flash Has Failed and I Don't Have a Backup. How do I Restore my Configuration?

First, you'll need to get a new flash device. Remember to get a quality
device from manufacturers such as Kingston, PNY, Lexar, or Samsung.
Second, you'll need to find the e-mail with your registration key for
your previous flash device.

Last, you'll need to install Unraid on the new flash device, boot it up
on your server, and then install the old registration key on the new
flash (from the Tools \> Registration page). From there you can request
and then install a replacement key.

As far as your configuration goes, if you can remember your drive
assignments (which disks were assigned to which slots), you should be
able to simply re-assign them all and start the array.

You may need to reconfigure your shares, users, and other system
settings, but your data should be intact.

If you cannot remember your drive assignments, [please post on the forum
for further assistance (under General
Support)](https://forums.unraid.net/forum/55-general-support/).

## How Do I Extend My Unraid Trial?

Did you know that you can extend the [30 day free
trial](Unraid.net/download "wikilink") of Unraid? Hardware can be
ill-suited. Things break. Life happens. We get it. To try out Unraid a
little longer, once your original trial shows "expired" in the upper
left of the header, *Stop the array*.

Next, go to the Tools-\> *Registration* page, and now a button shows up
where you can click for a 15 day extension. Please remember that you are
only allotted up to two extensions, each for two weeks. No further
extensions can be issued thereafter.

*Note: You cannot change the USB flash device for Unraid Trials if you
wish to continue where you left off.*

## What is an Unraid.net Account?

An [Unraid.net account](https://forums.unraid.net/register/) is the
account you create to use the [Unraid
forums](https://forums.unraid.net/) and the account used to sign in to
your Unraid server's [user profile
component](My_Servers#Navigating_the_User_Profile_Component "wikilink")
and the [My Servers Plugin](My_Servers "wikilink"). This account is *not
the same* as your server's root password that you use to login to the
Unraid webgui.

## What Should I do if I have Forgotten my Root Password?

To reset your [root
password](Articles/Getting_Started#Connecting_to_the_Unraid_webGui "wikilink"):

1.  Shutdown your server.
2.  Plug your USB flash into a laptop or another computer.
3.  Open the USB folder and delete the files "config/shadow" and
    "config/smbpasswd". *(DO NOT delete "config/passwd).* This will
    reset all user passwords, including the root user to blank.
4.  Now, safely eject your USB and reboot it on your Unraid server and
    you’re in. You can then set a new password in the Users tab of the
    Unraid webgui.

*Important: this process only works for user passwords. If you encrypt
your drives and forget this password, unfortunately you are hosed. There
is no way for Lime Technology or anyone to recover this password. Please
remember it or write it down in a secure, locked place!*

## How do I completely start Unraid OS from scratch? How do I wipe my existing configuration / filesystems?

1.  Ensure there is no data on the system that you want or need.
2.  Stop the array and shut down the server.
3.  Remove the USB flash device.
4.  Using a Windows or Mac computer, reformat the flash using the USB
    Flash Creator tool from our website.
5.  Reinstall the flash in the server and boot it up.
6.  Click on the "terminal" icon in the top right corner of the webGui.
7.  From the command line, type: lsblk
8.  Note all the devices present excluding your USB flash device.
9.  Now for each device in the list (excluding the USB flash device),
    type the following command: wipefs /dev/sdX (replacing X with the
    letter of the device from the previous steps). This will remove the
    filesystem from the device so it can be reformatted by Unraid OS.
10. Now continue reconfiguring Unraid OS per the normal procedure.

## Whenever I Shutdown my Windows 10 VM with my AMD GPU Assigned, if I try to restart it, it doesn't work. What do I do?

This is due to issues with many AMD GPUs not supporting function-level
resets. NVIDIA GPUs are recommended as they do not have this problem. A
workaround to this issue is to eject the GPU from the VM before shutting
it down. You can do this from the bottom right corner in Windows where
you would also find any USB devices. Just eject the GPU, then use
another machine to shut down the VM from the Unraid webGui. Then when
you start it again, it shouldn't have any problems.

## How do I passthrough my primary GPU to a VM when my CPU doesn't have an integrated graphics device?

This can be a challenge, but luckily SpaceInvaderOne [has this covered
in a video guide on our
forums!](https://forums.unraid.net/topic/51230-video-guidehow-to-pass-through-an-nvidia-gpu-as-primary-or-only-gpu-in-unraid/)

## What's the best way to add more storage to a system above what the built-in controller supports?

Unraid can easily scale storage across multiple controllers in a system.
The controllers must act as standard HBAs and not actual "RAID"
controllers. Most RAID controllers offer an option to either flash their
firmware or reconfigure the card into a mode to operate this way.

## Does Unraid support various RAID types such as RAID1/5/6/10?

Unraid manages storage in two separate buckets: the array and the cache.
The array itself uses dedicated parity device(s) similar to a MAID.

The array cannot be configured into traditional RAID methods such as
RAID 1/5/6/10.

The cache is created using btrfs. When more than one disk is present,
the cache is called a "pool" and is by default configured to use btrfs
RAID1, which is a slightly different take than a traditional RAID1. The
cache can optionally be configured to use btrfs RAID 5/6/10, but RAID
5/6 on btrfs is still considered unstable, so it isn't recommended for
production use.

## I'm getting an error registering my flash device: '####-####-####-#############' is already registered to another user. What do I do?

The flash device you are trying to use with Unraid OS doesn't have a
unique ID, and therefore is ineligible for registration. Please obtain a
different USB flash device for use with Unraid OS. A few brands that
work best include Lexar, Samsung, Kingston, or PNY.

## My system is crashing but my logs don't contain the event. What do I do to obtain support?

Sometimes a hard system crash can prevent you from obtaining vital
information in the logs that would help better diagnose the issue. In
the event you can't obtain the logs with a remote connection, you'll
have to resort to a local one. Attach at least a monitor and keyboard to
the server and boot it up into non-GUI mode. Once presented with the
login prompt, login as the user 'root' and whatever password you set
when you set up the server (if no password was set, leave it blank and
press enter again). From the command line now, type the following
command:

tail /var/log/syslog -f

This will begin printing the system log to the monitor directly. Now go
about using the server as you normally would. When the crash occurs,
take a picture of what's visible on the monitor and post it in the
support forums. This will hopefully give us some further insight on the
issue.

## Is there any way to disable the br0 bridge?

Absolutely! Simply navigate to the Tools \> Network Settings page to
disable network bridging. Note that this will result in differences in
behavior for virtual machines (including losing the ability to
communicate with the host from a guest).

## How do I enable UEFI boot mode if I configured my flash device using the manual method?

Simply remove the dash symbol from the EFI folder on the root of the
flash drive and then make sure your motherboard BIOS is configured to
boot UEFI.

## How do I determine what registration type (Basic, Plus, or Pro) I have?

Simple! Navigate to the Tools \> Registration page and you can review
your current key type and registration information.

## I'm having problems passing through my RTX-class GPU to a virtual machine

Posting in the forums for assistance is always recommended when
troubleshooting a VM / pass through problem, but there is something
worth noting about these newer devices that is unique compared to
previous series cards. These GPUs feature a USB controller built into
the GPU. This is quite fortunate as it can be used with a USB hub to
then act as a device your Windows VM can interact with more naturally
(such as supporting hot plugging USB devices). However, it is
recommended that you stub this device to ensure it's driver isn't loaded
with Unraid OS. To stub the device, perform the following steps:

1\. Locate your IOMMU group containing your GPU and its other devices on
the Tools \> System Devices page.

2\. Notate the vendor and product IDs indicated in the brackets.
Example:

\[10de:1f08\] 02:00.0 VGA compatible controller: NVIDIA Corporation
Device 1f08 (rev a1)

\[10de:10f9\] 02:00.1 Audio device: NVIDIA Corporation Device 10f9 (rev
a1)

**\[10de:1ada\]** 02.00.2 USB controller: NVIDIA Corporation Device 1ada
(rev a1)

**\[10de:1adb\]** 03:00.3 Serial bus controller \[0c80\]: NVIDIA
Corporation Device 1adb (rev a1)

3\. Navigate to the flash device settings page (on the Main tab).

4\. Click on the flash device.

5\. Edit the Syslinux configuration by adding the following to the
append line on the boot mode selected:
vfio-pci.ids=\[####:####\],\[####:####\]. Example:

append vfio-pci.ids=10de:1ada,10de:1adb initrd=/bzroot,/bzroot-gui

6\. Apply the change and reboot your server.

7\. Edit or create your VM and you will now see these additional PCI
devices available to assign to your VM without manually editing your
XML.

## Does Unraid have a allocation feature that remembers bad sectors on drives to prevent writes to them?

Hard drives and SSDs use SMART data to keep track of bad sectors and
prevent writes. This is native functionality of the underlying hardware.
That said, if a device is showing a large amount of bad sectors /
reallocated sectors, replacing it soon may be a good idea. If you're not
sure, try posting in our General Support forum including the SMART data
for the drive in question and our community can help determine what to
do.

## I currently have an array of devices that are formatted with an MBR-style partition table and I want to convert to GPT. How do I do that?

Any device 2TB or smaller uses MBR-style partition table.

Any device larger then 2TB uses GPT-style partition table.

For Unraid OS version 6.8.x and earlier:

` Starting position of partition 1 for any storage device is 32KiB from start of device (regardless of whether MBR or GPT).`

Starting with Unraid OS 6.9:

` Default starting position of partition 1 for rotational devices is 32KiB from start of device (regardless of whether MBR or GPT).`

` Default starting position of partition 1 for non-rotational devices is 1MiB from start of device (regardless of whether MBR or GPT)`

Presuming user has valid parity and he wants to preserve data:

Must first swap out and rebuild Parity. Swap out each data device and
rebuild one-by-one.

For this kind of upgrade, we recommend starting in “Maintenance mode”
each time to perform the swap and rebuilds. This will ensure the devices
are not written during the process. At the end of the process, the
original storage device should be intact.

Also highly recommend downloading flash backup: Main/Flash/Flash Backup