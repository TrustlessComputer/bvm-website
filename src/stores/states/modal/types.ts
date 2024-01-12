import { ReactNode } from "react";

export interface ModalComponentProps {
  id: string;
  render: ReactNode;
  className?: string;
  modalProps?: any;
  onClose?: Function;
  hideCloseButton?: boolean;
  size?: string;
  disableBgClose?: boolean;
}
