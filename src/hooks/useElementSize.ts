import React from 'react';

interface IProps {
  elementID: string
}

const useElementSize = ({ elementID }: IProps) => {
  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);

  const checkElementHeight = () => {
    if (!elementID) return
    const element = document.getElementById(elementID);
    if (element) {
      setHeight(element.offsetHeight);
      setWidth(element.offsetWidth);
    }
  }

  React.useEffect(() => {
    checkElementHeight();
  }, [])

  return {
    height,
    width
  }
}

export default useElementSize
