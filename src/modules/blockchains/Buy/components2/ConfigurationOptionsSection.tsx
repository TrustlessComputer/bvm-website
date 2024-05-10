import { Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { useBuy } from '../../providers/Buy.hook';
import Section from '../components/Section';
import {
  ConfigurationOptionEnumMap,
  ConfigurationOptionEnum,
} from '../Buy.constanst';
import { useMemo } from 'react';

const ConfigurationOptionsSection = () => {
  const { configuratinOptionSelected, setConfiguratinOptionSelected } =
    useBuy();

  const description = useMemo(() => {
    return configuratinOptionSelected === ConfigurationOptionEnum.Standard
      ? 'This configuration ensures optimal performance for most typical use cases without the need for additional customization.'
      : 'Manually select the modules you want to include in your setup that the standard configuration does not address.';
  }, [configuratinOptionSelected]);

  return (
    <Section
      title={'Configuration Options'}
      description={''}
      descriptionDetail={undefined}
    >
      <RadioGroup
        defaultValue={ConfigurationOptionEnumMap[configuratinOptionSelected]}
        onChange={(e: string) => {
          if (
            e === ConfigurationOptionEnumMap[ConfigurationOptionEnum.Standard]
          ) {
            console.log('PHAT SET Standard');
            setConfiguratinOptionSelected(ConfigurationOptionEnum.Standard);
          } else {
            console.log('PHAT SET Advanced');
            setConfiguratinOptionSelected(ConfigurationOptionEnum.Advanced);
          }
        }}
        value={ConfigurationOptionEnumMap[configuratinOptionSelected]}
        mb={'20px'}
      >
        <Stack direction="row" spacing={'50px'}>
          <Radio
            key={`${ConfigurationOptionEnum.Standard}`}
            value={ConfigurationOptionEnumMap[ConfigurationOptionEnum.Standard]}
            borderColor={'#4851fa'}
          >
            <Text fontSize={'20px'} color={'#000'}>
              {ConfigurationOptionEnumMap[ConfigurationOptionEnum.Standard]}
            </Text>
          </Radio>

          <Radio
            key={`${ConfigurationOptionEnum.Advanced}`}
            value={ConfigurationOptionEnumMap[ConfigurationOptionEnum.Advanced]}
            borderColor={'#4851fa'}
            borderWidth={'1px'}
          >
            <Text fontSize={'20px'} color={'#000'}>
              {ConfigurationOptionEnumMap[ConfigurationOptionEnum.Advanced]}
            </Text>
          </Radio>
        </Stack>
        <Text mt={'10px'} fontSize={'18px'} color={'#000'}>
          {description}
        </Text>
      </RadioGroup>
    </Section>
  );
};

export default ConfigurationOptionsSection;
