
   **Important Warning! This wiki page has not
    been updated for v6! Some information is
    out-of-date!**

------------------------------------------------------------------------

## Introduction

unRAID is a file server system, based upon the Slackware distribution of
Linux.

unRAID allows you to build an 'array' of hard drives and share those
drives across the local network for all users to access the files on
those drives. In order to help combat physical drive failure, unRAID
allows for the inclusion of a parity drive, which is used to contain
parity bit information for all of the other data drives. This
information can be used to rebuild the data on any drive if it has to be
replaced (either for an upgrade or because it died).

The benefits of unRAID versus other systems such as FreeNAS are:

- Ability to have different sized drives in the array (RAID normally
    requires you to have all drives in the system be of the same
    physical size)
- Ability to dynamically add drives to the array as they are
    acquired - most RAID arrays are very sensitive to "growing" the
    array and the operation typically involves a full backup before
    attempting to grow the array. If you've got 5 TB of data, this
    likely isn't something you're going to attempt!
- Non-striping of the data or parity - normally, the data and parity
    information in a RAID is striped across the disks, meaning portions
    of each file are stored on various drives. In unRAID, files are
    stored contiguously on a single drive. This means that if there is a
    catastrophic problem (e.g. multiple drives fail), you can likely
    retrieve the information from a single disk.

Of course there are some drawbacks to unRAID:

- Some limitations in hardware support - see the [Hardware
    Compatibility](Hardware_Compatibility "wikilink") page
- It's not free (for more than 3 drives) or open source
- Since the data is not "striped" across multiple drives, read
    performance is limited to the speed of the individual drive. In most
    RAID implementations, data can be read much faster than an
    individual drive's performance because various drives are accessed
    simultaneously, thus aggregating the read performance.

== Hardware ==

:   *Main article: [Designing an unRAID
    server](Designing_an_unRAID_server "wikilink") - general issues to
    consider when choosing hardware components*
:   *Main article: [Hardware
    Compatibility](Hardware_Compatibility "wikilink") - for up-to-date
    hardware recommendations*

- CPU: Basically anything. Single core CPUs are fine, though
    multi-core CPUs can be useful for certain unRAID add-ons.
- Memory (RAM): Minimum 512 MB, but 1-2 GB is recommended. 4+ GB is
    recommended for certain unRAID add-ons.
- Video card: Use the onboard video if possible, if not, then look for
    the cheapest card you can get off eBay, preferably a PCI-based video
    card (you will want to save your faster PCIe ports for SATA
    controller cards).
- Hard drives: either PATA or SATA drives of your choice. Remember
    though, that the largest will be used for parity, and those old
    drives you've got laying around probably will die as soon as you
    put something important on them! SATA drives will be faster and also
    will be easier to route cables since their cables are much smaller.
    Also remember that they tend to take different power supply
    connections, so plan accordingly (do you need adapters?).
- Motherboard: You will need a newer motherboard that allows you to
    boot from a USB stick. Some of the oldest boards do not. Look for
    one with at least 6 SATA ports, Gigabit Ethernet (GigE), and onboard
    video. You will need to be careful here if you choose something
    else, to make sure that the onboard devices are supported. Support
    for these has increased with each unRAID release, but it still boils
    down to:
