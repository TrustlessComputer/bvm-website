import s from './styles.module.scss';
import { Center, Divider, Flex, Text } from '@chakra-ui/react';
import cx from 'clsx';

const DAYS = [
  {key: 0, title: '$100', desc: 'day 1 Day Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al.Ut enim ad minima veniam, quis nostrum exercitationem ullam.'},
  {key: 1, title: '$500', desc: 'day 2 Day Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al.Ut enim ad minima veniam, quis nostrum exercitationem ullam.'},
  {key: 2, title: '$1,000', desc: 'day 3 Day Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al.Ut enim ad minima veniam, quis nostrum exercitationem ullam.'},
  {key: 3, title: '$10,000', desc: 'day 4 Day Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al.Ut enim ad minima veniam, quis nostrum exercitationem ullam.'},
  {key: 4, title: '$15,000', desc: 'day 5 Day Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al.Ut enim ad minima veniam, quis nostrum exercitationem ullam.'},
]

const AddMoreContribution = () => {
  return (
    <Flex className={s.container}>
      <Flex p={'20px'} alignItems={"center"} w={"100%"} justifyContent={"space-between"}>
        <Text fontSize={'18px'} fontWeight={400} color={'#FFFFFF'}>
          Add more contributors
        </Text>
        <Flex gap={2} justifyContent={"space-between"}>
          {
            DAYS.map(d => {
              return (
                <Flex flex={1} justifyContent={'center'} alignItems={"center"}
                      className={cx(s.item)}>
                  {d?.title}
                </Flex>
              )
            })
          }
        </Flex>
      </Flex>
      <Divider orientation={'vertical'}/>
      <Flex p={'20px'} alignItems={'center'}>
        <a href={"https://bvm.network/"} target={"_blank"}>
          <Flex className={s.learnMoreWrapper} gap={3}>
            <Text whiteSpace={"nowrap"}>Share on</Text>
            <Center w={"28px"} height={"28px"} bgColor={"#000000"}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_29786_7178)">
                  <path d="M12.6007 0.769531H15.054L9.694 6.8962L16 15.2315H11.0627L7.196 10.1755L2.77067 15.2315H0.316L6.04933 8.6782L0 0.770198H5.06267L8.558 5.39153L12.6007 0.769531ZM11.74 13.7635H13.0993L4.324 2.16086H2.86533L11.74 13.7635Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_29786_7178">
                    <rect width="16" height="16" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </Center>
          </Flex>
        </a>
      </Flex>
    </Flex>
  )
};

export default AddMoreContribution;
