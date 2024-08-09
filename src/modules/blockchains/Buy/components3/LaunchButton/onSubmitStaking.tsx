import { IRetrieveFormsByDappKey } from '@/modules/blockchains/Buy/hooks/useOneForm';
import { extractedValue } from '@/modules/blockchains/dapp/hooks/utils';
import { formDappSignal } from '@/modules/blockchains/dapp/signals/useFormDappsSignal';
import { FormDappUtil } from '@/modules/blockchains/dapp/utils';

const onSubmitStaking = async ({ forms }: { forms: IRetrieveFormsByDappKey[][] }) => {
  // const stakingForms = retrieveFormsByDappKey({
  //   dappKey: 'staking',
  // });

  let finalFormMappings: Record<
    string,
    { key: string; value: string }[]
  >[] = [];
  const formDapp = Object.assign({}, ...forms[0]);
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
  console.log('SANG TEST: 000', { formDapp });

  finalFormMappings = extractedValue(
    formDappInModule,
    formDapp,
    finalFormMappings,
  );
  console.log('SANG TEST: 111', { finalFormMappings });

  finalFormMappings = extractedValue(
    formDappInSingle,
    formDapp,
    finalFormMappings,
  );

  console.log('SANG TEST: 222', { finalFormMappings });
};

export default onSubmitStaking;
