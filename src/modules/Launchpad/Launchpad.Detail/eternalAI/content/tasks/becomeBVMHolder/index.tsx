import {Flex, Text} from "@chakra-ui/react";
import s from './styles.module.scss';
import {EXCHANGES, IExchange} from "@/modules/Launchpad/Launchpad.Detail/eternalAI/content/tasks/becomeBVMHolder/data";

const BecomeBVMHolder = () => {

  return (
    <Flex className={s.container}>
      <Text className={s.title}>Become a BVM holder.</Text>
      <Text className={s.description}>It’s easy to become a holder. Just buy BVM from your favorite exchanges.</Text>
      <Flex className={s.listExchanges}>
        {
          EXCHANGES.map((ex: IExchange) => {
            return (
              <Flex className={s.exchangeItem} onClick={() => {
               window.open(ex.url, '_blank')
              }}
                    bg={ex.image ? '#FFF' : '#6633CE'}
                    color={ex.image ? '#6633CE' : '#FFF'}
              >
                {
                  ex.image && <img src={ex.image} />
                }
                {ex.name}
              </Flex>
            )
          })
        }
      </Flex>
    </Flex>
  )
};

export default BecomeBVMHolder;
