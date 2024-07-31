
export enum EDurationUnit {
  DAY,
  WEEK,
  MONTH,
}

export const durationUnits = [
  {
    id: EDurationUnit.DAY,
    label: "Day",
  },
  {
    id: EDurationUnit.WEEK,
    label: "Week",
  },
  {
    id: EDurationUnit.MONTH,
    label: "Month",
  },
];
export interface ITokenomics {
  id?: string;
  address?: string;
  name?: string;
  start_time?: string;
  duration?: string;
  duration_unit?: EDurationUnit;
  cliff?: string;
  cliff_unit?: EDurationUnit;
  vesting_total_amount?: string;
  unvesting_total_amount?: string;
  total_amount: number;
  is_vesting?: boolean;
}
