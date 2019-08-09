import * as React from 'react';
import { Range, List } from 'immutable';
import { ImageStyle, GalleryScrollableContainerStyle, DebuggingDiv, GalleryContainer, FakeImageStyle, IMG_HEIGTH, IMG_GAP, PILE_ZONE } from './GalleryStyle';
import { useEffect } from 'react';

type visibilityFn = (scrollTop: number) => { start: number; end: number } | null;
type positionFn = (index: number, scrollTop: number) => { top: string; left: string; zIndex: number };

function getVisibilityCalcFn(viewportHeight: number, visibilityPadding: number, blockHeight: number, gap: number): visibilityFn {
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

function getPositionCalcFn(viewportHeight: number, visibilityPadding: number, imgHeight: number, gap: number): positionFn {
  const BLOCK = imgHeight + gap;
  const deckSize = 40;

  return (index: number, scrollTop: number): { top: string; left: string; zIndex: number } => {
    const top = scrollTop + visibilityPadding;
    const bottom = scrollTop + viewportHeight - visibilityPadding;

    //If Block is higher than top bar
    if (BLOCK * (index + 1) < top) {
      return {
        top: `${visibilityPadding - imgHeight}px`,
        left: `15vw`,
        zIndex: index
      };
    } else if (BLOCK * (index + 1) - imgHeight > bottom) {
      return {
        top: `calc(100% - ${visibilityPadding}px)`,
        left: '15vw',
        zIndex: deckSize - 1 - index
      };
    } else {
      return {
        top: `${BLOCK * (index + 1) - imgHeight - scrollTop}px`,
        left: '15vw',
        zIndex: deckSize
      };
    }
  };
}

export interface IGalleyProps {}

export const Gallery = React.memo(
  (props: IGalleyProps) => {
    const ANGLE_VARIATION = 10; // Angle randomization factor
    const OFFSET_VARIATION = 30; // Offset randomization factor
    const hash = Date.now();
    const randomized: List<{ offsetX: number; offsetY: number; deg: number }> = Range(0, 40)
      .map(() => ({
        offsetX: Math.round(Math.random() * OFFSET_VARIATION),
        offsetY: Math.round(Math.random() * OFFSET_VARIATION),
        deg: Math.round(Math.random() * ANGLE_VARIATION * 2 - ANGLE_VARIATION)
      }))
      .toList();
    console.log(randomized.toJS());

    const hashMap = new Map<number, HTMLElement>();

    useEffect(() => {
      const debuggerDiv: HTMLElement = document.getElementById('debugger')!;

      const scrollableContainer: HTMLElement = document.getElementById(`${hash}_scrollableContainer`)!;
      const getVisibleBlocks: visibilityFn = getVisibilityCalcFn(scrollableContainer.clientHeight, PILE_ZONE, IMG_HEIGTH, IMG_GAP);
      const getPosition: positionFn = getPositionCalcFn(scrollableContainer.clientHeight, PILE_ZONE, IMG_HEIGTH, IMG_GAP);

      Range(0, 40).forEach(index => {
        const el: HTMLElement = document.getElementById(`${hash}_${index}`)!;

        hashMap.set(index, el);

        const { top, left, zIndex } = getPosition(index, scrollableContainer.scrollTop);
        el.style.top = top;
        el.style.left = left;
        el.style.zIndex = String(zIndex);
        el.style.visibility = 'inherit';
      });

      let currentBlocks = getVisibleBlocks(scrollableContainer.scrollTop);

      scrollableContainer.addEventListener('scroll', () =>
        requestAnimationFrame(() => {
          debuggerDiv.innerHTML = `[${JSON.stringify(getVisibleBlocks(scrollableContainer.scrollTop))}]`;

          const newBlocks = getVisibleBlocks(scrollableContainer.scrollTop);

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
            const { top, left, zIndex } = getPosition(index, scrollableContainer.scrollTop);
            const el = hashMap.get(index)!;
            el.style.top = top;
            el.style.left = left;
            el.style.zIndex = String(zIndex);
          }

          currentBlocks = newBlocks;
        })
      );
    });

    return (
      <div id={`${hash}_container`} className={GalleryContainer}>
        <div id={`${hash}_scrollableContainer`} className={GalleryScrollableContainerStyle}>
          <div className={DebuggingDiv} id="debugger" />
          {Range(0, 40).map(index => (
            <div className={FakeImageStyle} key={index}>
              {index}
            </div>
          ))}
        </div>
        {Range(39, -1, -1).map(index => (
          <div id={`${hash}_${index}`} className={ImageStyle} key={index} style={{ visibility: 'hidden' }}>
            {index}
          </div>
        ))}
      </div>
    );
  },
  () => true
);
