import React from 'react';

import { DappType } from '@/modules/agent-studio/dapp/types';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { dappSelector } from '@/stores/states/dapp/selector';
import { orderBy } from 'lodash';
import { useParams, usePathname } from 'next/navigation';
import {
  createAgentGeneralIdeaAsBrainstorm,
  missionAsBrainstorm,
  dappMockupData,
  gamingAppsAsADapp,
  createAgentNftEtherAsBrainstorm,
  createAgentNftOrdinalBTCAsBrainstorm,
  createAgentTokensPumpAsBrainstorm,
} from '../mockup_3';
import useDappsStore from '../stores/useDappStore';
import { cloneDeep } from '../utils';

const useOnlyFetchDapp = () => {
  const pathname = usePathname();
  const params = useParams();
  const isUpdateChain = React.useMemo(() => !!params?.id, [params?.id]);

  const setDapps = useDappsStore((state) => state.setDapps);

  const { counterFetchedDapp } = useAppSelector(commonSelector);
  const dappState = useAppSelector(dappSelector);
  const { configs, tokens, airdropTasks, tokensAll } = dappState;

  const configsMapping = React.useMemo(() => {
    const _tokens = orderBy(
      tokensAll?.filter((token) => token?.symbol && token.contract_address),
      (token) => token?.is_native,
      'desc',
    ).map((token) => ({
      key: token.contract_address || '',
      title: token?.symbol || '',
      value: token.contract_address || '', // contract_address
      icon: token.image_url, // image_url
      tooltip: '',
      type: '',
      options: [],
      selectable: true,
    }));
    return configs?.map((config) => {
      switch (config.key) {
        case DappType.staking: {
          return {
            ...config,
            baseBlock: {
              ...config.baseBlock,
              fields: config.baseBlock.fields.map((field) => {
                if (
                  field.key === 'staking_token' ||
                  field.key === 'reward_token'
                ) {
                  return {
                    ...field,
                    options: _tokens,
                  };
                }
                return field;
              }),
            },
          };
        }
        case DappType.airdrop: {
          return {
            ...config,
            baseBlock: {
              ...config.baseBlock,
              fields: config.baseBlock.fields.map((field) => {
                if (field.key === 'reward_token') {
                  return {
                    ...field,
                    options: _tokens,
                  };
                }
                return field;
              }),
            },
          };
        }
        default: {
          return config;
        }
      }
    });
  }, [configs, tokensAll]);

  const fetchDapps = () => {
    const _dapps = [
      createAgentGeneralIdeaAsBrainstorm,
      createAgentNftEtherAsBrainstorm,
      createAgentNftOrdinalBTCAsBrainstorm,
      createAgentTokensPumpAsBrainstorm,
    ];

    const otherDapps = isUpdateChain
      ? // ? cloneDeep(dappFromAPIMockupData)
        cloneDeep(configsMapping as any)
      : cloneDeep(dappMockupData); // defi_apps

    _dapps.push(...otherDapps);

    let sortedDapps = _dapps.sort((a, b) => a.order - b.order);

    setDapps(sortedDapps);

    console.log('[useOnlyFetchDapp] dapps', sortedDapps);
  };

  React.useEffect(() => {
    fetchDapps();
  }, [
    counterFetchedDapp,
    pathname,
    JSON.stringify(configsMapping || {}),
    JSON.stringify(airdropTasks || {}),
  ]);
};

export default useOnlyFetchDapp;
