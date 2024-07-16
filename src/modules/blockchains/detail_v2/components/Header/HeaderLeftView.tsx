'use client';

import { OrderItem, OrderStatus } from '@/stores/states/l2services/types';
import { Flex, SimpleGrid, Text, Image } from '@chakra-ui/react';
import useOrderMapper from '../../../hooks/useOrderMapper';
import HeaderRow from '@/modules/blockchains/components/Body/L2Instance/HeaderRow';
import { useL2ServiceTracking } from '@/hooks/useL2ServiceTracking';
import LivingStatus from '@/modules/blockchains/components/Body/L2Instance/LivingStatus';

type Props = {
  orderItem: OrderItem;
};

const HeaderLeftView = (props: Props) => {
  const { orderItem: item } = props;

  const mapper = useOrderMapper(item);
  const { tracking } = useL2ServiceTracking();

  const isWaittingOrSettingUp =
    item.status === OrderStatus.WaitingPayment ||
    item.status === OrderStatus.Processing;

  return (
    <Flex flexDir={'row'} align={'center'} justifyItems={'center'} gap={'30px'}>
      {item.logoURL ? (
        <Image
          src={`${item.logoURL}`}
          w={['60px', '80px', '120px']}
          borderRadius={'4px'}
          h={'auto'}
          objectFit={'contain'}
        />
      ) : (
        <Image
          src={'/blockchains/customize/ic-infa.svg'}
          w={['60px', '80px', '120px']}
          h={'auto'}
          objectFit={'contain'}
        />
      )}

      <Flex
        flexDir={'column'}
        align={'flex-start'}
        justifyItems={'center'}
        gap={'10px'}
      >
        <Flex flexDir={'row'} align={'center'} gap={'10px'}>
          <Text
            fontSize={['20px', '22px', '25px']}
            fontWeight={500}
            color={'#000'}
          >
            {`${item.chainName || '--'}`}
          </Text>

          {item.status === OrderStatus.Started && (
            <Image
              src={`/icons/pencil_edit_grey.svg`}
              fit={'contain'}
              maxW={'24px'}
              maxH={'24px'}
              _hover={{
                cursor: 'pointer',
                opacity: 0.8,
              }}
              onClick={(event: any) => {
                if (event.stopPropagation) event.stopPropagation();
                alert(1);
                // editOnClick && editOnClick();
              }}
            />
          )}
        </Flex>

        <Flex flexDir={'row'} align={'center'} gap={'10px'}>
          <LivingStatus color={mapper.color || 'transparent'} />
          <Text
            fontSize={['16px', '18px', '20px']}
            fontWeight={500}
            color={mapper.color || 'transparent'}
          >
            {mapper.status || ''}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HeaderLeftView;
