import BaseModal from '@/components/BaseModal';
import { Button, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import { marked } from 'marked';

interface IProps {
  show: boolean;
  onClose?: (() => void) | any;
}

const WhitePaperModal = (props: IProps) => {
  const { show, onClose, } = props;
  const contentRef = useRef<HTMLDivElement>(null);

  const htmlString = `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>XYZ Coin White Paper</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f8f9fa;
      color: #333;
    }
    header {
      background-color: #6c757d;
      color: white;
      padding: 20px 0;
      text-align: center;
    }
    section {
      margin: 20px;
      padding: 20px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1, h2, h3 {
      color: #6c757d;
    }
    ul {
      list-style-type: disc;
      padding-left: 20px;
    }
  </style>
</head>
<body>

<header>
  <h1>XYZ Coin White Paper</h1>
</header>

<section id="introduction">
  <h2>Introduction</h2>
  <p>
    XYZ Coin is designed to facilitate fast, secure transactions on a decentralized network. It aims to revolutionize the way digital transactions are conducted by addressing existing challenges in the blockchain industry.
  </p>
</section>

<section id="problem-statement">
  <h2>Problem Statement</h2>
  <p>
    The problem we are solving is the high transaction fees and slow processing times in current blockchain networks. These issues have hindered the widespread adoption of cryptocurrencies for everyday transactions.
  </p>
</section>

<section id="solution">
  <h2>Solution</h2>
  <p>
    XYZ Coin uses a new consensus algorithm that significantly reduces fees and speeds up transaction times. This innovation ensures that users can enjoy a seamless and efficient transaction experience.
  </p>
</section>

<section id="token-details">
  <h2>Token Details</h2>
  <ul>
    <li><strong>Token Name:</strong> XYZ Coin</li>
    <li><strong>Token Symbol:</strong> XYZ</li>
    <li><strong>Total Supply:</strong> 1,000,000 XYZ</li>
    <li><strong>Contract Address:</strong> 0xb66a705f2d9f934f3ef59909602b402f13c3be2f</li>
  </ul>
</section>

<section id="tokenomics">
  <h2>Tokenomics</h2>
  <ul>
    <li><strong>50%</strong> of the tokens allocated to the Foundation</li>
    <li><strong>25%</strong> allocated to the Team with a vesting period of 120 days and a cliff of 6 months</li>
    <li><strong>25%</strong> allocated for other purposes</li>
  </ul>
</section>

<section id="roadmap">
  <h2>Roadmap</h2>
  <h3>Q4 2024</h3>
  <p>Initial Coin Offering (ICO) and Token Distribution</p>

  <h3>Q1 2025</h3>
  <p>Launch of the BVM Platform with Basic Features</p>

  <h3>Q2 2025</h3>
  <p>Integration with Major DeFi Platforms</p>

  <h3>Q3 2025</h3>
  <p>Introduction of Staking and Governance Features</p>
</section>

<section id="team">
  <h2>Team</h2>
  <ul>
    <li><strong>John Doe:</strong> CEO & Founder</li>
    <li><strong>Jane Smith:</strong> CTO & Co-Founder</li>
    <li><strong>Michael Brown:</strong> Head of Marketing</li>
  </ul>
</section>

<section id="technology">
  <h2>Technology and Unique Features</h2>
  <p>
    XYZ Coin leverages a unique proof-of-stake consensus algorithm that allows for faster transactions and greater scalability. Additionally, it supports smart contracts, enabling the development of decentralized applications (dApps) on the XYZ blockchain.
  </p>
</section>

<section id="compliance">
  <h2>Legal and Regulatory Compliance</h2>
  <p>
    We are committed to ensuring compliance with all relevant regulations. Our legal team is dedicated to navigating the complex regulatory landscape of cryptocurrency, ensuring that XYZ Coin meets all legal requirements and standards.
  </p>
</section>

</body>
</html>
      `;
  const markdownString = `
  **BLOOM White Paper**\n\n**Abstract**\n\nBLOOM is a decentralized, community-driven project that aims to create a sustainable and vibrant ecosystem, fostering growth and innovation. Our token, BLM, is designed to facilitate interactions within the network, promote collaboration, and reward contributors. This white paper outlines the tokenomics, technical specifications, and vision for the BLOOM project.\n\n**Introduction**\n\nIn the spirit of decentralization and community building, BLOOM is designed to empower individuals and organizations to collaborate, create, and thrive. Our project is built on the principles of transparency, fairness, and inclusivity, ensuring that all stakeholders have a voice and an opportunity to contribute.\n\n**Token Information**\n\n* **Token Symbol:** BLM\n* **Token Name:** Bloom\n* **Total Supply:** 100,000,000 BLM\n\n**Contract Address**\n\nThe BLOOM token contract address is:\n\n0x6fd49a3557e8f21b5c1165fa1dc8dbb1fa0c461d\n\n**Tokenomics**\n\nThe BLOOM token allocation is designed to ensure a fair and sustainable distribution of tokens, aligning with the project's goals and objectives. The token allocation is as follows:\n\n* **Foundation:** 25%\n\t+ Cliff: 120 days\n\t+ Purpose: To support the development and growth of the BLOOM ecosystem, including infrastructure, partnerships, and community building.\n* **Airdrop:** 25%\n\t+ Cliff: 180 days\n\t+ Purpose: To reward early supporters and contributors, promoting a sense of community and encouraging participation.\n* **Team:** 23%\n\t+ Cliff: 360 days\n\t+ Purpose: To incentivize the core team and developers, ensuring their continued commitment to the project's success.\n* **Other:** 27%\n\t+ Purpose: To allocate tokens for strategic partnerships, collaborations, and future development initiatives.\n\n**Token Usage**\n\nThe BLM token is designed to facilitate various interactions within the BLOOM ecosystem, including:\n\n* **Community participation:** Token holders can participate in governance, voting on proposals, and contributing to decision-making processes.\n* **Content creation:** Creators can use BLM to promote their work, engage with the community, and monetize their content.\n* **Partnerships:** Tokens can be used to foster partnerships, collaborations, and strategic relationships.\n* **Reward system:** BLM tokens can be used to reward contributors, incentivizing participation and high-quality content.\n\n**Technical Specifications**\n\nThe BLOOM token is built on the [Blockchain Platform] blockchain, utilizing the [Token Standard] token standard. The contract address is publicly available, ensuring transparency and verifiability.\n\n**Security**\n\nThe BLOOM team prioritizes security, implementing best practices to protect the token and ecosystem. Regular security audits and penetration testing ensure the integrity of the network.\n\n**Roadmap**\n\nThe BLOOM roadmap is designed to achieve the project's vision and objectives, with milestones and deliverables outlined as follows:\n\n* **Q1:** Token development and testing\n* **Q2:** Airdrop and community building\n* **Q3:** Partnership and collaboration initiatives\n* **Q4:** Ecosystem expansion and growth\n\n**Conclusion**\n\nBLOOM is a community-driven project, dedicated to creating a vibrant and sustainable ecosystem. Our token, BLM, is designed to facilitate interactions, promote collaboration, and reward contributors. With a focus on transparency, fairness, and inclusivity, we invite you to join us on this exciting journey.\n\n**Appendix**\n\nFor more information on the BLOOM project, please visit our website: [insert website URL]. Join our community to stay updated on the latest developments and participate in shaping the future of BLOOM.\n\n**Disclaimer**\n\nThe information contained in this white paper is for general information purposes only. It does not constitute investment advice or an offer to purchase securities. The BLOOM team is not responsible for any losses or damages incurred as a result of participating in the project.
  `;

  const convertMarkdownToHtml = (markdownText: string) => {
    return marked(markdownText);
  };

  const downloadHtml = async () => {
    const htmlString = await convertMarkdownToHtml(markdownString);
    const blob = new Blob([htmlString], { type: 'text/html' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'white_paper.html';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  const regenerateContent = () => {

  }

  const downloadPdf = () => {
    const input = contentRef.current as HTMLDivElement;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('white_paper.pdf');
    });
  };

  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      headerClassName={s.headerClassName}
      size="extra"
      icCloseUrl="/icons/ic-close-grey.svg"
      title={'White Paper'}
      // theme={"dark"}
    >
      <Flex
        display={'flex'}
        flexDir={'column'}
        w={['100%', '100%']}
        bgColor={'#ECECEC'}
        // borderRadius={'10px'}
        p={'20px'}
      >
        <div ref={contentRef} className={s.whitePaperContent}
          dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(markdownString) }}
        ></div>
        <Flex mt={"24px"} gap={"24px"} alignItems={"center"} justifyContent={"center"}>
          <Button bg={"#000"} borderRadius="100px" onClick={regenerateContent}>Regenerate</Button>
          <Button bg={"#FA4E0E"} borderRadius="100px" onClick={downloadHtml}>Download Html</Button>
          <Button bg={"#FA4E0E"} borderRadius="100px" onClick={downloadPdf}>Download PDF</Button>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default WhitePaperModal;
