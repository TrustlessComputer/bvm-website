'use client';

import { L2RollupDetailProvider } from '../providers/l2-rollup-detail-context';
import TxBTCExplorer from '../TxBTCExplorer';

const TxExplorerModule = () => {
  return (
    <L2RollupDetailProvider>
      <TxBTCExplorer />
    </L2RollupDetailProvider>
  );
};

export default TxExplorerModule;
