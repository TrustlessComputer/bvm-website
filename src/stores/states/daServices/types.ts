import { IToken } from '@/services/api/dapp/token_generation/interface';

export interface IDAService {
  abc?: any;

  isIssueTokenListFetched: boolean;
  isIssueTokenListFetching: boolean;
  issueTokenList: IToken[];
}
