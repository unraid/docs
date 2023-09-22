---
sidebar_position: 1
---

# User management

Even though Unraid, at its core, is based on a Linux distribution, it does not support the standard set of user facilities available on most Linux systems. Instead the users defined in Unraid can be divided into:

* **Root user** - a single user account which manages every aspect of the Unraid server.
* **Share users** - user accounts that are given access to specific shares on the Unraid server.

## Root user

As a NAS appliance and not a general purpose Linux server, Unraid has only one fixed superuser to manage the server, `root`. All other user accounts are share access-level users, which connect to your Unraid server over the network.

The `root` user, also referred to as the 'Unraid administrator', has full access via the WebGUI, SSH, or Telnet, and administrates all aspects of Unraid, with unlimited access to the server's resources. You can even install SSH authorization keys to enable passwordless authentication by SSH. `root` users are the only ones who can manage user accounts.

As a matter of security, the `root` account cannot access data on shares via SMB, NFS, or FTP.

:::important

The security of your `root` account is vital. Please read our [guidance](../security/good-practices.md#1-set-a-strong-root-password) on setting a strong password.

:::

## Share users

Users that are given access to shares on the Unraid server are called share users. The `root` user is the only one who can set up user accounts.

Share users can access [disk shares or user shares](../shares/shares.md) through a file navigator or FTP (if enabled). They cannot access the Unraid WebGUI or use SSH and Telnet.
