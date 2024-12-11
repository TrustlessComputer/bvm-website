import React from 'react';
import styles from './styles.module.scss';
import ContentTemplate_1 from '@/modules/agent-studio/Buy/Template/Template_1/Content';
import UpdateTemplate from '@/modules/agent-studio/Buy/Template/Template_1/UpdateTemplate';
import AppLoading from '@components/AppLoading';
import HeaderTemplate_1 from '@/modules/agent-studio/Buy/Template/Template_1/HeaderTemplate_1';
import { PAGE_NEED_OWNER } from '@/modules/agent-studio/Buy/Template/constants';
import { ITemplate } from '@/services/api/dapp/types';
import { Flex } from '@chakra-ui/react';

interface IProps {
  template: ITemplate | undefined;
  onUpdateState: (_: ITemplate) => void;
  appsStr: string;
  dappURL?: string;
}

const Template_1 = React.memo(
  ({ template, onUpdateState, appsStr, dappURL }: IProps) => {
    const apps =
      appsStr?.split(',')?.filter((item) => !PAGE_NEED_OWNER.includes(item)) ||
      [];

    if (!template?.template_1) {
      return (
        <Flex width="100vw" height="calc(100vh - 250px)">
          <AppLoading />
        </Flex>
      );
    }

    return (
      <div className={styles.container}>
        <div className={styles.template_wrapper}>
          <HeaderTemplate_1 template={template} menus={apps} />
          <ContentTemplate_1
            template={template?.template_1}
            backgroundImage={template?.backgroundImage || ''}
          />
        </div>
        <UpdateTemplate
          template={template}
          onUpdateState={onUpdateState}
          dappURL={dappURL || ''}
        />
      </div>
    );
  },
);

export default Template_1;
