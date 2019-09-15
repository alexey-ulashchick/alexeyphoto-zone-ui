import * as React from 'react';
import { Range, List } from 'immutable';
import { ImageContainerStyle, GalleryScrollableContainerStyle, GalleryContainer, ImageStyle } from './GalleryStyle';
import { useEffect } from 'react';
import { getVisibilityCalcFn, VisibilityFn, RndFactor, PositionFn, getPositionCalcFn, ElStyle, scaleFn } from './GelleyHelpers';

const DECK_SIZE = 20;
const ANGLE_DEVIATION = 5; // Angle randomization factor
const POSITION_DEVIATION = 20; // Offset randomization factor
const RND_LIST: List<RndFactor> = Range(0, DECK_SIZE)
  .map(() => ({
    offsetX: Math.round(Math.random() * 2 * POSITION_DEVIATION - POSITION_DEVIATION),
    offsetY: Math.round(Math.random() * POSITION_DEVIATION),
    deg: Math.round(Math.random() * ANGLE_DEVIATION * 2 - ANGLE_DEVIATION)
  }))
  .toList();

export interface IGalleyProps {
  files: List<string>;
}

export const Gallery = React.memo(
  (props: IGalleyProps) => {
    const hash = Date.now();
    const elMap = new Map<number, HTMLElement>();

    function applyStyle(index: number, style: ElStyle): HTMLElement {
      const el = elMap.get(index)!;
      el.style.top = style.top;
      el.style.left = style.left;
      el.style.zIndex = String(style.zIndex);
      el.style.transform = style.transform;

      return el;
    }

    useEffect(() => {
      const scrollableContainer: HTMLElement = document.getElementById(`${hash}_scrollableContainer`)!;

      const VH = scrollableContainer.clientHeight;
      const VW = scrollableContainer.clientWidth;

      const BOX_WIDTH = VW * 0.95;
      const BOX_HEIGHT = VH * 0.95;
      const IMG_GAP = BOX_HEIGHT * 0.25;

      const DESCALED = BOX_HEIGHT * scaleFn(1);
      const PILE_ZONE = BOX_HEIGHT - DESCALED - (BOX_HEIGHT - DESCALED)/2 + BOX_HEIGHT * scaleFn(1) * 0.3;

      (scrollableContainer.firstElementChild! as HTMLElement).style.height = `${(BOX_HEIGHT + IMG_GAP) * DECK_SIZE + IMG_GAP}px`;

      const visibilityFn: VisibilityFn = getVisibilityCalcFn(scrollableContainer.clientHeight, PILE_ZONE, BOX_HEIGHT, IMG_GAP);
      const positionFn: PositionFn = getPositionCalcFn(scrollableContainer.clientHeight, PILE_ZONE, BOX_WIDTH, BOX_HEIGHT, IMG_GAP, RND_LIST, DECK_SIZE);

      Range(0, DECK_SIZE).forEach(index => {
        const el: HTMLElement = document.getElementById(`${hash}_${index}`)!;

        elMap.set(index, el);

        applyStyle(index, positionFn(index, scrollableContainer.scrollTop));
        el.style.visibility = 'inherit';
        el.style.width = `${BOX_WIDTH}px`;
        el.style.height = `${BOX_HEIGHT}px`;
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
            applyStyle(index, positionFn(index, scrollableContainer.scrollTop));
          }

          currentBlocks = newBlocks;
        })
      );
    });

    return (
      <div id={`${hash}_container`} className={GalleryContainer}>
        <div id={`${hash}_scrollableContainer`} className={GalleryScrollableContainerStyle}>
          <div></div>
        </div>
        {Range(0, DECK_SIZE).map(index => (
          <div id={`${hash}_${index}`} className={ImageContainerStyle} key={index} style={{ visibility: 'hidden' }}>
            <img src={props.files.get(index)} alt={props.files.get(index)} className={ImageStyle}/>
          </div>
        ))}
      </div>
    );
  },
  () => true
);
