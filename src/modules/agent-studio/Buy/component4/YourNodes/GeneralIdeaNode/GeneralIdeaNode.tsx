import React from 'react';

import { DappNode as DappNodeProps } from '@/types/node';
import { useSignalEffect } from '@preact/signals-react';
import { NodeProps } from '@xyflow/react';
import { FieldKeyPrefix } from '../../../contants';
import { draggedDappIndexesSignal } from '../../../signals/useDragSignal';
import { adjustBrightness } from '../../../utils';
import Draggable from '../../Draggable';
import Droppable from '../../Droppable';
import Lego from '../../Lego';
import NodeV3 from '../../Node_v3/Node';

import sleep from '@/utils/sleep';
import ResetButton from '../../../component_v5/ResetButton_V2';
import SubmitButton from '../../../component_v5/SubmitButton';
import DraftingIcon from '../../../component_v5/icons/DraftingIcon';
import NodeNotification_V2 from '../NodeNotification_V2';
import { GeneralIdeaContent } from './GeneralIdeaNode_Content';
import { useGeneralIdeaStore } from './useGeneralIdeaStore';

const STATUS = {
  statusCode: 'drafting_modules',
  statusStr: 'Drafting Modules',
  statusColorStr: '#E59700',
  borderColorStr: '#FFC700',
  bgColorStr: '#FFF6D8',
  fontStyle: 'italic',
  textDecorationLine: 'none',
};

const GeneralIdeaNode = ({ data, id }: NodeProps<DappNodeProps>) => {
  const { dapp } = data;

  const { stepper, setStepper, setLoading, isLoading, setTextArea, resetData } =
    useGeneralIdeaStore();
  const adada = useGeneralIdeaStore();
  console.log('GeneralIdeaNode --- ', {
    stepper,
    setStepper,
    setLoading,
    isLoading,
  });
  const [draggedDappIndexes, setDraggedDappIndexes] = React.useState<number[]>(
    [],
  );

  const dappIndex = React.useMemo(
    () => draggedDappIndexes[data.baseIndex],
    [data.baseIndex, draggedDappIndexes],
  );

  useSignalEffect(() => {
    setDraggedDappIndexes(draggedDappIndexesSignal.value);
  });

  const renderDefaultContentBox = () => {
    return (
      <>
        <Draggable
          disabled={false}
          id={`right-${FieldKeyPrefix.BASE}-${data.baseIndex}`}
          value={{
            dappIndex,
            title: dapp.baseBlock.title,
            icon: dapp.baseBlock.icon,
            fieldKey: dapp.baseBlock.key,
            background: dapp.color_border || dapp.color,
          }}
        >
          <Droppable
            id={`right-${FieldKeyPrefix.BASE}-${data.baseIndex}`}
            style={{
              width: 'max-content',
              height: 'max-content',
            }}
          >
            <Lego
              first={false}
              last={false}
              titleInLeft
              titleInRight={false}
              zIndex={1}
              vertical
              background={adjustBrightness(dapp.color, 0)}
              {...dapp.baseBlock.fields[0]}
            >
              <GeneralIdeaContent />
            </Lego>
          </Droppable>
        </Draggable>
      </>
    );
  };

  const renderContentBox = () => {
    return renderDefaultContentBox();
  };

  if (typeof dappIndex === 'undefined') {
    return null;
  }

  const submitOnClickHandler = async () => {
    switch (stepper) {
      case 1:
        {
          setLoading(true);

          // TO DO

          // Author [Trinh senpai]
          // const result: string = await call API get abc...xyz
          // setTextArea(result)

          await sleep(5);

          // Turn off Loading
          setLoading(false);

          //Next Step 2
          setStepper(2);
        }
        break;

      case 2:
        {
          //TO DO
          //Show Popup AI Chat?
        }
        break;
      default:
        break;
    }
  };

  const resetOnClickHandler = async () => {
    resetData();
  };

  return (
    <NodeV3
      {...data}
      notificationV2={
        <NodeNotification_V2
          resetButton={<ResetButton onClick={resetOnClickHandler} />}
          submitButton={
            <SubmitButton
              isLoading={isLoading}
              onClick={isLoading ? undefined : submitOnClickHandler}
              title={
                stepper === 1 ? 'Generate personality' : 'Interact with Agent'
              }
            />
          }
        />
      }
      key={JSON.stringify(data)}
      borderColor={STATUS?.borderColorStr}
      id={id}
      heading={{
        title: data.title,
        status: {
          message: 'Drafting Modules',
          color: STATUS?.statusColorStr,
          icon: <DraftingIcon />,
        },
        borderColor: STATUS?.borderColorStr,
        backgroundColor: STATUS?.bgColorStr,
      }}
      content={{
        children: renderContentBox(),
      }}
    />
  );
};

export default GeneralIdeaNode;
