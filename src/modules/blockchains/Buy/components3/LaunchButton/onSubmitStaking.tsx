import { IRetrieveFormsByDappKey } from '@/modules/blockchains/Buy/hooks/useOneForm';
import { extractedValue } from '@/modules/blockchains/dapp/hooks/utils';
import { formDappSignal } from '@/modules/blockchains/dapp/signals/useFormDappsSignal';
import { FormDappUtil } from '@/modules/blockchains/dapp/utils';
import CStakingAPI from '@/services/api/dapp/staking';
import { useAppDispatch } from '@/stores/hooks';
import { requestReload } from '@/stores/states/common/reducer';

const useSubmitStaking = () => {
  const cStakeAPI = new CStakingAPI();
  const dispatch = useAppDispatch()

  const onSubmitStaking = async ({ forms }: { forms: IRetrieveFormsByDappKey[][] }) => {
    // const stakingForms = retrieveFormsByDappKey({
    //   dappKey: 'staking',
    // });

    const params = [];

    for (const form of forms) {
      let finalFormMappings: Record<
        string,
        { key: string; value: string }[]
      >[] = [];
      const formDapp = Object.assign({}, ...form);
      const formDappInBase = Object.keys(formDapp).filter(
        (key) => !FormDappUtil.isInBlock(key) && !FormDappUtil.isInSingle(key),
      );
      const formDappInModule = Object.keys(formDapp).filter(
        (key) => !FormDappUtil.isInModule(key),
      );
      const formDappInSingle = Object.keys(formDapp).filter(
        FormDappUtil.isInSingle,
      );

      finalFormMappings = extractedValue(
        formDappInBase,
        formDapp,
        finalFormMappings,
      );

      finalFormMappings = extractedValue(
        formDappInModule,
        formDapp,
        finalFormMappings,
      );

      finalFormMappings = extractedValue(
        formDappInSingle,
        formDapp,
        finalFormMappings,
      );
      const formFinal = finalFormMappings.find(item => !!item);
      const info: any = formFinal?.info.find((item) => !!item);
      try {
        const data = await cStakeAPI.createNewStakingPool({
          principle_token: formFinal?.staking_token,
          reward_token: formFinal?.reward_token,
          base_ratio: Number(info?.apr?.replaceAll('%', '')) / 100,
          token_price: 1 / Number(info?.rate),
        });
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(requestReload());
  };

  return {
    onSubmitStaking
  }
}

export default useSubmitStaking;
