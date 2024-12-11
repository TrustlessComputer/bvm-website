import useTemplate from '@/modules/blockchains/Buy/hooks/useTemplate';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '@/modules/blockchains/Buy/signals/useDragSignal';
import useDappsStore from '@/modules/blockchains/Buy/stores/useDappStore';
import { chainKeyToDappKey } from '@/modules/blockchains/Buy/utils';
import useChatBoxState, { ChatBoxStatus } from '../../chatbox-store';
import styles from './styles.module.scss';

const ButtonApply = () => {
  const { dapps } = useDappsStore();
  const { setTemplate } = useTemplate();
  const { prepareCategoryTemplate, setChatBoxStatus } = useChatBoxState();

  const handleApply = () => {
    const optionBelongToDapp = prepareCategoryTemplate.find((template) => {
      if (template.isChain) return undefined;

      return template.options.find((option) => {
        const dappKey = chainKeyToDappKey(option.key);
        const dapp = dapps.find((dA) => dA.key === dappKey);

        return dapp && !dapp.isDefaultDapp;
      });
    });

    console.log('[ButtonApply] handleApply', {
      optionBelongToDapp,
      prepareCategoryTemplate,
    });

    setChatBoxStatus({
      status: ChatBoxStatus.Close,
      isGenerating: false,
      isComplete: false,
      isListening: false,
    });
    setTemplate(prepareCategoryTemplate);

    if (optionBelongToDapp) {
      const dappIndex = dapps.findIndex(
        (dapp) => dapp.key === optionBelongToDapp.key,
      );
      draggedDappIndexesSignal.value = [
        ...draggedDappIndexesSignal.value,
        dappIndex,
      ];
      draggedIds2DSignal.value = [...draggedIds2DSignal.value, []];
    }
  };

  return (
    <button className={styles.applyButton} onClick={handleApply}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5 0.75C12.3011 0.75 12.1104 0.829018 11.9697 0.96967C11.829 1.11032 11.75 1.30109 11.75 1.5V10C11.75 10.2652 11.6447 10.5196 11.4571 10.7071C11.2696 10.8946 11.0152 11 10.75 11H5.31068L6.78037 9.53034C6.92103 9.38969 7.00005 9.19892 7.00005 9C7.00005 8.80108 6.92103 8.61031 6.78037 8.46966C6.63971 8.329 6.44894 8.24998 6.25003 8.24998C6.05111 8.24998 5.86034 8.329 5.71968 8.46966L2.96968 11.2197C2.90004 11.2893 2.84479 11.372 2.80709 11.463C2.7694 11.554 2.75 11.6515 2.75 11.75C2.75 11.8485 2.7694 11.946 2.80709 12.037C2.84479 12.128 2.90004 12.2107 2.96968 12.2803L5.71968 15.0303C5.86034 15.171 6.05111 15.25 6.25003 15.25C6.44894 15.25 6.63971 15.171 6.78037 15.0303C6.92103 14.8897 7.00005 14.6989 7.00005 14.5C7.00005 14.3011 6.92103 14.1103 6.78037 13.9697L5.31068 12.5H10.75C11.0783 12.5 11.4034 12.4353 11.7067 12.3097C12.0101 12.1841 12.2856 11.9999 12.5178 11.7678C12.7499 11.5356 12.9341 11.26 13.0597 10.9567C13.1854 10.6534 13.25 10.3283 13.25 10V1.5C13.25 1.30109 13.171 1.11032 13.0304 0.96967C12.8897 0.829018 12.6989 0.75 12.5 0.75Z"
          fill="white"
        />
      </svg>
      Apply
    </button>
  );
};

export default ButtonApply;
