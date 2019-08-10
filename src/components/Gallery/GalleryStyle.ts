import { YELLOW, flexWithCenteredContent, GREY, BLACK } from '../../styles/constants';
import { style } from 'typestyle';

export const IMG_HEIGTH = 450;
export const IMG_GAP = 750;
export const PILE_ZONE = 250;

export const GalleryContainer = style({
  position: 'relative',
  overflow: 'hidden',
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
    position: 'absolute',
    zIndex: 1,
    pointerEvents: 'none',
    willChange: 'transform, top, left',
    $nest: {
      '&:last-of-type': {
        marginBottom: '0'
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
  opacity: 0.1
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
