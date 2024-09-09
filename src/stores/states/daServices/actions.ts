import { DAServiceAPI } from '@/services/api/clients';
import { IToken } from '@/services/api/dapp/token_generation/interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PREFIX } from './constants';

const fetchIssueTokenListByChainID = createAsyncThunk(
  `${PREFIX}/fetchIssueTokenList`,
  async (networkID: string | number, { getState }) => {
    let tokenIssueList: IToken[] = [];
    try {
      tokenIssueList = await DAServiceAPI.get(
        `/tokens/list?network_id=${networkID}`,
      );
    } catch (error) {
      // console.log('[getListIssueTokenByNetworkID] ERROR: ', error);
      tokenIssueList = [];
    } finally {
      // console.log(
      //   '[fetchIssueTokenListByChainID] FINALLY - tokenIssueList : ',
      //   tokenIssueList,
      // );
      return tokenIssueList;
    }
  },
);

export { fetchIssueTokenListByChainID };
