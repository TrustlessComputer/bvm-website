import React from 'react';

interface IProps {
  elementID: string
}

const useElementHeight = ({ elementID }: IProps) => {
  const [height, setHeight] = React.useState(0);

  const checkElementHeight = () => {
    if (!elementID) return
    const element = document.getElementById(elementID);
    if (element) {
      setHeight(element.offsetHeight);
    }
  }

  React.useEffect(() => {
    checkElementHeight();
    setInterval(() => {
      checkElementHeight();
    }, 1000)
  }, [])

  return {
    height
  }
}

export default useElementHeight
