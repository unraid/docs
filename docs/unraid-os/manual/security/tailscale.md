---
sidebar_position: 6
---

# Tailscale

At its simplest, Tailscale is another way to get remote access to your home network. It is easier to configure and use than any other solution we have found. And it is based on WireGuard underneath, so it is among the most secure options as well.

But Tailscale is actually much more than that. Every machine you add goes onto your personal *Tailnet*, an "overlay network" that allows those machines to connect regardless of where they are physically located or how they are connected to the Internet.

And you can optionally share individual machines (including individual Docker containers!) with other people, and other people can optionally share their machines with you.

## Getting Started

To get started, first [sign up for a free Tailscale account](https://login.tailscale.com/start) and install it on at least one client machine (it is available for Windows/Mac/iOS/Android and more). A free account allows three users and 100 machines.

On the [Tailscale website](https://login.tailscale.com/admin/dns), navigate to the DNS tab.

1. Consider [Renaming your tailnet](https://tailscale.com/kb/1217/tailnet-name) from the basic `tail92ac42.ts.net` style of name to something fun like `zebra-pancake.ts.net`
2. Enable [MagicDNS](https://tailscale.com/kb/1081/magicdns) if it is not already
3. Enable [HTTPS Certificates](https://tailscale.com/kb/1153/enabling-https). This allows each machine to have a unique name and https certificate for secure communication.

:::warning

Keep in mind that [details about issued HTTPS certificates are public](https://certificate.transparency.dev/howctworks/), even if you only use them on a private network, so make sure you are comfortable with your machine names being public before you do this.

:::

## Adding Tailscale to Unraid

1. Review the [Getting Started](#getting-started) section above, there are some adjustments you'll want to make to your Tailscale account before continuing
2. Navigate to Community Apps, search for **Tailscale plugin** and install it. Big thanks to [@EDACerton](https://forums.unraid.net/profile/244077-edacerton/) aka [@dkaser](https://github.com/dkaser) for all their work on this plugin!
3. Navigate to ***Settings → Tailscale*** and click **Reauthenticate** (you will sign in with your Tailscale account, not your Unraid.net account)
4. Click **Connect** to add this system to your Tailnet. You can then close the window.
5. If you are on Unraid 7.0.0-beta.3 or higher, navigate to ***Settings → Management Access*** to see your new Tailscale URL(s) which any system on your Tailnet can use to access the Unraid webGUI.
6. Navigate to ***Settings → Tailscale*** to find this system's name and IP address on the Tailnet. This can be used to access SMB/NFS shares or most Docker containers, etc.  Just replace the URL you normally use with the name/IP shown here.

### Subnet routing (optional)

If you would prefer to access the system by its main IP when connected to the Tailnet, or if you want to access Docker containers that are on their own IPs:

1. Navigate to ***Settings → Tailscale***, click the **Viewing** button and **Sign In**
2. Click **Subnet router** and add either:
    1. Your Unraid server's IP address in the format `192.168.0.12/32`
    2. Or your whole network's subnet in the format `192.168.0.0/24`
3. Then click **Advertise routes**
4. You will see a *Pending approval* message and a link where you can approve the route
5. Once you approve the route, other machines on your Tailnet will be able to access either:
    1. Your Unraid server by its main IP
    2. Or everything on your network
6. See the Tailscale Docs for more information about [Subnet routing](https://tailscale.com/kb/1019/subnets)

## Adding Tailscale to Docker containers

### Introduction to Tailscale in Docker

New to Unraid 7.0.0-rc.1

You can optionally add Tailscale to almost any Docker container managed by Unraid!  Some of the benefits of doing this are:

* The container will appear as a unique machine on your Tailnet, which means you can share just that container with other people without giving them access to your whole server. See [Sharing](https://tailscale.com/kb/1084/sharing.)
* You can set up a VPN container to be an Exit Node, which any other machine on your Tailnet (or anyone you have shared this machine with) can use. See [Exit Nodes](https://tailscale.com/kb/1103/exit-nodes).
* You can configure the container to send its outgoing Internet traffic through an Exit Node on your Tailnet (or one that has been shared with you.) See [Exit Nodes](https://tailscale.com/kb/1103/exit-nodes).
* If the container has a website, enable Tailscale Serve to access it from your Tailnet via a friendly https URL with a full certificate. No port forwarding is necessary! See [Serve](https://tailscale.com/kb/1312/serve).
* Or you can even make the container's website available on the Internet using Tailscale Funnel. See [Funnel](https://tailscale.com/kb/1223/funnel).

### Install Tailscale everywhere

If you plan to use Tailscale in your Docker containers, we recommend installing it on any computer that needs to access these containers. The **Tailscale WebUI** URLs are much nicer than the default **WebUI** URLs, and in certain configurations ([see below](#userspace-networking)) the original container **WebUI** URLs stop working, requiring you to be on the Tailnet to access the container.

The Tailscale plugin for Unraid is technically *not required* for Docker integration, but for the best experience, we recommend installing it and signing in to Tailscale on your Unraid server.

### Install Tailscale in a Docker container

1. Review the [Getting Started](#getting-started) section above, there are some adjustments you'll want to make to your Tailscale account before continuing
2. Navigate to the ***Docker*** tab in the Unraid webGUI and edit a container
3. Enable the **Use Tailscale** switch
4. Provide the **Tailscale Hostname** for this container. It does not need to match the container name, but it must be unique on your Tailnet.

    :::warning

    Note that an HTTPS certificate will be generated for this hostname, which means it will be placed in a public ledger, so use a name that you don't mind being public.
    For more details, see [enabling https](https://tailscale.com/kb/1153/enabling-https).

    :::

5. Specify whether this container will **Be an Exit Node** or not, this is most useful for containers that connect to commercial VPN services. For more details, see the Tailscale documentation on [Exit Nodes](https://tailscale.com/kb/1103/exit-nodes).
6. Specify whether this container should **Use an Exit Node** for its outgoing Internet traffic. If you have the Tailnet plugin installed on your server you will see a list of Exit Nodes to choose from. If not, you will need to provide the IP address of the Exit Node to use. For more details, see the Tailscale documentation on [Exit Nodes](https://tailscale.com/kb/1103/exit-nodes).
7. If you chose to **Use an Exit Node**, specify whether the container should also have access to your LAN.
8. Depending on your previous choices, the **Tailscale Userspace Networking** field may already be set for you. If not, you will probably want to leave it **disabled**. [See below](#userspace-networking) for details.
9. Specify whether or not to enable **Tailscale SSH**. This is similar to the Docker **Console** option in the Unraid webGUI, except you connect with an SSH client and authenticate via Tailscale. For more details, see the [Tailscale SSH](https://tailscale.com/kb/1193/tailscale-ssh) documentation.
10. Enable **Serve** to easily reverse proxy a website in the container at a friendly https url with a full certificate. For more details, see the [Tailscale Serve](https://tailscale.com/kb/1312/serve) documentation. Or enable **Funnel** to make the container's website available on the open Internet (use with care as the container is likely to be attacked!) See the [Tailscale Funnel](https://tailscale.com/kb/1223/funnel) documentation.

    :::warning

    Note that when accessing the Tailscale WebUI URL via **Serve** or **Funnel**, no additional authentication layer is added - the container is still responsible for managing usernames/passwords that are allowed to access it.

    :::

    1. Unraid will automatically determine the best port to reverse proxy via **Serve** or **Funnel** based on the **WebUI** field for this container, visible by switching from **Basic View** to **Advanced View** in the upper right corner of the Edit Docker page. To override this value, enable **Tailscale Show Advanced Settings** and modify the **Tailscale Serve Port**.
    2. In most cases, specifying the port is all that is needed to get **Serve** or **Funnel** working. Additional settings are available behind the **Tailscale Show Advanced Settings** switch. See the inline help and the Tailscale documentation for [Tailscale Serve Command Line](https://tailscale.com/kb/1242/tailscale-serve) for details on using those advanced settings.

11. **Apply** your changes, then click **View Container Log**. Watch the logs for Tailscale-related messages and click the link titled "To authenticate, visit".  This will take you to the Tailscale website where you can approve the request to add this container to your Tailnet.
12. If you see a message saying "ERROR: Couldn't detect persistent Docker directory for .tailscale_state", please do the following:
    1. Edit the Docker container, look at the paths which are mapped and pick one to store your Tailscale state data, then identify the **Container Path** for that mapping. For this example we will assume it is `/container-path/`, adjust as needed.
    2. Enable **Tailscale Show Advanced Settings** and set the **Tailscale State Directory** to:

    ```xml
    /container-path/.tailscale_state
    ```

    3. Start the container and it will use your specified directory to store the Tailscale state files.
    4. Note: if you are a Docker XML author you can simplify this for your users by adding this variable to the container’s XML file so your users don’t have to do this:

    ```xml
    <TailscaleStateDir>/container-path/.tailscale_state</TailscaleStateDir>
    ```

## Updating Tailscale

Tailscale is updated regularly. See their [changelog](https://tailscale.com/changelog).

To update the version of Tailscale used by Unraid itself, simply update the Tailscale plugin once an update is available.

To update the version of Tailscale inside a Docker container, first hover over the Tailscale icon on the Docker listing page. It will tell you if an update is available.
There are two ways to update the container:

1. On the Docker Listing page, switch from **Basic View** to **Advanced View** in the upper right corner of the page, then click the **Force update** option for this container.
2. Or you can edit the container, make a dummy change, and apply.

## Technical Details

### Userspace Networking

:::tip

You can ignore the details of **Userspace Networking** if you install Tailscale on all systems that need to access the containers and if you always access the containers via the **Tailscale WebUI** URL.

:::

When **Userspace Networking** is *enabled*, the container will operate in a restricted environment. Tailscale DNS will not work, and the container will not be able to initiate connections to other Tailscale machines. However, the container will be reachable by either the **Tailscale WebUI** URL or the original **WebUI** URL.

When **Userspace Networking** is *disabled*, the container will have full access to your Tailnet. Tailscale DNS will work, and the container can fully communicate with other machines on the Tailnet. However, the original **WebUI** may not work, details below.

:::info

To be clear, a **Tailscale WebUI** URL is only accessible by other machines with Tailscale installed. They need to be on your Tailnet or you need to have shared the machine with them.

:::

Certain Tailscale features have requirements that affect **Userspace Networking**:

* Containers which have enabled **Be an Exit Node** always have **Userspace Networking** *enabled*
* Containers which **Use an Exit Node** always have **Userspace Networking** *disabled*

Additionally, **Userspace Networking** options depends on the **Network type** of the container:

* **host**: always has Userspace Networking *enabled*
  * The container will be accessible by both the **Tailscale WebUI** URL and the original **WebUI** url
* **bridge**: defaults to having Userspace Networking *disabled*, but it can be *enabled* if desired
  * When **Userspace Networking** is *enabled* the container will be accessible by both the **Tailscale WebUI** URL and the original **WebUI** url
  * When **Userspace Networking** is *disabled* the container will only be accessible by the **Tailscale WebUI** URL and not the original **WebUI** url
* **eth0/br0/bond0**: defaults to having Userspace Networking *disabled*, but it can be *enabled* if desired
  * The container will be accessible by both the **Tailscale WebUI** URL and the original **WebUI** URL, regardless of the **Userspace Networking** setting.
* **container/wg0**: currently defaults to having Userspace Networking *disabled*, but it can be *enabled* if desired. Note that this is untested. The usefulness of adding Tailscale here is unclear

### How does the Unraid Tailscale-Docker integration work?

When you enable the **Use Tailscale** switch and click **Apply**:

1. Unraid will extract the default **Entrypoint** and **CMD** from the container
2. The **tailscale_container_hook** script will be mounted in the container to `/opt/unraid/tailscale-hook` and the container's **Entrypoint** will be modified to call it
3. The original **Entrypoint** and **CMD** from the container, alongside the other necessary variables for Tailscale, will be passed to the Docker run command
4. When the container starts, the **tailscale_container_hook** script will be executed, which installs dependencies and then downloads and runs Tailscale
5. The **tailscale_container_hook** script will then run the original **Entrypoint** and **CMD** which was extracted in step 2 and the container will start as usual
