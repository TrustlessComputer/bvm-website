import React from 'react'
import ModuleArchitectureCard from '@/modules/aiLandingModule/components/ModuleArchitectureCard';
import s from './style.module.scss'

const FAKE_DATA = [
  {
    id: 1,
    thumbnail: '/bvm-eternal/chart01.png',
    content: [
      {
        id: 1,
        heading: 'Model Collection',
        description: <p>The Model Collection utilizes the well-established ERC-721 smart contract to oversee the ownership of neural network models. Once the model is deployed on the blockchain, developers may consider minting their model contract to incorporate it into the primary collection.</p>
      },
      {
        id: 2,
        heading: 'Model Collection',
        description: <><p>Model smart contracts are in charge of carrying out specific machine learning operations. While they can perform various tasks, they share three standard functions.</p>
          <ul>
            <li>Set up model config</li>
            <li>Upload model weights</li>
            <li>Inference or Evaluate</li>
          </ul>
        </>
      }
    ]
  },
  {
    id: 2,
    thumbnail: '/bvm-eternal/chart02.png',
    content: [
      {
        id: 3,
        heading: 'Notable Features',
        description: <p>The Model Collection utilizes the well-established ERC-721 smart contract to oversee the ownership of neural network models. Once the model is deployed on the blockchain, developers may consider minting their model contract to incorporate it into the primary collection.</p>
      },
      {
        id: 4,
        heading: 'Upcoming Features',
        description: <><p>Model smart contracts are in charge of carrying out specific machine learning operations. While they can perform various tasks, they share three standard functions.</p>
          <ul>
            <li>Set up model config</li>
            <li>Upload model weights</li>
            <li>Inference or Evaluate</li>
          </ul>
        </>
      }
    ]
  }
]

const ModuleArchi = () => {
  return (
    <div className={s.wrapper}>
      <div className={`${s.container}  container`}>
        {
          FAKE_DATA.map((item) => {
            return <ModuleArchitectureCard data={item} key={item.id} className={s.card}/>
          })
        }
      </div>
    </div>
  )
}

export default ModuleArchi
