/* eslint-disable no-useless-catch */
import { formatAmountToClient } from '@/utils/format';
import { ethers } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import CContractBase from '../base';
import {
  BVM_TOKEN_ADDRESS,
  BVM_TREASURY_ADDRESS,
  SHARD_TOKEN_ADDRESS,
} from './configs';
import {
  ICancelProposalPrams,
  ICreateProposalParams,
  IVoteProposalParams,
  ProposalType,
} from './proposal.interface';

class CProposal extends CContractBase {
  public createProposalCallData = (params: ICreateProposalParams): string => {
    const { receipient, amount, description, proposalType } = params;

    const bvmGovernor = this.getBvmGovernorContract();
    const bvmTreasury = this.getBvmTreasuryContract();
    const bvmToken = this.getERC20Contract({
      contractAddress: BVM_TOKEN_ADDRESS,
    });

    if (proposalType === ProposalType.project) {
      return bvmGovernor.interface.encodeFunctionData('propose', [
        [bvmTreasury.address],
        [parseEther('0')],
        [
          bvmTreasury.interface.encodeFunctionData('targetCall', [
            bvmToken.address,
            bvmToken.interface.encodeFunctionData('transfer', [
              bvmTreasury.address,
              parseEther('0'),
            ]),
          ]),
        ],
        description,
      ]);
    } else {
      return bvmGovernor.interface.encodeFunctionData('propose', [
        [bvmTreasury.address],
        [parseEther('0')],
        [
          bvmTreasury.interface.encodeFunctionData('targetCall', [
            bvmToken.address,
            bvmToken.interface.encodeFunctionData('transfer', [
              receipient || '',
              parseEther(amount || '0'),
            ]),
          ]),
        ],
        description,
      ]);
    }
  };

  public voteProposalCalldata = (params: IVoteProposalParams): string => {
    const { proposalId, value } = params;
    const bvmGovernor = this.getBvmGovernorContract();
    return bvmGovernor.interface.encodeFunctionData('castVote', [
      proposalId,
      value,
    ]);
  };

  public creatorCancelProposalCalldata = (
    params: ICreateProposalParams,
  ): string => {
    const { description, amount, receipient, proposalType } = params;
    const bvmTreasury = this.getBvmTreasuryContract();
    const bvmGovernor = this.getBvmGovernorContract();
    const bvmToken = this.getERC20Contract({
      contractAddress: BVM_TOKEN_ADDRESS,
    });
    const descriptionHash = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(description),
    );

    if (proposalType === ProposalType.project) {
      return bvmGovernor.interface.encodeFunctionData('proposerCancel', [
        [bvmTreasury.address],
        [parseEther('0')],
        [
          bvmTreasury.interface.encodeFunctionData('targetCall', [
            bvmToken.address,
            bvmToken.interface.encodeFunctionData('transfer', [
              bvmTreasury.address,
              parseEther('0'),
            ]),
          ]),
        ],
        descriptionHash,
      ]);
    } else {
      return bvmGovernor.interface.encodeFunctionData('proposerCancel', [
        [bvmTreasury.address],
        [parseEther('0')],
        [
          bvmTreasury.interface.encodeFunctionData('targetCall', [
            bvmToken.address,
            bvmToken.interface.encodeFunctionData('transfer', [
              receipient || '',
              parseEther(amount || '0'),
            ]),
          ]),
        ],
        descriptionHash,
      ]);
    }
  };

  public isAdmin = async (address: string) => {
    try {
      const bvmGovernor = this.getBvmGovernorContract();
      return await bvmGovernor.isAdmin(address);
    } catch (e) {
      return false;
    }
  };

  public adminCancelProposalCalldata = (
    params: ICancelProposalPrams,
  ): string => {
    const { description } = params;

    const descriptionHash = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(description),
    );
    const targets = JSON.parse(params.targets);
    const values = JSON.parse(params.values);
    const calldatas = JSON.parse(params.calldatas);
    const bvmGovernor = this.getBvmGovernorContract();

    return bvmGovernor.interface.encodeFunctionData('adminCancel', [
      targets,
      values,
      calldatas,
      descriptionHash,
    ]);
  };

  public getCreateProposalData = async (data: string) => {
    const bvmTreasury = this.getBvmTreasuryContract();
    const bvmToken = this.getERC20Contract({
      contractAddress: BVM_TOKEN_ADDRESS,
    });

    try {
      const result = bvmTreasury.interface.decodeFunctionData(
        'targetCall',
        data,
      );
      if (result && result.length > 1) {
        return bvmToken.interface.decodeFunctionData('transfer', result[1]);
      }
      return [];
    } catch (e) {
      throw e;
    }
  };

  public getShardBalance = async (address: string) => {
    try {
      const balance = await this.getERC20Contract({
        contractAddress: SHARD_TOKEN_ADDRESS,
      }).balanceOf(address);
      return formatAmountToClient(balance.toString());
    } catch (e) {
      return '0';
    }
  };

  public getTreasuryBalance = async () => {
    try {
      const balance = await this.getERC20Contract({
        contractAddress: BVM_TOKEN_ADDRESS,
      }).balanceOf(BVM_TREASURY_ADDRESS);
      return formatAmountToClient(balance.toString());
    } catch (e) {
      return '0';
    }
  };

  public getMinimunShardToSubmitProposal = async () => {
    try {
      const bvmGovernor = this.getBvmGovernorContract();
      const result = await bvmGovernor.proposalThreshold();
      return formatAmountToClient(result.toString());
    } catch (e) {
      return '1000';
    }
  };
}

export default CProposal;
