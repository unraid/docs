# Security

This section covers various security-related aspects of Unraid

## Good Practices

An Unraid server is likely to contain data that is sensitive or that a
user would hate to lose. Since most users will have their home network
connected to the internet then precautions should be taken to avoid an
Unraid server being compromised by malicious actors trying to access
them remotely..

The following simple guidelines will help avoid many common pitfalls
that some user encounter regarding the security of their Unraid servers.

Review the below recommendations on your server(s) to ensure they are
safe.

There is also a [forum
thread](https://forums.unraid.net/topic/104669-warning-unraid-servers-exposed-to-the-internet-are-being-hacked/)
that discusses this topic.

### Set a strong root password

Similar to many routers, Unraid systems do not have a password set by
default. This is to ensure you can quickly and easily access the
management console immediately after initial installation. However, this
doesn't mean you shouldn't set one. Doing this is simple. Just
navigate to the Users tab and click on root. Now set a password. From
then on, you will be required to authenticate anytime you attempt to
login to the webGui.

In addition, there is a plugin available in Community Apps called
_Dynamix Password Validator_. This plugin will provide guidance on how
strong of a password you're creating based on complexity rules (how
many capital vs. lowercase letters, numbers, symbols, and overall
password length are used to judge this). Consider installing this for
extra guidance on password strength. Once installed it is available in
the settings for any user to give guidance on the strength of any
password you type in.

