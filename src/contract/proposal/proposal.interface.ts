export enum ProposalType {
  project,
  marketing
}
export interface ICreateProposalParams {
  proposalType: ProposalType;
  receipient?: string;
  amount?: string;
  description: string;
}

export interface IVoteProposalParams {
  proposalId: string;
  value: string;
}

export interface ICancelProposalPrams {
  targets: string;
  values: string;
  calldatas: string;
  description: string;
}
