'use client';

import { useContext } from 'react';
import { ContactUsContext } from '.';
import { IContactUsContext } from './types';

export const useContactUs = (): IContactUsContext => {
  const context = useContext(ContactUsContext);
  if (!context) {
    throw new Error(
      'ContactUsContext not found, useContactUs must be used within the ContactUsProvider',
    );
  }
  return context;
};
