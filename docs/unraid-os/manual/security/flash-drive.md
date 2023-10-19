---
sidebar_position: 4
---

# Flash Drive

The flash drive that is used to boot Unraid is important as it contains all the configuration information for your Unraid server. Because of this, you want to consider the security of the information it contains and how it is accessed.

## Backups

If a flash drive ever fails for any reason, as long as you have a backup, getting the Unraid server back into normal operation is an easy process. We recommend that you make a backup whenever you make a significant configuration change.

You can easily achieve this from the Unraid WebGUI:

1. Select the flash drive on the **Main** tab.
2. In the **Flash Device Settings** section select the **Flash Backup** button.
3. The system will now create a ZIP file that is a backup of the contents of the flash drive.
4. When the ZIP file has been created your browser should prompt you to provide the location where you want the backup saved to. It is recommended that this is a location off the Unraid server so that it is available even when the Unraid server is not operational.

If you later need to recreate your flash drive for any reason, use this backup as input to the [Limetech USB Creator tool](https://unraid.net/download).

## Network Access

The flash drive can have similar settings applied to it to control access over the network as is the case for other shares on an Unraid system. The main difference is that you set this up by selecting the flash device on the **Main** tab.

* ***Network visibility**: You can specify whether the flash drive should even be accessible via the network, and if it is accessible whether it should be hidden or visible to everyone.
* **Access rights**: If network access is allowed you can specify any access permissions that you want applied.

## Permissions

As part of improving the security of Unraid systems, starting with Unraid 6.8 files on the flash drive can no longer be given execute permission. The implication of this is that if you have your own custom scripts (or programs) stored on the flash drive, they can no longer be executed from that location.

There are a few ways to handle this:

1. Copy the files to a location from which they can be executed.

    * The location `/usr/local/bin` is a good choice if you want the files on the default search path.
    * You can copy the files into position when booting by adding appropriate commands to the `config/go` file on the flash drive.
    * Give the files execute permission after copying them.
  
2. For scripts, prefix the script name with the command that runs the script (e.g. _bash path-to-script_).
