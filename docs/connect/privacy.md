---
sidebar_position: 5
---

# Privacy

Maintaining your data integrity, security, and privacy are of the utmost
importance to us at Lime Technology. Below is a disclosure of what we
store and relay when you use Unraid Connect. For more information,
please see our [policies](https://unraid.net/policies) page.

## Data We Store

When a server signs in to Unraid.net, it opens a secure connection to
our hosted infrastructure and sends just enough data so we can give you
a meaningful overview of your servers in the [Unraid Connect
Dashboard](https://connect.myunraid.net). We do not keep
historical data, just the most recent update from your server which
includes:

- Your server's hostname, description, and icon
- Your server's keyfile details and flash GUID
- Your server's Local Access URL
- Your server's LAN IP, if an unraid.net certificate is installed
- Your server's Remote Access URL and WAN IP, if Remote Access is
  enabled
- The version of Unraid that is installed, and its uptime
- The version of the Unraid Connect plugin that is installed, and
  version / uptime of the unraid-api
- The size of your array and the amount used (just numbers, no details
  about what is stored on the array)
- The number of Docker Containers and VMs installed and started

Separate and unrelated to the Unraid Connect Dashboard, the
[Flash Backup](./flash-backup.md#privacy) service stores your server's configuration data.

This data is stored solely for the purpose of providing services to you
through our platform and is not publicly accessible. To remove this data
from our servers you must follow the procedure listed in the
[Uninstalling the plugin](./help.md#uninstalling-the-plugin) section as well as remove all SSL certificates
generated for you through our Let's Encrypt partnership.
