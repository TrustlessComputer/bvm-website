import React from 'react';
import s from './style.module.scss'
import { Button, Flex, Image, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import Fade from '@/interactive/Fade';
import Chars from '@/interactive/Chars';
import Scale from '@/interactive/Scale';
import useWindowSize from '@/hooks/useWindowSize';
type TGetBVMSectionProps = {
  label: string;
  title: string;
  rowReverse: boolean;
  list: boolean;
}

const GetBVMSection = ({...props}:TGetBVMSectionProps): React.JSX.Element => {
  const {isDesktop} =useWindowSize()
  console.log(isDesktop)
  return <div className={`${s.wrapper}`}>
    <div className={'container'}>
      <Flex className={`${s.wrapperSection}`} flex={1} flexDirection={props.rowReverse ? 'row-reverse' : 'row'} alignItems={props.rowReverse ? 'start' : 'center'}>
        <div className={`${s.wrapperImage}`}>
          <Scale>
            <Image src="/landing/slide2.png" />
          </Scale>
        </div>
        <div className={`${s.wrapperContent}`}>
          <Fade>
            <Text fontSize={['20px']} color={'#000'} textTransform={'uppercase'}>
              {props.label}
            </Text>
          </Fade>
          <Chars>
            <Text fontSize={['40px']} color={'#000'} marginTop={'8px'} marginBottom={'24px'}>
              {props.title}
            </Text>
          </Chars>
          {
            props.list ? (
              <Text fontSize={['20px']} color={'#000'}>
                <UnorderedList listStylePosition={isDesktop ? 'outside' : 'inside'}>
                  <ListItem>Pipe real-time alerts into channels automatically</ListItem>
                  <ListItem>Run parallel investigations to find answers quickly</ListItem>
                  <ListItem>Create one source of truth for fast, easy analysis</ListItem>
                </UnorderedList>
              </Text>
            ) : (
              <Text fontSize={['20px']} color={'#000'}>
                Ship better code in less time by bringing your tools, teammates and code changes together in Slack.
              </Text>
            )
          }
          <Fade className={s.btn}>
            <Button
              bgColor={'#EF601B'}
              color={'#fff'}
              borderRadius={0}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              px={'40px'}
              py={'14px'}
              w={['172px']}
              h={'48px'}
              fontWeight={400}
              marginTop={'24px'}
              fontSize={'16px'}
              onClick={() => {
                scrollTo();
                // router.push('/blockchains/customize');
              }}
              _hover={{
                opacity: 0.8,
              }}
            >
              Get BVM
            </Button>
          </Fade>
        </div>
      </Flex>
    </div>
  </div>
}

export default GetBVMSection;
