import React, {Fragment, useCallback, useMemo} from 'react';
import {
  StatusBar,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';
import {VStack} from '../../atoms/';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {ScrollProvider} from '../../../services/contexts/Scroll/Scroll.provider';
import {FlashList, FlashListProps} from '@shopify/flash-list';

const Components = {
  scrollview: Animated.ScrollView,
  flashlist: FlashList,
};

interface ContainerProps {
  type: keyof typeof Components;
  edges?: SafeAreaViewProps['edges'];
}

type ContainerType = ScrollViewProps | FlashListProps<unknown>;

type ContainerMultipleProps = ContainerProps & ContainerType;

export const Container = React.memo(
  React.forwardRef((props: ContainerMultipleProps, ref) => {
    const {type, edges = ['top', 'bottom'], onScroll, ...rest} = props;
    const translationY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler(event => {
      translationY.value = event.contentOffset.y;
    });

    const ContainerComponents: React.ElementType = useMemo(() => {
      return Components[type as keyof typeof Components];
    }, [type]);

    const onScrollHandler = useCallback(
      (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollHandler;
        onScroll?.(e);
      },
      [onScroll, scrollHandler],
    );

    return (
      <Fragment>
        <StatusBar barStyle={'light-content'} />
        <VStack as={<SafeAreaView edges={edges} />} fill>
          <ScrollProvider
            contentOffset={{
              y: translationY,
              x: {
                value: 0,
              },
            }}>
            <ContainerComponents
              ref={ref}
              onScroll={onScrollHandler}
              {...(rest as React.ComponentProps<typeof ContainerComponents>)}
            />
          </ScrollProvider>
        </VStack>
      </Fragment>
    );
  }),
);

export default Container;
