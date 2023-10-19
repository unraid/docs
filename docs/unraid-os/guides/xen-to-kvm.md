# Xen to KVM migration

Virtual machines that were running in Xen will require different procedures to convert to KVM, depending on whether they were created as paravirtualized or hardware-virtualized guests. Regardless of your conversion scenario, it is highly recommended that you create a copy of your existing Xen virtual disk before proceeding. Use the copy to test your conversion process and, if successful, you can remove your own Xen-based virtual disk should you so desire. In addition, you should ensure your hardware has support for hardware-assisted virtualization (Intel VT-x / AMD-V) as this is a requirement for use with KVM. Xen PV guests do not leverage hardware-virtualization extensions, which makes their process for converting slightly more involved than Xen HVM guests to KVM (it is not documented at the time of this writing).

## Windows Conversion Procedure

To convert a Windows virtual machine from Xen to KVM, the process is fairly simple and takes about 10 minutes to perform. Remove any PCI device pass through that you are doing via your Xen domain `cfg` file before you begin. These devices can be re-added after the conversion process is complete.

### Step 1: Determine if your VM is using Xen's GPLPV drivers

1. From within your Xen VM, open **Windows Device Manager** by pressing *Windows key + X*, then selecting **Device Manager**
2. Expand the node for **Network adapters** and note the name. If the name of the network device contains "Xen", then you are using GPLPV drivers. Anything else means you are not.

:::tip

If you are not using GPLPV drivers, you can skip the next several steps and resume the procedure from rebooting into KVM mode.

:::

### Step 2: Prepare Windows for GPLPV driver removal

1. Open a command prompt, running it as an administrator. Open the **Start menu** and type `cmd`. The start menu identifies the program, and lists context options for the command. Select **Run as administrator**. This will run an elevated command prompt.
2. At the prompt, type `bcdedit -set loadoptions nogplpv` and press Enter.
3. Reboot your VM.

### Step 3: Download the uninstaller and remove the GPLPV drivers

1. Once rebooted, open a browser and download the following zip file: [gplpv_uninstall_bat.zip](https://drive.google.com/file/d/0BwGv31twDcCeNElTTWFLbXEycWs/view?usp=sharing).
2. Extract the `uninstall_0.10.x.bat` file to your desktop.
3. Right-click on the file and select **Run as administrator**.
4. Reboot your VM.
5. After rebooting, open up **Device Manager** again.
6. Under the System Devices section, right-click on **Xen PCI Device Driver** and select **Uninstall device**. At the confirmation dialog, select the checkbox to **Delete the device driver software for this device**.
7. Shut down the VM.

### Step 4: Create a new VM with the VM Manager

1. Make sure the Unraid VM Manager is enabled.
   1. Go to the **Settings** menu and select **VM Manager**, then **Apply**.
   2. Set **Enable VMs** to *Yes*.
   3. Pick a version of the VirtIO drivers and select **Download**. This enables you preload a default set of drivers for Windows VMs.
2. Go to the **VMs** tab and select **Add VM**.
3. Select the version of Windows that matches your original Xen VM.
4. Give the VM a name and select a set of VirtIO drivers from the **VirtIO Drivers ISO** dropdown.
5. Under **Primary vDisk Location**, browse and select your Xen virtual disk.
6. Add a **2nd vDisk** by selecting the green plus sign, then give it a size of *1M* (you can put this vDisk anywhere, it is only temporary).
7. Leave graphics, sound, and the remaining settings with default values, and select **Create**.
8. Upon creation, immediately shutdown the VM by selecting the VM icon and **Force stop**.
9. Select the VM icon to show the options again, and select **Edit**.
10. In edit mode, switch to **XML View** using the toggle in the top-right corner.
11. Locate the `<disk>` section for your primary virtual disk.
12. Remove the `<address>` line completely.
13. Change the `bus='virtio'` from the `<target>` section to `bus='ide'`.
14. Select **Update**.

### Step 5: Starting your new VM and loading the VirtIO drivers

1. From the VMs page, select the **VM icon**, and **Start** the VM.
2. Once the VM is started, select the icon again, and then **Start with console (VNC)**.
3. When the VM boots up, it will install several drivers and prompt a reboot, select **Reboot later**.
4. Open **Windows Device Manager** again and you'll notice several device warnings under **Other devices** (Ethernet Controller, PCI Device, SCSI Controller, Serial controller).
5. For each device, double click the device, click **Update Driver**, then select **Browse my computer for driver software**.
   1. Specify a path of the VirtIO drivers ISO (e.g. `d:\`) for the path for each device, and the appropriate drivers will be automatically loaded.
   2. Select to **Always trust Red Hat** if prompted.
6. Open Windows File Explorer and browse to the **guest-agent** folder on the VirtIO driver disk and double-click the `qemu-ga-x64.msi` file to install the QEMU guest agent.
7. Shut down your VM.

### Step 6: Remove the temporary vDisk and start the VM

1. Edit the VM using the form-based editor.
2. Remove the secondary vDisk.
3. Ensure the primary vDisk is pointing to your original vDisk file (it may be pointing to the secondary vDisk, and if so, update it to point to your actual vDisk).
4. When completed, select **Update**.
5. Start your VM.
6. Verify your device manager shows no warnings.
