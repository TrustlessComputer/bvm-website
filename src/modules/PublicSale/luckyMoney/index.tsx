import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { closeModal, openModal } from '@/stores/states/modal/reducer';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import s from './styles.module.scss';
import range from 'lodash/range';
import random from 'lodash/random';
import { ENVELOPS } from './constants';
import { commonSelector } from '@/stores/states/common/selector';
import {
  IPublicSaleDailyReward,
  IPublicSaleLuckyMoney,
  claimPublicSaleLuckyMoney,
  getPublicSaleDailyReward,
  getPublicSaleLeaderBoards,
  getPublicSaleLuckyMoney,
} from '@/services/public-sale';
import {
  requestReload,
  setCurrentLuckyMoney,
  setLuckyMoneyList,
  setPublicSaleDailyReward,
} from '@/stores/states/common/reducer';
import dayjs from 'dayjs';

import {
  Money,
  getRectangleCoordinates,
  getRotatedObjectCoordinates,
  isPointInsideRotatedObject,
} from './helpers';
import LuckyMoneyModal from './LuckMoneyModal';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import AuthenStorage from '@/utils/storage/authen.storage';

function LuckyMoney() {
  const dispatch = useAppDispatch();

  const needReload = useAppSelector(commonSelector).needReload;
  const luckyMoneyList = useAppSelector(commonSelector).luckyMoneyList;
  const currentLuckyMoney = useAppSelector(commonSelector).currentLuckyMoney;

  // useEffect(() => {
  //   dispatch(
  //     openModal({
  //       id: 'lucky-money-dialog',
  //       disableBgClose: true,
  //       contentPadding: 0,
  //       hideCloseButton: true,
  //       className: s.Modal,
  //       render: () => <LuckyMoneyModal envelopSrc={ENVELOPS[0].src} />,
  //     }),
  //   );
  // }, []);

  const makeInRain = () => {
    let width: number;
    let height: number;
    const imageHeight = 100;
    let fallingMoney: Money[] = [];
    let interval: ReturnType<typeof setInterval>;
    let canvas: HTMLCanvasElement;
    let id = uuidv4();

    let currentImageWidth = 0;
    let currentImageHeight = 0;

    let canvasContext: CanvasRenderingContext2D | null = null;

    const envelop = ENVELOPS[Math.floor(Math.random() * 7)];
    const angles = Array.from(Array(10)).map(() => Math.random() * 0.1);
    const radiusRandom = Array.from(Array(10)).map(() => Math.random() * 10);

    function clearWindow() {
      canvasContext?.clearRect(0, 0, width, height);
    }

    function draw() {
      clearWindow();

      fallingMoney.forEach(function (money, index) {
        drawRotatedImage(money);

        money.currentFrame += 1;
        money.y += money.speed;
        money.angle += money.direction * angles[index];
        const radius = money.direction * (radiusRandom[index] + (index % 6));
        money.x +=
          Math.sin((money.currentFrame + index) / (2 * Math.PI)) * radius;
      });
    }

    const mouseDownHandler = (evt: any) => {
      const mouseX = evt.clientX - canvas.getBoundingClientRect().left;
      const mouseY = evt.clientY - canvas.getBoundingClientRect().top;

      let grabbedIndex = -1;
      fallingMoney.forEach(function (money, index) {
        const coordinates = getRectangleCoordinates(
          money.x,
          money.y,
          money.angle,
          currentImageWidth,
          currentImageHeight,
        );

        if (isPointInsideRotatedObject(mouseX, mouseY, coordinates)) {
          console.log('grabbed package');
          grabbedIndex = index;
          dispatch(
            openModal({
              id: 'lucky-money-dialog',
              disableBgClose: true,
              contentPadding: 0,
              hideCloseButton: true,
              className: s.Modal,
              render: () => <LuckyMoneyModal envelopSrc={envelop.src} />,
            }),
          );
        }

        if (grabbedIndex !== -1) {
          fallingMoney.splice(grabbedIndex, 1);
          draw();
        }
      });
    };

    const initAnimation = () => {
      const numMoney = Math.floor(Math.random() * 10);
      const speedOffset = 3.5;
      const speedRange = 5;
      const numImages = 6;
      const frameRate = 1000 / 30; // 30 frames per second
      const animationLength = 15000; // 10 seconds

      const canvas = document.getElementById(id) as HTMLCanvasElement;
      if (canvas) {
        document.addEventListener('mousedown', mouseDownHandler);

        canvasContext = canvas.getContext('2d');
        range(numMoney).forEach(function (index) {
          const isOdd = index % 2 == 1;
          let direction = 0;
          if (isOdd) direction = 1;
          else direction = -1;

          const money: Money = {
            image: new Image(),
            x: random(width),
            y: random(-height * 1, -imageHeight),
            angle: random(2 * Math.PI),
            speed: speedOffset + random(speedRange),
            currentFrame: 0,
            direction: direction,
          };

          money.image.src = envelop.src;
          fallingMoney.push(money);
        });

        interval = setInterval(function () {
          draw();
        }, frameRate);

        setTimeout(function () {
          endAnimation();
        }, animationLength);
      }
    };

    function drawRotatedImage(money: Money) {
      canvasContext?.save();
      canvasContext?.translate(money.x, money.y);
      canvasContext?.rotate(money.angle);

      currentImageWidth = 100;
      currentImageHeight = (100 * money.image.height) / money.image.width;

      canvasContext?.drawImage(
        money.image,
        0,
        0,
        currentImageWidth,
        currentImageHeight,
      );

      canvasContext?.restore();
    }

    function endAnimation() {
      document.removeEventListener('mousedown', mouseDownHandler);
      clearInterval(interval);
      fallingMoney = [];
      canvas?.remove();
    }

    width = window.innerWidth;
    height = window.innerHeight;

    canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.width = width;
    canvas.height = height;
    canvas.classList.add(s.canvas);

    document.body.append(canvas);
    initAnimation();
  };

  useEffect(() => {
    getListLuckyMoney();
  }, [needReload]);

  const getListLuckyMoney = async () => {
    const res = await getPublicSaleLuckyMoney();
    dispatch(setLuckyMoneyList(res));
  };

  useEffect(() => {
    getLatestCurrentLuckyMoney();
  }, [luckyMoneyList]);

  const getLatestCurrentLuckyMoney = () => {
    if (luckyMoneyList) {
      for (let i = 0, k; i < luckyMoneyList.length; i++) {
        const lm = luckyMoneyList[i];

        if (dayjs().utc().isBefore(dayjs(lm.created_at))) {
          dispatch(setCurrentLuckyMoney(lm));
          break;
        }
      }
    }
  };

  const timeouts = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  useEffect(() => {
    console.log(timeouts);
    if ((timeouts.current as any)?.[(currentLuckyMoney as any)?.id]) {
      console.log('_________clear', currentLuckyMoney?.id);
      clearTimeout((timeouts.current as any)?.[(currentLuckyMoney as any)?.id]);
    }
    if (currentLuckyMoney?.created_at) {
      const timeSpan = dayjs(currentLuckyMoney?.created_at).diff(dayjs());

      if (timeSpan > 0) {
        console.log('_________set', currentLuckyMoney?.id, timeSpan);
        (timeouts.current as any)[(currentLuckyMoney as any)?.id] = setTimeout(
          () => {
            makeInRain();
            getListLuckyMoney();
          },
          timeSpan,
        );
      }
    }
  }, [currentLuckyMoney?.id]);

  if (typeof window !== 'undefined') {
    (window as any).makeItRain = makeInRain;
  }

  return <></>;
}

