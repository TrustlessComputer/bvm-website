/* eslint-disable @typescript-eslint/ban-types */
import { Box } from '@chakra-ui/react'
import cx from 'classnames'

import styles from './styles.module.scss'

interface IconProps {
  size: number | string
  open: boolean
  color: string
  onClick?: Function
}
const IconPlusToMinus = (props: IconProps) => {
  const { size, open, color = 'grey' } = props
  return (
    <Box _before={{ backgroundColor: color }} _after={{ backgroundColor: color }} className={cx(styles.box, open && styles.open)} position='relative' w={size} h={size} />
  )
}

export default IconPlusToMinus