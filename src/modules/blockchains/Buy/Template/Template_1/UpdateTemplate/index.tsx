import { Box, Flex, Text } from '@chakra-ui/react';
import styles from './styles.module.scss';
import { IHeaderMenu, ITemplate } from '@/services/api/dapp/types';
import React from 'react';
import DropFile from '@/modules/blockchains/components/UpdateOrderModal/DropFile';
import CTokenGenerationAPI from '@/services/api/dapp/token_generation';
import SvgInset from '@components/SvgInset';
import { isA } from '@jest/expect-utils';

interface IProps {
  template: ITemplate | undefined;
  onUpdateState: (_: ITemplate) => void;
  dappURL?: string;
}

enum UpdateKey {
  logo = 'logo',
  first = 'first',
  last = 'last',
  desc = 'desc',
  headings = 'headings',
  backgroundImage = 'backgroundImage',
  appName = 'appName',
  headerMenu = 'headerMenu'
}

interface ITask {
  text: string;
  type: 'upload-image' | 'input' | 'textarea' | 'add-delete-header'
  value?: string | any | any[];
  key: UpdateKey;
}

const EmptyHeaderMenu: IHeaderMenu = {
  slug: '',
  title: '',
  isNewWindow: false
}

const MAXIMUM_FILE_UPLOAD = 10; //10 MB

const UpdateTemplate = ({ template, onUpdateState, dappURL }: IProps) => {
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
        text: "Header menu",
        type: 'add-delete-header',
        value: template?.headerMenu,
        key: UpdateKey.headerMenu
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

  const onAddDeleteHeaderMenu = (isAdd: boolean, deleteIndex: number) => {
    if (isAdd) {
      onUpdateState({
        ...template,
        headerMenu: [
          ...(template?.headerMenu || []),
          EmptyHeaderMenu
        ]
      } as any);
    } else {
      const _headerMenu = template?.headerMenu || [];
      _headerMenu.splice(deleteIndex, 1);
      onUpdateState({
        ...template,
        headerMenu: _headerMenu
      } as any);
    }
  }

  const onChangeHeaderMenuInput = (key: string, value: string, index: number) => {
    let _headerMenu = template?.headerMenu || [];
    console.log('SANG TEST:', _headerMenu[index], index);
    if (_headerMenu?.length <= index) return;
    _headerMenu = _headerMenu.map((item, itemIndex) => {
      if (itemIndex === index) {
        return {
          ...item,
          [key]: value,
          isNewWindow: true,
        }
      }
      return {
        ...item,
        isNewWindow: true
      }
    })
    console.log('SANG TEST:', _headerMenu);
    onUpdateState({
      ...template,
      headerMenu: _headerMenu
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
      case 'add-delete-header': {
        valueBox = (
          <Box>
            <Flex gap="10px" mb="4px">
              <p className={styles.title}>
                {item.text}
              </p>
              <Box cursor="pointer" onClick={() => {
                onAddDeleteHeaderMenu(true, 0);
              }}>
                <SvgInset svgUrl='/icons/studio-module/ic-add.svg' />
              </Box>
            </Flex>
            {item.value.map((header: IHeaderMenu, index: number) => {
              return (
                <Flex gap='12px' key={`header-menu-${index}`}>
                  <input
                    className={styles.input} value={item.value.title}
                    placeholder={'Name'}
                    onChange={(e) => {
                      onChangeHeaderMenuInput('title', e.target.value, index);
                    }}
                  />
                  <input
                    className={styles.input} value={item.value.slug}
                    placeholder={'https://'}
                    onChange={(e) => {
                      onChangeHeaderMenuInput('slug', e.target.value, index);
                    }}
                  />
                  {item.value.length > 1 && (
                    <button
                      className={styles.delete}
                      onClick={() => {
                        onAddDeleteHeaderMenu(false, index);
                      }}
                    >
                      <SvgInset svgUrl='/icons/studio-module/ic-delete.svg' />
                    </button>
                  )}
                </Flex>
              )
            })}
          </Box>
        );
        break;
      }
    }
    return (
      <Box key={item.key}>
        {item.key !== UpdateKey.headerMenu && (
          <p className={styles.title}>
            {item.text}
          </p>
        )}
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
        <Box>
          <p className={styles.title}>
            Dapp link
          </p>
          <a href={dappURL} target="_blank" rel="noreferrer">
            <Text color="blue.500" fontSize="14px">
              {dappURL}
            </Text>
          </a>
        </Box>
        {ListTask.map(renderItem)}
      </Flex>
  );
};

export default UpdateTemplate;
