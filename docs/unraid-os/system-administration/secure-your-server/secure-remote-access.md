---
sidebar_position: 6
sidebar_label: Secure remote access
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Secure remote access (Tailscale and VPN solutions)

Unraid now features deep integration with [Tailscale](https://tailscale.com/), thanks to a technology partnership that directly connects seamless, secure networking to your server. Tailscale is prioritized as the recommended solution for most users, but guidance for WireGuard and other VPNs is included as well.

## Tailscale

Tailscale isn’t a traditional VPN - it’s a modern, peer-to-peer overlay network built on WireGuard. It lets you connect devices, servers, and individual Docker containers into your secure private network (Tailnet), regardless of their physical location or network environment. The Unraid partnership ensures the Tailscale plugin is fully maintained and tightly integrated, offering native certificate support and advanced features in Unraid 7 and newer.

- **Simple setup:** No port forwarding or firewall headaches.
- **Strong security:** Uses WireGuard encryption under the hood.
- **Flexible sharing:** Grant access to specific devices or containers, not just your whole network.
- **First-class support:** Officially maintained plugin, with ongoing enhancements.

---

### Getting started with Tailscale

To begin, [sign up for a free Tailscale account](https://login.tailscale.com/start) and install the client on at least one device (Windows, macOS, Linux, iOS, Android, and more). Free accounts support up to three users and 100 devices.

Before adding Unraid, consider:  

- [Renaming your Tailnet](https://tailscale.com/kb/1217/tailnet-name) for easier identification.
- Enabling [MagicDNS](https://tailscale.com/kb/1081/magicdns) for simplified device naming.
- Enabling [HTTPS certificates](https://tailscale.com/kb/1153/enabling-https) for secure, trusted access.
  :::note
  Machine names in HTTPS certificates are public. Use names you’re comfortable sharing.
  :::

#### Adding Tailscale to Unraid

The following steps are current and accurate for Unraid 7 and later:

1. Review your Tailscale account settings as described above.
2. In Unraid, search the Community Apps tab for the official Tailscale plugin and install it.
3. Open **Settings → Tailscale** and click Reauthenticate. Sign in with your Tailscale account.
4. Click **Connect** to add your Unraid server to your Tailnet.
5. Visit **Settings → Management Access** to see your Tailscale URLs for the WebGUI.
6. In **Settings → Tailscale**, find your server’s Tailnet name and IP. Use these to access SMB/NFS shares, Docker containers, and more from any device on your Tailnet.

#### Subnet routing (optional)

To access your Unraid server by its main LAN IP (or to reach Docker containers with their own IPs):

1. Go to **Settings → Tailscale**, click Viewing, and Sign In.
2. Click **Subnet router** and add:
   - Your Unraid server’s IP (e.g., `192.168.0.12/32`), or
   - Your whole network’s subnet (e.g., `192.168.0.0/24`).
3. Click **Advertise routes**.
4. Approve the pending route in your Tailscale admin console.
5. Once approved, devices on your Tailnet can access your Unraid server and/or LAN devices by their usual IP addresses.
6. For advanced details, see the [Tailscale subnet routing documentation](https://tailscale.com/kb/1019/subnets).

---

### Adding Tailscale to Docker Containers

Unraid makes it easy to connect Docker containers to your Tailnet, giving each container a unique device identity for secure, flexible remote access. With this integration, you can share access to individual containers - without exposing your entire server - and take advantage of advanced features like exit nodes, Serve, and Funnel on a per-container basis. The setup is fully automated, so users of all skill levels can benefit from enhanced security and streamlined networking.

<details>
<summary><strong>How the Tailscale-Docker Integration Works</strong></summary>

When you enable **Use Tailscale** for a Docker container and apply changes, Unraid automates the following steps for seamless integration:

1. **Entrypoint Extraction:** Unraid identifies the container’s original Entrypoint and CMD, preserving its intended startup behavior.
2. **Integration Script Injection:** The `tailscale_container_hook` script is mounted inside the container, and the Entrypoint is updated to run this script first.
3. **Environment Setup:** The original Entrypoint, CMD, and all required Tailscale variables are passed to the Docker run command.
4. **Tailscale Initialization:** On startup, the hook script installs any dependencies, downloads, and launches the Tailscale client within the container.
5. **Normal Startup:** The script then starts the container’s original Entrypoint and CMD, so your application runs as usual - with Tailscale networking layered in automatically.

Once enabled, the container appears as its own device on your Tailnet, ready for secure access and advanced Tailscale features, without any need for manual network configuration or port forwarding.

</details>

:::note Prerequisites

- First, install Tailscale on any computer that will access your Docker containers.
- While the Unraid Tailscale plugin isn’t strictly required for Docker integration, it’s strongly recommended to install it and sign in on your Unraid server for the best experience.
:::

To add Tailscale to a Docker container:

1. **Review your Tailscale account settings** as described in the [Getting Started section](#getting-started-with-tailscale).
2. In Unraid, go to the **Docker** tab and edit the desired container.
3. Enable the **Use Tailscale** switch.
4. Enter a **Tailscale hostname** for the container (must be unique on your Tailnet).

:::warning
An HTTPS certificate will be generated for this hostname and published in a public certificate ledger. Choose a name you’re comfortable sharing publicly. See the [Tailscale HTTPS docs](https://tailscale.com/kb/1153/enabling-https) for details.
:::

5. Decide whether this container should be an exit node (useful for VPN containers).
6. Choose whether the container should use an exit node for its outgoing traffic. If the Tailnet plugin is installed, you’ll see a list of available exit nodes; otherwise, enter the IP manually.
7. If using an exit node, specify whether the container should also access your LAN.
8. The Tailscale **Userspace Networking** field is usually set automatically. Leave it disabled unless you have a specific need.
9.  Decide whether to enable **Tailscale SSH** (secure shell access authenticated via Tailscale).

:::info Serve vs. Funnel

- **Serve**: Lets you access a container’s website or web service securely from your Tailnet using a friendly HTTPS URL. No port forwarding is needed, and only Tailnet devices can connect.
- **Funnel**: Publishes the container’s website to the public internet via a unique HTTPS URL. Anyone with the link can access it, even if they’re not on your Tailnet. Use this with caution, as it exposes your service to the wider internet.
:::

10. Enable **Serve** to reverse proxy the container’s web interface to your Tailnet, or **Funnel** to make it accessible from the public internet. Unraid will auto-detect the port to use based on the container’s WebUI settings. If needed, advanced options are also available.

:::warning
When using Serve or Funnel, there’s no extra authentication layer - your container is responsible for managing user access. Secure your web apps accordingly.
:::

11. **Apply** your changes and check the **Container log** for Tailscale messages. Click the "To authenticate, visit" link to approve the container on your Tailnet.

:::caution Troubleshooting
**Persistent state error:**  
If you see "*ERROR: Couldn't detect persistent Docker directory for .tailscale_state*":

- Edit the container and identify a mapped path to store Tailscale state data (e.g., `/container-path/`).
- Enable Tailscale **Show advanced settings** and set the Tailscale **State directory** to `/container-path/.tailscale_state`.
- Restart the container.  
- Docker XML authors can simplify this by adding `<TailscaleStateDir>/container-path/.tailscale_state</TailscaleStateDir>` to the container’s XML file.
:::

---

### Updating Tailscale

Tailscale is updated frequently to deliver new features and security improvements. To keep your Unraid system secure and compatible, make sure both the Unraid Tailscale plugin and any Docker containers using Tailscale are up to date.

To update Tailscale:

- **Update the Unraid Tailscale plugin:**  
  When a new version is available, update the plugin through the Unraid Apps tab just like any other plugin. You can always review the latest changes in the [Tailscale changelog](https://tailscale.com/changelog).

- **Update Tailscale in Docker containers:**  
  1. On the Docker page, hover over the Tailscale icon for any container. If an update is available, you'll see a notification.
  2. Update the container by either:
      - Switching to **Advanced View** (upper right corner), then clicking **Force update**.
      - Editing the container, making a minor change (like toggling a setting), and clicking **Apply**.

---

### Userspace networking

**Userspace networking** controls how a container connects to your Tailnet and the rest of your network. In most cases, you can ignore the details if you access containers using their Tailscale WebUI URLs and have Tailscale installed on all client systems.

- **Enabled:**  
  The container operates in a restricted environment. It cannot initiate connections to other Tailnet devices or use Tailscale DNS but remains reachable via both the Tailscale WebUI and the original WebUI URL.

- **Disabled:**  
  The container has full Tailnet access and can use Tailscale DNS. It can communicate with other Tailnet devices, but the original WebUI URL may not be available.

:::info Feature requirements

- Containers set as **Exit Nodes** always have userspace networking enabled.
- Containers that **Use an Exit Node** always have userspace networking disabled.
:::

#### Network type compatibility

The behavior of Tailscale integration and userspace networking depends on the container’s network type. Use the table below to understand compatibility and access options:

| Network type          | Userspace networking default | Can be changed? | WebUI access (Tailscale) | WebUI access (Original) | Notes                                                        |
|---------------------- |-----------------------------|-----------------|--------------------------|-------------------------|--------------------------------------------------------------|
| `host`                | Enabled                     | No              | Yes                      | Yes                     | Both URLs accessible                                         |
| `bridge`              | Disabled                    | Yes             | Yes                      | *Enabled*: Yes  *Disabled*: No | Enables both URLs if enabled; only Tailscale WebUI if disabled |
| `eth0`/`br0`/`bond0`  | Disabled                    | Yes             | Yes                      | Yes                     | Both URLs accessible regardless of setting                   |
| `container`/`wg0`     | Disabled (untested)        | Yes             | Unknown                  | Unknown                 | Use with caution; not fully tested                           |

:::info Keep in mind

- Tailscale WebUI URLs are only accessible from devices with Tailscale installed and joined to your Tailnet, or with explicit sharing enabled.
- For most users, default settings provide secure and reliable access. Advanced options are available for specialized networking needs.
:::

---

## WireGuard

While Tailscale provides a user-friendly experience for most, [WireGuard](https://www.wireguard.com/) is a robust built-in VPN solution in Unraid that shines in specific advanced networking scenarios. It’s particularly useful when you need detailed control over VPN routing or require server-to-server or LAN-to-LAN connections without relying on third-party services. Below are key scenarios where WireGuard excels in 2025.

**When to choose WireGuard:**

| Scenario                     | Why choose WireGuard?                                                            |
|------------------------------|----------------------------------------------------------------------------------|
| **Full network control**     | Enables direct management of encryption keys and routing tables                  |
| **Server-to-server tunnels** | Lets you create persistent encrypted links between Unraid servers                |
| **LAN-to-LAN integration**   | Connects entire networks without involving intermediary services                  |
| **Bandwidth-intensive tasks** | Offers minimal protocol overhead for maximum throughput                          |
| **Regulatory compliance**    | Provides a complete on-premises solution without external service dependencies   |

### Connection types and use cases

Knowing the connection types in Wireguard can help you decide if it's right for you:

| Connection type           | Real-world use case                                                                   |
|:--------------------------|:-------------------------------------------------------------------------------------|
| Remote access to server   | Access Unraid WebGUI, Docker containers, VMs, and network shares remotely.           |
| Remote access to LAN      | Access all devices on your LAN remotely as if you were on the local network.         |
| Server to server access   | Securely connect two Unraid servers for data sharing or backup.                      |
| LAN to LAN access         | Seamlessly connect two entire LANs for smooth communication between networks.        |
| Server hub & spoke access  | Allow multiple VPN clients to connect to each other through the server.             |
| LAN hub & spoke access    | Enable communication between multiple LANs through a central server.                |
| VPN tunneled access       | Route specific Docker containers and VMs through a commercial WireGuard VPN provider. |
| Remote tunneled access    | Securely route all your internet traffic through your Unraid server when on untrusted networks. |

### Setting up WireGuard on Unraid

:::note Prerequisites

- **Dynamic DNS:** Set up DDNS for reliable access if your public IP changes. Popular options include [Cloudflare](https://www.cloudflare.com/) (requires domain ownership), [No-IP](https://www.noip.com/), or [DuckDNS](https://www.duckdns.org/) (free but may experience occasional outages).
- **Router configuration:**
  - Enable UPnP in **Settings > Management Access** for automatic port forwarding.
  - If UPnP is unavailable, manually forward UDP port 51820 to your Unraid server's IP.
- **Client software:** Install WireGuard on your devices ([Windows](https://www.wireguard.com/install/), [macOS](https://apps.apple.com/us/app/wireguard/id1451685025), [iOS](https://apps.apple.com/us/app/wireguard/id1441195209), [Android](https://play.google.com/store/apps/details?id=com.wireguard.android)).
:::

**Step 1: Generate keys**

1. Go to **Settings > VPN Manager**.

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![VPN Manager](/img/wg0.png)
</div>

2. Name your tunnel (e.g., "Home VPN").
3. Click **Generate Keypair** to create public/private keys.

:::warning  
Store the private key securely since it provides full network access.  
:::

**Step 2: Configure your endpoint**

- **For DDNS users:** Replace the IP in **Local endpoint** with your DDNS URL (e.g., `myhome.duckdns.org`).
- Keep the default port (`51820`) unless it conflicts with existing services.

**Step 3: Set up port forwarding**

- **UPnP users:** Unraid will automatically forward ports if enabled in **Settings > Management Access**.  

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![UPnP enabled](/img/upnp-yes.png)
</div>

- **Manual setup:** If UPnP is unavailable:  
  1. Log into your router.  
  2. Forward UDP port `51820` to your Unraid server's LAN IP.  
  3. Use the same port for external and internal settings.  

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![UPnP disabled](/img/upnp-no.png)
</div>

**Step 4: Activate your tunnel**

1. Toggle **Active** to enable WireGuard.  
2. Enable **Autostart** to run WireGuard at boot.  

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Activation toggle](/img/activate.png)
</div>

:::important Security best practices

- **Trusted access only:** VPN access is similar to physical network access, so only authorize trusted devices.
- **Key management:** Never share private keys; treat them like passwords.
- **Network segmentation:** For complex setups (custom Docker/VMs), isolate VPN traffic using VLANs or separate subnets.
- **Regular audits:** Review connected devices and access permissions quarterly.
:::

#### Defining a peer (client)

A peer is a client device - such as a phone, laptop, or another server - that connects to your Unraid WireGuard VPN. Defining a peer means creating a unique identity and securing keys for that device.

1. Select **Add Peer**.

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Add Peer](/img/peer-add.png)
</div>

2. Name the peer (e.g., *MyAndroid*).
3. Choose the initial connection type for full network access, typically *Remote access to LAN*.
4. Click **Generate Keypair** to create public and private keys. Keep the private key secure.
5. Optionally, generate a preshared key for extra security.
6. Click **Apply**.

:::note
While peers can generate their own keys, letting Unraid generate keys simplifies setup by providing complete config files.
:::

:::caution
Adding a new peer can temporarily disable the WireGuard tunnel, which may interrupt your connection. Ensure you have local access to your server before making changes.
:::

#### Configuring a peer (client)

<Tabs>
<TabItem value="mobile" label="Mobile device" default>

1. Select the eye ![Peer configuration](/img/eye-icon.png) icon to view the peer configuration.

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Peer configuration](/img/peer-eye.png)
</div>

2. In the WireGuard mobile app, choose **Create from QR code** and scan the QR code.
3. Name the connection and connect. The VPN tunnel should start quickly.
4. Keep the QR code private - anyone with it can access your VPN.

</TabItem>
<TabItem value="other" label="Other devices">

1. Select the eye ![Peer configuration](/img/eye-icon.png) icon to view the peer configuration.

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Peer configuration](/img/peer-eye.png)
</div>

2. Download the configuration file.
3. Securely transfer it to the client device (e.g., via trusted email or cloud storage).
4. Unzip and import the configuration into the WireGuard client.
5. Protect this file to prevent unauthorized VPN access.

</TabItem>
</Tabs>

#### Configuring your DNS

1. Access devices using IP addresses or fully qualified domain names (e.g., `yourpersonalhash.unraid.net`).

:::note
Short names like "tower" or router-managed DNS entries may not work over the VPN.
:::

2. To enable short name resolution:
   - Go to **Settings > VPN Manager** in Unraid.
   - Switch from **Basic** to **Advanced** mode.
   - Enter the IP address of your preferred DNS server in the **Peer DNS Server** field.
   - Save changes and update the client configuration file.
  
3. Recommended DNS servers:
   - Your LAN router’s IP address.
   - Public DNS servers like `8.8.8.8`.

This setup is especially important for **Remote tunneled access** mode, where the client’s original DNS server may be inaccessible.

:::note
mDNS addresses (e.g., `tower.local`) only work on the local network and not over WireGuard VPN.
:::

#### Complex networks

For most users, the default **Use NAT** setting works out of the box and allows access to Unraid and most LAN devices. However, if you use Docker containers with custom IPs or VMs with strict networking requirements:

1. In your WireGuard tunnel configuration, set **Use NAT** to **No**.
2. On your router, add a static route for the WireGuard tunnel network (e.g., `10.253.0.0/24`) pointing to your Unraid server’s IP.
3. In **Settings > Docker Settings**, set **Host access to custom networks** to **Enabled**.

#### Configurations to avoid

| Use NAT setting | Host access to custom networks         | Server & Dockers (Bridge/Host) | VMs & other LAN systems | Dockers with custom IP | Notes                                               |
|-----------------|---------------------------------------|-------------------------------|------------------------|-----------------------|-----------------------------------------------------|
| Yes             | Disabled (Static route optional)      | Accessible                    | Accessible             | Not accessible        | Simple network setup; recommended for most users     |
| Yes             | Enabled (Static route optional)       | Accessible                    | Not accessible         | Not accessible        | Avoid this configuration                            |
| No              | Disabled (No static route)            | Accessible                    | Not accessible         | Not accessible        | Avoid; requires static route to function properly    |
| No              | Disabled (With static route)          | Accessible                    | Accessible             | Not accessible        | Almost correct; enable host access to custom networks|
| No              | Enabled (With static route)           | Accessible                    | Accessible             | Accessible            | Recommended setup for complex networks              |

### Troubleshooting WireGuard

WireGuard is designed to be unobtrusive - if something isn’t working, it won’t provide error messages. To troubleshoot effectively, you should systematically check each aspect of your setup.

#### Connection checklist

- ✅ The tunnel is active on both Unraid and client devices. *("Active" means the tunnel has started but is not necessarily connected.)*
- ✅ DDNS URL points to your current public IP and is set in **Local endpoint**.
- ✅ Correct UDP port is forwarded from your router to Unraid, matching the **Local endpoint** port.
- ✅ Clients have the latest configuration files after any server-side changes.
- ✅ Changes are saved before viewing or distributing peer configs (QR codes/files).

#### Additional troubleshooting ideas

<details>
<summary><strong>First-time setup tips</strong></summary>

If you’re setting up WireGuard for the first time, these tips can help you avoid common pitfalls:

- Set up your first client using a mobile device on cellular data (not Wi-Fi) to rule out local network issues.
- Use the QR code method for the easiest configuration transfer.

</details>

<details>
<summary><strong>Handshake and connectivity issues</strong></summary>

If you’re not seeing a handshake or can’t connect, try these targeted checks:

- If you don’t see a handshake, try generating traffic (for example, pinging the server) to trigger the connection.
- Disable energy-saving, data saver, or battery saver features on mobile clients, as these may interfere with VPN operation.
- Ensure that the client and server networks use different subnets (for example, avoid both using `192.168.1.0/24`).
- If using Cloudflare for DDNS, set **Proxy status** to **DNS only** (not **Proxied**). Allow time for DNS changes to propagate.
- If you can connect from some locations but not others, the remote network may block UDP traffic. WireGuard currently does not support TCP as a fallback.

</details>

<details>
<summary><strong>Advanced network conflicts</strong></summary>

If your network setup is more complex, or you suspect an IP conflict, review these advanced troubleshooting steps:

- In **Advanced** mode, confirm that your **Local tunnel network pool** does not overlap with any existing network on either side. If there’s a conflict, change to a different private subnet (for example, `10.10.10.0/24`).
- For Docker containers with custom IPs or VMs with strict requirements, see the [Complex networks](#complex-networks) section.

</details>

<details>
<summary><strong>Emergency recovery</strong></summary>

If you lose access to the Unraid webGUI and need to disable WireGuard auto-start

- Delete `/boot/config/wireguard/autostart` from your flash drive and reboot.
</details>

---

## Outgoing VPN connections

Unraid supports outgoing WireGuard VPN connections to commercial providers, allowing you to route Docker containers or your entire server’s traffic through a secure tunnel. This is useful for privacy, bypassing geo-restrictions, or securing outbound data. For community insights and troubleshooting, see the [WireGuard VPN tunneled access forum thread](https://forums.unraid.net/topic/84316-wireguard-vpn-tunneled-access/).

### Choosing a VPN provider

Selecting the right VPN provider depends on your priorities - speed, privacy, ease of use, and support. The following providers are well-supported by Unraid and offer strong WireGuard integration:

| Provider       | Best for                | Key features                               | Support in Unraid | Notes                       |
|----------------|-------------------------|--------------------------------------------|-------------------|-----------------------------|
| [NordVPN](https://nordvpn.com/)        | Speed, privacy, value   | Double NAT, no-logs, global network        | Excellent         | NordLynx protocol, fast     |
| [Surfshark](https://surfshark.com/)      | Budget, unlimited devices| No-logs, unlimited connections, fast speeds| Excellent         | Great value, easy setup     |
| [ProtonVPN](https://protonvpn.com/)      | Privacy, open-source    | Double NAT, Secure Core, no-logs           | Excellent         | Open-source, strong privacy |
| [Mullvad](https://mullvad.net/en)        | Anonymity, simplicity   | No personal info, flat pricing, open-source| Excellent         | Pay with cash, no email     |
| [PureVPN](https://www.purevpn.com/)        | Streaming, flexibility  | Large network, easy Unraid integration     | Good              | Good support, fast speeds   |
| [CyberGhost](https://www.cyberghostvpn.com/)     | Streaming, ease of use  | Optimized servers, fast speeds             | Good              | User-friendly apps          |
| [IVPN](https://www.ivpn.net/en/), [OVPN](https://www.ovpn.com/en), [Windscribe](https://windscribe.com/) | Niche needs      | Advanced privacy, regional options         | Good              | Community-supported         |

:::tip
Choose a provider with native WireGuard support and strong privacy policies. Avoid providers that require custom clients or proprietary protocols.
:::

### Configuring VPN tunneled access for Docker

You can route specific Docker containers through a commercial VPN tunnel - no router changes required.

1. Download the WireGuard config file from your chosen provider.
2. In **Settings > VPN Manager**, select **Import Config** and upload the file. This creates a new tunnel.
3. The **Peer type of access** defaults to *VPN tunneled access for Docker*. Optionally, give it a local name.
4. Click **Apply**.
5. Set the tunnel toggle to **Active**.

:::tip
Note the tunnel name (e.g., `wg0`, `wg1`, `wg2`). You’ll need it when configuring Docker containers.  
If your provider specifies a DNS server in their config, record it for later use. If not, use a public DNS like `8.8.8.8`.
:::

### Testing the Docker tunnel

To verify your Docker tunnel is working and not leaking DNS or IP information:

1. Install a [Firefox](https://unraid.net/community/apps?q=Firefox) Docker container via Community Applications.
2. Set its **Network Type** to **Custom: wgX** (replace X with your tunnel name).
3. Switch to **Advanced** view and add your DNS provider to **Extra Parameters** (e.g., `--dns=8.8.8.8`).
4. Apply changes and start the container.
5. Launch Firefox and visit [whatismyipaddress.com](https://whatismyipaddress.com/) to verify your IP address matches the VPN server’s country.
6. Visit [dnsleaktest.com](https://www.dnsleaktest.com/) and confirm only your VPN’s DNS servers are detected.

You can assign additional containers to this tunnel or create multiple tunnels.

### Configuring VPN tunneled access for the system

To route all Unraid traffic through a commercial VPN:

1. Download the WireGuard config from your provider.
2. In **Settings > VPN Manager**, select **Import Config** and upload the file.
3. Optionally, rename the tunnel.
4. Click **Apply**.
5. Set the tunnel toggle to **Active**.

:::note

- You may need to disable the tunnel temporarily for Unraid updates or plugin installations.
- Only one system-wide tunnel can be active at a time.
- Unraid ignores DNS settings from the imported config. Set Unraid’s DNS to a reliable public server (e.g., `8.8.8.8`, `8.8.4.4`).

:::

### Testing the system tunnel

1. Install the [Firefox](https://unraid.net/community/apps?q=Firefox) Docker container.
2. Accept all defaults.
3. Launch Firefox and visit [whatismyipaddress.com](https://whatismyipaddress.com/). Your IP address should match your VPN provider’s location.

---

### Support and Community Resources

For the most up-to-date guidance, troubleshooting assistance, and community tips, visit the following resources on the [Unraid forums](https://forums.unraid.net/):

- **[WireGuard VPN Tunneled Access](https://forums.unraid.net/topic/84316-wireguard-vpn-tunneled-access/)**  
  This community discussion focuses on routing Docker containers or system-wide traffic through commercial WireGuard VPN providers. It includes real-world setup examples, DNS leak testing tips, and troubleshooting advice for outbound tunnels.

- **[Dynamix WireGuard Plugin Thread](https://forums.unraid.net/topic/84229-dynamix-wireguard-vpn/)**  
  This is the official thread for the Dynamix WireGuard plugin. It covers plugin updates, feature requests, bug reports, and general questions and answers related to Unraid’s built-in WireGuard support.

- **[WireGuard Quickstart](https://forums.unraid.net/topic/84226-wireguard-quickstart/)**  
  A step-by-step guide for setting up inbound WireGuard VPN connections to Unraid. This resource includes configuration walkthroughs, peer setup instructions, and tips for remote access.
