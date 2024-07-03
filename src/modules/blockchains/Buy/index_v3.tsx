import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import BoxOption from '@/modules/blockchains/Buy/components3/BoxOption';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import React from 'react';
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

const FIELD = {
  CHAIN_NAME: 'chainName',
  NETWORK: 'isMainnet',
  DATA_AVAILABILITY_CHAIN: 'dataAvaibilityChain',
  GAS_LIMIT: 'gasLimit',
  BLOCK_TIME: 'blockTime',
};

const BuyPage = () => {
  const router = useRouter();
  const { form, setFormField } = useFormOrderStore((state) => state);

  const chainNameRef = React.useRef<HTMLInputElement | null>(null);
  const networkRef = React.useRef<HTMLInputElement | null>(null);
  const dataAvaibilityChainRef = React.useRef<HTMLInputElement | null>(null);
  const gasLimitRef = React.useRef<HTMLInputElement | null>(null);
  const blockTimeRef = React.useRef<HTMLInputElement | null>(null);

  const boxOptionMapping = {
    [FIELD.CHAIN_NAME]: {
      ref: chainNameRef,
      label: '1. Name',
      content: () => (
        <div>
          <input
            type="text"
            placeholder="Enter chain name"
            ref={chainNameRef}
          />
        </div>
      ),
    },
    [FIELD.NETWORK]: {
      ref: networkRef,
      label: '2. Network',
      content: () => (
        <div>
          <input type="text" placeholder="Enter network" ref={networkRef} />
        </div>
      ),
    },
    [FIELD.DATA_AVAILABILITY_CHAIN]: {
      ref: dataAvaibilityChainRef,
      label: '3. Data Availability',
      content: () => (
        <div>
          <input
            type="text"
            placeholder="Enter data availability chain"
            ref={dataAvaibilityChainRef}
          />
        </div>
      ),
    },
    [FIELD.GAS_LIMIT]: {
      ref: gasLimitRef,
      label: '4. Block gas limit',
      content: () => (
        <div>
          <input
            type="text"
            placeholder="Enter block gas limit"
            ref={gasLimitRef}
          />
        </div>
      ),
    },
    [FIELD.BLOCK_TIME]: {
      ref: blockTimeRef,
      label: '5. Withdrawal time',
      content: () => (
        <div>
          <input
            type="text"
            placeholder="Enter withdrawal time"
            ref={blockTimeRef}
          />
        </div>
      ),
    },
  };

  function handleDragEnd(event: any) {
    console.log('[BuyPage] event :: ', event);

    if (event.over) {
      const valueInput = boxOptionMapping[event.active.id].ref.current?.value;

      // setFormField(event.active.id, valueInput || null); // TODO: REMOVE THE BELOW LINE AND UNCOMMENT THIS LINE
      setFormField(event.active.id, 'OK');
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={s.wrapper}>
        <div className={s.inner}>
          <div className={s.left}>
            <p className={s.heading}>Customize your Blockchain</p>
            <div className={s.left_box}>
              {Object.keys(boxOptionMapping).map((key) => {
                const { label, content } = boxOptionMapping[key];
                const isDragged = form[key];

                if (isDragged) return null;

                return (
                  <BoxOption key={key} label={label} id={key}>
                    {content()}
                  </BoxOption>
                );
              })}
            </div>
          </div>
          <div className={s.right}>
            <div className={s.right_top}>
              <p className={s.heading}>Your tier</p>
              <div className={s.right_top_box}>
                <p>
                  <span>Hacker</span> $99 per rollup/month
                </p>
                <div
                  className={s.right_top_box_btn}
                  onClick={() => {
                    router.push('/pricing');
                  }}
                >
                  <p>Switch</p>
                </div>
              </div>
            </div>
            <div className={s.right_box}>
              <Droppable className={s.inner}>
                {Object.keys(boxOptionMapping).map((key) => {
                  const { label, content } = boxOptionMapping[key];
                  const isDragged = form[key];

                  if (!isDragged) return null;
                  console.log('[BuyPage] key, value :: ', key, form[key]);

                  return (
                    <BoxOption key={key} label={label} id={key}>
                      {content()}
                    </BoxOption>
                  );
                })}
              </Droppable>
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default BuyPage;
