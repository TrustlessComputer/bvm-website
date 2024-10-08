import { compose } from '@reduxjs/toolkit';
import { DashboardProps, DashboardWrappedComponent } from '../Dashboard.types';

import enhanceBillingModal from './enhance.BillingModal';
import enhanceEditConfigModal from './enhance.EditConfigModal';
import enhanceSendFormModal from './enhance.SendFormModal';
import enhanceTopupModal from './enhance.TopupModal';
import enhanceOrderDetailModal from './enhance.OrderDetailModal';
import enhanceCanceOrderModal from './enhance.CanceOrderModal';
import enhanceUpdateOrderModal from './enhance.UpdateOrderModal';
import enhanceWaittingSettingUpModal from './enhance.WaittingSettingUpModal';
import enhanceDappListModal from './enhance.DappListModal';
import enhanceInstallDappDetailModal from './enhance.InstallDappDetailModal';
import withWaiting from './enhance.withWaiting';

import { DashboardContext } from '../providers/DashboardProvider';

const enhance =
  (WrappedComponent: DashboardWrappedComponent) => (props: DashboardProps) => {
    return (
      <DashboardContext.Provider value={{ ...props }}>
        <WrappedComponent {...props} />
      </DashboardContext.Provider>
    );
  };

export default compose<DashboardWrappedComponent>(
  enhanceCanceOrderModal,
  enhanceUpdateOrderModal,
  enhanceEditConfigModal,
  enhanceSendFormModal,
  enhanceTopupModal,
  enhanceBillingModal,
  enhanceOrderDetailModal,
  enhanceWaittingSettingUpModal,
  enhanceInstallDappDetailModal,
  enhanceDappListModal,
  withWaiting,
  enhance,
);
