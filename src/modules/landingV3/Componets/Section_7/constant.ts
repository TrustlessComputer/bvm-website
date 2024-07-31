import { CDN_URL } from '@/config';

const CDN_URL_BLOGS = CDN_URL + '/nbc/images/blogs';

export interface IBlog {
  id: string;
  title: string;
  desc: string;
  logo: string;
  imageUrl: string;
  link: string;
  linkTarget: string;
}

export const LOGOS = [
  {
    id: 'cryptobriefing',
    img: 'landing/images/cryptobriefing.png'
  },
  {
    id: 'blockworks',
    img: 'landing/images/blockworks.png'
  },
  {
    id: 'cointelegraph_brazil',
    img: 'landing/images/cointelegraph_brazil.png'
  },
  {
    id: 'coindesk',
    img: 'landing/images/coindesk.png'
  }
]

const BLOGS = [
  {
    id: '16',
    title: `Bitcoin developer sees ‘Bitcoin’s L2 era’ as key to mass adoption`,
    desc: `Punk 3700, one of the developers behind Bitcoin Virtual Machine, assesses the potential of layer-two blockchains on top of Bitcoin as an important narrative in crypto's landscape for 2024.`,
    logo: 'cryptobriefing',
    imageUrl: `${CDN_URL_BLOGS}/Bitcoin-constructions-1024x585.webp`,
    link: 'https://cryptobriefing.com/exploring-future-developers-insight-bitcoins-l2-era/',
    linkTarget: '_blank',
  },
  {
    id: '7',
    title: `DeFi on Bitcoin? Bitcoin Virtual Machine Says Yes`,
    desc: `Developers can build decentralized apps on Bitcoin using Solidity smart contracts`,
    logo: 'blockworks',
    imageUrl: `${CDN_URL_BLOGS}/Blockworks.webp`,
    link: 'https://blockworks.co/news/defi-on-bitcoin',
    linkTarget: '_blank',
  },

  {
    id: '6',
    title: `Bitcoin faster? Project uses Optimism to generate blocks every 2 seconds`,
    desc: `Blockchain NOS aims to give scalability to the decentralized ecosystem created on Bitcoin, says Punk 3700, one of the developers behind the project`,
    logo: 'cointelegraph_brazil',
    imageUrl: `${CDN_URL_BLOGS}/CoinTelegraph_Brazil_02.jpeg`,
    link: 'https://br.cointelegraph.com/news/bitcoin-becoming-faster-project-uses-optimism-to-generate-blocks-with-2-second-time',
    linkTarget: '_blank',
  },
  {
    id: '2',
    title:
      'Developers Deploy Uniswap Contracts on Bitcoin as BRC20-Based SHIB, PEPE Gain Popularity',
    desc: 'A group of developers at @TrustlessOnBTC have deployed Uniswap’s smart contracts onto the Bitcoin network to capitalize on the rise of BRC-20 tokens and develop the decentralized finance ecosystem.',
    logo: 'coindesk',
    imageUrl: `${CDN_URL_BLOGS}/Coindesk.png`,
    link: 'https://www.coindesk.com/tech/2023/05/11/developers-deploy-uniswap-contracts-on-bitcoin-as-brc20-based-shib-pepe-gain-popularity/?utm_content=editorial&utm_term=organic&utm_medium=social&utm_source=twitter&utm_campaign=coindesk_main',
    linkTarget: '_blank',
  },

  {
    id: '1',
    title: 'What Are BRC-20 Tokens? Explaining the Bitcoin Memecoin Hype',
    desc: `"Memecoins" on Bitcoin is probably not what Satoshi Nakamoto envisioned when he released the Bitcoin whitepaper in 2008, but it just might be the mass adoption Bitcoin deserves.`,
    logo: 'coinmarketcap',
    imageUrl: `${CDN_URL_BLOGS}/CoinMarketCap.png`,
    link: 'https://coinmarketcap.com/alexandria/article/what-are-brc20-tokens',
    linkTarget: '_blank',
  },
  {
    id: '8',
    title: `Trustless Computer Deploys Uniswap v2 Smart Contracts: Huge Milestone For Bitcoin`,
    desc: `The emergence of #Ordinals and #BRC20 tokens has led to a renaissance period for #Bitcoin  
    With their deployment of Uniswap v2 smart contracts on #BTC, @TrustlessOnBTC is right at the forefront of this exciting development`,
    logo: 'influencive',
    imageUrl: `${CDN_URL_BLOGS}/Influencive.png`,
    link: 'https://twitter.com/Influencive/status/1657455923692986370',
    linkTarget: '_blank',
  },
  {
    id: '12',
    title: `Bitcoin Transactions Hit Record High as New Token Type Takes Off`,
    desc: `Bitcoin Virtual Machine enables its own form of fungible tokens, called SBRC-20s, punk3700, a pseudonymous core contributor to Bitcoin Virtual Machine, told The Defiant.`,
    logo: 'the_defiant',
    imageUrl: `${CDN_URL_BLOGS}/defiant.png`,
    link: 'https://thedefiant.io/bitcoin-transactions-hit-record-high-as-new-token-type-takes-off',
    linkTarget: '_blank',
  },
  {
    id: '13',
    title: `A New Bitcoin-Based Arcade Game Is Leaving a Mark on Gamers`,
    desc: `A platform that went live last week looks to expand bitcoin usage by attracting players to win-to-earn games that run wholly on the Bitcoin blockchain.`,
    logo: 'coindesk',
    imageUrl: `${CDN_URL_BLOGS}/13.png`,
    link: 'https://www.coindesk.com/tech/2023/08/02/a-new-bitcoin-based-arcade-game-is-leaving-a-mark-on-gamers/?utm_content=editorial&utm_medium=social&utm_term=organic&utm_campaign=coindesk_main&utm_source=twitter',
    linkTarget: '_blank',
  },
  {
    id: '14',
    title: `Bricks to Bitcoins: The New Bitcoin City`,
    desc: `The newly launched Bitcoin City, unveiled just last week, provides a place for game enthusiasts to engage in casual games, board games, and strategic challenges, all of which run on BTC, both on web and mobile devices. Alongside this, the platform showcases NFT auctions and features its very own marketplace.`,
    logo: 'gamestarter',
    imageUrl: `${CDN_URL_BLOGS}/14.png`,
    link: 'https://gamestarter.com/blog/the-new-bitcoin-city',
    linkTarget: '_blank',
  },
  {
    id: '15',
    title: `A New Bitcoin Based Arcade Game Is Making Waves Among Gamers`,
    desc: `New Bitcoin City Platform Elevates Gaming with Payouts and NFTs on the Bitcoin Blockchain.`,
    logo: 'clout_scoop',
    imageUrl: `${CDN_URL_BLOGS}/15.png`,
    link: 'https://cloutscoop.com/2023/08/02/a-new-bitcoin-based-arcade-game-is-making-waves-among-gamers/',
    linkTarget: '_blank',
  },
  {
    id: '9',
    title: `BRC-721: The Token Standard Defying Bitcoin’s 4MB Storage Limit`,
    desc: `Just a few months later, on May 22, members of the Spirit DAO — a coalition of collectors devoted to elevating the Azuki universe — effectively blew Wertheimer’s record out of the water. By minting a 6.9MB Comic Banner on Bitcoin, the DAO stole the crown, solidifying the piece as the largest file size stored on BTC to date.`,
    logo: 'NFTNow',
    imageUrl: `${CDN_URL_BLOGS}/NFTNow.png`,
    link: 'https://nftnow.com/features/brc-721-the-token-standard-defying-bitcoins-4mb-storage-limit/',
    linkTarget: '_blank',
  },
  {
    id: '3',
    title:
      'Ordinals turned Bitcoin into a worse version of Ethereum: Can we fix it?',
    desc: 'The launch of BRC-20 tokens and Ordinals NFTs on Bitcoin has transformed the No. 1 blockchain overnight into a clunkier version of Ethereum.',
    logo: 'cointelegraph',
    imageUrl: `${CDN_URL_BLOGS}/CoinTelegraph.jpeg`,
    link: 'https://cointelegraph.com/magazine/ordinals-turned-bitcoin-into-a-worse-version-of-ethereum-can-we-fix-it/',
    linkTarget: '_blank',
  },

  {
    id: '4',
    title:
      'The Blocksize Wars Revisited: How Bitcoin’s Civil War Still Resonates Today',
    desc: 'Today’s debates over non-monetary uses of Bitcoin like ordinals and BRC-20 tokens echo the battle between Big and Small Blockers between 2015 and 2017. This article, by Daniel Kuhn, is part of our “CoinDesk Turns 10” series.',
    logo: 'coindesk',
    imageUrl: `${CDN_URL_BLOGS}/Coindesk-02.png`,
    link: 'https://www.coindesk.com/consensus-magazine/2023/05/17/the-blocksize-wars-revisited-how-bitcoins-civil-war-still-resonates-today/',
    linkTarget: '_blank',
  },
  {
    id: '5',
    title: `DeFi is Coming to Bitcoin': Expert Talks Changes to Ordinals`,
    desc: `Punk 3700, as the developer who integrates New Bitcoin City identifies himself, comments on Bitcoin's potential to become an efficient data layer`,
    logo: 'cointelegraph_brazil',
    imageUrl: `${CDN_URL_BLOGS}/CoinTelegraph_Brazil.jpeg`,
    link: 'https://br.cointelegraph.com/news/defi-is-coming-to-bitcoin-says-expert',
    linkTarget: '_blank',
  },
  {
    id: '10',
    title: `Smart Contracts on Bitcoin? Here’s All You Need to Know`,
    desc: `Move over Ethereum, Bitcoin is now the new home for dApps! The first smart contract is born on Bitcoin and its name is $GM – a memecoin with groundbreaking potential. Moreover, the birth of BRC-721 tokens surpasses its precursor BRC-20 and delivers cutting edge abilities to the Bitcoin blockchain.`,
    logo: 'NFTEvening',
    imageUrl: `${CDN_URL_BLOGS}/NFTEvening.webp`,
    link: 'https://nftevening.com/smart-contracts-on-bitcoin-heres-all-you-need-to-know/?swcfpc=1',
    linkTarget: '_blank',
  },
  {
    id: '11',
    title: `Exploring The New Bitcoin City Ecosystem With its Unique DEX`,
    desc: `New Bitcoin DEX allows for seamless token swaps, liquidity pool creation, and decentralized token launches, providing users greater control and security over their digital assets.`,
    logo: 'bsc_news',
    imageUrl: `${CDN_URL_BLOGS}/BSCNews.jpeg`,
    link: 'https://www.bsc.news/post/exploring-the-new-bitcoin-city-ecosystem-with-its-unique-dex',
    linkTarget: '_blank',
  },
];

export { BLOGS };
