import { IRetrieveFormsByDappKey } from '@/modules/blockchains/Buy/hooks/useOneForm';
import { extractedValue } from '@/modules/blockchains/dapp/hooks/utils';
import { FormDappUtil } from '@/modules/blockchains/dapp/utils';
import CYoloGameAPI from '@/services/api/dapp/yolo';
import BigNumberJS from 'bignumber.js';
import { IPosition } from '@/services/api/dapp/staking/interface';
import { v4 as uuidv4 } from 'uuid';

const useSubmitYoloGame = () => {
  const cYoloGameAPI = new CYoloGameAPI();

  const onSubmitYoloGame = async ({ forms, positions }: { forms: IRetrieveFormsByDappKey[][], positions?: Vector2[] }) => {
    let index = 0;
    for (const form of forms) {
      try {
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

        // TODO: JACKIE - update position below
        const position: IPosition = {
          position_id: uuidv4(),
          position_x: positions?.[index]?.x ?? 0,
          position_y: positions?.[index]?.y ?? 0,
        };
        index++;

        await cYoloGameAPI.createYoloGame({
          settlement_token: formFinal?.settlement_token as unknown as string,
          value_per_entry: formFinal?.value_per_entry as unknown as string,
          round_duration: Number(formFinal?.round_duration),
          maximum_number_of_participants_per_round: Number(formFinal?.maximum_participants),
          protocol_fee_ratio: BigNumberJS(formFinal?.protocol_fee_ratio as any).dividedBy(100).toFixed(2),
          ...position,
        });
      } catch (error) {
        console.log(error);
      }
    }

  };

  return {
    onSubmitYoloGame
  }
}

export default useSubmitYoloGame;
