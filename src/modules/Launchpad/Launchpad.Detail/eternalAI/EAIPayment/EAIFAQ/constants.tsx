export interface IFAQData {
  title: string;
  content: string[] | any[];
}

const HOME_FAQ_DATA: IFAQData[] = [
  {
    title: '1. What is the format of the public sale?',
    content: [
      'The EAI public sale takes the form of crowdfunding and is accessible to everyone. However, only those on the allowlist are eligible for a boost.',
    ],
  },
  {
    title: '2. Who is eligible to participate in the public sale?',
    content: [
      'The public sale is not available to residents of Belarus, Cuba, Iran, Vietnam, Sudan, Zimbabwe, North Korea, and the United States.',
    ],
  },
  {
    title: '3. What payment methods are accepted?',
    content: [
      'BTC, ETH, USDT, USDC and SOL are accepted as payment options. Additionally, funding can be done directly from your Naka wallet.',
    ],
  },
  {
    title: '4. How can I join the allowlist to receive a boost?',
    content: [
      'To join the allowlist, you need to stake a minimum of 100 $BVM tokens.',
    ],
  },
  {
    title:
      '5. What are the personal hard cap and boost levels for the public sale?',
    content: [
      'Tier 1: $32k with a 30% boost',
      'Tier 2: $16k with a 20% boost',
      'Tier 3: $8k with a 10% boost',
      'Public Sale: $4k with no boost',
      <strong key="5.personal_1">
        Important note: If your deposit with boost applied exceeds your hard cap
        tier, you will only receive the hard cap amount during the TGE. The
        excess amount will be locked for 6 months and vested over 1 year.
      </strong>,
      <strong key="5.personal_2">
        Your hard cap may adjust within 10% due to BTC or ETH price changes.
      </strong>,
    ],
  },
  {
    title: '6. How is the boost determined?',
    content: [
      'The boost is allocated based on your position in the allowlist. The top 2% receive a 30% boost, the next 8% receive a 20% boost, and the remaining participants receive a 10% boost.',
    ],
  },
  {
    title:
      '7. How does the boost affect the price at the Token Generation Event (TGE)?',
    content: [
      'The price at the TGE is calculated with leverage and considers the boost. Participants with a 30% boost will have $EAI at the lowest price, while those with no boost will buy at higher prices accordingly.',
    ],
  },

  {
    title:
      '8. What percentage of the allocation is available in the public sale?',
    content: [
      <span key="percentage-1">
        10% of the allocation is reserved for the public sale. Check the
        tokenomics of $EAI{' '}
        <a
          target="_blank"
          href="https://twitter.com/CryptoEternalAI/status/1772308603246100652"
        >
          here
        </a>
        .
      </span>,
    ],
  },
  {
    title: '9. When will the Token Generation Event (TGE) take place?',
    content: [
      'The date of the TGE will be announced soon. Stay tuned for updates!',
    ],
  },
  {
    title: '10. How do I claim $EAI tokens during the TGE?',
    content: [
      "You'll claim your $EAI tokens using your Naka wallet. Ensure you sign up with Naka before depositing to enable us to map your allocation accurately.",
    ],
  },
];

const faqData = {
  HOME_FAQ_DATA,
};

export default faqData;
