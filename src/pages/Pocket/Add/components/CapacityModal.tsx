import React from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {Color, Pressable, Text, VStack} from '../../../../components';
import Input from '../../../../components/atoms/Input';
import {useTheme} from '@react-navigation/native';

const AddName = React.forwardRef((props, ref) => {
  const {onChangeText, onBlur, value} = props;

  const initialSnapPoints = React.useMemo(() => ['CONTENT_HEIGHT'], []);
  const {colors} = useTheme();
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const renderBackdrop = React.useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
      />
    ),
    [],
  );
  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      snapPoints={animatedSnapPoints}
      enablePanDownToClose
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      ref={ref}>
      <VStack spacing={20} padding={20} onLayout={handleContentLayout} fill>
        <VStack spacing={8} fill>
          <Text color={Color.shark['300']} type="label" weight="small">
            Capacity Name
          </Text>
          <Input
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
            placeholder="Kapasitas pocket kamu.."
          />
        </VStack>
        <Pressable
          onPress={() => {}}
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

export default AddName;
