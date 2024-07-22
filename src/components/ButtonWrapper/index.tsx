import { Box } from "@chakra-ui/react";
import cs from "classnames";
import React, { PropsWithChildren } from "react";
import s from "./styles.module.scss";

interface IButtonWrapper extends PropsWithChildren {
  className?: string;
  style?: any;
  buttonType?: "positive" | "negative";
}

const ButtonWrapper: React.FC<IButtonWrapper> = ({
  children,
  className,
  style,
  buttonType = "positive",
}) => {
  if (buttonType === "negative") {
    return (
      <Box className={cs(s.containerNegative, className)} style={style}>
        {children}
      </Box>
    );
  }

  return (
    <Box className={cs(s.container, className)} style={style}>
      {children}
    </Box>
  );
};

export default ButtonWrapper;
