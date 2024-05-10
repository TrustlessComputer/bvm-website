import React, { useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';
import styles from './styles.module.scss';
import cx from 'classnames';
import px2rem from '@/utils/px2rem';
import IconPlusToMinus from '@/components/faq/iconPlusToMinus';

const Item = ({ data }: { data: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <Accordion allowToggle onChange={(i) => setOpen(i === 0)}>
      <AccordionItem border="none" w={['100%', '100%']}>
        <AccordionButton px={0} pt={[3, 6]} pb={open ? 4 : 6}>
          <Flex
            w="100%"
            alignItems="center"
            justifyContent={'space-between'}
            gap={2}
          >
            <Text
              fontSize={[px2rem(14), px2rem(20)]}
              fontWeight="medium"
              textAlign={'left'}
              className={cx('faq-question')}
            >
              {data?.q}
            </Text>
            <IconPlusToMinus open={open} size={'16px'} color="#000000" />
          </Flex>
        </AccordionButton>
        <AccordionPanel px={0} pb={6} style={{ paddingTop: '0' }}>
          <Box
            className={cx(styles.answer, 'faq-answer')}
            color="text.secondary"
            fontSize="sm"
            dangerouslySetInnerHTML={{ __html: data?.a }}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

const Section = ({ title, data }: { title?: any; data: any }) => {
  const [viewAll, setViewAll] = useState(false);

  const renderData =
    viewAll || data?.length < 5
      ? data
      : [data[0], data[1], data[2], data[3], data[4]];

  return (
    <Flex direction="column" w={'100%'}>
      {title && (
        <Text
          fontSize={['md', 'lg']}
          fontWeight="medium"
          textAlign={'left'}
          mb={4}
        >
          {title}
        </Text>
      )}
      <Flex gap={2} direction="column" py={[4, 6]} px={[4, 12]}>
        {renderData.map((e: any, i: number) => (
          <Item key={i} data={e} />
        ))}
      </Flex>
      {data?.length > 5 && (
        <Button
          color={'#FFFFFF'}
          mt={4}
          mb={4}
          fontSize="md"
          fontWeight="medium"
          // variant={"outline"} borderRadius={"8px"} h={"56px"}
          // border={"1px solid #1b77fd"}
          backgroundImage={'none'}
          _hover={{}}
          _focusVisible={{
            boxShadow: 'none',
          }}
          onClick={() => setViewAll(!viewAll)}
        >
          {viewAll ? 'View Less' : 'View All'}
        </Button>
      )}
    </Flex>
  );
};

const FAQs = ({ data }: { data: any; desc?: any }) => {
  return (
    <Flex direction="column" alignItems="center" className="faqs-wrapper">
      {/*<Heading><Flex alignItems={"center"} gap={4}>FAQs</Flex></Heading>*/}
      {/*<Text my={desc ? 8 : 5} maxW='800px' textAlign={['left', 'center']} color='#FFFFFF'>{desc}</Text>*/}
      {data?.length > 0 ? <Section data={data} /> : <></>}
    </Flex>
  );
};

export default FAQs;
