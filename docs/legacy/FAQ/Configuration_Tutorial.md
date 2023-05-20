\

------------------------------------------------------------------------

***`<font color=red>`{=html}IMPORTANT NOTE to unRAID v6 users! The
majority of this tutorial was written for unRAID v4. Parts have been
updated for v6, but much of it assumes a 32 bit system on v4. DO NOT
INSTALL any packages listed here! Parts of this page may be useful for
recommendations and advice, but use with care! Unless otherwise
specified, all packages and steps are deprecated.`</font>`{=html}***

:   Check out the [Upgrading to UnRAID
    v6](Upgrading_to_UnRAID_v6 "wikilink") guide, beginning with the
    *Research and decision making* section.

```{=html}
<!-- -->
```

:   If you update a section of this *Configuration Tutorial* for unRAID
    v6, please make a note next to the header link. *Be cautious though,
    as headers may be linked from elsewhere, so if you change a header,
    it will break external links. It's better to add a note immediately
    below the header.*

------------------------------------------------------------------------

\
\
\

## Introduction

This guide is intended to get you from a completed and working flash
drive to a usable array.

`Note: written for version 4.5.6`\
`valid for version 4.6`\
`valid for version 4.7`

`Note: These instructions assume the use of a Windows computer,`\
`but if you don't have access to one, the instructions are`\
`basically the same for Linux or Unix-based operating systems.`

The following assumptions are made:

