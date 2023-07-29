import React, {useCallback, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {
  Color,
  HStack,
  Pressable,
  Text,
  VStack,
  typography,
} from '../../../../components';
import Input from '../../../../components/atoms/Input';
import Icon from '../../../../components/atoms/Icon';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const Confirm = ({route}) => {
  const {colors} = useTheme();
  const {phone} = route?.params;
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const disabled = CELL_COUNT !== value.length;

  const handlePressVerify = useCallback(() => {
    if (value === '0000') {
      navigation.navigate('Username', {...route?.params});
      return;
    }
    Toast.show({
      type: 'error',
      text1: 'Hmm.. kami nemu error nih!',
      text2: 'Kode OTP kamu tidak valid..',
    });
  }, [navigation, route?.params, value]);

  return (
    <VStack
      fill
      backgroundColor={'#ffffff'}
      as={<KeyboardAvoidingView behavior="padding" />}
      spacing={8}
      padding={{
        paddingHorizontal: 20,
        paddingTop: top + 20,
        paddingBottom: 20,
      }}>
      <Pressable onPress={() => navigation.goBack()} shrink={false}>
        <Icon size={32} name="IconArrowLeft" />
      </Pressable>
      <VStack
        margin={{
          marginBottom: 10,
        }}
        spacing={2}>
        <Text type="heading" weight="large">
          Create Phone Number
        </Text>
        <Text type="paragraph" weight="medium">
          Enter the verification code we sent to +62{phone}.
        </Text>
      </VStack>
      <VStack fill spacing={20}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <HStack spacing={5} fill>
          <Text type="paragraph" weight="medium">
            Didn’t receive verification code?
          </Text>
          <Pressable shrink={false}>
            <Text
              underline
              color={colors.primary}
              type="paragraph"
              weight="medium">
              Resend Code
            </Text>
          </Pressable>
        </HStack>
      </VStack>
      <Pressable
        borderRadius={8}
        onPress={handlePressVerify}
        shrink={false}
        disabled={disabled}
        margin={{
          marginBottom: 20,
        }}
        items="center"
        justify="center"
        height={50}
        backgroundColor={disabled ? Color.shark['400'] : colors.primary}>
        <Text color={Color.shark['50']} type="subheading" weight="medium">
          Verify
        </Text>
      </Pressable>
    </VStack>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20, paddingHorizontal: 20},
  cell: {
    width: 60,
    height: 60,
    ...typography.heading['medium'],
    lineHeight: 60,
    fontSize: 24,
    borderRadius: 8,
    backgroundColor: Color.haze['50'],
    textAlign: 'center',
  },
  focusCell: {
    borderWidth: 1,
    borderColor: '#000',
  },
});

const CELL_COUNT = 4;
export default Confirm;
