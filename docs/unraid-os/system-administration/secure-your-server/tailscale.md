---
sidebar_position: 6
sidebar_label: Tailscale
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Tailscale

Unraid now features deep integration with [Tailscale](https://tailscale.com/), thanks to a technology partnership that directly connects seamless, secure networking to your server. Tailscale isn’t a traditional VPN - it’s a modern, peer-to-peer overlay network built on WireGuard. It lets you connect devices, servers, and individual Docker containers into your secure private network (Tailnet), regardless of their physical location or network environment. The Unraid partnership ensures the Tailscale plugin is fully maintained and tightly integrated, offering native certificate support and advanced features in Unraid 7 and newer.

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