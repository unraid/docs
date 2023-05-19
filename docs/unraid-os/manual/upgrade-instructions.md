# Upgrading Unraid

# Prerequisites

Before upgrading, we highly recommend making a complete backup of your
USB flash device. You can do this by copying the entire contents of the
\"flash\" share to a separate computer.

# From version 6.4 {#from_version_6.4}

1. Boot your server up and login to the web interface
2. Click the *Tools* tab
3. Click \"Update OS\" under the *About* section
4. Click \"Check for Updates\" to see if a new release is available
5. Click \"Update\" to apply the update
6. Once the upgrade is complete, reboot your server for it to take
    effect

*Note: You can optionally install releases from the \"Next\" branch as
well, but those releases are not considered fully \"Stable\", so only do
so at your own risk.*

# From version 6.3 {#from_version_6.3}

1. Boot your server up and login to the web interface
2. Click the *Plugins* tab
3. Click the \"Update\" button next to Unraid Server OS
4. Once the upgrade is complete, reboot your server for it to take
    effect

# From version 6.2 {#from_version_6.2}

1. Boot your server up and login to the web interface
2. Click the *Plugins* tab
3. Click the *Check for Updates* button
4. Click the \"Update\" button next to Unraid Server OS
5. Once the upgrade is complete, reboot your server for it to take
    effect

Note: if *Check for Updates* shows no update, see below.

## Possible upgrade issues {#possible_upgrade_issues}

Having problems after the update? See below for common issues and
solutions.

### The new release does not show up after clicking *Check for Updates* button {#the_new_release_does_not_show_up_after_clicking_check_for_updates_button}

In this case, manually install the update as follows:

1. Navigate to Plugins/Install Plugin tab
2. Select/copy this text
    <https://s3.amazonaws.com/dnld.lime-technology.com/stable/unRAIDServer.plg>
3. Paste into URL field and click Install

### My array/docker apps are taking a really long time to start after the upgrade {#my_arraydocker_apps_are_taking_a_really_long_time_to_start_after_the_upgrade}

There is a one-time update procedure that each container will need to go
through in order to point it towards the new Docker Hub API going
forward, even if the container itself truly isn\'t in need of an update.
This process will happen automatically the first time your containers
are started after upgrading. The Docker change log describes it like
this:

> Docker 1.10 uses a new content-addressable storage for images and
> layers. A migration is performed the first time docker is run and can
> take a significant amount of time depending on the number of images
> present.

