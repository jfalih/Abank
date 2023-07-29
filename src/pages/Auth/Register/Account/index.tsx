import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Color, Pressable, Text, VStack} from '../../../../components';
import Icon from '../../../../components/atoms/Icon';
import {KeyboardAvoidingView} from 'react-native';
import Input from '../../../../components/atoms/Input';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Controller, useForm} from 'react-hook-form';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const Account = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: {isSubmitting, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      phone: '',
      mail: '',
    },
  });

  const handleCreateNewAccount = handleSubmit(data => {
    if (isValid) {
      navigation.navigate('Confirm', data);
      return;
    }
    Toast.show({
      type: 'error',
      text1: 'Hmm.. kami nemu error nih!',
      text2: 'Masih ada form kamu yang tidak valid..',
    });
  });
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
          Create Account
        </Text>
        <Text type="paragraph" weight="medium">
          Enter your active email address and phone number.
        </Text>
      </VStack>
      <VStack fill spacing={8}>
        <VStack spacing={5}>
          <Text type="label" weight="xsmall">
            Phone Number
          </Text>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Diisi dulu ya, nomor handphone kamu.',
              },
            }}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={error?.message}
                leading={
                  <VStack items="center" justify="center" height={14}>
                    <Text
                      style={{
                        lineHeight: 0,
                      }}
                      type="label"
                      weight="small">
                      +62
                    </Text>
                  </VStack>
                }
                placeholder="8XXXXXXXXX"
              />
            )}
          />
        </VStack>
        <VStack spacing={5}>
          <Text type="label" weight="xsmall">
            Email
          </Text>
          <Controller
            name="mail"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Diisi dulu ya, alamat email kamu.',
              },
            }}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoCapitalize="none"
                icon={{
                  name: 'IconMail',
                  size: 22,
                }}
                error={error?.message}
                placeholder="example@yourmail.com"
              />
            )}
          />
        </VStack>
      </VStack>
      <Pressable
        onPress={handleCreateNewAccount}
        borderRadius={8}
        margin={{
          marginBottom: 20,
        }}
        items="center"
        justify="center"
        height={50}
        backgroundColor={colors.primary}>
        <Text color={Color.shark['50']} type="subheading" weight="medium">
          Create new account
        </Text>
      </Pressable>
    </VStack>
  );
};

export default Account;
