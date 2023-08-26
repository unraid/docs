---
sidebar_position: 1
---

# Good Practices

We have compiled a set of recommendations to help you secure your server. While not all may apply to your specific scenario, they provide a solid foundation to preserve the security and privacy of your system.

## \#1 Set a strong root password

Similar to many routers, Unraid systems do not have a password set by default. This ensures you can quickly and easily access the management console immediately after initial installation. However, this doesn't mean you shouldn't set one. Doing this is simple. Just navigate to the **Users** tab and select the root user. Now set a password. From then on, you will be required to authenticate anytime you attempt to login to the webGUI.

:::tip

There is a plugin available in Community Apps called **Dynamix Password Validator**. This plugin will provide guidance on how strong of a password you're creating, based on complexity rules (how many capital vs. lowercase letters, numbers, symbols, and overall password length are all used to judge this). Consider installing this for extra guidance on password strength. Once installed it is available in the settings for any user to give guidance on the strength of any password you type in.

You could also use [this webpage](https://bitwarden.com/password-strength/) to get a very quick assessment of the strength of any specific password.

:::

## \#2 Review port mappings on your router

Forwarding ports to your server is required for specific services that you want to be Internet-accessible such as Plex, FTP servers, game servers, VoIP servers, etc. But forwarding the wrong ports can expose your server to significant security risk.

Here are just a few ports you should be extra careful with when forwarding:

* **Port 80**: Used to access the webGUI without SSL - unless you've rebound access to another port on the **Management Access** settings page. Forwarding this port by default will allow you to access the webGUI remotely, but without SSL securing the connection, devices in between your browser and the server could "sniff" the packets to see what you're doing. If you want to make the webGUI remotely accessible, install the [Unraid Connect](/connect/about.md) plugin, which can provide a secure remote access solution that utilizes SSL to ensure your connection is fully encrypted.
* **Port 443**: Used to access the webGUI with SSL. This is only better than port 80 if you have a root password set. If no root password is set and you forward this port, unauthorized users can connect to your webGUI and have full access to your server and any data on it. In addition, if you forward this port without using the [Unraid Connect](/connect/about.md) plugin, attempts to connect to the webGUI through a browser will present a security warning due to the lack of an SSL certificate.
  Consider making life easier for yourself and utilize the [Unraid Connect](/connect/about.md) plugin to enable simple, safe, and secure remote access to your Unraid systems.
* **Port 445**: Used for SMB (shares). If you forward this port to your server, any public shares can be connected to by any user over the internet. Generally speaking, it is never advisable to expose SMB shares directly over the internet. If you need the ability to access your shares remotely, we suggest utilizing a [WireGuard VPN](./vpn.md) to create a secure tunnel between your device and the server. In addition, if the flash device itself is exported using SMB and this port is forwarded, its contents can easily be deleted and your paid key could easily be stolen. Just don't do this.
* **Port 111/2049:** Used for NFS (shares). Although NFS is disabled by default, if you need to use this protocol, make sure you aren't forwarding these ports through your router. Similar to SMB, just utilize WireGuard to create a secure tunnel from any remote devices that need to connect to the server over NFS.
* **Port 22/23:** Used by Telnet and SSH for console access.
  Especially dangerous for users that don't have a root password set.
  Similar to SMB, we don't recommend forwarding these ports at all, but rather, suggest users leverage a WireGuard VPN connection for the purposes of connecting using either of these protocols.
* **Ports in the 57xx range:** These ports are generally used by VMs for VNC access. While you can forward these ports to enable VNC access remotely for your VMs, the better and easier way to do this is through installing the [Unraid Connect](/connect/about.md) plugin.
  This ensures that those connections are secure via SSL and do not require individual ports to be forwarded for each VM.

:::tip

Generally speaking, you really shouldn't need to forward many ports to your server. If you see a forwarding rule you don't understand, consider removing it, see if anyone complains, and if so, you can always put it back.

:::

## \#3 Never put your server in your network's DMZ

We cannot stress this enough. No matter how locked down you think you have your server, it is never advisable to place it in the DMZ on your network. By doing so, you are essentially forwarding every port on your public IP address to your server directly, allowing all locally accessible services to be remotely accessible as well. Regardless of how "locked down" you think you actually have the server, placing it in the DMZ exposes it to unnecessary risks.

Never, *ever*, do this.

## \#4 Set security on your shares to private

The convenience of password-less share access is pretty great. We know that and it's why we don't require you to set passwords for your shares. However, there is a security risk posed to your data when you do this, even if you don't forward any ports to your server and have a strong root password. If another device on your network such as a PC, Mac, phone, tablet, IoT device, etc... were to have its security breached, it could be used to make a local connection to your server's shares. By default, shares are set to be publicly readable/writeable, which means those rogue devices can be used to steal, delete, or encrypt the data within them. In addition, malicious users could also use this method to put data on your server that you don't want. It is for these reasons that if you are going to create public shares, we highly recommend setting access to read-only. Only authorized users with a strong password should be able to write data to your shares.

## \#5 Don't expose the flash share, and if you do, make it private

The flash device itself can be exposed over SMB. This is convenient if you need to make advanced changes to your system such as modifying the go file in the config directory. However, the flash device itself contains the files needed to boot Unraid as well as your configuration data (disk assignments, shares, etc). Exposing this share publicly can be extremely dangerous, so we advise against doing so unless you absolutely have to, and when you do, it is advised to do so privately, requiring a username and password to see and modify the contents.

## \#6 Keep your server up-to-date

Regardless of what other measures you take, keeping your server current with the latest release(s) is vital to ensuring security. There are constant security notices (CVEs) published for the various components used in Unraid OS. Here at Lime Technology we do our best to ensure all vulnerabilities are addressed in a timely manner with software updates. However, these updates are useless to you if you don't apply them in a timely manner as well. Keeping your OS up-to-date is easy. Just navigate to ***Tools > Update OS*** to check for and apply any updates. You can configure notifications to prompt you when a new update is available from the ***Settings > Notifications*** page.

## \#7 Use a secure method for remote administration

It is possible to set up an Unraid server so that it can safely be administered remotely but this should never be done by simply exposing the Unraid webGUI to the internet.

A frequent way to secure such a connection is to use VPN technology. Unraid includes as standard the WireGuard VPN, and an OpenVPN plugin and Docker container is also available. In addition many routers have built in VPN support which can be used.

An alternative for making the webGUI remotely accessible is to install the [Unraid Connect](/connect/about.md) plugin, which can provide a secure remote access solution that utilizes SSL to ensure your connection is fully encrypted.
