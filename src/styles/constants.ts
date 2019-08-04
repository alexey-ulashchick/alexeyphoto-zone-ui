import { color, rgba, ColorHelper } from 'csx';
import { NestedCSSProperties } from 'typestyle/lib/types';

export const GREY = color('#333333');
export const YELLOW = color('#ffda27');
export const WHITE = color('#FFFFFF');
export const BLACK = color('#000000');

export function makeOverlay(baseColor: ColorHelper, opacity: number): ColorHelper {
  return rgba(baseColor.red(), baseColor.blue(), baseColor.green(), opacity);
}

export const flexWithCenteredContent: NestedCSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around'
};

export const textShadow: NestedCSSProperties = {
    textShadow: `1px 2px 4px ${BLACK.toString()}`
}
