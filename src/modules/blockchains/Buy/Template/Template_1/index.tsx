import React from "react";
import styles from "./styles.module.scss";
// import Header from "@/layout/Header";
import ContentTemplate_1 from '@/modules/blockchains/Buy/Template/Template_1/Content';
import { Flex } from '@chakra-ui/react';
import UpdateTemplate from '@/modules/blockchains/Buy/Template/Template_1/UpdateTemplate';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import AppLoading from '@components/AppLoading';
import HeaderTemplate_1 from '@/modules/blockchains/Buy/Template/Template_1/HeaderTemplate_1';
import { PAGE_NEED_OWNER } from '@/modules/blockchains/Buy/Template/constants';

const Template_1 = React.memo(() => {

  const configsSelector = useAppSelector(dappSelector)?.dappConfigs;
  const [template, setTemplate] = React.useState(configsSelector?.template);
  const apps = configsSelector?.apps?.split(",")?.filter(item => !PAGE_NEED_OWNER.includes(item)) || [];

  if (!configsSelector?.template.template_1) {
    return <AppLoading />
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
        onUpdateState={(data: any)=> {
          setTemplate({...data});
        }}
      />
    </div>
  );
})

export default Template_1;
