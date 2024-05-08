/* eslint-disable @typescript-eslint/no-explicit-any */
import { Center } from '@chakra-ui/react';
import React from 'react';
import { StyledSocial } from './Social.styled';

interface SocialTokenProps {
  socials?: any;
  theme?: 'light' | 'dark';
  isShowEmpty?: boolean;
}

const SocialToken: React.FC<SocialTokenProps> = ({
  socials,
  theme = 'dark',
  isShowEmpty = false,
}) => {
  const color = theme === 'light' ? '#000000' : '#ffffff';
  return (
    <StyledSocial
      className={'social-container'}
      gap={4}
      style={{ height: isShowEmpty ? '100%' : 'auto' }}
    >
      {socials?.twitter && (
        <Center
          onClick={() => window.open(socials?.twitter, '_blank')}
          className="item-social"
          bg={theme === 'light' ? '#FFFFFF' : 'none'}
        >
          <img
            src={`/images/launchpad/${
              theme === 'light' ? 'twitter_icon' : 'twitter_icon_dark'
            }.svg`}
            alt={'tw'}
          />
          {/*<FaTwitter fontSize={'20px'} style={{ color }} />*/}
        </Center>
      )}
      {socials?.discord && (
        <Center
          onClick={() => window.open(socials?.discord, '_blank')}
          className="item-social"
          bg={theme === 'light' ? '#FFFFFF' : 'none'}
        >
          <img
            src={`/images/launchpad/${
              theme === 'light' ? 'twitter_icon' : 'twitter_icon_dark'
            }.svg`}
            alt={'tw'}
          />
          {/*<FaDiscord fontSize={'20px'} style={{ color }} />*/}
        </Center>
      )}
      {socials?.telegram && (
        <Center
          onClick={() => window.open(socials?.telegram, '_blank')}
          className="item-social"
          bg={theme === 'light' ? '#FFFFFF' : 'none'}
        >
          <img
            src={`/images/launchpad/${
              theme === 'light' ? 'telegram_icon' : 'tele_icon_dark'
            }.svg`}
            alt={'tw'}
          />
          {/*<FaTelegram fontSize={'20px'} style={{ color }} />*/}
        </Center>
      )}
      {socials?.medium && (
        <Center
          onClick={() => window.open(socials?.medium, '_blank')}
          className="item-social"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 448 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 32v448h448V32H0zm372.2 106.1l-24 23c-2.1 1.6-3.1 4.2-2.7 6.7v169.3c-.4 2.6.6 5.2 2.7 6.7l23.5 23v5.1h-118V367l24.3-23.6c2.4-2.4 2.4-3.1 2.4-6.7V199.8l-67.6 171.6h-9.1L125 199.8v115c-.7 4.8 1 9.7 4.4 13.2l31.6 38.3v5.1H71.2v-5.1l31.6-38.3c3.4-3.5 4.9-8.4 4.1-13.2v-133c.4-3.7-1-7.3-3.8-9.8L75 138.1V133h87.3l67.4 148L289 133.1h83.2v5z"></path>
          </svg>
        </Center>
      )}
      {socials?.website && (
        <Center
          onClick={() => window.open(socials?.website, '_blank')}
          className="item-social"
          bg={theme === 'light' ? '#FFFFFF' : 'none'}
        >
          {/*<RiEarthFill fontSize={'20px'} style={{ color }} />*/}

          <img
            src={`/images/launchpad/${
              theme === 'light' ? 'website_icon' : 'website_icon_dark'
            }.svg`}
            alt={'tw'}
          />
        </Center>
      )}
      {socials?.instagram && (
        <Center
          onClick={() => window.open(socials?.instagram, '_blank')}
          className="item-social"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 448 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
          </svg>
        </Center>
      )}
    </StyledSocial>
  );
};

export default SocialToken;
