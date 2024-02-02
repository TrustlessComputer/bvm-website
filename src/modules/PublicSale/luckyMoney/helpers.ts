export type Money = {
  image: HTMLImageElement;
  x: number;
  y: number;
  angle: number;
  speed: number;
  currentFrame: number;
  direction: number;
};

export type Point = {
  x: number;
  y: number;
};

export function pointInConvexHull(
  point: Point,
  hull: [Point, Point, Point, Point],
) {
  const n = hull.length;
  let isInside = false;

  for (let i = 0, j = n - 1; i < n; j = i++) {
    if (
      hull[i].y > point.y !== hull[j].y > point.y &&
      point.x >
        ((hull[j].x - hull[i].x) * (point.y - hull[i].y)) /
          (hull[j].y - hull[i].y) +
          hull[i].x
    ) {
      isInside = !isInside;
    }
  }

  return isInside;
}

export function isPointInsideRotatedObject(
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

export function getRotatedObjectCoordinates(
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

export function rotatePoint(x: number, y: number, angleInRadians: number) {
  const rotatedX = x * Math.cos(angleInRadians) - y * Math.sin(angleInRadians);
  const rotatedY = x * Math.sin(angleInRadians) + y * Math.cos(angleInRadians);
  return { x: rotatedX, y: rotatedY };
}
