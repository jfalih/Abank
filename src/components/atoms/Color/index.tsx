/* eslint-disable-next-line */
export type Colors =
  | 'shark'
  | 'haze'
  | 'red'
  | 'oarnge'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink';
export type ColorPallate =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950';
export type ColorType = Record<Colors, Record<ColorPallate, string>>;

export const Color: ColorType = {
  shark: {
    '50': '#f4f6f7',
    '100': '#e3e8ea',
    '200': '#cad2d7',
    '300': '#a4b2bc',
    '400': '#788b98',
    '500': '#5c707e',
    '600': '#4f5d6b',
    '700': '#455059',
    '800': '#3d454d',
    '900': '#363b43',
    '950': '#1f2328',
  },
  haze: {
    '50': '#f6f8fa',
    '800': '#344758',
  },
  red: {
    '50': '#fef3f2',
    '100': '#fee4e2',
    '500': '#ee5045',
  },
  oarnge: undefined,
  yellow: undefined,
  green: undefined,
  blue: undefined,
  purple: undefined,
  pink: undefined,
};

export default Color;
