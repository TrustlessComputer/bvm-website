import { createSlice } from "@reduxjs/toolkit";
import { CreateTokenState, EDurationUnit, ICreateFormValues } from "./types";
import dayjs from "dayjs";

const DEFAULT_VALUES: ICreateFormValues = {
  name: "",
  ticker: "",
  description: "",
  image: undefined,
  twitterLink: "",
  telegramLink: "",
  website: "",
  onchainImage: false,
  supply: "",
  decimals: 18,
  feeBalance: "",
  feeNeeded: 0,
  tokenomics: [
    {
      id: dayjs().unix().toString(),
      total_amount: 0,
      cliff_unit: EDurationUnit.MONTH,
      duration_unit: EDurationUnit.MONTH,
    },
  ],
  address: "",
};

const initialState: CreateTokenState = {
  create_step: 1,
  form_values: DEFAULT_VALUES,
};

const slice = createSlice({
  name: "createToken",
  initialState,
  reducers: {
    setCreateStep: (state, action) => {
      state.create_step = action.payload;
    },
    setCreateFormValues: (state, action) => {
      state.form_values = {
        ...state.form_values,
        ...action.payload,
      };
    },
    resetCreateFormValues: (state) => {
      state.form_values = DEFAULT_VALUES;
    },
  },
});

export const { setCreateStep, setCreateFormValues, resetCreateFormValues } =
  slice.actions;

export default slice.reducer;
