'use client';

import HomeContainer from '../../components/HomeContainer';
import HomeTitle from '../../components/HomeTitle';
import { useIsInViewportSignal } from '@/hooks/useIsInViewportSignal';
import { codeString } from '@/modules/ai-landing/section/SmartContact/codeData';
import ImagePlaceholder from '@components/ImagePlaceholder';
import { useGSAP } from '@gsap/react';
import LinesRandom from '@interactive/Signal/Lines/Random';
import gsap from 'gsap';
import React, { useRef } from 'react';
import { PrismLight as SyntaxHighlighter, createElement  } from 'react-syntax-highlighter';
import sol from 'react-syntax-highlighter/dist/esm/languages/prism/solidity';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import s from './styles.module.scss';
import { useSignalEffect } from '@preact/signals-react';
import useWindowResize, { useIsMobile } from '@hooks/useWindowResize';

SyntaxHighlighter.registerLanguage('sol', sol);

export default function SmartContract(): React.JSX.Element {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile()
  const { visible } = useIsInViewportSignal({
    ref: wrapperRef,
    options: { threshold: 0.8 },
  });
  const { contextSafe } = useGSAP(
    () => {
      const listSpan = wrapperRef.current?.querySelectorAll('span');
      listSpan?.forEach((char) => {
        gsap.set(char, {
          opacity: 0,
        });
      });
    },
    { scope: wrapperRef, dependencies: [wrapperRef.current] },
  );

  const handleTextType = contextSafe(() => {
    const listSpan = wrapperRef.current?.querySelectorAll('span');
    listSpan?.forEach((char, index) => {
      gsap.to(char, {
        opacity: 1,
        duration: 0.001,
        delay: index / 100,
      });
    });
  });
  useSignalEffect(() => {
    if (visible.value) {
      handleTextType();
    }
  });
  return (
    <div
      className={`${s.wrapper}`}
      style={{ backgroundImage: `${isMobile ? '' : 'url(/ai-landing/codebg.jpg)'}` }}
    >
      <HomeContainer className={`${s.container}`}>
        <div className={`${s.wrapperContent}`}>
          <HomeTitle className={`${s.mainHeading}`} spanWhite={true}>
            Write smart contracts that don’t just run. <span>They think.</span>
          </HomeTitle>
          <LinesRandom>
            <p className={s.decsContent}>
              Eternal AI is EVM equivalent. It allows smart contract developers to code their neural networks in solidity. Eternal AI smart contracts help developers accelerate their time to market by reusing battle-tested libraries of smart contracts for AI.
            </p>
          </LinesRandom>
          <div className={`${s.wrapperImageCode}`} ref={wrapperRef}>
            <ImagePlaceholder
              src={ isMobile ? '/ai-landing/headerCodeMobile.png' : '/ai-landing/headerCode.png'}
              alt={'contract'}
              width={1080}
              height={1080}
              className={`${s.thumbnail}`}
            />
            <SyntaxHighlighter
              language="solidity"
              className={`${s.codeWrapper}`}
              style={coldarkDark}
              showLineNumbers
              customStyle={{
                fontFamily: 'Space Mono',
                width: '100%',
                backgroundColor: 'transparent',
                margin: '0',
                fontSize: '14px',
                lineHeight: '24px',
                color: 'white !important',
              }}
              wrapLongLines={true}
              renderer={({
                           rows,
                           stylesheet,
                           useInlineStyles,
                         }) => {
                return rows.map((row, index) => {
                  const children = row.children;
                  const lineNumberElement = children?.shift();
                  if (lineNumberElement) {
                    row.children = [
                      lineNumberElement,
                      {
                        children,
                        properties: {
                          className: [],
                        },
                        tagName: 'span',
                        type: 'element',
                      },
                    ];
                  }

                  return createElement({
                    node: row,
                    stylesheet,
                    useInlineStyles,
                    key: index,
                  });
                });
              }}
              lineNumberContainerStyle={{ fontFamily: 'Urbanist' }}
              id={'code'}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        </div>
      </HomeContainer>
    </div>
  );
}
