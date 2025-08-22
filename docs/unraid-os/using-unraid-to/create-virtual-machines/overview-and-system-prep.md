---
sidebar_position: 1
sidebar_label: Overview & system prep
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Overview & system prep

Virtual machines (VMs) allow you to run full operating systems, such as Windows, macOS, or Linux, on your Unraid server, side-by-side with Docker containers. 

%%VMs|vm%% are ideal for:

- Running applications that require a full OS or are unavailable as containers.
- Assigning dedicated hardware to guest systems, such as GPUs or USB devices.
- Testing, development, gaming, or running legacy software.
- Hosting multiple isolated environments for different workloads.

For a list of operating systems tested with Unraid, see the [%%VM|vm%% Setup](./vm-setup.md) page.

<details>
<summary>**Under the hood:** Expand to learn more about the technology stack behind Unraid virtualization</summary>

Unraid’s virtualization stack is designed to be flexible and high-performing, utilizing several open-source technologies to support effective %%virtual machine (VM)|vm%% management. This overview explains the key components and their interaction in a user-friendly manner.

<h4>Core technologies</h4>

| Technology | What it does | Why it matters |
|------------|--------------|---------------|
| %%KVM&#124;kvm%% | Acts as the %%hypervisor&#124;hypervisor%% built into the Linux kernel. | Allows Unraid to run %%VMs&#124;vm%% smoothly with hardware acceleration and minimal overhead. |
| %%QEMU&#124;qemu%% | Emulates the essential hardware (like motherboard, CPU, and controllers) for %%VMs&#124;vm%%. | Works alongside %%KVM&#124;kvm%% to create a complete virtual environment for the guest operating systems. |
| %%Libvirt&#124;libvirt%% | Manages %%VM&#124;vm%% definitions, as well as storage and network interfaces. | Stores %%VM&#124;vm%% configurations in `libvirt.img` and provides a consistent management API. |
| %%VNC&#124;vnc-session%% | Offers remote graphical access to %%VMs&#124;vm%%. | Enables interaction with %%VMs&#124;vm%% from any device using a browser or %%VNC&#124;vnc-session%% client. |
| %%VirtIO&#124;virtio%% | Provides high-performance paravirtualized drivers for network and disk devices. | Enhances %%VM&#124;vm%% speed and efficiency, requiring %%VirtIO&#124;virtio%% drivers installed in the guest OS. |
| %%VirtFS&#124;virtfs%% (`9p`) | Facilitates file system sharing between the host and Linux-based guests. | Useful for development and advanced file sharing needs. |
| %%HVM&#124;hvm%% | Supports hardware-assisted virtualization (%%Intel VT-x&#124;intel-vt-x%%, %%AMD-V&#124;amd-v%%). | Necessary for running %%VMs&#124;vm%% with full hardware acceleration. |
| %%VFIO&#124;vfio%% & %%IOMMU&#124;iommu%% | Allow direct PCI device passthrough to %%VMs&#124;vm%% (such as GPU and USB devices). | Essential for achieving near-native performance and maintaining security isolation. |

<h4>How Unraid implements %%VM|vm%% support</h4>

- %%KVM&#124;kvm%%/%%QEMU&#124;qemu%%: Unraid’s virtualization is fundamentally based on %%KVM&#124;kvm%% and %%QEMU&#124;qemu%%, providing robust %%VM|vm%% hosting capabilities.
- %%Libvirt|libvirt%%: %%VM|vm%% definitions are stored as XML files in `libvirt.img` (typically found in the `system` share).
- **Default shares**:
  - `domains`: Holds %%VM|vm%% %%virtual disk images|virtual-disk-images%%.
  - `isos`: Contains installation ISOs and driver images.
  - `system`: Stores `libvirt.img` and other critical system files.
  - All default to **Use %%Cache|cache%%: Prefer** for optimal performance.
- %%VNC&#124;vnc-session%%: Unraid features a built-in NoVNC client for easy browser-based access to %%VMs|vm%%, with the option to use external %%VNC clients|vnc-session%% as needed.

