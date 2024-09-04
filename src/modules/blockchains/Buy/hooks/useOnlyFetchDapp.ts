import React from 'react';

import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { dappSelector } from '@/stores/states/dapp/selector';
import { useParams, usePathname } from 'next/navigation';
import {
  accountAbstractionAsADapp,
  bridgesAsADapp,
  dappMockupData,
  gamingAppsAsADapp,
} from '../mockup_3';
import useDappsStore from '../stores/useDappStore';
import { cloneDeep, preDataAirdropTask, preDataYoloGame } from '../utils';

const useOnlyFetchDapp = () => {
  const pathname = usePathname();
  const params = useParams();
  const isUpdateChain = React.useMemo(() => !!params?.id, [params?.id]);

  const { setDapps } = useDappsStore();

  const { counterFetchedDapp } = useAppSelector(commonSelector);
  const dappState = useAppSelector(dappSelector);
  const { configs, tokens, airdropTasks, tokensAll } = dappState;

  const fetchDapps = () => {
    const _dapps = [
      accountAbstractionAsADapp,
      bridgesAsADapp,
      gamingAppsAsADapp,
    ];

    const otherDapps = isUpdateChain
      ? // ? cloneDeep(dappFromAPIMockupData)
        cloneDeep(configs)
      : cloneDeep(dappMockupData); // defi_apps

    _dapps.push(...otherDapps);

    const sortedDapps = _dapps.sort((a, b) => a.order - b.order);

    setDapps(preDataAirdropTask(sortedDapps, tokens, airdropTasks));
    setDapps(preDataYoloGame(sortedDapps, tokensAll));
  };

  React.useEffect(() => {
    fetchDapps();
  }, [counterFetchedDapp, pathname, JSON.stringify(configs || {})]);
};

export default useOnlyFetchDapp;
