import s from './styles.module.scss';
import {Box} from "@chakra-ui/react";
import AboveTheFold from "./aboveTheFold";

const PrivateSaleModule = () => {
  return (
    <Box className={s.container}>
      <AboveTheFold />
    </Box>
  );
};

export default PrivateSaleModule;
