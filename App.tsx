import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { GroupDashboard } from './views/GroupDashboard';
import { PowerView } from './views/PowerView';
import { SiliconView } from './views/SiliconView';
import { SegmentType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<SegmentType>(SegmentType.GROUP);

  const renderContent = () => {
    switch (activeTab) {
      case SegmentType.GROUP:
        return <GroupDashboard />;
      case SegmentType.POWER:
        return <PowerView />;
      case SegmentType.SILICON:
        return <SiliconView />;
      default:
        return <GroupDashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;