import axios from 'axios';

class CMemPoolAPI {
  getPendingBlocks = async () => {
    const res = (await axios.get('https://mempool.space/api/v1/fees/mempool-blocks')).data;
    console.log('feesMempoolBlocks', res);
    return res;
  };

  getConfirmedBlocks = async (blockNumber?: number) => {
    const res = (await axios.get(`https://mempool.space/api/v1/blocks/${blockNumber || ''}`)).data;
    console.log('feesMempoolBlocks', res);
    return res;
  };
}

export default CMemPoolAPI;
