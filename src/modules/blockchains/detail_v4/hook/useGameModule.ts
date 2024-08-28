import { useMemo } from 'react';
import { useChainProvider } from '../provider/ChainProvider.hook';
import {
  ModuleTypeIcon,
  getModuleIconUrlByType,
} from '../helper/moduleIconHelper';
import * as CSS from 'csstype';
import { ResponsiveValue } from '@chakra-ui/react';

export type GmaeModuleStatus = 'draft' | 'setting_up' | 'running' | 'down';

export const useGameModule = () => {
  const { order, isUpdateFlow, isBridgeInstalled, isGamingAppsInstalled } =
    useChainProvider();

  const gameDAppsIntalledList = useMemo(() => {
    return order?.dApps?.filter((item) => item.appCode?.includes('game')) || [];
  }, [order]);

  const detailGameMapperStatus = useMemo(() => {
    let detailGameMapper: any = {};

    gameDAppsIntalledList.map((item) => {
      const isSettingUp =
        item?.status === 'new' || item?.status === 'processing';

      let label = !isUpdateFlow ? '' : isSettingUp ? 'Setting up' : 'Running';
      let backgroundColor = !isUpdateFlow
        ? 'transparent'
        : isSettingUp
        ? '#FFF6D8'
        : '#EEFFF9';
      let textColor = !isUpdateFlow
        ? 'transparent'
        : isSettingUp
        ? '#E59700'
        : '#00AA6C';

      const mapper = {
        ...item,
        label: label,
        backgroundColor: backgroundColor,
        textColor: textColor,
      };
      detailGameMapper[item.appCode] = mapper;
    });

    return detailGameMapper;
  }, [gameDAppsIntalledList]);

  const bridgeModuleStatus: GmaeModuleStatus = useMemo(() => {
    if (!isUpdateFlow || !isBridgeInstalled) {
      return 'draft';
    } else {
      if (gameDAppsIntalledList.length < 1) {
        return 'draft';
      } else {
        let isSettingUp = false;
        let isDown = false;
        let isRunning = true;

        gameDAppsIntalledList.map((child) => {
          if (child.status === 'new' || child.status === 'processing') {
            isSettingUp = true;
            return;
          } else {
            if (child.status !== 'done') {
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
  }, [isUpdateFlow, isBridgeInstalled, gameDAppsIntalledList]);

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

  const getGameTypeIcon = (): ModuleTypeIcon => {
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

  const getGameTypeIconUrl = () => {
    return getModuleIconUrlByType(getGameTypeIcon());
  };

  return {
    lineBridgeStatus,
    gameDAppsIntalledList,
    statusMapper,
    bridgeModuleStatus,

    getGameTypeIconUrl,
    detailGameMapperStatus,
  };
};
