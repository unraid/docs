---
sidebar_position: 4
---

# Resetting your Unraid password

Whether you have forgotten your password, or are not using a password manager, forgetting your root password can be a problem and bring everything to a standstill.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

There are two methods to reset your `root` password, both of which require access to another computer:

<Tabs>
  <TabItem value="Basic" label="Basic" default>
    <p>This method involves deleting the files that contain your hashed passwords from the USB device, and is the safest.</p>
    <ol>
      <li> Shutdown your server.</li>
      <li> Plug your USB flash device into a Windows or Mac computer.</li>
      <li> Open the USB device in Explorer / Finder.</li>
      <li> Locate and delete the files:
        <ul>
        <li><code>boot/config/shadow</code></li>
        <li><code>boot/config/smbpasswd</code></li>
        </ul></li>
      <li> Securely eject your USB device and connect it to the Unraid server again.</li>
      <li> Boot up the Unraid server and it will ask you to set up a new password, as if you'd just completed a first boot of Unraid.</li>
      <li> <i>(Optional)</i> If you have any user accounts configured in <b><i>Users > Shares Access</i></b> (or <b><i>Settings > Users > Shares Access</i></b>), select each user and enter a new password. Be sure to select <b>Change</b> and not <b>Done</b> after this.</li>
    </ol>
    <p> Your password is reset and your account secured.</p>
    </TabItem>
  <TabItem value="Advanced" label="Advanced">
    <p>This method is suggested for more advanced users, and involves deleting the <code>root</code> account's password. This method does not remove any other account passwords.</p>
    <ol>
      <li> Shutdown your server.</li>
      <li> Plug your USB flash device into a Windows or Mac computer.</li>
      <li> Bring up an editor (such as Notepad++) and edit the following file: <code>/boot/config/shadow</code>.</li>
      <li> On the first line you should see something such as: <code>root:\$&\$&%\*1112233484847648DHD\$%.:15477:0:99999:7:::</code></li>
      <li> Change that line to the following (essentially delete the content between the first and second colons):    <code>root::15477:0:99999:7:::</code>, save and exit.</li>
      <li> Securely eject your USB device and connect it to the Unraid server again.</li>
      <li> Plug the flash device back into server and start up the server.</li>
    </ol>
    <p> Your password is reset and your account secured.</p>
  </TabItem>
</Tabs>
