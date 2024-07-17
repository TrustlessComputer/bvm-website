export interface IClaimRewardParams {
  account: string;
  token: string;
  balance: number;
  signature: string;
  claim_address: string;
}

export interface IReferralSignature {
  account: string;
  token: string;
  balance: number;
  signature: string;
}

export interface IClaimReferralRewardParams {
  signatures: IReferralSignature[];
  claim_address: string;
}
