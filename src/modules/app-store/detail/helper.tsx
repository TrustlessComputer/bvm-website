import { IDApp, IDAppDetails } from '@/services/api/DAServices/types';
import { OrderItem } from '@/stores/states/l2services/types';

export const checkDAInstallHelper = (
  chain?: OrderItem,
  dApp?: IDApp,
  packageSelected?: IDAppDetails,
) => {
  let disabeldInstallDA = false;
  let statusStr = '';
  let statusPackage = '';
  let isInstalled = false;
  let statusColor = '#898989';

  if (!chain || chain?.isNeedTopup) {
    disabeldInstallDA = true;
    statusStr = 'Waiting for payment';
    statusPackage = '';
    isInstalled = false;
    statusColor = '#FA4E0E';
  } else {
    if (!dApp?.user_package || dApp?.user_package.length < 1) {
      disabeldInstallDA = false;
      statusStr = '';
      statusPackage = '';
      isInstalled = false;
    } else {
      const lisDAInstalledWithChain = dApp.user_package;

      const installedWithChainFinded = lisDAInstalledWithChain.find(
        (item) =>
          Number(item.network_id) === Number(chain.chainId) &&
          Number(item.app_store_detail_id) === Number(packageSelected?.id),
      );

      if (installedWithChainFinded) {
        const status = installedWithChainFinded.status;
        console.log('installedWithChainFinded', installedWithChainFinded);

        switch (status) {
          case 'new':
          case 'processing':
            {
              disabeldInstallDA = true;
              statusStr = `Installing - ${installedWithChainFinded.package}`;
              statusPackage = 'Installing';
              isInstalled = true;
              statusColor = '#00AA6C';
            }
            break;
          case 'done':
            {
              disabeldInstallDA = true;
              statusStr = `Installed - ${installedWithChainFinded.package}`;
              statusPackage = `Installed`;
              isInstalled = true;
            }
            break;

          case 'failed':
          case 'removed':
          case 'requested_cancel':
            {
              disabeldInstallDA = false;
              statusStr = ``;
              statusPackage = '';
              isInstalled = false;
            }
            break;
          default:
            disabeldInstallDA = false;
            isInstalled = false;
            statusStr = ``;
            statusPackage = '';
            break;
        }
      } else {
        disabeldInstallDA = false;
        isInstalled = false;
        statusStr = ``;
        statusPackage = '';
      }
    }
  }

  return {
    disabeldInstallDA,
    statusStr,
    statusPackage,
    isInstalled,
    statusColor,
  };
};
