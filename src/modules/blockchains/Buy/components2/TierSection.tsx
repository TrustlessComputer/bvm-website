import { Flex, Text } from '@chakra-ui/react';
import Section from '../components/Section';
import s from '../styles.module.scss';
import { useRouter } from 'next/navigation';
import { memo, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { useSearchParams } from 'next/navigation';
import { PRICING_PACKGE } from '@/modules/PricingV2/constants';

const TierSection = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package') || PRICING_PACKGE.Growth;

  const { availableListFetching, availableList } = useAppSelector(
    getL2ServicesStateSelector,
  );
  const isFecthingData = useMemo(() => {
    return availableListFetching || !availableList;
  }, [availableListFetching, availableList]);

  const tierData = useMemo(() => {
    const packageData = availableList?.package['2'];
    const result = packageData?.filter((item, index) => {
      if (item.value === Number(packageParam)) {
        return true;
      }
      return false;
    });
    return result ? result[0] : undefined;
  }, [isFecthingData, availableList, packageParam]);

  if (isFecthingData) return null;

  return (
    <>
      <Section title="Plan"></Section>
      <Flex
        mt={'-4px'}
        flexDir={'row'}
        align={'center'}
        justify={'space-between'}
        px="13px"
        py="11px"
        borderRadius={'12px'}
        gap="12px"
        bgColor={'#F4F4F4'}
        className={s.fontSFProDisplay}
      >
        <Flex flexDir={'row'} align={'center'} gap="12px">
          <Text fontSize={'18px'} fontWeight={600} lineHeight={'28px'}>
            {`${tierData?.valueStr || '--'}`}
          </Text>
          <Text fontSize={'18px'} fontWeight={400} lineHeight={'28px'}>
            {`${tierData?.price || '--'} (${
              tierData?.priceNote || '--'
            }) per rollup/month`}
          </Text>
        </Flex>
        <Flex
          fontSize={'18px'}
          fontWeight={400}
          color={'#2A2EE1'}
          _hover={{
            cursor: 'pointer',
            opacity: 0.8,
          }}
          onClick={() => {
            router.push('/pricing');
          }}
        >
          Switch plan
        </Flex>
      </Flex>
    </>
  );
};

export default memo(TierSection);