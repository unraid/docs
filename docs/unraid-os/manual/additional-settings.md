# Additional Settings

While Unraid is configured to work automatically, you may want to further refine your setup by customizing your IP address, hostname, disk tunables, and other settings. This section goes over the various settings you can configure from the Unraid WebGUI. All settings controls can be found under the <navpath>Settings</navpath> tab on the Unraid navigation bar, unless otherwise specified.

The Unraid WebGUI has extensive online help built-in that can help with choosing appropriate values for the settings that are available. This help can be displayed for specific fields by clicking on the prompt for that field. It can also be toggled on/off for all fields on a page by clicking on the **Help** icon at the top right of each page.

## System Settings

**System Settings** enable you to configure key Unraid functionality, such as network, share, VM, and disk settings.

### CPU Pinning

**CPU Pinning** allows the user to specify CPU cores that are to be explicitly reserved for assignment to VMs or Docker containers. This is incredibly important for gaming VMs to run smoothly because even if you manually pin your Docker containers to not overlap with your gaming VM, the host OS can still utilize those same cores as the guest VM needs for things like returning responses for the WebGUI, running a parity check, btrfs operations, etc...

* When you pin a core to a VM or Docker, that core is allocated to the VM/Docker, but the unRAID OS may still access it and use it for various tasks.
* When you isolate a core, it is no longer accessible even by Unraid for routine tasks and should therefore be 100% dedicated to wherever it's pinned.

You can pin cores without requiring a system restart. However, you must restart your Unraid server to apply any CPU isolation changes.

### Date & Time

From this page, you can set your time zone and toggle the use of up to 3 NTP servers. It is recommended that you adjust Unraid to your time zone for accurate timekeeping.

### Disk Settings

You can configure additional settings for your disk devices from this page. Enable your array to auto-start on boot, adjust disk spin-down timers, and even adjust advanced driver settings such as SMART polling frequency.

### Docker

Docker containers allow users to add a variety of pre-configured Linux applications to their systems. See the [Docker Management](./docker-management.md) page for more information on setting up applications using Docker.

### Identification

Unraid automatically uses the hostname of `tower`, but you can adjust that from this page. You can also give your system a description / model number (useful for system builders). In addition, this page also allows you to enable or disable SSL support, change what port the WebGUI uses, and even provision an SSL certificate for your server.

### Management Access

You can configure different access settings for your Unraid server, including enabling Telnet or SSH, setting ports for SSL/TLS, HTTP, and HTTPS. You can also set the default landing for Unraid.

### Network Settings

By default, Unraid will attempt to get an IP address from a DHCP server present on your local network (typically by your router). From this page, you can configure a static IP address, set up bonding, bridging, or other options. Setting a static IP is recommended, but not required to use Unraid.

### Global Share Settings

As described earlier, user shares can vastly simplify how content can be organized and accessed across multiple disks in the array. You can specify what disks are allowed to participate in user shares (global inclusion/exclusion) and if a cache device/pool is present, you can configure its use with user shares from here.

### UPS Settings

Unraid can be connected to an APC UPS (uninterruptable power supply) so that in the event of a power loss, the system can be commanded to shut down while being supplied power through a battery. From this page, you can configure the connection to your specific UPS and define policies for when the shutdown command should be issued. For a complete manual, visit: <http://apcupsd.org/manual/manual.html>

### VM Manager

Virtual machines can be used to turn your server into a desktop, a media player, or just to run applications that weren't designed for Linux. See [VM Management](./vm/vm-management.md) and [VM Guest Support](./vm/vm-support.md) for more information on creating and managing VMs on Unraid.

<!-- ## AFP (Apple File Protocol)

From this page you can enable user shares for use with the Apple File Protocol, allowing them to be used as valid Time Machine backup targets for your Mac OS X devices.
-->

## Network Services

**Network Services** enable you to configure the network communication protocols on your Unraid server. Different OSes will default to different communication protocols, so these are important for your user and disk shares. You can also enable an FTP server or a logging server, and configure a VPN for an added layer of security when accessing your server remotely.

### NFS (Network File System)

NFSv4 support has been included in Unraid 6. You can enable or disable its use with user shares from this page, as well as adjust the `fuse_remember` tunable which can help with resolving _NFS Stale File Handles_ error messages.

### SMB (Server Message Block)

