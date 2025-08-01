---
sidebar_position: 2
sidebar_label: Securing your flash drive
---

# Securing your flash drive

The flash drive is essential to your Unraid server, as it stores all configuration data, licensing, and system settings. Due to its importance, it’s crucial to keep its contents secure and accessible at all times.

## Backups

Having a recent backup of your flash drive ensures you can quickly recover from hardware failures, accidental changes, or data corruption. Be sure to create backups in the following situations:

- Before upgrading Unraid or installing plugins
- After adding or removing drives
- After changing network, share, or security settings
- Before making any major configuration changes
- Periodically, as part of your regular maintenance routine

To back up your flash drive using the Unraid WebGUI, follow these steps:

1. Select your flash drive from the **Main** tab.
2. In the **Flash Device Settings**, click **Flash Backup**.

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Select the Flash backup button](/img/flashbackup.png)

</div>

3. Unraid will create a ZIP file containing the flash drive's contents.
4. Save this ZIP file to a secure location outside your Unraid server (like a separate PC, NAS, or cloud storage).

If you need to recreate your flash drive, use this backup with the [Limetech USB Creator tool](https://unraid.net/download).

:::tip
Keep a screenshot of your disk assignments after any hardware changes. This ensures correct drive placement if you need to restore from your backup.
:::

---

## Network access

You can control whether your flash drive is accessible over the network, similar to other shares in Unraid. However, network access should be restricted since the flash drive contains sensitive configuration and licensing data. Consider the following:

- **Network visibility:** Decide if your flash drive should be visible or hidden on your network.
- **Access rights:** If network access is enabled, set permissions to limit who can view or modify its contents.

:::important Reducing security risks

- **Disable sharing:** Set the flash drive’s SMB export to **No** to prevent network access entirely.
- **Restrict access:** If you must share the flash drive, set security to **Private** and grant access only to trusted users with strong passwords.
- **Avoid public access:** Never leave the flash drive share set to **Public** or **Secure** with guest write access.

These steps help prevent unauthorized changes or exposure of critical files.

:::

---

## Permissions

To enhance system security, files on the flash drive can no longer be given execute permission. This change prevents malicious or unintended code from running directly off the flash drive, reducing the risk of exploitation or accidental system modification.

If you have custom scripts or programs stored on the flash drive, follow these steps:

1. **Copy scripts to an executable location:**  
   - Use `/usr/local/bin` if you want the scripts on the default system path.
   - Automate this by adding copy commands to your `config/go` file.
   - After copying, set the execute permission on the files.

2. **Run scripts with an interpreter:**  
   - Prefix the script with the interpreter (e.g., `bash /boot/config/scripts/myscript.sh`).

This approach keeps your system secure while allowing advanced users to run their scripts.
