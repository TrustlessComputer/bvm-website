import { IDappConfigs, ITemplate, TemplateType } from '@/services/api/dapp/types';

const getMockupTemplate  = (configs: IDappConfigs): ITemplate => ({
    templateType: TemplateType.TEMPLATE_1,
    logo: "",
    backupLogo: 'https://static-00.iconduck.com/assets.00/bitcoin-icon-2048x2048-t8gwld81.png',
    backgroundImage: "https://storage.googleapis.com/tc-cdn-prod/images/background_template_1.png",
    appName: configs.app_name || '',
    headerMenu: [],
    template_1: {
        contentText: {
            first: "BUILD ",
            last: "ON BITCOIN",
            headings: [
                'BRC-20 DEXS',
                'BRC-20 FUTURES',
                'BRC-20 LENDING',
                'BRC-20 STABLECOINS',
                'ANY DEFI APP',
            ],
            headingsColors: [
                '#6633CE',
                '#FF3DB4',
                '#00BC78',
                '#00A399',
                '#D9C63F'
            ],
            desc: `${configs.app_name} is a low-cost and lightning-fast Bitcoin Layer 2 blockchain designed for DeFi apps on Bitcoin, allowing for the payment of gas fees in Bitcoin.`,
        },
    },
})

export {
    getMockupTemplate,
}
