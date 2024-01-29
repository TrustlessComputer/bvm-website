import {
  FocusLock,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import DepositLoginMode from './deposit.login.mode';

interface IDepositClaimItHere extends PropsWithChildren {}

const DepositClaimItHere: React.FC<IDepositClaimItHere> = ({ children }) => {
  const firstFieldRef = React.useRef(null);
  const {
    onClose: onClose2,
    onOpen: onOpen2,
    isOpen: isOpen2,
  } = useDisclosure();
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
          <DepositLoginMode onClose={onClose2} />
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
};

export default DepositClaimItHere;
