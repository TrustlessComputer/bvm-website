import BaseModal from '@/components/BaseModal';
import { Button, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useMemo, useRef, useState } from 'react';
import { marked } from 'marked';
import { IWhitePaper } from '@/services/api/dapp/whitePapers/interface';
import CWhitePaperAPI from '@/services/api/dapp/whitePapers';
import { requestReload } from '@/stores/states/common/reducer';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';

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
  const [whitePaper, setWhitePaper] = useState<IWhitePaper>();
  const { isOwnerChain } = useChainProvider();

  const dispatch = useDispatch();
  const cWhitePaperAPI = new CWhitePaperAPI();
  const needReload = useAppSelector(commonSelector).needReload;

  const isAllDisabled = useMemo(() => {
    return isRegenerating || isDownloadingHtml || isDownloadingPdf || !isOwnerChain;
  }, [isRegenerating, isDownloadingHtml, isDownloadingPdf]);

  const markdownString = useMemo(() => {
    return whitePaper?.white_paper || tokenInfo?.white_paper || '';
  }, [tokenInfo, whitePaper]);

  useEffect(() => {
    if(tokenInfo?.id) {
      getWhitePaperDetail();
    }
  }, [tokenInfo?.id, needReload]);

  const getWhitePaperDetail = async () => {
    const res = await cWhitePaperAPI.getWhitePaperDetail(tokenInfo?.id?.toString() as string);
    setWhitePaper(res);
  }

  const convertMarkdownToHtml = (markdownText: string) => {
    return marked(markdownText);
  };

  const regenerateContent = async () => {
    try {
      setIsRegenerating(true);

      await cWhitePaperAPI.reCreateWhitePaper(
        tokenInfo?.token?.contract_address as string,
      );

      dispatch(requestReload());
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

      const htmlContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${tokenInfo?.token?.symbol} White Paper</title>
                    <style>
                         body {
                            background-color: #FFFF;
                            margin: 40px auto;
                            max-width: 1440px;
                        }
                        
                        h1 {
      font-size: 32px;
      font-weight: 700;
      white-space: pre-wrap;
    }

    h2 {
      font-weight: 700;
      font-size: 20px;
    }

    h3 {
      font-size: 18px;
      font-weight: bold;
    }

    h4 {
      font-size: 16px;
      font-weight: bold;
    }

    h5 {
      font-size: 14px;
      font-weight: bold;
    }

    p {
      margin-top: 4px;
      margin-bottom: 4px;
    }

    ul {
      padding-inline-start: 40px;
    }
    ol {
      padding-inline-start: 40px;
    }

    a {
      color: #0d87ff;
      text-decoration: underline;
    }
                    </style>
                </head>
                <body>
                    ${htmlString}
                </body>
                </html>
            `;

      const blob = new Blob([htmlContent], { type: 'text/html' });

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
          {/*<Button
            bg={"#FA4E0E !important"}
            borderRadius="100px"
            onClick={downloadPdf}
            isDisabled={isAllDisabled}
            isLoading={isDownloadingPdf}
          >Download PDF</Button>*/}
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default WhitePaperModal;
