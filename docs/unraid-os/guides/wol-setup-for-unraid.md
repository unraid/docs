# How To Setup Wake On LAN (WOL) for UNRAID

(assuming onboard NIC and WOL activated in motherboard's BIOS)

## Put to sleep

1. Webterminal or SSH into server
1. Type `ifconfig` and note IP-address and MAC-Address (ether) of used NIC
1. Type `ethtool -s eth0 wol g`
1. Type `echo -n mem > /sys/power/state`

## Wake up using

### MacOS / Linux / Windows

1. Download "MiniWOL2" from [https://www.tweaking4all.com/home-theatre/miniwol2/](https://www.tweaking4all.com/home-theatre/miniwol2/) and install
1. Click miniicon, push "Add" button and name the device to wake (Alias in Menu)
1. Set "IPv4 Address" (manually or select from ARP List) and "MAC-Address" (manually or click on 'detect') in appropriate fields
1. Set "Broadcast" 255.255.255.255
1. Push "Test" to wake-up device (needs to be in sleep mode: see above)

### Windows: (ALTERNATIVE)

1. Download "wolcmd.exe" from https://www.depicus.com/wake-on-lan/wake-on-lan-cmd and unpack
1. Open command line prompt and cd to dowload directory
1. Type `wolcmd.exe <ether> <ip-dest> 255.255.255.255`

### Linux: (ALTERNATIVE)

1. Type `wakeonlan <MAC-Address>` OR
1. Type `wol <MAC-Address>`

For Guide assistance, see: https://forums.unraid.net/topic/103531-guide-setup-wol-for-unraid/
