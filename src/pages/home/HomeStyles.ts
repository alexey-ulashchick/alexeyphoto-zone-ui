import { style, media } from 'typestyle';

export const HomePageClass = style({
  backgroundImage: `url('/assets/images/20180525-192644.jpg')`,
  height: '100vh',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '50% 50%'
});

export const HeaderClass = style(
  {
    position: 'fixed',
    bottom: '5em',
    left: 0,
    right: 0
  },
  media(
    { maxWidth: '600px' },
    {
      top: '4em',
      bottom: 'inherit'
    }
  )
);

export const NavClass = style(
  {
    position: 'fixed',
    top: '5em',
    left: 0,
    right: 0
  },
  media(
    { maxWidth: '600px' },
    {
      bottom: '5em',
      top: 'inherit',
      alignItems: 'flex-end'
    }
  )
);