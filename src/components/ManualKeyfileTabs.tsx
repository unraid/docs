import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

const ManualKeyfileTabs = (): React.JSX.Element => (
  <Tabs>
    <TabItem value="offline" label="Manual (Offline) method">
      <ol>
        <li>Ensure you have a recent backup of your USB drive. Use <a href="/unraid-connect/overview-and-setup">Unraid Connect</a> (recommended) or the local backup option at <strong><em>Main → Flash → Flash Backup</em></strong>.</li>
        <li>Shut down your Unraid server and remove the USB flash device.</li>
        <li>Insert the USB flash into another computer.</li>
        <li>Open the USB drive and copy your <code>.key</code> file into the <code>/config</code> folder.
          <br /><em>Make sure this is the only <code>.key</code> file present—delete any others.</em></li>
        <li>Safely eject the USB flash device, reinstall it in your server, and reboot.</li>
      </ol>
    </TabItem>
    <TabItem value="network" label="Network (Online) method">
      <ol>
        <li>If your server is running and the flash share is visible on your network, navigate to the flash share under <strong>Network</strong>.</li>
        <li>Drag and drop the registration key file into the <code>config</code> directory.</li>
        <li>In the WebGUI, <strong>Stop</strong> the array, then <strong>Start</strong> the array again to apply the new key.</li>
      </ol>
    </TabItem>
  </Tabs>
);

export default ManualKeyfileTabs;

