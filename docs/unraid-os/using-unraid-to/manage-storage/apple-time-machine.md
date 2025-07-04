---
sidebar_position: 5
sidebar_label: Apple Time Machine
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Apple Time Machine

Apple’s Time Machine is a backup tool that comes with every Mac. It makes it easy to protect your files, applications, and system settings by automatically backing them up. By connecting Time Machine to your Unraid server, you can store these backups securely on your own hardware. This setup not only gives you more control but also allows for easier scalability and added peace of mind.

:::note macOS compatibility

This guide applies to macOS Ventura (13.x), Sonoma (14.x), and Sequoia (15.x) versions. Some features, such as SMB enhancements and Time Machine support over SMB, require macOS versions that support these protocols.

For the best results, keep your Mac updated to the latest version of macOS that is compatible with your hardware.

:::caution macOS Sequoia (15.x) considerations
Some users report intermittent issues with Time Machine and network shares on macOS Sequoia. If you experience backup failures, consider using the [Time Machine Docker container](https://unraid.net/community/apps?q=time+machine#r) as an alternative.
:::


## Creating a Time Machine share

:::caution Before you begin

Ensure **SMB** is enabled in the WebGUI:

  1. Go to **Settings → SMB** under "Network Services."
  2. Set **Enable SMB** to **Yes** (you must stop the array to change this).
  3. Set **Enhanced macOS interoperability** to **Yes**.
    <div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

    ![Enhanced macOS interoperability](/img/enhancedmacos.png)

    </div>
:::

To create a Time Machine share:

1. In the WebGUI, go to **Shares** and click **Add Share**.
2. Configure the following key settings:

    | Setting                     | Description                                                                                  |
    |-----------------------------|----------------------------------------------------------------------------------------------|
    | **Share name**              | Name your share (e.g., Time Machine).                                                       |
    | **Minimum free space**      | Set the **Minimum free space** to allow writing to any disk in the share (default is usually fine). |
    | **Included disk(s)**        | Select the disk(s) in the array to use for the Time Machine share.                          |
    | **Enable copy-on-write**    | Keep at **Auto** for best performance.                                                      |
    | **SMB export**              | Set to **Yes (Time Machine)** to enable Time Machine support.                               |
    | **Time Machine volume size**| Limit the reported volume size to prevent Time Machine from using all disk space.           |
    | **Security settings**       | Configure SMB security parameters as desired.                                               |

3. Click **Apply** to create the share.

## Connect from macOS

To connect to your share from your Mac:

1. In **Finder**, press **Command + K** to open the "Connect to Server" window.
2. Enter the SMB address of your Unraid server. For example, use the format `smb://[server-ip]/[Time Machine share name]` and click **Connect**.
3. When prompted, input your Unraid username and password that has access to the share, then click **Connect**.
4. Open **System Settings** if you're using macOS Ventura 13.0 or later, or **System Preferences** if you're on macOS Monterey 12.x or earlier. Then navigate to **Time Machine**.
5. Click on **Select Disk** or **Add Backup Disk**, choose your Unraid Time Machine share, and then click **Use Disk**.
6. (Optional) If you want to secure your backup with a password, enable **Encrypt backups**.
7. If prompted, confirm the connection and re-enter your Unraid user credentials if needed.
8. Time Machine will start the initial backup automatically. Keep in mind that the first backup may take a while, but future backups will be faster since they are incremental.

:::tip
For more control over backup scheduling and options, consider using a third-party tool like [Time Machine Editor](https://tclementdev.com/timemachineeditor/).
<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Time Machine Editor](/img/TimeMachineEditor.png)

</div>
:::

## Multiple Time Machine setups

:::tip
For families or settings with multiple Macs, this method offers clear separation of backups, enhances security, and simplifies management.
:::

To create separate backups for different users or Macs on your Unraid server:

1. **Create unique Unraid user accounts** for each person or Mac that will back up data. For example, users named `larry`, `curly`, and `moe`.
   - This ensures that each user has their own identity and permissions.

2. **Create individual Time Machine shares** for each user, naming them clearly to match the user, such as `tm-larry`, `tm-curly`, and `tm-moe`.
   - Keeping shares separate helps with managing storage and access for each user.

3. **Assign appropriate user permissions** for each share:
   - Set the share's SMB security settings to ensure that only the corresponding user has access.
   - Confirm that only the intended user can read and write to their Time Machine share.

4. **Configure Time Machine on each Mac** to connect to its designated share:
   - On each Mac, connect to the Unraid server using the SMB path for their specific share (e.g., `smb://unraid-server/tm-larry`).
   - Follow the usual Time Machine setup steps to select the share as the backup disk.

5. **Monitor and manage storage usage**:
   - You can optionally set volume size limits on each Time Machine share to prevent one user from taking up too much space.
   - Regularly check usage and adjust quotas as necessary.

## Troubleshooting

If Time Machine backups fail or become unreliable:

1. **Try the Time Machine Docker container**: [Available through Community Applications](https://unraid.net/community/apps?q=time+machine#r), this option can provide more stable backups than direct SMB shares.
2. **Check macOS firewall**: Temporarily disable the firewall to see if it’s blocking connections.
3. **Create a fresh backup destination**: Delete and recreate the Time Machine share if issues continue.
