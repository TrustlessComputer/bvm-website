import Template_1 from '@/modules/blockchains/Buy/Template/Template_1/index';
import { Flex, Button, Box } from '@chakra-ui/react';
import styles from './styles.module.scss';
import React from 'react';
import ImagePlaceholder from '@components/ImagePlaceholder';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import CDappAPI from '@/services/api/dapp';
import { showError, showSuccess } from '@components/toast';
import NavigationBar from '@/modules/blockchains/detail_v2/components/NavigatioBar';

const TemplatePage = () => {
  const dapp = useAppSelector(dappSelector);
  const configsSelector = dapp?.dappConfigs;
  const chain = dapp?.chain;
  const [template, setTemplate] = React.useState(configsSelector?.template);
  const [loading, setLoading] = React.useState(false);

  const dappAPI = new CDappAPI()
  const onSubmitTemplate = async () => {
    if (!template) return;
    try {
      setLoading(true);
      // Call API to update template
      await dappAPI.updateTemplate(template, dapp?.chain?.chainId || "");
      showSuccess({
        url: dapp?.chain?.dappURL || '',
        linkText: "View dapp",
        message: "Update template successfully!"
      })
    } catch (error) {
      console.log(error);
      showError({
        message: "Update template failed!"
      })
    } finally {
      setLoading(false);
    }
  }

  console.log('sANG TES:', chain?.dappURL || '');

  return (
    <Flex
      className={styles.container}
      flexDir="column"
      alignItems={'flex-start'}
      mt={['20px']}
      gap={['40px']}
      position="relative"
    >
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        <NavigationBar title={`${chain?.chainName || ''}`} url={!!chain?.orderId ? `/chains/${chain?.orderId}` : ''} />
        <Button
          bg="red"
          className={styles.updateButton}
          isDisabled={loading}
          isLoading={loading}
          onClick={onSubmitTemplate}
        >
          <p>
            Update
          </p>
          <Box>
            <ImagePlaceholder
              src={'/launch.png'}
              alt={'launch'}
              width={48}
              height={48}
            />
          </Box>
        </Button>
      </Flex>
      <Template_1
        appsStr={configsSelector?.apps || ''}
        template={template}
        onUpdateState={setTemplate}
        dappURL={chain?.dappURL || ''}
      />
    </Flex>
  );
}

export default TemplatePage;
