# Set up Wake-on-LAN (WOL)

You can set up the Unraid server to wake up from a shutdown or sleep state by sending what is known as a magic packet over the network. A magic packet is a special data packet that contains the target computer's media access control (MAC) address and network broadcast address along with the WoL configurations. You can send the packet from any computer, usually in the same network, or even from a smartphone if you have the right software.

:::note

This guide does not cover advanced management of the Unraid server through IPMI or WOL over the Internet

:::

## Requirements

Some hardware and software requirements must be in place for this to work:
* Your network interface controller (NIC), must support WOL
* The chipset and BIOS of your computer must have a setting for WOL, and it must be enabled. The BIOS option varies from BIOS to BIOS, but these are usually located in a power management menu. Here are a few examples of the options listed by different BIOS vendors:
  * **Wake on LAN**
  * **PME Event wake-up**
  * **Power on by PCI/PCIe devices**
  * **Intel VT-x**
  * **AMD-V**
* The Unraid server must be connected to a power outlet, and to your local area network (LAN) via a network cable
* The computer is shut down or in a sleep state.

## Put an Unraid server to sleep

1. Use the web terminal in the WebGUI, or SSH into the server.
2. Type `ifconfig` and note the IP address and MAC Address (the `ether` value, that is a 12-character alphanumeric attribute), of the network interface card in use. If you have just one, it is most likely `eth0`.
3. Type `ethtool -s eth0 wol g`.
4. Type `echo -n mem > /sys/power/state`.

This will trigger a sleep state on your Unraid server. This suspends your machine's state in RAM and saves power. The Unraid server can be woken by:

* Pressing a key on the keyboard, if one is attached.
* Pressing the power button on the machine.
* Sending the machine a magic packet and triggering a Wake-on-LAN.

## Wake up an Unraid server in MacOS / Linux / Windows

Here is an example for a OS-agnostic app called MiniWOL, which can run under MacOS, Linux, and Windows.

1. Download the [MiniWOL v.2](https://www.tweaking4all.com/home-theatre/miniwol2/) application and install it.
2. Run the app. If it's already running, it will display in the system tray.
3. Right-click the app icon in the tray.
4. Select **Settings** in the app's context menu.
5. Under **Select Network Device Details** enter:
    * A name for the network device, for example *Unraid server*.
    * The IPv4 and MAC addresses for the device (you can see this in the Unraid WebGUI, in the **Settings** menu, under **Network Settings**).
6. Close the window.
7. Right-click the miniWOL icon in the system tray. The newly-created item displays in the menu.
8. Select the name of the device to wake it up.

### Alternative method (Windows)

1. Download [wolcmd.exe](https://www.depicus.com/wake-on-lan/wake-on-lan-cmd) and unpack to a folder of your choosing.
2. Open the Windows command line.
3. CD to the folder where you extracted the executable.
4. Type `wolcmd.exe <ether> <ip-dest> 255.255.255.255`, where `<ether>` is the MAC address for the computer you want to wake up, and `<ip-dest>` is the IPv4 address of the machine.

### Alternative method (Linux)

1. Open the terminal.
2. Type `wakeonlan <MAC-Address>` or `wol <MAC-Address>`.
