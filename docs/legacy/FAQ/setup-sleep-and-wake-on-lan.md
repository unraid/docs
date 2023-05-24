# Setup Sleep (S3) and Wake on Lan (WOL)

The following are my notes for setting up my Unraid server to sleep to
S3 state and then wake up to Magic Packet. This is a 'For Beginners, By
Beginners' effort - there's very little original work here. I just
tried to piece together whatever I needed from various threads on the
Unraid forums. My server uses a Foxconn A7GM-S AMD 780G/SB700 based
motherboard, and I am running Unraid 4.4.2. In general, I think the
below is procedurally correct - although different motherboards will
have different capabilities and driver concerns. Also - all computers
with access to my Unraid server are Windows machines, I do not know how
any of this would change if accessing from a machine with a different
OS. The following assumes the use of a Windows machine.

1\. BIOS settings for S1 / S3 sleep state

- Review BIOS settings on Unraid server for allowable sleep states.
- On my motherboard, the setting is "ACPI Suspend Type" and provides
  option to either suspend to S1 or S3 sleep state. Select S3.

2\. BIOS settings for WOL

- Review BIOS settings on Unraid server for "Resume by" options.
- My motherboard has a setting for "Resume by LAN". It can be enabled
  or disabled. You need to enable "Resume by LAN".

3\. Double check NIC WOL settings

