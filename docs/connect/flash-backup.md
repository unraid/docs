---
sidebar_position: 3
---

# Automated Flash Backup

Unraid Connect offers users the ability to automatically back up your OS
configuration settings to our cloud. In the event of flash device
failure, you can download a zip file of your latest backup and restore
it to a new flash drive using the USB Flash Creator.

Note: Flash Backup is an optional feature, not required to use the rest
of Unraid Connect.

## Enabling Flash Backup (optional)

Until we are able to fully encrypt the flash backups on our servers, we
exclude all sensitive data owned by the OS from the backups, including
Unraid account passwords and WireGuard encryption keys. However, the
backups do include docker template XML files, which may contain
application-specific passwords and other private data. We are
working on solutions to encrypt the backups.

1. Navigate to ***Settings → Management Access → Unraid Connect*** and under
   **Flash backup** click the **Activate** button.
2. Wait for the activation and initial backup job to complete (once
   done, it will show **Activated: Up-to-date**.

Once activated, any changes to the OS configuration will automatically
be replicated to the backup in our cloud servers (within 1-2 minutes of
the change).

**Important**: Backups from the flash device do not include the
config/shadow or config/smbpasswd files. User accounts are preserved,
but their passwords are not. This means that when you restore from
backup, you will need to set passwords for your users including root. We
also don't store any of your WireGuard keys. More info below.

This service is intended to store configuration files that will allow you
to get back up and running quickly, it is not a 1:1
backup of the contents of your flash drive.
It specifically does not backup transient files such as logs.
It backs up the plugin configuration files but not the application files,
as those will automatically be downloaded when the system boots.
It will backup individual files up to 10 MB in size,
and if the overall repository exceeds 100 MB it will be deleted and recreated.

## Restoring a Flash Backup

1. Log in to Unraid Connect.
2. Select **Details**.
3. Click **Generate flash backup** from the Flash backup tile.
4. This will combine your OS configuration data with the OS release version you were running and put them both into a zip file that can be used with our flash creator tool to restore the backup to a new flash device.
5. After the backup has been generated, you can click **Download flash backup** to obtain it.
6. Use the Unraid USB Flash Creator to restore your backup to a new flash drive.

### Additional Steps Required

Once you boot the OS, there are only a few things you will need to reconfigure:

1. On the ***Settings → Management Access → Unraid Connect*** page, click to activate your flash backup again.
2. On the Users page, for each user (including root), you will need to reset your passwords.
3. On the ***Settings → VPN Manager*** page, for each tunnel and peer select the key icon. Click **Generate Keypair** and **Generate Key**, start each tunnel, then download the new client configuration to each associated client device.
4. If your server does not have Internet access when you reboot then you will need to go to ***Apps → Previous Apps*** and reinstall your plugins once you have Internet access. The configuration files will be on your system ready to use once the application files have been installed.

## Disabling Flash Backup

If you no longer wish to use the flash backup service, you can disable it:

1. On the ***Settings → Management Access → Unraid Connect*** page, click to **deactivate** your flash backup.
2. On the resulting confirmation dialog, check the box that says **Also delete cloud backup**. Note that once you do this you will not be able to restore from the backup.
   If you forget to check this box do not worry, the files will automatically be deleted once our systems detect they are not being updated.

## Privacy

### Flash Backups are Not Encrypted

It is important to note that at this time, all backups of your flash
device are stored in our cloud in a non-encrypted format. This is why we
do not store the sensitive data mentioned below.

### Sensitive Data

Until we are able to fully encrypt the flash backups on our servers, to
ensure absolute privacy and integrity we have a few hard and strict
policies regarding the storing of sensitive data. We do not store:

- Unraid root or user account passwords
- Public, private, or shared WireGuard keys
