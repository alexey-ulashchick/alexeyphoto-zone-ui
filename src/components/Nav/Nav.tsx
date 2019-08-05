import * as React from 'react';
import { style, media } from 'typestyle';
import { flexWithCenteredContent, WHITE, textShadow, YELLOW, hoverAnimation } from '../../styles/constants';
import { Link } from 'react-router-dom';
import { LinkStyle } from './NavStyles';

const navList = style(
  {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    fontSize: '1.125em',
    display: 'flex',
    justifyContent: 'flex-end',
    background: `linear-gradient(270deg, rgba(51, 51, 51, 0.65) 0%, rgba(51, 51, 51, 0) 50%)`
  },
  textShadow,
  media(
    { maxWidth: '1024px' },{
      fontSize: '1em',
    }),
  media(
    { maxWidth: '600px' },
    {
      flexDirection: 'column',
      alignItems: 'end'
    }
  )
);

const navItem = style(flexWithCenteredContent, hoverAnimation, {
  fontFamily: `"IBM Plex Sans Condensed", sans-serif`,
  height: '3em',
  justifyContent: 'flex-end',
  width: '7em',
  paddingRight: '1em',
  boxSizing: 'border-box',
  cursor: 'pointer',
  color: WHITE.toString(),
  textDecoration: 'none',
  $nest: {
    '&:hover': {
      color: YELLOW.toString()
    }
  }
});

export interface INavProps {
  className?: string;
}

export function Nav(props: INavProps) {
  return (
    <ul className={`${navList} ${props.className || ''}`}>
      <Link className={LinkStyle} to="/recent"><li className={navItem}>Recent Posts</li></Link>
      <li className={navItem}>Gallery</li>
      <li className={navItem}>Stories</li>
      <li className={navItem}>Contact</li>
    </ul>
  );
}
