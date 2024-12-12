import * as React from 'react';
import { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={1}
    height={1}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M10 14.166a.831.831 0 0 1-.588-.244L3.578 8.09A.832.832 0 1 1 4.757 6.91L10 12.155l5.244-5.245a.832.832 0 1 1 1.178 1.179l-5.833 5.833a.831.831 0 0 1-.59.244Z"
    />
  </svg>
);
export default SvgComponent;
