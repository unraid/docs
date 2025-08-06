---
sidebar_position: 1
sidebar_label: Command line interface
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Command line interface

While most tasks in Unraid can be performed through the WebGUI, certain operations—especially those related to diagnostics, drive management, or scripting—require using the system console or SSH terminal. This page offers Unraid-specific command-line tools and examples that can be used without needing extensive Linux knowledge.

:::tip Device paths
Many disk-level Unraid operations depend on Linux device names, like `/dev/sdX`. You can find the **device identifier** for any drive in the **Main tab** of the WebGUI. Look for the three-letter label `sdX` or `nvmeX` next to each disk. Use the appropriate identifier in all commands, replacing `sdX` with your specific disk.
:::

## Accessing the terminal

Unraid includes a built-in **web terminal** that you can access directly from the WebGUI. Simply use the top-right dropdown menu and select ">_". This opens a command-line session as the `root` user, giving you full administrative access to your system.

You can also connect to your Unraid server externally using SSH (secure shell) with a client like **PuTTY**.

:::tip When should I use the terminal?
Terminal access is useful for:

- Running diagnostics and command-line tools like `smartctl`, `xfs_repair`, `tail`, or `top`
- Executing plugin scripts or tools that don't require a user interface
- Troubleshooting issues related to connectivity, system services, or user shares
:::

### Using PuTTY (Windows only)

If you're using Windows, you might prefer **PuTTY** for SSH access instead of the built-in terminal. It's lightweight, free, and allows you to save sessions for easy access later.

<details>
<summary>How to install and use PuTTY</summary>

