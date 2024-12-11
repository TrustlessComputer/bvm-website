import CWalletTypeAPI from '@/services/api/dapp/wallet_type';
import { FormDappUtil } from '@/modules/agent-studio/dapp/utils';
import { extractedValue } from '@/modules/agent-studio/dapp/hooks/utils';

const onSubmitWalletType = () => {
  const cWalletTypeAPI = new CWalletTypeAPI();

  const onSubmit = async (params: { forms: any[] }) => {
    try {
      const form = params.forms?.reverse()?.[0];
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
      const formFinal = finalFormMappings.find((item) => !!item);
      await cWalletTypeAPI.updateWalletType({
        wallet_type: formFinal?.wallet_type as any,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    onSubmit,
  };
};

export default onSubmitWalletType;
