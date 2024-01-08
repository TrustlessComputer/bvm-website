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
};

const DrawerMobileMenu = (props: HeaderProps) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onToggle} size={'sm'}>
      <DrawerOverlay />
      <DrawerContent zIndex={3}>
        <DrawerBody bgColor={'#F3F1E8'}>{<MobileNav />}</DrawerBody>
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
            onClick={onToggle}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMobileMenu;
