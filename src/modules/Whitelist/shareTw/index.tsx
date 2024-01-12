// import { useRouter } from 'next-nprogress-bar';
import React from 'react';
import s from './styles.module.scss';

interface IShareTw {
  inputValue?: string;
  setInputValue: any;
}

const ShareTw = (props: IShareTw) => {
  const { inputValue, setInputValue } = props;
  // const router = useRouter();
  
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickShare = async () => {
    if (!inputValue) return;
    try {
      // const response = await getTopLeaderBoards({
      //   page: 1,
      //   limit: 0,
      //   address: inputValue as string,
      // });
      
      let content = `Exciting times are just around the corner with @Naka_Chain – the lightning fast & low-cost Bitcoin L2.\n\nJoin early to be a part of the token airdrop – don't miss out!\n\nnakachain.xyz\n\n👇 My wallet address for the airdrop: ${
        inputValue || ''
      }`;
      // if (response.length > 0) {
      //   content = `I recently discovered @Naka_Chain - the Lightning fast, low-cost Bitcoin L2 for BRC-20 DeFi.\n\nJoin NakaChain today to get early access for token airdrop!\n\nnakachain.xyz`;
      // };

      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
        '_blank'
      );
    } catch (error) {
      
    }
  };

  return (
    <div className={s.container}>
      <div className={s.shareTw}>
        <input
          className={s.input}
          placeholder="Enter Your Wallet Address (0x...)"
          onChange={handleOnChange}
          value={inputValue}
        />
        <button className={s.btnShare} onClick={onClickShare}>
          <p>Share on <span style={{fontWeight: 700}}>X</span></p>
        </button>
      </div>
      {/* <div className={s.descContent}>
        <p>0.01 $N4KA faucet tokens/day. <span onClick={() => router.push('faucet-history')}>View your transaction</span></p>
      </div> */}
    </div>
  );
};

export default ShareTw;
