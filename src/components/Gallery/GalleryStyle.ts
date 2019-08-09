import { WHITE } from './../../styles/constants';
import { YELLOW, flexWithCenteredContent, GREY, BLACK } from '../../styles/constants';
import { style } from 'typestyle';

export const IMG_HEIGTH = 250;
export const IMG_GAP = 500;

export const GalleryContainer = style({
  position: 'relative',
  overflow: 'hidden',
  $nest: {
    '&::before': {
      content: `''`,
      position: 'absolute',
      left: 0,
      right: '50vw',
      height: '1px',
      backgroundColor: 'red',
      top: '15%'
    },
    '&::after': {
      content: `''`,
      position: 'absolute',
      left: 0,
      right: '50vw',
      height: '1px',
      backgroundColor: 'red',
      bottom: '15%'
    }
  }
});

export const GalleryScrollableContainerStyle = style({
  height: '100vh',
  width: '50vw',
  overflow: 'auto',
  backgroundColor: GREY.toString()
});

export const ImageStyle = style(
  {
    width: `${IMG_HEIGTH}px`,
    height: `${IMG_HEIGTH}px`,
    backgroundColor: YELLOW.toString(),
    margin: `0 auto ${IMG_GAP}px`,
    fontSize: '10em',
    boxShadow: `3px 3px 10px ${BLACK.toString()}`,
    position: 'relative',
    zIndex: 1,
    $nest: {
      '&:last-of-type': {
        marginBottom: '0'
      }
    }
  },
  flexWithCenteredContent
);

export const FakeImageStyle = style(
  {
    width: `${IMG_HEIGTH}px`,
    height: `${IMG_HEIGTH}px`,
    backgroundColor: YELLOW.toString(),
    opacity: 0.2,
    margin: `${IMG_GAP}px auto`,
    fontSize: '10em',
    position: 'relative',
    $nest: {
      '&:after': {
        content: 'A',
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        height: '1px',
        backgroundColor: YELLOW.toString()
      }
    }
  },
  flexWithCenteredContent
);

export const topLine = style({
  position: 'absolute',
  left: 0,
  right: '50vw',
  top: '25%',
  backgroundColor: 'green',
  bottom: '25%',
  pointerEvents: 'none',
  opacity: 0.1,
});

export const DebuggingDiv = style(
  {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '550px',
    height: '50px',
    backgroundColor: YELLOW.desaturate('50%').toString(),
    color: BLACK.toString()
  },
  flexWithCenteredContent
);