The SMB protocol is the standard used by Microsoft Windows-based clients. From this page, you can enable its use, define a Windows workgroup, or even join an active directory domain.

### FTP (File Transfer Protocol)

Users can connect via FTP if they are added to the **FTP user(s)** field on this page. If no users are added, the FTP service will not be started.

### Syslog Server

The Syslog server records your system log to a permanent storage location. This is particularly useful when trying to troubleshoot issues with your server because, at every reboot, Unraid clears the system log.

### VPN Manager

You can set up a VPN connection to your Unraid server using [WireGuard](security/vpn.md#wireguard) for secure connections to/from the internet.

["WireGuard" and the "WireGuard" logo are registered trademarks of Jason A. Donenfeld.](https://www.wireguard.com/)

## User Preferences

**User Preferences** are just that. This enables you to configure aspects of your interactions with Unraid OS: notifications, display settings, UI customization, and even the Mover schedule.

### Confirmations

From here, you can disable the need for confirmations to perform various tasks.

### Display Settings

Customize the appearance of the Unraid WebGUI from this page. This includes adjusting the date and time format, number format, toggles for tabbed/non-tabbed view modes, temperature unit, and much more. You can also toggle between various themes for how the UI itself is presented.

### Notifications Settings

Browser and e-mail-based system notifications can be configured from this page. You can subscribe to different types of notifications for each method and even add custom alerts for SMART values attribute monitoring.

### Scheduler

The scheduler settings page presents a standard view to configure the frequency for two types of automated system tasks: parity checks and the cache mover.

<!-- ### Parity Checks (Read Checks)

The parity disk contents need to be correct for Unraid to be able to recover a failed drive successfully without any data loss or corruption. The purpose of a Parity Check is to  confirm that the data on the array data drives is consistent with that held on the parity disk(s). **Parity is updated in real-time** during normal Unraid use so one should only
expect there to be any mismatch between the parity calculated from reading the data drives and that actually present on the parity drives(s) if there have been any system events such as an unclean shutdown or if there have been write errors reported.

It is recommended that Parity Checks are run at regular intervals as part of normal system maintenance. You do not want to do this too frequently as the check can adversely affect system performance while it is running (typical frequencies used are **monthly** or **quarterly**). It is recommended that such checks are run as **non-correcting** so that
if a data drive is playing up for any reason you do not corrupt the parity. **Correcting** parity checks do have to be run if any problem has been identified (and corrected) to get parity disk contents to once again be consistent with the contents of the data drives and this can be done manually from the _Main_ page in the Unraid GUI.

#### Notes

- The only acceptable number of errors reported by a parity check is 0. If you get any other result then you need to look into why this has happened as it can compromise Unraid's ability to recover failed drives without any data corruption/loss.
- If you do not have a parity disk present in the system then this option will run a Read-Check which simply involves reading through all the data drives to ensure they can be read without error. This is still a useful maintenance function as any read errors need to be investigated as they could lead to problems later.

### Mover

**Mover** is used to handle the automated transfer of data belonging to User Shares between a cache pool and the main array. Whether it actually moves files and in which direction is controlled by the value of the _Use Cache_ setting on each share.

The Mover task is normally scheduled to run automatically in the middle of the night when the system its likely to be otherwise inactive.

#### Notes

- Mover can never move files off a cache pool as fast as a user can potentially write to it. For this reason it is typically recommended that User Shares are set to not use a cache pool during the initial load of data into a new Unraid system as this is almost certainly to be more than the cache pool can handle so the benefit is marginal at best. This option should only be enabled when the volume of data on a daily basis is likely to be less that the cache pool can handle.
- Mover will never move files that are currently open in any application. In particular this can apply to the **System** share if the **Docker** or **VM** services are not disabled as they hold files in that location open all the time they are running.
- Mover will never moves any files that are found to exist on both a cache pool and the main array. In normal use this should not happen as files are only meant to exist at one of these locations. However it can happen if the user has moved files manually between drives thus bypassing Unraid's normal handling of files for User Shares.
- Mover can be run manually by using the Mover button on the Main page in the Unraid GUI.

-->

## User Utilities

Plugins offered by 3rd parties appear here. These plugins extend the functionality of Unraid and give you greater control over your server. For example, as a plugin, Community Applications displays here. Other plugins may provide system monitoring, maintenance, tweaks to system behavior, better management of storage resources, or simple backup functions for your `appdata` folder.
