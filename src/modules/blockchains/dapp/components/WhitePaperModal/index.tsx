import BaseModal from '@/components/BaseModal';
import { Button, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';

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

  const downloadHtmlFile = () => {
    const blob = new Blob([htmlString], { type: 'text/html' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'download.html';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  const generatePDF = () => {
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
      pdf.save('download.pdf');
    });
  };

  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      size="extra"
      icCloseUrl="/icons/ic-close-grey.svg"
      title={'Preview'}
    >
      <Flex
        display={'flex'}
        flexDir={'column'}
        w={['100%', '100%']}
        bgColor={'#ECECEC'}
        borderRadius={'10px'}
        p={'20px'}
      >
        <div ref={contentRef}
          dangerouslySetInnerHTML={{ __html: htmlString }}
        ></div>
        <Flex gap={"16px"} alignItems={"center"} justifyContent={"center"}>
          <Button bg={"red"} onClick={generatePDF}>Regenerate</Button>
          <Button bg={"green"} onClick={downloadHtmlFile}>Download Html</Button>
          <Button bg={"blue"} onClick={generatePDF}>Download PDF</Button>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default WhitePaperModal;
