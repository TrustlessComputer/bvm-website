"use client";

import ButtonConnected from '@/components/ButtonConnected';
import ButtonWrapper from '@/components/ButtonWrapper';
import HorizontalItem from '@/components/HorizontalItem';
import { commonSelector } from '@/stores/states/common/selector';
import { getErrorMessage } from '@/utils/errorV2';
import { formatCurrency } from '@/utils/format';
import { Button, Flex, Link, Text } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCreateFormValues, setCreateStep } from '../states/reducer';
import { createTokenSelector } from '../states/selector';
import s from '../styles.module.scss';
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
import { getExplorer } from '@/utils/helpers';
import dayjs from 'dayjs';
import { isMobile } from 'react-device-detect';
import CTokenContract from '../contract';
import { IBodyCreateToken } from '../contract/interface';
import CTokenomicsApi from '../services/api';
import { ITokenomics } from '../states/types';
import {
  convertDurationToDayjs,
  getTokenomics,
  getTotalSupply,
  getVestingEndTime,
  getVestingStartTime,
} from '../utils';
import { showError } from '@components/toast';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const FormStep3 = () => {
  const tokenContract = useRef(new CTokenContract()).current;
  const tokenomicsApi = useRef(new CTokenomicsApi()).current;
  const dispatch = useDispatch();
  const { form_values } = useSelector(createTokenSelector);
  const configs = useSelector(commonSelector).configs;
  const [loading, setLoading] = useState(false);
  const wallet = useAuthenticatedWallet();

  const totalSupply = useMemo(() => form_values.supply, [form_values.supply]);

  const getTokenomicsDefault: ITokenomics[] = useMemo(() => {
    if (getTotalSupply(form_values.tokenomics) === 0) {
      return [
        {
          name: "Foundation",
          address: wallet?.address,
          total_amount: form_values.supply,
        },
      ];
    }

    return form_values.tokenomics;
  }, [form_values, wallet]) as ITokenomics[];

  const data = useMemo(() => {
    const _data: any[] = [];

    getTokenomicsDefault.forEach((t) => {
      _data.push({
        label: t.name,
        x: new BigNumber(t.total_amount).toNumber(),
        y: new BigNumber(t.total_amount)
          .dividedBy(totalSupply)
          .multipliedBy(100)
          .toFixed(2),
      });
    });

    return _data;
  }, [getTokenomicsDefault, , totalSupply]);

  const options = useMemo(() => {
    return {
      exportEnabled: false,
      animationEnabled: true,
      // title: {
      //   text: "Allocation",
      // },
      theme: "dark1",
      backgroundColor: "#272241",
      data: [
        {
          type: "pie",
          startAngle: 75,
          indexLabel: `{label} ({y}%)`,
          dataPoints: data,
          indexLabelFontSize: 12,
          toolTipContent: `<b>{label}</b>: {x} $${form_values.ticker}`,
        },
      ],
    };
  }, [data, form_values]);

  const generateDateRange = (startDate: string, endDate: string) => {
    let start = dayjs(startDate);
    let end = dayjs(endDate);
    let dateArray = [];

    while (start.isBefore(end) || start.isSame(end)) {
      dateArray.push(start.format("YYYY-MM-DD"));
      start = start.add(1, "day");
    }
    return dateArray;
  };

  const dates = (_vestings: ITokenomics[]) => {
    if (_vestings.length > 0) {
      let minStartDate = getVestingStartTime(_vestings[0] as ITokenomics);

      let maxEndDate = dayjs(minStartDate).add(
        parseFloat(_vestings[0]?.duration?.toString() as string),
        (convertDurationToDayjs as any)[_vestings[0]?.duration_unit as any].key
      );

      _vestings.forEach((v) => {
        if (dayjs(minStartDate).isAfter(getVestingStartTime(v))) {
          minStartDate = getVestingStartTime(v);
        }
        if (
          dayjs(maxEndDate).isBefore(
            getVestingEndTime(v, minStartDate as unknown as string)
          )
        ) {
          maxEndDate = getVestingEndTime(v, minStartDate as unknown as string);
        }
      });
      return generateDateRange(
        minStartDate as unknown as string,
        maxEndDate as unknown as string
      );
    }

    return [];
  };

  const getDataPoints = (dates: any[], token: ITokenomics) => {
    const amount = new BigNumber(token.total_amount as any)
      .dividedBy(token.duration as any)
      .toNumber();
    let y: any = 0;
    let step: any = 1;
    return dates.map((d) => {
      const startTime = getVestingStartTime(token) as unknown as string;
      const endTime = getVestingEndTime(token, startTime);
      if (dayjs(startTime).isBefore(d) && dayjs(endTime).isAfter(d)) {
        step += 1;
        if (parseFloat(token.duration as any) % step === 0) {
          y = amount * step;
        }
      }
      return {
        x: (dayjs(d) as any)["$d"],
        y: y,
      };
    });
  };

  const data2 = useMemo(() => {
    const _data2: any[] = [];
    const vestings = form_values.tokenomics.filter((v: any) => v.is_vesting);

    const _dates = dates(vestings);

    vestings.forEach((v: any) => {
      _data2.push({
        type: "stackedArea",
        name: v.name,
        xValueFormatString: "MM-DD-YYYY",
        dataPoints: getDataPoints(_dates, v),
        legend: {
          verticalAlign: "center",
          horizontalAlign: "bottom",
        },
        showInLegend: true,
      });
    });
    return _data2;
  }, [form_values.tokenomics]);

  const options2 = useMemo(() => {
    return {
      exportEnabled: false,
      animationEnabled: true,
      // title: {
      //   text: "Vesting",
      // },
      theme: "dark1",
      backgroundColor: "#272241",
      data: data2,
    };
  }, [data, form_values]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const body: IBodyCreateToken = {
        name: form_values.name,
        symbol: form_values.ticker,
        ...getTokenomics(getTokenomicsDefault),
      };

      const rs = await tokenContract.createToken(body);
      await tokenomicsApi.scanTx({ tx_hash: rs.hash });
      // console.log("rs", rs);

      showError({
        url: getExplorer({ hash: rs.hash }),
        message: `Token ${form_values.name} has created successfully!`,
      });
      dispatch(setCreateStep(1));
      dispatch(resetCreateFormValues());
    } catch (error) {
      showError(getErrorMessage(error));
      console.log("eeee", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex className={s.boxContent} flexDirection={"column"} gap={"24px"}>
      <Flex className={s.group} margin={"0px auto"}>
        <Text className={s.tagLabel}>Token information</Text>
        <HorizontalItem label={"Token name: "} value={form_values.name} />
        <HorizontalItem label={"Symbol: "} value={form_values.ticker} />
        <HorizontalItem
          label={"Total supply: "}
          value={formatCurrency(
            getTotalSupply(form_values.tokenomics),
            0,
            2,
            "BTC",
            true
          )}
        />

        <HorizontalItem
          label={"Network Info: "}
          value={
            <Link target="_blank" href={configs?.explorer_url}>
              {configs?.network_id}
            </Link>
          }
        />
      </Flex>
      <Flex
        flexDirection={isMobile ? "column" : "row"}
        gap={"12px"}
        justifyContent={"center"}
      >
        <Flex className={s.group} style={{ padding: 0, overflow: "hidden" }}>
          <Text mt={"24px"} className={s.tagLabel}>
            Allocation
          </Text>
          <CanvasJSChart options={options} />
        </Flex>
        {data2.length > 0 && (
          <Flex className={s.group} style={{ padding: 0, overflow: "hidden" }}>
            <Text mt={"24px"} className={s.tagLabel}>
              Vesting
            </Text>
            <CanvasJSChart options={options2} />
          </Flex>
        )}
      </Flex>

      <Flex justifyContent={"center"} gap={"12px"}>
        <ButtonWrapper className={s.btnBack} buttonType="negative">
          <Button onClick={() => dispatch(setCreateStep(2))}>
            <Text>Back</Text>
          </Button>
        </ButtonWrapper>
        <ButtonConnected>
          <ButtonWrapper className={s.btnSubmit}>
            <Button isDisabled={loading} isLoading={loading} onClick={onSubmit}>
              <Text>Submit</Text>
            </Button>
          </ButtonWrapper>
        </ButtonConnected>
      </Flex>
    </Flex>
  );
};

export default FormStep3;
