import React from 'react';
import Slider from 'react-slick';
import s from './UserReviews.module.scss';
import { Flex, Image } from '@chakra-ui/react';

type Props = {};

type ItemProps = {
  avatarSrc: string;
  content: string;
  name: string;
  username: string;
};

const CONTENT = [
  {
    avatarSrc: '/landing-v6/avt-stonecoldpat0.png',
    content: `Rollups are the new server.
Rollup as a service providers are the new Wordpress.
They handle the infra so you can focus on the user experience /
application / business logic lfg! crazy to think this is all happening`,
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
    content: `@ethereum is the verifiable internet 
Rollups are the verifiable web server
@eigenlayer is the verifiable cloud 
eoracle is the verifiable real-world connection`,
    name: 'eOracle',
    username: '@eoracle_network',
  },
  {
    avatarSrc: '/landing-v6/avt-allred_chase.png',
    content: `If rollups are the new servers
What is the new Linux?`,
    name: 'Chunk',
    username: '@allred_chase',
  },
  {
    avatarSrc: '/landing-v6/avt-Polymer_Labs.png',
    content: `The future of Ethereum interop will resemble the cloud today 
Rollups = on-chain web servers`,
    name: 'Polymer Labs',
    username: '@Polymer_Labs',
  },
] as ItemProps[];

const Item = (props: ItemProps) => {
  const { avatarSrc, content, name, username } = props;

  return (
    <div className={s.item_wrapper}>
      <div className={s.avatar}>
        <Image src={avatarSrc} alt="user avatar" />
      </div>
      <Flex flexDir={'column'} justifyContent={'space-between'} h="100%">
        <div className={s.text}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <g clip-path="url(#clip0_39373_4693)">
              <path
                d="M4.875 11.2496H0.75C0.542625 11.2496 0.375 11.0816 0.375 10.8746V5.99961C0.375 3.25199 1.52287 1.26449 3.60675 0.40311C3.798 0.32511 4.01737 0.414735 4.0965 0.60636C4.17562 0.79761 4.08487 1.01699 3.89325 1.09611C2.20162 1.79549 1.23 3.39599 1.13325 5.62461H4.875C5.08238 5.62461 5.25 5.79261 5.25 5.99961V10.8746C5.25 11.0816 5.08238 11.2496 4.875 11.2496Z"
                fill="black"
              />
              <path
                d="M11.25 11.2496H7.125C6.91763 11.2496 6.75 11.0816 6.75 10.8746V5.99961C6.75 3.25199 7.89787 1.26449 9.98175 0.40311C10.173 0.32511 10.3928 0.414735 10.4715 0.60636C10.5506 0.79761 10.4599 1.01699 10.2682 1.09611C8.57662 1.79549 7.605 3.39599 7.50825 5.62461H11.2504C11.4577 5.62461 11.6254 5.79261 11.6254 5.99961V10.8746C11.6254 11.0816 11.4574 11.2496 11.25 11.2496Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_39373_4693">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p>{content}</p>
        </div>
        <div className={s.user_info}>
          <div className={s.name}>{name}</div>
          <div className={s.username}>{username}</div>
        </div>
      </Flex>
    </div>
  );
};

const UserReviews = (props: Props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoPlay: true,
    arrows: false,
    centerPadding: '24px',
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
