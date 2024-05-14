import { createSelector } from '@reduxjs/toolkit';
import { LaupEAIState, MIN_HARD_CAP_EAI } from './types';
import {
  IBirthEternal,
  ILeaderBoardEAI,
} from '../../services/laupEAI-payment.interfaces';
import { compareString } from '@/utils/string';
import { RootState } from '@/stores';

export const laupEAIPaymentSelector = (state: RootState) => state.lpEAIPayment;

export const depositAddressSelector = createSelector(
  laupEAIPaymentSelector,
  (laupState: LaupEAIState) => (address?: string) => {
    if (!address) return undefined;
    const depositNaka = laupState.depositNaka?.[address.toLowerCase()];
    const depositExternal = laupState.depositExternal?.[address.toLowerCase()];
    if (!depositNaka || !depositExternal) return undefined;
    return { depositNaka, depositExternal };
  },
);

export const publicSaleLeaderBoardVisualSelector = createSelector(
  laupEAIPaymentSelector,
  (laupState: LaupEAIState) => {
    return {
      list: (laupState.publicSaleLeaderBoardVisual || []) as ILeaderBoardEAI[],
    };
  },
);

export const needCheckDepositSelector = createSelector(
  laupEAIPaymentSelector,
  (laupState: LaupEAIState) => laupState.needCheckDeposit,
);

export const summarySelector = createSelector(
  laupEAIPaymentSelector,
  (laupState: LaupEAIState) => laupState.publicSaleSummary,
);

export const oldSummarySelector = createSelector(
  laupEAIPaymentSelector,
  (laupState: LaupEAIState) => laupState.oldPublicSaleSummary,
);

export const userContributeSelector = createSelector(
  laupEAIPaymentSelector,
  (laupState: LaupEAIState) =>
    ({
      hard_cap: MIN_HARD_CAP_EAI,
      ...(laupState.userContributeInfo || {}),
    } as ILeaderBoardEAI | undefined),
);

export const publicSaleLeaderBoardSelector = createSelector(
  laupEAIPaymentSelector,
  (laupState: LaupEAIState) => ({
    list: laupState?.publicSaleLeaderBoard || [],
  }),
);

export const hasSpreadTheLoveSelector = createSelector(
  laupEAIPaymentSelector,
  (laupState: LaupEAIState) => laupState.hasSpreadTheLove,
);

export const showClaimButtonSelector = createSelector(
  laupEAIPaymentSelector,
  (laupState: LaupEAIState) => (userAddress?: string) => {
    return laupState.birthEternalAddress.some((address) =>
      compareString(address, userAddress),
    );
  },
);

export const isDoneBirthEternalSelector = createSelector(
  laupEAIPaymentSelector,
  (laupState: LaupEAIState) => (userAddress?: string) => {
    if (!userAddress) return undefined;
    return laupState.birthEternal?.[
      userAddress?.toLowerCase()
    ] as IBirthEternal;
  },
);
