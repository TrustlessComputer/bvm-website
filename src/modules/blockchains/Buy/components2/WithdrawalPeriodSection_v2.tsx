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
      descriptionDetail={{
        title: 'Withdrawal Time',
        content: (
          <p>
            The withdrawal period is the time frame during which your users can
            withdraw their assets from your blockchain back to Supersonic. This
            duration primarily depends on the time required for the prover to
            submit a zk-proof to the verifier contracts deployed on Supersonic.
            By default, the withdrawal period is set to 2 hours if you have a
            prover for your blockchain, and 15 minutes if you do not.
          </p>
        ),
      }}
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
