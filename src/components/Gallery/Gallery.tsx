import * as React from 'react';
import { Range } from 'immutable';
import { ImageStyle, GalleryScrollableContainerStyle, DebuggingDiv, GalleryContainer, FakeImageStyle, topLine } from './GalleryStyle';
import { useEffect } from 'react';
import { number } from 'prop-types';

export interface IGalleyProps {}

export const Gallery = React.memo(
  (props: IGalleyProps) => {
    const hash = Date.now();
    console.log('I never going to rerender');
    const list = Range(0, 40)
      .map(() => Math.round(Math.random() * 20 - 10))
      .toList();
    const hashMap = new Map<number, HTMLElement>();
    const clonesMap = new Map<number, HTMLElement>();
    const sticked = new Set<number>();
    const IMG_HEIGTH = 250;
    const IMG_GAP = 500;
    const BLOCK = IMG_GAP + IMG_HEIGTH;
    const PILE_ZONE = 0.15; //%

    useEffect(() => {
      const debuggerDiv: HTMLElement = document.getElementById('debugger')!;
      const scrollableContainer: HTMLElement = document.getElementById(`${hash}_scrollableContainer`)!;
      const HEIGHT = scrollableContainer.clientHeight;
      const SCROLL_AREA_START = PILE_ZONE * HEIGHT;
      const SCROLL_AREA = HEIGHT - 2 * SCROLL_AREA_START;

      console.log(`Initial scroll=${scrollableContainer.scrollTop}`);
      console.log(`H=${HEIGHT}, START=${SCROLL_AREA_START}, AREA=${SCROLL_AREA}`);

      list.forEach((_, index) => {
        hashMap.set(index, document.getElementById(`${hash}_${index}`)!);
      });

      scrollableContainer.addEventListener('scroll', () =>
        requestAnimationFrame(() => {
          const start = scrollableContainer.scrollTop;
          const end = start + HEIGHT;

          const firstPotentialBlock = 1 + Math.floor((start - BLOCK) / BLOCK);
          const firstBlock = start + SCROLL_AREA_START < BLOCK + firstPotentialBlock * BLOCK ? firstPotentialBlock : firstPotentialBlock + 1;

          const lastPotentialBlock = Math.floor((end - IMG_GAP) / BLOCK);
          const lastBlock = end - SCROLL_AREA_START > IMG_GAP + lastPotentialBlock * BLOCK ? lastPotentialBlock : lastPotentialBlock - 1;

          debuggerDiv.innerHTML = `sroll=${end - SCROLL_AREA_START}, [${firstBlock},${lastBlock}]`;

          // debuggerDiv.innerHTML = `sroll=${start + SCROLL_AREA_START}, [${firstBlock},${lastBlock}]`;

          // for (let index = firstBlock; index <= lastBlock; index++) {
          // const deg = list.get(index)!;
          // const imgCenter = IMG_HEIGTH / 2 + index * (IMG_HEIGTH + IMG_GAP);

          // //Max distanse from center of the viewport
          // const max = HEIGHT / 2 + IMG_HEIGTH / 2;
          // const distance = start + HEIGHT / 2 - imgCenter;
          // const k = distance / max;

          // debuggerDiv.innerHTML += `<div>[${index}]=${list.get(index)}, 1-k=${1 - Math.abs(k)}</div>`;

          // if (1 - Math.abs(k) > 0.3) {
          //   if (sticked.has(index)) {
          //     sticked.delete(index);
          //     hashMap.get(index)!.style.visibility = 'inherit';
          //     if (clonesMap.has(index)) {
          //       clonesMap.get(index)!.parentNode!.removeChild(clonesMap.get(index)!);
          //     }
          //   }
          //   // hashMap.get(index)!.style.transform = `rotate(${k * deg}deg) scale(${0.5 + 0.5 * (1 - Math.abs(k))})`;
          //   // hashMap.get(index)!.style.transform = `rotate(${k * deg}deg)`;
          // } else if (!sticked.has(index)) {
          //   console.log('here');
          //   sticked.add(index);
          //   const clone: HTMLElement = hashMap.get(index)!.cloneNode(true) as HTMLElement;
          //   const rect = hashMap.get(index)!.getBoundingClientRect();
          //   console.log(rect);

          //   clone.setAttribute('id', `${clone}_${clone.getAttribute('id')}`);
          //   clone.style.transform = hashMap.get(index)!.style.transform;
          //   clone.style.position = 'absolute';
          //   clone.style.top = `${rect.top}px`;
          //   clone.style.left = `${rect.left}px`;
          //   clone.style.transition = '0.2s all ease';
          //   clone.style.zIndex = '0';
          //   scrollableContainer.appendChild(clone);
          //   clonesMap.set(index, clone);
          //   requestAnimationFrame(() => {
          //     if (k > 0) {
          //       clone.style.top = '-150px';
          //     } else {
          //     }
          //     // clone.style.top = '0';
          //     // clone.style.left = '0';
          //   });

          //   hashMap.get(index)!.style.visibility = 'hidden';
          // }

          // if (1 - Math.abs(k) < 0.3 && !sticked.has(index)) {
          //   hashMap.get(index)!.style.visibility = 'hidden';
          //   sticked.add(index);
          //   const clone: HTMLElement = hashMap.get(index)!.cloneNode() as HTMLElement;
          //   console.log(clone);
          // } else {

          //   hashMap.get(index)!.style.visibility = 'inherit';
          //   hashMap.get(index)!.style.transform = `rotate(${k * deg}deg) scale(${0.5 + 0.5 * (1 - Math.abs(k))})`;
          // }
          // }
        })
      );
    });

    return (
      <div id={`${hash}_container`} className={GalleryContainer}>
        <div id={`${hash}_scrollableContainer`} className={GalleryScrollableContainerStyle}>
          <div className={DebuggingDiv} id="debugger" />
          {list.map((deg, index) => (
            <div id={`${hash}_${index}`} className={FakeImageStyle} key={index}>
              {index}
            </div>
          ))}
        </div>
        <div className={topLine} />
      </div>
    );
  },
  () => true
);
