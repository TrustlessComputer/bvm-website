import { ProposalType } from '@/contract/proposal/proposal.interface';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import cs from 'classnames';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';

type Props = {
  proposalType?: ProposalType;
  onItemSelected: (type: ProposalType) => void;
};

const DropDownProposalType = (props: Props) => {
  const { proposalType, onItemSelected } = props;
  const propsalTypes = [
    {
      title: 'New launchpad proposal',
      value: ProposalType.project,
    },
    {
      title: 'Funding request for BVM community growth',
      value: ProposalType.marketing,
    },
  ];

  const selectedProposalType = propsalTypes.find(
    (data) => data.value === proposalType,
  );

  const renderDropDownItem = (
    proposal: any,
    rightIcon?: boolean,
    isLastItem?: boolean,
  ) => {
    return (
      <div className={cs(s.rowDropDownItem, isLastItem ? s.lastItem : null)}>
        <div className={s.groupIconName}>
          <p className={s.tokenSymbol}>{proposal?.title}</p>
        </div>
        {rightIcon && <SvgInset svgUrl={`icons/ic-arrow-down.svg`} />}
      </div>
    );
  };

  return (
    <div className={s.container}>
      <Menu>
        {() => {
          return (
            <>
              <MenuButton className={s.dropDownToggle} type="button">
                {selectedProposalType &&
                  renderDropDownItem(selectedProposalType, true, true)}
              </MenuButton>
              <MenuList className={s.menuList}>
                {propsalTypes.map((data, index) => {
                  return (
                    <MenuItem onClick={() => onItemSelected(data.value)}>
                      {renderDropDownItem(
                        data,
                        false,
                        index === propsalTypes.length - 1,
                      )}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </>
          );
        }}
      </Menu>
    </div>
  );
};

export default DropDownProposalType;
