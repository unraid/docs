How To Setup WOL for UNRAID:
(assuming onboard NIC and WOL activated in motherboard's BIOS)

 

*Put to sleep*
1. Webterminal or SSH into server
2. Type "ifconfig" and note IP-address and MAC-Address (ether) of used NIC
2. Type "ethtool -s eth0 wol g"
3. Type "echo -n mem > /sys/power/state"

 

*Wake up* using
1. MacOS / Linux / Windows
a) Download "MiniWOL2" from https://www.tweaking4all.com/home-theatre/miniwol2/ and install
b) Click miniicon, push "Add" button and name the device to wake (Alias in Menu)
c) set "IPv4 Address" (manually or select from ARP List) and "MAC-Address" (manually or click on 'detect') in appropriate fields
d) Set "Broadcast" 255.255.255.255
e) Push "Test" to wake-up device (needs to be in sleep mode: see above)

 

2. Windows: (ALTERNATIVE)
a) Download "wolcmd.exe" from https://www.depicus.com/wake-on-lan/wake-on-lan-cmd und unpack
b) Open command line prompt and move to do dowload directory
c) type "wolcmd.exe <ether> <ip-dest> 255.255.255.255    

 

3. Linux: (ALTERNATIVE)
a) Type "wakeonlan <MAC-Address>" OR
b) Type "wol <MAC-Address>"

For Guide assistance, see: https://forums.unraid.net/topic/103531-guide-setup-wol-for-unraid/
