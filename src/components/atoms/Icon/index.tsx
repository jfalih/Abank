import {useTheme} from '@react-navigation/native';
import React from 'react';
import Animated from 'react-native-reanimated';
import * as Icons from 'tabler-icons-react-native';
import {TablerIconsProps} from 'tabler-icons-react-native';

export interface IconProps extends TablerIconsProps {
  name: keyof typeof Icons;
  size?: number;
  stroke?: number;
  color?: string;
}

const Icon = React.memo((props: IconProps) => {
  const {name = 'IconQuestionMark', size = 14, color, stroke, ...rest} = props;
  const IconComponents = Icons[name];
  const {colors} = useTheme();

  // Set Default Icon Color;
  return (
    <IconComponents
      size={size}
      color={color || colors.text}
      stroke={stroke || 2}
      {...rest}
    />
  );
});

export const IconAnimated = Animated.createAnimatedComponent(Icon);
export default Icon;
