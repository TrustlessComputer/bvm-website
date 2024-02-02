import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel, Button,
} from '@chakra-ui/react';
import s from './styles.module.scss';
import { CDN_URL } from '@/config';
import DepositClaimItHere from '@/modules/PublicSale/depositModal/deposit.claim.it.here';
import DepositCheckItHere from '@/modules/PublicSale/depositModal/deposit.check.it.here';
import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';
import { compareString } from '@/utils/string';
import DepositGuestCodeHere from '@/modules/PublicSale/depositModal/deposit.guest.code';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import AuthenStorage from '@/utils/storage/authen.storage';
import AuthForBuyV2 from '@/modules/PublicSale/AuthForBuyV2';

const FAQContent: React.FC = (): React.ReactElement => {
  const user = useAppSelector(userSelector);
  const guestCode = AuthenStorage.getGuestSecretKey();

  const boost = React.useMemo(() => {
    if (!user?.boost) return '0%';
    if (compareString(user?.boost, '1.1')) return '10%';
    if (compareString(user?.boost, '1.2')) return '20%';
    if (compareString(user?.boost, '1.3')) return '30%';
    return '0%';
  }, [user?.boost]);
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
                      There is no hard cap for the public sale.
                    </p>
                    <p className={s.faqContent}>
                      It will be a crowdfunding event, allowing the public to
                      determine the fair valuation of the project based on its
                      technology and traction to date.
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
                        What is the BVM token standard?
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
                      BVM is the native token of the network. BVM can be
                      exported to BRC-20 format and traded on decentralized
                      exchanges and centralized exchanges that support BRC-20.
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
                        What is the utility of BVM?
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
                      BVM serves as the native cryptocurrency within the BVM
                      ecosystem, facilitating the creation and operation of
                      multiple Bitcoin L2 blockchains.
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
                      will be distributed at TGE, which will be around March
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
                    {user ? (
                      <p className={s.faqContent}>
                        You have a boost of {boost}!!!
                      </p>
                    ) : (
                      <p className={s.faqContent}>
                        If you have a boost,{' '}

                        <AuthForBuyV2
                          renderWithoutLogin={(onClick: any) => (
                            <a onClick={onClick}>claim it here</a>
                          )}>
                        </AuthForBuyV2>
                        .
                      </p>
                    )}
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
                      You can contribute in nine different currencies, including
                      BTC, ETH, TIA, OP, ARB, ORDI, SATS, USDT, and USDC
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
                        How do I check my contribution status?
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
                      <GoogleReCaptchaProvider
                        reCaptchaKey="6LdrclkpAAAAAD1Xu6EVj_QB3e7SFtMVCKBuHb24"
                        scriptProps={{
                          async: false,
                          defer: false,
                          appendTo: 'head',
                          nonce: undefined,
                        }}
                      >
                        <DepositCheckItHere>
                          <a>Check the status</a>
                        </DepositCheckItHere>
                      </GoogleReCaptchaProvider>
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
                      The TGE will around March, at the same time as BVM
                      exchange listings.
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
                        Who is eligible to join the public sale?
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
                      The public sale is open to everyone except US citizens.
                    </p>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            {Boolean(guestCode) && (
              <AccordionItem className={s.faqItem}>
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <AccordionButton justifyContent={'space-between'}>
                        <span className={s.faqTitle}>
                          If I don't sign in via Twitter, how will I know my
                          contribution?
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
                        Your contribution will appear as Anonymous, and you will
                        receive a secret key to claim your allocation later on.
                        <br />
                        <br />
                        Click{' '}
                        <DepositGuestCodeHere>
                          <a>here</a>
                        </DepositGuestCodeHere>{' '}
                        to back up your secret key. the secret key.
                      </p>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            )}

            <AccordionItem className={s.faqItem}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton justifyContent={'space-between'}>
                        <span className={s.faqTitle}>
                          How much is my $BVM allocation based on my contribution?
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
                      Your $BVM allocation will be determined based on the total fund raised at the end of the public sale<br/>
                    </p>
                    <p className={s.faqContent}>
                      Your $BVM allocation = (Your contribution amount / Total contribution at the end) * 15M $BVM
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
