import BaseModal from '@/components/BaseModal';
import { Button, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useMemo, useRef, useState } from 'react';
import { marked } from 'marked';
import { IWhitePaper } from '@/services/api/dapp/whitePapers/interface';

interface IProps {
  show: boolean;
  onClose?: (() => void) | any;
  tokenInfo?: IWhitePaper;
}

const WhitePaperModal = (props: IProps) => {
  const { show, onClose, tokenInfo} = props;
  const contentRef = useRef<HTMLDivElement>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isDownloadingHtml, setIsDownloadingHtml] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const isAllDisabled = useMemo(() => {
    return isRegenerating || isDownloadingHtml || isDownloadingPdf;
  }, [isRegenerating, isDownloadingHtml, isDownloadingPdf]);

  const markdownString = useMemo(() => {
    return tokenInfo?.white_paper || '';
  }, [tokenInfo]);

  const convertMarkdownToHtml = (markdownText: string) => {
    return marked(markdownText);
  };

  const regenerateContent = () => {
    try {
      setIsRegenerating(true);
    } catch (e) {
      console.log('regenerateContent error', e);
    } finally {
      setIsRegenerating(false);
    }
  }


  const downloadHtml = async () => {
    try {
      setIsDownloadingHtml(true);

      const htmlString = await convertMarkdownToHtml(markdownString);
      const blob = new Blob([htmlString], { type: 'text/html' });

      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${tokenInfo?.token?.symbol}_white_paper.html`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    } catch (e) {
      console.log('downloadHtml error', e);
    } finally {
      setIsDownloadingHtml(false);
    }
  };

  const downloadPdf = () => {
    try {
      setIsDownloadingPdf(true);

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
        pdf.save(`${tokenInfo?.token?.symbol}_white_paper.pdf`);
        setIsDownloadingPdf(false);
      });
    } catch (e) {
      setIsDownloadingPdf(false);
      console.log('downloadPdf error', e);
    } finally {
    }
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
          <Button
            bg={"#000 !important"}
            borderRadius="100px"
            onClick={regenerateContent}
            isDisabled={isAllDisabled}
            isLoading={isRegenerating}
          >Regenerate</Button>
          <Button
            bg={"#FA4E0E !important"}
            borderRadius="100px"
            onClick={downloadHtml}
            isDisabled={isAllDisabled}
            isLoading={isDownloadingHtml}
          >Download Html</Button>
          <Button
            bg={"#FA4E0E !important"}
            borderRadius="100px"
            onClick={downloadPdf}
            isDisabled={isAllDisabled}
            isLoading={isDownloadingPdf}
          >Download PDF</Button>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default WhitePaperModal;
