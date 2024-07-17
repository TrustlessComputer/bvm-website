import { IClaimReferralRewardParams, IClaimRewardParams } from '@/contract/referrals/interface';
import CTokenContract from '@/contract/token';
import { ethers } from 'ethers';
import RewardClaimABI from './abis/RewardClaim.json';
import { RewardClaim } from './abis/RewardClaim';
import CTradeAPI from '@/services/trade';

class CReferral extends CTokenContract {
  public tradeAPI = new CTradeAPI();

  public getRewardClaimContract = (contractAddress: string) => {
    const contract = new ethers.Contract(
      contractAddress,
      RewardClaimABI,
      this.getProviderByChain()
    ) as RewardClaim;

    return contract;
  };

  public claimTradingReward = async (params: IClaimRewardParams) => {
    try {
      const _wallet = await this.getWallet();

      const claimContract = this.getRewardClaimContract(
        params.claim_address
      ).connect(_wallet?.address || "");

      const calldata = claimContract.interface.encodeFunctionData(
        "claimToken",
        [
          params.token,
          params.account,
          params.balance.toString(),
          params.signature,
        ]
      );

      let tx = undefined;
      if (_wallet?.privateKey) {
        // await this.userFaucetBVM();
        tx = await _wallet.sendTransaction({
          data: calldata,
          to: params.claim_address,
          gasPrice: await this.getGasPrice(),
        });

        await tx.wait();
      } else {
        const connector = this.nakaConnectContext.getConnector();

        tx = await connector.requestSign({
          calldata,
          target: "popup" as any,
          to: params.claim_address,
          functionType: "Claim Trading Reward",
          chainType: "RUNE",
        });
      }

      await this.tradeAPI.scanTrxStaking({ tx_hash: tx.hash });

      return tx;
    } catch (e) {
      throw e;
    }
  };

  public claimReferralTradingReward = async (params: IClaimReferralRewardParams) => {
    try {
      const _wallet = await this.getWallet();

      const claimContract = this.getRewardClaimContract(
        params.claim_address
      ).connect(_wallet?.address || "");

      // const tasks = [];
      //
      // for (const signature of params.signatures) {
      //   const calldata = claimContract.interface.encodeFunctionData(
      //     "claimToken",
      //     [
      //       signature.token,
      //       signature.account,
      //       signature.balance.toString(),
      //       signature.signature,
      //     ]
      //   );
      //
      //   console.log('calldata', calldata);
      //
      //   tasks.push(calldata);
      // }

      const tasks = params.signatures.map((signature) => {
        return claimContract.interface.encodeFunctionData(
          "claimToken",
          [
            signature.token,
            signature.account,
            signature.balance.toString(),
            signature.signature,
          ]
        );
      })


      console.log('tasks', tasks);

      const calldatas = claimContract.interface.encodeFunctionData("multicall" as any, [tasks]);

      let tx = undefined;
      if (_wallet?.privateKey) {
        // await this.userFaucetBVM();
        tx = await _wallet.sendTransaction({
          data: calldatas,
          to: params.claim_address,
          gasPrice: await this.getGasPrice(),
        });

        await tx.wait();
      } else {
        const connector = this.nakaConnectContext.getConnector();

        tx = await connector.requestSign({
          calldata: calldatas,
          target: "popup" as any,
          to: params.claim_address,
          functionType: "Claim Referral Trading Reward",
          chainType: "RUNE",
        });
      }

      await this.tradeAPI.scanTrxStaking({ tx_hash: tx.hash });

      return tx;
    } catch (e) {
      console.log('eeeee', e);
      throw e;
    }
  };
}

export default CReferral;
