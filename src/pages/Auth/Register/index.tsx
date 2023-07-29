import React from 'react';
import {Color, HStack, Pressable, Text, VStack} from '../../../components';
import {useForm} from 'react-hook-form';
import Input from '../../../components/atoms/Input';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAvoidingView} from 'react-native';
import Icon from '../../../components/atoms/Icon';
import {useNavigation, useTheme} from '@react-navigation/native';

const Register = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
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
          <Input
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
        </VStack>
        <VStack spacing={5}>
          <Text type="label" weight="xsmall">
            Email
          </Text>
          <Input
            autoCapitalize="none"
            icon={{
              name: 'IconAt',
              size: 22,
            }}
            placeholder="example@yourmail.com"
          />
        </VStack>
      </VStack>
      <Pressable
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

export default Register;
