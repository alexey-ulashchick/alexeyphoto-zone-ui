import * as React from 'react';
import { Range, List } from 'immutable';
import { ImageStyle, GalleryScrollableContainerStyle, DebuggingDiv, GalleryContainer, IMG_HEIGTH, IMG_GAP, PILE_ZONE } from './GalleryStyle';
import { useEffect } from 'react';

const DECK_SIZE = 20;

type VisibilityFn = (scrollTop: number) => { start: number; end: number } | null;
type PositionFn = (index: number, scrollTop: number) => { top: string; left: string; zIndex: number, transform: string };
type RndFactor = { offsetX: number; offsetY: number; deg: number };

function scaleFn(x: number): number {
  return -0.5 * x * x *x*x+ 1;
}

function getVisibilityCalcFn(viewportHeight: number, visibilityPadding: number, blockHeight: number, gap: number): VisibilityFn {
  const BLOCK = blockHeight + gap;

  return (scrollTop: number): { start: number; end: number } | null => {
    const end = scrollTop + viewportHeight;

    const firstPotentialBlock = 1 + Math.floor((scrollTop - BLOCK) / BLOCK);
    const firstBlock = scrollTop + visibilityPadding < BLOCK + firstPotentialBlock * BLOCK ? firstPotentialBlock : firstPotentialBlock + 1;

    const lastPotentialBlock = Math.floor((end - gap) / BLOCK);
    const lastBlock = end - visibilityPadding > gap + lastPotentialBlock * BLOCK ? lastPotentialBlock : lastPotentialBlock - 1;

    return firstBlock > lastBlock ? null : { start: firstBlock, end: lastBlock };
  };
}

function getPositionCalcFn(viewportHeight: number, visibilityPadding: number, imgHeight: number, gap: number, rndList: List<RndFactor>): PositionFn {
  const BLOCK = imgHeight + gap;
  const VISIBILITY_ZONE = viewportHeight - 2 * visibilityPadding;

  function calcX(top: number, initialOffset: number, initialDeg: number): {offsetX: number, deg: number, scale: number} {
    const kCenter = Math.abs((viewportHeight / 2) - (top + imgHeight /2)) / (VISIBILITY_ZONE /2 + imgHeight /2);
    return {offsetX: kCenter * kCenter * initialOffset, deg: kCenter * kCenter * initialDeg, scale: scaleFn(kCenter)};
  }

  return (index: number, scrollTop: number): { top: string; left: string; zIndex: number, transform: string } => {
    const rnd: RndFactor = rndList.get(index) || {offsetX: 0, offsetY: 0, deg: 0};
    const topLine = scrollTop + visibilityPadding + rnd.offsetY;
    const bottomLine = scrollTop + viewportHeight - visibilityPadding - rnd.offsetY;

    let top: number, zIndex: number;

    //If Block is higher than top bar
    if (BLOCK * (index + 1) < topLine) {
      top = visibilityPadding - imgHeight + rnd.offsetY;
      zIndex = index;
    } else if (BLOCK * (index + 1) - imgHeight > bottomLine) {
      top = viewportHeight - visibilityPadding - rnd.offsetY;
      zIndex = DECK_SIZE - 1 - index;
    } else {
      top =  BLOCK * (index + 1) - imgHeight - scrollTop;
      zIndex = DECK_SIZE;
    }

    const {offsetX, deg, scale} = calcX(top, rnd.offsetX, rnd.deg);

    return {
      top: `${top}px`,
      left: `calc(15vw + ${offsetX}px)`,
      transform: `rotate(${deg}deg) scale(${scale}) translateZ(0)`,
      zIndex
    };
  };
}

export interface IGalleyProps {}

export const Gallery = React.memo(
  (props: IGalleyProps) => {
    const ANGLE_DEVIATION = 10; // Angle randomization factor
    const POSITION_DEVIATION = 15; // Offset randomization factor
    const hash = Date.now();
    const hashMap = new Map<number, HTMLElement>();
    const RND_LIST: List<RndFactor> = Range(0, DECK_SIZE)
      .map(() => ({
        offsetX: Math.round(Math.random() * 2 * POSITION_DEVIATION - POSITION_DEVIATION),
        offsetY: Math.round(Math.random() * POSITION_DEVIATION),
        deg: Math.round(Math.random() * ANGLE_DEVIATION * 2 - ANGLE_DEVIATION)
      }))
      .toList();

    useEffect(() => {
      const scrollableContainer: HTMLElement = document.getElementById(`${hash}_scrollableContainer`)!;
      const visibilityFn: VisibilityFn = getVisibilityCalcFn(scrollableContainer.clientHeight, PILE_ZONE, IMG_HEIGTH, IMG_GAP);
      const positionFn: PositionFn = getPositionCalcFn(scrollableContainer.clientHeight, PILE_ZONE, IMG_HEIGTH, IMG_GAP, RND_LIST);

      Range(0, DECK_SIZE).forEach(index => {
        const el: HTMLElement = document.getElementById(`${hash}_${index}`)!;

        hashMap.set(index, el);

        const { top, left, zIndex, transform } = positionFn(index, scrollableContainer.scrollTop);
        el.style.top = top;
        el.style.left = left;
        el.style.zIndex = String(zIndex);
        el.style.transform = transform;
        el.style.visibility = 'inherit';
      });

      let currentBlocks = visibilityFn(scrollableContainer.scrollTop);

      scrollableContainer.addEventListener('scroll', () =>
        requestAnimationFrame(() => {
          const newBlocks = visibilityFn(scrollableContainer.scrollTop);

          if (currentBlocks === null && newBlocks === null) {
            return;
          }

          const { start, end } =
            currentBlocks === null
              ? newBlocks!
              : newBlocks === null
              ? currentBlocks!
              : { start: Math.min(currentBlocks.start, newBlocks.start), end: Math.max(currentBlocks.end, newBlocks.end) };

          for (let index = start; index <= end; index++) {
            const { top, left, zIndex, transform } = positionFn(index, scrollableContainer.scrollTop);
            const el = hashMap.get(index)!;
            el.style.top = top;
            el.style.left = left;
            el.style.transform = transform;
            el.style.zIndex = String(zIndex);
          }

          currentBlocks = newBlocks;
        })
      );
    });

    return (
      <div id={`${hash}_container`} className={GalleryContainer}>
        <div id={`${hash}_scrollableContainer`} className={GalleryScrollableContainerStyle}>
            <div style={{height: `${(IMG_HEIGTH + IMG_GAP) * DECK_SIZE + IMG_GAP}px`}}></div>
        </div>
        {Range(0, DECK_SIZE).map(index => (
          <div id={`${hash}_${index}`} className={ImageStyle} key={index} style={{ visibility: 'hidden' }}>
            {index}
          </div>
        ))}
      </div>
    );
  },
  () => true
);
