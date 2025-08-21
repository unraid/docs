---
sidebar_position: 3
sidebar_label: Changing the flash device
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Changing the flash device

The USB flash device is critical to your Unraid server as it stores the operating system, configuration files, and license. If this device fails or becomes unreliable, prompt replacement is essential to avoid data loss and minimize downtime.

:::caution
When you replace your Unraid USB flash device, your license is transferred to the new device, and the old flash device is blacklisted **and can no longer be used with Unraid.** This action is permanent and cannot be undone.
:::

Some common indicators that your USB flash device may need to be replaced include:

- The server will not boot, or files are missing from the device.
- The device repeatedly enters read-only mode or shows file system errors.
- The device is lost or stolen.
- Storage capacity is insufficient for updates or configuration changes.
- The physical size of the device does not fit your server setup.

---

## Selecting a replacement device

When choosing a new USB flash drive for Unraid, focus on reliability and compatibility over speed. 

<h4>Requirements</h4>

| Requirement                 | Details                                                                                   |
|-----------------------------|------------------------------------------------------------------------------------------|
| USB version                 | USB 2.0 recommended (typically more reliable and widely compatible than USB 3.0)        |
| Unique GUID                 | Must contain a unique hardware GUID in programmable ROM                                  |
| Minimum size                | At least 4 GB                                                                            |
| Maximum recommended size     | 32 GB (for ease of manual installs; larger devices may work but are not necessary)       |
| Brand/vendor                | Purchase from reputable brands and trusted retailers; avoid second-hand or gray-market   |
| Physical size               | Choose a form factor that fits your server’s available USB ports and physical constraints|