1. Download PuTTY from the [official site](https://www.putty.org/).
2. Launch the PuTTY application.
3. Enter your Unraid server’s IP address or hostname (e.g., `tower.local`).
4. Set the **connection type** to `SSH`.
5. (Optional) Save the session name for future use.
6. Click **Open** to start the session.
7. When prompted, log in as `root` and then enter your password.

Once you've logged in, you're in the Unraid shell environment. Type `exit` when you're finished to close the session.

</details>

:::note
Unraid automatically configures the SSH server on the first boot. Ensure your networking is working properly and that your root password is set before attempting a remote connection.
:::

## Drive testing and monitoring

These tools assist with evaluating performance, checking drive health, and troubleshooting array slowness. All commands should be executed from the terminal or via SSH.

### `hdparm`

Use this command to test read speed and display drive characteristics.

<details>
<summary>View hdparm options</summary>

**Test drive read speed:**

```bash
hdparm -tT /dev/sdX
```

The `-t` flag tests buffered disk reads, while `-T` tests cache reads. This primarily measures sequential read performance and helps identify unusually slow drives.

**Run multiple tests for accuracy:**

```bash
for ((i=0;i<5;i++)); do hdparm -tT /dev/sdX; done
```

**View drive information:**

```bash
hdparm -I /dev/sdX
```

This displays the model, firmware, cache size, and supported features, which helps verify disk type and controller behavior.

</details>

### `smartctl`

This command runs SMART diagnostics and monitors drive health.

<details>
<summary>View smartctl options</summary>

**Basic SMART report:**

```bash
smartctl -a /dev/sdX
```

If this command returns an error, try specifying the device type: `smartctl -a -d ata /dev/sdX` (use `-d nvme` for NVMe drives).

**Start SMART self-tests:**

Short test (takes a few minutes)

```bash
smartctl -t short /dev/sdX
```

Extended test (may take hours)

```bash
smartctl -t long /dev/sdX
```

**Save SMART report to a file:**

```bash
smartctl -a /dev/sdX > /boot/smart_report.txt
```

This saves the report to your Unraid flash drive for later review or sharing on forums.

</details>

### `diskspeed.sh`

This script allows for comprehensive surface-level performance testing with visual reports.

<details>
<summary>View diskspeed.sh usage</summary>

This used to be a script you would download from the Unraid forums. **DiskSpeed** is available now in a more refined package:

- Install **DiskSpeed** from Community Applications (**Apps tab**) by searching for "DiskSpeed", or visit the [GitHub repository](https://github.com/jbartlett777/DiskSpeed) for manual installation instructions.

</details>

---

## System monitoring

Use these commands to monitor memory, processes, and system performance when the WebGUI is unavailable or for more detailed diagnostics.

### `top`

This command provides a real-time process and resource monitor.

<details>
<summary>View top usage</summary>

```bash
top
```

- Displays CPU and memory usage for each process in real-time.
- Press `q` to exit.
- Use arrow keys to scroll, and `k` to terminate processes.

:::tip
Consider using `htop` for a more user-friendly interface with enhanced controls.
:::

</details>

### `free`

This command shows memory usage statistics.

<details>
<summary>View free usage</summary>

```bash
free -h
```

This displays RAM usage in a human-readable format. The `-h` flag means sizes will show in KB, MB, or GB instead of bytes.

:::tip Understand the output
A low "available" memory reading doesn’t necessarily indicate a problem—Linux aggressively caches data for performance.
:::

</details>

### `ps`

Use this command to display running processes with detailed information.

<details>
<summary>View ps options</summary>

**List all processes with full details:**

```bash
ps aux
```

**Sort by memory usage:**

```bash
ps aux --sort=-%mem | head -20
```

**Sort by CPU usage:**

```bash
ps aux --sort=-%cpu | head -20
```

</details>

---

## Storage utilities

These commands help check disk usage, partition info, and identify storage devices.

### `df`

This command displays filesystem disk space usage.

<details>
<summary>View df usage</summary>

```bash
df -h
```

This command displays the used and available space on all mounted file systems. It’s convenient for checking `/var/log` (which utilizes RAM-based logging) in Unraid.

</details>

### `fdisk`

View disk partition tables and geometry.

<details>
<summary>View fdisk usage</summary>

```bash
fdisk -l /dev/sdX
```

This command displays the partition layout, sizes, and disk geometry. It helps troubleshoot mismatched disk sizes, especially when replacing disks.

</details>

### `lsblk`

List all block devices in tree format.

<details>
<summary>View lsblk usage</summary>

```bash
lsblk
```

This command displays all storage devices, along with their mount points, in a straightforward tree structure. It’s great for getting an overview of your storage layout.

</details>

### `blockdev -getsz`

Helps determine if a replacement drive has enough space before rebuild.

<details>
<summary><strong>View blockdev usage</strong></summary>

**Syntax:**
```
blockdev --getsz /dev/sdX
```

Returns the raw number of 512-byte sectors on a device - handy for confirming that a replacement drive is large enough before rebuilding.

</details>

### `blkid`

Identify filesystem labels.

<details>
<summary><strong>View blkid usage</strong></summary>

**Syntax:**
```
blkid /dev/sdX1
```

Outputs the filesystem type and label. Use this instead of the deprecated `vol_id` command when verifying that the Unraid flash is labeled `UNRAID`.

</details>

---

## Network diagnostics

Tools for troubleshooting network connectivity and interface configuration.

### `ss`

Display socket statistics and network connections. This is the modern replacement for `netstat`.

<details>
<summary>View ss options</summary>

**Show all listening ports:**
```bash
ss -tuln
```

- `-t`: TCP sockets
- `-u`: UDP sockets  
- `-l`: Only show listening sockets
- `-n`: Show port numbers instead of service names

**Show established connections:**
```bash
ss -tup
```

This command shows active connections along with process information.

</details>

### `ip`

Configure and display network interface information. This is the modern replacement for `ifconfig`.

<details>
<summary>View ip options</summary>

**Show all network interfaces:**
```bash
ip addr show
```

**Show network interfaces with colors:**
```bash
ip -c addr show
```

**Show routing table:**
```bash
ip route show
```

</details>

### `ping`

Test network connectivity.

<details>
<summary>View ping usage</summary>

**Test connectivity by sending a limited number of packets:**
```bash
ping -c 4 google.com
```

This command sends four packets to the destination and stops, making it suitable for basic connectivity testing without continuous output.

</details>

### `ethtool`

Handy tool for querying and adjusting network interface card (NIC) parameters, such as link speed, offload features, and statistics.

<details>
<summary>Click to expand/collapse</summary>

**Basic driver and firmware info:**

Use this command to get information about the driver and firmware for your network interface:

```
ethtool -i eth0
```

**Show current link speed and settings:**

To check the current link speed and settings of your interface, run:

```
ethtool eth0
```

**Display extended interface statistics:**

For extended statistics related to the interface, use the following command:

```
ethtool -S eth0
```

These commands can help you confirm the negotiation speeds for gigabit, 2.5 GbE, or 10 GbE connections, diagnose issues with cables, or identify dropped packets that might arise from offload mismatches.

</details>

---

## System information

Get detailed information about hardware, kernel, and overall system configuration.

<Tabs>
<TabItem value="cpu" label="CPU info">

**CPU architecture summary:**
```bash
lscpu
```

This command displays information about cores, threads, virtualization support, and cache details.

**Feature detection:**
```bash
grep -E 'lm|vmx|svm' /proc/cpuinfo
```

- `lm`: Indicates 64-bit support
- `vmx`: Intel VT-x virtualization
- `svm`: AMD-V virtualization

</TabItem>
<TabItem value="memory" label="Memory info">

**Memory usage overview:**
```bash
free -h
```

**Detailed memory breakdown:**
```bash
cat /proc/meminfo | head -20
```

</TabItem>
<TabItem value="storage" label="Storage info">

**List drives by serial/model:**
```bash
ls -l /dev/disk/by-id/ | grep -v part
```

**Check filesystem labels:**
```bash
ls -l /dev/disk/by-label/
```

</TabItem>
</Tabs>

---

## System maintenance

Commands for system shutdown, log monitoring, and service management.

### `tail`

Monitor log files in real-time.

<details>
<summary>View tail usage</summary>

```bash
tail -f /var/log/syslog
```

This command shows live updates from the system log. To exit, use `Ctrl+C`.

**Show a specific number of lines:**
```bash
tail -n 50 /var/log/syslog
```

</details>

### `powerdown`

Safely shut down the system.

<details>
<summary>View powerdown usage</summary>

```bash
powerdown
```

This command utilizes Unraid's built-in shutdown process to stop the array and power down the system safely. It's preferred over manual shutdown methods.

</details>
