import s from './styles.module.scss';
import PriceCard from '@/modules/price/price-card';
import { Tooltip } from 'react-tooltip';
import React, { ReactElement, useEffect, useState } from 'react';
import { estimateTotalCostAPI } from '@/services/api/l2services';
import {
  ParamsEstCostDABitcoinPolygon,
  ParamsEstCostOnlyBitcoin,
  getParamsEstCostOnlyBitcoin,
} from './Pricing.constant';
import Loading from '@/components/Loading';
import { dataFormater } from './Pricing.helper';
import { IOrderBuyEstimateRespone } from '@/services/api/l2services/types';

const RETRY_MAX = 3;
let retryCount = 0;

const PriceModule = () => {
  const [isFetchignData, setFetchingData] = useState(false);
  const [apiData, setAPIData] = useState<IOrderBuyEstimateRespone[]>([]);

  const fetchData = async () => {
    try {
      setFetchingData(true);
      const [
        bitcoinPolygonData,
        onlyBitcoinData_10s,
        onlyBitcoinData_5s,
        onlyBitcoinData_2s,
      ] = await Promise.all([
        estimateTotalCostAPI(ParamsEstCostDABitcoinPolygon),
        estimateTotalCostAPI(getParamsEstCostOnlyBitcoin(10)),
        estimateTotalCostAPI(getParamsEstCostOnlyBitcoin(5)),
        estimateTotalCostAPI(getParamsEstCostOnlyBitcoin(2)),
      ]);

      const bitcoinPolygonDataFormater = dataFormater(bitcoinPolygonData);
      const onlyBitcoinData_10s_Formater = dataFormater(onlyBitcoinData_10s);
      const onlyBitcoinData_5s_Formater = dataFormater(onlyBitcoinData_5s);
      const onlyBitcoinData_2s_Formater = dataFormater(onlyBitcoinData_2s);

      setAPIData([
        bitcoinPolygonDataFormater,
        onlyBitcoinData_10s_Formater,
        onlyBitcoinData_5s_Formater,
        onlyBitcoinData_2s_Formater,
      ]);
      retryCount = 0;
    } catch (error) {
      console.log('[fetchData] ERROR --- ', error);
      if (retryCount < RETRY_MAX) {
        retryCount++;
        fetchData();
      }
    } finally {
      setFetchingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isFetchignData) return <></>;

  return (
    <div className={s.price}>
      <div className={s.price_top}>
        <span>Plans built for every team</span>
        <h1>Developer-first pricing</h1>
      </div>
      <div className={s.price_inner}>
        <div className={`${s.price_container} container`}>
          <PriceCard
            style={{
              flex: 0.7,
            }}
            isPlaceholder={true}
            network={'Network'}
            portocol={'Rollup Protocol'}
            layer={'Data Availability Layer'}
            time={'Block Time'}
            support={'Support'}
          />
          <PriceCard
            label={'Free'}
            packageX={'isFree'}
            network={'Bitcoin testnet'}
            portocol={'Optimistic rollups'}
            layer={'Bitcoin (Regtest) or Ethereum (Goerli)'}
            time={'2s, 5s, 10s'}
            support={'Discord support'}
            titleAction={'Get started'}
            action={'/rollups/customize'}
          >
            <h1>Free trial</h1>
          </PriceCard>
          <PriceCard
            iseSelected={true}
            label={'Growth'}
            packageX={'isEss'}
            subtitle={''}
            network={'Bitcoin mainnet'}
            portocol={'Optimistic rollups'}
            layer={'Bitcoin + Polygon'}
            time={'2s, 5s, 10s'}
            support={'Discord support'}
            titleAction={'Get started'}
            action={'/rollups/customize'}
          >
            <h1>
              {' '}
              {`${apiData[0]?.TotalCost || 0}`} BVM<small>/month</small>
            </h1>
          </PriceCard>
          <PriceCard
            label={'Scale'}
            packageX={'isPro'}
            subtitle={''}
            network={'Bitcoin mainnet'}
            portocol={'Optimistic rollups'}
            layer={'Bitcoin'}
            time={
              <div className={s.tooltip}>
                10s
                <span>
                  <a id="my-anchor-element_ic_sharp_50">
                    <img src="/builder/svg-details.svg" alt="ic_sharp" />
                  </a>
                  <Tooltip anchorSelect="#my-anchor-element_ic_sharp_50">
                    <div>
                      <b>Optional</b>
                      <ul>
                        <li>
                          {' '}
                          Block Time: 5s (+{apiData[2]?.TotalCost || 0} BVM
                          monthly)
                        </li>

                        <li>
                          Block Time: 2s (+{apiData[3]?.TotalCost || 0} BVM
                          monthly)
                        </li>
                      </ul>
                    </div>
                  </Tooltip>
                </span>
              </div>
            }
            support={'Dedicated support'}
            titleAction={'Get started'}
            action={'/rollups/customize'}
          >
            <h1>
              {`${apiData[1]?.TotalCost || 0}`} BVM<small>/month</small>
            </h1>
          </PriceCard>
          <PriceCard
            label={'Custom'}
            packageX={'isCustom'}
            network={
              'Design a custom Bitcoin L2 — available for businesses with large transaction volume or unique business models.'
            }
            support={'Dedicated support'}
            // titleAction={'Contact sales'}
            // action={'#'}
          >
            <h1>Custom Price</h1>
          </PriceCard>
        </div>
      </div>
    </div>
  );
};

export default PriceModule;
