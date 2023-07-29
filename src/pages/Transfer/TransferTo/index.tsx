import React, {useRef, useState} from 'react';
import {
  Box,
  Color,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
} from '../../../components';
import Icon from '../../../components/atoms/Icon';
import Container from '../../../components/molecules/Container';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {FlashList} from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import Input from '../../../components/atoms/Input';
import bank from '../../../data/bank.json';
import {useSessionStorage} from '../../../core/storage';
import {useCard} from '../../../core/apis/card';
import {
  useTransaction,
  useTransactionCreate,
} from '../../../core/apis/transaction';
import Modal from '../Modal';
import {Controller, useForm} from 'react-hook-form';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import currency from 'currency.js';

const TransferTo = ({route}) => {
  const navigation = useNavigation();
  const {activeAccount: activeAcc} = route?.params;
  const ItemSeparatorComponent = () => <Divider horizontal thickness={20} />;
  const [session] = useSessionStorage();
  const [activeAccount, setActiveAccount] = useState(null);
  const [accounts] = useState(bank);
  const modalRef = useRef();
  const createTransaction = useTransactionCreate();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: {isSubmitting},
  } = useForm({
    mode: 'all',
    defaultValues: {
      from: activeAcc?.accountNo,
      to: null,
      amount: 0,
    },
  });

  const hanlePressConfirm = handleSubmit(data => {
    console.log({
      token: session,
      from: data.from,
      receiver: data.to.accountNo,
      amount: data.amount,
    });
    if (!data.from && !data.to) {
      Toast.show({
        type: 'error',
        text1: 'Hmm.. kami nemu error nih!',
        text2: 'Pilih account number terlebih dahulu.',
      });
    } else {
      createTransaction.mutate(
        {
          token: session,
          from: data.from,
          receiver: data.to.accountNo,
          amount: data.amount,
        },
        {
          onSuccess(res) {
            if (res.data.success) {
              Toast.show({
                type: 'success',
                text1: 'Yey.. berhasil nih!',
                text2: `Kamu berhasil transfer sejumlah Rp ${data.amount}`,
              });
              navigation.goBack();
            } else {
              Toast.show({
                type: 'error',
                text1: 'Hmm.. kami nemu error nih!',
                text2: res?.data.errMsg,
              });
            }
          },
          onError(err) {
            Toast.show({
              type: 'error',
              text1: 'Hmm.. kami nemu error nih!',
              text2: (err as Error)?.message,
            });
          },
        },
      );
    }
  }, []);
  return (
    <>
      <Container type="scrollview">
        <HStack padding={20} spacing={10}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="IconChevronLeft" size={24} />
          </Pressable>
          <Text type="subheading" weight="large">
            Transfer
          </Text>
        </HStack>
        <VStack
          padding={{
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}>
          <Box
            position={{
              set: 'absolute',
              top: 0,
              right: 0,
            }}
            width={500}
            height={500}
            as={<FastImage source={require('../../../assets/Vector.png')} />}
          />
          <VStack spacing={20}>
            <VStack borderRadius={24} backgroundColor={Color.shark['50']}>
              <Text
                margin={{
                  marginHorizontal: 20,
                  marginTop: 20,
                }}
                type="heading"
                weight="xsmall">
                Transfer From
              </Text>
              <HStack padding={20} spacing={10} items="center">
                <Icon name="IconCreditCard" size={24} />
                <VStack fill>
                  <Text type="subheading" weight="small">
                    {activeAcc?.accountNo || 'Select Account Number'}
                  </Text>
                  <Text type="paragraph" weight="small">
                    Balance{' '}
                    {currency(activeAcc?.balance, {
                      pattern: `! #`,
                      symbol: 'Rp',
                      separator: '.',
                      precision: 0,
                    }).format()}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
            <VStack borderRadius={24} backgroundColor={Color.shark['50']}>
              <Text
                margin={{
                  marginHorizontal: 20,
                  marginTop: 20,
                }}
                type="heading"
                weight="xsmall">
                Transfer To
              </Text>
              <Pressable
                onPress={() => modalRef.current?.present()}
                shrink={false}
                padding={20}
                spacing={10}
                items="center">
                {watch('to') ? (
                  <VStack
                    borderRadius={20}
                    backgroundColor={'#fff'}
                    width={40}
                    height={40}
                    items="center"
                    justify="center">
                    <Text type="label" weight="large">
                      {watch('to')?.accountName?.charAt(0)}
                    </Text>
                  </VStack>
                ) : (
                  <Icon name="IconCreditCard" size={24} />
                )}
                <VStack fill>
                  <Text type="paragraph" weight="small">
                    Account Number
                  </Text>
                  <Text type="subheading" weight="small">
                    {watch('to')?.accountNo || 'Select Account Number'}
                  </Text>
                </VStack>
                <Icon name="IconChevronRight" size={24} />
              </Pressable>
              <VStack
                padding={{
                  paddingHorizontal: 20,
                  paddingBottom: 20,
                }}
                spacing={5}>
                <Text type="label">Transfer amount</Text>
                <Controller
                  name="amount"
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
                      value={value}
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
                      error={error?.message}
                      backgroundColor={'#fff'}
                      placeholder="000.000"
                    />
                  )}
                />
              </VStack>
            </VStack>
          </VStack>
          <Divider thickness={20} />
          <Pressable
            disabled={isSubmitting}
            shrink={false}
            onPress={hanlePressConfirm}
            borderRadius={8}
            items="center"
            justify="center"
            height={50}
            backgroundColor={
              isSubmitting ? Color.shark['300'] : Color.shark['800']
            }>
            {!isSubmitting ? (
              <Text color={Color.shark['50']} type="subheading" weight="medium">
                Confirm
              </Text>
            ) : (
              <ActivityIndicator size="small" color="#fff" />
            )}
          </Pressable>
        </VStack>
      </Container>
      <Modal
        title="Where do you want to transfer?"
        data={accounts?.map(val => val.bank)}
        onPressItem={item => setValue('to', item)}
        ref={modalRef}
      />
    </>
  );
};

export default TransferTo;
