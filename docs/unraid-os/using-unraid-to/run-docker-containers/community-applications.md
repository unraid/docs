---
sidebar_position: 2
sidebar_label: Community Applications
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Community Applications

Community Applications provides a curated catalog of over 2,000 free Docker containers and plugins maintained by the Unraid community. Each container or plugin lets your server take on new roles, such as running a media server, dynamic DNS client, or backup solution.

- **Docker containers** are lightweight packages that include everything needed to run an application, keeping it isolated from the rest of your %%array|array%% and %%cache pool|cache-pool%%.  Learn more about [array configuration](./manage-storage/array-configuration.md) and [cache pools](./manage-storage/cache-pools.md).
- **Plugins** enhance Unraid OS itself. For more information about plugins, visit the [Plugins](../customize-your-experience/plugins.md) page.

:::caution
Lime Technology does not supply or directly support Community Applications. The Community Applications team provides basic vetting and moderation, but it's important to review documentation and support resources for each application before installation.
:::

## How Community Applications works

The Community Applications plugin adds an **Apps** tab to the Unraid %%WebGUI|web-gui%%, which provides an app store-like interface. You can browse, search, and filter applications by category or keyword. Each listing clearly indicates whether it is a Docker container or a plugin. 

Listings include labels such as:

- **Beta:** The application is in active development and may have bugs.
- **Installed:** The application is currently installed on your server.
- **Updated:** A newer version is available.
- **Monthly CA Spotlight:** Featured by the moderation team for quality or popularity.

Clicking on an app provides more details, support links, and installation options.

---

## Installing the plugin

To install the Community Applications plugin:

1. Open the %%WebGUI|web-gui%% and navigate to the **Plugins** tab.
2. Click on **Install**.

<div style={{ margin: 'auto', maxWidth: '714px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Community Applications install](/img/ca_installation.png)

</div>

3. Once the installation is complete, refresh the page. The screen will automatically open the **Apps** tab and introduce you to Community Applications.

:::tip
Before installing, consider backing up your flash drive to protect your configuration. See [Secure your flash drive](../../system-administration/secure-your-server/secure-your-flash-drive.md) for backup guidance.
:::

---

## Managing applications

<Tabs>
  <TabItem value="Installing applications" label="Installing applications">

To install a Docker container or plugin, simply click the **Install** button from the application's tile or information panel located in the **Apps** tab of the %%WebGUI|web-gui%%. This will start the installation process.
<div style={{ margin: 'auto', maxWidth: '423px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

![Install application](/img/CA_Tile1.png)

</div>

Keep the installation window open until the process is fully completed.

:::tip Security tip
Before you install, take a moment to read the application's description. Check the developer's reputation and ensure the source repository is trustworthy. It’s best to choose applications from well-known developers or those with active support threads. Always be cautious about granting access to your %%array|array%%, %%cache pool|cache-pool%%, or any sensitive data.  Learn more about [security fundamentals](../../system-administration/secure-your-server/security-fundamentals.md).
:::

  </TabItem>
  
  <TabItem value="Removing applications" label="Removing applications">

To remove an application:

1. Use the **Installed Apps** filter in the **Apps** tab. This will show you all installed Docker containers and plugins as tiles.  
2. Click on **Actions** and select **Uninstall** for the application you want to remove.

  </TabItem>
  
  <TabItem value="Reinstalling applications" label="Reinstalling applications">

If you need to reinstall a Docker container or plugin (for instance, if your `docker.img` file is corrupted), Community Applications simplifies this for you. All application settings are saved as a %%VM XML template|vm-xml-templates%% in `/boot/config/plugins/dockerMan/templates-user`.  For more information on templates, see [VM setup](../create-virtual-machines/vm-setup.md).

To reinstall an application:

1. Go to the **Apps** tab in the %%WebGUI|web-gui%%.
2. Select the **Previous Apps** filter.
3. Find the application you wish to reinstall and follow the prompts.

Your saved settings will be restored automatically, allowing for a quick and easy recovery.

  </TabItem>
</Tabs>

## Support for Applications

If you’re using Docker containers and plugins, you'll find that most come with dedicated support resources to help you out. There are several easy ways to access these support options:

- **Apps Tab**: Click on the **Apps** tab, then filter to **Installed Apps**. From there, locate the App and select **Support**.
  
- **Dashboard or Docker Tabs**: Navigate to the **Dashboard** or **Docker** tabs, click on the icon of the container you're using, and select **Support**.

- **Plugins Tab**: On the **Plugins** tab, each plugin will have a **Support Thread** link right in its summary for quick access.

These resources will connect you to community forums and developer discussions where you can find help, troubleshoot issues, and stay updated.

---

## Updating applications (Action Center)

The **Action Center** in the %%WebGUI|web-gui%% is your go-to place for keeping track of applications that need updates. When there are updates available, you’ll see an alert. Just click on **Actions** for the app that needs updating, and then select **Update** to run the update script. Regular updates are essential for maintaining the security, stability, and compatibility of your Unraid installation. See [Upgrading Unraid](../../system-administration/maintain-and-update/upgrading-unraid.md) for more information.

---

## Contributing your own applications

The **Community Applications** ecosystem thrives on contributions from the Unraid community. Whether you’re developing applications or plugins, your work can help others enhance their Unraid servers. Below are guidelines for submitting your creations, based on the [official policies](https://forums.unraid.net/topic/87144-ca-application-policies-notes/).

### Submission requirements

To ensure quality and maintainability, all submissions must:

- Include a dedicated support thread on the [Unraid forums](https://forums.unraid.net/).
- Provide clear documentation for installation, configuration, and troubleshooting.
- Use open-source licensing unless the application requires proprietary components.
- Avoid conflicts with core Unraid functionality or existing community applications.

Submissions are reviewed by the Community Applications moderation team, which performs basic vetting for security, functionality, and adherence to Unraid’s design principles.

### Maintenance expectations

Developers who publish applications in Community Applications are expected to maintain their projects to ensure compatibility and reliability for the Unraid community. This section outlines the ongoing responsibilities that help maintain the quality of available applications.

Once published, developers are expected to:

- Regularly update applications to maintain compatibility with new Unraid releases.
- Respond to support requests in their forum threads.
- Clearly label beta or experimental versions.
- Notify the moderation team if discontinuing support for an application.

:::note
The moderation team reserves the right to remove applications that become incompatible with current Unraid versions or lack ongoing support. For time-sensitive security updates, they may temporarily take over maintenance of abandoned projects.
:::

### Publishing workflow

If you're a developer interested in contributing to the Unraid community by publishing your application, this workflow ensures quality control and provides users with reliable, well-documented applications.

1. Prepare your application's template files and documentation.
2. Create a support thread in the [Unraid forums](https://forums.unraid.net/).
3. Submit your application via the **Community Applications** submission portal in the %%WebGUI|web-gui%%.
4. The moderation team typically reviews submissions within 48 hours.
