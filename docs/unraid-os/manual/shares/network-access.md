---
sidebar_position: 4
---

# Network access

## Communication protocols

For any type of share, you can control which protocols provide access to your Unraid server over the network. Unraid supports some of the most widely-used communication protocols for network access. These are:

* **SMB**, or Server Message Block, is the standard protocol used by Windows systems. It is also widely implemented on other systems, including macOS X.
* **NFS**, or Network File System, is a widely-used protocol on Unix-compatible systems.
* **FTP**, or File Transfer Protocol, offers the flexibility of being supported through browsers and client software in different devices with different OSes.

:::important

As of Unraid 6.9, **AFP** support has been deprecated. For best interoperability with macOS, and to export a share for Time Machine purposes, in ***Settings > SMB*** set the **Enhanced macOS interoperability** parameter to *Yes*.

:::

## Protocol selection

Your choice of protocol depends on the devices that exist on your network and the most common use case for file transfers. Modern versions of Windows and OS X support SMB and for this reason the protocol is enabled by default, while FTP and NFS are disabled. Each protocol also offers pros and cons, and is suited for different use cases.

For example, if you use an FTP client to access an FTP share on your Unraid server, and transfer large amounts of data, you can schedule a file upload or a download, or even resume a failed transfer.

## Access permissions at share level

Each protocol can be configured at the share level. On the **Shares** tab, select an existing share to display its settings. At the bottom of the share settings there is a security sub-section for any active network protocols. This section enables you to control the visibility of the share on the network. The setting is labelled **Export** and has the following options:

* **Yes** - The share will be visible across the network.
* **Yes (Hidden)** - The share can be accessed across the network but will not be listed when browsing the shares on the server. Users can still access the share as long as they know the name and the user is prepared to enter in manually.
* **No** - This will disable network access through that protocol, for that share.

## Share security

Share security determines how a share enables user access. If you need, a share may request user credentials to allow read/write access, or may be publicly available.

For example, you may configure a `movies` share on your Unraid server to request a valid username and password, just to read data from that share. You can also make it public, which requires no user credentials.

When you select an existing share on the **Shares** tab the share settings display. Here you can find a security section that enables you to control access to the share, for each of the protocols [you have enabled](./access-permissions.md).

The **Security** setting has the following options:

* **Public** - The share is unsecured and all users have both read and write access to the contents of the share.
* **Secure** - The share is secured and all users, including guests, have read access. You can select which of your users have write access.
* **Private** - The share is private, and you select which of your users have access. You can then pick if that user has read/write or read-only access.

:::caution Windows 'Gotcha'

There is an issue with the way Windows handles network shares: Windows only allows a single set of credentials to be in use on any one server. Any attempts to connect to a different share on the same server, that requires a different set of credentials, and that is not a public share, automatically fails.

If you have any shares on the server set to *Private* or *Secure* access, it is important that you connect to that share first, before any shares set for *Public* access.

As a workaround you can access a server by both its network name and its IP address, that Windows identifies as different devices as far as authentication is concerned.

:::