:::tip
Most users don’t need to interact directly with these technologies, but understanding what goes on “under the hood” can be incredibly useful for advanced troubleshooting and customization. For more detailed information, check out the official documentation for [KVM](https://www.linux-kvm.org/page/Main_Page), [QEMU](https://www.qemu.org/), [Libvirt](https://libvirt.org/), and [VirtIO](https://www.linux-kvm.org/page/Virtio).
:::

</details>

## Requirements

To run %%VMs|vm%% on Unraid, your system must meet the following requirements:

| Component         | Minimum requirement                    | Recommended for %%VMs&#124;vm%% & %%GPU passthrough&#124;gpu-passthrough%%        |
|-------------------|----------------------------------------|----------------------------------------------|
| CPU               | 64-bit, 4 cores, 2.4 GHz+ (Intel/AMD)  | 8+ cores, 3.0 GHz+ (Intel Core i7/i9, AMD Ryzen 7/9, or newer) |
| Virtualization    | %%HVM&#124;hvm%% (%%Intel VT-x&#124;intel-vt-x%% or %%AMD-V&#124;amd-v%%)              | %%HVM&#124;hvm%% + %%IOMMU&#124;iommu%% (Intel VT-d or AMD-Vi)           |
| RAM               | 8 GB                                   | 16 GB or more (add RAM for each active %%VM&#124;vm%%)   |
| Storage           | SSD/NVMe for %%VM&#124;vm%% disks                  | High-end NVMe for best performance           |
| Network           | Gigabit Ethernet (PCIe recommended)    | 2.5G/10G Ethernet for demanding workloads    |
| GPU (optional)    | Modern NVIDIA RTX or AMD Radeon RX     | RTX 3000/4000 or Radeon 6000/7000 series     |

:::note
Your motherboard BIOS must enable Hardware-assisted virtualization and %%IOMMU|iommu%% support. Look for settings labeled “%%Intel VT-x|intel-vt-x%%,” “Intel VT-d,” “%%AMD-V|amd-v%%,” or “AMD-Vi.”
:::

### VM resources

| %%VM&#124;vm%% type             | RAM per %%VM&#124;vm%%      | vCPUs per %%VM&#124;vm%% | Use case examples                  |
|---------------------|-----------------|--------------|------------------------------------|
| Virtual server      | 1–2 GB          | 1–2          | Lightweight Linux, utility %%VMs&#124;vm%%     |
| Virtual desktop     | 4–8 GB          | 2–4          | Windows 11, Ubuntu desktop, RDP    |
| Hybrid/gaming %%VM&#124;vm%%    | 8–16 GB+        | 4–8+         | %%GPU passthrough&#124;gpu-passthrough%%, gaming, ML        |

- Memory and CPU are only consumed while %%VMs|vm%% are running.
- Plan for peak usage if running multiple %%VMs|vm%% simultaneously.
- Always allocate resources based on guest OS and workload requirements.

### HVM & IOMMU: What they enable

<Tabs>
<TabItem value="hvm" label="HVM support">

%%HVM|hvm%% (Hardware Virtual Machine), also known as %%Intel VT-x|intel-vt-x%% or %%AMD-V|amd-v%%, enables your CPU to run %%virtual machines|vm%% with hardware acceleration.

- Required for creating and running any %%VM|vm%% on Unraid.
- Provides efficient CPU virtualization and better performance compared to software-only virtualization.
- Most modern CPUs (2015 and newer) include this feature.

</TabItem>

<TabItem value="iommu" label="IOMMU support">

%%IOMMU|iommu%% (Input/Output Memory Management Unit, also known as Intel VT-d or AMD-Vi, enables secure and efficient device passthrough to %%VMs|vm%%.

- Required for assigning PCIe devices (GPUs, USB controllers, NVMe drives) directly to a %%VM|vm%%.
- Provides memory isolation and protection, preventing devices from accessing unauthorized memory regions.
- Essential for %%GPU passthrough|gpu-passthrough%%, advanced networking, and high-performance workloads.

</TabItem>
</Tabs>

:::important How to check support
In the %%WebGUI|web-gui%%, click **Info** in the top menu.
  
- **HVM support:** Shows if hardware virtualization is present and enabled.
- **IOMMU support:** Shows if device passthrough is available and enabled.
:::

---

### Graphics device passthrough

Passing a GPU to a %%VM|vm%% allows for near-native graphics performance, making it ideal for gaming, creative work, or machine learning.

<Tabs>
<TabItem value="nvidia" label="NVIDIA">

- All modern RTX (3000/4000 series) support passthrough and are recommended for the best performance.
- Quadro and some older GTX cards are also supported, but it's important to check for current driver compatibility.

</TabItem>
<TabItem value="amd" label="AMD">

- Radeon RX 6000 series are generally reliable for passthrough.
- RX 7000 series may have some unresolved issues; please check the [Unraid forums](https://forums.unraid.net/) for the latest compatibility reports.
- The AMD reset bug has mostly been resolved in recent models, but it's always a good idea to confirm with your hardware.

</TabItem>
</Tabs>

:::tip General tips  

  - Use %%OVMF|ovmf%% (%%UEFI|uefi%%) for %%VMs|vm%% with modern GPUs.
  - Always use the latest Unraid version for improved hardware support.
  - Technologies like NVIDIA Optimus may allow %%GPU passthrough|gpu-passthrough%% for laptops or advanced setups, but results vary.
:::

:::info Always changing

Hardware and driver compatibility changes rapidly. Before purchasing a GPU for passthrough, check the [Unraid forums](https://forums.unraid.net/) and vendor documentation for up-to-date reports and user experiences.
:::

---

## System preparation

Before you create virtual machines, complete these essential setup tasks to ensure your system is ready.

### Adjust BIOS settings

To fully utilize Unraid's virtualization capabilities, your BIOS must enable hardware-assisted virtualization and I/O memory management. Look for settings labeled **Virtualization**, %%Intel VT-x|intel-vt-x%%, **Intel VT-d**, %%AMD-V|amd-v%%, or **AMD-Vi** and set them to **Enabled**.

:::note
BIOS interfaces vary by manufacturer. Check your motherboard manual for the exact location of these settings.
:::

### Configure a network bridge

%%Virtual machines|vm%% can connect to your network using one of two bridge types. Choose the one that best fits your needs:

| Bridge type             | Description                                                                                                                                | Use case                                                                                   |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| **Private NAT (virbr0)**| Managed by %%libvirt&#124;libvirt%%. This option provides an internal DHCP server and an isolated subnet. %%VMs&#124;vm%% can access the internet and host file shares, but are isolated from other network devices. | Ideal for isolated %%VMs&#124;vm%% needing internet and host access but no LAN visibility.              |
| **Public bridge (br0)** | Managed by Unraid. This option connects %%VMs&#124;vm%% directly to your LAN, with IPs assigned by your router. MAC addresses are preserved for consistent IP assignment. | Best for %%VMs&#124;vm%% that should function as regular devices on your network, accessible from other devices. |

:::important

If your Unraid server is connected to Wi-Fi, using the **Private NAT (virbr0)** network bridge for your %%virtual machines|vm%% is recommended. This is because Wi-Fi interfaces support only a single MAC address, which restricts the use of public bridges and custom network types. By utilizing the **virbr0** bridge, your %%VMs|vm%% will have complete network access through %%NAT|nat%%, although they will not be directly accessible from other devices on your local area network (LAN). However, you can still access the %%VMs|vm%% via %%VNC|vnc-session%% through the host.
:::

- Enable the public bridge in ***Network settings → Enable bridging***.
- Set your preferred bridge as the **Default network bridge** in %%VM|vm%% settings. You may need to enable advanced view to see this option.

---

### User shares for virtualization

Unraid creates two default %%user shares|user-share%% for %%virtualization|virt%%:

- `isos`: This share stores installation media files for your %%VMs|vm%%.
- `domains`: This share holds %%virtual machine|vm%% %%virtual disk images|virtual-disk-images%% and configuration files.

Consider creating a separate share for %%VM|vm%% backups to protect your data.

<h4>Share configuration recommendations</h4>

- Store active %%VM|vm%% %%virtual disk images|virtual-disk-images%% on a %%cache|cache%%-only share for the best performance.
- Using SSDs in your %%cache pool|cache-pool%% significantly improves %%VM|vm%% responsiveness.
- %%Cache|cache%% usage for the `isos` share is optional.

:::important
Do not store active %%virtual machines|vm%% on a share with **Use %%cache|cache%%** set to **Yes**. This can cause %%VMs|vm%% to be moved to the %%array|array%% during the %%Mover|mover%% process, leading to degraded performance.
:::

## Set up virtualization preferences

Before you begin, ensure your system is ready for virtualization (see [System preparation](#system-preparation)). Setting your %%virtualization|virt%% preferences in Unraid helps ensure your %%virtual machines (VMs)|vm%% are configured for optimal performance and compatibility.

To set your virtualization preferences:

1. In the %%WebGUI|web-gui%%, go to ***Settings → VM Manager***.
2. **For Windows VMs:**
   - Download the latest stable %%VirtIO|virtio%% Windows drivers ISO from the [official repository](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md).
   - Copy the %%VirtIO|virtio%% ISO file to your **isos** share.
   - In **VM Manager**, use the file picker for **VirtIO Windows Drivers ISO** to select the ISO you just copied.
   - (Optional) Override the default driver ISO for individual %%VMs|vm%% in **Advanced View**.
3. **Select a default network bridge:**
   - Choose `virbr0` for a private network bridge, or select a public bridge (e.g., `br0`) created in **Network Settings**.
   - (Optional) Override the default network bridge for each %%VM|vm%% in **Advanced View**.
4. **PCIe ACS override (Advanced):**
   - Toggle **PCIe ACS Override** to **On** if you need to assign multiple PCI devices (like %%GPUs|gpu-passthrough%% or USB controllers) to different %%VMs|vm%%.
   - This option breaks apart %%IOMMU|iommu%% groups, allowing more flexible device passthrough.
   :::warning
   This setting is experimental and may affect system stability. Use with caution.
   :::
5. Click **Apply** to save your settings.