- You have 'installed' unRAID to your flash drive. If you have not,
    please see the [Official installation
    guide](http://www.lime-technology.com/support/unraid-server-installation)
    and do so now.
- You are familiar with (or will become familiar with) [using terminal
    sessions with SSH or Telnet or the server
    console](Terminal_Access "wikilink").
- You know what a command prompt is and how to access it.
- You have a **basic** understanding of computer networking concepts.
    You don't need to be a network administrator, but if you don't
    know what an IP address is you should spend some time on google!

If you are unclear about any of those, read the linked articles/guides,
perform your own research, and ask questions in the
[Forums](http://lime-technology.com/forum/index.php).

## Pre Boot

`Note: If you are in a hurry you may skip copying the`*`preclear_disk.sh`*\
`and the`*`unmenu_install`*`scripts to your flash drive.  The preclear`\
`script is used to test your disks and prepare them for the unRAID`\
`environment.  The merits of preclearing are discussed in this`\
``[`forum post`](http://lime-technology.com/forum/index.php?topic=2817)`.`\
\
`The`*`unmenu_install`*`script is used to install`[`UnMENU`](UnRAID_Add_Ons#UnMENU "wikilink")`which`\
`will allow the installation of Screen.  Installing screen will allow`\
`you to start a process (such as a preclear) in a telnet session, then`\
`disconnect the telnet session and allow the process to continue.  If`\
`you do not mind keeping a telnet session open for potentially days or`\
`you run commands directly from the console, skipping`[`UnMENU`](UnRAID_Add_Ons#UnMENU "wikilink")`and Screen`\
`is OK.`\
\
`Installing UnMENU will also allow configuration of the environment to`\
`allow the preclear script to send email notifications of its status.`

Before booting your unRAID system you need to copy a few files to your
flash drive. The *preclear_disk.sh* script will enable you to prep your
disks for the array and the *unmenu_install* script will install
[UnMENU](UnRAID_Add_Ons#UnMENU "wikilink").

**Step 1** From a non unRAID system download the *preclear_disk.sh*
script from this [forum
post](http://lime-technology.com/forum/index.php?topic=2817).

- The download is at the bottom of the first post
- You must be logged into the forum to see the file

Unzip the file and copy *preclear_disk.sh* to the root of your flash
drive.

**Step 2** Download the *unmenu_install* script from the [Google Code
website](http://code.google.com/p/unraid-unmenu/downloads/list) and
unzip the file on your PC. Create a folder named *unmenu* in the root of
your flash drive. Copy *unmenu_install* to the *unmenu* folder on your
flash drive.

## First Boot

Now that you have the required files on your flash drive, use it to boot
your UnRAID system. When the system has been booted you will be greeted
with a prompt similar to

`Welcome to Linux 2.6.32.9-unRAID (tty1)`\
`Tower login:`

Type root and press enter to log into the system. The prompt should
change to

`root@Tower:~#`

which is hereafter referred to as *the prompt*.

### Verifying Network Connectivity

To verify that your UnRAID system is connected to the network, at the
prompt type enter

`ifconfig eth0`

This will present quite a bit of information, however, the only line we
are interested in is the one containing

`inet addr:192.168.1.123`

The IP address (numbers) after *inet addr* will almost certainly be
different, but anything that has 192.168.x.x or 10.x.x.x means your
UnRAID server received an IP address from a DHCP server and is connected
to the network and is ready to go. If there is nothing after *inet addr*
make sure your network cable is connected, and you have a router or
other DHCP server on your network. If you do not have a DHCP server you
need to set your network settings manually. Note your IP address now,
you may need it shortly, and skip to the next section, or continue to
the next section to set a static IP address.

### Setting a static IP address

If you do not have a DHCP server on your network, you must manually set
an IP address for your UnRAID server. By default, the only two text
editors installed with UnRAID are "vi" and "mcedit." If you are not
**already** familiar with "vi" it is suggested you use "mcedit" as
it is much easier for a beginner. If you wish, the editing can be done
on your windows PC instead. To do that, shutdown the UnRAID server by
typing

`shutdown -h now`

at the prompt and pressing *enter*.

**Note: the "shutdown -h" command DOES NOT cleanly stop the array. If
you type this on an array with a configured parity drive it will force a
full parity calculation when you reboot.**

Then remove the flash drive and open the network configuration file on
another computer using Notepad or another text editor you are familiar
with. To open the network configuration file with mcedit, at the prompt
type

`mcedit /boot/config/network.cfg`

If using [PuTTY](Terminal_Access#PuTTY "wikilink") as your telnet client
program on your PC, the function keys and mouse will work in "mcedit"
If not using "putty", you can use The Escape key followed by the
number 1 through 0 to simulate function keys 1 through 10. You will need
to use function key F2 to save your edited file, and F10 to quit the
editor. (or Escape 2, Escape 0)

To open the network configuration file with vi, at the prompt type

`vi /boot/config/network.cfg`

To open the network configuration file on a separate computer it will be
located at

`D:\config\network.cfg`

Replace D: with whatever drive letter the flash drive is mounted as and
open the file with a text editor.

By default the file will contain:

`USE_DHCP=yes`\
`IPADDR=`\
`NETMASK=`\
`GATEWAY=`

This should be changed to reflect your environment. A typical
configuration could be

`USE_DHCP=no`\
`IPADDR=192.168.1.150`\
`NETMASK=255.255.255.0`\
`GATEWAY=192.168.1.1`

- USE_DHCP should be set to no
- IPADDR should be set to an unused IP address that is in the same
    subnet as your other computers.
- NETMASK is network dependent, but in most cases will be
    255.255.255.0 or 255.0.0.0. Check the network settings on an
    existing computer on your network if you are unsure.
- GATEWAY is the default gateway to the internet on your network.
    Again, network dependent. Check the settings on an existing computer
    if you are unsure what to use for your environment. This may be left
    blank, but that will prevent the UnRAID server from passing traffic
    outside the subnet in which it resides

To enable these settings save the file and restart the UnRAID server. If
you used vi or mcedit to edit the file, after exiting the editor execute

`shutdown -r now`

to reboot the system.

If you edited the file on another computer. Remove the flash drive and
re-attach it to the unRAID server and power it back up.

### Verifying SATA Hard Drives are Detected

`Note: This section assumes all SATA hard drives!`\
``**`If you are using older hardware,`\
`or have the disk controller configured in a legacy compatible mode (emulating an IDE disk controller)`\
`these messages will not exist.`**

To verify that your SATA hard drives are detected as SATA devices, at
the prompt type

`dmesg|grep SATA|grep link`

You should get a listing of each SATA controller, its link status, and
its speed. The output will look similar to

`ata1: SATA link up 3.0 Gbps (SStatus 123 SControl 300)`\
`ata2: SATA link up 3.0 Gbps (SStatus 123 SControl 300)`\
`ata3: SATA link up 3.0 Gbps (SStatus 123 SControl 300)`\
`ata4: SATA link down (SStatus 0 SControl 300)`\
`ata5: SATA link up 3.0 Gbps (SStatus 123 SControl 300)`\
`ata6: SATA link up 3.0 Gbps (SStatus 123 SControl 300)`

In this example there are 6 SATA controllers with 5 drives connected at
3.0 Gbps. Make sure your output matches your hardware *ie* if you have 5
drives connected, make sure you see 5 drives here and the link speeds
are correct.

## Configuration With the Server Management Utility

Now that you have verified your UnRAID server can see the network and
its hard drives are connected correctly it's time to log into the web
interface and continue setup.\
\
Using another system that is connected to your network, open a web
browser and in the address bar type

`//tower`

This should take you to the server management page. If it does not try
entering

`//IP_ADDRESS`

where IP_ADDRESS is the IP address you noted earlier. If you are having
trouble connecting, there are more details available in the
[Troubleshooting Guide](Troubleshooting#Name_Resolution "wikilink").\
\
Once you have connected to your server, navigate to the settings page by
clicking *settings* in the navigation bar at the top of the server
management page.

### Identification

- Server Name - This is the name that your server will be known as on
    the network. It must be a unique name not in use on your network.
  - Set yours to whatever makes you happy.
- Comments - The comments entered here will show up next to the server
    name under My Network Places.
  - Again, whatever makes you happy.
- Share security - this is the security model used to control access
    to the server.
  - Leave as Simple for now. Security will be covered later in the
        tutorial.
- Workgroup - This is the Windows Workgroup your server will belong
    to.
  - Set this to the same Workgroup that your Windows computers
        belong to.
- Local master - If set to yes UnRAID will attempt to become the local
    browse master
  - Probably un-necessary on a small, single subnet network. Set to
        No unless you have problems browsing to your server
  - More information from
        [Wikipedia](http://en.wikipedia.org/wiki/Domain_Master_Browser)
        and from [Microsoft](http://support.microsoft.com/kb/188001)

If you have made any changes to these settings click apply. If you
changed the server name and were connected to the Server Management
Utility using //tower you may need to type //NEW_SERVER_NAME to
re-connect.

### Network Settings

- Obtain IP Address Automatically - When set to yes the server will
    obtain an IP address from a DHCP server on the network. This has the
    benefit of set it and forget it but the IP address may change
    between reboots.
  - Set to yes unless you know you need to assign a static IP
        address to your server.
- IP Address - Set a static IP address for the server. Not available
    unless Obtain IP Address Automatically is set to No.
  - Set as appropriate for your network.
- Netmask - Subnet information. Not available unless Obtain IP Address
    Automatically is set to No.
  - Set as appropriate for your network.
- Gateway - Default gateway/router. Not available unless Obtain IP
    Address Automatically is set to No.
  - Set as appropriate for your network.
- Obtain DNS Server Address - Get DNS servers from DHCP or not.
  - If you have Obtain IP Address Automatically set to yes, you
        probably want this set to yes as well. If not you need to
        manually assign your DNS servers.
- DNS Server 1..3 - You can assign up to 3 DNS servers for name
    resolution. Not available unless Obtain DNS Server Address is set to
    No.

If you have made any changes to these settings click apply. If you
changed the IP address you will need to reconnect to your server using
the new IP address. If you are using Windows and were connected using
//tower (or a new name if changed) open a command prompt and type

`ipconfig /flushdns`\
`nbtstat -R`

to clear the resolver cache and force the computer to re-query the
network for the new name.

### Date and time

- Time zone - Sets the time zone for the server.
  - Set as appropriate for your location.
- Use NTP - Use network time protocol to set the server time based on
    a remote time server.
  - Highly recommended to set this to yes.
- NTP Server 1..3 - You can configure UnRAID to use specific time
    servers. These options are only available if Use NTP is set to Yes.
  - The default pool.ntp.org is recommended.
  - More information from
        [Wikipedia](http://en.wikipedia.org/wiki/Network_Time_Protocol)
        and [NTP Project Pool](http://www.pool.ntp.org)
- Current date & time - Set the current date and time.
  - If Use NTP is set to Yes, this is irrelevant and NTP will set
        everything.
  - IF you are not using NTP you need to set your time and date here
        in UTC time (FIX ME IF I'M WRONG!!!!!)

If you made any changes here, click Apply. One thing I noticed was that
the time did not update and display correctly until after I rebooted the
server so if things don't look quite right, wait until after the next
reboot to panic.

### Disk Settings

- Default spin down delay - Set the amount of time without activity to
    wait before spinning down disks to save power.
  - Tweak as appropriate for your environment. If set too short you
        will find yourself waiting for disk spinups. If set too long you
        will waste power.
- Force NCQ disabled - Disable native command queuing.
  - Recommend leaving this as yes.
  - Disable NCQ on all disk devices that support NCQ. This typically
        results in much better write throughput. A setting called
        "Force NCQ disabled [yes/no]" is also available in the Disk
        section of the Settings page of the System Management Utility to
        override this new behavior. That is, if this setting is 'yes',
        then we force NCQ off; if setting is 'no', we leave NCQ
        queue_depth as-is, ie, whatever linux driver sets it to.
        [Source](http://lime-technology.com/forum/index.php?topic=3764.0)
- Enable spinup groups - Allow disks to be spun up/down in appropriate
    groups.
  - Recommend leaving this as yes.
  - Good information available
        [here](http://lime-technology.com/forum/index.php?topic=4782.0;wap2).

If you made any changes here, click Apply. At this point it is
recommended that you reboot the server. To do so, click Main then click
the reboot button to restart the server.

## Install UnMENU for Screen and Email Notifications

***In unRAID v6, most of the facilities offered by UnMENU are now part
of the standard Web GUI, so you may well decide that you no longer need
UnMENU. In particular, email notifications are a standard feature of
unRAID v6.***

It is not required to install UnMENU, screen, and email notifications.
You may skip all or part(s) of this step if you are in a hurry and do
not mind running the *preclear_disk.sh* from the console of the UnRAID
server or leaving a [Telnet](Telnet "wikilink") session open for an
extended period.\
Once you have installed unMENU, it is highly recommended to install
Powerdown. Sometimes the GUI will become unresponsive which renders you
without a possibility to cleanly power down the server. This script will
bypass the GUI and facilitate a clean shutdown. For unRAID v6, install
the
[**Powerdown**](http://lime-technology.com/forum/index.php?topic=31735)
plugin. For earlier versions, install the
[<http://lime-technology.com/forum/index.php?topic=6078.msg261527#msg261527>\|
clean powerdown script] in the same way as
[screen](Configuration_Tutorial#Install_Screen "wikilink") is installed
below.

### Install UnMENU

[UnMENU](UnRAID_Add_Ons#UnMENU "wikilink") is an enhanced Web management
page for unRAID that provides a number of user-requested features, and
is relatively easy to extend. Installing it now gives you access to
screen and email notifications, both of which are useful for preclearing
hard drives.

`Note: This step assumes you have the`*`unmenu_install`*`script on`\
`your flash drive.  See the`[`Pre Boot`](Configuration_Tutorial#Pre_Boot "wikilink")`section for details`\
`if you do not.`

`Note: For this step your server must have access to the internet to`\
`download some files.  It is`**`NOT`**`recommended that you connect`\
`your UnRAID server directly to the internet as it is not secure.`\
\
`You should connect your unRAID server to a router that in turn is`\
`connected to the internet.  To be able to download files you must`\
`have both a DNS server and a Gateway defined on the unRAID`\
`web-management settings page.  Typically both will be set to the`\
`local IP address of your router.`

**Step 1** Log into your UnRAID server as root via a
[Telnet](Telnet "wikilink") connection or at the console.

**Step 2** At the prompt type

`cd /boot/unmenu`

**Step 3** At the prompt type

`./unmenu_install  -i -d /boot/unmenu`

The script will download the files needed and place them in the
appropriate location.\
\
**Step 4** To start UnMENU, at the prompt type

`./uu`

You will be dumped right back to a prompt, this is normal.\
\
**Step 5** To enable UnMENU to run on reboot, at the prompt type

`echo "/boot/unmenu/uu" >> /boot/config/go`

### Install Screen

***Note: For unRAID v6, install the
[NerdPack](http://lime-technology.com/forum/index.php?topic=37541)
plugin, NOT the following package! Skip this section.***

**Step 1** [Install
UnMENU](Configuration_Tutorial#Install_UnMENU "wikilink") if it is not
already installed.

**Step 2** From another computer on the network open a web browser and
navigate to

`//tower:8080`

*Substitute your server's name or IP address for tower.*\
\
**Step 3** At the top of the screen select *Pkg Manager*.

**Step 4** Scroll down (close to the bottom) and click *Select
screen-4.03-i486-1.tgz*.

**Step 5** Click *Download screen-4.03-i486-1.tgz*. The status will
change to "Package downloaded, but not yet installed".

**Step 6** Click *Install screen-4.03-i486-1.tgz*. You will see a report
of the commands run and the status will change to
"screen-4.0.3-i486-1.tgz is now installed".

**Step 7** Click *Enable Re-Install on Re-Boot* so screen will be
re-installed on every reboot.

### Configure SMTP Settings (unRaid v6)

Go to main unRaid GUI \> Settings \> Notification Settings. Scroll down
to "SMTP Settings" enter settings there.

If you haven't already, you need to turn on access to SMTP in Gmail
[instructions](https://support.google.com/mail/troubleshooter/1668960?hl=en&rd=2)

Here are settings that work with Gmail

![](/docs/legacy/Unraid_gmail_settings.png "Unraid_gmail_settings.png"){width="300"}

gmail with TLS

sending email: <myname@gmail.com>

email recipient: <myname@gmail.com>

Priority in Header: yes

Email subject: unraid status

mail server: smtp.gmail.com

mail server port: 587

User SSL/TLS: Yes

Define TLS Cert: No

TLS Cert: blank

Auth Method: Login

username: <myname@gmail.com>

password: mypassword

## Install Screen without using UnMENU

It is also possible to easily install screen without first installing
UnMENU by downloading the slackware packages required and following the
steps below:

- Get the *screen* and *utempter* packages from the [Slackware
    packages site](http://packages.slackware.com/). If you are intending
    to use *screen* with unRAID v5 then you need the *Slackware 13.37*
    versions (which are 32-bit) and for unRAID v6 you need the
    *Slackaware64 Current* versions (which are 64-bit versions).

```{=html}
<!-- -->
```

- Copy these files onto your USB drive. The easiest way to do this is
    to copy them to the *Flash* share over the network. The *Flash*
    share is available by default (although it is possible to disable it
    via the unRAID GUI settings for the Boot device). The recommended
    place to put them is in an *extra* folder (creating it if it does
    not exist).

```{=html}
<!-- -->
```

- If you put the downloaded package files in the *extra* folder as
    recommended then these packages will be automatically installed by
    unRAID every time the server is booted.

```{=html}
<!-- -->
```

- You can also install the packages manually from a telnet session. It
    can be convenient to do this when you have just downloaded the
    packages to avoid the need for a server reboot. It is also the way
    to go if you do not want the screen package to always be
    automatically loaded and want to do it yourself manually as
    required. The manual install is done by using a command of the form:

`installpkg`*`name_of_package_file`*

## Install Screen on unRAID V6. + as a plugin

Screen is now available as a standard plugin on the forum
[HERE](http://lime-technology.com/forum/index.php?topic=37541.0)

## Preclear Hard Drives

Preclearing is a process for carrying out confidence checks on drives,
and speeding up adding new drives to an existing parity protected array.

If you intend to preclear a drive then [install your new
drive](Add_One_or_More_New_Data_Drives "wikilink")(s), but do not assign
the drive(s) to the array. Preclearing is optional, but
[recommended](http://lime-technology.com/forum/index.php?topic=2817) and
has a number of important benefits.

- It provides a good stress test of new drives. This significantly
    reduces the chance of a new drive failing when first used with
    unRAID. New drives can have a significant early life failure rate
    (known as *infant mortality*) and this helps identify such drives.
- If you add a new data drive to an existing parity protected array,
    then unRAID takes the array offline while the drive is cleared. This
    can take a long time with large drives. The preclear process allows
    this to be done before you add the drive to the array, and on
    completion it writes a special 'signature' to the drive that
    unRAID recognizes as meaning it can skip the clear phase when adding
    the drive to the array.

Preclearing takes a [long
time](User_Benchmarks#Preclear_Times "wikilink"). If you can afford the
time then to have maximum confidence in the integrity of a drive it is
recommended that you should run [three preclear
cycles](http://lime-technology.com/forum/index.php?topic=12616.0) on new
drives. One or two passes on previously precleared drives (another
system, or moving drives around) should be fine. JoeL wrote the
[preclear
script](http://lime-technology.com/forum/index.php?topic=2817).

sdX drives are SATA and SCSI. hdX drives are IDE.

### Preclearing via Web GUI with unRAID v6

unRAID v6 has the [preclear
plugin](http://lime-technology.com/forum/index.php?topic=39985.0) that
allows you to do the preclear from the standard unRAID Web GUI without
the need to resort to using the Linux command line. This is the
recommended way to do this in v6 systems.

If you prefer to use the Linux command line then that option can still
be used.

### Preclearing With Screen

This is the preferred method if you are using a telnet session. The
reason is that if you are running pre-clear via a telnet session then if
the telnet window gets closed before the pre-clear finishes then the
pre-clear is aborted. Since a pre-clear on large disks can take days to
complete then having a session accidentally aborted and having to start
again is not something that one wants to have to do. If you are running
pre-clear under screen then the pre-clear is NOT aborted if the telnet
window closes, and you can later rec-connect via telnet to find out how
the pre-clear has progressed.

**Step 1** Open a telnet session to your UnRAID server and login as
root.

**Step 2** To navigate to the preclear script, at the prompt type

`cd /boot`

**Step 3** At the prompt type

`screen`

Depending on the version of Screen installed, an information screen may
show up. If you see

`bash: screen: command not found`

you need to [install
screen](Configuration_Tutorial#Install_Screen "wikilink")

If you see

`Cannot find terminfo entry for 'vt100'`

it indicates your telnet client's emulation is not compatible with
screen. Try a different emulation type or use Putty, which works well
with screen.

If you invoke screen and it shows an introductory page, press Space or
Return to continue and you will be returned to the prompt. Now that you
are running inside a "Screen" you can create multiple prompts and even
disconnect from your telnet session and processes will continue to run
in the background.

If you get Screen running, or get no errors, move to Step 4.

**Step 4** Identify the drive to be pre-cleared. Run this command (from
the /boot dir)

`preclear_disk.sh -l`

The -l is a L as in LIST. The output will look like this:

     preclear_disk.sh -l
    ====================================1.13
     Disks not assigned to the unRAID array
      (potential candidates for clearing)
    ========================================
         /dev/sda = ata-ST3000DM001-1CH166_W1F293RJ

Make a note of the /dev/sdX or /dev/hdX. This is the drive you're going
to be clearing.

**Step 5** To begin the preclear on a drive, at the prompt type

`./preclear_disk.sh -A /dev/sdX`

If you wish to run multiple cycles of the preclear script on the drive
to exercise it,type

`./preclear_disk.sh -A -c 3 /dev/sdX`

where sdX is the device mapping of the drive you want to preclear, and 3
is the number of cycles you want to run.

`Note: If you have only SATA drives and see a /dev/hdX device it`\
`indicates you have set your motherboard BIOS to have it`\
`emulate an older IDE drive to the operating system.  This`\
`is NOT desired for SATA drives since they will not be`\
`able to use any of their more advanced features.  You`\
`instead want ACHI mode, not legacy mode.`

`Note: If you are pre-clearing a WD EARS drive that has had a jumper installed to electrically`\
`add one to a sector when accessed, then use the "-a" option to the preclear script`\
`rather than the "-A" option.   This is ONLY for that one specific make/model drive`\
`and ONLY IF it has a jumper added.`\
`For ALL other drives, or the WD EARS without a jumper, use the "-A" option.`

If you are pre-clearing multiple drives it is recommended you also use
the optional "-r" "-w" and "-b" options. These set the size and
number of blocks of data read and written to the disks during
processing. Although not needed when clearing a single drive, If you do
not use these options the preclear script may run out of memory when
concurrently processing multiple large drives. Suggested values are

`preclear_disk.sh -r 65536 -w 65536 -b 2000 -A /dev/sdX`

"-r NNNNNN" sets the size of the read blocks, "-w NNNNNN" sets the
size of the written blocks, and "-b NNNNN" sets the number of blocks
read in each operation.

If you installed [mail and
ssmtp](Configuration_Tutorial#Install_and_Configure_Mail_and_SSMTP "wikilink")
and wish to have email notifications of the process, instead of the
above type

`./preclear_disk.sh -A -M 4 /dev/sdX`*`("root" email address)`*``**`or`**\
`./preclear_disk.sh -A -m your@emailaddress.com /dev/sdX`*`(optional email address)`*

Put your email address and sdX is the device mapping of the drive you
want to preclear. If this is an IDE device it will be hdX.

`Note: if you do not supply either a "-a" or "-A" option, the preclear_disk.sh script will use the setting`\
`you've elected in the unRAID "settings" screen as its default partition type.   It is recommended you set this to MBR-4k-aligned.`\
`-a will override the default and create an MBR-un-aligned partition starting on sector 63.`\
`-A will override the default and create an MBR-4k-aligned partition starting on sector 64.`\
`Neither option is recognized for disks > 2.2TB.  They will always be 4k-aligned using a GPT partition.`\
`If the -a or -A option is given on a drive over 2.2TB, it is silently ignored and no harm is done.`\
`Disks over 2.2TB will also have a "protective" partition starting on sector 1 added to the MBR`\
`to be compatible older programs and utilities and show they are entirely allocated.`

This will present you with a screen similar to

`Pre-Clear unRAID Disk`\
`########################################################################`\
`Device Model:     WDC WD20EARS-00J2GB0`\
`Serial Number:    WD-WCAYYXXXXXXX`\
`Firmware Version: 80.00A80`\
`User Capacity:    2,000,398,934,016 bytes`\
\
`Disk /dev/sde: 2000.3 GB, 2000398934016 bytes`\
`255 heads, 63 sectors/track, 243201 cylinders, total 3907029168 sectors`\
`Units = sectors of 1 * 512 = 512 bytes`\
`Disk identifier: 0x00000000`\
\
`Device Boot      Start         End      Blocks   Id  System`\
`/dev/sde1              63  3907029167  1953514552+   0  Empty`\
`Partition 1 does not end on cylinder boundary.`\
`########################################################################`\
`Are you absolutely sure you want to clear this drive?`\
`(Answer Yes to continue. Capital 'Y', lower case 'es'):`

Double check to make sure the Drive model and/or serial number are what
you expect. If everything is copacetic type "Yes" and press enter like
the box tells you too. When you do, ***EVERYTHING**'' on the drive
will be***DELETED**''.

The screen will clear when you respond with 'Yes' and be replaced with
one showing progress and automatically updating at regular intervals.
This will allow you to track the progress of the clearing of the drive.

**Step 6** You can preclear multiple drives at once using multiple
Screen sessions. Once you've gotten the first drive preclearing, start
up the next one by pushing

`CTRL-A c`

That translates to hold down the *Control* key and press the *A* key.
Release both keys then press the *c* key. This creates a new screen
inside Screen and gives you a new prompt. Start the preclear for this
drive just like the preclear for the first one. You can create a new
screen for each preclear you need to run, however, it is not recommended
to run more than 4 at once.

**Step 7** Now that the preclears are running to cycle through them and
check on their status press

`CTRL-A n`

This will take you to the *next* screen and will loop back to the
beginning when you reach the end. To go to the *previous* screen press

`CTRL-A p`

It will loop back to the end when you reach the beginning. You can keep
your telnet session open to keep tabs on the progress and if you
accidentally get disconnected the processes will remain running. You can
also manually disconnect from your session by typing

`CTRL-A d`

you will be returned to the prompt with a message that screen has
detached. At this point you can terminate your telnet session. At a
later time you can establish a new telnet session and reattach to Screen
to check on the status of your preclears.

**Step 8** To reattach to the Screen, log in via telnet or on the system
console as *root*. At the prompt type

`screen -r`

This will take you to your first screen and you can cycle through as
noted above.

**Step 9** When your preclears have finished there will be a message on
the screen that the drive either successfully passed or failed the
preclear process as well as a *diff* of the pre and post SMART reports.
There is some information in this [forum
post](http://lime-technology.com/forum/index.php?topic=2817.msg53327#msg53327)
on how to interpret the results of the diff. Also if you have questions
about your result the appropriate place to ask them is in
[this](http://lime-technology.com/forum/index.php?topic=4068.0) thread.
See below for instructions on saving the results.

Specifically look for increases of the "raw" count of re-allocated
sectors and sectors pending re-allocation. Most of the other "raw"
values are meaningful only to the manufacturer of the disk drive.

If your diff report is long some of it may have scrolled off the screen.
To see it press

`CTRL-A [`

You will get a notice at the bottom of the screen that you are in copy
mode. Now you can use the *Page up* and *Page down* keys to scroll up
and down and view the results. Press *Esc* to exit copy mode.

**Step 10** As your drives finish preclearing, you can close their
screens by pressing

`CTRL-D`

to logout of that screen. or you can simply type

`exit`

You will then be taken to the next or the previous screen in the buffer.
When the last drive finishes and you close its screen you will get a
message that screen is terminating. At this point it is recommended that
you save your preclear results for future reference or so you can post
them to the forum if you have any questions regarding the results.

**Step 11** The preclear results are automatically saved for you in the
/boot/preclear_reports directory. Each disk successfully pre-cleared
will have three files, the SMART report at the beginning of the process,
a SMART report at the end of the process, and a summary report comparing
the two to make it easier to see and interpret the differences. These
files can be easily attached to a forum post if you are unsure of how to
interpret the results.

`To save your results as a single MS-Dos text file, at the prompt type`\
`grep preclear /var/log/syslog | todos >> /boot/preclear_results.txt`

This will save all the relevant lines from the syslog to the
preclear_results.txt file on your flash drive. You can then copy this
file to another computer and peruse your results or post them to the
forum.

### Preclearing Without Screen

Don't preclear without screen.

If you did not install screen, you can preclear your hard drives from
the console. Linux provides 6 Virtual Terminals (V-Terms) that you can
use from the console. It is possible to run a preclear in a telnet
instance, however it is not recommended because if your session is
interrupted, the preclear process will be terminated. If you wish to
take that risk, you can substitute each Vterm with a new telnet session.

**Step 1** Log in to your UnRAID server as root at the console

**Step 2** To navigate to the preclear script, at the prompt type

`cd /boot`

`Note: If you are preclearing any AF drives, be sure to use the -A option`\
`when you invoke the preclear script.  i.e replace`\
``*`./preclear_script.sh /dev/sdX`*`with`*`./preclear_script.sh`**`-A`**`/dev/sdX`*

`Note: Drives greater than 2.2TB in size automatically use a GPT partition that`\
`is always aligned on a 4k boundary.  The "-a" and "-A" options on the`\
`preclear script are ignored on those drives > 2.2TB as those options`\
`only apply to drives <= 2.2TB.`

**Step 3** To begin the preclear on the 1st drive, at the prompt type

`./preclear_disk.sh /dev/sdX`

where sdX is the device mapping of the drive you want to preclear. If
this is an IDE device it will be hdX.

If you installed [mail and
ssmtp](Configuration_Tutorial#Install_and_Configure_Mail_and_SSMTP "wikilink")
and wish to have email notifications of the process, instead of the
above type

`./preclear_disk.sh -m your@emailaddress.com -M4 /dev/sdX`

Put your email address in and substitute for sdX the device mapping of
the drive you want to preclear. If this is an IDE device it will be hdX.

This will present you with a screen similar to

`Pre-Clear unRAID Disk`\
`########################################################################`\
`Device Model:     WDC WD20EARS-00J2GB0`\
`Serial Number:    WD-WCAYYXXXXXXX`\
`Firmware Version: 80.00A80`\
`User Capacity:    2,000,398,934,016 bytes`\
\
`Disk /dev/sde: 2000.3 GB, 2000398934016 bytes`\
`255 heads, 63 sectors/track, 243201 cylinders, total 3907029168 sectors`\
`Units = sectors of 1 * 512 = 512 bytes`\
`Disk identifier: 0x00000000`\
\
`Device Boot      Start         End      Blocks   Id  System`\
`/dev/sde1              63  3907029167  1953514552+   0  Empty`\
`Partition 1 does not end on cylinder boundary.`\
`########################################################################`\
`Are you absolutely sure you want to clear this drive?`\
`(Answer Yes to continue. Capital 'Y', lower case 'es'):`

Double check to make sure the Drive model and/or serial number are what
you expect. If everything is copacetic type "Yes" and press enter like
the box tells you too. When you do, ***EVERYTHING**'' on the drive
will be***DELETED**''.

**Step 4** Now that the first preclear is running, to start the next one
press

`ALT-F2`

to go to Vterm 2. You can repeat steps 1-3 to start the preclear on the
next hard drive. To get to Vterm 3 press

`ALT-F3`

You can use this to access 6 Vterms by using *F1-F6*. The preclear
script in each Vterm runs independently and you can keep an eye on the
process of each one by switching back and forth with *Alt-Fx*.

**Step 5** When your preclears have finished there will be a message on
the screen that the drive either successfully passed or failed the
preclear process as well as a *diff* of the pre and post SMART reports.
There is some information in this [forum
post](http://lime-technology.com/forum/index.php?topic=2817.msg53327#msg53327)
on how to interpret the results of the diff. Also if you have questions
about your result the appropriate place to ask them is in
[this](http://lime-technology.com/forum/index.php?topic=4068.0) thread.
See below for instructions on saving the results.\
If your diff report is long some of it may have scrolled off the screen.
To "scroll up" to see it you can use *Shift-Page up* and *Shift-Page
down* to scroll around in the buffer.

**Step 6** As your drives finish preclearing, you can close their Vterms
by pressing

`CTRL-D`

to logout of that Terminal or by typing

`exit`

at the linux prompt. At this point it is recommended that you save your
preclear results for future reference or so you can post them to the
forum if you have any questions regarding the results.

**Step 7** After all preclears have finished to save your results, at
the prompt on Vterm 1 (*Alt-F1*) type

`grep preclear /var/log/syslog | todos >> /boot/preclear_results.txt`

This will save all the relevant lines from the syslog to the
preclear_results.txt file on your flash drive. You can then copy this
file to another computer and peruse your results or post them to the
forum.

## Add Drives to the Array

Adding drives to the array is simply a matter of telling UnRAID which
drive to place where during initial setup. Later as you add drives to
the array after enabling a parity drive, each drive must have zeros
written to every sector before the drive is accepted into the array.
UnRAID will perform this process; however, the array will be taken
offline for the entire process which can take quite awhile. ( 20 hours
or more for a 2TB drive ) To prevent this, you can run the
*preclear_disk.sh* script on a new drive before you add it to the array
and UnRAID will recognize that the drive already has zeros written to
every sector and will only take the array offline long enough to perform
a format which only takes a minute or two.

**`<font color=red>`{=html}Disks that do not have unRAID compatible
partitions will be re-partitioned immediately upon assignment to the
array. (In other words, do not assign disks from other OS with data you
wish to retain)`</font>`{=html}**

`Note: The parity disk`**`must`**`be as large or larger than the largest data drive.`\
`Remember to leave one of the largest drives free to use as a parity drive.`

**Step 1** On another computer (not your unRAID system) open a web
browser and navigate to the [Server Management
Utility](Un-Official_UnRAID_Manual#Connecting_To_the_Server_Management_Utility "wikilink").
Then click on *Devices*.

**Step 2** Click the drop down box next to *disk1 device* and select a
disk to assign to this position.

**Step 3** Repeat this process for each disk that you want to add to the
array as a data storage disk and add them under *disk2 device*, *disk3
device*, etc.

`Note: At this point you have to choose whether to add your parity drive now or later.`\
`If you wait to add a parity drive later, copying initial data to the array`\
`will be much faster, but the data will not be protected from a single disk`\
`failure.  If you do add a parity drive, you will be protected from a single`\
`disk failure from this point forward, but writes to the array will be much`\
`slower due to parity calculations. If you add a parity drive now an initial`\
`parity calculation will begin when you start the array.`

**Step 4** To add a parity drive, click the drop down box next to
*parity device* and select a disk to be used for parity. To assign a
parity drive later, leave the *parity device* unassigned.

`Note: If you intend to work with shares, you may first want to enable them prior`\
`to starting the array since enabling shares requires the array to be`\
`in an offline state.  Otherwise, you will either have to stop the array (and`\
`potentially a parity rebuild) to enable shares.  Note that once user shares are`\
`enabled, you can create shares while the array is online.`

**Step 5** After all drives have been added to the array click *Main* on
the navigation bar at the top of the page, then click *Start* to start
the array.

When initially adding a parity drive to an array, a parity sync must be
performed. For an array containing a large amount of data, this can be a
time-consuming process, and the array's performance may degraded during
the entire sync as the process involves reading every sector of the data
drives and writing the entire parity drive. You may use the array during
this initial parity calculation.

**Step 6** Before you can use the array you must format any data drives
you have assigned to the array. After you start the array any newly
added data drives will show as **Unformatted** on the web-management
interface. There will also be a **Format** button on the bottom third of
the screen. You must press it to format the newly added data drives
before you can use them to store your data. You do that by pressing the
**Format** button. `<font color=red>`{=html}Note: if any drives show as
unformatted, but are known to have already been formatted, and already
hold your unRAID data, do not press the Format button. Seek guidance on
the unRAID forum.`</font>`{=html}

Formatting typically only takes a few minutes per drive if they have
been
[pre-cleared](Configuration_Tutorial#Preclearing_With_Screen "wikilink").
If the data disks are not pre-cleared, and you've already assigned a
parity drive, unRAID will proceed to clear the new data drives prior to
formatting them. This can take 8 or more hours ([maybe 25
hours\...](User_Benchmarks#Preclear_Times "wikilink")) for a 2TB drive.
During this time the unRAID array will be off-line and unavailable for
use. (It is one reason why pre-clearing is so popular. It permits unRAID
to skip this lengthy clearing process prior to formatting)

After the initial parity calculation is complete, it is highly
recommended to perform a manual parity *check*. This is to test you can
read the parity data just written to the parity disk. To perform a
manual parity check click on the *Check* button on the main
web-management page at

`//tower`

in your browser. The process of initially calculating parity or checking
parity will run at a speed somewhere between 10MB/s and 100MB/s. (Older
PCI based motherboards with large numbers of drives will likely be under
15MB/s. Newer SATA PCIe based systems will get between 60 and 100MB/s.)
The speed will be faster on outer cylinders of the disk drives, and
slower on the inner cylinders, therefore, expect the speed to slow down
over time.

At this point skip over the next section and configure your User shares,
but be sure to come back to it if you are waiting until your array is
populated to add the parity drive.

### Adding a Parity Drive to an Existing Array

When adding a parity drive to an un-protected array, a parity sync must
be performed. For an array containing a large amount of data this can be
a time consuming process and the array's performance will degraded
during the entire sync as the process involves reading every sector of
the data drives and writing the entire parity drive. You may use the
array during this initial parity calculation.

**Step 1** Stop the array.

**Step 2** Click Devices.

**Step 3** Select the drive to be used for parity from the drop down
menu next to *parity device*.

**Step 4** Click main, place a check in the box next to *I'm sure I
want to do this*, and then click *Start*.

**Step 5** Click refresh after a few moments to see the status. This
will give you the statistics of the Parity-Sync along with an estimated
finish time.

After the initial parity calculation is complete, it is highly
recommended to perform a manual parity *check*. This is to test you can
read the parity data just written to the parity disk. To perform a
manual parity check click on the *Check* button on the main
web-management page at

`//tower`

in your browser. The process of initially calculating parity or checking
parity will run at a speed somewhere between 10MB/s and 100MB/s. (Older
PCI based motherboards with large numbers of drives will likely be under
15MB/s. Newer SATA PCIe based systems will get between 60 and 100MB/s.)
The speed will be faster on outer cylinders of the disk drives, and
slower on the inner cylinders, therefore, expect the speed to slow down
over time.

You can copy data to either configured shares or disk shares during the
parity rebuild process. Parity will be updated on the fly for new files
that are written to the array. It's important to note, however, that
until the parity rebuild process is complete, data existing on the array
is not protected.

## Create User Shares

Shares are the primary, and coolest method of accessing data stored on
the UnRAID server. This abstracts your data from specific drive mappings
and allows easy access to your data on the network in a simple manner.
No matter what mish-mash of hard drives you have in your server,
enabling and using Shares makes it seem that you simply have one giant
drive available in your Network Neighborhood. More details on user
shares are available in the [Un-official
Manual](Un-Official_UnRAID_Manual#Shares "wikilink"). Some users choose
not to use User Shares and if that is your preferred method, leave User
Shares disabled and access your data using only the *disk1..diskn*
mappings configured in the [Export Settings
Configuration](Configuration_Tutorial#Export_Settings "wikilink") below.

### Enable User Shares

**Step 1** On another computer (not your UnRAID system) open a web
browser and navigate to the [Server Management
Utility](Un-Official_UnRAID_Manual#Connecting_To_the_Server_Management_Utility "wikilink").
Then click on *Main* and stop the array if it is already started.

**Step 2** Click *Shares*, set *User Shares* to enabled, then click
apply.

**Step 3** Click *Main*, then click *Start* to start the array.

**Step 4** Click *Shares* to edit the shares properties.

### Share Export Modes

Each share can be set to one of five different SMB export modes.
[SMB](http://en.wikipedia.org/wiki/Server_Message_Block) is the type of
share used in most Windows networks.

- Don't export
  - The share will not be visible or accessible on the network.
- Export read only
  - The share will be visible on the network (shown in My Network
        Places) and data can be read, but not written to the share.
- Export read/write
  - The share will be visible on the network (shown in My Network
        Places) and data can be read and written to the share.
- Export read only, hidden
  - The share will *not* be visible on the network (will not appear
        My Network Places) and data can be read, but not written to the
        share.
- Export read/write, hidden
  - The share will *not* be visible on the network (will not appear
        My Network Places) and data can be read and written to the
        share.

`Note: Setting shares to hidden is`**`NOT`**`a security measure, only a privacy measure.`\
`It prevents Nosy Nellies from noticing your data, but does not protect it in any`\
`way.`

Shares will be accessed by concatenating the server name with the share
name. A share called *foo* on the server *Tower* would be accessed at

`\\Tower\foo`

regardless if foo is exported as hidden or not. unRAID is capable of
providing
[NFS](http://en.wikipedia.org/wiki/Network_File_System_%28protocol%29)
shares; however they will not be covered in this tutorial. See [the
FAQ](FAQ#How_do_I_configure_NFS_mounts.3F "wikilink") for more
information on using NFS.

### Export Settings

Set the following properties as appropriate for your environment.

- Flash share (SMB)
  - Shares the UnRAID flash drive on the network as *flash*.
- Disk shares (SMB)
  - Shares each disk in the array as *disk1*, *disk2*, etc.

Click the *Apply* button in the *Export settings* frame.

### User shares

As previously mentioned, shares are the way UnRAID abstracts your data
from the underlying file system. When a share named *foo* is created,
the files and folders stored in *foo* can be spread across multiple
disks yet all be accessible at a single share point *ie
\\\\Tower\\\\foo*. While this is great from a usability standpoint,
putting some thought into the User share settings can help avoid a few
pitfalls later.

`Note: For now, linking explanations to the Un-Official Manual.  This section needs a re-write!`

Set the following options as appropriate for the share and click
*Apply*.

- Share name
  - This is the name of the share.
  - It must be unique to the server.
  - Valid characters are a-z, A-Z, 0-9, - (dash), and . (dot)
- Comments
  - (Optional) Comments will appear in the comment field of a share
        in *My Network Places*.
- [Allocation
    method](Un-Official_UnRAID_Manual#Allocation_method "wikilink")
  - Used to determine where to store data as it is copied to the
        share.
- Min free space
  - The minimum free space in kilobytes that must be available on a
        drive for files to be copied to the drive. This link may help in
        setting the correct value:
        <http://www.aqua-calc.com/convert/data/Gigabyte-to-Kilobyte>
- [Split level](Un-Official_UnRAID_Manual#Split_level "wikilink")
  - Controls at what level UnRAID will allow data to be split among
        multiple disks.
- [Included
    disk(s)](Un-Official_UnRAID_Manual#Included_disk.28s.29 "wikilink")
  - A list of disks *preferred* for use in the array. If blank all
        disks are considered for use in the array.
- [Excluded
    disk(s)](Un-Official_UnRAID_Manual#Excluded_disks.28s.29 "wikilink")
  - A list of disks to which data for this share will not be copied.
- Export (SMB)
  - Sets how the share appears on the network and how it may be
        accessed.

Once the share is created, there will be a new section below where you
can create the next share.

## Copy Files to the Array

`Note: If parity is already enabled the bottleneck will be parity writes;`\
`pick whichever method is easiest for you`*`without`*`considering`\
`the speed.`

There are several methods of copying files to a new array. The simplest
method is to browse to a share on the network from an existing machine
and copy data across. While this is simple it can be slow, even over a
gigabit network. If you have an available hard drive (IDE, SATA, eSATA),
it is much faster to install the hard drive in the system where the
files reside, copy files to this hard drive, install the hard drive in
the UnRAID server, and copy the files to the array. If you have files on
an external USB hard drive, it can be mounted directly on the UnRAID
server to copy files, but this will be slow due to the maximum speed of
USB2 being 480Mbps. If the files are *already* on an external hard
drive, this is a moot point because access will be limited to USB2
speeds, therefore, it makes sense to mount the drive directly on the
UnRAID server.

### Copying Files Across the Network

`Note: These instructions are for copying files from a Windows system.`

**Step 1** Open *My Computer* and navigate to the location where the
files to be copied to the array are stored.

**Step 2** Open *My Network Places* and browse to the UnRAID server and
share where the files are to be copied.

**Step 3** Create directories if necessary.

**Step 4** Select the files and/or folders in the *My Computer* Window
then drag and drop them into the *My Network Places* Window. This will
begin the copy.

**Step 5** Once the copy is complete, the files are now stored on the
array.

### Copying Files From an Internal or External Hard Drive

`Note: The NTFS driver included with the UnRAID distribution does not support`\
`Unicode characters correctly and using this method`**`WILL`**`corrupt`\
`filenames if they contain Unicode characters!  If you have any files`\
`containing Unicode characters, it is recommended that you copy those`\
`files across the network.`

**Step 1** Copy files from an existing system to an internal or external
hard drive.

**Step 2** Install the hard drive in the UnRAID server, power on the
system, log into the web GUI and spin up the drives. Then run telnet and
log in as root. For external hard drives it is safe to just plug them
into the USB or eSATA port. It is recommended to log into the console or
via a screen session if using telnet.

**Step 3** Create a directory to mount the filesystem. At the prompt
type

`mkdir /mnt/imported_files`

**Step 4** Determine the drive and partition mappings:

For NTFS file systems type

`fdisk -l|grep NTFS`

For FAT or FAT32 file systems type

`fdisk -l|grep FAT`

The result will be similar to

`/dev/sdc1               1      121602   976759808    7  HPFS/NTFS`\
`/dev/sdd1               1       24321   195358401    7  HPFS/NTFS`\
`/dev/sdh1               1       19457   156288321    c  W95 FAT32 (LBA)`

This shows 2 NTFS file systems: one at */dev/sdc1* and another at
*/dev/sdd1*; and 1 FAT32 file system at */dev/sdh1*. Note the mapping of
the file system where the files reside.

**Step 5** Mount the file system in the mount point created in Step 3:

For NTFS file systems type

`mount -r -t ntfs /dev/sdX /mnt/imported_files`

where /dev/sdX is the device mapping from Step 4.

For FAT or FAT32 file systems type

`mount -r -t vfat /dev/sdX /mnt/imported_files`

where /dev/sdX is the device mapping from Step 4.

**Step 6** To copy files using Midnight Commander, at the prompt type

`mc`

`Note: If you are comfortable navigating the filesystem and using the cp`\
`or rsync command that is an acceptable alternative to Midnight`\
`Commander.`

**Step 7** Use the arrow keys to move the highlighted bar to

`/..`

in the left column and press enter to navigate up one level in the file
system.

**Step 8** Use the arrow keys to navigate to the

`/mnt`

directory in the left column and press enter to open it.

**Step 9** Use the arrow keys to navigate to the

`/imported_files`

directory and press enter to open it.

**Step 10** Continue using the arrow keys and enter to navigate to the
set of files you wish to copy to the array in the left column.

**Step 11** Press *tab* to move to the right column, then use the arrow
keys and enter to navigate to

`/mnt/user/`

directory. You will probably need to start by going up one level in the
file system like in Step 7.

**Step 12** This is where the user shares are mounted in the file
system. Navigate into the share where the files from the left column
will be copied. To create a directory (folder) press *F7*, type the name
of the new directory, and press enter.

**Step 13** When you have the source files for the copy in the left
column and the destination in the right column press *tab* to move the
nav bar back to the left column.

**Step 14** For each file or directory to be copied, highlight it using
the up and down arrow keys then press

`CTRL-T`

to select it. Selected files and directories will turn yellow. They can
also be de-selected by pressing *CTRL-T* again.

**Step 15** Once the files and/or directories to be copied have been
selected, press *F5* to initiate the copy.

**Step 16** Leave everything as is in the box that appears and press
*Enter* to copy the files.

**Step 17** Once the first copy is finished you can use the preceding
steps to navigate the file system and copy all the files from the disk
to the array.

**Step 18** When finished copying files, press *F10* to exit Midnight
Commander. Then press *Enter* in the *Are you sure* box.

**Step 19** After exiting Midnight Commander type

`cd`

to return to the */root* directory then unmount the hard drive by typing

`umount /mnt/imported_files`

It is now safe to power down the system and remove the hard drive, or
you can preclear it and add it to your array!

## Users and Share Security

`Note: User level security is only available on UnRAID Pro and Plus`

This section shows how to configure user level security for shares on
the array. If you are comfortable with anyone that is attached to your
network - depending on your network topology this may include
***anyone*** on your wireless network! - having access to your shares as
they are presently configured then user level security is not necessary.

### Enable User Level Share Security

**Step 1** Connect to the [Server Management
Utility](Un-Official_UnRAID_Manual#Connecting_To_the_Server_Management_Utility "wikilink")
and stop the array.

**Step 2** Click on *Settings*.

**Step 3** Set Share security to *User Level*.

**Step 4** Click *Apply*.

**Step 5** Start the array.

### Add Users

**Step 1** Connect to the [Server Management
Utility](Un-Official_UnRAID_Manual#Connecting_To_the_Server_Management_Utility "wikilink")
and click *Users*.

**Step 2** Below root, there will now be a set of boxes in which you can
assign a new user with password to the system. Enter a username in the
*User name* box. Valid characters are a-z, 0-9, - (dash), _
(underscore), and . (dot). Do not use any uppercase letters. You may
also leave the password blank. This is useful for a guest user; they can
be allowed read only access to some shares, no access to others, and
denied write access to the entire array.

`Note: If the username and password match the user's Windows username and`\
`password, they will not be prompted for a password when they connect`\
`to a share.`

**Step 3** Enter a password in the *Password* and *Retype password*
boxes, then press apply.

**Step 4** Click *Shares* to assign share permissions.

See the [Un-Official UnRAID
Manual](Un-Official_UnRAID_Manual#Users_2 "wikilink") for more
information including removing users and changing passwords.

### Share Security Settings

The applicable settings for share security are *Exceptions*, *Valid
users*, and *Invalid Users*. This information is also available in the
[Un-Official UnRAID
Manual](Un-Official_UnRAID_Manual#Exceptions "wikilink")

- Exceptions
  - This is a comma separated list of users that get the
        "opposite" of the *Export (SMB)* setting. If Export is set to
        *read-only*, users in the Exceptions list get *read/write*
        access. If Export is set to *read/write*, users in the
        Exceptions list get *read only* access.
- Valid users
  - Comma separated list of users that are granted access to the
        share as specified by the *Export (SMB)* setting.
  - If left blank, all users not in the *Invalid users* are granted
        access.
- Invalid users
  - Comma separated list of users that denied access to the share.
  - If left blank, all users not listed in *Valid users* are denied
        access.

### Examples

Suppose we have a system named *Tower* with the following shares

`Movies`\
`Finances`

and the following users

`mom`\
`dad`\
`kids`\
`guest`

We want guests and kids to be able to watch movies but not be able to
add or delete them. Mom and dad should have full access to the Movies
share so they can add new movies and delete old ones.

`Export (SMB)  = read only`\
`Exceptions    = mom,dad`\
`Valid users   =`\
`Invalid users =`

For Finances, guests and kids should not have any access and because Mom
handles the finances dad should only get read access.

`Export (SMB)  = read only`\
`Exceptions    = mom`\
`Valid users   = mom,dad`\
`Invalid users = kids,guest`

## Security

unRAID is by no means a secure operating system and should **NOT** be
connected directly to the Internet under any circumstances. There are,
however, a few things that can be done to provide additional security to
your unRAID server. What you choose to implement should be based on your
environment, users that are granted access, and users who could
potentially take access of your server.

### Setting a root Password

In a Linux system root is the super user. root can see everything,
change everything, and even delete everything. By default unRAID leaves
the root password blank. This has the benefit of making configuration an
easy task but it also makes the system easier to compromise. Without a
root password, whenever you navigate to the [Server Management
Utility](Un-Official_UnRAID_Manual#Connecting_To_the_Server_Management_Utility "wikilink")
you are not prompted for a password. This means that ANYONE that has
access to your network can simply log in and take control of your unRAID
server. To set a root password:

**Step 1** Log into the [Server Management
Utility](Un-Official_UnRAID_Manual#Connecting_To_the_Server_Management_Utility "wikilink").

**Step 2** Click *Users*.

**Step 3** Enter the new password in the *Password* and *Retype
password* boxes for root and click apply.

### Use Proper User Share Policies

Be sure to grant *just enough* access to user shares. It's easy to just
give everyone read/write access to everything, but that can lead to
friends or family accidentally deleting or overwriting files. Parity can
protect you from a hard drive failure, but it can't protect you from
your friends and family. The trouble is quantifying what is *just
enough* and that is a question that only you can answer. Think through
your usage scenarios, and be stingy with permissions!

### Disable Flash Share

It is convenient to be able to drag and drop files to the flash drive,
but setting the flash share export to disabled in [Export
Settings](Configuration_Tutorial#Export_Settings "wikilink") makes it
harder for someone to hijack your server by modifying the startup
sequence.

### Limit External Access

Do not allow **ANY** external access to your unRAID server that is not
required. Definitely do not allow external console access via telnet; it
is an insecure protocol. If you simply **MUST** allow external console
access set up ssh through the package manager in
[unMENU](UnRAID_Add_Ons#UnMENU "wikilink") and be sure to use **STRONG**
passwords or set up a [VPN](http://en.wikipedia.org/wiki/Vpn). A VPN is
more secure and can add the benefit of allowing external access to your
shared files.

Directly exposing an SMB or NFS mount to the Internet is bad practice
and can quickly lead to someone stealing your data or using your storage
to store their files! Allowing external access to your shared files can
be done via ftp, sftp, or VPN. Search the wiki and/or forums for more
information.

## Final Notes

Congratulations, you now have a working UnRAID server!

If you have not yet added a [parity
drive](Configuration_Tutorial#Adding_a_Parity_Drive_to_an_Existing_Array "wikilink")
to your array you should do so now to protect your data.

At this point it is recommended that you [set a root
password](Configuration_Tutorial#Setting_a_root_Password "wikilink") for
your UnRAID server if you have not done so already. This will add a
layer of security to your server and prevent anyone from logging into
the web interface and nosing around or worse.

### More Sources of Information

- [Official UnRAID Manual](UnRAID_Manual "wikilink")
- [Un-Official UnRAID Manual](Un-Official_UnRAID_Manual "wikilink")
- [UnRAID Wiki](UnRAID_Wiki "wikilink")
- [Best of the Forums](Best_of_the_Forums "wikilink")
- [Troubleshooting Guide](Troubleshooting "wikilink")
- [UnRAID Add Ons](UnRAID_Add_Ons "wikilink")
- [unRAID forums](http://lime-technology.com/forum/index.php)

[Category: Getting started](Category:_Getting_started "wikilink")
[Category: How To](Category:_How_To "wikilink")
