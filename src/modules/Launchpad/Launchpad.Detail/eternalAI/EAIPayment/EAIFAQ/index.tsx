import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Text,
} from '@chakra-ui/react';
import s from './styles.module.scss';
import FAQHeader from './header';
import { IFAQData } from './constants';

interface IProps {
  faqs: IFAQData[];
}

const EAIFAQ = ({ faqs }: IProps) => {
  const renderRow = (item: IFAQData) => {
    return (
      <AccordionItem className={s.faqItem} key={`accordion-${item.title}`}>
        {({ isExpanded }) => (
          <>
            <FAQHeader isExpanded={isExpanded} text={item.title} />
            <AccordionPanel className={s.contentPanel}>
              {item.content.map((content: string, index: number) => {
                return (
                  <p
                    className={s.faqContent}
                    key={`accordion-${item.title}-${index}`}
                  >
                    {content}
                  </p>
                );
              })}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    );
  };
  return (
    <div className={s.faqWrapper} id="1" data-section="1">
      <div className={s.faqContainer}>
        <Text className={s.sectionTitle}>FAQ</Text>
        <div className={s.faqList}>
          <Accordion allowMultiple={true}>{faqs.map(renderRow)}</Accordion>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EAIFAQ);
