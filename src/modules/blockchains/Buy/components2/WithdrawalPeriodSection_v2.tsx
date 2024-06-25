import {
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import { useBuy } from '../../providers/Buy.hook';
import { dayDescribe } from '../Buy.helpers';
import Section from '../components/Section';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {
  PRICING_PACKGE,
  PRICING_PACKGE_DATA,
} from '@/modules/PricingV2/constants';

const WithdrawalPeriodSection = () => {
  const { withdrawalPeriodSelected, setWithdrawalPeriodSelected } = useBuy();
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package') || PRICING_PACKGE.Hacker;

  const packageData = useMemo(() => {
    let result;

    result = PRICING_PACKGE_DATA[Number(packageParam) as PRICING_PACKGE];

    setWithdrawalPeriodSelected(result.minWithdrawalPeriod);

    return result;
  }, [packageParam]);

  const onChange = (value: number) => {
    if (isNaN(value)) {
      return;
    }
    setWithdrawalPeriodSelected(value);
  };

  return (
    <Section
      title={'Withdrawal time'}
      description={'Which withdrawal time is right for you?'}
      // descriptionDetail={{
      //   title: 'Withdrawal Period',
      //   content: (
      //     <p>
      //       If you've selected Optimistic Rollups as your rollup protocol, you
      //       will need to determine a challenge period for your users'
      //       withdrawals. This entails requiring them to wait until the challenge
      //       period has passed before they can withdraw the funds held in escrow
      //       on Bitcoin Virtual Machine Layer 1.
      //       <br />
      //       <br />
      //       <p>
      //         The challenge period must be a value greater than zero, as it
      //         takes time for an individual (referred to as the challenger) to
      //         identify an invalid state root claim and subsequently initiate the
      //         challenge process. Presently, you have the option to select a
      //         period lasting from 2 hour to 24 hours.
      //       </p>
      //     </p>
      //   ),
      // }}
      descriptionDetail={undefined}
    >
      <Flex flexDir={'column'} px={'0px'} overflow={'visible'}>
        <Slider
          isDisabled={
            !!packageParam && Number(packageParam) === PRICING_PACKGE.Hacker
          }
          onChange={onChange}
          defaultValue={withdrawalPeriodSelected}
          value={withdrawalPeriodSelected}
          min={packageData.minWithdrawalPeriod || 2} // 2 hours
          max={packageData.maxWithdrawalPeriod || 24} // 24 hours
          step={1}
        >
          {/* <SliderMark
            value={withdrawalPeriodSelected}
            textAlign="center"
            bg="blue.500"
            py={'3px'}
            px={'5px'}
            color="white"
            mt="-10"
            ml="-7"
          >
            {`${withdrawalPeriodSelected} ${
              withdrawalPeriodSelected === 1 ? 'day' : 'days'
            }`}
          </SliderMark> */}
          <SliderTrack bg="#9e9c9c98">
            <SliderFilledTrack bg={'#5b68f6'} />
          </SliderTrack>
          <SliderThumb
            boxSize={6}
            borderColor={'#5b68f6'}
            borderWidth={'2px'}
          ></SliderThumb>
        </Slider>
      </Flex>

      <Text fontSize="18px" fontWeight={500} align="left" color={'#000'}>
        {`${withdrawalPeriodSelected} hours`}
      </Text>
    </Section>
  );
};

export default WithdrawalPeriodSection;
