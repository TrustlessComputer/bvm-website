import toast from 'react-hot-toast';
import ToastMessage from './ToastMessage';

export const showError = ({
  url,
  linkText,
  message,
  description,
}: {
  url?: string;
  linkText?: string;
  message: string;
  description?: string;
}) => {
  toast.error(
    (t) => (
      <ToastMessage
        id={t.id}
        message={message}
        url={url}
        linkText={linkText}
        description={description}
      />
    ),
    {
      duration: 5000,
      style: {
        borderLeft: '4px solid #FF4747',
        maxWidth: '300px',
        borderColor: 'var(--block-bg)',
        padding: `10px`,
        justifyContent: 'space-between',
        background: 'var(--block-bg)',
        borderRadius: '8px',
        alignItems: 'flex-start',
      },
      position: 'bottom-right',
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    },
  );
};

export const showSuccess = ({
  url,
  linkText,
  message,
  description,
}: {
  url?: string;
  linkText?: string;
  description?: string;
  message: string;
}) => {
  toast.success(
    (t) => (
      <ToastMessage
        id={t.id}
        message={message}
        url={url}
        linkText={linkText}
        description={description}
      />
    ),
    {
      duration: 5000,
      style: {
        maxWidth: '300px',
        borderColor: 'var(--block-bg)',
        borderLeft: '2px solid #62d344',
        padding: `10px`,
        justifyContent: 'space-between',
        background: 'var(--block-bg)',
        borderRadius: '8px',
        alignItems: 'flex-start',
      },
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
      position: 'bottom-right',
    },
  );
};

export const removeToast = () => {
  toast.remove();
};

export const showValidateError = (msg: string) => {
  toast.error(msg, {
    icon: null,
    style: {
      borderColor: 'blue',
      color: 'blue',
    },
    duration: 3000,
    position: 'bottom-center',
  });
};
