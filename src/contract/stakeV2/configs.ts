import { isProduction } from '@/utils/commons';

const BVM_ADDRESS = isProduction()
  ? {
      stBVM: '0xf16309609629470473126444bB33D63E85e8DbBD',
      bvm: '0x215cABba65a71E3753381842eb743705834493aD',
      addressSendBVMForFaucet: '0xF792F60eF56F1588FEdA9A64ec595745e80EF098',
      claimAddress: '0x248A5a121190C85d39b355e90cc351134a21d392',
    }
  : {
      stBVM: '0xB4A36D0e01649A77fF212FEAE2d3bF26c4E0E040',
      bvm: '0x39E999A4b117a822699B7524b87F8C5d87776966',
      addressSendBVMForFaucet: '0x3CF37eDbce1c873d95ba7D6dA8a91A84EE4f1eD0',
      claimAddress: '0x248A5a121190C85d39b355e90cc351134a21d392',
    };

export const MAX_LENGTH_CODE = 5;

const STAKE_TOKEN = {
  BVM: BVM_ADDRESS
}

export default STAKE_TOKEN;
