'use client';

import ContactUsModal from '@/components/ContactUsModal';
import ContactUsSuccessModal from '@/components/ContactUsSuccessModal';
import { PropsWithChildren, createContext, useMemo, useState } from 'react';
import { IContactUsContext } from './types';

export const ContactUsContext = createContext<IContactUsContext>({
  showContactUsModal: () => {},
});

export const ContactUsProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [isShowContactUsModal, setShowContactUsModal] = useState(false);
  const [showSubmitSuccessModal, setShowSubmitSuccessModal] = useState(false);

  const showContactUsModal = () => {
    setShowContactUsModal(true);
  };

  const value = useMemo(
    () => ({
      showContactUsModal,
    }),
    [showContactUsModal],
  );

  return (
    <ContactUsContext.Provider value={value}>
      {children}
      {isShowContactUsModal && (
        <ContactUsModal
          isShow={true}
          onHide={() => setShowContactUsModal(false)}
          onSuccesCB={() => {
            setShowContactUsModal(false);
            setShowSubmitSuccessModal(true);
          }}
        />
      )}
      {showSubmitSuccessModal && (
        <ContactUsSuccessModal
          isShow={true}
          onHide={() => setShowSubmitSuccessModal(false)}
        />
      )}
    </ContactUsContext.Provider>
  );
};
