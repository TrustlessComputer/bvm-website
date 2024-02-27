import s from './styles.module.scss'
import CardCategory from '@/modules/bvm-sct-landing/Components/CardCategory';

const dataCategory = [
  {
    id: 0,
    title: 'Local Mempool',
    description: 'As part of the system, each node maintains a collection of transactions that the user sends to the node in a local mempool. The mempool will help to verify the validation of the transaction before it is written to the Bitcoin network.',
    bgImage: '#ffd73b',
    image: '/bvm-sct/sm1-re.png',
  },
  {
    id: 1,
    title: 'Ethereum-like VM',
    description: 'Our BVM state is an Ethereum-compatible virtual machine. The framework has been configured to support larger transaction sizes and higher block gas limits, enabling us to support more kinds of applications.',
    bgImage: '#35cca6',
    image: '/bvm-sct/sm2-re.png',
  },
  {
    id: 2,
    title: 'TxWriter',
    description: 'Essentially, the BVM transaction data is embedded into a Bitcoin transaction via the witness data field. This embedding is done in a way that does not affect the verification process and has no impact on the transaction logic.',
    bgImage: '#74c9e4',
    image: '/bvm-sct/sm4-re.png',
  },
  {
    id: 3,
    title: 'TxReader',
    description: 'This module is responsible for filtering BVM transactions in every new Bitcoin block and ensuring that the state of the BVM is consistent across all BVM nodes in the network, even in the event of a reorg.',
    bgImage: '#a0befa',
    image: '/bvm-sct/sm3-re.png',
  },
]

export default function Categories() {
  return <div className={s.categoriesWrapper}>
    <div className={'container'}>
      {
        dataCategory.map((item) => {
          return <CardCategory key={item.id} {...item} className={s.card}/>
        })
      }
    </div>
  </div>;
}