export default function Wrapper() {
  const needReload = useAppSelector(commonSelector).needReload;
  const dispatch = useAppDispatch();
  const [dailyReward, setDailyReward] =
    useState<IPublicSaleDailyReward | null>();
  const refInterval = useRef<any>(undefined);
  const [userContributeInfo, setUserContributeInfo] =
    useState<ILeaderBoardPoint>();

  const token =
    AuthenStorage.getAuthenKey() || AuthenStorage.getGuestAuthenKey();

  const getUserContributeInfo = async () => {
    const { data } = await getPublicSaleLeaderBoards({
      page: 1,
      limit: 0,
    });

    if (data[0]?.need_active) {
      setUserContributeInfo(data[0]);
    }
  };

  const getProgramInfo = async () => {
    try {
      const res = await getPublicSaleDailyReward();
      setDailyReward(res);
      dispatch(setPublicSaleDailyReward(res));
    } catch (e) {
    } finally {
    }
  };

  useEffect(() => {
    if (token) {
      getUserContributeInfo();
    }
  }, [token, needReload]);

  useEffect(() => {
    getProgramInfo();

    if (refInterval?.current) {
      clearInterval(refInterval.current);
    }

    refInterval.current = setInterval(() => {
      getProgramInfo();
    }, 300000);

    return () => {
      if (refInterval?.current) {
        clearInterval(refInterval.current);
      }
    };
  }, [needReload]);

  if (userContributeInfo?.usdt_value) {
    return <LuckyMoney />;
  }

  return <></>;
}
