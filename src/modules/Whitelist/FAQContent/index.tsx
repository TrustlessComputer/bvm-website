import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import s from './styles.module.scss';
import { CDN_URL } from '@/config';

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
                      <span className={s.faqTitle}>First Estimated Prizes</span>
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
                      The initially estimated jackpot is calculated by adding
                      the base amount of 100 TC to 20% of the Conversion Rate
                      (CR) multiplied by the Allowlist size (AL size), and then
                      multiplying the result by the ticket price (1 TC), which
                      also serves as the cost of participation.
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
                        What does Mega Whales refer to?
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
                      Mega Whales represents a fresh segment within New Bitcoin
                      City that emphasizes both entertainment and the potential
                      for earnings through game participation and player
                      investments.
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
                        How does the jackpot mechanism work?
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
                      In the jackpot mechanism, all players engage in a specific
                      game during a designated time frame. Once the allocated
                      time elapses, the player achieving the highest score
                      claims the jackpot. The score accumulates throughout the
                      jackpot's duration.
                    </p>
                    <p className={s.faqContent}>
                      Upon winning the jackpot, the subsequent jackpot for the
                      next round is reset to 10% of the previous jackpot value,
                      and it then follows the same increment rule.
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
                        Which games are available?
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
                      Games like Bitcoin Merge, Bitcoin Blast, and Crypto
                      Futures are among the choices you can enjoy.
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
                        How to increase mining boost?
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
                      Join the allowlist to get a 5% $WHALE Mining Boost.
                    </p>
                    <p className={s.faqContent}>
                      You can enhance your boost up to 25% by inviting 50+
                      friends.
                    </p>
                    <p className={s.faqContent}>
                      Exclusively planned for Generative artists, collectors,
                      Perceptrons holders, and GM holders – our valued
                      supporters and pioneering founders of New Bitcoin City.
                      Enjoy an exclusive 30% mining boost reward.
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
                        What awaits you in the $WHALE Season 0 Airdrop?
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
                      We're rolling out a retrospective airdrop for New Bitcoin
                      City's early supporters, including Generative artists,
                      collectors, Perceptrons holders, GM holders, and TC users.
                    </p>
                    <p className={s.faqContent}>
                      Here's a detailed breakdown of the 10% allocation:
                    </p>
                    <ul className={s.contentList}>
                      <li className={s.contentListItem}>
                        1% will be directed to Generative artists and collectors
                        in proportion to their contribution volume.
                      </li>
                      <li className={s.contentListItem}>
                        Another 1% will be distributed among Perceptrons holders
                        based on their Perceptrons quantity.
                      </li>
                      <li className={s.contentListItem}>
                        7% will be divided proportionally among GM holders,
                        based on their GM balance.
                      </li>
                      <li className={s.contentListItem}>
                        Additionally, 1% will be assigned to TC users
                        proportionally, reflecting the network fee amount
                        they've spent.
                      </li>
                    </ul>
                    <p className={s.faqContent} style={{ marginTop: 20 }}>
                      This distribution framework ensures that each group is
                      recognized for their valuable contributions to New Bitcoin
                      City.
                    </p>
                    <p className={s.faqContent}>
                      Stay tuned for the forthcoming update on the formula for
                      $WHALE Season 1.
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
