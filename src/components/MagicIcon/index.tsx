import { ReactElement } from 'react';

export default function MagicIcon({
  color,
}: {
  color: 'white' | 'black';
}): ReactElement {
  return (
    <div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_38364_48276)">
          <path
            d="M4.95164 2.74286L6.8564 3.80952L5.7897 1.90476L6.8564 0L4.95164 1.06667L3.04688 0L4.11354 1.90476L3.04688 3.80952L4.95164 2.74286Z"
            fill={color}
          />
          <path
            d="M14.0949 10.2073L12.1902 9.14062L13.2569 11.0454L12.1902 12.9501L14.0949 11.8835L15.9997 12.9501L14.933 11.0454L15.9997 9.14062L14.0949 10.2073Z"
            fill={color}
          />
          <path
            d="M15.9997 0L14.0949 1.06667L12.1902 0L13.2569 1.90476L12.1902 3.80952L14.0949 2.74286L15.9997 3.80952L14.933 1.90476L15.9997 0Z"
            fill={color}
          />
          <path
            d="M10.2096 4.03521C9.90479 3.73045 9.44765 3.73045 9.14289 4.03521L0.228571 12.9495C-0.0761905 13.2543 -0.0761905 13.7114 0.228571 14.0162L1.98095 15.7685C2.28571 16.0733 2.74286 16.0733 3.04762 15.7685L11.9619 6.85426C12.2667 6.5495 12.2667 6.09236 11.9619 5.78759L10.2096 4.03521ZM9.37146 8.22569L7.77146 6.62569L9.60003 4.79712L11.2 6.39712L9.37146 8.22569Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip0_38364_48276">
            <rect width="16" height="16" fill={color} />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}