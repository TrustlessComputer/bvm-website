import {
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import { useBuy } from '../../providers/Buy.hook';
import Section from '../components/Section';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {
  PRICING_PACKGE,
  PRICING_PACKGE_DATA,
} from '@/modules/PricingV2/constants';
import { MAX_GAS_LIMIT, MIN_GAS_LIMIT, STEP_GAS_LIMIT } from '../Buy.constanst';
import { formatCurrencyV2 } from '@/utils/format';

const BlockGasLimitSection = () => {
  const { blockGasLimitSelected, setBlockGasLimitSelected } = useBuy();
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package');

  const packageData = useMemo(() => {
    let result;
    if (!packageParam) {
      result = PRICING_PACKGE_DATA[PRICING_PACKGE.Hacker];
    } else {
      result = PRICING_PACKGE_DATA[Number(packageParam) as PRICING_PACKGE];
    }

    setBlockGasLimitSelected(result.maxGasLimit);

    return result;
  }, [packageParam]);

  const onChange = (value: number) => {
    if (isNaN(value)) {
      return;
    }
    setBlockGasLimitSelected(value);
  };

  return (
    <Section
      title={'Block gas limit'}
      description={'Which block gas limit is right for you?'}
      descriptionDetail={undefined}
    >
      <Flex flexDir={'column'} px={'0px'} overflow={'visible'}>
        <Slider
          onChange={onChange}
          defaultValue={blockGasLimitSelected}
          value={blockGasLimitSelected}
          min={packageData.minGasLimit || MIN_GAS_LIMIT}
          max={packageData.maxGasLimit || MAX_GAS_LIMIT}
          step={packageData.stepGasLimit || STEP_GAS_LIMIT}
        >
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
        {`${formatCurrencyV2({
          amount: blockGasLimitSelected || 0,
          decimals: 0,
        })}`}
      </Text>
    </Section>
  );
};

export default BlockGasLimitSection;
