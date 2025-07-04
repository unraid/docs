---
sidebar_position: 3
sidebar_label: System crashes & stability
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# System crashes & stability

System crashes and stability issues can be tough to diagnose and resolve. They often come from hardware failures, configuration mistakes, or conflicts within software. This section will guide you through common causes, diagnostic steps, and best practices to help keep your Unraid server stable.

---

## RAM issues

RAM can wear out over time, leading to unpredictable errors, including file system corruption. To diagnose RAM problems, careful testing and observation are essential.

Running memory tests is a good idea if you notice unexplained crashes, data corruption, or system instability. The Unraid boot menu has a version of Memtest86+ for RAM testing, but it's only available in Legacy boot mode. You'll need to download the latest Memtest86+ from the official site for UEFI systems.

### Testing RAM
To test your RAM, restart your server and select **Memtest86+** from the boot menu. Modern versions (v6.0+) support both UEFI and Legacy modes with enhanced DDR4/DDR5 compatibility. For the latest version, download from [memtest.org](https://www.memtest86.com/).

:::note Other RAM testing tools

- [**Karhu RAM Test**](https://www.karhusoftware.com/): A paid but highly effective Windows-based tool that can detect errors faster than traditional methods, with detection rates of 95.67% within 30 minutes (ideal for DDR5 systems)  
- [**HCI MemTest**](https://hcidesign.com/memtest/): Popular, free Windows-based tester
- [**Prime95**](https://prime95.net/): Validates RAM and CPU stability simultaneously
:::

:::important If you find RAM errors
If Memtest86+ shows errors, try reseating the RAM modules and rerunning the test. Test each RAM stick individually to pinpoint faulty modules. Refer to your motherboard documentation for supported RAM speeds and configurations, and avoid mixing different RAM brands or speeds to minimize compatibility issues.
:::

### Overclocking RAM

Many users want to run their RAM at the highest speed specified by the manufacturer. However, motherboard and CPU combinations often have maximum reliable RAM speeds that are lower than what the RAM is rated for.

Overclocking RAM beyond supported speeds can lead to system instability, crashes, and data corruption. Always check your motherboard and CPU specifications before attempting to overclock RAM. If you notice instability after overclocking, switch back to the default or a lower RAM speed. It's wise to test the stability of Memtest86+ after any changes.

## Critical stability factors

System stability relies on more than just RAM or CPU performance. Here are important areas influencing your Unraid server's reliability, along with tips on how to prevent issues and troubleshoot effectively.

### Power supply reliability

<details>
<summary><strong>Click to expand/collapse</strong></summary>

A stable and sufficient power supply is crucial for uninterrupted server operation. Unstable power or a failing PSU can lead to random crashes, data corruption, or sudden shutdowns. Always use a high-quality, appropriately rated PSU for your hardware. For enhanced resilience, consider using redundant power supplies for enterprise and multi-bay systems, ensuring that each unit is properly seated and connected. If your server allows, keep an eye on PSU health indicators (like AC OK LEDs) and replace failed units immediately to avoid downtime. Regularly check that all power cords are secure and that circuits are not overloaded.

:::tip Realtime monitoring
Use [HWiNFO64](https://www.hwinfo.com/download/) or [AIDA64](https://www.aida64.com/) to monitor voltage rails in real-time. 

Critical thresholds:  
- 12V rail: ±5% tolerance (11.4V-12.6V)  
- 5V rail: ±0.25V variation  

Run simultaneous CPU+GPU stress tests to validate stability under load.
:::

</details>

### Thermal management and overheating

<details>
<summary><strong>Click to expand/collapse</strong></summary>

Overheating is one of the leading causes of hardware failure and erratic server behavior. Ensure your server is located in a well-ventilated area with controlled ambient temperatures. Utilize adequate cooling solutions—such as high-quality fans or rack-mounted air conditioning—and keep an eye on system temperatures using hardware sensors. Aim to maintain low temperatures and avoid placing servers in confined or poorly ventilated spaces. Proactive thermal management can significantly reduce the risk of irreversible hardware damage.
</details>

### Disk health and I/O errors

<details>
<summary><strong>Click to expand/collapse</strong></summary>

Disk errors, whether due to aging drives or sudden failures, can disrupt system stability and compromise data. Regularly monitor drive SMART data and use Unraid’s built-in disk health tools to catch early signs of failure. Disk I/O errors may also show up as high server load or slow performance. Promptly replace failing drives and consider periodic parity checks to ensure data integrity. If you notice persistent I/O errors, investigate the cabling, power supply, and drive controller health.
</details>

### Application and plugin stability

<details>
<summary><strong>Click to expand/collapse</strong></summary>

Unraid’s flexibility comes from its support for plugins and Docker containers. However, third-party plugins can introduce instability, especially if they are outdated or incompatible with your current Unraid version. When troubleshooting, use Safe Mode to temporarily disable plugins and identify the source of issues. Prefer Docker containers over plugins for added features since containers provide better isolation from the core operating system and are less likely to cause system-wide problems. Regularly update or remove unused or unsupported plugins to maintain stability.
</details>

### Firmware and BIOS updates

<details>
<summary><strong>Click to expand/collapse</strong></summary>

Outdated firmware or BIOS can lead to instability, security vulnerabilities, and hardware compatibility issues. Schedule regular checks for firmware and BIOS updates for your motherboard and critical components. Always back up your configuration before updating, and if possible, test updates in a controlled environment. Document your update process and review it from time to time to ensure you’re following best practices. Keeping your system firmware current helps prevent unexpected crashes and unlocks new hardware features.

:::tip Recommendations
- Use manufacturer utilities for risk-free updates, such as [ASUS Armoury Crate](https://www.asus.com/supportonly/armoury%20crate/helpdesk_download/), [Gigabyte @BIOS](https://www.gigabyte.com/Support/Consumer/Download), or [MSI Center](https://www.msi.com/Landing/MSI-Center).
- Enable **UEFI Capsule Updates** for automatic firmware patching.
:::

</details>

### Proactive system monitoring

<details>
<summary><strong>Click to expand/collapse</strong></summary>

Consistent monitoring is essential for early problem detection. Enable persistent logging in Unraid to retain logs across reboots. Utilize system monitoring tools to track temperatures, voltages, and drive health. Set up alerts for critical thresholds to take action before minor issues escalate. Regularly reviewing system logs allows you to spot patterns and address underlying causes before they lead to downtime.

Some tool recommendations include:

<div style={{ margin: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

| Tool Type               | Recommendations          |
|-------------------------|-------------------------------|
| **AI Predictive**       | [ManageEngine OpManager](https://www.manageengine.com/network-monitoring/)       |
| **Hardware Sensors**    | [HWiNFO64](https://www.hwinfo.com/download/)                     |
| **Container Monitoring**| [Netdata Cloud](https://www.netdata.cloud/)                |
| **Alert Systems**       | Set thresholds for:         |
|                         | - CPU >80°C sustained        |
|                         | - RAM usage >90% for 5+ min |
</div>

</details>

