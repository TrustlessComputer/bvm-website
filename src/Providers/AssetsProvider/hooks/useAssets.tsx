import { useContext } from 'react';
import { IAssetsContext } from '@/Providers/AssetsProvider/types';
import { AssetsContext } from '@/providers/AssetsProvider';

export function useAssets(): IAssetsContext {
  return useContext(AssetsContext);
}
