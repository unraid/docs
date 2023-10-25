# Upgrading Unraid

## Prerequisites

Before upgrading, we highly recommend making a complete backup of your USB flash device. You can use Unraid Connect to create the backup or you can do it manually via the WebGUI:

1. In the ***Main*** tab select the **Flash** device from the boot device list.
2. Under **Flash Device Settings**, select the **Flash Backup** button to download a fully zipped backup of your current flash drive to your Mac or PC.
![Flash backup](../assets/Backup_flash_drive.png)

Alternatively, you can use [Unraid Connect](../../connect/help.md#restoring-flash-backup) to back up your Flash boot device.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Upgrade process

<Tabs>
  <TabItem value="6.4" label="From 6.4 or higher" default>
    <ol>
    <li>Boot your server up and login to the web interface.</li>
    <li>In <b><i>Tools > About</i></b>, select <b>Update OS</b>.</li>
    <li>Select <b>Check for Updates</b> to see if a new release is available.</li>
    <li>Select <b>Update</b> to download and install the update.</li>
    <li>Once the upgrade is complete, reboot your server for it to take effect.</li>
    </ol>
    </TabItem>
  <TabItem value="6.3" label="From 6.3">
    <ol>
      <li>Boot your server up and login to the WebGUI.</li>
      <li>Select the <b>Plugins</b> tab.</li>
      <li>Select <b>Update</b>, next to Unraid Server OS.</li>
      <li>Once the upgrade is complete, reboot your server for it to take effect.</li>
   </ol>
  </TabItem>
  <TabItem value="6.2" label="From 6.2">
    <ol>
      <li>Boot your server up and login to the WebGUI.</li>
      <li>Select the <b>Plugins</b> tab.</li>
      <li>Select <b>Check for updates</b>.</li>
      <li>Select <b>Update</b>, next to Unraid Server OS.</li>
      <li>Once the upgrade is complete, reboot your server for it to take effect.</li>
   </ol>
  </TabItem>
  <TabItem value="6.2" label="From 6.2">
    <ol>
      <li>Boot your server up and login to the WebGUI.</li>
      <li>Select the <b>Plugins</b> tab.</li>
      <li>Select <b>Check for updates</b>.</li>
      <li>Select <b>Update</b>, next to Unraid Server OS.</li>
      <li>Once the upgrade is complete, reboot your server for it to take effect.</li>
   </ol>
  </TabItem>

</Tabs>

:::note

You can optionally install releases from the **Next** branch as well, but those releases are not considered fully stable, so do so at your own risk.

:::

If **Check for Updates** shows no update, see below.

### Possible upgrade issues

Having problems after the update? Here is a list of common issues and solutions.

#### The new release does not show up after clicking _Check for Updates_ button

In this case, manually install the update as follows:

1. Navigate to the **Plugins**/**Install Plugin** tab.
2. Select and copy this text <https://s3.amazonaws.com/dnld.lime-technology.com/stable/unRAIDServer.plg>.
3. Paste the address into the URL field and select **Install**.

#### My array/docker apps are taking a really long time to start after the upgrade

There is a one-time update procedure that each container will need to go through in order to point it towards the new Docker Hub API going forward, even if the container itself truly isn't in need of an update. This process will happen automatically the first time your containers are started after upgrading. The Docker change log describes it like this:

> Docker 1.10 uses a new content-addressable storage for images and layers. A migration is performed the first time docker is run and can take a significant amount of time depending on the number of images present.

See [here](https://github.com/docker/docker/releases/tag/v1.10.0) for more information from Docker on this.

#### My containers aren't working right after the upgrade

If you run into any issues with your containers after this procedure completes (such as the `layers from manifest don't match image configuration` error), you will need to rebuild your Docker image file. To do this:

1. Stop the Docker engine from the ***Settings > Docker*** page.
2. Click the checkbox and then click the button to delete the image
3. Start Docker again and the image will be recreated
4. Go to ***Docker*** and select **Add Container**.
5. From the ***Template*** screen, select one of your previous templates (prefixed with "my-") and then select **Apply**.
6. Repeat the previous step for each of your containers.
7. You will **not** need to reconfigure your apps after this is complete.

#### My VMs get an error of "cannot get interface MTU\..."

A change that was made in version 6.2 eliminated the customization of the bridge name used for virtual machines. Users who have set a custom bridge name will need to fix their VMs to point to the new default of 'br0'. To fix this, perform the following steps:

1. Navigate to the ***VMs*** tab.
2. Edit each VM and turn on **Advanced View** mode.
3. Locate the network section and from the dropdown, select br0 and then click apply.
4. Once all VMs are set to use the 'br0' bridge, go to the ***Settings > VM Manager***.
5. turn on **Advanced View**, and set the default network bridge on this page to also be `br0`, then select **Apply**.

#### VNC access to my VMs is not working or performing poorly

VMs created in earlier releases of Unraid Server OS may be set to use an outdated graphics device driver for VNC access. To fix this, perform the following steps:

1. For each affected VM, go to ***VMs***.
2. Select the VM's icon, then select the **Edit** option.
3. Turn on **Advanced View** in the top-right of the **Edit VM** page.
4. If you are using VNC for the primary graphics card, adjust the VNC Video Driver field to QXL.
5. Select **Apply**.

#### My OVMF VM doesn't boot correctly

OVMF-based virtual machines that were created under version 6.1 or earlier will most likely require a one-time process to boot up properly on the new release. If you are presented with an EFI shell instead of your OS booting appropriately, type the following commands in order to boot your VM:

```shell
fs0:
cd efi/boot
bootx64.efi
```

If this doesn't work, try changing the first command from `fs0:` to `fs1:`. If that doesn't work, please post in the [forums](https://forums.unraid.net/) for further assistance. This procedure should only need to be performed the first time you boot OVMF VMs that were previously created using Unraid 6.1 or earlier.

#### Trying to start my VM gives a "Invalid Machine Type" error

If you receive this error, simply edit your VM in the WebGUI, and without making any changes, click "Apply". This will update the VM's machine type to the latest version and your VM should start without the error.

#### Poor VM performance after upgrading

Some users have replied that their VMs perform poorly after updating to 6.3. One possible solution could be to update the machine type version for your VM. To do this, edit your VM from the VMs tab in the WebGUI. Turn on "Advanced View" in the top right and look for the **Machine** option. Toggle the version to the latest revision and then hit apply (do not change the prefix selected, only the version; e.g. if previously you were on i440fx-2.5, try changing to i440fx-2.7, but don't change to Q35-2.7). Try starting your VM and see if performance improves.

#### Poor VNC performance after upgrading

If your VM has poor VNC performance after upgrading, please try changing the VNC Video Driver. You can do this from the Edit VM page. It is recommended to first try Cirrus, then vmvga (if available for your VM type).

## From version 6.1 or earlier

Please ensure your system meets these requirements before upgrading:

1. Your USB flash device must have at least 128MB of free space.
2. If you have customized your network bridge name previously, it must be changed back to the default of 'br0' before upgrading.
3. VMs set to use a custom-named bridge will also need to be edited to point to the 'br0' prior to the upgrade.

### Checking for sufficient free space

The upgrade process will check for this automatically, but if you wish to be proactive, you can review your boot device's free space under the Flash section on the _Main_ tab of the web  interface.

### Checking your network bridge name

To see if you have a customized network bridge, open the _Settings_ -\>_Network Settings_ page of the web interface. If the bridge name is anything other than 'br0', change it back to 'br0' and click apply.

### Checking your VM network bridge settings

If you found you have a custom-name for your network bridge and you also have VMs on the system, it is very likely that these VMs are also set to use the custom-named bridge and therefore they must be updated as well. To do this, you will need to perform the following steps after you have restored the default network bridge name:

1. Shutdown all VMs running on the system.
2. Edit each VM and turn on _Advanced View_ mode.
3. Locate the network section and from the dropdown, select br0 and
   then click apply.
4. Once all VMs are set to use the 'br0' bridge, go to the _Settings_
   -\> _Network Settings_ page, turn on _Advanced View_, and set the
   default network bridge on this page to also be 'br0' and click
   apply.

Your VMs should now be ready for use under the latest version.

1. Boot your server up and login to the web interface
2. Click the _Plugins_ tab
3. Click the _Install Plugin_ tab
4. Copy and paste the below link into the field and click install
5. Once the upgrade plugin has been installed, reboot your server

<https://s3.amazonaws.com/dnld.lime-technology.com/stable/unRAIDServer.plg>

### Post installation procedures

Once rebooted under version 6.2 for the first time, it may take several
minutes (potentially longer) to start the array if Docker containers
have been previously configured. This is due to a one-time upgrade
procedure that will be applied to the containers in your Docker image
file. This procedure is automatically performed for you and does not
have to be manually enabled.

In addition, OVMF-based virtual machines that were created under version
6.1 or earlier will most likely require a one-time process to boot up
properly under version 6.2. Upon booting an OVMF-based VM under 6.2, if
you are presented with an EFI shell instead of your OS booting
appropriately, type the following commands in order to boot your VM:

```shell
fs0:
cd efi/boot
bootx64.efi
```

If this doesn't work, try changing the first command from fs0: to fs1:.
If that doesn't work, please post in the
[forums](https://forums.unraid.net/) for further assistance. This
procedure should only need to be performed the first time you boot OVMF
VMs under version 6.2 that were previously created using Unraid 6.1 or
earlier.

## From version 5.x or earlier

Please see [this forum
post](https://forums.unraid.net/forum/index.php?topic=41061.0) for
information on upgrading.

## Manual Upgrade or Downgrade

This is useful if you don't have access to the Unraid WebGUI for some reason.

### Manual upgrade using a network share or by putting the flash drive in another system

- Copy the URL of the unRAIDServer-version.zip file that you want from <https://unraid.net/download>
- Unzip that file locally
- Access the 'flash' share on the server, or physically put the flash drive in the local computer
- If the `previous` directory does not exist on the flash drive, create it
- Move (not copy) bz* and changes.txt from the root of the flash drive to the `previous` directory, overwriting files as needed
- Copy bz* and changes.txt from the unzipped file to the root of the flash drive
- Reboot the server

### Manual upgrade from the Unraid command line

- Copy the URL of the unRAIDServer-version.zip file that you want from <https://unraid.net/download>
- Login to the Unraid server using SSH, telnet, or a local keyboard/mouse
- Type these commands _one line at a time_ and press enter. If there are errors along the way, stop and ask for help:

```shell
cd /tmp
rm -f unraid.zip
rm -rf unraid_install
wget -O unraid.zip <paste the URL from above>
[[ -s unraid.zip ]] && echo "OK to continue" || echo "STOP the file was not downloaded"
unzip -d unraid_install unraid.zip
[[ -s unraid_install/bzroot ]] && echo "OK to continue" || echo "STOP the file was not extracted properly"
[[ ! -d /boot/previous ]] && mkdir /boot/previous
mv /boot/bz* /boot/previous
mv /boot/changes.txt /boot/previous
cp unraid_install/bz* /boot
cp unraid_install/changes.txt /boot
sync -f /boot
sleep 5
reboot
```
