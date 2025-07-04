---
sidebar_position: 1
sidebar_label: Capture diagnostics and logs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Capturing diagnostic information

When you have issues with your Unraid server, gathering detailed information is crucial for effective troubleshooting. This information helps others provide accurate and timely assistance, especially when you post in forums.

:::info Diagnostics include...

The diagnostics zip file contains several text files that create a detailed snapshot of your Unraid system, including:

- **System configuration**: Information about your **array**, shares, network settings, and installed plugins.
- **System logs**: Logs from the kernel, **WebGUI**, and system services, documenting events that may have led to the issue.
- **Hardware information**: Details about connected drives, controllers, and other hardware components.
- **Docker and VM info**: Configuration and logs for Docker containers and virtual machines, if applicable.
:::

---

## System diagnostics

Unraid provides a **Diagnostics** tool located under **Tools > Diagnostics** in the **WebGUI** to capture comprehensive system information for troubleshooting. This tool will generate a zip file you can download and attach to forum posts for support. All diagnostics files are text-based, and users can review them to understand what information is included.


| Scenario                       | How to capture                                                                                          | Notes                                                                                                     |
|--------------------------------|---------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| WebGUI responsive              | Use **Tools > Diagnostics** in the **WebGUI** to generate and download the diagnostics zip file.                 | Diagnostics are anonymized by default to protect sensitive data.                                          |
| WebGUI unresponsive            | Access via SSH, telnet, or direct console to run the `diagnostics` command. The zip file saves to `/boot/logs`.   | Always capture diagnostics before rebooting to keep logs intact.                                         |
| Array started in normal mode   | This is the preferred method for capturing diagnostics, as it provides the most complete information, especially about drive status. | If this isn't possible, refer to forum feedback for the best way to capture diagnostics.                 |

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Disk selection logic](/img/Diagnostics.jpg)

</div>

:::important
Attach the single diagnostics zip file when posting on forums - avoid uploading the extracted files individually.
:::

### Anonymization of diagnostic data

By default, diagnostics are automatically anonymized. If you enable Mover logging under **Settings > Mover Settings**, the syslog will include details about files the Mover processes. It’s best to allow Mover logging only when troubleshooting specific Mover-related issues, as it may reveal file paths and names.

System logs reset upon reboot. Capturing diagnostics beforehand ensures the logs document the events that occurred leading up to the issue, which is vital for troubleshooting.

---

## Persistent logs (syslog server)

Persistent logs are essential for keeping a record of system events between reboots. Unlike standard logs that reset when the system restarts, persistent logs use Unraid's built-in syslog server to ensure you can diagnose crashes or intermittent issues that arise over time.

### Choosing the right logging method

Go to **Settings > Syslog Server** to set up persistent logging. Each method has advantages and disadvantages:

| Method               | Pros                                      | Cons                                      | Best for                                  |
|----------------------|-------------------------------------------|-------------------------------------------|-------------------------------------------|
| **Mirror to flash**  | Captures boot process events              | Can wear out flash drive quickly          | Short-term diagnostics (a few days)       |
| **Remote syslog**    | Logs are stored on another device         | Needs a separate always-on server        | Long-term monitoring (weeks to months)    |
| **Local syslog**     | Keeps logs on the array or cache, reducing wear on flash | Less accessible if there’s a system crash | Continuous logging without external devices |

:::tip
For detailed configuration help, check the **Help** icon in the WebGUI toolbar.
:::

### Enabling the syslog server

<Tabs>
<TabItem value="mirror" label="Mirror to flash">

1. Set **Local syslog server** to *Enabled*.
2. Select *Yes* under **Mirror to flash**.  
3. Click **Apply**.  
   - Logs will be saved to `/boot/logs` on your flash drive  

:::caution
Avoid using this method for long-term logging to protect the health of your flash drive.
:::

</TabItem>
<TabItem value="remote" label="Remote syslog server">

1. Set **Local syslog server** to *Enabled*.  
2. Enter the IP address of your syslog server under **Remote syslog server**.
3. Click **Apply**.  
   - Logs will stream to the device you specified.  

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Remote syslog configuration](/img/Syslog-server.jpg)

</div>

</TabItem>
<TabItem value="local" label="Local syslog server">

1. Set **Local syslog server** to *Enabled*.  
2. Configure the following options:  
   - **Local syslog folder**: Use a cache-only or preferred share (best for SSDs).  
   - **Rotation settings**: Adjust the file size and number limits.  
3. Click **Apply**.  
   - Logs will be saved to the share you specified.  

</TabItem>
</Tabs>

### Self-hosted local syslog (loopback method)

If you want persistent logging without affecting flash drive wear or needing external devices, consider this approach.  This method prevents flash drive wear, captures boot process events, and saves logs on more reliable storage (array or cache).

To enable this method:

1. Configure the **Local syslog server** as [mentioned above](#enabling-the-syslog-server).  
2. Use the same server's IP as the **Remote syslog server**.  
   - Logs are sent out but looped back to the local share.  

:::note
Logs from this method won't be included in standard diagnostics. Make sure to attach them separately if you need support.
:::

---

## Accessing Docker container logs

While standard diagnostics only provide limited data for Docker and VM, you can access container logs directly for more detailed troubleshooting.

To retrieve Docker logs:

<Tabs>
<TabItem value="via-webgui" label="Via WebGui" default>
   - Navigate to **Docker > Containers**  
   - Click the **Logs** icon for the desired container
</TabItem>

<TabItem value="commandline" label="Via Command Line" default>

   Use the command:  

   ```bash
   docker logs [container_name] > /path/to/save/log.txt
   ```

</TabItem>

<TabItem value="persistent" label="Persistent logging" default>

   To map container logs to a host path, configure your container template like this:  

   ```
   /path/in/container:/logs
   ```

</TabItem>
</Tabs>

### Virtual machine logs

VM logs can be accessed through their respective hypervisors (for example, QEMU logs are located in `/var/log/libvirt/`). Check your VM platform’s documentation for more details.

:::important
Remember to attach the relevant container or VM logs separately when seeking support for application-specific issues.
:::
