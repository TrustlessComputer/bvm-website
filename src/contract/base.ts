/* eslint-disable no-useless-catch */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prefer-const */
import CContract from './contract';

export enum ETypes {
  staking = 'staking',
}

export const typeToFee = {
  [ETypes.staking]: 50000,
};

class CContractBase extends CContract {

}

export default CContractBase;
