---
sidebar_position: 2
---

# Tour the WebGUI

The %%WebGUI|web-gui%% is the primary interface for managing and configuring your Unraid server. It provides access to all system features, monitoring tools, and configuration options through an organized navigation bar and user-friendly screens. This layout is designed to help you efficiently manage storage, users, applications, and system settings from any web browser.

## The Navigation Bar

The horizontal navigation bar gives users access to the main functional areas of the Unraid system. You can customize it with plugins to add extra menus and options, available in the <u>Community Applications section</u>.

  ![Navigation Bar - Annotated](/img/navbar3.png)

### 1. Dashboard

The Dashboard tab provides real-time monitoring of hardware and software components on your Unraid server. It displays various aspects of management - such as system identification, CPU, RAM, storage, network information, Containers, %%VMs|vm%%, users, and shares - in a grid of tiles.
  ![Dashboard tab](/img/dashboard.png)
You can enhance the Dashboard with plugins from <u>Community Applications</u> and customize the display by toggling tiles on and off using the padlock in the navigation bar.

### 2. Main

The Main screen enables efficient management of your Unraid storage and disk operations. You can configure your %%array|array%%, %%cache pools|cache-pool%%, and flash devices, as well as manage USB storage and unassigned devices, including remote shares. It displays key information about each storage device, such as health, capacity, and file systems.
  ![Main tab](/img/maintab.png)
At the bottom, the Array Operation section provides maintenance options to keep your %%array|array%% running smoothly.

### 3. Shares

The Shares screen allows you to manage individual shares on your Unraid server. It is divided into <u>User Shares</u> and <u>Disk Shares</u>.

You can access detailed information and management options for each share by selecting its name.

### 4. Users

The Users screen allows management of all user accounts on the Unraid server, as detailed in the <u>User Management section</u>.
  ![Users tab](/img/userstab.png)

### 5. Settings

The Settings screen allows you to manage all system settings on your Unraid server, including:

- **System Settings**: Configure parameters and behaviors for the core components of Unraid.
- **Network Services**: Set up various communication protocols and configure your %%Wireguard|wireguard%% %%VPN|vpn-tunnel%%.
- **User Preferences**: Adjust individual user preferences, such as notifications and display settings.
- **User Utilities**: Manage individual utilities that you have added through plugins.

![Settings tab](/img/settingstab.png)

### 6. Plugins

The Plugins screen shows all the plugins installed on your Unraid server.
![Plugins tab](/img/pluginstab.png)

:::note
For plugin installation steps, see <u>Extend with Community Applications</u>.
:::

### 7. Docker

The Docker screen displays all containers installed from <u>Community Applications</u>. You can launch, stop, and configure each container, including their auto-start settings.

:::note
For details on running Docker containers, see <u>Using Unraid to... > Run Docker containers</u>.
:::

### 8. VMs

The VMs screen lets you manage %%virtual machines (VMs)|vm%% on your Unraid server. It displays all your created %%VMs|vm%% along with their main attributes, such as CPU assignments, %%vDisk allocation|vdisk-allocation%%, and graphics card settings.

:::note
This option will **only** appear in the Navigation Bar if your Unraid server meets the %%hardware virtualization|hvm%% requirements.
:::

### 9. Apps

The Apps screen, or "Community Applications," is the official source for Unraid apps.
![Apps tab](/img/appstab.png)
It provides community-sourced plugins and Docker containers that enhance Unraid’s functionality beyond a basic NAS. For more details, check the <u>Community Applications section</u>.

### 10. Tools

The Tools screen offers various tools for managing Unraid OS, customizing the look of the %%WebGUI|web-gui%%, and system updates.
![Tools tab](/img/toolstab.png)

### 11. System Shortcuts

![System Shortcuts](/img/systemshortcuts.png)

The section of the Navigation bar displays shortcuts to Unraid features, such as:

- ![Logout](/img/logout.png) **Logout :** Log out of the Unraid server.
- ![Terminal](/img/terminal.png) **Terminal:** Open a terminal window.
- ![File Manager](/img/filemanager.png) **File Manager:** Access the built-in file manager.
- ![Feedback](/img/feedback.png) **Feedback:** Submit feedback, report issues, or leave comments.
- ![Info](/img/infoicon.png) **Info:** View a summary of your server’s attributes.
- ![Log](/img/logicon.png) **Log:** See a list of system events.
- ![Help](/img/helpicon.png) **Help:** Enable help for the current screen.
- ![Notifications](/img/notificationicon.png) **Notifications:** View system alerts, warnings, and notices.

### 12. Account Options

In the top-right corner of the %%WebGUI|web-gui%%, next to your server name, is the hamburger menu. This menu allows you to manage your Unraid account, access Unraid Connect, upgrade your license key, and log out.

If you're in trial mode, you can also redeem your license key here to activate Unraid as Basic, Plus, or Pro.

### 13. Status Bar

![Status Bar](/img/status-bar2.png)
The status bar at the bottom of the %%WebGUI|web-gui%% shows the current state of your %%array|array%% and the status of ongoing operations like %%Mover|mover%% or %%parity checks|parity-check%%. Some plugins also display important information, like system temperatures.
