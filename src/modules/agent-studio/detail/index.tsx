'use client';

import BoxContent from '@/layouts/BoxContent';
import { getInstanceDetailByID } from '@/services/api/l2services';
import { OrderItem } from '@/stores/states/l2services/types';
import { Divider, Flex, Link, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useOrderMapper from '../hooks/useOrderMapper';
import s from './styles.module.scss';
import L2Instance from '../components/Body/L2Instance';
import ItemDetailModal from '../components/ItemDetailModal';

const Page = () => {
  const params = useParams();
  const id = params?.id;

  const [showItemDetailModal, setShowItemDetailModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [instanceDetail1, setInstanceDetail1] = useState<OrderItem | undefined>(
    undefined,
  );

  const mapper = useOrderMapper(instanceDetail1);

  const isHasValue = (value: string) => {
    return value && value !== '0';
  };

  const getInstanceDetailByIDHandler = async (id: string) => {
    setLoading(true);
    const data = await getInstanceDetailByID(id);
    setInstanceDetail1(data);
    setLoading(false);
  };

  useEffect(() => {
    getInstanceDetailByIDHandler(id as string);
  }, [id]);

  if (!id || id.length < 1) return <Text>ID NOT FOUND</Text>;

  const isValidData = !!mapper && !!instanceDetail1;

  if (!isValidData) {
    return (
      <Flex
        bgColor={'#f3f1e8'}
        flexDir={'column'}
        align={'center'}
        className={s.container}
      >
        <BoxContent
          minH={'80dvh'}
          py={'60px'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text fontSize={'20px'} color={'#000'}>
            ID NOT FOUND
          </Text>
          ;
        </BoxContent>
      </Flex>
    );
  }

  const instanceDetail = instanceDetail1;

  const renderLoading = () => {
    return <Spinner colorScheme="#000"></Spinner>;
  };

  const renderRowInfor = (
    label = '',
    content = '',
    isLink = false,
    contentColorStr = '#1c1c1c',
  ) => {
    return (
      <Flex flexDir={'row'} align={'center'} justify={'space-between'}>
        <Text fontSize={'18px'} fontWeight={600} color={'#17066c'}>
          {label}
        </Text>
        {isLink ? (
          <Link
            fontSize={'18px'}
            fontWeight={400}
            color={'#1c1c1c'}
            href={`${content}`}
            textDecorationStyle={'solid'}
            textDecorationLine={`${content.length > 0 ? 'underline' : 'none'}`}
            textDecorationColor={'#000'}
            alignSelf={'flex-end'}
            textAlign={'end'}
          >
            {`${content.length > 0 ? content : '--'}`}
          </Link>
        ) : (
          <Text
            fontSize={'18px'}
            fontWeight={400}
            color={`${contentColorStr}`}
            alignSelf={'flex-end'}
            textAlign={'end'}
          >
            {`${content.length > 0 ? content : '--'}`}
          </Text>
        )}
      </Flex>
    );
  };

  return (
    <>
      <Flex
        bgColor={'#f3f1e8'}
        flexDir={'column'}
        align={'center'}
        className={s.container}
      >
        <Flex width={'800px'} py={'60px'}>
          <L2Instance
            item={instanceDetail}
            isOwner={false}
            onClick={() => {
              setShowItemDetailModal(true);
            }}
          />
        </Flex>
      </Flex>
      {showItemDetailModal && (
        <ItemDetailModal
          show={showItemDetailModal}
          item={instanceDetail!}
          onClose={() => {
            setShowItemDetailModal(false);
          }}
          onSuccess={async () => {}}
        />
      )}
    </>
  );
};

export default Page;