See [here](https://github.com/docker/docker/releases/tag/v1.10.0) for
more information from Docker on this.

### My containers aren\'t working right after the upgrade {#my_containers_arent_working_right_after_the_upgrade}

If you run into any issues with your containers after this procedure
completes (such as the \"layers from manifest don\'t match image
configuration\" error), you will need to rebuild your Docker image file.
To do this:

1. Stop Docker from the *Settings* \> *Docker* page
2. Click the checkbox and then click the button to delete the image
3. Start Docker again and the image will be recreated
4. Go to the *Docker* tab and click *Add Container*
5. From the *Template* drop-down, select one of your previous templates
    (prefixed with \"my-\") and then click *Apply*
6. Repeat the previous step for each of your containers
7. You will **not** need to reconfigure your apps after this is
    complete

### My VMs get an error of \"cannot get interface MTU\...\" {#my_vms_get_an_error_of_cannot_get_interface_mtu...}

A change that was made in version 6.2 eliminated the customization of
the bridge name used for virtual machines. Users that have a custom
bridge name set will need to fix their VMs to point to the new default
of \'br0\'. To fix this, perform the following steps:

1. Navigate to the VMs tab.
2. Edit each VM and turn on *Advanced View* mode.
3. Locate the network section and from the dropdown, select br0 and
    then click apply.
4. Once all VMs are set to use the \'br0\' bridge, go to the *Settings*
    -\> *VM Manager* page, turn on *Advanced View*, and set the default
    network bridge on this page to also be \'br0\' and click apply.

### VNC access to my VMs is not working or performing poorly {#vnc_access_to_my_vms_is_not_working_or_performing_poorly}

VMs created in earlier releases of Unraid Server OS may be set to use an
outdated graphics device driver for VNC access. To fix this, perform the
following steps:

1. For each affected VM, go to the VMs tab, click the VM\'s icon, and
    select the Edit option
2. Turn on \"Advanced View\" in the top right of the Edit VM page
3. If you are using VNC for the primary graphics card, adjust the VNC
    Video Driver field to QXL
4. Click Apply

### My OVMF VM doesn\'t boot correctly {#my_ovmf_vm_doesnt_boot_correctly}

OVMF-based virtual machines that were created under version 6.1 or
earlier will most likely require a one-time process to boot up properly
on the new release. If you are presented with an EFI shell instead of
your OS booting appropriately, type the following commands in order to
boot your VM:

1. fs0:
2. cd efi/boot
3. bootx64.efi

If this doesn\'t work, try changing the first command from fs0: to fs1:.
If that doesn\'t work, please post in the
[forums](http://lime-technology.com/forum) for further assistance. This
procedure should only need to be performed the first time you boot OVMF
VMs that were previously created using Unraid 6.1 or earlier.

### Trying to start my VM gives a \"Invalid Machine Type\" error {#trying_to_start_my_vm_gives_a_invalid_machine_type_error}

If you receive this error, simply edit your VM in the webGui, and
without making any changes, click \"Apply\". This will update the VM\'s
machine type to the latest version and your VM should start without the
error.

### Poor VM performance after upgrading {#poor_vm_performance_after_upgrading}

Some users have replied that their VMs perform poorly after updating to
6.3. One possible solution could be to update the machine type version
for your VM. To do this, edit your VM from the VMs tab in the webGui.
Turn on \"Advanced View\" in the top right and look for the **Machine**
option. Toggle the version to the latest revision and then hit apply (do
not change the prefix selected, only the version; e.g. if previously you
were on i440fx-2.5, try changing to i440fx-2.7, but don\'t change to
Q35-2.7). Try starting your VM and see if performance improves.

### Poor VNC performance after upgrading {#poor_vnc_performance_after_upgrading}

If your VM has poor VNC performance after upgrading, please try changing
the VNC Video Driver. You can do this from the Edit VM page. It is
recommended to first try Cirrus, then vmvga (if available for your VM
type).

# From version 6.1 or earlier {#from_version_6.1_or_earlier}

Please ensure your system meets these requirements before upgrading:

1. Your server must be running version 6.1 or later.
2. Your USB flash device must have at least 128MB of free space.
3. If you have customized your network bridge name previously, it must
    be changed back to the default of \'br0\' before upgrading.
4. VMs set to use a custom-named bridge will also need to be edited to
    point to the \'br0\' prior to the upgrade.

## Checking your existing version {#checking_your_existing_version}

To check which version of Unraid is presently running on your server,
simply log into the web interface and look in the top right corner of
the browser.

## Checking for sufficient free space {#checking_for_sufficient_free_space}

The upgrade process will check for this automatically, but if you wish
to be proactive, you can review your boot device\'s free space under the
Flash section on the *Main* tab of the web interface.

## Checking your network bridge name {#checking_your_network_bridge_name}

To see if you have a customized network bridge, open the *Settings* -\>
*Network Settings* page of the web interface. If the bridge name is
anything other than \'br0\', change it back to \'br0\' and click apply.

## Checking your VM network bridge settings {#checking_your_vm_network_bridge_settings}

If you found you have a custom-name for your network bridge and you also
have VMs on the system, it is very likely that these VMs are also set to
use the custom-named bridge and therefore they must be updated as well.
To do this, you will need to perform the following steps after you have
restored the default network bridge name:

1. Shutdown all VMs running on the system.
2. Edit each VM and turn on *Advanced View* mode.
3. Locate the network section and from the dropdown, select br0 and
    then click apply.
4. Once all VMs are set to use the \'br0\' bridge, go to the *Settings*
    -\> *Network Settings* page, turn on *Advanced View*, and set the
    default network bridge on this page to also be \'br0\' and click
    apply.

Your VMs should now be ready for use under the latest version.

1. Boot your server up and login to the web interface
2. Click the *Plugins* tab
3. Click the *Install Plugin* tab
4. Copy and paste the below link into the field and click install
5. Once the upgrade plugin has been installed, reboot your server

<https://s3.amazonaws.com/dnld.lime-technology.com/stable/unRAIDServer.plg>

## Post installation procedures {#post_installation_procedures}

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

- fs0:
- cd efi/boot
- bootx64.efi

If this doesn\'t work, try changing the first command from fs0: to fs1:.
If that doesn\'t work, please post in the
[forums](http://lime-technology.com/forum) for further assistance. This
procedure should only need to be performed the first time you boot OVMF
VMs under version 6.2 that were previously created using Unraid 6.1 or
earlier.

# From version 5.x or earlier {#from_version_5.x_or_earlier}

Please see [this forum
post](http://lime-technology.com/forum/index.php?topic=41061.0) for
information on upgrading.
