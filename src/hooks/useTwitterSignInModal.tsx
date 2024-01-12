import SignInWrapper, { SIGN_IN_MODAL } from '@/modules/SignIn';
import { closeModal, openModal } from '@/stores/states/modal/reducer';
import { useDispatch } from 'react-redux';

const useTwitterSignInModal = () => {
  const dispatch = useDispatch();

  const openSignInModal = () => {
    dispatch(
      openModal({
        id: SIGN_IN_MODAL,
        className: 'signIn_modal',
        render: <SignInWrapper />,
      }),
    );
  };

  const closeSignInModal = () => {
    dispatch(closeModal({ id: SIGN_IN_MODAL }));
  };

  return {
    openSignInModal,
    closeSignInModal,
  };
};

export default useTwitterSignInModal;
