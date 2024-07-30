import BigNumber from "bignumber.js";
import { EDurationUnit, ITokenomics } from "./states/types";
import dayjs from "dayjs";
import { parseEther } from "ethers/lib/utils";

export const convertDurationToDayjs = {
  [EDurationUnit.DAY]: {
    key: "days",
    per_day: 1,
  },
  [EDurationUnit.WEEK]: {
    key: "weeks",
    per_date: 7,
  },
  [EDurationUnit.MONTH]: {
    key: "months",
    per_date: 30,
  },
};

export const getTotalSupply = (tokenomics: ITokenomics[]) => {
  return tokenomics.reduce(
    (p, c) => new BigNumber(p).plus(c.total_amount).toNumber(),
    0
  );
};

export const getVestingStartTime = (token: ITokenomics) => {
  return dayjs().add(
    parseFloat(token?.cliff?.toString() as string),
    (convertDurationToDayjs as any)[token?.cliff_unit as any].key
  );
};

export const getVestingEndTime = (token: ITokenomics, start_time: string) => {
  return dayjs(start_time).add(
    parseFloat(token?.duration?.toString() as string),
    (convertDurationToDayjs as any)[token?.duration_unit as any].key
  );
};

export const getTokenomics = (tokenomics: ITokenomics[]) => {
  const beneficiaries: string[] = [];
  const beneficiaryNames: string[] = [];
  const starts: string[] = [];
  const durations: string[] = [];
  const durationUnits: string[] = [];
  const cliffs: string[] = [];
  const cliffUnits: string[] = [];
  const amountTotals: any[] = [];
  const unvestAmounts: any[] = [];
  tokenomics.forEach((t) => {
    beneficiaries.push(t.address as string);
    beneficiaryNames.push(t.name as string);

    if (t.is_vesting) {
      amountTotals.push(parseEther(t.total_amount.toString() as any) as any);
      unvestAmounts.push(0);
      durations.push(t.duration as any);
      durationUnits.push(t.duration_unit as any);
      cliffs.push(t.cliff as any);
      cliffUnits.push(t.cliff_unit as any);
      starts.push(dayjs(getVestingStartTime(t)).unix() as unknown as string);
    } else {
      amountTotals.push(0);
      unvestAmounts.push(parseEther(t.total_amount.toString() as any) as any);
      durations.push(0 as any);
      durationUnits.push(0 as any);
      cliffs.push(0 as any);
      cliffUnits.push(0 as any);
      starts.push(0 as unknown as string);
    }
  });
  return {
    beneficiaries,
    beneficiaryNames,
    starts,
    durations,
    durationUnits,
    amountTotals,
    unvestAmounts,
    cliffs,
    cliffUnits,
  };
};
