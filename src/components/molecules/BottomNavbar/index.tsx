import React from 'react';
import {HStack, VStack} from '../../atoms/Layouts';
import Pressable from '../../atoms/Pressable';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';
import {Color, Text} from '../../atoms';

export const BottomNavbar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const {colors} = useTheme();
  return (
    <HStack
      as={<SafeAreaView edges={['bottom']} />}
      borderColor={colors.border}
      backgroundColor={'#fff'}
      padding={{
        paddingHorizontal: 18,
        paddingVertical: 14,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const {
          tabBarIcon,
          tabBarTestID,
          tabBarAccessibilityLabel,
          tabBarLabel,
        } = options || {};

        const label: string =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const iconComp = () => {
          if (typeof tabBarIcon === 'undefined') {
            return null;
          }

          return tabBarIcon({
            focused: isFocused,
            color: isFocused ? Color.shark['800'] : Color.shark['300'],
            size: 26,
          });
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(route.name, {merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        if (tabBarLabel === 'QR') {
          return (
            <VStack
              padding={7}
              borderRadius={50}
              backgroundColor={'#fff'}
              margin={{
                marginTop: -30,
                marginHorizontal: 12,
              }}>
              <Pressable
                key={route.key}
                height={50}
                width={50}
                backgroundColor={Color.shark['800']}
                items="center"
                justify="center"
                borderRadius={25}
                onPress={onPress}
                onLongPress={onLongPress}>
                {tabBarIcon?.({
                  focused: isFocused,
                  color: Color.shark['200'],
                  size: 24,
                })}
              </Pressable>
            </VStack>
          );
        }

        return (
          <Pressable
            key={route.key}
            fill
            direction="column"
            items="center"
            justify="center"
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={tabBarAccessibilityLabel}
            testID={tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            {iconComp()}
            <Text
              color={isFocused ? Color.shark['800'] : Color.shark['300']}
              type="label"
              weight="xsmall">
              {label}
            </Text>
          </Pressable>
        );
      })}
    </HStack>
  );
};
