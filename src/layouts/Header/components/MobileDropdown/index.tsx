import { useState } from 'react';
import { Link, StackDivider, VStack } from '@chakra-ui/react';
import { NAV_ITEMS, NavItem } from '@/layouts/Header/menuConfig';
import SvgInset from '@/components/SvgInset';
import s from './styles.module.scss';

type PropD = {
  title: string, lists: NavItem[], primaryColor?: string
};

const MobileDropdown = ({ title, lists, primaryColor }: PropD) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={s.container}>
      <Link
        p={2}
        href={'#'}
        fontSize={['16px', '16px']}
        fontWeight={500}
        color={'#000'}
        onClick={() => setIsOpen(!isOpen)}
        className={`${s.label} ${s[primaryColor || 'black']} ${isOpen ? s.isOpen : ''}`}
      >
        {title}
        <SvgInset svgUrl={`icons/ic-submenu.svg`} />
      </Link>
      {
        isOpen && (
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={10}
            alignItems={'flex-start'}
            px={'24px'}
            py={'32px'}
          >
            {lists.map((item) => (
              <Link
                p={2}
                href={item.href ?? '#'}
                fontSize={['16px', '16px']}
                fontWeight={500}
                color={'#000'}
                target={item.isNewWindow ? '_blank' : '_self'}
                _hover={{}}
              >
                {item.label}
              </Link>
            ))}
          </VStack>
        )
      }

    </div>
  )
};

export default MobileDropdown;
