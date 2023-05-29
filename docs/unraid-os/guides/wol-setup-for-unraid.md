# How To Setup Wake On LAN (WOL) for UNRAID

(assuming onboard NIC and WOL activated in motherboard's BIOS)

## Put to sleep

- Webterminal or SSH into server
- Type `ifconfig` and note IP-address and MAC-Address (ether) of used NIC
- Type `ethtool -s eth0 wol g`
- Type `echo -n mem > /sys/power/state`

## Wake up using

### MacOS / Linux / Windows

- Download "MiniWOL2" from <https://www.tweaking4all.com/home-theatre/miniwol2/> and install
- Click miniicon, push "Add" button and name the device to wake (Alias in Menu)
- Set "IPv4 Address" (manually or select from ARP List) and "MAC-Address" (manually or click on 'detect') in appropriate fields
- Set "Broadcast" 255.255.255.255
- Push "Test" to wake-up device (needs to be in sleep mode: see above)

### Windows: (ALTERNATIVE)

- Download "wolcmd.exe" from <https://www.depicus.com/wake-on-lan/wake-on-lan-cmd> and unpack
- Open command line prompt and cd to dowload directory
- type `wolcmd.exe <ether> <ip-dest> 255.255.255.255`

### Linux: (ALTERNATIVE)

- Type `wakeonlan <MAC-Address>` OR
- Type `wol <MAC-Address>`

For Guide assistance, see: <https://forums.unraid.net/topic/103531-guide-setup-wol-for-unraid/>
