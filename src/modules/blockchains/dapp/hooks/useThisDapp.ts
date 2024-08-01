import React from 'react';
import useDappsStore from '@/modules/blockchains/dapp/stores/useDappStore';

export const useThisDapp = () => {
  const { dapps, currentIndexDapp } = useDappsStore();

  const thisDapp = React.useMemo(() => {
    return dapps[currentIndexDapp];
  }, [dapps, currentIndexDapp]);

  const blockFieldMapping = React.useMemo(() => {
    const mapping: Record<string, BlockModel> = {};

    (thisDapp?.blockFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [thisDapp]);

  const singleFieldMapping = React.useMemo(() => {
    const mapping: Record<string, BlockModel> = {};

    (thisDapp?.singleFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [thisDapp]);

  const moduleFieldMapping = React.useMemo(() => {
    const mapping: Record<string, BlockModel> = {};

    (thisDapp?.moduleFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [thisDapp]);

  const baseModuleFieldMapping = React.useMemo(() => {
    const mapping: Record<string, BlockModel> = {};

    (thisDapp?.baseModuleFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [thisDapp]);

  return {
    thisDapp,
    blockFieldMapping,
    singleFieldMapping,
    moduleFieldMapping,
    baseModuleFieldMapping,
  };
};
