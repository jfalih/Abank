import React, {useImperativeHandle, useRef} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {Color, Divider, Pressable, Text, VStack} from '../../components';
import {FlashList} from '@shopify/flash-list';

const Modal = React.forwardRef((props, ref) => {
  const {data, title, onPressItem, ...rest} = props;
  const modalRef = useRef();
  const initialSnapPoints = React.useMemo(() => ['CONTENT_HEIGHT'], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const renderBackdrop = React.useCallback(
    val => (
      <BottomSheetBackdrop
        {...val}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
      />
    ),
    [],
  );
  useImperativeHandle(ref, () => modalRef.current, []);
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        backdropComponent={renderBackdrop}
        snapPoints={animatedSnapPoints}
        enablePanDownToClose
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        ref={modalRef}>
        <VStack
          height={500}
          padding={20}
          spacing={20}
          onLayout={handleContentLayout}>
          <Text type="subheading" weight="large">
            {title}
          </Text>
          <VStack fill>
            {data && (
              <FlashList
                data={data}
                extraData={data}
                ItemSeparatorComponent={() => <Divider thickness={24} />}
                renderItem={({item}) => (
                  <Pressable
                    onPress={() => {
                      onPressItem?.(item);
                      modalRef.current?.dismiss();
                    }}
                    shrink={false}
                    fill
                    items="center"
                    spacing={10}>
                    <VStack
                      borderRadius={20}
                      backgroundColor={Color.shark['50']}
                      width={40}
                      height={40}
                      items="center"
                      justify="center">
                      <Text type="label" weight="large">
                        {item?.accountName?.charAt(0)}
                      </Text>
                    </VStack>
                    <VStack>
                      <Text type="subheading" weight="small">
                        {item?.accountName}
                      </Text>
                      <Text type="paragraph" weight="small">
                        ABANK - {item?.accountNo}
                      </Text>
                    </VStack>
                  </Pressable>
                )}
              />
            )}
          </VStack>
        </VStack>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export default Modal;
