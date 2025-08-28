---
sidebar_position: 4
sidebar_label: Complete your post-setup essentials
---

# Complete your post-setup essentials

Congratulations on your initial setup!  

Now, it's time to explore a few more important aspects that will enhance your server's functionality and security.

## Back up your flash device

Always back up your Unraid flash device after making significant configuration changes. Regular backups are *highly* recommended.

To back up your flash device, go to the **Main** tab, select the device, and click on **Flash Backup**.

:::warning
Store backups outside the Unraid %%array|array%% for easy access if the %%array|array%% isn't operational. [Learn more about flash device management here](../../system-administration/maintain-and-update/changing-the-flash-device.md).
:::

:::note
Alternatively, use the [Unraid Connect](../../../unraid-connect/overview-and-setup.md) plugin for automated backups to LimeTech's cloud servers.
:::

## Use the built-in help

Unraid provides extensive help text for settings in the %%WebGUI|web-gui%%. Enable it by clicking the ![Help icon](/img/helpicon.png) icon at the top-right corner. You can also toggle help on individual fields by clicking their names. The %%WebGUI|web-gui%% help will typically offer the most up-to-date information help information.

 <div style={{ margin: 'auto', maxWidth: '500px'}}>

   ![Built in Help](/img/toolbar.png)

 </div>

## Review security best practices

Since your Unraid server contains valuable data, it's wise to review the [security best practices](../../system-administration/secure-your-server/security-fundamentals.md) in the documentation to avoid potential attacks and protect your information.

## Unraid Connect

[Unraid Connect](../../../unraid-connect/overview-and-setup.md) is a plugin for Unraid that can be found in the Community Applications section. With Unraid Connect, you can manage all your server instances through a [unified dashboard](https://connect.myunraid.net/).

![Unraid Connect Dashboard](/img/unraidconnectdashboard.png)

Unraid Connect uses your Unraid.net credentials for access management and communicates with our cloud servers over a secure connection. 

For more information on how we handle your data, please refer to the [Privacy section](../../../unraid-connect/overview-and-setup.md#data-collection-and-privacy) in our Unraid Connect documentation.

## Link your license key to your account

If you have an existing Unraid license key but haven't linked it to your Unraid.net account yet, you can do so to enable additional features and easier license management.

Benefits of linking your license key include:

- **Centralized management:** View and manage all your licenses from your Unraid.net account
- **Easy access:** Download your license key files from anywhere
- **Enhanced support:** Streamlined support experience with linked account information
- **Prerelease access:** Download beta and release candidate versions if eligible

To link your license key:

1. **From the WebGUI:**
   - Go to ***Tools → Registration*** in your Unraid server's WebGUI
   - Click **Sign in to Unraid.net** if you haven't already
   - Your license key will automatically be linked to your account

2. **From the account portal:**
   - Visit [account.unraid.net/keys](https://account.unraid.net/keys)
   - Sign in with your Unraid.net credentials
   - Click **Link Existing Key** and follow the prompts

3. **During server setup:**
   - If you're setting up a new server with an existing license, you can sign in to your Unraid.net account during the initial configuration
   - Your license will be automatically linked

:::note
Linking your license key to your account is a one-time process. Once linked, you can manage your license from either the WebGUI or your online account portal.
:::

:::important
If you're having trouble linking your license key, ensure that:

- Your Unraid.net account email matches the email associated with your license purchase
- You're using the correct license key file
- Your server has internet access for account verification

:::

For more detailed information about license management, see the [licensing FAQ](../../troubleshooting/licensing-faq.md).
