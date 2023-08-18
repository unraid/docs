---
sidebar_position: 5
---

# VPN

:::caution

Unraid servers are not hardened against attack via the network so should never be exposed to the internet without use of a VPN.

:::

If you want to make secure connections between an Unraid server and the Internet then you want to use a technology known as VPN (Virtual Private Network). VPN works on a client/server model where you have a server that accepts incoming connections and a client that initiates such connections.

In short, the idea behind VPN connections is to set up an encrypted 'tunnel' between the client and server ends so that no malicious players can intercept or eavesdrop on your interactions. Such tunnels are set up so that only authorized users are able to make such connections. More information on VPN as a technology can be found in [this wiki article](https://en.wikipedia.org/wiki/Virtual_private_network)

There are 2 common Use Cases that Unraid users are likely to have:

* **Remote Access to Unraid from the Internet**: This is by far the commonest use case and many users want to be able to safely access their Unraid servers (and potentially their whole home LAN) when away from home. When running in this mode the server end of the VPN link will either be running on the user's router (if it supports such a feature) or will be hosted on the Unraid server.
* **Remote Access from Unraid to the Internet**: This is used when you want applications running on Unraid to access the internet. This could be to access generic internet content or to access another server located remotely to the Unraid server. If in is generic access to the internet then it is highly likely that the server end of such connection will be via a commercial VPN provider. When running in this mode Unraid will be acting as the client end of any VPN link.

There are a wide variety of VPN solutions available both free and commercial.

As of Unraid 6.8, the WireGuard VPN service is available to address secure access to/from the internet. However, if you are running Docker containers and exposing them to the internet, then their security needs to be assessed on a case-by-case basis. In such a case, you may need to contact the developer of the container to determine how safe it is to expose it to the internet.

There is a level of protection as a docker container runs in a 'sandboxed' environment so the level of access to the content of your disks is constrained to what you allow in the path mapping settings for the container. If running VMs that are exposed to the internet then you need to apply the same security to these that you would apply to a physical PC attached to the local LAN.

## Router

Many modern routers have a VPN server built-in as standard (typically based on OpenVPN).

Using your router to provide the VPN support has the great advantage of not needing any other component on your home LAN to be operational for the VPN to function. Once setup it should allow you to access all devices on your home LAN in a similar manner to when you are directly connected to the LAN.

ISP-supplied routers are the least secure of your options, as they are well-known to malicious users and easier to access due to the existence of superuser-like accounts maintained by the ISP.

## OpenVPN

This has been the way that has historically been advocated to allow connections to be made between an Unraid server and the internet.

OpenVPN is a well-established solution so if you want to use OpenVPN then you can search Community Applications for a plugin or docker container that meets your requirements. You may also find the [SpaceInvaderOne YouTube video](https://www.youtube.com/watch?v=fpkLvnAKen0) of use in setting it up.

## WireGuard

### Overview

![Wireguard logo](@site/docs/unraid-os/assets/Wireguard.png)

Unraid 6.8 introduces built-in support for WireGuard VPN connections. The intention is to make it as easy as possible for Unraid users to set up VPN connections to/from their Unraid servers.

Some points to note about the Unraid WireGuard implementation are:

* The WireGuard service is built into Unraid so there is no need to add 3rd party software to achieve a VPN connection.
* The WireGuard service can be set to auto-start as part of the Unraid boot process.
* The WireGuard service is available even if the array is not started.
* WireGuard uses a light-weight protocol so performance tends to be better than OpenVPN.

More information about WireGuard can be found on the [WireGuard website](https://www.wireguard.com/). It should be noted that WireGuard is still labeled as "experimental" by its developers but many users are already finding that it appears to be robust enough for everyday use. Several commercial VPN services are working on adding WireGuard support adding to the belief it is mature enough.

The initial Unraid implementation includes adding the WireGuard kernel modules to the standard Unraid distribution and starting the WireGuard services as part of the Unraid boot process, but does not yet have the management of WireGuard built-in. At the moment the GUI part is offered as a separate plugin, but it is intended that it will be integrated into Unraid in the future. This approach allows for quick updates and enhancements without dependency on Unraid version releases. The Unraid WireGuard GUI plugin can be installed via Community Applications, and when it is installed you will find that an entry called **VPN Manager** is added to the GUI under ***Settings > Network Services***.

:::tip

Note that the Unraid WireGuard plugin is still evolving so in the event of a discrepancy between what is described here and the following forum threads then it is likely that the thread is correct and this documentation needs updating. These threads are also the appropriate place to ask questions regarding Unraid's WireGuard implementation.

* [forum thread](https://forums.unraid.net/topic/84229-dynamix-wireguard-vpn/) on the Dynamix WireGuard plugin
* [forum thread](https://forums.unraid.net/topic/84226-wireguard-quickstart/) covering setting up incoming connections.
* [forum thread](https://forums.unraid.net/topic/84316-wireguard-vpn-tunneled-access/) covering setting up outgoing connections.

:::

What can you do with WireGuard? Let's walk through each of the connection types:

* **Remote access to server**: Use your phone or computer to remotely access your Unraid server, including:
  * Unraid administration via the webGUI
  * Access dockers, VMs, and network shares as though you were physically connected to the network
* **Remote access to LAN**: Builds on "Remote access to server", allowing you to access your entire LAN as well.
* **Server to server access**: Allows two Unraid servers to connect to each other.
* **LAN to LAN access**: Builds on "Server to server access", allowing two entire networks to communicate. May require additional settings.
* **Server hub & spoke access**: Builds on "Remote access to server", except that all of the VPN clients can connect to each other as well. Note that all traffic passes through the server.
* **LAN hub & spoke access**: Builds on "Server hub & spoke access", allowing you to access your entire LAN as well.
* **VPN tunneled access**: Route traffic for specific Dockers and VMs through a commercial WireGuard VPN provider.
* **Remote tunneled access**: Securely access the Internet from untrusted networks by routing all of your traffic through the VPN and out Unraid's Internet connection.

The following diagram attempts to show these different connection types in a graphical format

![](@site/docs/unraid-os/assets/Wireguard-help.png)

### Incoming VPN Connections

This section will walk through how to setup WireGuard so that your trusted devices can VPN into your home network to access Unraid and the other systems on your network.

#### Implementation considerations

* You must be running Unraid 6.8 with the Dynamix WireGuard plugin installed via the **Apps** tab (Community Applications).
* Be aware that WireGuard is technically classified as experimental. It has not gone through a full security audit yet and has not reached 1.0 status. But it is the first open-source VPN solution that is extremely simple to install, fast, and designed from the ground up to be secure.
* Understand that giving someone VPN access to your LAN is just like giving them physical access to your LAN, except they have it 24x7 when you aren't around to supervise. Only give access to people and devices that you trust, and make certain that the configuration details (particularly the private keys) are not passed around insecurely. Regardless of the "connection type" you choose, assume that anyone who gets access to this configuration information will be able to get full access to your network.
* This guide works great for simple networks. But if you have Dockers with custom IPs or VMs with strict networking requirements, please see the [Complex Networks](#complex-networks) section.
* Unraid will automatically configure your WireGuard clients to connect to Unraid using your current public IP address, which will work until that IP address changes. To future-proof the setup, you can use Dynamic DNS instead. There are many ways to do this, probably the easiest is described in this [2 minute video from SpaceInvaderOne](https://www.youtube.com/watch?v=9FkQ0wYpCV0).
* If your router has UPnP enabled, Unraid will be able to automatically forward the port for you. If not, you will need to know how to configure your router to forward a port.
* You will need to install WireGuard on a client system. It is available for many operating systems as mentioned at [WireGuard clients](https://www.wireguard.com/install/). Android or iOS make good first client systems because you can get all the details via QR code.

#### Setting up the Unraid side of the VPN tunnel

* First, go to ***Settings > Network Settings > Interface eth0***. If **Enable bridging** is set to *Yes*, then WireGuard will work as described below. If bridging is disabled, then none of the **Peer type of connections** that involve the local LAN will work properly. As a general rule, bridging should be enabled in Unraid.

![](@site/docs/unraid-os/assets/enable-bridging.png)

* If UPnP is enabled on your router and you want to use it in Unraid, go to Settings -\> Management Access and confirm "Use UPnP" is set to Yes
* On Unraid go to ***Settings > VPN Manager***

![](@site/docs/unraid-os/assets/wg0.png)

* Give the **VPN Tunnel** a name, for example *MyHome VPN*.
* Select **Generate Keypair**. This will generate a set of public and private keys for Unraid. Take care not to share the private key by accident (such as in a screenshot like this).
* By default, the local endpoint will be configured with your current public IP address. If you chose to setup DDNS earlier, change the IP address to the DDNS address.
* Unraid will recommend a port to use. You typically won't need to change this unless you already have WireGuard running elsewhere on your network.
* Select Apply.
* If Unraid detects that your router supports UPnP, it will automatically setup port forwarding for you:

![](@site/docs/unraid-os/assets/upnp-yes.png)

* If you see a note that says "configure your router for port forwarding\..." you will need to login to your router and setup the port forward as directed by the note:

![](@site/docs/unraid-os/assets/upnp-no.png)

* Some tips for setting up the port forward in your router:
  * Both the external (source) and internal (target/local) ports should be set to the value Unraid provides. If your router interface asks you to put in a range, use the same port for both the starting and ending values. Be sure to specify that it is a UDP port and not a TCP port.
  * For the internal (target/local) address, use the IP address of your Unraid system shown in the note.
  * Google can help you find instructions for your specific router, i.e. "how to port forward Asus RT-AC68U".
* Note that after **Apply**, the public and private keys are removed from view. If you ever need to access them, click the "key" icon on the right-hand side.

![](@site/docs/unraid-os/assets/key.png)

* Similarly, you can access other advanced settings by pressing the "down chevron" on the right-hand side. They are beyond the scope of this guide, but you can turn on help to see what they do.
* In the upper right corner of the page, change the Inactive slider to Active to start WireGuard. Optionally, you can set the tunnel to autostart when Unraid boots.

![](@site/docs/unraid-os/assets/activate.png)

There have been cases where this step has been omitted and users end up wondering why the WireGuard VPN link is not working!

#### Defining a Peer (client)

1. Select **Add Peer**.
  ![](@site/docs/unraid-os/assets/peer-add.png)
2. Give it a name, such as *MyAndroid*.
3. For the initial connection type, choose *Remote access to LAN*. This will give your device access to Unraid and other items on your network.
4. Click "Generate Keypair" to generate public and private keys for the client. The private key will be given to the client/peer, but take care not to share it with anyone else (such as in a screenshot like this)
5. For an additional layer of security, click "Generate Key" to generate a preshared key. Again, this should only be shared with this client/peer.
6. Click Apply.

:::info

Technically, the peer should generate these keys and not give the private key to Unraid. You are welcome to do that, but it is less convenient as the config files Unraid generates will not be complete and you will have to finish configuring the client manually.

:::

##### Caution

It can be a little risky to add a new client ("peer") to WireGuard if you are already connected remotely using WireGuard as adding a new peer sometimes toggles the WireGuard tunnel off which will render you unable to reconnect. This is because a configuration change is made effective by disabling the tunnel with the current (old) configuration and then activating it with the updated (new) configuration. If there is any sort of configuration conflict at this point the tunnel remains inactive, and you can no longer connect to the Unraid server.

#### Configuring a Peer (client)

* Select the eye icon to view the peer configuration. If the button is not selectable, you must first apply or reset your unsaved changes.

![](@site/docs/unraid-os/assets/peer-eye.png)

![](@site/docs/unraid-os/assets/peer-view.png)

* If you are setting up a mobile device, choose the "Create from QR code" option in the mobile app and take a picture of the QR code. Give it a name and make the connection. The VPN tunnel starts almost instantaneously, once it is up you can open a browser and connect to Unraid or another system on your network. Be careful not to share screenshots of the QR code with anyone, or they will be able to use it to access your VPN.
* If you are setting up another type of device, download the file and transfer it to the remote computer via trusted email or dropbox, etc. Then unzip it and load the configuration into the client. Protect this file, anyone who has access to it will be able to access your VPN.

#### About DNS

The Dynamix WireGuard plugin includes a "Peer DNS Server" option

If you are having trouble with DNS resolution on the WireGuard client, return to the VPN Manager page in Unraid and switch from Basic to Advanced mode, add the IP address of your desired DNS server into the "Peer DNS Server" field, then install the updated config file on the client. You may want to use the IP address of the router on the LAN you are connecting to, or you could use a globally available IP like 8.8.8.8

This is required for "Remote tunneled access" mode if the client's original DNS server is no longer accessible after all traffic is routed through the tunnel.

If you are using any of the split tunneling modes, adding a DNS server may provide name resolution on the remote network, although you will lose name resolution on the client's local network in the process. The simplest solution is to add a hosts file on the client that provides name resolution for both networks.

#### Complex Networks

The instructions above should work out of the box for simple networks. With "Use NAT" defaulted to Yes, all network traffic on Unraid uses Unraid's IP, and that works fine if you have a simple setup.

However, if you have Dockers with custom IPs or VMs with strict networking requirements, things may not work right (I know, kind of vague, but feel free to read the two WireGuard threads for examples)

A partial solution is:

* In the WireGuard config, set "Use NAT" to No
* In your router, add a static route that lets your network access the WireGuard "Local tunnel network pool" through the IP address of your Unraid system. For instance, for the default pool of 10.253.0.0/24 you should add this static route:
  * Network: 10.253.0.0/16 (aka 10.253.0.0 with subnet 255.255.0.0)
  * Gateway: `<IP address of your Unraid system>`
* Note that this covers the entire class B 10.253.x.x network, so you can add other WireGuard tunnels without having to modify your router setup again.

With these changes, your network should work normally. However, your WireGuard clients still may not be able to access Dockers on custom IPs or VMs. If you find a solution to this, please ask questions in the forum threads mentioned earlier.

#### Troubleshooting WireGuard

WireGuard is not a chatty protocol, in fact, it is designed to be invisible! There aren't really any error messages if things aren't working, it either works or it doesn't. It cannot be detected by a port scanner.

If you can't connect, it will mainly be an exercise in double-checking your work:

* Confirm that the tunnel is active (!)
* Confirm that your DDNS is pointed at your current public IP address, and is assigned to your "Local endpoint"
* Confirm that you forwarded the correct UDP port through your router to Unraid, and assigned that same port to the "Local endpoint"
* If you made any changes to your configuration after setting up your clients, you will need to set the clients up again so they have the latest config.
* Be sure you save your changes before you press "View Peer Config", otherwise your QR codes/files will not have the latest data.

A few other ideas:

* For your first client, setup a phone using its data connection (not wifi). This eliminates issues related to the client network, and the QR code is the easiest way to transfer settings. Once you have it working from your phone, move on to other clients.
* Disable any energy saving features on the client, phones in particular may not use VPNs properly when in low power mode. Also, you may need to disable any "Data Saver" features on the phone so that VPN is not throttled. See this post
* If your "Peer type of connection" includes one of the LAN options but you can only access Unraid, go to Settings -> Network Settings and see whether "Enable bridging" is yes.  If bridging is disabled, you will not be able to access your LAN over WireGuard.
* If you are connecting from another network over the Internet, be sure that the networks on both sides use different subnets. You can't connect two networks that both use 192.168.1.0/24, for instance.
* If you can connect from some locations but not others, keep in mind that the "broken" remote locations may have a firewall that blocks UDP traffic. Hopefully, WireGuard will support TCP in the future, but currently, there is no workaround for this.
* If nothing is working properly, switch to advanced mode and confirm that the "Local tunnel network pool" is not already in use on your network or on one of the networks you are connecting to. If there is a conflict you will need to change it to a different private network (10.0.0.0 to 10.255.255.255 \| 172.16.0.0 to 172.31.255.255 \| 192.168.0.0 to 192.168.255.255)
* If you can't reach the Unraid webGUI for some reason and you need to prevent a WireGuard tunnel from automatically starting, delete this file from your flash drive and reboot:

`/boot/config/wireguard/autostart`

* Note that if you have Dockers with custom IPs or VMs with strict networking requirements, you will likely have issues. Please see the "Complex Networks" section above.

### Outgoing VPN Connections

This section explains how to make an outgoing WireGuard VPN connection from an Unraid server to a commercial VPN provider. If you are trying to access your Unraid network from a remote location, see the section on
making inbound connections. There is a [forum thread](https://forums.unraid.net/topic/84316-wireguard-vpn-tunneled-access/) discussing making an outbound VPN connection using WireGuard

#### Commercial VPN Providers

Several commercial VPN providers now support WireGuard. A few are listed below but this is not intended to be an exhaustive list. No endorsement is implied, you need to research and determine which one meets your needs.

* [TunSafe](https://tunsafe.com/vpn) (currently free)
* [Azire VPN](https://www.azirevpn.com/cfg/wireguard)
* [Mullvad](https://mullvad.net/en/guides/category/wireguard/)
* [IVPN](https://www.ivpn.net/setup/gnu-linux-wireguard.html)
* [TorGuard VPN](https://torguard.net/blog/what-is-wireguard-vpn/)
* [NordVPN](https://nordvpn.com/blog/nordlynx-protocol-wireguard/) Not sure this works without using the NordLynx client so may not be compatible with the Unraid implementation.

Note that with the current state of WireGuard, VPN providers cannot guarantee the same amount of privacy as they can with OpenVPN. See [here](https://restoreprivacy.com/wireguard/) for more detail.
Typically the objections are not around security, but around the fact that it is harder for them to guarantee that they cannot track you.

#### Configuring VPN tunneled access

* Download a config file from your preferred commercial VPN provider
* On the Settings -\> VPN Manager page, click the "Import Config" button and select the file on your hard drive. This will create a new tunnel specific to this provider.
* There are no settings to change, except perhaps to give it a name. Click Apply.
* Note: You do not need to forward any ports through your router for this type of connection
* Change the Inactive slider to Active
* Now ALL of your Unraid traffic will go through the commercial VPN tunnel.
  * In the future it may be possible to restrict it so that only specific Dockers use the VPN tunnel. Until then, you may need to disable the tunnel in order to check for plugin updates or perform other Unraid administrative tasks.
  * Note that currently, Unraid will ignore any DNS server that is specified in the downloaded config file. Unraid's DNS should be set to something that will work whether the tunnel is up or down, such as 8.8.8.8 and 8.8.4.4

#### Testing the tunnel

* Using Community Applications, install a browser such as the jlesage/Firefox Docker container
* Accept all defaults
* Launch Firefox and visit <https://whatismyipaddress.com/> you should see that your IP address is in the country you selected when you signed up with the provider

### Support

WireGuard is a new feature in Unraid so the forum is the place to ask questions and get the most up-to-date information on using WireGuard with Unraid. The threads most likely to be of interest are:

* [forum thread](https://forums.unraid.net/topic/84229-dynamix-wireguard-vpn/) on the Dynamix WireGuard plugin
* [forum thread](https://forums.unraid.net/topic/84226-wireguard-quickstart/) covering setting up incoming connections.
* [Forum thread](https://forums.unraid.net/topic/84316-wireguard-vpn-tunneled-access/) covering setting up outgoing connections.

["WireGuard" and the "WireGuard" logo are registered trademarks of Jason A. Donenfeld.](https://www.wireguard.com/)
