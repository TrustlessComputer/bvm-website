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
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import DepositCheck from './deposit.check';

interface IDepositCheckItHere extends PropsWithChildren {}

const DepositCheckItHere: React.FC<IDepositCheckItHere> = ({ children }) => {
  const firstFieldRef = React.useRef(null);
  const { onClose, onOpen, isOpen } = useDisclosure();
  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen}
      onClose={onClose}
      closeOnBlur={false}
      placement="top-start"
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent px={2} pt={5} pb={2}>
        <FocusLock persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          <GoogleReCaptchaProvider
            reCaptchaKey="6LdrclkpAAAAAD1Xu6EVj_QB3e7SFtMVCKBuHb24"
            scriptProps={{
              async: false,
              defer: false,
              appendTo: 'head',
              nonce: undefined,
            }}
          >
            <DepositCheck onClose={onClose} />
          </GoogleReCaptchaProvider>
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
};

export default DepositCheckItHere;
