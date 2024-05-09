import { AccordionButton } from '@chakra-ui/react';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import React from 'react';

const CDN_URL = 'https://cdn.newbitcoincity.com';

interface IFAQHeader {
  isExpanded: boolean;
  text: string;
}

const FAQHeader = ({ isExpanded, text }: IFAQHeader) => {
  return (
    <AccordionButton
      justifyContent={'space-between'}
      width="100%"
      padding="0px"
    >
      <span className={s.faqTitle}>{text}</span>
      <button>
        <SvgInset
          className={isExpanded ? s.downArrow : s.rightArrow}
          svgUrl={`${CDN_URL}/icons/chevron-right-ic-32.svg`}
          size={24}
        />
      </button>
    </AccordionButton>
  );
};

export default FAQHeader;
