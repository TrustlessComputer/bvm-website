import { IDApp, IDAppDetails } from '@/services/api/DAServices/types';
import { OrderItem } from '@/stores/states/l2services/types';

export const checkDAInstallHelper = (
  order?: OrderItem,
  dApp?: IDApp,
  packageSelected?: IDAppDetails,
) => {
  let disabeldInstallDA = false;
  let statusStr = '';
  let statusPackage = '';
  let isInstalled = false;

  if (!order || order?.isNeedTopup) {
    disabeldInstallDA = true;
    statusStr = 'Waiting for payment';
    statusPackage = '';
    isInstalled = false;
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
          Number(item.network_id) === Number(order.chainId) &&
          Number(item.app_store_detail_id) === Number(packageSelected?.id),
      );

      if (installedWithChainFinded) {
        const status = installedWithChainFinded.status;

        switch (status) {
          case 'new':
            {
              disabeldInstallDA = true;
              statusStr = `Installing - ${installedWithChainFinded.package}`;
              statusPackage = 'Installing';
              isInstalled = true;
            }
            break;
          case 'processing':
          case 'done':
            {
              disabeldInstallDA = true;
              statusStr = `${installedWithChainFinded.status} - ${installedWithChainFinded.package}`;
              statusPackage = `${installedWithChainFinded.status}`;
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
  };
};