import { IRetrieveFormsByDappKey } from '@/modules/blockchains/Buy/hooks/useOneForm';
import { extractedValue } from '@/modules/blockchains/dapp/hooks/utils';
import { FormDappUtil } from '@/modules/blockchains/dapp/utils';
import CStakingAPI from '@/services/api/dapp/staking';
import { IPosition } from '@/services/api/dapp/staking/interface';
import { v4 as uuidv4 } from 'uuid';

const useSubmitStaking = () => {
  const cStakeAPI = new CStakingAPI();

  const onSubmitStaking = async ({
    forms,
    positions = [],
  }: {
    forms: IRetrieveFormsByDappKey[][];
    positions?: Vector2[];
  }) => {
    // const stakingForms = retrieveFormsByDappKey({
    //   dappKey: 'staking',
    // });

    // const params = [];
    let index = 0;

    for (const form of forms) {
      try {
        let finalFormMappings: Record<
          string,
          { key: string; value: string }[]
        >[] = [];
        const formDapp = Object.assign({}, ...form);
        const formDappInBase = Object.keys(formDapp).filter(
          (key) =>
            !FormDappUtil.isInBlock(key) && !FormDappUtil.isInSingle(key),
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
        const formFinal = finalFormMappings.find((item) => !!item);

        // TODO: JACKIE - update position below
        const position: IPosition = {
          position_id: uuidv4(),
          position_x: positions[index].x ?? 0,
          position_y: positions[index].y ?? 0,
        };

        index++;

        await cStakeAPI.createNewStakingPool({
          principle_token: formFinal?.staking_token,
          reward_token: formFinal?.reward_token,
          base_ratio: Number((formFinal?.apr as any)?.replaceAll('%', '')) / 100,
          token_price: 1 / Number(formFinal?.rate),
          ...position, // TODO: JACKIE - update position
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    onSubmitStaking,
  };
};

export default useSubmitStaking;
