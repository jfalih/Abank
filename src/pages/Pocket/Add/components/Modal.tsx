import React, {useImperativeHandle, useRef} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {Color, Pressable, Text, VStack} from '../../../../components';
import Input from '../../../../components/atoms/Input';
import {useTheme} from '@react-navigation/native';
import {mergeRefs} from 'react-merge-refs';

const Modal = React.forwardRef((props, ref) => {
  const {onChangeText, icon, leading, label, placeholder, onBlur, value} =
    props;
  const modalRef = useRef();
  const initialSnapPoints = React.useMemo(() => ['CONTENT_HEIGHT'], []);
  const {colors} = useTheme();
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
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      snapPoints={animatedSnapPoints}
      enablePanDownToClose
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      ref={modalRef}>
      <VStack spacing={20} padding={20} onLayout={handleContentLayout} fill>
        <VStack spacing={8} fill>
          <Text color={Color.shark['300']} type="label" weight="small">
            {label}
          </Text>
          <Input
            icon={icon}
            leading={leading}
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
          />
        </VStack>
        <Pressable
          onPress={() => modalRef.current?.close()}
          borderRadius={8}
          items="center"
          justify="center"
          height={50}
          backgroundColor={colors.primary}>
          <Text color={Color.shark['50']} type="subheading" weight="medium">
            Continue
          </Text>
        </Pressable>
      </VStack>
    </BottomSheetModal>
  );
});

export default Modal;
