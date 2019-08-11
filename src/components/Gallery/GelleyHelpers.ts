import { List } from 'immutable';

export type VisibilityFn = (scrollTop: number) => { start: number; end: number } | null;
export type ElStyle = { top: string; left: string; zIndex: number; transform: string }
export type PositionFn = (index: number, scrollTop: number) => ElStyle;
export type RndFactor = { offsetX: number; offsetY: number; deg: number };

/**
 * Prepare function which return first and last indexes of the blocks on the screen.
 */
export function getVisibilityCalcFn(viewportHeight: number, visibilityPadding: number, imageHeight: number, gap: number): VisibilityFn {
  const BLOCK = imageHeight + gap;

  return (scrollTop: number): { start: number; end: number } | null => {
    const end = scrollTop + viewportHeight;

    const firstPotentialBlock = 1 + Math.floor((scrollTop - BLOCK) / BLOCK);
    const firstBlock = scrollTop + visibilityPadding < BLOCK + firstPotentialBlock * BLOCK ? firstPotentialBlock : firstPotentialBlock + 1;

    const lastPotentialBlock = Math.floor((end - gap) / BLOCK);
    const lastBlock = end - visibilityPadding > gap + lastPotentialBlock * BLOCK ? lastPotentialBlock : lastPotentialBlock - 1;

    return firstBlock > lastBlock ? null : { start: firstBlock, end: lastBlock };
  };
}

/**
 * Prepare function which returns styles that need to be applied to the image based on current scrollTop position.
 */
export function getPositionCalcFn(vh: number, padding: number, imgHeight: number, gap: number, rndList: List<RndFactor>, deckSize: number): PositionFn {
  const BLOCK = imgHeight + gap;
  const VISIBILITY_ZONE = vh - 2 * padding;

  function calcX(top: number, initialOffset: number, initialDeg: number): { offsetX: number; deg: number; scale: number } {
    const kCenter = Math.abs(vh / 2 - (top + imgHeight / 2)) / (VISIBILITY_ZONE / 2 + imgHeight / 2);
    return { offsetX: quadFn(initialOffset, kCenter), deg: quadFn(initialDeg, kCenter), scale: scaleFn(kCenter) };
  }

  return (index: number, scrollTop: number): ElStyle => {
    const rnd: RndFactor = rndList.get(index) || { offsetX: 0, offsetY: 0, deg: 0 };
    const topLine = scrollTop + padding + rnd.offsetY;
    const bottomLine = scrollTop + vh - padding - rnd.offsetY;

    let top: number, zIndex: number;

    //If Block is higher than top bar
    if (BLOCK * (index + 1) < topLine) {
      top = padding - imgHeight + rnd.offsetY;
      zIndex = index;
    } else if (BLOCK * (index + 1) - imgHeight > bottomLine) {
      top = vh - padding - rnd.offsetY;
      zIndex = deckSize - 1 - index;
    } else {
      top = BLOCK * (index + 1) - imgHeight - scrollTop;
      zIndex = deckSize;
    }

    const { offsetX, deg, scale } = calcX(top, rnd.offsetX, rnd.deg);

    return {
      top: `${top}px`,
      left: `calc(50% + ${offsetX - (imgHeight/2)}px)`,
      transform: `rotate(${deg}deg) scale(${scale}) translateZ(0)`,
      zIndex
    };
  };
}

/**
 * Polinomial function for scale factor calculations (-1 <= x <= 1).
 * https://www.desmos.com/calculator/0fwuwn2ni0
 */
export function scaleFn(x: number): number {
  return -0.7 * Math.pow(x, 4) + 1;
}

export function quadFn(a: number, x: number): number {
  return a * x * x;
}
