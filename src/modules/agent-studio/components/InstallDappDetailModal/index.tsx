import { useAppSelector } from '@/stores/hooks';
import { getDappSelectedSelector } from '@/stores/states/l2services/selector';
import {
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import s from './styles.module.scss';

interface IProps {
  show: boolean;
  onClose?: (() => void) | any;
}

export const InstallDappDetailModal = (props: IProps) => {
  const { show, onClose } = props;

  const dappDetail = useAppSelector(getDappSelectedSelector);

  return (
    <Modal isOpen={show} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent className={s.modalContent}>
        <ModalBody>
          <Flex flexDir={'column'} gap={'28px'} my="28px" mx="0px">
            <Flex align="center" justify={'space-between'}>
              <Flex
                gap="10px"
                align="center"
                position={'absolute'}
                _hover={{
                  cursor: 'pointer',
                  opacity: 0.8,
                }}
                onClick={onClose}
              >
                <Image src={'/icons/back_orange_ic.svg'}></Image>
                <Text
                  color={'#FA4E0E'}
                  fontSize={['14px', '15px', '16px']}
                  fontWeight={400}
                >
                  Back
                </Text>
              </Flex>

              <Flex
                flex={1}
                flexDir={'row'}
                justify={'center'}
                align={'center'}
                gap="12px"
              >
                <Image
                  src={'/icons/add_dapp_default.svg'}
                  w={['35px', '40px', '48px']}
                  h={'auto'}
                  fit={'contain'}
                ></Image>
                <Text
                  fontSize={['18px', '22px', '28px']}
                  fontWeight={500}
                  color={'#000'}
                >
                  {`${dappDetail?.name || '--'}`}
                </Text>
              </Flex>
            </Flex>
            <Flex bgColor={'#ECECEC'} h="1px"></Flex>

            <Flex
              flexDir={'column'}
              align={'flex-start'}
              alignSelf={'stretch'}
              gap={['12px']}
              color={'#000'}
            >
              <Text fontSize={['16px', '18px', '20px']} fontWeight={600}>
                {'Input 1'}
              </Text>
              <Input
                border="1px solid #CECECE"
                placeholder=""
                _placeholder={{
                  color: 'grey',
                }}
                type="text"
                _hover={{}}
                height={'48px'}
                p={'11px'}
                fontSize={['14px', '15px', '16px']}
                // value={yourXAcc}
                onChange={(e: any) => {
                  const text = e.target.value;
                  console.log('TEXT: ', text);
                }}
              />
            </Flex>

            <Flex
              flexDir={'column'}
              align={'flex-start'}
              alignSelf={'stretch'}
              gap={['12px']}
              color={'#000'}
            >
              <Text fontSize={['16px', '18px', '20px']} fontWeight={600}>
                {'Input 2'}
              </Text>
              <Input
                border="1px solid #CECECE"
                placeholder=""
                _placeholder={{
                  color: 'grey',
                }}
                type="number"
                _hover={{}}
                height={'48px'}
                p={'11px'}
                fontSize={['14px', '15px', '16px']}
                // value={yourXAcc}
                onChange={(e: any) => {
                  const text = e.target.value;
                }}
              />
            </Flex>

            <Button
              bgColor={'#FA4E0E'}
              color={'#fff'}
              borderRadius={'100px'}
              h={'auto'}
              minW={['80px', '120px', '160px', '200px']}
              maxH={['35px', '40px', '45px']}
              fontSize={['13px', '14px', '15px']}
              p="20px"
              fontWeight={600}
              alignSelf={'center'}
              onClick={() => {}}
              _hover={{
                cursor: 'pointer',
                opacity: 0.8,
              }}
            >
              Install
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
