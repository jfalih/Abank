import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Color, Pressable, Text, VStack} from '../../../../components';
import Icon from '../../../../components/atoms/Icon';
import {KeyboardAvoidingView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Input from '../../../../components/atoms/Input';
import {useForm} from 'react-hook-form';

const Password = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {top} = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm({
    mode: 'all',
    defaultValues: {
      password: '',
      c_password: '',
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
          Create Password
        </Text>
        <Text type="paragraph" weight="medium">
          The password will be used to access your account.
        </Text>
      </VStack>
      <VStack fill spacing={8}>
        <VStack spacing={5}>
          <Text type="label" weight="xsmall">
            Username
          </Text>
          <Input
            autoCapitalize="none"
            icon={{
              name: 'IconAt',
              size: 22,
            }}
            placeholder="Username"
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
          Continue
        </Text>
      </Pressable>
    </VStack>
  );
};

export default Password;
