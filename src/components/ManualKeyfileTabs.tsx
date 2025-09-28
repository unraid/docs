import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ManualKeyfileOffline from '@site/docs/unraid-os/troubleshooting/partials/licensing-faq/manual-keyfile-offline.mdx';
import ManualKeyfileNetwork from '@site/docs/unraid-os/troubleshooting/partials/licensing-faq/manual-keyfile-network.mdx';

const ManualKeyfileTabs = (): React.JSX.Element => (
  <Tabs>
    <TabItem value="offline" label="Manual (Offline) method">
      <ManualKeyfileOffline />
    </TabItem>
    <TabItem value="network" label="Network (Online) method">
      <ManualKeyfileNetwork />
    </TabItem>
  </Tabs>
);

export default ManualKeyfileTabs;
