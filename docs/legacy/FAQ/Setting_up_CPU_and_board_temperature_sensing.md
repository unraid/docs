\
**This page is designed to help you obtain your CPU and motherboard
temperatures, and hopefully keep them current and visible. If you
aren\'t using unRAID v6 with the Dynamix System Temp plugin, then skip
down to the \'older versions\' section.**\
\

## Setting up sensing for v6 {#setting_up_sensing_for_v6}

:   *This section is only for unRAID v6 with the Dynamix System Temp
    plugin installed. These instructions are lifted directly from the
    author\'s words
    [here](http://lime-technology.com/forum/index.php?topic=31172.msg473847#msg473847).*

1.  Preparation

    :   Install the perl package, easiest done by installing the
        [NerdPack
        plugin](http://lime-technology.com/forum/index.php?topic=37541.0),
        then in the plugin enabling perl to install. Perl is only needed
        by the script \"sensors-detect\", which will be run in the
        background by the Detect function of Step 2. Once you have
        completed System Temp setup, perl is no longer needed and can be
        disabled, uninstalled.
2.  Detection

    :   Press the `<Detect>`{=html} button to search and automatically
        fill in the required drivers, or alternatively - if you know the
        name of the driver(s) - you can fill them in manually.
3.  Saving and activation

    :   Press the `<Save>`{=html} button to save and activate (load) the
        driver(s). *This will create the file
        **/config/plugins/dynamix.system.temp/drivers.conf** on your
        flash device.*
4.  Sensor assignment and display

    :   Use the dropdown menus under sensors to assign the appropriate
        sensor for CPU and motherboard readings. You may need to consult
        the user guide of your motherboard to find out which sensor
        needs to be selected here. Once a sensor selection is done, the
        corresponding item will be displayed at the right side of the
        footer. Click the `<Apply>`{=html} button to confirm your
        selection. *This will create the file
        **/config/plugins/dynamix.system.temp/sensors.conf** on your
        flash device.*
5.  You are done! You no longer need perl installed, and can remove it.

\
: **Last but not least: see also the online Help for System Temp!**

:   *Note: to unassign or remove a sensor just unselect it from the
    dropdown menu. This will also allow you to make new assignments (for
    example when the wrong sensor was chosen).*

\

## Setting up sensing for older versions {#setting_up_sensing_for_older_versions}

To pass system sensor data (such as temps, voltages, and fan speeds) to
3rd-party addons such as
[Dynamix](http://lime-technology.com/forum/index.php?topic=30939) (using
its [System Temp
plugin](http://lime-technology.com/forum/index.php?topic=31172)) or
[SimpleFeatures](http://lime-technology.com/forum/index.php?topic=12698.2685),
you need to load the required drivers and setup your sensor
configuration file **sensors.conf**.

The following steps should work for most motherboards. *(tested on a
SuperMicro C2SEE/C2SEA)*

**Step 1: Open a console**\
You can either use the command console on the UnRAID server itself (if
you have a keyboard and monitor attached), or you can login from another
computer and use [SSH or Telnet](Terminal_Access "wikilink"). On
Windows, the [PuTTY](Terminal_Access#PuTTY "wikilink") client for SSH
and Telnet is preferred, because it allows you to use cut and paste, to
save generated lines for your own sensors configuration file.\
**Step 2: Run sensors**\
At the command prompt, run **sensors**. Even without loading drivers,
you will probably see a sensor or two, with temps and other info. The
output should appear similar to:

`root@Skynet:~# sensors`\
`coretemp-isa-0000`\
`Adapter: ISA adapter`\
`Core 0:       +37.0 C  (high = +78.0 C, crit = +100.0 C)`\
`Core 1:       +37.0 C  (high = +78.0 C, crit = +100.0 C)`\
`w83627dhg-isa-0290`\
`Adapter: ISA adapter`\
`Vcore:        +0.92 V  (min =  +0.92 V, max =  +1.48 V)`\
`in1:          +1.86 V  (min =  +1.65 V, max =  +1.99 V)`\
`AVCC:         +3.38 V  (min =  +2.96 V, max =  +3.63 V)`\
`+3.3V:        +3.38 V  (min =  +2.61 V, max =  +0.11 V)  ALARM`\
`in4:          +1.57 V  (min =  +1.35 V, max =  +1.65 V)`\
`in5:          +1.30 V  (min =  +1.13 V, max =  +1.38 V)`\
`in6:          +1.46 V  (min =  +1.42 V, max =  +1.52 V)`\
`3VSB:         +3.33 V  (min =  +2.96 V, max =  +3.63 V)`\
`Vbat:         +3.26 V  (min =  +2.96 V, max =  +3.63 V)`\
`fan1:           0 RPM  (min =  715 RPM, div = 16)  ALARM`\
`fan2:        2678 RPM  (min =  712 RPM, div = 8)`\
`fan3:           0 RPM  (min =  715 RPM, div = 16)  ALARM`\
`fan4:           0 RPM  (min =   44 RPM, div = 128)  ALARM`\
`fan5:           0 RPM  (min =  715 RPM, div = 16)  ALARM`\
`temp1:        +35.0 C  (high = +60.0 C, hyst = +55.0 C)  sensor = thermistor`\
`temp2:        +37.0 C  (high = +80.0 C, hyst = +75.0 C)  sensor = CPU diode`\
`temp3:         +0.0 C  (high = +80.0 C, hyst = +75.0 C)  sensor = CPU diode`\
`cpu0_vid:    +1.513 V`\
`intrusion0:  ALARM`

**Step 3: Note the devices**\
Make note of the sensor device(s). In the above example, they are
**w83627dhg-isa-0290** and **coretemp-isa-0000**. (**Note:** for
coretemp you should run **sensors -u coretemp-isa-0000** again to see
the actual temperature labels. If they are called something like
temp1_input, just use temp1 as a label for your sensors.conf - see
below)\
**Step 4: Note the sensors**\
Make note of the specific sensors you wish to display. In the above
example, **temp1** is the motherboard and **temp2** is the CPU.\
**Step 5: Create sensors.conf**\
Create your **sensors.conf** file. This will contain the sensor
device(s) and labels (optional) for the temperatures you wish to
monitor. For Dynamix and Simple Features, it must establish the 2 labels
\'MB Temp\' and \'CPU Temp\'.

-   To be used by Dynamix, save this file to your flash drive, in the
    path **/boot/config/plugins/dynamix**. In Windows, this path would
    be something like **\\\\tower\\flash\\config\\plugins\\dynamix**.
-   If not for Dynamix, save this file into a persistent location on the
    flash drive, e.g. **/boot/config** or **/boot/custom**. Later, you
    will probably need a copy command in your \'go\' file, to copy it to
    its correct location in the UnRAID system.

In the sample **sensors.conf** file below, I\'m only using data from the
2nd sensor device.

`# lines starting with "#" are comments and ignored`\
`# sensor configuration`\
\
`chip "w83627dhg-isa-0290"`\
\
`label temp1 "MB Temp"`\
`label temp2 "CPU Temp"`

**Step 6: Prepare sensors-detect**\
The **sensors-detect** tool is a long script that should detect all of
your sensors, and help you get the right sensor driver names. A copy is
included with UnRAID, but it\'s not the latest, and if you have a new
motherboard (recent manufacture), you will want to use the latest
version, as it is occasionally updated with the newest drivers and
sensors. ~~Go to the [lm-sensors
Devices](http://www.lm-sensors.org/wiki/Devices) page, and look for the
link \"**latest version of sensors-detect**\", in the 3rd paragraph
currently.~~ *The lm-sensors site is down currently!* Download and copy
it to your flash drive. To run it (assuming it\'s in the root folder of
the flash), you will need to either change to the flash drive (**cd
/boot**), or run the command as **/boot/sensors-detect**.

The **sensors-detect** tool requires [Perl](http://www.perl.org/) to be
installed, at least temporarily.\
\* If it isn\'t already installed, you will need to download an
appropriate version for your UnRAID release:

-   -   For UnRAID v4 series, get it from
        [here](http://slackware.cs.utah.edu/pub/slackware/slackware-12.2/slackware/d/perl-5.10.0-i486-1.tgz)
    -   For UnRAID v5 series, get it from
        [here](http://slackware.cs.utah.edu/pub/slackware/slackware-13.1/slackware/d/perl-5.10.1-i486-1.txz)
        *May need updated/corrected perl links.*
    -   For UnRAID v6 series, get it from
        [here](http://slackware.cs.utah.edu/pub/slackware/slackware64-14.1/slackware64/d/perl-5.18.1-x86_64-1.txz)

-   Copy it to the **packages** folder on your flash drive, creating
    that folder if it does not already exist (**md /boot/packages**).

-   Then use **installpkg** and the perl package name to install it (eg.
    **installpkg /boot/packages/perl-5.18.1-x86_64-1.txz**).

-   Or you can use
    [UnMENU](http://lime-technology.com/forum/index.php?topic=27051) to
    download and install Perl. It does not need to be set for
    re-install.

-   Or for Dynamix, you can modify the Dynamix System Temp plugin itself
    (currently for v5 it\'s
    **/boot/config/plugins/dynamix.system.temp-2.1.0-noarch-bergware.plg**),
    by locating the line ending with \"# perl scripting\" and replacing
    \"no-install\" with \"do-install\". Then re-install the plugin or
    reboot. Change it back to \"no-install\" when you are done with this
    whole procedure.

**Step 7: Run sensors-detect**\
Run **sensors-detect**. Enter \[YES\] for the various scans. Enter
\[NO\] to automatically generate the config file (last prompt). The
output should be similar to:

`root@Skynet:~# sensors-detect`\
`# sensors-detect revision 6031 (2012-03-07 17:14:01 +0100)`\
`# System: Supermicro C2SEA [1234567890]`\
\
`This program will help you determine which kernel modules you need`\
`to load to use lm_sensors most effectively. It is generally safe`\
`and recommended to accept the default answers to all questions,`\
`unless you know what you're doing.`\
\
`Some south bridges, CPUs or memory controllers contain embedded sensors.`\
`Do you want to scan for them? This is totally safe. (YES/no): YES`\
`Silicon Integrated Systems SIS5595...                       No`\
`VIA VT82C686 Integrated Sensors...                          No`\
`VIA VT8231 Integrated Sensors...                            No`\
`AMD K8 thermal sensors...                                   No`\
`AMD Family 10h thermal sensors...                           No`\
`AMD Family 11h thermal sensors...                           No`\
`AMD Family 12h and 14h thermal sensors...                   No`\
`AMD Family 15h thermal sensors...                           No`\
`AMD Family 15h power sensors...                             No`\
`Intel digital thermal sensor...                             Success!`\
``    (driver `coretemp') ``\
`Intel AMB FB-DIMM thermal sensor...                         No`\
`VIA C7 thermal sensor...                                    No`\
`VIA Nano thermal sensor...                                  No`\
\
`Some Super I/O chips contain embedded sensors. We have to write to`\
`standard I/O ports to probe them. This is usually safe.`\
\
`Do you want to scan for Super I/O sensors? (YES/no): YES`\
`Probing for Super-I/O at 0x2e/0x2f`\
`` Trying family `National Semiconductor/ITE'...               No ``\
`` Trying family `SMSC'...                                     No ``\
`` Trying family `VIA/Winbond/Nuvoton/Fintek'...               Yes ``\
`` Found `Winbond W83627DHG-P/W83527HG Super IO Sensors'       Success! ``\
``    (address 0x290, driver `w83627ehf') ``\
`Probing for Super-I/O at 0x4e/0x4f`\
`` Trying family `National Semiconductor/ITE'...               No ``\
`` Trying family `SMSC'...                                     No ``\
`` Trying family `VIA/Winbond/Nuvoton/Fintek'...               No ``\
`` Trying family `ITE'...                                      No ``\
\
`Some systems (mainly servers) implement IPMI, a set of common interfaces`\
`through which system health data may be retrieved, amongst other things.`\
`We first try to get the information from SMBIOS. If we don't find it`\
`there, we have to read from arbitrary I/O ports to probe for such`\
`interfaces. This is normally safe. Do you want to scan for IPMI`\
`interfaces? (YES/no): YES`\
`` Probing for `IPMI BMC KCS' at 0xca0...                      No ``\
`` Probing for `IPMI BMC SMIC' at 0xca8...                     No ``\
\
`Some hardware monitoring chips are accessible through the ISA I/O ports.`\
`We have to write to arbitrary I/O ports to probe them. This is usually`\
`safe though. Yes, you do have ISA I/O ports even if you do not have any`\
`ISA slots! Do you want to scan the ISA I/O ports? (yes/NO): YES`\
`` Probing for `National Semiconductor LM78' at 0x290...       No ``\
`` Probing for `National Semiconductor LM79' at 0x290...       No ``\
`` Probing for `Winbond W83781D' at 0x290...                   No ``\
`` Probing for `Winbond W83782D' at 0x290...                   No ``\
\
`Lastly, we can probe the I2C/SMBus adapters for connected hardware`\
`monitoring devices. This is the most risky part, and while it works`\
`reasonably well on most systems, it has been reported to cause trouble`\
`on some systems.`\
`Do you want to probe the I2C/SMBus adapters now? (YES/no): YES`\
`` Using driver `i2c-i801' for device 0000:00:1f.3: Intel ICH10  ``\
`Module i2c-dev loaded successfully.`\
\
`Next adapter: SMBus I801 adapter at 0400 (i2c-0)`\
`Do you want to scan it? (YES/no/selectively): YES`\
`Client found at address 0x50`\
`` Probing for `Analog Devices ADM1033'...                     No ``\
`` Probing for `Analog Devices ADM1034'...                     No ``\
`` Probing for `SPD EEPROM'...                                 Yes ``\
`   (confidence 8, not a hardware monitoring chip)`\
`` Probing for `EDID EEPROM'...                                No ``\
`Client found at address 0x52`\
`` Probing for `Analog Devices ADM1033'...                     No ``\
`` Probing for `Analog Devices ADM1034'...                     No ``\
`` Probing for `SPD EEPROM'...                                 Yes ``\
`   (confidence 8, not a hardware monitoring chip)`\
\
`Now follows a summary of the probes I have just done.`\
`Just press ENTER to continue:`\
\
`` Driver `w83627ehf': ``\
` * ISA bus, address 0x290`\
``    Chip `Winbond W83627DHG-P/W83527HG Super IO Sensors' (confidence: 9) ``\
\
`` Driver `coretemp': ``\
``  * Chip `Intel digital thermal sensor' (confidence: 9) ``\
`Do you want to generate /etc/sysconfig/lm_sensors? (yes/NO): NO`\
`To load everything that is needed, add this to one of the system`\
`initialization scripts (e.g. /etc/rc.d/rc.local):`\
\
`#----cut here----`\
`# Chip drivers`\
`modprobe coretemp`\
`modprobe w83627ehf`\
`/usr/bin/sensors -s`\
`#----cut here----`\
\
`If you have some drivers built into your kernel, the list above will`\
`contain too many modules. Skip the appropriate ones! You really`\
`should try these commands right now to make sure everything is`\
`working properly. Monitoring programs won't work until the needed`\
`modules are loaded.`\
\
`Unloading i2c-dev... OK`

**Step 8: Note the drivers**\
Make note of the driver name(s) listed in the summary. In the above
example, they are **w83627ehf** and **coretemp**.\
**Step 9: Add modprobes to go**\
Edit your \'go\' file and add in the **modprobe** command for each
sensor driver that is required.

`# modprobe for each sensor`\
`modprobe w83627ehf`\
`modprobe ``<sensor2>`{=html}\
`modprobe ``<sensor3>`{=html}

**Step 10: Add the copy instruction to go**\
If you are configuring for Dynamix, this step is not needed, so skip to
Step 11. Otherwise, add another line in your \'go\' file to copy your
persistent sensors.conf file (from where you created/saved it in Step 5)
into the appropriate location on each boot.

`# copy the sensor.conf file for use`\
`cp /boot/config/sensors.conf /etc/sensors.d`

**Step 11: Reboot and check**\
Reboot to load up the changes, and check whether the temps are correct.
If wrong, you may have to select different sensors or
[customize](http://linux.die.net/man/5/sensors.conf) the
**sensors.conf** file.

[Category: Customising unRAID](Category:_Customising_unRAID "wikilink")
[Category: How To](Category:_How_To "wikilink")