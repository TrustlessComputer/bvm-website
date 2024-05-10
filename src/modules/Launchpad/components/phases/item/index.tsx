import { Badge } from '@chakra-ui/react';
import cx from 'clsx';
import s from './styles.module.scss';

const PhaseItem = ({ data, className }: { data: any; className?: string }) => {
  return (
    <Badge className={cx(s.container, s[data.status], className)}>
      <span>{data.key}</span>
      {data.title}
      {data.status === 'done' && (
        <svg
          width="15"
          height="12"
          viewBox="0 0 15 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.668 1.83301L5.33464 10.1663L1.16797 5.99967"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
      {data.status === 'running' && (
        <img
          src={`/images/launchpad/loading.svg`}
          alt={''}
          className={s.loading}
        />
      )}
    </Badge>
  );
};

export default PhaseItem;
