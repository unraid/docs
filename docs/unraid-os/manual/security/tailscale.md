---
sidebar_position: 6
---

# Tailscale

At its simplest, Tailscale is another way to get remote access to your home network. It is easier to configure and use than any other solution we have found. And it is based on WireGuard underneath, so it is among the most secure options as well.

But Tailscale is actually much more than that. Every machine you add goes onto your personal *Tailnet*, an "overlay network" that allows those machines to connect regardless of where they are physically located or how they are connected to the Internet.

And you can optionally share individual machines with other people, and other people can optionally share their machines with you.

To get started, first [sign up for a free Tailscale account](https://login.tailscale.com/start) and install it on at least one client machine (it is available for Windows/Mac/iOS/Android and more). A free account allows three users and 100 machines.

On the [Tailscale website](https://login.tailscale.com/admin/dns), navigate to the DNS tab.

1. Consider [Renaming your tailnet](https://tailscale.com/kb/1217/tailnet-name) from the basic `tail92ac42.ts.net` style of name to something fun like `zebra-pancake.ts.net`
2. Enable [MagicDNS](https://tailscale.com/kb/1081/magicdns) if it is not already
3. Enable [HTTPS Certificates](https://tailscale.com/kb/1153/enabling-https). This allows each machine to have a unique name and https certificate for secure communication.

:::warning

Keep in mind that HTTPS Certificates are public, so make sure you are comfortable with your machine names being public before you do this.

:::

To add Tailscale to Unraid:

1. Navigate to Community Apps, search for **Tailscale plugin** and install it. Big thanks to [@EDACerton](https://forums.unraid.net/profile/244077-edacerton/) aka [@dkaser](https://github.com/dkaser) for all their work on this plugin!
2. Navigate to ***Settings → Tailscale*** and click **Reauthenticate** (you will sign in with your Tailscale account, not your Unraid.net account)
3. Click **Connect** to add this system to your Tailnet. You can then close the window.
4. If you are on Unraid 7.0.0-beta.3 or higher, navigate to ***Settings → Management Access*** to see your new Tailscale URL(s) which any system on your Tailnet can use to access the Unraid webgui.
5. Navigate to ***Settings → Tailscale*** to find this system's name and IP address on the Tailnet. This can be used to access SMB/NFS shares or most Docker containers, etc.  Just replace the URL you normally use with the name/IP shown here.

If you would prefer to access the system by it's main IP, or if you want to access Docker containers that are on their own IPs, navigate to ***Settings → Tailscale***, click the **Viewing** button and **Sign In**

1. Click **Subnet router** and add either:
   1. Your Unraid server's IP address in the format `192.168.0.12/32`
   2. Or your whole network's subnet in the format `192.168.0.0/24`
2. Then click **Advertise routes**
3. You will see a *Pending approval* message, and a link where you can approve the route
4. Once you approve the route, other machines on your Tailnet will be able to access either:
   1. Your Unraid server by its main IP
   2. Or everything on your network
5. See the Tailscale Docs for more information about [Subnet routing](https://tailscale.com/kb/1019/subnets)
