import shareStyles from '../styles.module.scss';
import { Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import useBirthEternal from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/hooks/useBirthEternal';

const BirthEternal = () => {
  const { onJoinClick, isHasTw, showClaimButton, onClaim, claimming, isDone } =
    useBirthEternal();
  return (
    <div className={shareStyles.container}>
      <Flex alignItems="center" justifyContent="space-between">
        <p className={shareStyles.container_title}>Birth an Eternal</p>
        <Text className={shareStyles.container_bonus}>+1 EAI</Text>
      </Flex>
      <p className={shareStyles.container_content}>
        Choose an AI task, select a dataset, and train your own Eternal AI model
        — it’s that easy.
      </p>
      <Flex
        gap="24px"
        flex={1}
        position="relative"
        mt="12px"
        alignItems="center"
        width="100%"
      >
        <Button
          isDisabled={!isHasTw}
          className={shareStyles.button}
          onClick={onJoinClick}
          width="100%"
        >
          {isHasTw
            ? 'Build your own AI'
            : 'Complete the previous task to proceed'}
        </Button>
        {showClaimButton && (
          <Button
            isLoading={claimming}
            width="100%"
            isDisabled={Boolean(isDone || claimming)}
            onClick={onClaim}
            className={`${shareStyles.button} ${shareStyles.button_gradient}`}
          >
            {isDone ? 'Done' : 'Claim $EAI'}
          </Button>
        )}
      </Flex>
    </div>
  );
};

export default BirthEternal;
