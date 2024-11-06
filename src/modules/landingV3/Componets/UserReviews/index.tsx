import React from 'react';
import Slider from 'react-slick';
import s from './UserReviews.module.scss';
import { Flex, Image } from '@chakra-ui/react';

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
        Rollups are the new server.
        <br /> Rollup as a service providers are the new Wordpress.
        <br />
        <br /> They handle the infra so you can focus on the user experience /
        application / business logic
        <br />
        <br /> lfg! crazy to think this is all happening
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
        @ethereum is the verifiable internet
        <br />
        Rollups are the verifiable web server
        <br />
        @eigenlayer is the verifiable cloud
        <br />
        eoracle is the verifiable real-world
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
        The future of Ethereum interop will resemble the cloud today
        <br />
        <br />
        Rollups = on-chain web servers
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
        <Flex alignItems={'flex-end'} gap="12px">
          <Image src={avatarSrc} alt="user avatar" />
          <div className={s.user_info}>
            <div className={s.name}>{name}</div>
            <div className={s.username}>{username}</div>
          </div>
        </Flex>
      </div>
      <Flex flexDir={'column'} justifyContent={'space-between'} h="100%">
        <div className={s.text}>
          <p>{typeof content === 'function' ? content() : content}</p>
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