- Onboard SATA: Intel ICHx, nVidia nForce, AMD or ATI SB600+, possibly
    some VIA chipsets? (and a couple more I'm sure)
- Onboard LAN (preferably gigabit only): Intel, Marvell, some VIA
    (slow) and Realtek
- PCI or PCIe SATA Cards: The Promise TX4 is the most widely trusted
    PCI SATA controller card, but it is slow by today's standards.
    Avoid using the PCI bus at all if possible. Look for a SATA
    controller card that uses PCIe. Note that PCI-X is different from
    PCIe. You will not be able to use PCI-X unless your motherboard
    specifically supports it.
- USB Memory Stick: at least 512 MB, though 1-2 GB is cheap and
    readily available.
- Power Supply (PSU): If you're going to be building a server that's
    powered on for long periods, and that has a lot of hard drives, then
    you will need a good quality power supply, so don't skimp on this
    part! Look for a power supply that has a single 12+ volt rail and
    that is 80plus efficient or better. Also make sure that your PSU is
    compatible with your motherboard, since some motherboards require 8
    pin power cables instead of the standard 4 pin power cables.
    Reputable brands are Corsair, Seasonic, and Antec Earthwatts.
- Case: Almost any case will do for a small array. Bigger arrays will
    need more thought. You will need to think about ventilation. Hard
    drives get hot and they are very susceptible to heat (most are rated
    to 55*C). There are 5-in-3 drive cages and backplanes that allow
    for 5 hard drives to be placed into 3 5.25" drive bays. Consider
    potential heat issues with drives that close together (though many
    backplanes have dedicated fans), and also the extra expense of these
    drive cages. Fans and airflow are very important. Please see the
    [UnRAID Topical Index, Fans](UnRAID_Topical_Index#Fans "wikilink")
    section.

== Assembly==

Fitting the components together is usually straightforward, and requires
little prior knowledge or experience. A typical assembly would involve
the following steps:

1. Take the sides off the case.
2. Attach the power supply inside the case. Some users recommend that
    this is done upside down, so that the fan opening is inside the
    case.
3. Install the 9 standoff screws to the 'floor' of the case. Look at
    the motherboard to identify where to place them -- they need to
    correspond with the motherboard holes that have a 'star' pattern of
    solder.
4. Put the metal backing panel into the case. This makes the
    keyboard/mouse/USB/network/etc ports look pretty, and blocks a
    source of air leaks that may make it hard to get good airflow
    through the server.
5. With the motherboard outside of the case, install the processor.
    Lift the arm on the socket, align the processor and gently place it
    in (align the pins - one corner doesn't have a pin, so make those
    match. Close the socket with the arm and latch it.
6. Align the CPU heat sink and attach to the socket. Heat sinks are
    often supplied with thermal paste already applied, so there is no
    need to add separately. However if it is NOT already applied, you
    MUST apply it yourself! NEVER use a CPU and heat sink without
    thermal paste or thermal pad.
7. Install the RAM.
8. Drop the motherboard into the case and attach with nine rounded head
    screws. Tighten the screws in a star pattern, little by little -- do
    not completely tighten one screw before putting in any others.
9. Connect the rear fan and processor fan to the motherboard.
10. Connect the front panel cables to their respective connectors on the
    motherboard. These wires are small and don't lock into place.
    Certain plugs are mandatory -- PWR (power switch) and RST (reset
    switch), for example. Other plugs, such as PWR_LED and HDD_LED, are
    optional, although PWR_LED will be useful, showing when the server
    is on. unRAID does not make use of audio ports, so plugging in the
    front panel audio is also optional.
11. Connect the power cables to the motherboard. Two are usually
    required: one big fat one (24 or 20 pin) and small one (4 or 8 pin).
12. Attach a power cable to each SATA hard drive.
13. Connect SATA cables from the motherboard to the drives.
14. Connect to the network.
15. Connect a monitor and keyboard (usually required only for the first
    boot).

==Prepare the USB Flash drive== *Formatting the USB Flash drive and
installing the unRAID distribution files on it*

:   *Main article: [USB Flash Drive
    Preparation](USB_Flash_Drive_Preparation "wikilink")*
:   *Main section:
    [Instructions](USB_Flash_Drive_Preparation#Instructions "wikilink")*
:   *Troubleshooting section: [If the Flash will not
    boot\...](USB_Flash_Drive_Preparation#If_the_Flash_will_not_boot.2C_read_over_the_following_tips "wikilink")*

On any Windows or Linux PC:

- Insert the memory stick and format it using FAT or FAT32, and enter
    **UNRAID** as the label.
- Get syslinux.exe from <http://www.lime-technology.com/dnlds/>
- Run **syslinux -ma x:** (where x: is the drive letter for your
    memory stick) **Note for Vista and Windows 7 users: To run it,
    right-click the file and choose 'Run as administrator'**
- Download the distribution you want from
    <http://www.lime-technology.com/dnlds/> and extract all the files to
    the memory stick, preserving the folder structure (there should be a
    *config* folder with files in it)
- Set the volume name of the memory stick to **UNRAID** (if you forgot
    in the first step above)
- Safely eject the memory stick from your computer
- Many users have had problems with these seemingly simple steps,
    because unfortunately, there are numerous compatibility issues
    between various motherboards and flash drives. The [USB Flash Drive
    Preparation](USB_Flash_Drive_Preparation "wikilink") page is a
    comprehensive guide to USB flash preparation, with many tips and
    alternative steps to try.

==Starting the server== *Verifying the BIOS settings, the memory, and
the networking*

:   *Main article: [USB Flash Drive
    Preparation](USB_Flash_Drive_Preparation "wikilink")*
:   *Main section: [Booting unRAID
    Server](USB_Flash_Drive_Preparation#Booting_unRAID_Server "wikilink")*

1. Before plugging in the USB Flash drive, boot the machine and enter
    the BIOS settings screens, sometimes known as the CMOS settings.
    This is often done by pressing the \<Del\> or \<Delete\> key during
    the early part of the boot process, but may instead require the
    `<F2>`{=html} key, or the `<F1>`{=html} key, or the `<F10>`{=html}
    key, or some other key or combination of keys. Please check your
    motherboard manual.
2. Check that all of the drives are recognized by the BIOS and/or add
    on controllers. However there are exceptions where some drives and
    controllers won't appear in the BIOS, but will still be available
    to unRAID later in the boot process.
3. Power down the server, install the USB stick, reboot, and again go
    into the BIOS settings.
4. Configure the BIOS so that the motherboard uses the USB Flash drive
    as the boot device. The option is often labeled as 'USB-HDD' or
    'forced FDD', but there are other choices that may also work.
5. Confirm that you can boot from the USB stick - you should get a boot
    menu with at least 2 choices, **unRAID** and **memtest**.
6. Boot into **memtest** and let it run for 2 complete cycles. Later
    you might want to come back and run it overnight, but 2 cycles
    should give you pretty good confidence that you don't have any
    memory errors.
7. Press the \<Esc\> key to reboot, and this time let unRAID start.

You will first see a command line prompt on the monitor. Type **root**
and press the `<Enter>`{=html} key, no password will be needed.
''(Later, you may want to set a root password on the **Users** tab of
the unRAID Web Management pages.)

Verify that you have an IP address by typing **ifconfig** and pressing
the `<Enter>`{=html} key. You should get an output similar to this:

`eth0      Link encap:Ethernet  HWaddr 00:1A:4D:27:13:8A`\
``**`inet addr:10.0.1.57`**`Bcast:10.0.255.255  Mask:255.255.0.0`\
`UP BROADCAST NOTRAILERS RUNNING MULTICAST  MTU:1500  Metric:1`\
`RX packets:16261 errors:0 dropped:0 overruns:0 frame:0`\
`TX packets:2850 errors:0 dropped:0 overruns:0 carrier:0`\
`collisions:0 txqueuelen:1000`\
`RX bytes:1067783 (1.0 MiB)  TX bytes:1193253 (1.1 MiB)`\
`Interrupt:21 Base address:0xa000`\
``\
`lo        Link encap:Local Loopback`\
`inet addr:127.0.0.1  Mask:255.0.0.0`\
`UP LOOPBACK RUNNING  MTU:16436  Metric:1`\
`RX packets:0 errors:0 dropped:0 overruns:0 frame:0`\
`TX packets:0 errors:0 dropped:0 overruns:0 carrier:0`\
`collisions:0 txqueuelen:0`\
`RX bytes:0 (0.0 b)  TX bytes:0 (0.0 b)`

On a computer that is on the same network, open a browser and go to:

:   **<http://tower>**

This should take you to the unRAID Web Management 'Main' page, where
almost all unRAID setup and management of your server is handled.

If you are using a Mac, you may initially need to use your server's IP
address instead of 'tower'. For further instruction, please see the
[FAQ, Apple Mac Questions](FAQ#Apple_Mac_Questions "wikilink") section.

==Configuring and starting the array== *Preparing the drives and setting
up the array*

1. Go to **<http://tower>**
2. From the **Main** Page, select **Devices** from the menu.
3. In your Disk devices, verify that all the hard drives are showing
    up, by clicking on any of the drive dropdown boxes. If not, then you
    either have connected them to an unsupported device, or you forgot
    to connect them, or there is a loose connection in the power or data
    cables.
4. The parity drive must be the largest, or equal to the largest data
    drive. You can assign it now, or do it later.
5. Assign the other drives to be data disks, in whatever order you
    wish, and to whatever slot you decide.
6. Go back to the Main screen and Start the array. If you have assigned
    the parity drive, then a parity sync will start.
7. Copy your data from your workstations / existing servers to the data
    disks.
8. If you have assigned the parity drive, then run a manual parity
    check - make sure it completes with 0 sync errors.
9. Run smartctl on each drive to make sure that no serious errors have
    developed.

There are two optional but recommended steps that may alter this order:

- Before Step 1, install the
    [Preclear](http://lime-technology.com/forum/index.php?topic=2817.0)
    script and run it on each of your drives. (Several of these can be
    run in parallel, as these tests take time). This script really runs
    the drives through their paces, and if they have any SMART errors
    they will likely be detected before you assign them to your array.
    For more information, see the [#Preclear
    Disk](UnRAID_Add_Ons#Preclear_Disk "wikilink") addon.

- If you have a lot of data to transfer over, you can copy it faster
    if the parity drive has not been installed yet. But make sure you
    install and build parity before you delete backups of anything you
    transfer to the array.

== Shares ==

By default, unRAID creates a share for each disk in the array (eg.
\\\\tower\\disk1, \\\\tower\\disk2, etc). However, unRAID also supports
the concept of User Shares. You can create folders in each of the disk
shares, and then a user folder will "aggregate" all of the content
from each share into one share with that folder name. So, if you have
\\\\tower\\disk1\\DVD and \\\\tower\\disk2\\DVD, a user share can be
created for \\\\tower\\DVD. To turn on user shares, go to the Shares
menu item. Select an option from the User Shares dropdown. If you want
the shares to be read-only, select "Export read-only."

== Security ==

You can set passwords for "root" and any other user you define. You
can limit specific shares to specific users, and restrict specific users
from write permission while granting write permission to others. This is
all configured per share on the Share page. Basic "root" security is
available on all versions of unRAID, but User Security is only available
with an unRAID Plus or Pro license. All security settings can be changed
on the Security page. To delete a user, delete the user's name and
password and press Save.

== Helpful Info ==

You can [Telnet](Telnet "wikilink") into the server, either using the
built in [Telnet](Telnet "wikilink") app or
[PuTTY](Telnet#PuTTY "wikilink") (a free download). Once you Telnet in
(or use the console on the server), you can run important Linux commands
such as:

- **top**: similar to the task manager in Windows, press q to exit
- **df -h**: tells you how much space is left on your drives
- **shutdown -h now**: tells the system to shut down in an unclean
    way, right now **(not recommended!)**
- **shutdown -r now**: tells the system to reboot in an unclean way,
    right now **(not recommended!)**
- **ifconfig**: tells the IP configuration (similar to ipconfig in
    windows)
- **tail -n \# `<file>`{=html}**: display the last \# lines of
    `<file>`{=html}
- **ls**: similar to **dir** in DOS
- **du -s `<directory>`{=html}**: how big a certain directory is
- **mount**: shows you the mounted file systems
- **smbmount //server/share directory**: mount a Windows (or Samba)
    share to the given directory \-- this is useful for copying files
    from one server to the other (will be faster than copying in Windows
    Explorer)
- There are more console commands listed on the
    [Console](Console "wikilink") wiki page, and much more about
    consoles and using Linux in the [unRAID Console and Addon
    Questions](FAQ#unRAID_Console_and_Addon_Questions "wikilink")
    section of the [FAQ](FAQ "wikilink").

[Category: Getting started](Category:_Getting_started "wikilink")
[Category: How To](Category:_How_To "wikilink")
