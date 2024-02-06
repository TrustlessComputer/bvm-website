'use client';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { MobileNav } from './MobileNav';

export type HeaderProps = {
  isOpen: boolean;
  onToggle: any;
};

const DrawerMobileMenu = (props: HeaderProps) => {
  return (
    <Drawer
      isOpen={props.isOpen}
      placement="right"
      onClose={props.onToggle}
      size={'sm'}
    >
      <DrawerOverlay />
      <DrawerContent zIndex={3}>
        <DrawerBody bgColor={'#F3F1E8'}>{<MobileNav primaryColor = 'black'/>}</DrawerBody>
        <DrawerFooter
          bgColor={'#F3F1E8'}
          justifyContent={'center'}
          alignItems={'center'}
          padding={'40px'}
        >
          <Image
            src={'/icons/close_ic.svg'}
            borderRadius={100}
            width={50}
            height={50}
            alignSelf={'center'}
            onClick={props.onToggle}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMobileMenu;
