import { YELLOW, flexWithCenteredContent, GREY, BLACK } from '../../styles/constants';
import { style } from 'typestyle';

export const GalleryContainer = style({
  position: 'relative',
  overflow: 'hidden',
});

export const GalleryScrollableContainerStyle = style({
  height: '100vh',
  width: '100vw',
  overflow: 'auto',
  "-webkit-overflow-scrolling": 'touch',
  backgroundColor: GREY.toString()
});

export const ImageStyle = style(
  {
    backgroundColor: YELLOW.toString(),
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