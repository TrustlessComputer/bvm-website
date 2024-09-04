import axios from 'axios';

class CMemPoolAPI {
  getPendingBlocks = async () => {
    const res = (await axios.get('https://mempool.space/api/v1/fees/mempool-blocks')).data;
    return res;
  };

  getConfirmedBlocks = async (blockNumber?: string) => {
    const res = (await axios.get(`https://mempool.space/api/v1/blocks/${blockNumber || ''}`)).data;
    return res;
  };
}

export default CMemPoolAPI;
