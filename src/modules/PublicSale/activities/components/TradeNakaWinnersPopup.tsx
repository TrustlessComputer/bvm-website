import BaseModal, { IBaseModalProps } from '@/components/BaseModal';

interface IProps extends IBaseModalProps {
}

const TradeNakaWinnersPopup = ({ isShow, onHide }: IProps) => {
  return (
    <BaseModal isShow={isShow} onHide={onHide} title="Winners" size="small">
      <div>HEHE</div>
    </BaseModal>
  )
}

export default TradeNakaWinnersPopup;
