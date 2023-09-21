---
sidebar_position: 1
---

# User management

Even though Unraid, at its core, is based on a Linux distribution, it does not support the standard set of user facilities available on most Linux systems. Instead the users defined in Unraid can be divided into:

* **Root user** - a single user account which manages every aspect of the Unraid server.
* **Share users** - user accounts that are given access to specific shares on the Unraid server.

## Root user

As a NAS appliance and not a general purpose Linux server, Unraid has only one fixed superuser to manage the server, `root`. All other user accounts are share access-level users, which connect to your Unraid server over the network.

The `root` user, also referred to as the 'Unraid administrator' has full access via the WebGUI, SSH, or Telnet, and administrates all aspects of Unraid, with unlimited access to the server's resources. They are also the only user who can manage user accounts.

However, as a matter of security, the `root` account cannot access data on shares via SMB, NFS, or FTP.

## Share users

Users that are given access to shares on the Unraid server are called share users. These users can access [disk shares or user shares](../shares/shares.md), but rely on the server administrator to set up a user account.
