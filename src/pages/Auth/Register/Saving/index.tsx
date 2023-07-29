import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Color, Pressable, Text, VStack} from '../../../../components';
import Icon from '../../../../components/atoms/Icon';
import {ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Input from '../../../../components/atoms/Input';
import {Controller, useForm} from 'react-hook-form';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useBankAccount} from '../../../../core/apis/card';
import {useSessionStorage} from '../../../../core/storage';

const Saving = () => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const {colors} = useTheme();
  const [session] = useSessionStorage();
  const {mutate} = useBankAccount();
  const {
    control,
    handleSubmit,
    formState: {isSubmitting, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      nominal: 0,
    },
  });

  const handlePressSubmit = handleSubmit(data => {
    if (Number(data.nominal) <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Hmm.. kami nemu error nih!',
        text2: 'Nominal tidak bisa kurang dari 0',
      });
    } else {
      mutate(
        {
          token: session,
          balance: Number(data.nominal),
        },
        {
          onSuccess(res) {
            Toast.show({
              type: 'success',
              text1: 'Yey.. berhasil nih!',
              text2: 'Kamu berhasil menambah rekening baru!',
            });
            navigation.goBack();
          },
          onError(e) {
            Toast.show({
              type: 'error',
              text1: 'Hmm.. kami nemu error nih!',
              text2: (e as Error)?.message,
            });
          },
        },
      );
    }
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
          Create Bank Account
        </Text>
        <Text type="paragraph" weight="medium">
          Opening a new bank account with us is quick and hassle-free.
        </Text>
      </VStack>
      <VStack fill spacing={8}>
        <VStack spacing={5}>
          <Text type="label" weight="xsmall">
            Starting Balance
          </Text>
          <Controller
            name="nominal"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Diisi dulu ya, nominal kamu.',
              },
            }}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value.toString()}
                autoCapitalize="none"
                leading={
                  <VStack items="center" justify="center" height={14}>
                    <Text
                      style={{
                        lineHeight: 0,
                      }}
                      type="label"
                      weight="small">
                      Rp
                    </Text>
                  </VStack>
                }
                placeholder="Starting Balance"
              />
            )}
          />
          <Text type="paragraph" weight="small">
            By continuing. I agree that xxx may use my personal information as
            stated in Privacy policy.
          </Text>
        </VStack>
      </VStack>
      <Pressable
        disabled={isSubmitting}
        onPress={handlePressSubmit}
        borderRadius={8}
        margin={{
          marginBottom: 20,
        }}
        items="center"
        justify="center"
        height={50}
        backgroundColor={isSubmitting ? Color.shark['300'] : colors.primary}>
        {!isSubmitting ? (
          <Text color={Color.shark['50']} type="subheading" weight="medium">
            Create Bank Account
          </Text>
        ) : (
          <ActivityIndicator size="small" color="#fff" />
        )}
      </Pressable>
    </VStack>
  );
};

export default Saving;
