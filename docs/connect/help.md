---
sidebar_position: 2
---

# Unraid Connect Help

## Installation

1. Navigate to the ***Apps*** tab, then search for and install **Unraid Connect**
2. In the top right corner of your Unraid server, click the Unraid logo and then Sign In. Follow the
   prompts to sign in with your Unraid.net credentials, or create a new
   account.
   ![Sign In](./assets/Sign-in-up-connect-975a8554.png)
3. Register Your Server with Unraid Connect by following the
   prompts![Register Server](./assets/Register-a-server-7f35552e.png)
4. Visit the Unraid Connect Dashboard (see below)

## Unraid Connect Dashboard

Sign in to the Unraid Connect Dashboard at [https://connect.myunraid.net](https://connect.myunraid.net)
for a comprehensive overview of your Unraid server's online/offline status,
available storage, license type, uptime, Unraid OS version, and more.

If you have multiple servers, you will see each one listed in the
left-side pane and a tile for each server.
![Connect Dashboard](./assets/Screenshot_2023-04-24_at_1.01.20_PM.png)

From here, you can get more details about each server by clicking on
**Details**.

### Manage Your Server From Within the Connect UI

Servers equipped with a myunraid.net certificate can be managed directly
from within the Connect web UI.

You can even manage multiple servers from your phone, tablet, laptop, or
PC in the same browser window.

To install a myunraid.net certificate, head to the ***Settings →
Management Access*** page of the Unraid WebGUI and click **Provision** in
the **Certificate** section, if applicable.

### A note regarding DNS Rebinding Protection

![DNS Rebinding Error](./assets/Dns_rebinding_error.png)

If you see this
message after clicking the **Provision** button, click **OK**, try
waiting 2-5 minutes, then click **Provision** again. If that doesn't
work, keep reading.

Many routers have a security feature known as DNS Rebinding Protection.
This feature prevents public DNS entries from pointing to local IP
addresses on your network. Unfortunately, this *feature* prevents us
from providing proper SSL access when connecting to the WebGUI locally.
As such, users must either disable this feature on their router or set
their router to allow DNS rebinding for the myunraid.net domain (if the
certificate was provisioned in Unraid 6.10) or unraid.net domain (if the
certificate was provisioned in 6.9) Depending on your router, how this
feature is described and whether or not it is available to configure may
vary. In addition, once you have DNS rebinding disabled on your router,
when you go to provision your certificate, you may still see the DNS
rebinding error message the first time. This is due to the time it takes
for DNS records to propagate once provisioned.

### How to access your server when DNS is down

Once you enable local SSL per the instructions above, you will access
your server through a Fully Qualified Domain Name:

`https://ip.yourpersonalhash.myunraid.net` or
`https://ip.yourpersonalhash.myunraid.net:<https_port>` (if your https
port is not the default of 443)

This is required in order to utilize a fully valid SSL certificate. A
downside is if you temporarily lose Internet access and your browser has
not cached the DNS for yourpersonalhash.unraid.net, you will be unable
to access the WebGUI.

If the Internet goes down and you lose access to DNS, do the following:

* If **Use SSL/TLS** is set to **Yes**, then you can access your server
  using: `https://[servername].[localTLD]` or `https://servername.[localTLD]:<https_port>` (if your https port is not the default of 443)
* If that doesn't work, or if **Use SSL/TLS** is set to **Strict**, then
  using telnet, SSH or local keyboard/monitor log in to the server and
  type: `use_ssl no`
* Now you will be able to access your server's WebGUI via:
  `http://<ip_address>` (note: http not https) or
  `http://<server_ip>:<http_port>` (if your http port is
  not the default of 80)
* When the Internet comes back, navigate to ***Settings → Management***
  Access and set **Use SSL/TLS** back to **Strict** to re-enable local
  SSL.

### How to disable SSL for local access

(If you currently cannot access the WebGUI, scroll up to the previous
topic.) If you decide you would rather not use the secure
`https://ip.yourpersonalhash.myunraid.net` url for local access, you can
disable SSL. There is no need to uninstall the Unraid Connect plugin, in
fact that will have no effect on SSL as this is a core feature of Unraid
and not the plugin.

Navigate to ***Settings → Management Access***, set **Use SSL/TLS** to
**No** and hit Apply. This will also disable the [Remote Access](./remote-access.md) feature at the same time.

## Server Deep Linking

Deep linking allows you to manage relevant sections of the Unraid WebGUI
in one click. Click any of the circled link buttons to take you right to
the relevant page in the Unraid WebGUI:

![Server Deep Linking](./assets/Deep-linking.png)

## Customizable Dashboard, Server Banner Image and Themes

Set custom server tiles how you like and automatically display your
server's banner image on your Connect Dashboard.

Under Server Details, there is a hamburger button on each tile for east
drag and drop arranging.

To toggle between dark and light mode, click the Sun or Moon icon in the
far right of the Connect UI.

![Toggle Dark Mode Light Mode](./assets/Screenshot_2023-04-24_at_1.44.03_PM.png)

## License Management

Manage your license keys at any time via the My Keys section. You can
even upgrade right from the Connect UI.

![License Management](./assets/Screenshot_2023-04-24_at_1.39.53_PM.png)

## Language Localization

Unraid OS has a global user base so be sure to enjoy Unraid Connect in
English, German, French, Spanish or Chinese!

![Localization](./assets/Screenshot_2023-04-24_at_1.44.16_PM.png)

## Signing Out

In the event that you wish to sign out of the Unraid Connect program on
your system, you can do so from the ***Settings → Management Access →
Unraid Connect → Account Status*** and click the Sign Out button.

**NOTE**: Signed-out servers will still be displayed on the Unraid
Connect Dashboard, but you will only be able to download their
registration key(s).

## Uninstalling the plugin

Note: if your goal is to change your url from
`https://yourpersonalhash.unraid.net` back to `http://computername`, see
[How to disable SSL for local access](#how-to-disable-ssl-for-local-access).
Uninstalling the plugin will have no effect on your url!

Uninstalling the plugin will automatically:

* Deactivate and delete the backup files from your flash drive.
  In time, the files will automatically be removed from our cloud servers
  once we recognize the backups are abandoned.
  To proactively delete them, you can [Disable Flash Backup](./flash-backup.md#disabling-flash-backup)
  before uninstalling the plugin.
* Disable Remote Access. Please
  remember to disable any port forward that you configured in your
  router related to this feature.
* Sign Out from Unraid.net.

## Connect Troubleshooting

It should be rare, but if you see any connection error messages in the
UPC please open a terminal window and type:

`unraid-api restart`

If you have other Unraid Connect Support related questions, please see
our [Unraid Connect user forum](https://forums.unraid.net/forum/94-connect-plugin-support/) or
[contact us](https://unraid.net/contact) to open a support ticket.
