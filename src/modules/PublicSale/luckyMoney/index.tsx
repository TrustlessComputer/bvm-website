import { useAppDispatch } from '@/stores/hooks';
import { openModal } from '@/stores/states/modal/reducer';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import s from './styles.module.scss';
import range from 'lodash/range';
import random from 'lodash/random';
import { ENVELOPS } from './constants';

type Point = {
  x: number;
  y: number;
};

function pointInConvexHull(point: Point, hull: [Point, Point, Point, Point]) {
  const n = hull.length;
  let isInside = true;

  for (let i = 0, j = n - 1; i < n; j = i++) {
    if (
      hull[i].y > point.y !== hull[j].y > point.y &&
      point.x <
        ((hull[j].x - hull[i].x) * (point.y - hull[i].y)) /
          (hull[j].y - hull[i].y) +
          hull[i].x
    ) {
      isInside = !isInside;
    }
  }

  return isInside;
}

function isPointInsideRotatedObject(
  pointX: number,
  pointY: number,
  rotatedObjectCoordinates: {
    topLeft: Point;
    topRight: Point;
    bottomLeft: Point;
    bottomRight: Point;
  },
) {
  // Extract the coordinates of the rotated object's corners
  const { topLeft, topRight, bottomLeft, bottomRight } =
    rotatedObjectCoordinates;

  // Check if the point is inside the convex hull formed by the rotated object's corners
  const isInsideConvexHull = pointInConvexHull({ x: pointX, y: pointY }, [
    topLeft,
    topRight,
    bottomRight,
    bottomLeft,
  ]);

  return isInsideConvexHull;
}

function getRotatedObjectCoordinates(
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  angleInRadians: number,
) {
  // Calculate the half-width and half-height
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  // Calculate the coordinates of the corners relative to the center
  const topLeftX = -halfWidth;
  const topLeftY = -halfHeight;
  const topRightX = halfWidth;
  const topRightY = -halfHeight;
  const bottomLeftX = -halfWidth;
  const bottomLeftY = halfHeight;
  const bottomRightX = halfWidth;
  const bottomRightY = halfHeight;

  // Apply rotation to each corner
  const rotatedTopLeft = rotatePoint(topLeftX, topLeftY, angleInRadians);
  const rotatedTopRight = rotatePoint(topRightX, topRightY, angleInRadians);
  const rotatedBottomLeft = rotatePoint(
    bottomLeftX,
    bottomLeftY,
    angleInRadians,
  );
  const rotatedBottomRight = rotatePoint(
    bottomRightX,
    bottomRightY,
    angleInRadians,
  );

  // Translate the rotated points to the absolute coordinates
  const absoluteTopLeft = {
    x: rotatedTopLeft.x + centerX,
    y: rotatedTopLeft.y + centerY,
  };
  const absoluteTopRight = {
    x: rotatedTopRight.x + centerX,
    y: rotatedTopRight.y + centerY,
  };
  const absoluteBottomLeft = {
    x: rotatedBottomLeft.x + centerX,
    y: rotatedBottomLeft.y + centerY,
  };
  const absoluteBottomRight = {
    x: rotatedBottomRight.x + centerX,
    y: rotatedBottomRight.y + centerY,
  };

  return {
    topLeft: absoluteTopLeft,
    topRight: absoluteTopRight,
    bottomLeft: absoluteBottomLeft,
    bottomRight: absoluteBottomRight,
  };
}

function rotatePoint(x: number, y: number, angleInRadians: number) {
  const rotatedX = x * Math.cos(angleInRadians) - y * Math.sin(angleInRadians);
  const rotatedY = x * Math.sin(angleInRadians) + y * Math.cos(angleInRadians);
  return { x: rotatedX, y: rotatedY };
}

type Money = {
  image: HTMLImageElement;
  x: number;
  y: number;
  angle: number;
  speed: number;
  currentFrame: number;
  direction: number;
};

export default function LuckyMoney() {
  const dispatch = useAppDispatch();

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

    function clearWindow() {
      canvasContext?.clearRect(0, 0, width, height);
    }

    function draw() {
      clearWindow();

      fallingMoney.forEach(function (money, index) {
        drawRotatedImage(money);

        money.currentFrame += 1;
        money.y += money.speed;
        money.angle += money.direction * 0.1;
        const radius = money.direction * (10 + (index % 6));
        money.x +=
          Math.sin((money.currentFrame + index) / (2 * Math.PI)) * radius;
      });
    }

    const initAnimation = () => {
      const numMoney = Math.floor(Math.random() * 10);
      // const numMoney = 1;
      const speedOffset = 10;
      const speedRange = 5;
      const numImages = 6;
      const frameRate = 1000 / 30; // 30 frames per second
      const animationLength = 10000; // 10 seconds

      const canvas = document.getElementById(id) as HTMLCanvasElement;
      if (canvas) {
        canvas.addEventListener('mousedown', (evt) => {
          const mouseX = evt.clientX - canvas.getBoundingClientRect().left;
          const mouseY = evt.clientY - canvas.getBoundingClientRect().top;

          fallingMoney.forEach(function (money, index) {
            const coordinates = getRotatedObjectCoordinates(
              money.x,
              money.y,
              currentImageWidth,
              currentImageHeight,
              money.angle,
            );

            if (isPointInsideRotatedObject(mouseX, mouseY, coordinates)) {
              dispatch(
                openModal({
                  id: 'lucky-money-dialog',
                  contentPadding: 0,
                  // hideCloseButton: true,
                  className: s.Modal,
                  render: () => (
                    <div>
                      <img src={envelop.src} />
                    </div>
                  ),
                }),
              );
            }
          });
        });

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
          // const money: Money = {
          //   image: new Image(),
          //   x: 500,
          //   y: 500,
          //   angle: random(2 * Math.PI),
          //   speed: speedOffset + random(speedRange),
          //   currentFrame: 0,
          //   direction: direction,
          // };

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

  if (typeof window !== 'undefined') {
    (window as any).makeItRain = makeInRain;
  }

  return <></>;
}
