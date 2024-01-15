import React from 'react';

interface IProps {
  init?: boolean | undefined;
}

const useToggle = (props?: IProps) => {
  const [toggle, setToggle] = React.useState<boolean>(!!props?.init);

  const onToggle = () => setToggle((value: boolean) => !value);

  return {
    toggle,
    onToggle
  }
};

export default useToggle;
