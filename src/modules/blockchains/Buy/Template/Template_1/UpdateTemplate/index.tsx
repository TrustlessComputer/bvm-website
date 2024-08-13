import { Box, Flex, Text } from '@chakra-ui/react';
import styles from './styles.module.scss';
import { ITemplate } from '@/services/api/dapp/types';
import React from 'react';
import DropFile from '@/modules/blockchains/components/UpdateOrderModal/DropFile';
import CTokenGenerationAPI from '@/services/api/dapp/token_generation';

interface IProps {
  template: ITemplate | undefined;
  onUpdateState: (_: ITemplate) => void;
}

enum UpdateKey {
  logo = 'logo',
  first = 'first',
  last = 'last',
  desc = 'desc',
  headings = 'headings',
  backgroundImage = 'backgroundImage',
  appName = 'appName'
}

interface ITask {
  text: string;
  type: 'upload-image' | 'input' | 'textarea'
  value?: string | any;
  key: UpdateKey;
}

const MAXIMUM_FILE_UPLOAD = 10; //10 MB

const UpdateTemplate = ({ template, onUpdateState }: IProps) => {
  const api = new CTokenGenerationAPI();

  const ListTask: ITask[] = React.useMemo(() => {
    return [
      {
        text: 'Logo',
        type: 'upload-image',
        value: template?.logo,
        key: UpdateKey.logo
      },
      {
        text: 'App name',
        type: 'input',
        value: template?.appName,
        key: UpdateKey.appName
      },
      {
        text: 'Heading 1',
        type: 'input',
        value: template?.template_1?.contentText.first,
        key: UpdateKey.first
      },
      {
        text: 'Heading 2',
        type: 'textarea',
        value: template?.template_1?.contentText.headings?.join(','),
        key: UpdateKey.headings
      },
      {
        text: 'Heading 3',
        type: 'input',
        value: template?.template_1?.contentText.last,
        key: UpdateKey.last
      },
      {
        text: 'Description',
        type: 'textarea',
        value: template?.template_1?.contentText.desc,
        key: UpdateKey.desc
      },
      {
        text: 'Background Image',
        type: 'upload-image',
        value: template?.backgroundImage,
        key: UpdateKey.backgroundImage
      },
    ]
  }, [template]);

  const onConvertImage = async (key: UpdateKey, file: File | undefined) => {
    if (!file) return;
    const url = await api.uploadImage(file);
    onUpdateState({
      ...template,
      [key]: url
    } as any);
  }

  const renderItem = (item: ITask) => {

    let valueBox = null;

    switch (item.type) {
      case 'upload-image':
        valueBox = (
          <Box>
            <DropFile
              labelText="Upload Image"
              onChange={(file) => onConvertImage(item.key, file)}
              className={styles.uploadImage}
              acceptedFileType={['png', 'svg', 'jpg', 'jpeg']}
              maxSize={MAXIMUM_FILE_UPLOAD}
            />
          </Box>
        );
        break;
      case 'input': {
        valueBox = (
          <input
            className={styles.input} value={item.value}
            onChange={(e) => onChangeText(item.key, e.target.value)}
          />
        );
        break;
      }
      case 'textarea': {
        valueBox = (
          <textarea
            className={styles.input}
            value={item.value}
            onChange={(e) => onChangeText(item.key, e.target.value)}
            style={{ height: '150px' }}
          />
        );
        break;
      }
    }
    return (
      <Box key={item.key}>
        <p className={styles.title}>
          {item.text}
        </p>
        {valueBox}
      </Box>
    );
  }

  const onChangeText = (key: string, value: string) => {
    console.log(key, value);

    let _template = template as any;

    switch (key) {
      case UpdateKey.appName: {
        _template = {
          ...template,
          appName: value
        }
        break;
      }
      case UpdateKey.headings: {
        const headings = value.split(',');
        _template = {
          ...template,
          template_1: {
            ...template?.template_1,
            contentText: {
              ...template?.template_1?.contentText,
              headings,
              headingsColors: headings.map(() => {
                // return random color for each heading
                return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
              })
            }
          }
        }
        break;
      }
      default:
        _template = {
          ...template,
          template_1: {
            ...template?.template_1,
            contentText: {
              ...template?.template_1?.contentText,
              [key]: value
            }
          }
        }
        break;
    }

    onUpdateState(_template);
  }

  return (
      <Flex
        flexDirection='column'
        gap="12px"
        border="1px solid #E0E0E0"
        backgroundColor="white"
        borderRadius="12px"
        padding="24px"
      >
        {ListTask.map(renderItem)}
      </Flex>
  );
};

export default UpdateTemplate;
