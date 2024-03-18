type IAIData = {
  id: number;
  title: string;
  content: string;
  content2?: string;
  icon: string;
}[]

export const AIData: IAIData = [
  {
    id: 1,
    title: 'Counteracting Monopolization',
    content: 'By distributing AI development and deployment across a decentralized blockchain network, this approach prevents the concentration of AI power in the hands of a few dominant entities. It encourages a competitive and diverse ecosystem, stimulating continuous innovation and ensuring that the advantages of AI technologies are more widely shared.',
    icon: '/ai-landing/open_ai_1.svg'
  },
  {
    id: 2,
    title: 'Enhanced Transparency and Trustworthiness',
    content: 'Integrating AI with blockchain fundamentally enhances transparency, making every AI decision and transaction verifiable on a blockchain ledger.',
    content2: 'This transparency is vital for building trust, especially in critical sectors like healthcare, legal systems, and autonomous technologies. The immutable nature of blockchain ensures accountability and clarity in AI operations, fostering confidence and understanding among stakeholders.',
    icon: '/ai-landing/open_ai_2.svg'
  },
  {
    id: 3,
    title: 'Decentralized Accessibility',
    content: 'The fusion of AI and blockchain democratizes access to advanced AI technologies, extending opportunities across diverse sectors and economic backgrounds. This decentralized approach diminishes the digital divide, ensuring equitable access to AI benefits and promoting inclusivity in the technological landscape.',
    icon: '/ai-landing/open_ai_3.svg'
  },
  {
    id: 4,
    title: 'Collective Innovation',
    content: "The combination of AI with blockchain inherently encourages open-source development and collaborative problem-solving. It allows a global community of developers, researchers, and innovators to share, contribute, and build upon each other's work transparently. This collaborative environment accelerates technological progress and leads to innovative AI solutions that tackle complex global challenges.",
    icon: '/ai-landing/open_ai_4.svg'
  },
]
