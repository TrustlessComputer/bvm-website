import { DALayerEnum, GAS_LITMIT, NetworkEnum } from './Buy/Buy.constanst';
import { ORDER_FIELD } from './Buy/stores';
import { WITHDRAWAL_PERIOD_BOOTSTRAP } from '../all-l3-monitor/Buy/Buy.constanst';

export const DATA_PRICING = {
    network: {
        title: '2. Network',
        sub_title: 'Network',
        options: [
            {
                label: 'Mainnet',
                id: 1,
                value: NetworkEnum.Network_Mainnet,
            },
            {
                label: 'Testnet',
                id: 2,
                value: NetworkEnum.Network_Testnet,
            },
        ],
    },

    availability: {
        title: '3. Data Availability',
        options: [
            {
                label: 'Polygon',
                id: 1,
                value: DALayerEnum.DALayer_PLG,
                icon: '/landingV3/images/pricing/1.png',
            },
            {
                label: 'Celestia',
                id: 1,
                value: DALayerEnum.DALayer_Celestia,
                icon: '/landingV3/images/pricing/2.png',
            },
            {
                label: 'NearDA',
                id: 1,
                value: DALayerEnum.DALayer_NearDa,
                icon: '/landingV3/images/pricing/3.png',
            },
            {
                label: 'Eigen',
                id: 1,
                value: DALayerEnum.DALayer_Eigen,
                icon: '/landingV3/images/pricing/4.png',
            },
            {
                label: 'Filecoin',
                id: 1,
                value: DALayerEnum.DALayer_FILECOIN,
                icon: '/landingV3/images/pricing/5.png',
            },
            {
                label: 'Avail',
                id: 1,
                value: DALayerEnum.DALayer_AVAIL,
                icon: '/landingV3/images/pricing/6.png',
            },
        ],
    },
    gas: {
        title: '4. Block gas limit',
        sub_title: 'Block gas limit',
        max: GAS_LITMIT,
    },
    withdrawal: {
        title: '4. Withdrawal time',
        sub_title: 'Block gas limit',
        max: WITHDRAWAL_PERIOD_BOOTSTRAP,
    },
};
