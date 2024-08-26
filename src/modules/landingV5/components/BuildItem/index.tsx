import { Box, Flex, Image } from '@chakra-ui/react';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { motion, useInView } from 'framer-motion';
import s from './styles.module.scss';

interface IProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  iconUrl?: string;
  lastItem?: boolean;
}

const BuildItem = ({
  children,
  stagger = 0,
  iconUrl,
  lastItem = false,
}: IProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isInView === true) {
      setShow(true);
    }
  }, [isInView]);

  return (
    <Flex className={s.buildItem} ref={ref}>
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        // opacity={isInView ? 0.5 : 1}
        gap="14px"
      >
        <Box
          as={motion.div}
          className={s.buildItem_icon}
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { delay: stagger },
          }}
          viewport={{
            once: true,
          }}
          minW={{ base: '20px', md: '48px' }}
        >
          <Image src={iconUrl || '/landing-v5/ic-step-1.svg'} alt="build" />
        </Box>

        <Box className={s.buildItem_line}>
          <Box
            as={motion.div}
            w="100%"
            bg={
              !lastItem
                ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 65%, #FFF 100%)'
                : 'none'
            }
            initial={{ height: 0 }}
            whileInView={{
              height: '100%',
              transition: { delay: stagger + 0.5, duration: 0.5 },
            }}
            viewport={{
              once: true,
            }}
          ></Box>
        </Box>
      </Flex>
      <Box
        w="100%"
        as={motion.div}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: { delay: stagger, duration: 0.5 },
        }}
        viewport={{
          once: true,
        }}
        // transition={{ delay: 1.5, duration: 1 }}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default BuildItem;
