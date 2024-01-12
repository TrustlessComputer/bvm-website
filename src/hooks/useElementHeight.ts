import React from 'react';

interface IProps {
  elementID: string
}

const useElementHeight = ({ elementID }: IProps) => {
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (!elementID) return
    const element = document.getElementById(elementID);
    if (element) {
      setHeight(element.offsetHeight)
    }
  }, [])

  return {
    height
  }
}

export default useElementHeight
