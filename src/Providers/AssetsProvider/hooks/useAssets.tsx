import { useContext } from 'react';
import { IAssetsContext } from '@/Providers/AssetsProvider/types';
import { AssetsContext } from '@/Providers/AssetsProvider';

export function useAssets(): IAssetsContext {
  return useContext(AssetsContext);
}
