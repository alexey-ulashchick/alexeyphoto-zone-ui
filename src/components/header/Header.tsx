import * as React from 'react';
import { style } from 'typestyle';
import { YELLOW, makeOverlay, GREY, WHITE, flexWithCenteredContent } from '../../styles/constants';

const header = style({
  backgroundColor: makeOverlay(GREY, 0.5).toString()
});

const title = style({
  fontSize: '3em',
  height: 'calc(calc(1em / 3) * 5.5)',
  fontFamily: `"Kaushan Script", cursive`,
  color: YELLOW.toString(),
}, flexWithCenteredContent);

const divider = style({
  height: '1px',
  backgroundColor: WHITE.fadeOut('25%').toString(),
  margin: '0 15%',
});

const subHeader = style({
  fontFamily: `"IBM Plex Sans Condensed", sans-serif`,
  fontSize: '1.125em',
  color: WHITE.toString(),
  textTransform: 'uppercase',
  height: 'calc(calc(1em / 1.125) * 3)',
}, flexWithCenteredContent);

export interface HeaderProps {
  title: string;
  subTitle: string;

}

export function Header(props: HeaderProps) {
  return (
    <header className={header}>
      <div className={title}>{props.title}</div>
      <div className={divider} />
      <div className={subHeader}>{props.subTitle}</div>
    </header>
  );
}
