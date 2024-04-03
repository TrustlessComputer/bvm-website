import CContractBase from '@/contract/base';
import {
  ClaimUnStakeParams,
  CreateStakeParams, CreateUnStakeParams,
  StakeUser,
  StakeV2Role,
  TeamRewardRatio,
} from '@/contract/stakeV2/types';
import { parseEther } from '@ethersproject/units';
import { BigNumber, ethers } from 'ethers';
import BigNumberJS from 'bignumber.js';
import { formatAmountToClient } from '@/utils/format';
import STAKE_TOKEN from '@/contract/stakeV2/configs';
import { useAppSelector } from '@/stores/hooks';
import { nakaAddressSelector } from '@/stores/states/user/selector';
import { availForRestakeSelector } from '@/stores/states/stakingV2/selector';

class CStakeV2 extends CContractBase {
  public stakingUserAddress = useAppSelector(nakaAddressSelector)
  private availForRestake = useAppSelector(availForRestakeSelector);

  private getUserAddress = () => {
    const address = this.stakingUserAddress;
    if (!address) {
      throw new Error('Invalid address.');
    }
    return address;
  };

  getStakeContract = () => {
    return this.getStakeTokenContract().connect(this.getUserAddress());
  };

  getTeamRewardRatios = async (code?: string): Promise<TeamRewardRatio> => {
    if (!code) {
      return {
        captainRewardRatio: '0',
        memberRewardRatio: '0',
      };
    }
    const contract = this.getStakeContract();
    const teamRewardRatios = await contract.getTeamRewardRatios(code);
    return {
      captainRewardRatio: teamRewardRatios.captainRewardRatio.toString(),
      memberRewardRatio: teamRewardRatios.memberRewardRatio.toString(),
    };
  };

  getStakingInfo = async (): Promise<StakeUser | undefined> => {
    const contract = this.getStakeContract();
    const address = this.getUserAddress();
    const data = await contract.getUserData(address);
    if (data && data.length) {
      const userTeamCodeByte32 = data?.userTeamCode?.toString() as string;
      const userTeamCode = ethers.utils.parseBytes32String(userTeamCodeByte32);
      const teamRole = Number(data?.teamRole?.toString() as string);
      const principleBalance = data?.principleBalance?.toString() as string;
      const rewardAmount = data?.rewardAmount?.toString() as string;
      const multiplierPoint = data?.multiplierPoint?.toString() as string;
      const [teamRewardRatio, teamPrincipleBalance] = (await Promise.all([
        this.getTeamRewardRatios(userTeamCodeByte32),
        contract.getTeamPrincipleBalance(userTeamCodeByte32),
      ])) as [TeamRewardRatio, BigNumber];

      const isEmpty = teamRole === StakeV2Role.empty;
      const isCaptain = teamRole === StakeV2Role.captain;

      const rewardRatio = isEmpty
        ? '0'
        : formatAmountToClient(
            (isCaptain
              ? teamRewardRatio?.captainRewardRatio
              : teamRewardRatio?.memberRewardRatio) || '0',
          );

      const percent = new BigNumberJS(multiplierPoint)
        .div(principleBalance)
        .times(25)
        .plus(new BigNumberJS(25))
        .plus(new BigNumberJS(rewardRatio).times(100));

      return {
        userTeamCode: userTeamCode,
        teamRole: teamRole,
        principleBalance: principleBalance.toString(),
        rewardAmount: rewardAmount.toString(),
        multiplierPoint: multiplierPoint.toString(),
        teamRewardRatio,
        teamPrincipleBalance: teamPrincipleBalance.toString(),
        isStaked: new BigNumberJS(principleBalance).gt(0),
        isHaveTeam: !!userTeamCode,
        stakingPercent: new BigNumberJS(percent.toFixed(3)).toString(),
      };
    }
  };

  getTeamCaptain = async (params: { code: string }): Promise<string> => {
    try {
      const contract = this.getStakeContract();
      const captain = await contract.getTeamCaptain(params.code);
      return captain.toString();
    } catch (e) {
      return '';
    }
  };

  getStakingPercent = async () => {
    const contractSTBVM = await this.getStakeContract();
    const contractBVMForClaim = await this.getERC20Contract({
      contractAddress: STAKE_TOKEN.BVM.bvm,
    });

    const amountBVMForClaim = (
      await contractBVMForClaim.balanceOf(STAKE_TOKEN.BVM.claimAddress)
    ).toString();

    const maxSupplySTBVM = new BigNumberJS(15)
      .times(1e6)
      .times(1e18)
      .toString();

    const amountBVMForStaking = (await contractSTBVM.totalSupply()).toString();

    const maxSupply = new BigNumberJS(maxSupplySTBVM).minus(amountBVMForClaim);

    const percent = new BigNumberJS(amountBVMForStaking)
      .div(maxSupply)
      .times(100)
      .toFixed(2);

    return {
      percent,
      maxSupply: maxSupply.div(1e18).toString(),
      amountBVMForStaking: new BigNumberJS(amountBVMForStaking)
        .div(1e18)
        .toString(),
    };
  };

  createClaimUnstakeCallData = (params: ClaimUnStakeParams) => {
    const stakeContract = this.getStakeTokenContract();
    return stakeContract.interface.encodeFunctionData('claim', [
      params.unstakeID,
    ]);
  };

  createUnstakeCallData = (params: CreateUnStakeParams) => {
    const stakeContract = this.getStakeTokenContract();
    return stakeContract.interface.encodeFunctionData('unstake', [
      parseEther(params.amount.toString()),
    ]);
  };

  createClaimRewardCallData = () => {
    const address = this.getUserAddress();
    const stakeContract = this.getStakeTokenContract();
    return stakeContract.interface.encodeFunctionData('reward', [
      address,
    ]);
  };

  createStakeCallData = (params: CreateStakeParams) => {
    const stakeContract = this.getStakeTokenContract();
    return stakeContract.interface.encodeFunctionData('stake', [
      parseEther(params.amount.toString()),
      params.role.toString(),
      params.code || '',
    ]);
  };

  createRestake = () => {
    const unstakeIDs = this.availForRestake.map((item) => item.unstake_id);
    const stakeContract = this.getStakeTokenContract();

    const data = unstakeIDs.map((unstakeID) => {
      return stakeContract.interface.encodeFunctionData('restake', [`${unstakeID}`]);
    });
    console.log('reStakeForAll unstakeIDs: ', unstakeIDs);
    return stakeContract.interface.encodeFunctionData('multicall', [data]);
  }
}

export default CStakeV2;
