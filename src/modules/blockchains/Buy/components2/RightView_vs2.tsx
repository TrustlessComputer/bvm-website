import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useBuy } from '../../providers/Buy.hook';
import { RollupEnum } from '../Buy.constanst';
import BitcoinValiditySection from './BitcoinValiditySection';
import BlockGasLimitSection from './BlockGasLimitSection';
import BlockTimeSection from './BlockTimeSection';
import ComputerDescriptionSection from './ComputerDescriptionSection';
import ContactInformationSection from './ContactInformationSection';
import DataAvailabilitySection from './DataAvailabilitySection';
import MinGasPriceSection from './MinGasPriceSection';
import NetworkSection from './NetworkSection';
import PreInstalledDappsSection from './PreInstalledDappsSection';
import RollupProtocolSection from './RollupProtocolSection';
import TokenPayingGasSection from './TokenPayingGasSection';
// import WithdrawalPeriodSection from './WithdrawalPeriodSection';
import WithdrawalPeriodSection from './WithdrawalPeriodSection_v2';
import ConfigurationOptionsSection from './ConfigurationOptionsSection';
import ComputerNameSection from './ComputerNameSection';
import ProverSection from './ProverSection';

export type Props = {};

const RightView = React.memo((props: Props) => {
  const { rollupProtocolSelected, isStandardMode } = useBuy();

  return (
    <Flex
      width={'50%'}
      direction={'column'}
      overflowY="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
      }}
    >
      <Text fontSize={'36px'} color={'black'} fontWeight={600}>
        Customize your ZK Powered Blockchain
      </Text>
      <Text fontSize={'20px'} color={'#323232'} fontWeight={400} my={'13px'}>
        ZK Powered Blockchains are secure, low-cost, and lightning-fast — fully
        loaded with DEX, DAO, NFT marketplace, and the whole shebang!
      </Text>
      <Flex flexDir={'column'} gap={'20px'}>
        {/* Computer Name */}
        <ComputerNameSection />

        {/* Computer Description  */}
        {/* <ComputerDescriptionSection /> */}

        {/* Project Information  */}
        {/* <ProjectInformationSection /> */}

        {/* Contact information  */}
        {/* <ContactInformationSection /> */}

        {/* Network */}
        {/* <NetworkSection /> */}

        {/* Configuration Options */}
        {/* <ConfigurationOptionsSection /> */}

        {/* Rollup Protocol */}
        {/* {!isStandardMode && <RollupProtocolSection />} */}

        {/* Bitcoin Validity */}
        {/* {!isStandardMode && <BitcoinValiditySection />} */}

        {/* DataAvaibility Chain */}
        {<DataAvailabilitySection />}

        {/* Block Time */}
        {/* {!isStandardMode && <BlockTimeSection />} */}

        {/* Min Gas Price */}
        {/* {!isStandardMode && <MinGasPriceSection />} */}

        {/* Gas Limit */}
        {<BlockGasLimitSection />}

        {/* Gas Limit */}
        {<ProverSection />}

        {/* Withdrawal Period (SLIDER)*/}
        <WithdrawalPeriodSection />

        {/* Token for paying Transaction Gas */}
        {/* {!isStandardMode && <TokenPayingGasSection />} */}

        {/* Plugin */}
        {/* {!isStandardMode && <PreInstalledDappsSection />} */}
      </Flex>
    </Flex>
  );
});

export default RightView;