- Boot Unraid server.
- Use the Terminal on the WebUI (present in v6, one of the buttons in
  the upper right corner, or fall-back to [SSH or Telnet](terminal-access.md) and type `ethtool
  eth0` from the command line
- You're looking to confirm that the setting for "Wake-on" includes
  'g' . . . which is the option for allowing Wake on Magic Packet.
  We're essentially confirming the BIOS settings from Step 2 above.
- The results of my **ethtool eth0** command are as follows:

    ```shell
    root@Tower:~# ethtool eth0
    Settings for eth0:
    Supported ports: [ TP MII ]
    Supported link modes:   10baseT/Half 10baseT/Full
                            100baseT/Half 100baseT/Full
                            1000baseT/Half 1000baseT/Full
    Supports auto-negotiation: Yes
    Advertised link modes:  10baseT/Half 10baseT/Full
                            100baseT/Half 100baseT/Full
                            1000baseT/Half 1000baseT/Full
    Advertised auto-negotiation: Yes
    Speed: 1000Mb/s
    Duplex: Full
    Port: MII
    PHYAD: 0
    Transceiver: internal
    Auto-negotiation: on
    Supports Wake-on: pumbg
    Wake-on: g
    Current message level: 0x00000033 (51)
    Link detected: yes
    ```

- If the wake-on setting does not include 'g', you can set it
  manually by typing the following at the server command line:

  ```shell
  ethtool -s eth0 wol g
  ```

- If necessary, you can add the above line to your 'go' script, but
  I've not had a problem with my machine keeping the setting once it
  is set and the appropriate Wake on LAN setting is enabled in BIOS.

4\. Download **wolcmd** executable

- Go to [Depicus 'Wake on
  Lan'](http://www.depicus.com/wake-on-lan/wake-on-lan-cmd.aspx)
  page, select **Download** button near the bottom
- I placed the file in *C:\\Program Files\\WOLcmd* (location becomes
  important in next step)
- There are other Magic Packet tools available, this is just one that
  I found simple to deal with.

5\. Generate **Wakeup.bat** batch file (or download mine from
[here](https://forums.unraid.net/forum/index.php?topic=3657.msg39076#msg39076))

- My batch file is simply two lines
  - Change folder directory as necessary depending on where you
      saved wolcmd.exe.
  - Enter the MAC address of your Unraid server in the second line
        instead of 'MAC'

    ```shell
    cd c:\program files\wolcmd
    wolcmd MAC 255.255.255.255 255.255.255.255
    ```

- Place the batch file on your desktop for easy access.
- Copy of my batch file attached to [this Unraid forum
  post](https://forums.unraid.net/forum/index.php?topic=3657.msg39076#msg39076)

6\. Manually test sleep and WOL

- Spin-down drives (I'm not certain that this is required. I did
  force sleep from the active state (spinning) once before and got a
  parity check on wake-up. I'll test some more.)
- Telnet to server and enter `echo 3 >/proc/acpi/sleep`
  - Ensure server sleeps
- Execute **Wakeup.bat** file
  - Ensure server wakes up
- Repeat / test until comfortable

Note: Some people have reported that their system misbehaves on the
second or later sleep, so you should test sleep and wake-up for a while
and make sure everything is correct. In fact, I just noticed that waking
up from S3 sleep, my system does not negotiate a gigabit connection and
I go from 1000Mb/s to 100Mb/s after the initial sleep. So I have a
little more work to do -- I'm guessing a Linux driver issue?

7\. Record hard drive references (sda, sdb, etc)

- From Unraid 'Devices' page, make note of the hard drive references
  in your system. You're building a list of hard drives in the system
  for use in the sleep script.
  - I am currently only using two SATA drives, so my drive
    references are: **sda** and **sdb**

8\. Generate sleep script, or download mine from
[here](https://forums.unraid.net/forum/index.php?topic=3657.msg39076#msg39076)

- I copied OMV's sleep script verbatim from [this Unraid forum
  thread](https://forums.unraid.net/forum/index.php?topic=3657), and
  then edited the lines shown below in bold:

```bash
#!/bin/bash
drives="/dev/sda /dev/sdb"
timeout=5
count=5
while [ 1 ]
do
 hdparm -C $drives | grep -q active
 if [ $? -eq 1 ]
 then
  count=$[$count-1]
 else
  count=$timeout
 fi
 if [ $count -le 0 ]
 then
  # Do pre-sleep activities
  sleep 5
  # Go to sleep
  echo 3 > /proc/acpi/sleep
  # Do post-sleep activities
  # Force NIC into gigabit mode
  # (might be needed forgets about gigabit when it wakes up)
  ethtool -s eth0 speed 1000
  # Force a DHCP renewal (shouldn't be used for static-ip boxes)
  /sbin/dhcpcd -n
  sleep 5
 count=$timeout
fi
 # Wait a minute
 echo COUNT $count
 sleep 60
done
```

- timeout=5 and count=5 are programmable timers to set the delay from
  spin-down until sleep. This sets the delay to five minutes after
  spin down, OMV's original script was 15 minutes.
- drives= line needs to be edited to reflect the drives that you want
  to be checked for status (idle or spinning). Again, my server only
  has two drives (**sda** and **sdb**), so I edited accordingly. Be
  aware that this drive list can change when upgrading Unraid or
  modifying your hardware. It can even change from one boot to the
  next. For example, your flash drive may be assigned **sdc** on one
  boot, but **sdd** on the next boot, with one of your hard drives
  assigned to **sdd** the first time, and **sdc** the next time.
- Copy of my **s3.sh** sleep script attached to [this Unraid forum
  post](https://forums.unraid.net/forum/index.php?topic=3657.msg39076#msg39076)

9\. Save script onto flash drive in specified location

- I titled my sleep script **s3.sh** and saved in **/boot/custom/bin**

**IMPORTANT:** "boot" is *already* the name of the root directory of
your flash device. So, if you save your script as per this example, do
**not** create another "boot" directory. Doing so will cause Unraid to
lose track of your config directory and your entire configuration will
be lost (unless previously backed up elsewhere.)

10\. Edit 'go' file to call script

- I added the following lines to my go script to initiate the sleep
    script during boot:

```shell
# Execute s3.sh sleep script
fromdos < /boot/custom/bin/s3.sh | at now + 1 minute
```

- Make sure you adjust file directory structure as necessary depending
  upon where you saved your **s3.sh** script.

11\. Re-boot / test

Good luck!
