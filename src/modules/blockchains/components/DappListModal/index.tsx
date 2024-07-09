import {
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import DappItem from './DappItem';
import s from './styles.module.scss';
import { useAppSelector } from '@/stores/hooks';
import { getDAListSelector } from '@/stores/states/l2services/selector';

interface IProps {
  show: boolean;
  onClose?: (() => void) | any;
  installDappDetailOnClick: (item: any) => void;
}

export const DappListModal = (props: IProps) => {
  const { show, onClose, installDappDetailOnClick } = props;

  const dappsList = useAppSelector(getDAListSelector);

  return (
    <Modal isOpen={show} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent className={s.modalContent} gap={['28px']}>
        <ModalHeader className={s.modalHeader}>
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

            <Text
              w="100%"
              fontSize={['18px', '22px', '28px']}
              fontWeight={500}
              color={'#000'}
              textAlign={'center'}
            >
              Application Store
            </Text>
          </Flex>
        </ModalHeader>
        <Flex bgColor={'#ECECEC'} h="1px" mx="20px"></Flex>
        <ModalBody>
          <SimpleGrid gap={'28px'} mb="28px">
            {dappsList.map((item, index) => {
              return (
                <DappItem
                  key={`${index}-${item.name}`}
                  item={item}
                  onClick={() => {}}
                  instalOnClick={() => {
                    installDappDetailOnClick(item);
                  }}
                ></DappItem>
              );
            })}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
