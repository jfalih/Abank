import React, {Ref} from 'react';
import {
  Pressable as RNPressable,
  PressableProps as RNPressableProps,
  View,
  ViewStyle,
} from 'react-native';
import Reanimated from 'react-native-reanimated';
import Stack, {StackProps} from '../Layouts/stack';

type PressableContainer = Omit<StackProps, 'as'> & RNPressableProps;

export interface PressableProps extends PressableContainer {
  androidRipple?: PressableProps['android_ripple'];
  androidDisableSound?: boolean;
  shrink?: boolean;
  opacity?: boolean;
  containerStyle?: ViewStyle;
}

export const Pressable: React.FC<PressableProps> = React.memo(
  React.forwardRef((props, ref: Ref<View>) => {
    const {
      androidRipple,
      androidDisableSound,
      shrink = true,
      opacity = true,
      containerStyle,
      style,
      ...rest
    } = props;
    return (
      <Stack
        ref={ref}
        direction="row"
        style={containerStyle}
        as={
          <RNPressable
            android_disableSound={androidDisableSound}
            android_ripple={androidRipple}
            style={({pressed}) => [
              {
                opacity: pressed && opacity ? 0.6 : 1,
                transform: [{scale: pressed && shrink ? 0.92 : 1}],
              },
              style as ViewStyle,
            ]}
          />
        }
        {...rest}
      />
    );
  }),
);

export const PressableAnimated = Reanimated.createAnimatedComponent(Pressable);
export default Pressable;
