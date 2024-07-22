import ButtonWrapper from "@/components/ButtonWrapper";
import HorizontalItem from "@/components/HorizontalItem";
import { formatCurrency } from "@/utils/format";
import { Button, Center, Flex, Link, Text } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { clone, each } from "lodash";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputTokenomics from "../components/InputTokenomic";
import { setCreateFormValues, setCreateStep } from "../states/reducer";
import { createTokenSelector } from "../states/selector";
import { EDurationUnit, ITokenomics } from "../states/types";
import s from "../styles.module.scss";
import { getTotalSupply } from "../utils";
import { commonSelector } from '@/stores/states/common/selector';
import { compareString } from '@utils/string';

const FormStep2 = () => {
  const dispatch = useDispatch();
  const { form_values } = useSelector(createTokenSelector);
  const configs = useSelector(commonSelector).configs;

  const tokenomics = form_values.tokenomics;

  const remainingSupply = useMemo(
    () =>
      new BigNumber(form_values.supply)
        .minus(getTotalSupply(tokenomics))
        .toNumber(),
    [tokenomics, form_values]
  );

  const onSubmit = async () => {
    try {
      dispatch(setCreateStep(3));
    } catch (error) {}
  };

  const onNewGroup = () => {
    const _tokenomics = clone(tokenomics);

    _tokenomics.push({
      id: dayjs().valueOf().toString(),
      total_amount: 0,
      duration_unit: EDurationUnit.MONTH,
      cliff_unit: EDurationUnit.MONTH,
    });

    dispatch(
      setCreateFormValues({
        tokenomics: _tokenomics,
      })
    );
  };

  const onRemoveGroup = (id: string) => {
    const removedGroup = clone(tokenomics).filter(
      (v: any) => !compareString(v.id, id)
    );
    dispatch(
      setCreateFormValues({
        tokenomics: removedGroup,
      })
    );
  };

  const onChangeTokenomics = (id: string, token: ITokenomics) => {
    const _tokenomics = clone(tokenomics);
    const findId = _tokenomics.findIndex((v: any) => compareString(v.id, id));

    if (findId > -1) {
      _tokenomics[findId] = token;
      dispatch(
        setCreateFormValues({
          tokenomics: _tokenomics,
        })
      );
    }
  };

  const initialValues = useMemo(() => {
    const initial: any = {};
    tokenomics.forEach((element: any) => {
      each(element, (v, k) => {
        initial[`${k}_${element.id}`] = v;
      });
    });
    return initial;
  }, [tokenomics]);

  const error = useMemo(() => {
    if (form_values.tokenomics.length >= 1) {
      if (getTotalSupply(form_values.tokenomics) > 0) {
        if (remainingSupply) {
          return `Remaining ${formatCurrency(remainingSupply, 0)} ${
            form_values.ticker
          }`;
        }
      }
    }
    return undefined;
  }, [form_values, remainingSupply]);

  return (
    <Flex className={s.boxContent}>
      <Flex className={s.group} margin={"0px auto"} mb={"24px"}>
        <Text className={s.tagLabel}>Token information</Text>
        <HorizontalItem label={"Token name: "} value={form_values.name} />
        <HorizontalItem label={"Symbol: "} value={form_values.ticker} />
        <HorizontalItem
          label={"Total supply: "}
          value={formatCurrency(form_values.supply, 0, 2, "BTC", true)}
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
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {tokenomics.map((v: any, i: number) => (
              <InputTokenomics
                key={`${v.id}_${i}`}
                token={v}
                onRemoveGroup={onRemoveGroup}
                onChangeTokenomics={onChangeTokenomics}
              />
            ))}
            <Center>
              <Button className={s.addNew} type="button" onClick={onNewGroup}>
                <Text>Add New Allocation</Text>
              </Button>
            </Center>
            {error && <Text className={s.errorText}>{error}</Text>}
            <Flex mt={"24px"} justifyContent={"center"} gap={"24px"}>
              <ButtonWrapper buttonType="negative" className={s.btnBack}>
                <Button
                  onClick={() => dispatch(setCreateStep(1))}
                  type="button"
                >
                  <Text>Back</Text>
                </Button>
              </ButtonWrapper>
              <ButtonWrapper className={s.btnSubmit}>
                <Button
                  isDisabled={tokenomics.length === 0 || Boolean(error)}
                  type="submit"
                >
                  <Text>Next</Text>
                </Button>
              </ButtonWrapper>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default FormStep2;
