import FieldTextFormik from "@/components/Form/Field.Text.Formik";
import FieldAmount from "@/components/Form/fieldAmount";
import InputWrapper from "@/components/Form/inputWrapper";
import { required } from "@/utils/form-validate";
import { compareString } from "@/utils/string";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Switch,
  Text,
} from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import dayjs from "dayjs";
import { Field, useFormikContext } from "formik";
import { clone } from "lodash";
import { useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import { createTokenSelector } from "../../states/selector";
import { durationUnits, ITokenomics } from "../../states/types";
import { convertDurationToDayjs } from "../../utils";
import InputAddress from "../InputAddress";
import s from "./styles.module.scss";

const InputTokenomics = ({
  token,
  onRemoveGroup,
  onChangeTokenomics,
}: {
  token: ITokenomics;
  onRemoveGroup: any;
  onChangeTokenomics: any;
}) => {
  const getFieldName = (name: string) => {
    return `${name}_${token.id}`;
  };
  const { form_values } = useSelector(createTokenSelector);

  const formik = useFormikContext();
  const values = formik.values as any;

  const _isVesting = useMemo(
    () => values?.[getFieldName("is_vesting")],
    [values]
  );

  const [isVesting, setIsVesting] = useState(_isVesting);

  const onChangeValue = (name: string, value: any) => {
    const _token: any = clone(token);

    _token[name] = value;

    onChangeTokenomics(token.id, _token);
  };

  const percentAllocation = useMemo(
    () =>
      new BigNumber(token.total_amount)
        .dividedBy(form_values.supply)
        .multipliedBy(100)
        .toNumber(),
    [form_values, token]
  );

  const cliffDate = useMemo(() => {
    return dayjs().add(
      parseFloat(values?.[getFieldName("cliff")] as any),
      (convertDurationToDayjs as any)?.[values?.[getFieldName("cliff_unit")]]
        ?.key as any
    );
  }, [values?.[getFieldName("cliff")], values?.[getFieldName("cliff_unit")]]);

  const durationDate = useMemo(() => {
    return dayjs(cliffDate).add(
      parseFloat(values?.[getFieldName("cliff")] as any),
      (convertDurationToDayjs as any)?.[values?.[getFieldName("cliff_unit")]]
        ?.key as any
    );
  }, [
    cliffDate,
    values?.[getFieldName("duration")],
    values?.[getFieldName("duration_unit")],
  ]);

  return (
    <Box className={s.container}>
      <SimpleGrid columns={isMobile ? 1 : 2} gap={"12px"}>
        <InputWrapper label="Name">
          <Field
            component={FieldTextFormik}
            name={getFieldName("name")}
            placeholder="Enter name"
            validate={percentAllocation > 0 ? required : undefined}
            fieldChanged={(e: any) => onChangeValue("name", e)}
          />
        </InputWrapper>
        <InputWrapper label="Amount">
          <Field
            name={getFieldName("total_amount")}
            component={FieldAmount}
            min={0}
            fieldChanged={(e: any) => onChangeValue("total_amount", e)}
          />
        </InputWrapper>
      </SimpleGrid>
      <FormControl display="flex" alignItems="center">
        <Switch
          onChange={(e) => {
            setIsVesting(e.target.checked);
            onChangeValue("is_vesting", e.target.checked);
          }}
          id={`vesting_${token.id}`}
          isChecked={isVesting}
        />
        <FormLabel htmlFor={`vesting_${token.id}`} mb="0" ml={"10px"}>
          Vesting?
        </FormLabel>
      </FormControl>
      {isVesting && (
        <SimpleGrid mt={"12px"} columns={isMobile ? 1 : 2} gap={"12px"}>
          <InputWrapper className={s.groupTime} label="Cliff">
            <Field
              name={getFieldName("cliff")}
              component={FieldAmount}
              fieldChanged={(e: any) => onChangeValue("cliff", e)}
              min={0}
              placeholder="0"
              leftComponent={
                <Menu>
                  <MenuButton
                    className={s.btnSelect}
                    as={Button}
                    rightIcon={
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                      </svg>
                    }
                  >
                    {
                      durationUnits.find((v) =>
                        compareString(v.id, token.cliff_unit)
                      )?.label
                    }
                  </MenuButton>
                  <MenuList>
                    {durationUnits.map((v) => (
                      <MenuItem
                        onClick={() => {
                          formik.setFieldValue(
                            getFieldName("cliff_unit"),
                            v.id
                          );
                          onChangeValue("cliff_unit", v.id);
                        }}
                        key={v.id}
                      >
                        {v.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              }
            />
            {values?.[getFieldName("cliff")] && (
              <Text mt={"4px"} fontSize={"12px"} opacity={0.8}>
                Cliff at {cliffDate.format("MM/DD/YYYY")}
              </Text>
            )}
          </InputWrapper>
          <InputWrapper className={s.groupTime} label="Duration">
            <Field
              name={getFieldName("duration")}
              component={FieldAmount}
              fieldChanged={(e: any) => onChangeValue("duration", e)}
              min={0}
              placeholder="0"
              leftComponent={
                <Menu>
                  <MenuButton
                    className={s.btnSelect}
                    as={Button}
                    rightIcon={
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                      </svg>
                    }
                  >
                    {
                      durationUnits.find((v) =>
                        compareString(v.id, token.duration_unit)
                      )?.label
                    }
                  </MenuButton>
                  <MenuList>
                    {durationUnits.map((v) => (
                      <MenuItem
                        onClick={() => {
                          formik.setFieldValue(
                            getFieldName("duration_unit"),
                            v.id
                          );
                          onChangeValue("duration_unit", v.id);
                        }}
                        key={v.id}
                      >
                        {v.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              }
            />
            {values?.[getFieldName("duration")] && (
              <Text mt={"4px"} fontSize={"12px"} opacity={0.8}>
                Unlock at {durationDate.format("MM/DD/YYYY")}
              </Text>
            )}
          </InputWrapper>
        </SimpleGrid>
      )}

      <Box mt={"12px"} />

      <InputAddress
        name={getFieldName("address")}
        label={"Receiver Address"}
        placeholder={"Input Team address"}
        fieldChanged={(e: any) => onChangeValue("address", e)}
        validate={percentAllocation > 0 ? required : undefined}
      />
      {/* <Text className={s.tagLabel}>
        {values?.[getFieldName("name")]
          ? `👉${values?.[getFieldName("name")]} (${formatCurrency(
              percentAllocation,
              0,
              2
            )}%)`
          : `Unknown`}
      </Text> */}
      <Button
        type="button"
        className={s.btnRemove}
        onClick={() => onRemoveGroup(token.id)}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.1041 3.5C12.1041 3.7415 11.9081 3.9375 11.6666 3.9375H2.33325C2.09175 3.9375 1.89575 3.7415 1.89575 3.5C1.89575 3.2585 2.09175 3.0625 2.33325 3.0625H4.79141C4.84566 2.95633 4.88767 2.83617 4.93258 2.702L5.05041 2.34791C5.16941 1.99091 5.50367 1.75 5.8805 1.75H8.11934C8.49617 1.75 8.83043 1.99091 8.94943 2.34791L9.06726 2.702C9.11217 2.83617 9.15418 2.95633 9.20843 3.0625H11.6666C11.9081 3.0625 12.1041 3.2585 12.1041 3.5ZM11.001 4.7075L10.6108 10.6167C10.5466 11.5383 10.0624 12.25 8.86075 12.25H5.13908C3.93742 12.25 3.45325 11.5383 3.38908 10.6167L2.99883 4.7075C2.99241 4.60659 3.07234 4.52083 3.17325 4.52083H10.826C10.9275 4.52083 11.0074 4.60659 11.001 4.7075ZM7.61884 8.16667L8.47634 7.30917C8.64726 7.13825 8.64726 6.86116 8.47634 6.69025C8.30542 6.51933 8.02834 6.51933 7.85742 6.69025L6.99992 7.54775L6.14242 6.69025C5.9715 6.51933 5.69442 6.51933 5.5235 6.69025C5.35258 6.86116 5.35258 7.13825 5.5235 7.30917L6.381 8.16667L5.5235 9.02417C5.35258 9.19508 5.35258 9.47217 5.5235 9.64309C5.60867 9.72825 5.72066 9.77142 5.83266 9.77142C5.94466 9.77142 6.05666 9.72884 6.14183 9.64309L6.99933 8.78559L7.85683 9.64309C7.942 9.72825 8.054 9.77142 8.166 9.77142C8.278 9.77142 8.39 9.72884 8.47516 9.64309C8.64608 9.47217 8.64608 9.19508 8.47516 9.02417L7.61884 8.16667Z"
            fill="#EC3E44"
          />
        </svg>
        Remove this allocation
      </Button>
    </Box>
  );
};

export default InputTokenomics;
