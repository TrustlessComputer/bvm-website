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
      element.addEventListener('resize', () => {
        console.log('SANG TEST');
      })

    }

  }

  React.useEffect(() => {
    checkElementHeight();
    setInterval(() => {
      checkElementHeight();
    }, 3000)
  }, [])

  return {
    height
  }
}

export default useElementHeight
