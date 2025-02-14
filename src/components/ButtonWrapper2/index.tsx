import { Box, Flex } from "@chakra-ui/react";
import cs from "classnames";
import React, { PropsWithChildren } from "react";
import s from "./styles.module.scss";

interface IButtonWrapper extends PropsWithChildren {
  className?: string;
  style?: any;
  buttonType?: "rune" | "pump";
  bg?: string;
  colorName?: string;
}

const ButtonWrapper: React.FC<IButtonWrapper> = ({
  children,
  bg = "#fff",
  className,
  style,
  buttonType = "rune",
  colorName,
}) => {
  const buttonColorName = React.useMemo(() => {
    switch (colorName) {
      case "red":
        return "rgba(255, 71, 71, 1)";
      case "gold":
        return "#ED8F00";
      case "green":
        return "rgba(0, 170, 108, 1)";
      case "transparent":
        return "transparent";
      default:
        return colorName;
    }
  }, [colorName]);

  if (buttonType === "pump") {
    return (
      <Box
        bg={buttonColorName || bg}
        className={cs(s.buttonPump, className)}
        style={style}
        _hover={{background: colorName === 'green' ? '#037a4f' : colorName === 'red' ? '#cd3d3d' : buttonColorName || bg}}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box bg={bg} className={cs(s.container, className)} style={style}>
      <Flex className={s.child}>{children}</Flex>
    </Box>
  );
};

export default ButtonWrapper;
