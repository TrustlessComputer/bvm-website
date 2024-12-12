import {
  Flex,
  Tooltip,
  Text,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Select,
} from '@chakra-ui/react';
import InforIcon from '../../../component_v5/icons/InforIcon';
import { useMissionStore } from './useMissionStore';
import { ChevronDownIcon } from '@chakra-ui/icons';

type Props = {};

export const SocialView = (props: Props) => {
  const { socialList, setSocialSelected, socialSelected } = useMissionStore();

  return (
    <Flex
      display={'flex'}
      h="max-content"
      w="max-content"
      bgColor={'#C44127'}
      p="5px"
      color={'white'}
      flexDir={'row'}
      align={'center'}
      gap={'5px'}
    >
      <Text fontSize={'16px'} fontWeight={500}>
        {'Social'}
      </Text>
      <Tooltip
        label="Social information ....."
        fontSize="12px"
        color={'#000'}
        bgColor={'#fff'}
      >
        <Flex>
          <InforIcon />
        </Flex>
      </Tooltip>

      <Select
        gap={'10px'}
        bg="#fff"
        borderRadius={'16px'}
        color="#000000"
        textColor={'#000'}
        h="30px"
      >
        {socialList.map((social: any) => {
          return (
            <option color="#000" value={social}>
              {social}
            </option>
          );
        })}
      </Select>

      {/* <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Actions
        </MenuButton>
        <MenuList
          zIndex={9999}
          sx={{
            zIndex: '99999 !important',
          }}
        >
          {socialList.map((social: any) => {
            return (
              <MenuItem
                zIndex={9999}
                sx={{
                  zIndex: '99999 !important',
                }}
              >
                {social}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu> */}
    </Flex>
  );
};
