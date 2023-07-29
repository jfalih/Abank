import {TextStyle} from 'react-native';

export type TypographyType = 'paragraph' | 'label' | 'heading' | 'subheading';

export type TypographyWeight =
  | 'xlarge'
  | 'large'
  | 'medium'
  | 'small'
  | 'xsmall';

export type Typography = Record<
  TypographyType,
  Record<TypographyWeight, TextStyle>
>;
