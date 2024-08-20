import classNames from 'classnames';
import styles from '@/modules/blockchains/Buy/component4/DappRenderer/styles.module.scss';
import Label from '@/modules/blockchains/Buy/components3/Label';
import React, { useState } from 'react';
import {
  useOptionInputStore,
  useOptionInputValue,
} from '@/modules/blockchains/Buy/component4/DappRenderer/OptionInputValue/useOptionInputStore';
import { useSignalEffect } from '@preact/signals-react';
import { IModelOption } from '@/types/customize-model';

export default function OptionInputValue({ option }: { option: IModelOption }) {
  const [sta, seSta] = useState<string>();

  const { setValue } = useOptionInputStore();
  const vl = useOptionInputValue(option.key);

  useSignalEffect(() => {
    console.log('[OptionInputValue] --- ', {
      option,
      vl,
    });
    seSta(
      vl.value ||
        option?.addOnInputs?.attrs?.value ||
        option.addOnInputs?.attrs?.default_value,
    );
  });

  return (
    <div className={classNames(styles.isOptionInput)}>
      <Label icon={option.icon} title={option.title} />
      <input
        type={option.addOnInputs?.type || 'text'}
        placeholder={option.addOnInputs?.attrs?.placeholder}
        onChange={(e) => {
          setValue(option.key, e.target.value);
        }}
        value={sta}
      />
    </div>
  );
}