You could also use [this web
page](https://bitwarden.com/password-strength/) to get a very quick
assessment of the strength of any specific password.

### Review port mappings on your router

Forwarding ports to your server is required for specific services that
you want to be Internet-accessible such as Plex, FTP servers, game
servers, VoIP servers, etc. But forwarding the wrong ports can expose
your server to significant security risk. Here are just a few ports you
should be extra careful with when forwarding:

- **Port 80**: Used to access the webGui without SSL (unless you've
  rebound access to another port on the Management Access settings
  page). Forwarding this port by default will allow you to access the
  webGui remotely, but without SSL securing the connection, devices in
  between your browser and the server could "sniff" the packets to
  see what you're doing. If you want to make the webGui remotely
  accessible, install the [Unraid Connect](/connect/about.md) plugin, which can provide a
  secure remote access solution that utilizes SSL to ensure your
  connection is fully encrypted.

- **Port 443**: Used to access the webGui with SSL. This is only
  better than port 80 if you have a root password set. If no root
  password is set and you forward this port, unauthorized users can
  connect to your webGui and have full access to your server. In
  addition, if you forward this port without using the [Unraid Connect](/connect/about.md)
  plugin, attempts to connect to the webGui through a browser will
  present a security warning due to the lack of an SSL certificate.
  Consider making life easier for yourself and utilize the [Unraid Connect](/connect/about.md)
  plugin to enable simple, safe, and secure remote access to your
  Unraid systems.

- **Port 445**: Used for SMB (shares). If you forward this port to
  your server, any public shares can be connected to by any user over
  the internet. Generally speaking, it is never advisable to expose
  SMB shares directly over the internet. If you need the ability to
  access your shares remotely, we suggest utilizing a WireGuard VPN to
  create a secure tunnel between your device and the server. In
  addition, if the flash device itself is exported using SMB and this
  port is forwarded, its contents can easily be deleted and your paid
  key could easily be stolen. Just don't do this.

- **Port 111/2049:** Used for NFS (shares). While NFS is disabled by
  default, if you are making use of this protocol, just make sure you
  aren't forwarding these ports through your router. Similar to SMB,
  just utilize WireGuard to create a secure tunnel from any remote
  devices that need to connect to the server over NFS.

- **Port 22/23:** Used by Telnet and SSH for console access.
  Especially dangerous for users that don't have a root password set.
  Similar to SMB, we don't recommend forwarding these ports at all,
  but rather, suggest users leverage a WireGuard VPN connection for
  the purposes of connecting using either of these protocols.

- **Ports in the 57xx range:** These ports are generally used by VMs
  for VNC access. While you can forward these ports to enable VNC
  access remotely for your VMs, the better and easier way to do this
  is through installing the [Unraid Connect](/connect/about.md) plugin.
  This ensures that those connections
  are secure via SSL and does not require individual ports to be
  forwarded for each VM.

Generally speaking, you really shouldn't need to forward many ports to
your server. If you see a forwarding rule you don't understand,
consider removing it, see if anyone complains, and if so, you can always
put it back.

### Never ever ever put your server in the DMZ

No matter how locked down you think you have your server, it is never
advisable to place it in the DMZ on your network. By doing so, you are
essentially forwarding every port on your public IP address to your
server directly, allowing all locally accessible services to be remotely
accessible as well. Regardless of how "locked down" you think you
actually have the server, placing it in the DMZ exposes it to
unnecessary risks. Never ever do this.

### Consider setting shares to private with users and passwords

The convenience of password-less share access is pretty great. We know
that and its why we don't require you to set passwords for your shares.
However, there is a security risk posed to your data when you do this,
even if you don't forward any ports to your server and have a strong
root password. If another device on your network such as a PC, Mac,
phone, tablet, IoT device, etc. were to have its security breached, it
could be used to make a local connection to your server's shares. By
default, shares are set to be publicly readable/writeable, which means
those rogue devices can be used to steal, delete, or encrypt the data
within them. In addition, malicious users could also use this method to
put data on your server that you don't want. It is for these reasons
that if you are going to create public shares, we highly recommend
setting access to read-only. Only authorized users with a strong
password should be able to write data to your shares.

### Don't expose the Flash share, and if you do, make it private

The flash device itself can be exposed over SMB. This is convenient if
you need to make advanced changes to your system such as modifying the
go file in the config directory. However, the flash device itself
contains the files needed to boot Unraid as well as your configuration
data (disk assignments, shares, etc). Exposing this share publicly can
be extremely dangerous, so we advise against doing so unless you
absolutely have to, and when you do, it is advised to do so privately,
requiring a username and password to see and modify the contents.

### Keep your server up-to-date

Regardless of what other measures you take, keeping your server current
with the latest release(s) is vital to ensuring security. There are
constant security notices (CVEs) published for the various components
used in Unraid OS. We here at Lime Technology do our best to ensure all
vulnerabilities are addressed in a timely manner with software updates.
However, these updates are useless to you if you don't apply them in a
timely manner as well. Keeping your OS up-to-date is easy. Just navigate
to Tools \> Update OS to check for and apply any updates. You can
configure notifications to prompt you when a new update is available
from the Settings \> Notifications page.

### Use a secure method for remote administration

It is possible to set up an Unraid server so that it can safely be
administered remotely but this should never be done by simply exposing
exposing the Unraid webGui to the internet.

A frequent way to secure such a connection is to use VPN technology.
Unraid includes as standard the WireGuard VPN and an OpenVPN plugin and
Docker container is also available. In addition many routers have built
in VPN support which can be used.

An alternative for making the webGui remotely accessible is to install
the [Unraid Connect](/connect/about.md) plugin, which can provide a secure remote access solution
that utilizes SSL to ensure your connection is fully encrypted.

## Securing webGui connections (SSL)

Using wildcard SSL Certificates provisioned by [Let's
Encrypt](https://letsencrypt.org/), Unraid OS 6.10 improves the security
of the SSL implementation for both local access and [Unraid Connect Remote Access](/connect/remote-access.md).

### A few details before we begin

Some terms:

- **servername** can be changed on the Settings -\> Identification
  page. It defaults to "tower".
- **localTLD** can be changed on the Settings -\> Management Access
  page. It defaults to "local".
- **Use SSL/TLS** can be changed on the Settings -\> Management Access
  page. It defaults to "No".
- **HTTP port** can be changed on the Settings -\> Management Access
  page. It defaults to "80". If you change this, add `:[HTTP port]` to any of the http URLs in the scenarios below. (example:
  `http://tower.local:8080`)
- **HTTPS port** can be changed on the Settings -\> Management Access
  page. It defaults to "443". If you change this, add `:[HTTPS port]` to any of the https URLs in the scenarios below. (example:
  `https://tower.local:3443`)
- **certificate** refers to either a self-signed SSL Certificate, or a
  SSL certificate issued by a Certificate Authority (Let's Encrypt)
- **lan-ip** is your servers LAN IP address with dots changed to
  dashes (example 192-168-100-1)
- **wan-ip** is your internet-facing IP address with dots changed to
  dashes (example 136-26-144-139)
- **hash** is a random 40 character hex string (160 bits) uniquely
  assigned to your server when a certificate is first issued

**Caveats of using a self-signed certificate**: Note that browsers will
show a certificate error because they cannot verify the authenticity of
self-signed certificates. All traffic will be encrypted once users
acknowledge the browser warning.

### How would you like to access the Unraid webGui while on your LAN?

#### Http only

- Navigate to the Settings -\> Management Access page
- Set **Use SSL/TLS** to No
- **LocalTLD** should be kept at the default of "local" unless you
  can provide your own DNS name resolution
- Your URLs:
  - `http://[servername].[localTLD]` (example: `http://tower.local`)
  - `http://[ipaddress]` (example: `http://192.168.100.1`)
- Traffic between the browser and the server will not be encrypted

#### Https with Self-signed certificate

- Navigate to the Settings -\> Management Access page
- Set **Use SSL/TLS** to Yes
- **LocalTLD** should be kept at the default of "local" unless you
  can provide your own DNS name resolution
- Your URLs:
  - `https://[servername].[localTLD]` (example: `https://tower.local`)
  - `https://[ipaddress]` (example: `https://192.168.100.1`)
- All traffic will be encrypted
- Unraid will manage the certificate for you. See "Caveats of using a
  self-signed certificate" above.

#### Https with Myunraid.net certificate - with fallback URL if DNS is unavailable

- Navigate to the Settings -\> Management Access page
- **LocalTLD** should be kept at the default of "local" unless you
  can provide your own DNS name resolution (this is used for the
  fallback certificate)
- Leave **Use SSL/TLS** set to either No or Yes
- Press **Provision**
- Your primary URLs when **Use SSL/TLS** set to No:
  - `http://[servername].[localTLD]` (example: `http://tower.local`)
  - `https//[ipaddress]` (example: `http://192.168.100.1`)
- Your primary URLs when **Use SSL/TLS** set to Yes. Note that these
  URLs use a self-signed certificate (See "Caveats of using a
  self-signed certificate" above)
  - `https://[servername].[localTLD]` (example: `https://tower.local`)
  - `https://[ipaddress]` (example: `https://192.168.100.1`)
- Your alternate URL will be
  `https://[lan-ip].[hash].myunraid.net` (example:
  `https://192-168-100-1.a1b2c3d4e5.myunraid.net`). This personal link
  is shown in the Certificate subject field on the Management Access
  page. If you install the optional [Unraid Connect](/connect/about.md) plugin it will also be
  shown on the Connect dashboard ( <https://connect.myunraid.net/> )
- All traffic will be encrypted if using https.
- Unraid will manage the certificates for you.
- If at any point DNS resolution becomes unavailable, the alternate
  URL may not resolve. In this case use the primary URL as a fallback.

#### Https with Myunraid.net certificate - with no fallback URL

- Navigate to the Settings -\> Management Access page
- **LocalTLD** should be kept at the default of "local" unless you
  can provide your own DNS name resolution (this is used for the
  fallback certificate if you run the `use_ssl` command mentioned
  below)
- Press **Provision**
- If DNS Rebinding is not an issue, the "Strict" option for **Use
  SSL/TLS** will be available.
- Set **Use SSL/TLS** to Strict (this was previously called "Auto",
  but "Strict" is more descriptive)
- Your URL will be `https://[lan-ip].[hash].myunraid.net`
  (example: `https://192-168-100-1.a1b2c3d4e5.myunraid.net`) This
  personal link is shown in the Certificate subject field on the
  Management Access page. If you install the optional [Unraid Connect](/connect/about.md) plugin it will also be
  shown on the Connect dashboard ( <https://connect.myunraid.net/> )
- All traffic will be encrypted
- Unraid will manage the certificates for you.
- Note: If at any point DNS resolution becomes unavailable (e.g., your
  Internet goes down), use telnet, SSH or local keyboard/monitor to
  login. Then:
  - type `use_ssl no` to access the webgui via
    `http://[servername].[localTLD]` or `http://[ipaddress]`
  - type `use_ssl yes` to access the webgui via
    `https://[servername].[localTLD]` or `https://[ipaddress]`
    using a self-signed certificate (See
    "Caveats of using a self-signed certificate" above)
  - Once DNS resolution is available again, change **Use SSL/TLS**
    back to Strict

### Redirects

When accessing `http://[ipaddress]` or
`http://[servername].[localTLD]` , the behavior will change
depending on the value of the **Use SSL/TLS** setting:

- If **Use SSL/TLS** is set to Strict, you will be redirected to
  `https://[lan-ip].[hash].myunraid.net` However, this behavior
  makes it more difficult to access your server when DNS is
  unavailable (i.e. your Internet goes down). If that happens see the
  note under `HTTPS with Myunraid.net certificate - with no fallback
URL` above.
- If **Use SSL/TLS** is set to Yes, you will be redirected to
  `https://[ipaddress]` or `https://[servername].[localTLD]`
  as that will likely work even if your Internet goes down.
- If **Use SSL/TLS** is set to No, then the http url will load
  directly.

Note: for the redirects to work, you must start from http urls not https
urls.

### Unraid Connect Remote Access

- Install the [Unraid Connect](/connect/about.md) plugin
- Navigate to the Settings -\> Management Access page
- Click **Provision** if you haven't already
- Regardless of the value of **Use SSL/TLS**, you will have the option
  to access the server using
  `https://[lan-ip].[hash].myunraid.net:[wan-port]` (example:
  `https://192-168-100-1.a1b2c3d4e5.myunraid.net`).
- Navigate to Settings -\> Management Access -\> Unraid Connect page
- Set **Allow Remote Access** to yes
- Set the **WAN port** you want to use. For added security we
  recommend you choose a random port over 1000 rather than using the
  default of 443. i.e. something like 13856, 48653, etc
- Click **Apply**
- Setup your router to port forward the **WAN port** you specified to
  the LAN IP address and **HTTPS port** used by the server. There is a
  note on the screen telling you the exact port and IP to use.
- Press the **Check** button. If the port is forwarded correctly you
  will see a message saying "Your Unraid Server is reachable from the
  Internet"
- To access your server using Remote Access, login to the Unraid Connect
  Dashboard and click the Remote Access link. The URL will be
  `https://[wan-ip].[hash].myunraid.net:[wan-port]` (example:
  `https://136-26-144-139.a1b2c3d4e5.myunraid.net:13856`).

### Custom Certificates

#### Https with Custom certificate - with option to have Unraid Connect Remote Access

- Navigate to the Settings -\> Management Access page
- Set **Use SSL/TLS** to Yes
- Set the **LocalTLD** to the domain name used in the "Subject" of
  the certificate.
- Your URL will be `https://[servername].[localTLD]` (example:
  `https://tower.mydomain.com`). You are responsible for managing DNS
  for this URL.
- You are responsible for managing the certificate. Upload it to
  `/boot/config/ssl/certs/[servername]_unraid_bundle.pem`
- The certificate must be valid for `[servername].[localTLD]`
  (example: `tower.mydomain.com`). For a wildcard cert it must be
  `*.[localTLD]` (example: `*.mydomain.com`). This url can be
  specified in either the "Subject" of the certificate or one of the
  "Subject Alternative Name" fields (prior to 6.10.3, only the
  "Subject" field was used). If you find that Unraid deletes your
  certificate, it is because the server's url is not specified in the
  certificate.
- All traffic will be encrypted
- (optional) If desired, see the Unraid Connect Remote Access section
  above

## Data Encryption

Unraid supports the use of encrypted drives in both the cache and the
array. It does this using the Linux LUKS (Linux Unified Key System)
encryption modules.

LUKS is the standard for Linux hard disk encryption. By providing a
standard on-disk-format, it does not only facilitate compatibility among
distributions but also provides secure management of multiple user
passwords. In contrast to an existing solution, LUKS stores all
necessary setup information in the partition header, enabling the user
to transport or migrate their data seamlessly.

The home page for LUKS can be found
[here](https://gitlab.com/cryptsetup/cryptsetup)

Because it is a Linux standard drives that are encrypted using LUKS can
be read on any standard Linux system even when removed from Unraid as
long as one has the key phrase/file needed to unlock the drive.

The Unraid implementation expects the same key to be used for encrypting
all drives being used by Unraid. The key for the encryption can be
either a pass phrase, or provided via a key file. When using a key file
it is a good idea to use something like an image as there is no chance
of that ever being guessed. You must make sure that you do not lose the
encryption key as without it you will not be able to access the data on
encrypted drives.

To encrypt a drive (Note that this will erase any content already on the
drive).

- Stop the array
- Click on the drive on the Main tab
- change the file system to The encrypted type that you want to use
- click Apply to commit the change
- click Done to return to the Main tab
- the drive will now show as unmountable and the option to format
  unmountable drives will be present. Check that the drive is the one
  you are expecting to be encrypted and if it is correct go ahead and
  format it.

Once you have set up encryption then it will necessary to provide the
encryption key when starting the array. Once this has been done and the
array successfully started then you can access the data without being
aware of the fact that any drive is encrypted.

CAUTION; Encrypting data is good from a security perspective, but users
should be aware of the fact that it can complicate recovering from
certain types of hardware failure without data loss. On that basis only
use encryption if you feel you have a real need for it, and ideally make
sure you have a good system for backing up any important data.

## Flash Drive

The flash drive that is used to boot Unraid is important as it contains
all the configuration information relating to an Unraid server. You
therefore want to consider the security of the information it contains
and how it is accessed.

### Backups

If a flash drive ever fails for any reason then as long as you have a
backup getting the Unraid server back into normal operation is an easy
process. It is recommended that you make a backup whenever you make a
significant configuration change.

You easily achieve this from the Unraid GUI by:

1. Click on the flash drive on the Main tab in the GUI.
2. In the _Flash Device Settings_ section click on the **Flash Backup**
   button.
3. The system will now start creating a zip file that is a backup of
   the contents of the flash drive
4. When the zip file has been created your browser should prompt you to
   provide the location where you want the backup saved to. It is
   recommended that this is a location off the Unraid server so that it
   is available even when the Unraid server is not operational.

If you later need to recreate your flash drive for any reason this
backup can be used as input to the Limetech USB Creator tool.

### Network Access

The flash drive can have similar settings applied to it to control
access over the network as is the case for other shares on an Unraid
system. The difference is that you set this up by clicking on the
**flash** device on the _Main_ tab in the GUI rather than doing it via
the Shares tab.

- **Network visibility**: You can specify whether the flash drive
  should even be accessible via the network, and if it is accessible
  whether it should be hidden or visible to everyone.
- **Access rights**: If network access is allowed you can specify any
  access permissions that you want applied.

### Permissions

As part of improving the security of Unraid systems, starting with
Unraid 6.8 files on the flash drive can no longer be given execute
permission.

The implication of this is that if a user has their own custom scripts
(or programs) stored on the flash drive they can no longer be executed
from that location. There are a number of ways to handle this:

- Copy the files to a location from which they can be executed
  - The location _/usr/local/bin_ is a good choice if you want the
    files on the default search path.
  - You can copy the files into position when booting by adding
    appropriate commands to the config/go file on the flash drive.
  - Remember to give the files execute permission after copying
    them.
- For scripts precede the script name with the command that runs the
  script (e.g. _bash path-to-script_)

## VPN

**Unraid servers are not hardened against attack via the network so
should _NEVER_ be exposed directly to the internet.**

- One exception is the WireGuard VPN service introduced in Unraid 6.8
  explicitly to address secure access to/from the internet.
- If running Docker container or are exposed to the internet then the
  security of these needs to be assessed on a case-by-case basis.

: You may need to contact the developer of the container to determine
how safe it is to expose it to the internet.
: There is a level of protection as a docker container runs in a
'sandboxed' environment so the level of access to the content of
your disks is constrained to what you allow in the path mapping
settings for the container.

- If running VMs that are exposed to the internet then you need to
  apply the same security to these that you would apply to a physical
  PC attached to the local LAN.

if you want to make secure connections between an Unraid server and the
Internet then you want to use a technology known as VPN (Virtual Private
Network). VPN works on a client/server model where you have a server
that accepts incoming connections and a client that initiates such
connections.

in simplistic terms, the idea behind VPN connections is to set up an
encrypted 'tunnel' between the client and server ends so that no
malicious players can intercept or eavesdrop on your interactions. Such
tunnels are set up so that only authorized users are able to make such
connections. More information on VPN as a technology can be found in
[this wiki
article](https://en.wikipedia.org/wiki/Virtual_private_network)

There are 2 common Use Cases that Unraid users are likely to have:

- **Remote Access to Unraid from the Internet**: This is by far the
  commonest Use Case and many users want to. be able to safely access
  their Unraid servers (and potentially their whole home LAN) when
  away from home. When running in this mode the server end of the VPN
  link will either be running on the user's router (if it supports
  such a feature) or will be hosted on the Unraid server.
- **Remote Access from Unraid to the Internet**: This is used when you
  want applications running on Unraid to access the internet. This
  could be to access generic internet content or to access another
  server located remotely to the Unraid server. If in is generic
  access to the internet then it is highly likely that the server end
  of such connection will be via a commercial VPN provider. When
  running in this mode Unraid will be acting as the client end of any
  VPN link.

There are a wide variety of VPN solutions available both free and
commercial.

### Router

Many modern routers have a VPN server built-in as standard (typically
based on OpenVPN).

Using your router to provide the VPN support has the great advantage of
not needing any other component on your home LAN to be operational for
the VPN to function. Once setup it should allow you to access all
devices on your home LAN in a similar manner to when you are directly
connected to the LAN.

### OpenVPN

This has been the way that has historically been advocated to allow
connections to be made between an Unraid server and the internet.

OpenVPN is a well-established solution so if you want to use OpenVPN
then you can search Community Applications for a plugin or docker
container that meets your requirements. You may also find the
[SpaceInvaderOne YouTube
video](https://www.youtube.com/watch?v=fpkLvnAKen0) of use in setting it
up.

_It is expected that with the introduction of WireGuard support in
Unraid 6.8 that WireGuard will become the favored way of setting up a
VPN connection to an Unraid server_.

### WireGuard

#### Overview

![](../assets/Wireguard.png)
Unraid 6.8 introduces built-in support for WireGuard VPN connections. The
intention is to make it as easy as possible for Unraid users to set up
VPN connections to/from their Unraid servers.

Some points to note about the Unraid WireGuard implementation are:

- The WireGuard service is built into Unraid so there is no need to
  add 3rd party software to achieve a VPN connection.
- The WireGuard service can be set to auto-start as part of the Unraid
  boot process.
- The WireGuard service is available even if the array is not started.
- WireGuard uses a light-weight protocol so performance tends to be
  better than OpenVPN.

More information about WireGuard can be found on the [WireGuard web
site](https://www.wireguard.com/). It should be noted that WireGuard is
still labeled as ''experimental'' by its developers but many users are
already finding that it appears to be robust enough for real-world use.
A number of the commercial VPN services are working on adding WireGuard
support so they must deem it to be mature enough for this to make sense
to them.

The initial Unraid implementation includes adding the WireGuard kernel
modules to the standard Unraid distribution and starting the WireGuard
services as part of the Unraid boot process, but does not yet have the
management of WireGuard built-in. At the moment the GUI part is offered
as a separate plugin, but it is intended that it will be integrated into
Unraid in the future. This approach allows for quick updates and
enhancements without dependency on Unraid version releases. The Unraid
WireGuard GUI plugin can be installed via Community Applications, and
when it is installed you will find that an entry called **VPN Manager**
is added to the GUI under _Settings-\>Network Services_

Note that the Unraid WireGuard plugin is still evolving so in the event
of a discrepancy between what is described here and the following forum
threads then it is likely that the thread is correct and this wiki needs
updating to bring it inline. These threads are also the appropriate
place to ask questions regarding Unraid's WireGuard implementation.

- [forum
  thread](https://forums.unraid.net/topic/84229-dynamix-wireguard-vpn/)
  on the Dynamix WireGuard plugin
- [forum
  thread](https://forums.unraid.net/topic/84226-wireguard-quickstart/)
  covering setting up incoming connections.
- [Forum
  thread](https://forums.unraid.net/topic/84316-wireguard-vpn-tunneled-access/)
  covering setting up outgoing connections.

What can you do with WireGuard? Let's walk through each of the
connection types:

- **Remote access to server**: Use your phone or computer to remotely
  access your Unraid server, including:

  - Unraid administration via the webgui
  - Access dockers, VMs, and network shares as though you were
    physically connected to the network

- **Remote access to LAN**: Builds on "Remote access to server",
  allowing you to access your entire LAN as well.

- **Server to server access**: Allows two Unraid servers to connect to
  each other.

- **LAN to LAN access**: Builds on "Server to server access",
  allowing two entire networks to communicate. May require additional
  settings, TBD.

- **Server hub & spoke access**: Builds on "Remote access to
  server", except that all of the VPN clients can connect to each
  other as well. Note that all traffic passes through the server.

- **LAN hub & spoke access**: Builds on "Server hub & spoke access",
  allowing you to access your entire LAN as well.

- **VPN tunneled access**: Route traffic for specific Dockers and VMs
  through a commercial WireGuard VPN provider (see this guide)

- **Remote tunneled access**: Securely access the Internet from
  untrusted networks by routing all of your traffic through the VPN
  and out Unraid's Internet connection

The following diagram attempts to show these different connection types
in a graphical format

[](file:Wireguard-help.png "wikilink")

#### Incoming VPN Connections

This section will walk through how to setup WireGuard so that your
trusted devices can VPN into your home network to access Unraid and the
other systems on your network.

**Prerequisites**

- You must be running Unraid 6.8 with the Dynamix WireGuard plugin
  installed via the **Apps** tab (Community Applications).

- Be aware that WireGuard is technically classified as experimental.
  It has not gone through a full security audit yet and has not
  reached 1.0 status. But it is the first open-source VPN solution
  that is extremely simple to install, fast, and designed from the
  ground up to be secure.

- Understand that giving someone VPN access to your LAN is just like
  giving them physical access to your LAN, except they have it 24x7
  when you aren't around to supervise. Only give access to people and
  devices that you trust, and make certain that the configuration
  details (particularly the private keys) are not passed around
  insecurely. Regardless of the "connection type" you choose, assume
  that anyone who gets access to this configuration information will
  be able to get full access to your network.

- This guide works great for simple networks. But if you have Dockers
  with custom IPs or VMs with strict networking requirements, please
  see the "Complex Networks" section below.

- Unraid will automatically configure your WireGuard clients to
  connect to Unraid using your current public IP address, which will
  work until that IP address changes. To future-proof the setup, you
  can use Dynamic DNS instead. There are many ways to do this,
  probably the easiest is described in this [2 minute video from
  SpaceInvaderOne](https://www.youtube.com/watch?v=9FkQ0wYpCV0).

- If your router has UPnP enabled, Unraid will be able to
  automatically forward the port for you. If not, you will need to
  know how to configure your router to forward a port.

- You will need to install WireGuard on a client system. It is
  available for many operating systems as mentioned at [WireGuard
  clients](https://www.wireguard.com/install/). Android or iOS make
  good first client systems because you can get all the details via QR
  code.

**Setting up the Unraid side of the VPN tunnel**

- First, go to Settings -\> Network Settings -\> Interface eth0. If
  "Enable bridging" is "Yes", then WireGuard will work as
  described below. If bridging is disabled, then none of the "Peer
  type of connections" that involve the local LAN will work properly.
  As a general rule, bridging should be enabled in Unraid.

[](file:enable-bridging.png "wikilink")

- If UPnP is enabled on your router and you want to use it in Unraid,
  go to Settings -\> Management Access and confirm "Use UPnP" is set
  to Yes
- On Unraid go to Settings -\> VPN Manager

[](file:wg0.png "wikilink")

- Give the VPN Tunnel a name, such as "MyHome VPN"
- Press "Generate Keypair". This will generate a set of public and
  private keys for Unraid. Take care not to inadvertently share the
  private key with anyone (such as in a screenshot like this)
- By default, the local endpoint will be configured with your current
  public IP address. If you chose to setup DDNS earlier, change the IP
  address to the DDNS address.
- Unraid will recommend a port to use. You typically won't need to
  change this unless you already have WireGuard running elsewhere on
  your network.
- Hit Apply
- If Unraid detects that your router supports UPnP, it will
  automatically setup port forwarding for you:

[](file:upnp-yes.png "wikilink")

- If you see a note that says "configure your router for port
  forwarding\..." you will need to login to your router and setup the
  port forward as directed by the note:

[](file:upnp-no.png "wikilink")

- Some tips for setting up the port forward in your router:
  - Both the external (source) and internal (target/local) ports
    should be set to the value Unraid provides. If your router
    interface asks you to put in a range, use the same port for both
    the starting and ending values. Be sure to specify that it is a
    UDP port and not a TCP port.
  - For the internal (target/local) address, use the IP address of
    your Unraid system shown in the note.
  - Google can help you find instructions for your specific router,
    i.e. "how to port forward Asus RT-AC68U"
- Note that after hitting Apply, the public and private keys are
  removed from view. If you ever need to access them, click the
  "key" icon on the right-hand side.

[](file:key.png "wikilink")

- Similarly, you can access other advanced settings by pressing the
  "down chevron" on the right-hand side. They are beyond the scope
  of this guide, but you can turn on help to see what they do.
- In the upper right corner of the page, change the Inactive slider to
  Active to start WireGuard. You can optionally set the tunnel to
  Autostart when Unraid boots.

[](file:activate.png "wikilink")

: _There have been cases where this step has been omitted and users
end up wondering why the WireGuard VPN link is not working!_

**Defining a Peer (client)**

- Click "Add Peer"

[](file:peer-add.png "wikilink")

- Give it a name, such as "MyAndroid"
- For the initial connection type, choose "Remote access to LAN".
  This will give your device access to Unraid and other items on your
  network.
- Click "Generate Keypair" to generate public and private keys for
  the client. The private key will be given to the client/peer, but
  take care not to share it with anyone else (such as in a screenshot
  like this)
- For an additional layer of security, click "Generate Key" to
  generate a preshared key. Again, this should only be shared with
  this client/peer.
- Click Apply.
- **Note:** Technically, the peer should generate these keys and not
  give the private key to Unraid. You are welcome to do that, but it
  is less convenient as the config files Unraid generates will not be
  complete and you will have to finish configuring the client
  manually.

**Caution:**\
It can be a little risky to add a new client ("peer") to WireGuard if
you are already connected remotely using WireGuard as adding a new peer
_sometimes_ toggles the WireGuard tunnel off which will render you
unable to reconnect. This is because a configuration change is made
effective by inactivating the tunnel with the current (old)
configuration and next activating it with the updated (new)
configuration. If there is any sort of configuration conflict at this
point the tunnel stays inactive, and you can no longer connect to the
Unraid server

**Configuring a Peer (client)**

- Click the "eye" icon to view the peer configuration. If the button
  is not clickable, you need to apply or reset your unsaved changes
  first.

[](file:peer-eye.png "wikilink")

[](file:peer-view.png "wikilink")

- If you are setting up a mobile device, choose the "Create from QR
  code" option in the mobile app and take a picture of the QR code.
  Give it a name and make the connection. The VPN tunnel starts almost
  instantaneously, once it is up you can open a browser and connect to
  Unraid or another system on your network. Be careful not to share
  screenshots of the QR code with anyone, or they will be able to use
  it to access your VPN.
- If you are setting up another type of device, download the file and
  transfer it to the remote computer via trusted email or dropbox,
  etc. Then unzip it and load the configuration into the client.
  Protect this file, anyone who has access to it will be able to
  access your VPN.

**About DNS**

The Dynamix WireGuard plugin includes a "Peer DNS Server" option

If you are having trouble with DNS resolution on the WireGuard client,
return to the VPN Manager page in Unraid and switch from Basic to
Advanced mode, add the IP address of your desired DNS server into the
"Peer DNS Server" field, then install the updated config file on the
client. You may want to use the IP address of the router on the LAN you
are connecting to, or you could use a globally available IP like 8.8.8.8

This is required for "Remote tunneled access" mode if the client's
original DNS server is no longer accessible after all traffic is routed
through the tunnel.

If you are using any of the split tunneling modes, adding a DNS server
may provide name resolution on the remote network, although you will
lose name resolution on the client's local network in the process. The
simplest solution is to add a hosts file on the client that provides
name resolution for both networks.

**Complex Networks**

The instructions above should work out of the box for simple networks.
With "Use NAT" defaulted to Yes, all network traffic on Unraid uses
Unraid's IP, and that works fine if you have a simple setup.

However, if you have Dockers with custom IPs or VMs with strict
networking requirements, things may not work right (I know, kind of
vague, but feel free to read the two WireGuard threads for examples)

A partial solution is:

- In the WireGuard config, set "Use NAT" to No
- In your router, add a static route that lets your network access the
  WireGuard "Local tunnel network pool" through the IP address of
  your Unraid system. For instance, for the default pool of
  10.253.0.0/24 you should add this static route:
  - Network: 10.253.0.0/16 (aka 10.253.0.0 with subnet 255.255.0.0)
  - Gateway: `<IP address of your Unraid system>`
- Note that this covers the entire class B 10.253.x.x network, so you
  can add other WireGuard tunnels without having to modify your router
  setup again.

With these changes, your network should work normally. However, your
WireGuard clients still may not be able to access Dockers on custom IPs
or VMs. If you find a solution to this, please ask questions in the
forum threads mentioned earlier.

**Troubleshooting WireGuard**

WireGuard is not a chatty protocol, in fact, it is designed to be
invisible! There aren't really any error messages if things aren't
working, it either works or it doesn't. It cannot be detected by a port
scanner.

If you can't connect, it will mainly be an exercise in double-checking
your work:

- Confirm that the tunnel is active (!)
- Confirm that your DDNS is pointed at your current public IP address,
  and is assigned to your "Local endpoint"
- Confirm that you forwarded the correct UDP port through your router
  to Unraid, and assigned that same port to the "Local endpoint"
- If you made any changes to your configuration after setting up your
  clients, you will need to set the clients up again so they have the
  latest config.
- Be sure you save your changes before you press "View Peer Config",
  otherwise your QR codes/files will not have the latest data.

A few other ideas:

`* For your first client, setup a phone using its data connection (not wifi). This eliminates issues related to the client network, and the QR code is the easiest way to transfer settings. Once you have it working from your phone, move on to other clients.`

Disable any energy-saving features on the client, phones in particular
may not use VPNs properly when in low power mode. Also, you may need to
disable any "Data Saver" features on the phone so that VPN is not
throttled. See this post.

`* If your "Peer type of connection" includes one of the LAN options but you can only access Unraid, go to Settings -> Network Settings and see whether "Enable bridging" is yes.  If bridging is disabled, you will not be able to access your LAN over WireGuard.`

- If you are connecting from another network over the Internet, be
  sure that the networks on both sides use different subnets. You
  can't connect two networks that both use 192.168.1.0/24, for
  instance.
- If you can connect from some locations but not others, keep in mind
  that the "broken" remote locations may have a firewall that blocks
  UDP traffic. Hopefully, WireGuard will support TCP in the future,
  but currently, there is no workaround for this.
- If nothing is working properly, switch to advanced mode and confirm
  that the "Local tunnel network pool" is not already in use on your
  network or on one of the networks you are connecting to. If there is
  a conflict you will need to change it to a different private network
  (10.0.0.0 to 10.255.255.255 \| 172.16.0.0 to 172.31.255.255 \|
  192.168.0.0 to 192.168.255.255)
- If you can't reach the Unraid webgui for some reason and you need
  to prevent a WireGuard tunnel from automatically starting, delete
  this file from your flash drive and reboot:

`/boot/config/wireguard/autostart`

- Note that if you have Dockers with custom IPs or VMs with strict
  networking requirements, you will likely have issues. Please see the
  "Complex Networks" section above.

#### Outgoing VPN Connections

This section explains how to make an outgoing WireGuard VPN connection
from an Unraid server to a commercial VPN provider. If you are trying to
access your Unraid network from a remote location, see the section on
making inbound connections. There is a [forum
thread](https://forums.unraid.net/topic/84316-wireguard-vpn-tunneled-access/)
discussing making an outbound VPN connection using WireGuard

**Commercial VPN Providers**

Several commercial VPN providers now support WireGuard. A few are listed
below but this is not intended to be an exhaustive list. No endorsement
is implied, you need to research and determine which one meets your
needs.

- [TunSafe](https://tunsafe.com/vpn) (currently free)
- [Azire VPN](https://www.azirevpn.com/cfg/wireguard)
- [Mullvad](https://mullvad.net/en/guides/category/wireguard/)
- [IVPN](https://www.ivpn.net/setup/gnu-linux-wireguard.html)
- [TorGuard VPN](https://torguard.net/blog/what-is-wireguard-vpn/)
- [NordVPN](https://nordvpn.com/blog/nordlynx-protocol-wireguard/) Not
  sure this works without using the NordLynx client so may not be
  compatible with the Unraid implementation.

Note that with the current state of WireGuard, VPN providers cannot
guarantee the same amount of privacy as they can with OpenVPN. See
[here](https://restoreprivacy.com/wireguard/) for more detail\
Typically the objections are not around security, but around the fact
that it is harder for them to guarantee that they cannot track you.

**Configuring VPN tunneled access**

- Download a config file from your preferred commercial VPN provider
- On the Settings -\> VPN Manager page, click the "Import Config"
  button and select the file on your hard drive. This will create a
  new tunnel specific to this provider.
- There are no settings to change, except perhaps to give it a name.
  Click Apply.
- Note: You do not need to forward any ports through your router for
  this type of connection
- Change the Inactive slider to Active
- Now ALL of your Unraid traffic will go through the commercial VPN
  tunnel.
  - In the future it may be possible to restrict it so that only
    specific Dockers use the VPN tunnel. Until then, you may need to
    disable the tunnel in order to check for plugin updates or
    perform other Unraid administrative tasks.
  - Note that currently, Unraid will ignore any DNS server that is
    specified in the downloaded config file. Unraid's DNS should be
    set to something that will work whether the tunnel is up or
    down, such as 8.8.8.8 and 8.8.4.4

**Testing the tunnel**

- Using Community Applications, install a browser such as the
  jlesage/Firefox Docker container
- Accept all defaults
- Launch Firefox and visit <https://whatismyipaddress.com/> you should
  see that your IP address is in the country you selected when you
  signed up with the provider

#### Support

WireGuard is a new feature in Unraid so the forum is the place to get
the ask questions and get the most up-to-date information on using
WireGuard with Unraid. The threads most likely to be of interest are:

- [forum
  thread](https://forums.unraid.net/topic/84229-dynamix-wireguard-vpn/)
  on the Dynamix WireGuard plugin
- [forum
  thread](https://forums.unraid.net/topic/84226-wireguard-quickstart/)
  covering setting up incoming connections.
- [Forum
  thread](https://forums.unraid.net/topic/84316-wireguard-vpn-tunneled-access/)
  covering setting up outgoing connections.

["WireGuard" and the "WireGuard" logo are registered trademarks of Jason A. Donenfeld.](https://www.wireguard.com/)
