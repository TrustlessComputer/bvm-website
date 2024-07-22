import CContractBase from '@/contract/base';
import { ContractFactory, Wallet } from 'zksync-ethers';
import TOKENABI from './abis/Token.json';
import { IBodyCreateToken } from './interface';

class CTokenContract extends CContractBase {
  public createToken = async (body: IBodyCreateToken) => {
    try {
      const {
        name,
        symbol,
        beneficiaries,
        beneficiaryNames,
        starts,
        durations,
        durationUnits,
        amountTotals,
        unvestAmounts,
      } = body;

      const _wallet = await this.getWallet();

      let tx;

      const factory = new ContractFactory(
        TOKENABI.abi,
        TOKENABI.bytecode,
        Wallet.createRandom()
      );

      const rawTx = factory.getDeployTransaction(
        name,
        symbol,
        beneficiaries,
        beneficiaryNames,
        starts,
        durations,
        durationUnits,
        amountTotals,
        unvestAmounts
      );

      // if (_wallet.privateKey) {
      //   tx = await _wallet.sendTransaction(rawTx);
      // } else {
      //   tx = this.requestSign({
      //     calldata: "0x",
      //     chainType: this.configs.network_id as string,
      //     target: "popup",
      //     rawTx: rawTx,
      //     functionType: `Create ${symbol} token`,
      //   });
      // }

      return {hash: ''};

      return tx;
    } catch (error) {
      throw error;
    }
  };
}

export default CTokenContract;
