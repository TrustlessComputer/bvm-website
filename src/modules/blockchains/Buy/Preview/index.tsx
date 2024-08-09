import s from './styles.module.scss';
import {
  Flex,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import RowItem from './RowItem';
import useOrderFormStoreV3 from '../stores/index_v3';
import { formatCurrencyV2 } from '@/utils/format';
import { useMemo } from 'react';

const blockChainItem = {
  title: 'Blockchain',
  status: 'Ready',
};

interface IProps {
  show: boolean;
  onClose?: (() => void) | any;
  onLaunchCallback?: () => void;
  data?: any;
}

const PreviewLaunchModal = (props: IProps) => {
  const { show, onClose, data, onLaunchCallback } = props;
  const { priceBVM, priceUSD, needContactUs } = useOrderFormStoreV3();

  const dataList = useMemo(() => {
    let resultList = [blockChainItem];

    //dApp List
    let itemListNotIsChain = data?.filter((item: any) => !item.isChain) || [];

    //Map data
    itemListNotIsChain.map((item: any) => {
      let dataItem: any;

      item?.options.map((option: any) => {
        const dAPPKey = option.key;

        if (dAPPKey === 'account_abstraction') {
          dataItem = {
            title: option.title || '',
            status: 'Ready',
          };
        } else if (dAPPKey === 'create_token') {
          dataItem = {
            title: option.title || '',
            status: 'Ready',
          };
        } else if (dAPPKey === 'staking') {
          dataItem = {
            title: option.title || '',
            status: 'Drafting',
          };
        } else if (dAPPKey === 'airdrop') {
          dataItem = {
            title: option.title || '',
            status: 'Drafting',
          };
        }

        // TO DO
        // else if (keyDApp === 'xyz') {
        //   dataItem = {
        //     title: item?.options[0]?.title || '',
        //     status: 'Drafting',
        //   };
        // }

        if (dataItem) {
          resultList.push(dataItem);
        }
      });
    });

    return resultList;
  }, [data]);

  return (
    <Modal isOpen={show} isCentered={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className={s.modalContent}>
        <Flex flexDir={'row'} align={'center'} justify={'center'}>
          <Text fontSize={'14px'} fontWeight={700} color={'#555'}>
            Preview
          </Text>
          <Image
            position={'absolute'}
            right="20px"
            src="/icons/ic-close-grey.svg"
            w={'25px'}
            h={'25px'}
            objectFit={'cover'}
            onClick={onClose}
            _hover={{
              cursor: 'pointer',
              opacity: 0.8,
            }}
          />
        </Flex>

        <Flex
          mt="50px"
          flexDir={'column'}
          color={'#000'}
          gap={'15px'}
          flex={1}
          justify={'space-between'}
        >
          <Flex flexDir={'column'} gap={'16px'}>
            {dataList.map((item) => {
              return <RowItem title={item.title} status={item.status} />;
            })}
          </Flex>

          {/* Footer */}
          <Flex
            flexDir={'row'}
            alignItems={'center'}
            borderTopWidth={'1px'}
            borderTopColor={'#EEEEEE'}
          >
            <Flex
              mt={'15px'}
              flex={1}
              alignItems={'center'}
              justify={'space-between'}
            >
              <Flex flexDir={'column'} alignItems={'flex-start'}>
                <Text fontSize={'12px'} fontWeight={700} color={'#777'}>
                  PRICE
                </Text>
                <Text fontSize={'18px'} fontWeight={600}>
                  {`$${formatCurrencyV2({
                    amount: priceUSD,
                    decimals: 0,
                  })}/month (${formatCurrencyV2({
                    amount: priceBVM,
                    decimals: 0,
                  })} BVM)`}
                </Text>
              </Flex>

              <Flex
                flexDir={'row'}
                alignItems={'center'}
                h={'48px'}
                px="15px"
                py={'25px'}
                bgColor={'#FA4E0E'}
                borderRadius={'16px'}
                gap={'10px'}
                onClick={onLaunchCallback}
                _hover={{
                  cursor: 'pointer',
                  opacity: 0.8,
                }}
              >
                <Text fontSize={'20px'} fontWeight={500} color={'#fff'}>
                  Launch
                </Text>
                <Image
                  src="/launch.png"
                  w={'26px'}
                  h={'26px'}
                  objectFit={'cover'}
                ></Image>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default PreviewLaunchModal;
