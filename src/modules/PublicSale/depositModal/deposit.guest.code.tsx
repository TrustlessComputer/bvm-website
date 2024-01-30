import {
  Flex,
  FocusLock,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { PropsWithChildren, useReducer } from 'react';
import DepositLoginMode from './deposit.login.mode';
import { userSelector } from '@/stores/states/user/selector';
import { useSelector } from 'react-redux';
import s from './styles.module.scss';
import toast from 'react-hot-toast';
import SvgInset from '@/components/SvgInset';
import copy from 'copy-to-clipboard';

interface IDepositGuestCodeHere extends PropsWithChildren {}

const DepositGuestCodeHere: React.FC<IDepositGuestCodeHere> = ({
  children,
}) => {
  const firstFieldRef = React.useRef(null);
  const {
    onClose: onClose2,
    onOpen: onOpen2,
    isOpen: isOpen2,
  } = useDisclosure();

  const guest_code = useSelector(userSelector)?.guest_code;

  return (
    <Popover
      isOpen={isOpen2}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen2}
      onClose={onClose2}
      closeOnBlur={false}
      placement="top-end"
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent px={2} pt={5} pb={2}>
        <FocusLock persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Flex className={s.wrapSecretKey}>
            <Text className={s.titleCopy}>
              Use this code to claim. copy now
            </Text>
            <Flex
              className={s.backupNow}
              onClick={() => {
                toast.success('Secret copied. Backup now');
                if (guest_code) {
                  copy(guest_code);
                }
              }}
            >
              <Flex alignItems={'center'} gap={'8px'}>
                <SvgInset size={16} svgUrl="/icons/ic_wallet.svg" />
                <Text color={'#fff'}>{guest_code}</Text>
              </Flex>
              <SvgInset size={20} svgUrl="/icons/ic-copy.svg" />
            </Flex>
          </Flex>
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
};

export default DepositGuestCodeHere;
