import * as React from 'react';
import { Range } from 'immutable';
import { ImageStyle, GalleryContainerStyle, DebuggingDiv } from './GalleryStyle';
import { useEffect } from 'react';

export interface IGalleyProps {}

export const Gallery = React.memo(
  (props: IGalleyProps) => {
    const hash = Date.now();
    console.log('I never going to rerender');
    const list = Range(0, 40).map(() => Math.round(Math.random() *20 - 10)).toList();
    const hashMap = new Map<number, HTMLElement>();
    const IMG_HEIGTH = 250;
    const IMG_GAP = 500;


    useEffect(() => {
      const debuggerDiv: HTMLElement = document.getElementById('debugger')!;
      const container: HTMLElement = document.getElementById(`${hash}_container`)!;
      const TOTAL = container.scrollHeight;
      const HEIGHT = container.clientHeight;

      list.forEach((_, index) => {
        hashMap.set(index, document.getElementById(`${hash}_${index}`)!);
      });

      console.log(list.toArray());

      container.addEventListener('scroll', () => requestAnimationFrame(() =>{
        const start = container.scrollTop;
        const end = start + HEIGHT;

        const firstBlock = 1 + Math.floor((start-IMG_HEIGTH) / (IMG_HEIGTH + IMG_GAP));
        const lastBlock = Math.floor(end / (IMG_HEIGTH + IMG_GAP));

        debuggerDiv.innerHTML = '';

        for (let index=firstBlock; index <= lastBlock; index++) {
          const deg = list.get(index)!;
          const imgCenter = IMG_HEIGTH/2 + index * (IMG_HEIGTH + IMG_GAP);

          //Max distanse from center of the viewport
          const max = HEIGHT / 2 + IMG_HEIGTH /2;
          const distance = start + HEIGHT / 2 - imgCenter;
          const k = distance / max;


          debuggerDiv.innerHTML += `<div>[${index}]=${list.get(index)}, 1-k=${1-Math.abs(k)}</div>`;
          hashMap.get(index)!.style.transform = `rotate(${k * deg}deg) scale(${0.5 + 0.5*(1-Math.abs(k))})`;
        }

      }));

    });

    return (
      <div id={`${hash}_container`} className={GalleryContainerStyle}>
        <div className={DebuggingDiv} id="debugger">
        </div>
        {list.map((deg, index) => (
          <div id={`${hash}_${index}`} className={ImageStyle} key={index} style={{transform: `rotate(${deg}deg) scale(0.5)`}}>
            {index}
          </div>
        ))}
      </div>
    );
  },
  () => true
);
