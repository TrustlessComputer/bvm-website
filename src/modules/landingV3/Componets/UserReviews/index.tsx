import React from 'react';
import Slider from 'react-slick';
import s from './UserReviews.module.scss';
import { Flex, Image, Text } from '@chakra-ui/react';

type Props = {};

type ItemProps = {
  avatarSrc: string;
  content: string | React.ReactNode | (() => React.ReactNode);
  name: string;
  username: string;
};

const CONTENT = [
  {
    avatarSrc: '/landing-v6/avt-stonecoldpat0.png',
    content: () => (
      <>
        <span>Rollups are the new server.</span>
        <span>Rollup as a service providers are the new Wordpress. </span>
      </>
    ),
    name: 'Patrick McCorry',
    username: '@stonecoldpat0',
  },
  {
    avatarSrc: '/landing-v6/avt-haydenzadams.png',
    content: `Easiest mental model for blockchains is fancy
servers with superpowers - like
decentralization, transparency, resilience,
provability, etc`,
    name: 'Hayden Adams',
    username: '@haydenzadams',
  },
  {
    avatarSrc: '/landing-v6/avt-mattmurrs.png',
    content: `Rollups are open, verifiable web servers`,
    name: 'Matt Murray',
    username: '@mattmurrs',
  },
  {
    avatarSrc: '/landing-v6/avt-eoracle_network.png',
    //     content: `@ethereum is the verifiable internet.
    // Rollups are the verifiable web server
    // @eigenlayer is the verifiable cloud
    // eoracle is the verifiable real-world connection.`,
    content: () => (
      <>
        <span>@ethereum is the verifiable internet</span>
        <span>Rollups are the verifiable web server</span>
        {/* @eigenlayer is the verifiable cloud
        <br />
        eoracle is the verifiable real-world */}
      </>
    ),

    name: 'eOracle',
    username: '@eoracle_network',
  },
  {
    avatarSrc: '/landing-v6/avt-allred_chase.png',

    content: () => <>Rollups are the new server</>,
    name: 'Chunk',
    username: '@allred_chase',
  },
  {
    avatarSrc: '/landing-v6/avt-Polymer_Labs.png',
    content: () => (
      <>
        <span>
          The future of Ethereum interop will resemble the cloud today
        </span>
        <span>Rollups = on-chain web servers</span>
      </>
    ),

    name: 'Polymer Labs',
    username: '@Polymer_Labs',
  },
] as ItemProps[];

const Item = (props: ItemProps) => {
  const { avatarSrc, content, name, username } = props;

  return (
    <div className={s.item_wrapper}>
      <div className={s.avatar}>
        <Flex alignItems={'center'} gap="12px">
          <Image src={avatarSrc} alt="user avatar" w="48px" />
          <div className={s.user_info}>
            <div className={s.name}>{name}</div>
            <div className={s.username}>{username}</div>
          </div>
        </Flex>
      </div>
      <Flex flexDir={'column'} justifyContent={'space-between'} h="100%">
        <div className={s.text}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
          >
            <g clip-path="url(#clip0_39373_4693)">
              <path
                d="M5.375 11.2496H1.25C1.04263 11.2496 0.875 11.0816 0.875 10.8746V5.99961C0.875 3.25199 2.02287 1.26449 4.10675 0.40311C4.298 0.32511 4.51737 0.414735 4.5965 0.60636C4.67562 0.79761 4.58487 1.01699 4.39325 1.09611C2.70162 1.79549 1.73 3.39599 1.63325 5.62461H5.375C5.58238 5.62461 5.75 5.79261 5.75 5.99961V10.8746C5.75 11.0816 5.58238 11.2496 5.375 11.2496Z"
                fill="black"
              />
              <path
                d="M11.75 11.2496H7.625C7.41763 11.2496 7.25 11.0816 7.25 10.8746V5.99961C7.25 3.25199 8.39787 1.26449 10.4818 0.40311C10.673 0.32511 10.8928 0.414735 10.9715 0.60636C11.0506 0.79761 10.9599 1.01699 10.7682 1.09611C9.07662 1.79549 8.105 3.39599 8.00825 5.62461H11.7504C11.9577 5.62461 12.1254 5.79261 12.1254 5.99961V10.8746C12.1254 11.0816 11.9574 11.2496 11.75 11.2496Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_39373_4693">
                <rect
                  width="12"
                  height="12"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>

          <Text display={'flex'} flexDir={'column'} gap="8px">
            {typeof content === 'function' ? content() : content}
          </Text>
        </div>
      </Flex>
    </div>
  );
};

const UserReviews = (props: Props) => {
  const settings = {
    dots: true,
    infinite: true,
    dotsClass: 'slick-dots slick-thumb',
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 8000,
    arrows: false,
    // centerPadding: '24px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={s.wrapper}>
      <div className="slider-container">
        <Slider {...settings}>
          {CONTENT.map((item, index) => (
            <div key={index}>
              <Item {...item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default UserReviews;
