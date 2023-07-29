import React from 'react';
import {TextInput, TextInputProps} from 'react-native';

import Icon, {IconProps} from '../Icon';
import {
  Box,
  Flex,
  FlexAnimated,
  FlexProps,
  VStack,
  VStackAnimated,
} from '../Layouts';
import {
  FadeInDown,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Text, {typography} from '../Text';
import Color from '../Color';
import {useTheme} from '@react-navigation/native';

type InputType = TextInputProps & FlexProps;

interface SearchBarProps extends InputType {
  icon?: IconProps;
  error?: string;
  leading?: JSX.Element;
  trailing?: JSX.Element;
}

const spacing = {
  tiny: 8,
  standard: 12,
  large: 18,
};
const Input = React.memo(
  React.forwardRef((props: SearchBarProps, ref) => {
    const {
      leading,
      trailing,
      placeholder = 'Cari yang kamu mau disini..',
      value,
      error,
      icon,
      backgroundColor,
      ...rest
    } = props;

    const animatedSearchStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          error ? 1 : 0,
          [0, 1],
          [backgroundColor || Color.haze['50'], Color.red['100']],
        ),
      };
    }, [error]);

    return (
      <VStack spacing={8}>
        <Flex position={{set: 'relative'}}>
          <FlexAnimated
            fill
            style={animatedSearchStyle}
            borderRadius={8}
            padding={{
              paddingLeft:
                leading || icon ? spacing.large * 2.2 : spacing.large,
              paddingRight: trailing && spacing.large * 2,
            }}
            items="center"
            height={44}
            as={
              <TextInput
                style={{
                  ...typography.paragraph.small,
                  lineHeight: 0,
                }}
                value={value}
                numberOfLines={1}
                placeholderTextColor={Color.shark['500']}
                placeholder={placeholder}
              />
            }
            {...rest}
          />
          {(leading || icon) && (
            <Box
              backgroundColor={'transparent'}
              position={{
                left: spacing.standard,
                top: 44 / 2 - (icon?.size || 14) / 2,
              }}>
              {icon ? (
                <Icon name={icon.name} size={icon.size} color={icon.color} />
              ) : (
                leading
              )}
            </Box>
          )}

          {trailing && (
            <Box
              position={{
                right: spacing.standard,
                top: 42 / 2 - 18 / 2,
              }}>
              {trailing}
            </Box>
          )}
        </Flex>
        {error && (
          <Text type="paragraph" weight="xsmall" color={Color.red['500']}>
            {error}
          </Text>
        )}
      </VStack>
    );
  }),
);

export default Input;
