import { useMemo } from 'react';
import { useChainProvider } from '../provider/ChainProvider.hook';
import {
  ModuleTypeIcon,
  getModuleIconUrlByType,
} from '../helper/moduleIconHelper';
import * as CSS from 'csstype';
import { ResponsiveValue } from '@chakra-ui/react';

export type BridgeModuleStatus = 'draft' | 'setting_up' | 'running' | 'down';

export const useBridgesModule = () => {
  const { order, isUpdateFlow, isBridgeInstalled } = useChainProvider();

  const bridgeDAppsIntalledList = useMemo(() => {
    return (
      order?.dApps?.filter((item) => item.appCode?.includes('bridge')) || []
    );
  }, [order]);

  const detailBridgesMapperStatus = useMemo(() => {
    let detailBridgeMapper: any = {};

    bridgeDAppsIntalledList.map((item) => {
      const isSettingUp =
        item?.status === 'new' || item?.status === 'processing';

      const mapper = {
        ...item,
        label: isSettingUp ? 'Setting up' : 'Running',
        backgroundColor: isSettingUp ? '#FFF6D8' : '#EEFFF9',
        textColor: isSettingUp ? '#E59700' : '#00AA6C',
      };
      detailBridgeMapper[item.appCode] = mapper;
    });

    return detailBridgeMapper;
  }, [bridgeDAppsIntalledList]);

  const bridgeModuleStatus: BridgeModuleStatus = useMemo(() => {
    if (!isUpdateFlow || !isBridgeInstalled) {
      return 'draft';
    } else {
      if (bridgeDAppsIntalledList.length < 1) {
        return 'draft';
      } else {
        let isSettingUp = false;
        let isDown = false;
        let isRunning = true;

        bridgeDAppsIntalledList.map((childBridge) => {
          if (
            childBridge.status === 'new' ||
            childBridge.status === 'processing'
          ) {
            isSettingUp = true;
            return;
          } else {
            if (childBridge.status !== 'done') {
              isDown = true;
              return;
            }
          }
        });

        if (isSettingUp) {
          return 'setting_up';
        }
        if (isDown) {
          return 'down';
        }
        if (isRunning) {
          return 'running';
        }

        return 'draft';
      }
    }
  }, [isUpdateFlow, isBridgeInstalled, bridgeDAppsIntalledList]);

  const lineBridgeStatus = bridgeModuleStatus;

  const statusMapper = useMemo(() => {
    let statusCode = 'draft';
    let statusStr = 'Drafting Modules';
    let statusColorStr = '#E59700';
    let borderColorStr = '#FFC700';
    let bgColorStr = '#FFF6D8';
    let fontStyle: CSS.Property.FontStyle = 'italic';
    let textDecorationLine: ResponsiveValue<CSS.Property.TextDecorationLine> =
      'underline';

    fontStyle = 'normal';
    textDecorationLine = 'none';

    switch (bridgeModuleStatus) {
      case 'draft':
        //Get above value
        break;
      case 'setting_up':
        statusCode = 'setting_up';
        statusStr = 'Setting up';
        statusColorStr = '#E59700';
        borderColorStr = '#FFC700';
        bgColorStr = '#FFF6D8';
        break;

      case 'running':
        statusCode = 'done';
        statusStr = 'Running';
        statusColorStr = '#00AA6C';
        borderColorStr = '#00AA6C';
        bgColorStr = '#EEFFF9';
        break;

      case 'down':
        statusCode = 'down';
        statusStr = 'Down';
        statusColorStr = '#333333';
        borderColorStr = '#333333';
        bgColorStr = '#ECECED';
        break;
    }

    return {
      statusCode,
      statusStr,
      statusColorStr,
      bgColorStr,
      borderColorStr,
      fontStyle,
      textDecorationLine,
    };
  }, [bridgeModuleStatus]);

  const getBridgeTypeIcon = (): ModuleTypeIcon => {
    switch (bridgeModuleStatus) {
      case 'draft':
        return 'Drafting';
      case 'setting_up':
        return 'Setting_Up';
      case 'running':
        return 'Running';
      case 'down':
        return 'Down';
    }
  };

  const getBridgeTypeIconUrl = () => {
    return getModuleIconUrlByType(getBridgeTypeIcon());
  };

  console.log('[useBridgesModule] LOG --- ', {
    isBridgeInstalled,
    lineBridgeStatus,
    bridgeDAppsIntalledList,
    bridgeModuleStatus,
    statusMapper,
  });

  return {
    lineBridgeStatus,
    bridgeDAppsIntalledList,
    statusMapper,
    bridgeModuleStatus,

    getBridgeTypeIconUrl,
    detailBridgesMapperStatus,
  };
};
