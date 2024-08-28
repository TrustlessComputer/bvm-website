'use client';

import { useContext } from 'react';
import { L2RollupDetailContext } from '../providers/l2-rollup-detail-context';
import { L2RollupExplorerProvider } from '../providers/l2-rollup-explorer-context';
import TxBTCExplorer from '../TxBTCExplorer';

const TxExplorerModuleHandle = () => {
  const { address, isBTCTxAddress, isERC20TxAddress } = useContext(
    L2RollupDetailContext,
  );

  return <></>;
};

const TxExplorerModule = () => {
  return (
    <L2RollupExplorerProvider>
      <TxExplorerModuleHandle />
    </L2RollupExplorerProvider>
  );
};

export default TxExplorerModule;
