import s from './styles.module.scss'
import CardCategory from '@/modules/BitcoinL2S/Components/CardCategory';

const dataCategory = [
  {
    id: 0,
    image: '/bitcoin-l2s/layer1.png',
    title: 'Layer 1',
    content: [
      {
        heading: 'Data Validation',
        description: <>
          <p>The foundation of the Bitcoin L2 software stack is the Data Validation component. This component significantly impacts the security model of the whole stack. Everything else in the entire stack is derived from the Data Validation component.</p>
        </>
      },
      {
        heading: 'Data Availability',
        description: <>
          <p>
            For pragmatic reasons, a Bitcoin L2 currently stores data on Bitcoin and another network, depending on your needs. Bitcoin is arguably the most secure blockchain. Your Bitcoin L2 will store the data hash on Bitcoin. Polygon, for example, is the most cost-effective storage solution. Your Bitcoin L2 will store the data (compressed transactions) on Polygon.
          </p>
          <p>Otherwise, you can choose your DA layer among Ordinals, Celestia, Eigen, NearDA, and Avail.</p>
        </>
      },
      {
        heading: 'Smart Contract Platform',
        description: <>
          <p>
            Bitcoin Virtual Machine #0 is a special computer. It is a modified version of the EVM that adds smart contracts to Bitcoin. Bitcoin Virtual Machine #0 is used to glue all the components of the Bitcoin L2 software stack together.
          </p>
        </>
      },
      {
        heading: 'Decentralized Sequencing',
        description: <p>We're actively working on decentralizing the sequencer. ETA: Q3 2023.</p>,
      },
    ]
  },
  {
    id: 1,
    image: '/bitcoin-l2s/layer2.png',
    title: 'Layer 2',
    content: [
      {
        heading: 'Sequencer',
        description: <>
          <p>A sequencer (block producer) determines how transactions are collected and published to Layer 1.</p>
          <p>The sequencer compresses transactions into batches, then writes these batches to the Data Availability layer, and writes the hash to Bitcoin via Bitcoin Virtual Machine to ensure data availability and integrity.</p>
        </>
      },
      {
        heading: 'Rollup Node',
        description: <>
          <p>The Rollup node defines how the raw data stored in the Data Availability component is processed to form the inputs for the Execution Engine.</p>
          <p>This is also referred to as the Derivation component, which derives the L2 blocks from the L1 blocks.</p>
        </>
      },
      {
        heading: 'Execution Engine',
        description: <>
          <p>The Execution Engine defines the state transition function. It takes inputs from the Rollup node, executes on the current state, and outputs the new state.</p>
          <p>op-geth is a modified version of the EVM that adds support for L2 transactions.</p>
        </>
      }
    ]
  },
  {
    id: 2,
    image: '/bitcoin-l2s/layer3.png',
    title: '',
    content: [
      {
        heading: 'Settlement',
        description: <>
          <p>The Settlement component commits the Merkle root of the new state (the output from the Execution Engine) to Bitcoin.</p>
          <p>Note that the state roots are not immediately valid. In an optimistic rollup setup, state commitments are published onto Bitcoin as pending validity for a period (currently, set as 7 days) and subject to challenge.</p>
          <p>The Optimism team is developing the fault-proof process. Once it’s completed, we’ll add it to the Bitcoin L2.</p>
        </>
      },
      {
        heading: 'Bridges',
        description: <>
          <p>Users can deposit Bitcoin assets (BTC and BRC-20 tokens) from Bitcoin to Alpha and, vice versa, withdraw
            them back.</p>
          <strong>For example, to deposit BTC from Bitcoin to Alpha:</strong>
          <ol>
            <li>Wrap BTC to WBTC via Trustless Bridge</li>
            <li>Deposit WBTC to NOS via <a href={'https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/L1StandardBridge.sol'} target={'_blank'}>L1StandardBridge</a> contract</li>
          </ol>
          <strong>To withdraw BTC from NOS to Bitcoin</strong>
          <ol>
            <li>Initiate a withdrawal on Alpha</li>
            <li>Wait for the next Merkle root to be committed to Bitcoin</li>
            <li>Submit the withdrawal proof</li>
            <li>After the fault challenge period ends, withdraw your WBTC</li>
            <li>Unwrap WBTC to BTC via Trustless Bridge</li>
          </ol>
        </>
      },
    ]
  },
]

const CategoriesL2S = () => {
  return (
    <div className={s.wrapperCategory}>
      <div className="container">
        {
          dataCategory.map((item, index) => {
            return (
              <CardCategory
                key={item.id}
                thumbnail={item.image}
                title={item.title}
                content={item.content}
                className={s.card}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default CategoriesL2S
