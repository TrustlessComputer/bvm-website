import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import BoxOption from '@/modules/blockchains/Buy/components3/BoxOption';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import { useState } from 'react';
import { useFormOrderStore } from '@/modules/blockchains/Buy/stores';


function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };


  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

const BuyPage = () => {
  const router = useRouter();
  // const [isDropped, setIsDropped] = useState(false);
  const { form, setFormField } = useFormOrderStore(state => state);

  function handleDragEnd(event: any) {
    if (event.over && event.over.id === 'droppable') {
      setFormField('chainName', 'bvm');
    }
  }

  const DraggableMarkup = (props) => (
    <div {...props} className={s.shape}>Drag me</div>
  );


  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={s.wrapper}>
        {/*{!isDropped ? draggableMarkup : null}*/}
        <div className={s.inner}>
          <div className={s.left}>
            <p className={s.heading}>Customize your Blockchain</p>
            <div className={s.left_box}>
              <BoxOption active={true} label={'1. Network'}>
                <DraggableMarkup />
              </BoxOption>
              {/*<BoxOption label={'2. Data Availability'} />*/}
              {/*<BoxOption label={'3. Block gas limit'} />*/}
              {/*<BoxOption label={'4. Withdrawal time'} />*/}
            </div>
          </div>
          <div className={s.right}>
            <div className={s.right_top}>
              <p className={s.heading}>Your tier</p>
              <div className={s.right_top_box}>
                <p><span>Hacker</span> $99 per rollup/month</p>
                <div className={s.right_top_box_btn} onClick={() => {
                  router.push('/pricing');
                }}>
                  <p>Switch</p>
                </div>
              </div>
            </div>
            <div className={s.right_box}>
              <Droppable className={s.inner}>
                {form.chainName ? <DraggableMarkup /> : 'Drop here'}
              </Droppable>
              {/*<Droppable>*/}
              {/*{isDropped ? draggableMarkup : 'Drop here'}*/}
              {/*</Droppable>*/}
            </div>
          </div>
        </div>
      </div>
    </DndContext>

  );
};

export default BuyPage;
