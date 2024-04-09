import axios from 'axios';

export const priceBVM = async () => {
  const data = await axios.get('https://api.nakachain.xyz/api/coin-prices');
  return data?.data?.result;
};
