# Additional Settings

While Unraid is configured to work automatically, you may wish to
further refine your setup by customizing your IP address, hostname, disk
tunables, and other settings. This section goes over the various
settings you can configure from the Unraid webGui. All settings controls
can be found under the _Settings_ tab on the Unraid task bar unless
otherwise specified.

The Unraid GUI has extensive online help built-in that can help with
choosing appropriate values for the settings that are available. This
help can ban be displayed for specific fields by clicking on the prompt
for that field. It can also be toggled on/off for all fields on a page
by clicking on the **Help**
icon at the top right of each page.

## Date & Time

From this page, you can set your time zone and toggle the use of up to 3
NTP servers. It is recommended that you adjust Unraid to your time zone
for accurate timekeeping.

## Disk Settings

You can configure additional settings for your disk devices from this
page. Enable your array to auto-start on boot, adjust disk spin-down
timers, and even adjust advanced driver settings such as SMART polling
frequency.

## Docker

Docker containers allow users to add a variety of pre-configured Linux
applications to their systems. See the [Docker
Management](docker-management.md) page for more
information on setting up applications using Docker.

## Identification

Unraid automatically uses the hostname of `tower`, but you can adjust
that from this page. You can also give your system a description / model
number (useful for system builders). In addition, this page also allows
you to enable or disable SSL support, change what port the webGui uses,
and even provision an SSL certificate for your server.

## Network Settings

By default, Unraid will attempt to get an IP address from a DHCP server
present on your local network (typically by your router). From this
page, you can configure a static IP address, set up bonding / bridging,
or other options. Setting a static IP is recommended, but not required
to use Unraid.

## Global Share Settings

As described earlier, user shares can vastly simplify how content can be
organized and accessed across multiple disks in the array. You can
specify what disks are allowed to participate in user shares (global
inclusion/exclusion) and if a cache device/pool is present, you can
configure its use with user shares from here.

## UPS Settings

Unraid can be connected to an APC UPS (uninterruptable power supply) so
that in the event of a power loss, the system can be commanded to shut
down while being supplied power through a battery. From this page, you
can configure the connection to your specific UPS and define policies
for when the shutdown command should be issued. For a complete manual,
visit: <http://apcupsd.org/manual/manual.html>

## VM Manager

Virtual machines can be used to turn your server into a desktop, a media
player, or just to run applications that weren't designed for Linux.
See [VM Management](vm-management.md) and [VM Guest
Support](vm-support.md) for more information on
creating and managing VMs on Unraid.

## AFP (Apple File Protocol)

From this page you can enable user shares for use with the Apple File
Protocol, allowing them to be used as valid Time Machine backup targets
for your Mac OS X devices.

## NFS (Network File System)

NFSv4 support has been included in Unraid 6. You can enable or disable
its use with user shares from this page, as well as adjust the
`fuse_remember` tunable which can help with resolving _NFS Stale File
Handles_ error messages.

## SMB (Server Message Block)

The SMB protocol is the standard used by Microsoft Windows-based
clients. From this page, you can enable its use, define a Windows
workgroup, or even join an active directory domain.

## FTP (File Transfer Protocol)

Users can connect via FTP if they are added to the **FTP user(s)** field
on this page. If no users are added, the FTP service will not be
started.

## Syslog

Users can set up logging of the syslog to permanent storage

## WireGuard

WireGuard VPN Server

Users can set up a VPN connection using
[WireGuard](security.md#wireguard") for secure connections
to/from the internet

["WireGuard" and the "WireGuard" logo are registered trademarks of Jason A. Donenfeld.](https://www.wireguard.com/)

## Confirmations

From here, you can disable the need for confirmations to perform various
tasks.

## Display Settings

Customize the appearance of the Unraid webGui from this page. This
includes adjusting the date and time format, number format, toggles for
tabbed/non-tabbed view modes, temperature unit, and much more. You can
also toggle between various themes for how the UI itself is presented.

## Notifications Settings

Browser and e-mail-based system notifications can be configured from
this page. You can subscribe to different types of notifications for
each method and even add custom alerts for SMART values attribute
monitoring.

## Scheduler

The scheduler settings page presents a standard view to configure the
frequency for two types of automated system tasks: parity checks and the
cache mover.

### Parity Checks (Read Checks)

The parity disk contents need to be correct for Unraid to be able to
recover a failed drive successfully without any data loss or corruption.
The purpose of a Parity Check is to confirm that the data on the array
data drives is consistent with that held on the parity disk(s). **Parity
is updated in real-time** during normal Unraid use so one should only
expect there to be any mismatch between the parity calculated from
reading the data drives and that actually present on the parity
drives(s) if there have been any system events such as an unclean
shutdown or if there have been write errors reported.

It is recommended that Parity Checks are run at regular intervals as
part of normal system maintenance. You do not want to do this too
frequently as the check can adversely affect system performance while it
is running (typical frequencies used are **monthly** or **quarterly**).
It is recommended that such checks are run as **non-correcting** so that
if a data drive is playing up for any reason you do not corrupt the
parity. **Correcting** parity checks do have to be run if any problem
has been identified (and corrected) to get parity disk contents to once
again be consistent with the contents of the data drives and this can be
done manually from the _Main_ page in the Unraid GUI.

#### Notes

- The only acceptable number of errors reported by a parity check
  is 0. If you get any other result then you need to look into why
  this has happened as it can compromise Unraid's ability to recover
  failed drives without any data corruption/loss.
- If you do not have a parity disk present in the system then this
  option will run a Read-Check which simply involves reading through
  all the data drives to ensure they can be read without error. This
  is still a useful maintenance function as any read errors need to be
  investigated as they could lead to problems later,

### Mover

**Mover** is used to handle the automated transfer of data belonging to
User Shares between a cache pool and the main array. Whether
it actually moves files and in which direction is controlled by the
value of the _Use Cache_ setting on each share.

The Mover task is normally scheduled to run automatically in the middle
of the night when the system its likely to be otherwise inactive.

#### Notes

- Mover can never move files off a cache pool as fast as a user can
  potentially write to it. For this reason it is typically recommended
  that User Shares are set to not use a cache pool during the initial
  load of data into a new Unraid system as this is almost certainly to
  be more than the cache pool can handle so the benefit is marginal at
  best. This option should only be enabled when the volume of data on
  a daily basis is likely to be less that the cache pool can handle.
- Mover will never move files that are currently open in any
  application. In particular this can apply to the **System** share if
  the **Docker** or **VM** services are not disabled as they hold
  files in that location open all the time they are running.
- Mover will never moves any files that are found to exist on both a
  cache pool and the main array. In normal use this should not happen
  as files are only meant to exist at one of these locations. However
  it can happen if the user has moved files manually between drives
  thus by-passing Unraid's normal handling of files for User Shares.
- Mover can be run manually by using the Mover button on the Main page
  in the Unraid GUI.

### Other

Plugins offered by 3rd parties can add additional sections to the
**Scheduler** settings page of the Unraid GUI. Typically they are
related to enhancing/tuning the **Parity Check** or **Mover**
functionality although this is not mandated.
