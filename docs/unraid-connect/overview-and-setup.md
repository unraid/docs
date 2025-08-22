---
sidebar_position: 1
sidebar_label: Overview and setup
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Unraid Connect overview & setup

**Unraid Connect** is a cloud-enabled companion designed to enhance your Unraid OS server experience. It makes server management, monitoring, and maintenance easier than ever, bringing cloud convenience directly to your homelab or business setup.

Unraid Connect works seamlessly with Unraid OS, boosting your server experience without altering its core functions. You can think of Unraid Connect as your remote command center. It expands the capabilities of your Unraid server by providing secure, web-based access and advanced features, no matter where you are.

With Unraid Connect, you can:

- Remotely access and manage your Unraid server from any device, anywhere in the world.
- Monitor real-time server health and resource usage, including storage, network, and Docker container status.
- Perform and schedule secure online flash backups to protect your configuration and licensing information.
- Receive notifications about server health, storage status, and critical events.
- Use dynamic remote access and server deep linking to navigate to specific management pages or troubleshoot issues quickly.
- Manage multiple servers from a single dashboard, making it perfect for users with more than one Unraid system.

Unraid Connect is more than just an add-on; it's an essential extension of the Unraid platform, designed to maximize the value, security, and convenience of your Unraid OS investment.

[**Click here to dive in to Unraid Connect!**](https://connect.myunraid.net)

## Data collection and privacy

<details>
<summary><strong>Click to see what data is collected and how we handle it</strong></summary>

Unraid Connect prioritizes your privacy and transparency. Here’s what you need to know about how we handle your data:

<h3>What data is collected and why</h3>

When your server connects to Unraid.net, it establishes a secure connection to our infrastructure and transmits only the necessary data required for a seamless experience in the Unraid Connect Dashboard. This includes:

- Server hostname, description, and icon
- Keyfile details and flash %%GUID|guid%%
- Local access URL and LAN IP (only if a certificate is installed)
- Remote access URL and WAN IP (if remote access is turned on)
- Installed Unraid version and uptime
- Unraid Connect plugin version and unraid-api version/uptime
- %%Array|array%% size and usage (only numbers, no file specifics)
- Number of Docker containers and %%VMs|vm%% installed and running

We use this data solely to enable Unraid Connect features, such as remote monitoring, management, and notifications. It is not used for advertising or profiling.

<h3>Data retention policy</h3>

- We only keep the most recent update from your server; no past data is stored.
- Data is retained as long as your server is registered and using Unraid Connect.
- To delete your data, simply uninstall the plugin and remove any %%SSL|ssl%% certificates issued through Let's Encrypt.

<h3>Data sharing</h3>

- Your data is **not shared with third parties** unless it is necessary for Unraid Connect services, such as certificate provisioning through Let's Encrypt.
- We do not collect or share any user content, file details, or personal information beyond what is specified above.

For more details, check out our [Policies](https://unraid.net/policies) page.
</details>

## Installation

Unraid Connect is available as a plugin that requires Unraid OS 6.10 or later. Before you start, make sure your server is connected to the internet and you have the [Community Applications](/docs/unraid-os/using-unraid-to/run-docker-containers/community-applications.md) plugin installed.

To install Unraid Connect:

1. Navigate to the **Apps** tab in the Unraid %%WebGUI|web-gui%%.
2. Search for **Unraid Connect** and proceed to install the plugin. Wait for the installation to fully complete before closing the dialog.
3. In the top right corner of your Unraid %%WebGUI|web-gui%%, click on the Unraid logo and select **Sign In**.

<div style={{ margin: 'auto', maxWidth: '358px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Unraid Connect icon](/img/icon_unraidconnect.png)

</div>

4. Sign in with your Unraid.net credentials or create a new account if necessary.
5. Follow the on-screen instructions to register your server with Unraid Connect.
6. After registration, you can access the [Unraid Connect Dashboard](https://connect.myunraid.net) for centralized management.

:::note
Unraid Connect requires a myunraid.net certificate for secure remote management and access. To provision a certificate, go to ***Settings → Management Access*** in the %%WebGUI|web-gui%% and click **Provision** under the Certificate section.
:::

## Dashboard

The **Unraid Connect Dashboard** offers a centralized, cloud-based view of all your registered Unraid servers, with features like:

- **My Servers:** All linked servers appear in a sidebar and as interactive tiles for easy selection.
- **Status (at a glance):** Quickly see which servers are online or offline, along with their Unraid OS version, license type, and recent activity.
- **Health and alerts:** Visual indicators show server health, notifications, and update status.

When you click **Details** on a server, you will see:

- **Online/Offline:** Real-time connectivity status.
- **License type:** Starter, Unleashed, or Lifetime.
- **Uptime:** Duration the server has been running.
- **Unraid OS version:** Current version and update availability.
- **Storage:** Total and free space on all arrays and pools.
- **Health metrics:** CPU usage, memory usage, and temperature (if supported).
- **Notifications:** Hardware/software alerts, warnings, and errors.
- **Flash backup:** Status and date of the last successful backup.

---

## Managing your server remotely

:::tip
To use all management features, provision a myunraid.net certificate under ***Settings → Management Access*** on your server.
:::

With a valid **myunraid.net** certificate, Unraid Connect enables secure, remote server management directly from the Connect web interface.

Remote management features include:

- **Remote WebGUI access:** Access the %%WebGUI|web-gui%% from anywhere.
- **Array controls:** Start or stop %%array|array%%s and manage storage pools.
- **Docker and VM management:** View, start, stop, and monitor containers and %%VM|vm%%s.
- **Parity & Scrub:** Launch %%parity check|parity-check%% or %%ZFS|zfs%%/%%BTRFS|btrfs%% scrub jobs
- **Flash backup:** Trigger and monitor flash device backups to the cloud.
- **Diagnostics:** Download a diagnostics zip for support
- **Notifications:** Review and acknowledge system alerts.
- **Server controls:** Reboot or shut down your server remotely.
- **User management:** Manage Unraid.net account access and registration.

You can manage multiple servers from any device - phone, tablet, or computer - with a single browser window.

### DNS rebinding protection

DNS rebinding protection is a security feature on many routers that prevents public DNS entries from resolving to local IP addresses. This helps protect your network from certain attacks, but can cause issues when trying to use %%SSL|ssl%% certificates for local access to the Unraid %%WebGUI|web-gui%%.

If you encounter a DNS rebinding error while trying to provision an %%SSL|ssl%% certificate (e.g., after clicking the **Provision** button), consider the following steps:

- Click **OK** on the error message, wait for 2 to 5 minutes, and try again.
- If the error continues, check your router settings for options related to "DNS rebinding protection" or similar terms.
- Allow DNS rebinding for the `myunraid.net` domain.
- Keep in mind that DNS changes can take time to propagate, so you may see the error again after making updates.

The exact steps may vary based on your router model and firmware.

### Accessing your server when DNS is down

When %%SSL|ssl%% is enabled, you typically access your Unraid server using a fully qualified domain name (FQDN), such as:

```
https://ip.yourpersonalhash.myunraid.net
```

Or, if you're using a custom HTTPS port:

```
https://ip.yourpersonalhash.myunraid.net:<https_port>
```

This ensures you're using a valid %%SSL|ssl%% certificate for secure access. However, if your Internet connection goes down and your browser hasn't cached the DNS entry, you may lose access to the %%WebGUI|web-gui%%.

If you lose DNS or Internet access:

- If **Use SSL/TLS** is set to **Yes**, try accessing your server at:
  ```
  https://[servername].[localTLD]
  ```
  Or with a custom port:
  ```
  https://servername.[localTLD]:<https_port>
  ```

- If this doesn't work, or if **Use SSL/TLS** is set to **Strict**:
   1. Use telnet, SSH, or a directly connected keyboard/monitor to log into your server.
   2. Run the command:
      ```bash
      use_ssl no
      ```
   3. You can now access the %%WebGUI|web-gui%% at:
      ```
      http://<ip_address>
      ```
      Or, if using a custom port:
      ```
      http://<server_ip>:<http_port>
      ```
      (Note: this uses HTTP, not HTTPS.)

Once Internet access is restored, go to ***Settings → Management Access*** and set **Use SSL/TLS** back to **Strict** to re-enable local SSL.

### Disabling SSL for local access

You should disable %%SSL|ssl%% for local access if you prefer a simple HTTP connection on your trusted home network or if you're facing ongoing issues with %%SSL|ssl%% certificate provisioning, DNS rebinding, or browser compatibility.

To disable %%SSL|ssl%% for local access:

1. Go to ***Settings → Management Access*** in the WebGUI.
2. Set **Use SSL/TLS** to **No**.
3. Click **Apply**.

This change will also disable the Remote Access feature, as %%SSL|ssl%% is necessary for secure remote connections.

:::caution
Disabling %%SSL|ssl%% means your %%WebGUI|web-gui%% will be accessible over unencrypted HTTP. This exposes your login credentials and session data to anyone on your local network and is not recommended unless you are confident your network is secure and you do not need remote access. For the best security, keep %%SSL|ssl%% enabled whenever possible.
:::

:::note
You do not need to uninstall the Unraid Connect plugin to disable %%SSL|ssl%%. %%SSL|ssl%% management is a core feature of Unraid and does not rely on the plugin.
:::

---

## Deep linking

Deep linking in Unraid Connect lets you jump directly to specific sections of your Unraid %%WebGUI|web-gui%% with a single click. Simply click any of the circled link buttons (below) in the Connect interface to go straight to the relevant management page for your server.

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Deep linking](/img/Deep-linking.png)

</div>

---

## Customization

Unraid Connect provides a flexible dashboard experience, allowing you to personalize your server view and appearance. The customization options are organized below for easy reference.

<Tabs>
<TabItem value="banner" label="Change banner image">

To display your server’s banner image on the Connect dashboard, upload or select a banner image from your %%WebGUI|web-gui%% under ***Settings → Display Settings → Banner***. This banner will automatically appear in your Connect dashboard for that server.

</TabItem>
<TabItem value="arrange" label="Rearrange dashboard tiles">

You can customize your dashboard layout by dragging and dropping server tiles. In the Connect dashboard, click the hamburger (≡) button on any tile to rearrange its position. This allows you to prioritize the information and the services most important to you.

</TabItem>
<TabItem value="theme" label="Switch themes">

Toggle between dark and light mode by clicking the Sun or Moon icon on the far right of the Connect UI. Your theme preference will be instantly applied across the Connect dashboard for a consistent experience.

</TabItem>
</Tabs>

---

## License management

Managing your licenses in Unraid Connect is easy. Under the **My Keys** section, you can:

- View or reissue a key to a new USB.
- Upgrade your license tier directly from the Connect UI.
- Download registration key files for backup or transfer.
- Review license status and expiration (if applicable).

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![My Keys](/img/mykeys.png)

</div>

You don’t need to leave the Connect interface to manage or upgrade your licenses.

---

## Language localization

Unraid Connect supports multiple languages to cater to a global user base. You can change your language preference through the language selector in the Connect interface.

To change your language preference:

1. Open the Connect UI.
2. Go to the language selector.

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Language selector](/img/languageselector.png)

</div>

3. Select your preferred language from the list.

The interface will update automatically to reflect your selection.

---

## Signing out

You can sign out of Unraid Connect anytime from ***Settings → Management Access → Unraid Connect → Account Status*** by clicking the **Sign Out** button.

When you sign out:

- Your server remains listed on the Connect dashboard, but you lose access to remote management features.
- Remote access, cloud-based flash backups, and other Unraid Connect features will be disabled for that server.
- You can still download your registration keys, but you cannot manage or monitor the server remotely until you sign in again.
- Signing out does **not** disconnect your server from the local network or affect local access.

---

## Uninstalling the plugin

When you uninstall the Unraid Connect plugin:

- All flash backup files will be deactivated and deleted from your local flash drive.
- Cloud backups are marked for removal from Unraid servers; they will be retained for 30 days, after which they are permanently purged. For immediate deletion, [disable Flash Backup](./automated-flash-backup.md) before uninstalling.
- Remote access will be disabled. Ensure that you remove any related port forwarding rules from your router.
- Your server will be signed out of Unraid.net.

:::note
Uninstalling the plugin does **not** revert your server’s URL from `https://yourpersonalhash.unraid.net` to `http://computername`. If you wish to change your access URL, refer to [Disabling SSL for local access](#disabling-ssl-for-local-access).
:::

---

## Connection errors

If you encounter connection errors in Unraid Connect, [open a terminal](../unraid-os/system-administration/advanced-tools/command-line-interface.md) from the %%WebGUI|web-gui%% and run:

```
unraid-api restart
```
