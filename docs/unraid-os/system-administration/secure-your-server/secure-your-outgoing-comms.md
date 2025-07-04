---
sidebar_position: 8
sidebar_label: Secure your outgoing communications
---

# Secure your outgoing communications

The **Outgoing Proxy Manager**, introduced in Unraid 7.0, allows you to route Unraid's outgoing HTTP communications through an HTTP proxy server. This tool is designed to help you bypass restrictive firewalls or comply with network policies that require proxy usage. Note that the Outgoing Proxy Manager only applies to Unraid's own system traffic, not to Docker containers or virtual machines.

The Outgoing Proxy Manager is ideal for:

- Environments where direct Internet access from Unraid is blocked or filtered.
- Organizations that need all server traffic to pass through a managed proxy for auditing or compliance.
- Users who want to work around restrictive firewalls without routing all server traffic through a VPN.

### Outgoing proxy vs. VPN: Which should you use?

| Use case                                  | Recommended tool         | Why                                                                                 |
|-------------------------------------------|--------------------------|-------------------------------------------------------------------------------------|
| Bypass firewall for Unraid system updates | Outgoing Proxy Manager   | Routes only Unraid's system traffic through a proxy; simple and minimal configuration.  |
| Secure all outgoing traffic (system-wide) | Tailscale, WireGuard | Encrypts and tunnels all traffic from Unraid (including Docker/VMs) to remote sites. |
| Isolate Docker or VM traffic              | VPN or container proxy    | Configure VPN at the container/VM level for granular control.                        |
| Compliance with corporate proxy policies   | Outgoing Proxy Manager   | Integrates with existing HTTP proxy infrastructure.                                  |

For most users, solutions like [Tailscale](../secure-your-server/secure-remote-access.md#tailscale) or [WireGuard](../secure-your-server/secure-remote-access.md#wireguard) are preferred for full-system security and privacy. Use Outgoing Proxy Manager when you only need to proxy Unraid's own HTTP requests.

### Setting up a proxy server

To set up a proxy server:

1. Navigate to **Settings → Outgoing Proxy Manager** in the WebGUI.

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Outgoing Proxy Manager](/img/outgoing-proxy-manager.png)

</div>

2. Add your proxy's name, URL, and (if required) username/password.
3. Click **Apply**.
4. Select your new proxy from the list and click **Apply** again.

The WebGUI will automatically use the selected proxy for outgoing system traffic. If you have open web terminals or SSH sessions, close and reopen them to apply the new proxy settings. This usage is transparent—monitor proxy server logs to verify activity.

### Choosing an HTTP proxy server

- **If your organization provides a proxy:** Use the address and credentials supplied by your network administrator.
- **If you need to set up your own:**  
  - The [Proxy Server Docker container by @ich777](https://forums.unraid.net/profile/72388-ich777/) is tested and works well with Unraid.
  - You can configure this container to route traffic through a commercial VPN using Unraid's [WireGuard VPN](../security/vpn/) or connect it to another Docker-based VPN service.
  - For reliability, host the proxy server on a separate system from Unraid to ensure network availability during boot.

To monitor proxy traffic, go to the **Docker** tab on the proxy host system, select the **Proxy Server** container, and view **Logs**.

### Automatic import and plugin compatibility

- If you previously used the **Proxy Editor** plugin, it will be automatically removed upon upgrading to Unraid 7.0+ with built-in proxy support.
- Legacy proxy settings in your `config/go` script or in `community.applications/proxy.cfg` will be imported automatically, and the old files will be renamed for safety.

### Plugin compatibility

- Plugins using PHP’s `curl_init()` function will automatically use the outgoing proxy.
- Plugins using `file_get_contents()` should migrate to `curl_init()` for proxy compatibility.
- For command-line processes, prefer `curl` over `wget` for proxy support.

For additional information about plugin development and compatibility, visit the [Plugins section of the documentation](../plugins/).

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
