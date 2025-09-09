---
sidebar_position: 4
sidebar_label: Licensing FAQ
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Licensing FAQ

This page contains frequently asked questions about Unraid OS licensing. For general troubleshooting questions, see the [main FAQ](faq.md).

---

## Index

- [**License Ownership**](#license-ownership)
  - [Do I own my software license?](#own-license)
- [**Purchasing**](#purchasing)
  - [How do I purchase Unraid?](#purchase-unraid)
  - [How do I redeem a license activation code?](#redeem-activation-code)
  - [I'm a reseller/OEM needing to purchase a license on behalf of my customer. What should I do?](#oem-purchase)
- [**License Management**](#license-management)
  - [How do I upgrade my Unraid license?](#upgrade-license)
  - [How do I manually install my license keyfile to my USB flash device?](#manual-keyfile-install)
  - [How can I determine my registration type?](#registration-type)
- [**License Types & Features**](#license-types--features)
  - [Is Unraid OS a subscription?](#subscription)
  - [What happens if I don't extend my Starter or Unleashed license?](#no-extension)
  - [What happens with pre-releases (Beta/RC versions)?](#pre-release-policy)
  - [What does "unlimited" mean for attached storage devices?](#unlimited-storage)
- [**Troubleshooting**](#troubleshooting)
  - [What happens if my USB flash device fails? Do I have to repurchase a license?](#usb-failure-license)
  - [What should I do if I get an error registering my flash device: '####-####-####-#############' is already registered to another user?](#guid-error)
- [**Trial Licenses**](#trial-licenses)
  - [How do Unraid trials work?](#trial-license)
  - [Can I transfer my trial key to a new flash device?](#trial-key-transfer)

---

## License Ownership

<a id="own-license" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>Do I own my software license?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

When you [purchase an Unraid OS license](https://unraid.net/pricing), you own a perpetual copy of the software. Your license is valid forever and does not expire, even if you choose not to pay for future updates.
</details><br />

---

## Purchasing

<a id="purchase-unraid" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>How do I purchase Unraid?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

You have two options for purchasing Unraid:  
1. **From the %%WebGUI|web-gui%%:** If you have started a trial, you can purchase a license or upgrade directly from the top-right menu in the %%WebGUI|web-gui%%.
2. **With an activation code:** Purchase an Unraid license activation code from the [Unraid website](https://unraid.net/pricing). Activation codes do not expire and can be redeemed at any time.

All licenses are per server. Use the free 30-day trial to ensure Unraid meets your needs before purchasing, as all sales are final.

</details><br />

<a id="redeem-activation-code" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>How do I redeem a license activation code?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

1. Purchase an activation code from the [Unraid website](https://unraid.net/pricing). Your code will be on your purchase receipt.
2. Set up your Unraid server using the [Getting started guide](../getting-started/set-up-unraid/create-your-bootable-media).
3. Log in to your Unraid server's %%WebGUI|web-gui%% (`http://tower` or `http://tower.local` by default).
4. Sign in to your Unraid.net account.
5. Select **Redeem activation code** and enter your code.
6. Your registration key will be emailed to you along with installation instructions.

:::important
Activation codes are one-time use for generating your Unraid license key file.
:::

:::note Instructional Video
Watch the [Activation Code Instructional Video](https://www.loom.com/share/3ceb40440240474aaa80a0b7e3e69cb2) for step-by-step guidance.
:::
</details><br />

<a id="oem-purchase" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>I'm a reseller/OEM needing to purchase a license on behalf of my customer. What should I do?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

You can purchase a license through the %%WebGUI|web-gui%% or by obtaining an activation code from the [Unraid website](https://unraid.net/pricing).

At checkout, select the "OEM" option and enter your purchase details, including your customer's name and email address. The license key will be issued in your customer's name and sent directly to them. You'll also find an invoice download link after checkout.

For bulk OEM/reseller pricing (10 licenses or more), [contact Unraid](https://unraid.net/contact) for special pricing.
</details><br />

---

## License Management

<a id="upgrade-license" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>How do I upgrade my Unraid license?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

You can upgrade your license at any time from within the %%WebGUI|web-gui%% (***Tools → Registration***) or [via the account portal](https://account.unraid.net/keys) (by clicking **••• More** and selecting **Upgrade Key**).

| Upgrade Path             | One-Time Upgrade Fee | New Device Limit¹        |
|--------------------------|----------------------|--------------------------|
| Starter → Unleashed      | $69 USD              | Unlimited²               |
| Starter → Lifetime       | $209 USD             | Unlimited²               |
| Unleashed → Lifetime     | $149 USD             | Unlimited²               |
| Basic → Unleashed        | $49 USD              | Unlimited²               |
| Plus → Unleashed         | $19 USD              | Unlimited²               |
| Basic → Plus             | $89 USD              | Up to 12 devices¹        |
| Basic → Pro              | $139 USD             | Up to 30 devices¹        |
| Plus → Pro               | $109 USD             | Up to 30 devices¹        |

**Annual extension fee** (Starter & Unleashed only): $36 USD

<sup>1</sup> Attached storage devices refers to the total number of drives you may attach before starting the %%array|array%% (does not include the USB flash boot device).  
<sup>2</sup> "Unlimited" means you are not limited by the license, but by hardware and OS constraints. Additional storage devices can be used for %%VMs|vm%%, unassigned devices, or other Unraid features.*
</details><br />

<a id="manual-keyfile-install" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>How do I manually install my license keyfile to my USB flash device?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

<Tabs>
<TabItem value="offline" label="Manual (Offline) method">

1. Ensure you have a recent backup of your USB drive. Use [Unraid Connect](../../unraid-connect/overview-and-setup.md) (recommended) or the local backup option at ***Main → Flash → Flash Backup***.
2. Shut down your Unraid server and remove the USB flash device.
3. Insert the USB flash into another computer.
4. Open the USB drive and copy your `.key` file into the `/config` folder.  
*Make sure this is the only `.key` file present—delete any others.*
5. Safely eject the USB flash device, reinstall it in your server, and reboot.
</TabItem>

<TabItem value="network" label="Network (Online) method">

1. If your server is running and the flash share is visible on your network, navigate to the flash share under **Network**.
2. Drag and drop the registration key file into the `config` directory.
3. In the %%WebGUI|web-gui%%, **Stop** the %%array|array%%, then **Start** the %%array|array%% again to apply the new key.

</TabItem>
</Tabs>
</details><br />

<a id="registration-type" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>How can I determine my registration type?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

Navigate to ***Tools → Registration*** in the %%WebGUI|web-gui%%. Here, you can find your current license type and registration details.
</details><br />

---

## License Types & Features

<a id="subscription" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>Is Unraid OS a subscription?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

No. Unraid OS is a **perpetual license**:

- **Starter** and **Unleashed** include one year of updates, after which you may pay a $36 USD annual extension fee (optional).  
- **Lifetime** includes updates for the life of the product.
- If you choose not to pay the extension fee, you retain your existing version indefinitely; you simply won't receive new major updates.

You continue to own your license even if you stop paying for updates.

</details><br />

<a id="no-extension" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>What happens if I don't extend my Starter or Unleashed license?</h3></a>

<details> 
<summary>Click to expand/collapse</summary>

- You keep your license and can use your current version of Unraid OS indefinitely.
- You won't receive new feature updates or major version upgrades.
- You remain eligible for patch releases and security updates within the same minor version (e.g., 7.1.x if your license lapsed at 7.1.0).
- Once a new minor version is released (e.g., 7.2.0), only security patches are provided for the previous minor version.
- When a version reaches end-of-life (EOL), no further updates are provided.
- You can pay the extension fee at any time to regain access to the latest updates.

</details><br />

<a id="pre-release-policy" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>What happens with pre-releases (Beta/RC versions)?</h3></a>

<details> 
<summary>Click to expand/collapse</summary>

- Pre-release (Beta and Release Candidate) versions are for testing and may contain bugs.
- Only install pre-releases on non-production systems.
- Support for pre-releases ends when the stable version is released.
- Your license must be eligible for OS updates on the stable release date to receive the stable version.
- If your license expires before the stable release, you must extend your license to upgrade or roll back to a supported stable version.
- Your license remains valid after expiration; you only need an active license for new updates.

</details><br />

<a id="unlimited-storage" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>What does "unlimited" mean for attached storage devices?</h3></a>

<details> 
<summary>Click to expand/collapse</summary>

"Unlimited" refers to the maximum number of storage devices you can attach to your Unraid server, based on your license tier. 

Here are the current limits:

| License Tier | %%Parity&#124;parity%%-Protected %%Array&#124;array%%    | Named Pools | Devices per Pool | Total Storage Devices |
|--------------|---------------------------|-------------|------------------|-----------------------|
| Starter      | Up to 6                   | 1           | Up to 6          | 6                     |
| Unleashed    | Up to 30 (28 data + 2 %%parity&#124;parity%%) | Up to 35 | Up to 60         | Unlimited*            |
| Lifetime     | Up to 30 (28 data + 2 %%parity&#124;parity%%) | Up to 35 | Up to 60         | Unlimited*            |

\* *"Unlimited" means you are not limited by the license, but by hardware and OS constraints. Additional storage devices can be used for virtual machines, unassigned devices, or other Unraid features.*
</details><br />

---

## Troubleshooting

<a id="usb-failure-license" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>What happens if my USB flash device fails? Do I have to repurchase a license?</h3></a>

<details> 
<summary>Click to expand/collapse</summary>

No, you do not need to repurchase your license if your USB flash device fails.

To transfer your license:

1. Prepare a new, high-quality [USB flash device](../getting-started/set-up-unraid/create-your-bootable-media).
2. Install Unraid OS on the new device using the USB Flash Creator or a manual method.
3. Boot your server with the new flash device.
4. Go to ***Tools → Registration*** in the %%WebGUI|web-gui%%.
5. Click **Replace Key** and follow the prompts to transfer your license to the new device.

The first transfer can be done at any time, while subsequent transfers are allowed once every 12 months using the automated system. If you need to transfer your license again before the 12-month period, contact Unraid support with your old and new USB %%GUID|guid%%s for manual assistance.

:::tip
Routinely back up your USB device using [Unraid Connect](../../unraid-connect/overview-and-setup.md) to simplify recovery and avoid data loss.
:::
</details><br />

<a id="guid-error" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>What should I do if I get an error registering my flash device: '####-####-####-#############' is already registered to another user?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

This error indicates that your USB flash device does not have a unique hardware ID (%%GUID|guid%%), which prevents it from being registered with the Unraid OS. To resolve this issue, use a different USB flash drive. Brands known for having unique %%GUID|guid%%s include Lexar, Samsung, Kingston, and PNY.
</details><br />

---

## Trial Licenses

<a id="trial-license" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>How do Unraid trials work?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

- Trial licenses last 30 days and provide full Unraid Pro functionality without a storage device limit. 
- You'll need a quality USB flash drive and the Unraid USB Creator tool.
- Consult the [Getting Started guide](../getting-started/set-up-unraid/create-your-bootable-media) for server setup instructions.
- Trial licenses require an internet connection at boot for initial validation.
- You can extend your trial up to two times (details below).
</details><br />

<a id="trial-key-transfer" class="anchor-fix" style={{ fontWeight: "bold" }}><h3>Can I transfer my trial key to a new flash device?</h3></a>

<details>
<summary>Click to expand/collapse</summary>

No, trial registrations are only valid on the original USB flash device. If you want to purchase a license, you can transfer your configuration to a new flash device and then purchase a registration key; however, the trial cannot be continued on a new device.
</details><br />
