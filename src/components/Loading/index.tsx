import cn from 'classnames';
import s from './styles.module.scss';
import { Spinner } from '@chakra-ui/react';

export default function Loading({ className }: { className?: string }) {
  return (
    <div className={cn(className, s.loading)}>
      <Spinner size="md" speed="0.65s" emptyColor="gray.200" color="blue.500" />
    </div>
  );
}
