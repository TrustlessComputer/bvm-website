import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import s from './styles.module.scss';
import { CDN_URL } from '@/config';
import DepositClaimItHere from '@/modules/PublicSale/depositModal/deposit.claim.it.here';
import DepositCheckItHere from '@/modules/PublicSale/depositModal/deposit.check.it.here';

const FAQContent: React.FC = (): React.ReactElement => {
  return (
    <div className={s.faqWrapper} id="1" data-section="1">
      <div className={s.faqContainer}>
        <h2 className={s.sectionTitle}>FAQ</h2>
        <div className={s.faqList}>
          <Accordion allowMultiple>
            <AccordionItem className={s.faqItem}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton justifyContent={'space-between'}>
                      <span className={s.faqTitle}>
                        What is the minimum and maximum contribution per wallet?
                      </span>
                      <button>
                        <img
                          className={isExpanded ? s.downArrow : ''}
                          src={`${CDN_URL}/icons/chevron-right-ic-32.svg`}
                          alt="chevron-right-ic"
                        />
                      </button>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <p className={s.faqContent}>
                      There is no minimum or maximum contribution per wallet.
                    </p>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem className={s.faqItem}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton justifyContent={'space-between'}>
                      <span className={s.faqTitle}>
                        What is the token price for the public sale?
                      </span>
                      <button>
                        <img
                          className={isExpanded ? s.downArrow : ''}
                          src={`${CDN_URL}/icons/chevron-right-ic-32.svg`}
                          alt="chevron-right-ic"
                        />
                      </button>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <p className={s.faqContent}>
                      There is no hard cap for the public sale. It will be a
                      crowdfunding event, allowing the public to determine the
                      valuation of the BVM project.
                    </p>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem className={s.faqItem}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton justifyContent={'space-between'}>
                      <span className={s.faqTitle}>
                        What is the $BVM token standard?
                      </span>
                      <button>
                        <img
                          className={isExpanded ? s.downArrow : ''}
                          src={`${CDN_URL}/icons/chevron-right-ic-32.svg`}
                          alt="chevron-right-ic"
                        />
                      </button>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <p className={s.faqContent}>BRC-20</p>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem className={s.faqItem}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton justifyContent={'space-between'}>
                      <span className={s.faqTitle}>
                        What is the utility of $BVM?
                      </span>
                      <button>
                        <img
                          className={isExpanded ? s.downArrow : ''}
                          src={`${CDN_URL}/icons/chevron-right-ic-32.svg`}
                          alt="chevron-right-ic"
                        />
                      </button>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <p className={s.faqContent}>
                      $BVM serves as the native cryptocurrency within the BVM
                      ecosystem, facilitating network fee payments and the
                      creation of Bitcoin L2 blockchains.
                    </p>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem className={s.faqItem}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton justifyContent={'space-between'}>
                      <span className={s.faqTitle}>
                        What is the vesting period for the public sale?
                      </span>
                      <button>
                        <img
                          className={isExpanded ? s.downArrow : ''}
                          src={`${CDN_URL}/icons/chevron-right-ic-32.svg`}
                          alt="chevron-right-ic"
                        />
                      </button>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <p className={s.faqContent}>
                      There is no vesting period for the public sale. All tokens
                      will be distributed at TGE, which is expected to be around
                      early March.
                    </p>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem className={s.faqItem}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton justifyContent={'space-between'}>
                      <span className={s.faqTitle}>
                        What percentage of the total supply is being sold?
                      </span>
                      <button>
                        <img
                          className={isExpanded ? s.downArrow : ''}
                          src={`${CDN_URL}/icons/chevron-right-ic-32.svg`}
                          alt="chevron-right-ic"
                        />
                      </button>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <p className={s.faqContent}>
                      15% of the total supply will be allocated for the public
                      sale.
                    </p>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem className={s.faqItem}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton justifyContent={'space-between'}>
                      <span className={s.faqTitle}>What is the boost?</span>
                      <button>
                        <img
                          className={isExpanded ? s.downArrow : ''}
                          src={`${CDN_URL}/icons/chevron-right-ic-32.svg`}
                          alt="chevron-right-ic"
                        />
                      </button>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <p className={s.faqContent}>
                      The boost is available only to allowlist members, with
                      potential boosts of up to 30%.
                    </p>
                    <p className={s.faqContent}>
                      To clarify, the top 1% of the allowlist will receive a 30%
                      boost, the next 9% will get a 20% boost, and the remaining
                      90% will receive a 10% boost.
                    </p>
                    <p className={s.faqContent}>
                      If you have a boost,{' '}
                      <DepositClaimItHere>
                        <a>claim it here</a>
                      </DepositClaimItHere>
                      .
                    </p>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem className={s.faqItem}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton justifyContent={'space-between'}>
                      <span className={s.faqTitle}>
                        Which currencies are supported?
                      </span>
                      <button>
                        <img
                          className={isExpanded ? s.downArrow : ''}
                          src={`${CDN_URL}/icons/chevron-right-ic-32.svg`}
                          alt="chevron-right-ic"
                        />
                      </button>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <p className={s.faqContent}>
                      You can deposit nine different currencies, including BTC,
                      ETH, TIA, OP, ARB, ORDI, SATS, USDT, USDC.
                    </p>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem className={s.faqItem}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton justifyContent={'space-between'}>
                      <span className={s.faqTitle}>
                        How to check my contribution status?
                      </span>
                      <button>
                        <img
                          className={isExpanded ? s.downArrow : ''}
                          src={`${CDN_URL}/icons/chevron-right-ic-32.svg`}
                          alt="chevron-right-ic"
                        />
                      </button>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <p className={s.faqContent}>
                      <DepositCheckItHere><a>Check it here</a></DepositCheckItHere>.
                    </p>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem className={s.faqItem}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton justifyContent={'space-between'}>
                      <span className={s.faqTitle}>
                        When is the TGE (Token Generation Event)?
                      </span>
                      <button>
                        <img
                          className={isExpanded ? s.downArrow : ''}
                          src={`${CDN_URL}/icons/chevron-right-ic-32.svg`}
                          alt="chevron-right-ic"
                        />
                      </button>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <p className={s.faqContent}>
                      The TGE is expected to take place around March, coinciding
                      with the exchange listings.
                    </p>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FAQContent);
