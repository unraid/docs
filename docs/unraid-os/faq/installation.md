# Installation

## I'm unable to get the USB Flash Creator to install Unraid to my flash device. What do I do?

In the event the flash creator doesn't see or can't install Unraid to the device, it could be for one of many reasons. The simplest solution would be to try an alternate device, but if that is not an option for you, you can try installing Unraid using the legacy [manual method documented here](./manual-install-method).

## I can't seem to connect to the WebGUI using `http://tower` or `http://tower.local`. What do I do?

Sometimes your local DNS server won't resolve by hostname and if that is the case here, you can try connecting to the server by IP address. You can discover the IP address of the server in multiple ways (by manually setting it during the creation of the flash device, reviewing your router/switch DHCP address pool, or by connecting a monitor to the server).

## How do I change the hostname of my server?

You can change the name used for your Unraid server from the WebGUI by going to Settings-\>System Settings-\>Identification

## My flash drive is reporting an invalid GUID. What do I do?

The USB Flash device **must** be one that has a unique hardware GUID (serial number) built into it. Some manufacturers re-use the same GUID on the drives they manufacture, use a GUID that is all zeroes, or use an obviously made-up number. These drives are not able to be used as an Unraid boot device. Although it is difficult to generalize, drives from most major manufacturers **do** satisfy the requirement of having a unique GUID.

Note: SSDs, USB card readers, SD card readers, or other devices cannot be used to boot Unraid at this time.

## The USB flash creator tool isn't detecting my flash drive. What do I do?

In the event this tool doesn't work for you, we have additionally documented a manual process by which you can also create your flash
device. As an FYI, the manual method only works on 32 GB devices or smaller.

USB flash devices and the Flash Creator tool are discussed further in this New Users Blog.

## I need to configure my system to boot using UEFI. How do I do this?

UEFI boot mode can be configured in 3 ways. When creating the flash device using the flash creator, there is an option to enable UEFI boot mode. After booting in legacy mode, you can change to UEFI boot from the Flash Device Settings page. And lastly, you can always rename the folder on the flash drive called **efi~** to **efi** (i.e. removing the trailing **~** character).

## I'm having issues using my web browser with the Unraid WebGUI. What can I do?

Unraid's management interface (the WebGUI) is incompatible with most ad-blocker solutions. It is for this reason that we strongly suggest that users leveraging an ad-blocker in their browser first add the Unraid server to the ad-blocker whitelist to ensure the ad-blocker doesn't affect the WebGUI. Failure to do so is likely to result in parts of the WebGUI not displaying correctly.

## How Do I Extend My Unraid Trial?

Did you know that you can extend the [30 day free trial](https://unraid.net/download) of Unraid? Hardware can be ill-suited. Things break. Life happens. We get it. To try out Unraid a little longer, once your original trial shows "expired" in the upper left of the header, stop the array.

Next, go to the **Registration** page. A button shows up where you can select it for a 15 day extension. You can do this a total of two times before you must decide if you would like to purchase Unraid or not.

:::important

You cannot change the USB flash device for Unraid trials if you wish to continue where you left off.

:::