import * as React from 'react';
import { style, media } from 'typestyle';
import { YELLOW, makeOverlay, GREY, WHITE, flexWithCenteredContent, textShadow, fontSizeAndHeight } from '../../styles/constants';

const header = style({
  backgroundColor: makeOverlay(GREY, 0.5).toString()
});

const title = style(
  {
    fontFamily: `"Kaushan Script", cursive`,
    color: YELLOW.toString()
  },
  flexWithCenteredContent,
  textShadow,
  fontSizeAndHeight(3, 5.5),
  media({ maxWidth: '1440px' }, fontSizeAndHeight(2.8, 5.5)),
  media({ maxWidth: '1366px' }, fontSizeAndHeight(2.8, 5.5)),
  media({ maxWidth: '1024px' }, fontSizeAndHeight(2.5, 5)),
  media({ maxWidth: '768px' }, fontSizeAndHeight(2.2, 5)),
  media({ maxWidth: '600px' }, fontSizeAndHeight(1.8, 4)),
);

const divider = style({
  height: '1px',
  backgroundColor: WHITE.fadeOut('25%').toString(),
  margin: '0 15%'
});

const subHeader = style(
  {
    fontFamily: `"IBM Plex Sans Condensed", sans-serif`,
    color: WHITE.toString(),
    textTransform: 'uppercase',
  },
  fontSizeAndHeight(1.125, 3),
  flexWithCenteredContent,
  textShadow,
  media({ maxWidth: '1440px' }, fontSizeAndHeight(1.125, 3)),
  media({ maxWidth: '1366px' }, fontSizeAndHeight(1.125, 3)),
  media({ maxWidth: '1024px' }, fontSizeAndHeight(1, 2.75)),
  media({ maxWidth: '768px' }, fontSizeAndHeight(1, 2.75)),
  media({ maxWidth: '600px' }, fontSizeAndHeight(0.875, 2.5)),
);

export interface HeaderProps {
  title: string;
  subTitle: string;
  className: string;
}

export function Header(props: HeaderProps) {
  return (
    <header className={`${header} ${props.className}`}>
      <div className={title}>{props.title}</div>
      <div className={divider} />
      <div className={subHeader}>{props.subTitle}</div>
    </header>
  );
}

