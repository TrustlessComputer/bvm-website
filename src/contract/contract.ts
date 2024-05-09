/* eslint-disable react-hooks/rules-of-hooks */
import ERC20ABI from '@/contract/abis/ERC20.json';
import { ContractParams, ERC20Chain } from '@/contract/interfaces';
import getRPCByChain, { getDataPrepareTx } from '@/contract/utils/RPC';
import { ERC20 } from './interfaces/ERC20';
import { ethers } from 'ethers';
import { STBvm as SToken } from '@/contract/interfaces/STBvm';
import STAKE_TOKEN from '@/contract/stakeV2/configs';
import StakeTokenJson from './abis/STBvm.json';
import { BvmGovernor } from './proposal/abis/BvmGovernor';
import { BvmTreasury } from './proposal/abis/BvmTreasury';
import { BVM_GOVERNOR_ADDRESS, BVM_TREASURY_ADDRESS } from './proposal/configs';
import BvmGovernorABI from './proposal/abis/BvmGovernor.json';
import BvmTreasuryABI from './proposal/abis/BvmTreasury.json';

class CContract {
  private erc20: ERC20 | undefined = undefined;
  private stakeToken: SToken | undefined = undefined;
  private bvmGovernor: BvmGovernor | undefined = undefined;
  private bvmTreasury: BvmTreasury | undefined = undefined;

  public jsonRpcProvider: ethers.providers.JsonRpcProvider | undefined =
    undefined;

  public getProviderByChain = (chain?: ERC20Chain) => {
    if (!this.jsonRpcProvider) {
      const rpc = getRPCByChain(chain);
      this.jsonRpcProvider = new ethers.providers.JsonRpcProvider(
        rpc,
      ) as ethers.providers.JsonRpcProvider;
    }
    return this.jsonRpcProvider;
  };

  public getERC20Contract = (params: ContractParams) => {
    const { chain, contractAddress } = params;
    this.erc20 = new ethers.Contract(
      contractAddress,
      ERC20ABI,
      this.getProviderByChain(chain),
    ) as ERC20;
    return this.erc20;
  };

  public getStakeTokenContract = () => {
    if (this.stakeToken) return this.stakeToken;
    const contract = new ethers.Contract(
      STAKE_TOKEN.BVM.stBVM,
      StakeTokenJson,
      this.getProviderByChain(),
    ) as SToken;

    this.stakeToken = contract;
    return contract;
  };

  public getBvmGovernorContract = () => {
    if (this.bvmGovernor === undefined) {
      this.bvmGovernor = new ethers.Contract(
        BVM_GOVERNOR_ADDRESS,
        BvmGovernorABI,
        this.getProviderByChain(),
      ) as BvmGovernor;
    }

    return this.bvmGovernor;
  };

  public getBvmTreasuryContract = () => {
    if (this.bvmTreasury === undefined) {
      this.bvmTreasury = new ethers.Contract(
        BVM_TREASURY_ADDRESS,
        BvmTreasuryABI,
        this.getProviderByChain(),
      ) as BvmTreasury;
    }

    return this.bvmTreasury;
  };
}

export default CContract;
