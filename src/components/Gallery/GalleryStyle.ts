import { WHITE } from './../../styles/constants';
import { YELLOW, flexWithCenteredContent, GREY, BLACK } from '../../styles/constants';
import { style } from 'typestyle';

export const GalleryContainer = style({
  position: 'relative',
  overflow: 'hidden',
});

export const GalleryScrollableContainerStyle = style({
  height: '80vh',
  width: '50vw',
  overflow: 'auto',
  backgroundColor: GREY.toString(),
});

export const ImageStyle = style({
  width: '250px',
  height: '250px',
  backgroundColor: YELLOW.toString(),
  margin: '0 auto 500px',
  fontSize: '10em',
  boxShadow: `3px 3px 10px ${BLACK.toString()}`,
  position: 'relative',
  zIndex: 1,
  $nest: {
    '&:last-of-type': {
      marginBottom: '0'
    }
  },
}, flexWithCenteredContent);

export const DebuggingDiv = style({
  position: 'fixed',
  top: 0,
  right: 0,
  width: '550px',
  height: '50px',
  backgroundColor: YELLOW.desaturate('50%').toString(),
  color: BLACK.toString(),
}, flexWithCenteredContent);