import React from 'react';
import {Color, HStack, Pressable, Text, VStack} from '../../../components';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import Input from '../../../components/atoms/Input';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import Icon from '../../../components/atoms/Icon';
import {CommonActions, useNavigation, useTheme} from '@react-navigation/native';
import {loginSchema, useLogin} from '../../../core/apis/auth/login';
import Toast from 'react-native-toast-message';
import {useSessionStorage} from '../../../core/storage';
import {useUser} from '../../../core/apis/auth/user';
import {useUserContext} from '../../../services/contexts/User/User.context';

const Login = () => {
  const {top} = useSafeAreaInsets();
  const {colors} = useTheme();
  const [, setSession] = useSessionStorage();
  const {setUser} = useUserContext();
  const navigation = useNavigation();
  const login = useLogin();
  const {mutate: mutateUser} = useUser();

  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm({
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = handleSubmit(data => {
    login.mutate(
      {
        username: data.username,
        loginPassword: data.password,
      },
      {
        onSuccess(res) {
          if (res.data.success) {
            setSession(res.data.data.accessToken);
            mutateUser(
              {
                token: res.data.data.accessToken,
              },
              {
                onSuccess(res) {
                  if (res.data.success) {
                    const resetAction = CommonActions.reset({
                      index: 0,
                      routes: [
                        {
                          name: 'BottomNavigation',
                        },
                      ],
                    });
                    setUser(res.data.data);
                    Toast.show({
                      type: 'success',
                      text1: 'Yey.. berhasil nih!',
                      text2: 'Yuk kelola uang sama abank..',
                    });
                  } else {
                    Toast.show({
                      type: 'error',
                      text1: 'Hmm.. kami nemu error nih!',
                      text2: res?.data.errMsg,
                    });
                  }
                },
                onError(e) {
                  Toast.show({
                    type: 'error',
                    text1: 'Hmm.. kami nemu error nih!',
                    text2: (e as Error).message,
                  });
                },
              },
            );
          } else {
            Toast.show({
              type: 'error',
              text1: 'Hmm.. kami nemu error nih!',
              text2: res?.data.errMsg,
            });
          }
        },
        onError(e) {
          Toast.show({
            type: 'error',
            text1: 'Hmm.. kami nemu error nih!',
            text2: (e as Error).message,
          });
        },
      },
    );
  });

  return (
    <VStack
      fill
      backgroundColor={'#ffffff'}
      as={<KeyboardAvoidingView behavior="padding" />}
      spacing={20}
      padding={{
        paddingHorizontal: 20,
        paddingTop: top + 20,
        paddingBottom: 20,
      }}>
      <VStack spacing={10}>
        <Text type="heading" weight="large">
          Login
        </Text>
        <HStack spacing={5}>
          <Text type="paragraph" weight="medium">
            Don't have an account
          </Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text
              color={colors.primary}
              underline
              type="paragraph"
              weight="medium">
              Register
            </Text>
          </Pressable>
        </HStack>
      </VStack>
      <VStack fill spacing={8}>
        <VStack spacing={5}>
          <Text type="label" weight="xsmall">
            Username
          </Text>
          <Controller
            name="username"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Diisi dulu ya, username kamu.',
              },
            }}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <Input
                autoCapitalize="none"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={error?.message}
                editable={!isSubmitting}
                icon={{
                  name: 'IconUser',
                  size: 22,
                }}
                placeholder="Username"
              />
            )}
          />
        </VStack>
        <VStack spacing={5}>
          <Text type="label" weight="xsmall">
            Password
          </Text>
          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Diisi dulu ya, password kamu.',
              },
            }}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <Input
                icon={{
                  name: 'IconLock',
                  size: 22,
                }}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
                value={value}
                secureTextEntry
                trailing={
                  <Pressable>
                    <Icon size={24} name="IconEye" />
                  </Pressable>
                }
                placeholder="Password"
              />
            )}
          />
        </VStack>
      </VStack>
      <Pressable
        disabled={isSubmitting}
        onPress={handleLogin}
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
            Login
          </Text>
        ) : (
          <ActivityIndicator size="small" color="#fff" />
        )}
      </Pressable>
    </VStack>
  );
};

export default Login;
