---
sidebar_position: 4
---

# Unclean shutdowns

Sometimes when booting up the system and starting the array a parity check is automatically started due to an unclean shutdown. An unclean shutdown occurs when Unraid records the array was not successfully stopped when the system was last powered off. 

## Events that cause unclean shutdowns

### Unexpected power loss

The best protection against this type of issue is to have an Uninterruptible Power Supply (UPS) that is set up to initiate a controlled shutdown of Unraid initiated by the UPS when the amount of power left in the UPS reaches a trigger level. See [Configuring timeouts](#configuring-timeouts) for the proper configuration of timeouts. Configure these to make sure the system has enough power to perform a graceful shutdown.

:::note

The built-in UPS component in Unraid requires that your UPS supports the APC communications protocol. Otherwise, you can try using the **Network UPS Tools (NUT) for Unraid** in Community Applications.

:::

### Flash drive failure

The status of the array is stored on the USB flash device. If, for any reason the status on the flash drive cannot be updated due to the flash drive going offline, or going into a read-only state, then Unraid will not be able to update this status even if the array is stopped successfully. This will be identified as an unclean shutdown the next time you boot the Unraid server.

### Open terminal session

A common reason for an unclean shutdown is having a terminal session open. Unraid will not close sessions to shut down, but instead waits for them to be terminated while the shutdown timer is running. After the overall shutdown timer runs out, the server is forced to shutdown.

:::tip

If you have the **Dynamix Stop Shell** plugin installed, you can specify that any **bash** or **SSH** sessions be terminated so Unraid can be gracefully shutdown.

:::

## Configuring timeouts

A key part of a clean shutdown is giving enough time for the system processes to finish their workloads. There are various countdowns that are triggered when a shutdown of the array is started. These run in parallel and many users find the defaults are too low for their particular workload:

### Virtual machines

There is a timer in ***Settings > VM Manager > VM Shutdown*** (in **Advanced view**) that needs to be set to a high enough value to allow your VMs time to completely shutdown. Some factors that impact a VMs shutdown time include the OS' power settings (sleep and hibernation), and any maintenance tasks like Windows Update, on Windows operating systems.
* Power settings can put the VM into a sleep or hibernation state. A system must resume from this state before initiating shutdown. If you have set up sleep or hibernation on your VM, factor this into your timeout calculations.
* Windows VMs will sometimes have an update that requires a reboot of the VM to complete, and will do so by themselves. These can take quite a while and the default setting of 60 seconds in the **VM Manager** may not be long enough. If the timer setting is exceeded on a shutdown, your VMs will be forced to shutdown. This is just like pulling the plug on a PC. A reasonable value is something like 300 seconds (5 minutes) in order to insure your Windows VMs have time to completely shutdown. Alternatively, you can schedule a task to run Windows Update right after system boot, so that it is the first thing that happens, rather than waiting for a system shutdown to trigger it.

### Docker containers

There is a timer for stopping Docker containers under ***Settings > Docker*** (in **Advanced view**). If this timeout is reached, then any running Docker containers will be force-stopped. The default timeout value for containers is 10 seconds, but containers shutdown concurrently. As of Unraid 6.12.5, any containers still running after the timeout will be forcibly stopped, resulting in an unclean shutdown.

### General shutdown timer

In order to make sure Unraid shuts down fully before an attached UPS runs out of power, under ***Settings > Disk Settings > Shutdown time-out***, Unraid has a **Shutdown time-out** setting which has a default value of 90 seconds. All processes that rely on the array or pools must shut down before this timeout expires, or the system will forcibly shutdown on its own, resulting in an unclean shutdown. To ensure the system has time to fully shut down in a worst-case scenario, you can determine the proper **Shutdown time-out** value for your system by: adding `3x VM Shutdown timeout` + `Docker stop timeout` + another 15 to 30 seconds or more, depending on the speed of your system and how many drives need to be unmounted.

<!--
:::tip

When setting up timers, it can be useful to use the **Stop** option in ***Main*** to stop your array, with your normal workload running. You can measure how long it takes to completely halt all disk operations. Then, the overall shutdown timer should be set to - at least - this value plus a small margin to allow for variability.

:::
-->

## Recommendations

These suggested actions can prevent an unclean shutdown, or help determine the cause of one.

* If your server seems hung and you cannot connect to the WebGUI, try a quick press of the power button. This will initiate a shutdown and Unraid will attempt a graceful shutdown of the server. If you have to hold the power button to do a hard power off, you will get an unclean shutdown.
* You can activate the ***Settings > Syslog Server*** to get logs that can survive a reboot as, by default, the syslog is only in RAM and is lost after a reboot.
* If an unclean shutdown does occur because the overall "Shutdown time-out" was exceeded, Unraid will attempt to write diagnostics to the `/log` folder on the USB flash device. When you ask for help in the Unraid forums with an unclean shutdown, attach the `/log/diagnostics.zip` file to your forum post to help the community . There is information in the log that shows why the unclean shutdown occurred.
