import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useBuy } from '../../providers/Buy.hook';
import { RollupEnum } from '../Buy.constanst';
import BitcoinValiditySection from '../components2/BitcoinValiditySection';
import BlockGasLimitSection from '../components2/BlockGasLimitSection';
import BlockTimeSection from '../components2/BlockTimeSection';
import ComputerDescriptionSection from '../components2/ComputerDescriptionSection';
import ContactInformationSection from '../components2/ContactInformationSection';
import DataAvailabilitySection from '../components2/DataAvailabilitySection';
import MinGasPriceSection from '../components2/MinGasPriceSection';
import NetworkSection from '../components2/NetworkSection';
import PreInstalledDappsSection from '../components2/PreInstalledDappsSection';
import RollupProtocolSection from '../components2/RollupProtocolSection';
import TokenPayingGasSection from '../components2/TokenPayingGasSection';
import WithdrawalPeriodSection from '../components2/WithdrawalPeriodSection';
import ConfigurationOptionsSection from './ConfigurationOptionsSection';

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
        Customize your Bitcoin L2
      </Text>
      <Text fontSize={'20px'} color={'#323232'} fontWeight={400} my={'13px'}>
        Bitcoin L2s are secure, low-cost, and lightning-fast L2 blockchains —
        fully loaded with DEX, DAO, NFT marketplace, and the whole shebang!
      </Text>
      <Flex flexDir={'column'} gap={'20px'}>
        {/* Computer Name */}
        {/* <ComputerNameSection /> */}

        {/* Computer Description  */}
        <ComputerDescriptionSection />

        {/* Project Information  */}
        {/* <ProjectInformationSection /> */}

        {/* Contact information  */}
        <ContactInformationSection />

        {/* Network */}
        <NetworkSection />

        {/* Configuration Options */}
        <ConfigurationOptionsSection />

        {/* Rollup Protocol */}
        {!isStandardMode && <RollupProtocolSection />}

        {/* Bitcoin Validity */}
        {!isStandardMode && <BitcoinValiditySection />}

        {/* DataAvaibility Chain */}
        {!isStandardMode && <DataAvailabilitySection />}

        {/* Block Time */}
        {!isStandardMode && <BlockTimeSection />}

        {/* Min Gas Price */}
        {!isStandardMode && <MinGasPriceSection />}

        {/* Gas Limit */}
        {!isStandardMode && <BlockGasLimitSection />}

        {/* Withdrawal Period (SLIDER)*/}
        {!isStandardMode &&
          rollupProtocolSelected === RollupEnum.Rollup_OpStack && (
            <WithdrawalPeriodSection />
          )}

        {/* Token for paying Transaction Gas */}
        {!isStandardMode && <TokenPayingGasSection />}

        {/* Plugin */}
        {!isStandardMode && <PreInstalledDappsSection />}
      </Flex>
    </Flex>
  );
});

export default RightView;
