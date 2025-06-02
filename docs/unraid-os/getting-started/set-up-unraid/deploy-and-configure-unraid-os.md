---
sidebar_position: 2
sidebar_label: Deploy & configure Unraid OS
---

# Deploy & configure Unraid OS

After booting Unraid OS for the first time, you'll use the WebGUI to complete your system configuration. This interface lets you manage your server, set up storage, configure user shares, and control features like hardware virtualization and Docker containers.

## Connect to the Unraid WebGUI

You can connect to the WebGUI in two ways:

- **GUI Mode:** Boot Unraid in GUI mode and sign in using `root` as the username with no initial password.
- **Web Browser:** On another device on your local network, visit `http://tower.local`. If you set a different hostname, use that instead of `tower` (i.e., for the hostname `unraidserver`, you'd visit `http://unraidserver.local`).

:::important
The Unraid server is accessible on your LAN as soon as it’s fully booted. You can find the IP address on your router’s DHCP client list or by using a network scanning tool.
:::

## Set a root password

When you access the WebGUI for the first time, you'll be prompted to create a strong password for the root user.

Make sure your password is:

- Unique
- At least 8 characters long.  (Although, best practice recommends 12+ for the most secure passwords!)
- A mix of letters, numbers, and special characters

<div style={{ margin: 'auto', maxWidth: '300px'}}>

![Set root password](/img/Set_root_password.png)

</div>

:::info
We recommend using a password manager for secure storage.
:::

:::tip
If you forget your root password, you can reset it following the [Unraid documentation](https://docs.unraid.net/unraid-os/manual/security/reset-root-password/). You can also update your password in the Users page of the WebGUI.
:::

## Register your license key

After setting your root password, log in to your Unraid.net account to obtain a license key:

1. In the WebGUI, go to the **Get Started** section.
    <div style={{ margin: 'auto', maxWidth: '500px'}}>

    ![Get started](/img/Upc_get_started.png)

    </div>
2. Sign in or create an account, after which a trial key will be installed automatically.
    <div style={{ margin: 'auto', maxWidth: '500px'}}>

    ![Install trial key](/img/Upc_install_trial_key.png)

    </div>

    This process allows you to manage your Unraid OS license keys, obtain new keys, recover lost ones, or upgrade your license.

:::important
For details on your license, visit **Tools > Registration** in the WebGUI.
:::

## BIOS Recommendations

Before deploying Unraid OS, it's important to verify your system's BIOS and storage controller settings. Below, you can find a checklist to help ensure compatibility, stability, and access to key features.

<details>
    <summary>See below for our BIOS and Storage Controller Checklist</summary>

    Proper BIOS and storage controller configuration is vital for a stable Unraid OS deployment. Use this checklist before your first boot.

### Basic Settings

 ✅ Set the **USB flash drive** as the primary boot device.  
 ✅ Configure the storage controller to **AHCI** mode with **SATA** connections.  
 ✅ Set the controller to **HBA mode** (not **RAID**).  
 ✅ Avoid front panel USB ports, and instead opt for USB ports located directly on the motherboard I/O panel.  

### Advanced Settings

 ✅ Enable **hardware virtualization** features (e.g., **Intel VT-x** or **AMD-V**) for **virtual machines (VMs)**.  
 ✅ Enable **IOMMU** support for PCI device assignment to VMs.

### Troubleshooting Tips

If Unraid OS does not boot, try:

 ✅ Adjusting the boot order to: **Forced-FDD**, **USB-HDD**, **USB-ZIP**.  
 ✅ Disabling USB 2.0/3.0 support.  
 ✅ Toggling any **Fast Boot** features.  
 ✅ Toggling USB keyboard support.

For further assistance, visit the [Unraid general support forum](https://forums.unraid.net/).

:::important
Many motherboards limit boot device selection to 12 hard drives. If your **USB flash drive** is recognized as a hard drive, you may not be able to boot from it after installing 12 physical hard drives. Configure the BIOS to treat the flash drive as a removable device whenever possible.
:::

</details>
