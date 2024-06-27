import BaseModal from '@/components/BaseModal';
import { Button, Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { OrderItem } from '@/stores/states/l2services/types';

type DataItem = {
  key: string;
  title: string;
  timeStr: string;
};

const DATA_LIST: DataItem[] = [
  {
    key: 'step-1',
    title: 'Create server and install dependencies',
    timeStr: '5m',
  },
  {
    key: 'step-2',
    title: 'Set up environment variables and configurations',
    timeStr: '5s',
  },
  {
    key: 'step-3',
    title: 'Deploy contracts on Supersonic',
    timeStr: '30m',
  },
  {
    key: 'step-4',
    title: 'Build from source code',
    timeStr: '5m',
  },
  {
    key: 'step-5',
    title: 'Run blockchain',
    timeStr: '2m',
  },
  {
    key: 'step-6',
    title: 'Build and run block explorer',
    timeStr: '5m',
  },
  {
    key: 'step-7',
    title: 'Configure bridges',
    timeStr: '2m',
  },
];

interface IProps {
  show: boolean;
  onClose?: (() => void) | any;
  onSuccess?: () => void;
}

const RowInfor = (data: { item: DataItem }) => {
  const { timeStr, title } = data.item;
  return (
    <Flex flexDir={'row'} align={'center'} justify={'space-between'}>
      <Text
        fontSize={['14px', '15px', '16px']}
        fontWeight={500}
        color={'#000'}
        textAlign={'left'}
      >
        {`${title || '--'}`}
      </Text>
      <Text
        fontSize={['14px', '15px', '16px']}
        fontWeight={600}
        color={'#000'}
        textAlign={'right'}
        opacity={0.7}
      >
        {`${timeStr || '--'}`}
      </Text>
    </Flex>
  );
};

const WaittingSettingUpModal = (props: IProps) => {
  const { show, onClose, onSuccess } = props;

  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      size="custom"
      icCloseUrl="/icons/ic-close-grey.svg"
    >
      <Flex
        mt={['15px', '18px', '20px']}
        flexDir={'column'}
        bgColor={'#fff'}
        borderRadius={'10px'}
        p={'15px'}
        gap={['15px', '18px', '20px']}
      >
        <Text
          fontSize={['18px', '20px', '24px']}
          fontWeight={600}
          color={'#000'}
          alignSelf={'flex-start'}
        >
          {`Waiting for setting up`}
        </Text>
        {DATA_LIST.map((item) => (
          <RowInfor key={item.key} item={item} />
        ))}

        {/* Line Break */}
        <Flex width={'100%'} height={'1px'} bgColor={'#ECECEC'}></Flex>

        {/* Footer */}
        <Flex flexDir={'row'} align={'center'} justify={'space-between'}>
          <Text
            fontSize={['16px', '18px', '20px']}
            fontWeight={600}
            color={'#000'}
            textAlign={'left'}
          >
            {`Total`}
          </Text>
          <Text
            fontSize={['16px', '18px', '20px']}
            fontWeight={400}
            color={'#000'}
            textAlign={'right'}
            opacity={0.7}
          >
            {`~50m`}
          </Text>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default WaittingSettingUpModal;
