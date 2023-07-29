import React, {useRef, useState} from 'react';
import {
  Box,
  Color,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
} from '../../components';
import Icon from '../../components/atoms/Icon';
import Container from '../../components/molecules/Container';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {FlashList} from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import Input from '../../components/atoms/Input';
import bank from '../../data/bank.json';
import {useSessionStorage} from '../../core/storage';
import {useCard} from '../../core/apis/card';
import {useTransaction} from '../../core/apis/transaction';
import Modal from './Modal';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const Transfer = () => {
  const navigation = useNavigation();
  const ItemSeparatorComponent = () => <Divider horizontal thickness={20} />;
  const [session] = useSessionStorage();
  const [activeAccount, setActiveAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const modalRef = useRef();
  const {mutate: mutateCard} = useCard();
  const {mutate: mutateTrx} = useTransaction();

  const handlePressSubmit = () => {
    if (activeAccount) {
      navigation.replace('TransferTo', {activeAccount});
    } else {
      Toast.show({
        type: 'error',
        text1: 'Hmm.. kami nemu error nih!',
        text2: 'Kami tidak menemukan akun!',
      });
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      mutateCard(
        {
          token: session,
        },
        {
          onSuccess(res) {
            setAccounts(res.data.data.accounts);
          },
          onError(err) {
            console.log(err);
          },
        },
      );
    }, [mutateCard, session]),
  );
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
            as={<FastImage source={require('../../assets/Vector.png')} />}
          />
          <VStack borderRadius={24} backgroundColor={Color.shark['50']}>
            <Pressable shrink={false} padding={20} spacing={10} items="center">
              <Icon name="IconBuildingBank" size={24} />
              <VStack fill>
                <Text type="paragraph" weight="small">
                  Destination
                </Text>
                <Text type="subheading" weight="small">
                  Sesama Abank
                </Text>
              </VStack>
              <Icon name="IconChevronRight" size={24} />
            </Pressable>
            <Pressable
              onPress={() => modalRef.current?.present()}
              shrink={false}
              padding={20}
              spacing={10}
              items="center">
              {activeAccount ? (
                <VStack
                  borderRadius={20}
                  backgroundColor={'#fff'}
                  width={40}
                  height={40}
                  items="center"
                  justify="center">
                  <Text type="label" weight="large">
                    {activeAccount?.accountName?.charAt(0)}
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
                  {activeAccount?.accountNo || 'Select Account Number'}
                </Text>
              </VStack>
              <Icon name="IconChevronRight" size={24} />
            </Pressable>
          </VStack>
          <Divider thickness={20} />
          <Pressable
            shrink={false}
            onPress={handlePressSubmit}
            borderRadius={8}
            items="center"
            justify="center"
            height={50}
            backgroundColor={Color.shark['800']}>
            <Text color={Color.shark['50']} type="subheading" weight="medium">
              Continue
            </Text>
          </Pressable>
        </VStack>
        <VStack
          padding={{
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}>
          <Text type="subheading" weight="large">
            Fast Transfer
          </Text>
        </VStack>
        <FlashList
          horizontal
          data={bank}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderItem={({item}) => (
            <Pressable
              direction="column"
              items="center"
              spacing={4}
              justify="center"
              width={46}>
              <VStack
                borderRadius={23}
                backgroundColor={'#fff'}
                width={46}
                height={46}
                items="center"
                justify="center">
                <Text type="label" weight="large">
                  {item.username.charAt(0)}
                </Text>
              </VStack>
              <Text
                numberOfLines={1}
                type="label"
                weight="xsmall"
                color={Color.shark['300']}>
                {item.username}
              </Text>
            </Pressable>
          )}
        />
        <VStack
          margin={{
            marginTop: 20,
          }}
          borderRadius={{
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
          padding={20}
          spacing={20}
          backgroundColor={Color.shark['50']}>
          <Text type="subheading" weight="large">
            List Transfer
          </Text>
          <Input
            trailing={
              <Icon name="IconSearch" size={24} color={Color.shark['300']} />
            }
            backgroundColor={Color.shark['100']}
          />
          <FlashList
            data={bank}
            ItemSeparatorComponent={() => <Divider thickness={20} />}
            renderItem={({item}) => (
              <Pressable shrink={false} fill items="center" spacing={10}>
                <VStack
                  borderRadius={20}
                  backgroundColor={'#fff'}
                  width={40}
                  height={40}
                  items="center"
                  justify="center">
                  <Text type="label" weight="large">
                    {item.username.charAt(0)}
                  </Text>
                </VStack>
                <VStack>
                  <Text type="subheading" weight="small">
                    {item.username}
                  </Text>
                  <Text type="paragraph" weight="small">
                    ABANK - {item.bank.accountNo}
                  </Text>
                </VStack>
              </Pressable>
            )}
          />
        </VStack>
      </Container>
      <Modal
        title="Select Your Bank Account"
        data={accounts}
        onPressItem={setActiveAccount}
        ref={modalRef}
      />
    </>
  );
};

export default Transfer;
