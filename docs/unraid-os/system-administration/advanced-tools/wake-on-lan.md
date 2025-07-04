---
sidebar_position: 2
sidebar_label: Wake-on-LAN (WoL)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Wake-on-LAN (WoL)

Wake-on-LAN (WoL) lets you remotely wake your Unraid server from a shutdown or sleep state by sending a "magic packet" over the network. This page will help you set up WoL for your local network.

:::note
This guide does not cover IPMI management or WoL over the internet.
:::

## Requirements

For WoL to work properly, make sure you meet the following requirements:

- **NIC support**: Your network interface controller should support WoL; most modern NICs do.
  
- **BIOS/UEFI settings**: Enable WoL in your motherboard's BIOS/UEFI under power management. Here are some common setting names:
  
  | Setting name                     | Description                          |
  |----------------------------------|--------------------------------------|
  | **Wake on LAN**                  | Generic WoL setting                 |
  | **PME event wake-up**            | For PCIe wake events                |
  | **Power on by PCI/PCIe devices** | Alternate name for WoL              |
  | **ErP ready**                    | Must be *disabled* for WoL to work |

- **Power connection**: Ensure your server is plugged into a power source.
  
- **Network connection**: Connect your server to your LAN with an Ethernet cable (WiFi WoL is not supported).

## Putting an Unraid server to sleep

Putting your Unraid server into a sleep state helps conserve power while maintaining the system's state in RAM. This allows the server to quickly resume operation when needed, without requiring a full reboot. To use Wake-on-LAN (WoL), you must first configure your server to enter sleep mode correctly and ensure that WoL is enabled on the network interface.

1. Connect to your Unraid server using the WebGUI terminal or SSH.

2. Identify your primary network interface (usually `eth0`):

   ```
   ifconfig
   ```

   Take note of the MAC address (listed as `ether`).

3. Enable WoL on the interface:

   ```
   ethtool -s eth0 wol g
   ```

4. Put the server to sleep:

   ```
   echo -n mem > /sys/power/state
   ```

:::caution Persistence
WoL settings are **not persistent** across reboots. To make them permanent:

1. Create a `go` file on your flash drive at `/boot/config/go`.
2. Add this line:

```
/sbin/ethtool -s eth0 wol g
```

:::

## Wake your Unraid server

To wake your Unraid server remotely, you need to send a special "magic packet" over your local network. This packet includes your server's MAC address and instructs the network interface to power on the system from a sleep or shutdown state. Different operating systems provide various tools and methods for sending this packet. Below are specific instructions for Windows, macOS, and Linux.

<Tabs>
<TabItem value="Windows" label="Windows">

<h4>Using WakeOnLan CMD</h4>

1. Download [wolcmd.exe](https://www.depicus.com/wake-on-lan/wake-on-lan-cmd).
  
2. Run it in Command Prompt:

   ```
   wolcmd.exe <MAC_ADDRESS> <SERVER_IP> 255.255.255.255
   ```

</TabItem>
<TabItem value="macOS" label="macOS">

<h4>Terminal method (recommended)</h4>

1. Install `wakeonlan` using Homebrew:
   ```
   brew install wakeonlan
   ```

2. Send the magic packet:

   ```
   wakeonlan MAC_ADDRESS
   ```

<h4>GUI alternative: miniWOL</h4>

1. Download [miniWOL v3](https://apps.apple.com/app/miniwol/id6474282023) from the App Store.
  
2. Add your server using its MAC address.
  
3. Click the sun icon to wake your server.

</TabItem>
<TabItem value="Linux" label="Linux">

<h4>Terminal method</h4>

   ```
   wakeonlan MAC_ADDRESS
   ```
   *Install it with `sudo apt install wakeonlan` if it's not already installed.*

<h4>Alternative: WoL GUI</h4>

You can install a `wol` GUI frontend from your Linux distribution's package manager.

</TabItem>
</Tabs>
