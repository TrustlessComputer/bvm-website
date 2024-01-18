import React, { useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';

const HTML2PNG: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current!, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'my-image-name.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])

  return (
    <>
      <div ref={ref}>
        {/* DOM nodes you want to convert to PNG */}
        hahahah
      </div>
      <button onClick={onButtonClick}>Click me</button>
    </>
  )
}

export default HTML2PNG;