For more guidance on selecting the best flash device for Unraid, check out [Spaceinvader One's video guide on USB flash drive testing](https://www.youtube.com/watch?v=jjkaidlZmgs).

:::tip Rules of thumb for replacement

- Avoid auction sites and unknown sellers by buying USB drives from reputable retailers.
- Avoid second-hand or previously used drives.
- Test the new drive on your server before transferring your license.
- Be cautious with well-known brands, as counterfeit products are common.

   :::note
   The [forum announcement on counterfeit SanDisk drives](https://forums.unraid.net/topic/119052-psa-on-sandisk-usbs/) from January 2022 confirms SanDisk is not recommended due to counterfeit devices and manufacturing changes resulting in non-unique GUIDs. This affects both counterfeit and legitimate SanDisk drives.
   :::

---

## Replacing your USB flash device

:::caution Before you replace

Before replacing your current flash device, consider checking it for errors:

1. Shut down your server and remove the flash device.
2. Insert the device into a Windows or Mac computer.
3. Use Windows Scandisk or Mac Disk Utility to check for and repair errors.
4. If errors are found and repaired, you may continue using the device. If issues persist or recur, replacement is recommended.

A single power outage or incomplete write can sometimes cause minor corruption, which is usually repairable. However, repeated issues signal the need for a new device.
:::

There are two ways to replace your Unraid USB flash device: the recommended [USB flash creator tool](https://unraid.net/download) for Windows or macOS, or the manual method for advanced users. **Always back up your flash device before starting.**

### Backing up your flash device

<Tabs>
<TabItem value="webgui" label="Using the WebGUI" default>

1. Go to the **Main** tab and select your flash device.
2. Under **Flash device settings**, click **FLASH BACKUP** to download a zipped backup to your computer.

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Flash Backup](/img/flashbackup.png)

</div>

Alternatively, use [Unraid Connect](https://connect.myunraid.net/) for automated flash backups, but be aware, sensitive data like passwords and %%WireGuard|wireguard%% keys are **excluded** from cloud backups, while Docker templates with potentially sensitive information are **included**.

</TabItem>
<TabItem value="manual" label="Manual copy">

1. Shut down your server and remove the flash device.
2. Insert it into another computer.
3. Copy all files from the flash drive to a safe backup location.

</TabItem>
</Tabs>

<details>
<summary><strong>What if I can't back up my device?</strong> - Click to expand/collapse</summary>

If your flash device has failed and no backup is available:

1. Prepare a new flash device using the [USB flash creator](https://unraid.net/download) or manual method.
2. Copy your old license key file (if available) into the `boot/config` directory on the new device.
3. Assign your disks to the %%array|array%%/%%cache|cache%% exactly as before. Keep a screenshot of your disk assignments for reference.
4. If you’re unsure about disk assignments, ask for help in the Unraid forums before starting the array.

</details>

:::tip Backup best practices

- Regularly back up your flash device, especially after major configuration changes.
- Store backups off-server (on another computer or cloud storage).
- Keep a screenshot of your disk assignments after any hardware changes.
:::

:::important Trial keys and device changes

If you transfer a trial configuration to a new flash device, you will not be able to start the %%array|array%% until you purchase a valid registration key. Trial keys only work on the original device.
:::

### Replacement methods

<Tabs>
<TabItem value="creator" label="Using the USB flash creator" default>

*Recommended for most users*

1. Download the [Unraid USB flash creator tool](https://unraid.net/download) for Windows or macOS.
2. Insert your new USB flash device into your computer.
3. In the creator tool, select **Local zip** and browse to your backup ZIP file.

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Select version](/img/Selectversion.png)

</div>

4. Choose your new USB flash device as the destination and click **Write**.
5. Shut down your server, replace the old flash device with the new one, and power on.
6. When prompted with `Invalid, missing or expired registration key`, select **Registration key**.

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Invalid Key](/img/Invalidkey.png)

</div>

7. If needed, copy your existing license key file into `boot/config` on the new device.
8. Ensure only one key file exists in the config folder.
9. In ***Tools → Registration***, select **Replace key** and enter your email address.

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Invalid Key](/img/Replacekey.png)

</div>

10. Follow the instructions in the email to install your new key.
11. Once complete, select **Done**.

:::important
If you see a "keyfile is not valid" error, your key may be blacklisted or not the last valid key. [Contact Unraid support](https://unraid.net/support) for assistance.
:::

</TabItem>
<TabItem value="manual" label="Manual method">

*Use this method if the USB flash creator tool does not work for your system.*

:::important Before you begin  
Use the manual method only if you are comfortable with basic file management and your system does not support the USB flash creator.
:::

1. Prepare a new flash device following the [Manual install method](../../getting-started/set-up-unraid/create-your-bootable-media.md#manual-install-method).
2. Copy your backed-up `config` folder to the new flash device, overwriting existing files.
3. Shut down the server, swap the flash devices, and power on.
4. When prompted with `Invalid, missing or expired registration key`, select **Registration key**.

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Invalid Key](/img/Invalidkey.png)

</div>

5. In ***Tools → Registration***, select **Replace key** and enter your email address.

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Invalid Key](/img/Replacekey.png)

</div>

6. Follow the instructions in the email to install your new key.
7. Select **Done**.

</TabItem>
</Tabs>

You have now replaced your USB flash device and transferred your Unraid registration key. The system will display the registration date and the next eligible replacement date.

---

## Registration key replacement frequency

Replacing your Unraid registration key is straightforward, but there are important details about timing and eligibility to keep in mind.

- You can replace your registration key at any time. However, after the first replacement, you must wait **12 months** before using the automated online method again.
- If you need to replace your key again within 12 months, [contact Unraid support](https://unraid.net/contact). For faster service, include your old and new USB %%GUIDs|guid%%, your license key, and the email address used for purchase.

:::important
If you're locked out due to exceeding the automated replacement limit and need immediate server access, set up a new Unraid trial with a new USB drive, then contact support to transfer your license.
:::

---

## Recovering from a failed flash device without a backup

Losing your flash device and not knowing your disk assignments can be stressful, but you can avoid data loss by taking careful steps.

:::caution
Never assign a data disk as a %%parity drive|parity-drives%%. Incorrect assignments can overwrite data with parity information, resulting in permanent data loss.
:::

:::tip Identifying drives

- **%%Parity drives|parity-drives%%** do not have a mountable file system. If a drive cannot be mounted, it is likely a %%parity|parity%% drive.
- **Data drives** previously used by Unraid retain their data even after resetting the %%array|array%% configuration.
- If you find more unmountable drives than expected %%parity|parity%% drives, stop and seek help in the [Unraid forums](https://forums.unraid.net/).
:::

To safely reconfigure your %%array|array%%:

1. Prepare a fresh Unraid flash drive, following the instructions provided earlier in this guide.
2. Edit `/boot/config/disk.cfg` and set `startArray="no"` to prevent the %%array|array%% from starting automatically.  
   - Alternatively, you can use ***Settings → Disk Settings*** in the GUI to disable auto-start.
3. Navigate to ***Tools → New Config*** to create a new %%array|array%% configuration.
   - Assign all drives as data drives and start the %%array|array%%.
   - Note the serial numbers of drives that do not mount; these are likely your %%parity|parity%% drives.
   - You can also use the [**Unassigned Devices** plugin](https://unraid.net/community/apps?q=unassigned+devices#r:~:text=don%27t%20be%20carefull!!!-,Unassigned%20Devices,-dlandon) to test-mount each drive, identifying %%parity|parity%% by elimination.
4. Go to ***Tools → New Config*** again and create a new %%array|array%% configuration, retaining all the currently configured drives.
5. Assign the correct drives as %%parity|parity%% and the rest as data drives in the **Main** tab.
6. If you have a single %%parity|parity%% drive, the order of data drives is not critical - check **Parity is Valid**. For dual %%parity|parity%%, both the order of the data drives and the assignment of parity1 and parity2 are important.  Parity1 and parity2 are not interchangeable, and %%parity|parity%% must be rebuilt.
7. Start the %%array|array%% to commit assignments. Data drives should mount, and their contents should remain intact.
8. If you checked **Parity is Valid**, run a correcting [%%parity|parity%% check](../../../using-unraid-to/manage-storage/array-configuration.md#checking-array-devices) to confirm that your configuration is correct.

:::note
After restoring your %%array|array%%, verify any share-specific include/exclude settings, as the order of data drives may have changed.
:::

---

\* *"%%WireGuard|wireguard%%" and the "%%WireGuard|wireguard%%" logo are registered trademarks of Jason A. Donenfeld.*
