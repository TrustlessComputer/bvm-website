import { PropsWithChildren } from 'react';

interface ISectionContentProps extends PropsWithChildren {
  title: string,
  subTitle: string,
  image: string,
  button?: { link: string, title: string, target?: '_blank' | '_self' | '_top' },
  button2?: { link: string, title: string, target?: '_blank' | '_self' | '_top' },
  direction?: 'left' | 'right'
}
