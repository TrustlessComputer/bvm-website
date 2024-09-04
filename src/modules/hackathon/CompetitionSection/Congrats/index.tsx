import React, { useState } from 'react';
import s from './Congrats.module.scss';
import { Button, Input } from '@chakra-ui/react';
import { addBTCAddress } from '@/services/api/EternalServices';
import toast from 'react-hot-toast';
const Congrats = () => {
  const [addr, setAddr] = useState<string>('');

  const handleSubmit = async () => {
    const isSuccess = await addBTCAddress(addr);
    if (isSuccess) {
      toast.success('Submit address successfully');
      setAddr('');
    } else {
      toast.error('Submit failed! Please try again!', {
        icon: null,
        style: {
          borderColor: 'blue',
          color: 'blue',
        },
        duration: 3000,
        position: 'bottom-center',
      });
    }
  };
  return (
    <div className={s.Congrats}>
      <div className={s.Title}>
        Congrats 🎉 You’re one of the winners of the PoC!
      </div>
      <div className={s.Desc}>
        Please submit your BTC wallet address on the Bitcoin network to receive
        your prize. Prizes will be sent within 48 hours.
      </div>
      <div className={s.InputWrapper}>
        <Input
          placeholder="Enter BTC Address"
          value={addr}
          onChange={(e) => {
            setAddr(e.target.value);
          }}
        />
        <Button
          isDisabled={!addr}
          borderRadius={'8px'}
          bg="#FA4E0E"
          height="36px"
          px="20px"
          fontFamily={'SF Pro Display'}
          fontWeight={500}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Congrats;
