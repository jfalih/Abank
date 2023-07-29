import React, {Ref, useMemo} from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
  TextStyle,
} from 'react-native';
import {Typography, TypographyType, TypographyWeight} from './text.types';
import Animated from 'react-native-reanimated';
import {MarginType, createMarginStyle} from '../helper';
import {useTheme} from '@react-navigation/native';

export interface TextProps extends RNTextProps {
  fill?: boolean;
  type?: TypographyType;
  margin?: MarginType;
  weight?: TypographyWeight;
  strikethrough?: boolean;
  underline?: boolean;
  text?: string;
  color?: TextStyle['color'];
  align?: TextStyle['textAlign'];
  underlineThrough?: boolean;
}

export const typography: Typography = {
  paragraph: {
    large: {
      fontFamily: 'Mona-Sans-Light',
      fontWeight: '300',
      fontSize: 18,
      lineHeight: 28,
    },
    medium: {
      fontFamily: 'Mona-Sans-Light',
      fontWeight: '300',
      fontSize: 16,
      lineHeight: 24,
    },
    small: {
      fontFamily: 'Mona-Sans-Light',
      fontWeight: '300',
      fontSize: 14,
      lineHeight: 20,
    },
    xsmall: {
      fontFamily: 'Mona-Sans-Light',
      fontWeight: '300',
      fontSize: 12,
      lineHeight: 20,
    },
    xlarge: undefined,
  },
  label: {
    large: {
      fontFamily: 'Mona-Sans-Medium',
      fontWeight: '500',
      fontSize: 18,
      lineHeight: 28,
    },
    medium: {
      fontFamily: 'Mona-Sans-Medium',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
    },
    small: {
      fontFamily: 'Mona-Sans-Medium',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 20,
    },
    xsmall: {
      fontFamily: 'Mona-Sans-Medium',
      fontWeight: '500',
      fontSize: 12,
      lineHeight: 20,
    },
    xlarge: undefined,
  },
  heading: {
    xlarge: {
      fontFamily: 'Hubot-Sans-Bold',
      fontWeight: '700',
      fontSize: 36,
      lineHeight: 44,
    },
    large: {
      fontFamily: 'Hubot-Sans-Bold',
      fontWeight: '700',
      fontSize: 32,
      lineHeight: 40,
    },
    medium: {
      fontFamily: 'Hubot-Sans-Bold',
      fontWeight: '700',
      fontSize: 28,
      lineHeight: 36,
    },
    small: {
      fontFamily: 'Hubot-Sans-Bold',
      fontWeight: '700',
      fontSize: 24,
      lineHeight: 32,
    },
    xsmall: {
      fontFamily: 'Hubot-Sans-Bold',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 28,
    },
  },
  subheading: {
    large: {
      fontFamily: 'Muno-Sans-SemiBold',
      fontWeight: '600',
      fontSize: 18,
      lineHeight: 24,
    },
    medium: {
      fontFamily: 'Muno-Sans-SemiBold',
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 20,
    },
    small: {
      fontFamily: 'Muno-Sans-SemiBold',
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 20,
    },
    xsmall: {
      fontFamily: 'Muno-Sans-SemiBold',
      fontWeight: '600',
      fontSize: 12,
      lineHeight: 16,
    },
    xlarge: undefined,
  },
};

export const Text: React.FC<TextProps> = React.memo(
  React.forwardRef((props, ref: Ref<RNText>) => {
    const {
      fill,
      margin,
      type = 'paragraph',
      weight = 'medium',
      strikethrough,
      underline,
      underlineThrough,
      color,
      text,
      style,
      align,
      ...rest
    } = props;

    const {colors} = useTheme();
    const textDecorationLine: TextStyle['textDecorationLine'] = useMemo(() => {
      if (strikethrough) {
        return 'line-through';
      } else if (underline) {
        return 'underline';
      } else if (underlineThrough) {
        return 'underline line-through';
      }
      return 'none';
    }, [strikethrough, underline, underlineThrough]);

    const textStyle = useMemo(() => {
      let marginStyle;

      if (margin) {
        marginStyle = createMarginStyle(margin);
      }

      return StyleSheet.create({
        text: {
          ...typography[type][weight],
          ...marginStyle,
          flex: fill ? 1 : undefined,
          color: color || colors.text,
          textAlign: align,
          textDecorationLine,
        },
      });
    }, [
      weight,
      margin,
      type,
      fill,
      color,
      colors.text,
      align,
      textDecorationLine,
    ]);

    return (
      <RNText ref={ref} style={[textStyle.text, style]} {...rest}>
        {text || rest.children}
      </RNText>
    );
  }),
);

export default Text;

export const TextAnimated = Animated.createAnimatedComponent(Text);
