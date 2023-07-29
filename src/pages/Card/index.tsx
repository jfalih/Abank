import React, {useEffect, useRef, useState} from 'react';
import Container from '../../components/molecules/Container';
import {
  Box,
  Color,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
} from '../../components';
import FastImage from 'react-native-fast-image';
import Icon from '../../components/atoms/Icon';
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {useUserContext} from '../../services/contexts/User/User.context';
import {useCard} from '../../core/apis/card';
import {useTransaction, useTransactionAll} from '../../core/apis/transaction';
import currency from 'currency.js';
import pockets from '../../data/pocket.json';
import {useAccountContext} from '../../services/contexts/Accounts/Account.context';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useSessionStorage} from '../../core/storage';

const CardAccount = props => {
  const {accountName, accountNo, status, balance} = props;
  const {colors} = useTheme();
  return (
    <Pressable
      fill
      direction="column"
      borderRadius={24}
      spacing={14}
      backgroundColor="#fff"
      shrink={false}
      padding={20}>
      <HStack justify="space-between" items="center">
        <Text type="subheading" weight="large">
          {accountName}
        </Text>
        <Icon size={24} name="IconArrowUpRight" />
      </HStack>
      <VStack>
        <Text type="label" weight="small" color={Color.shark['300']}>
          Your Balance
        </Text>
        <Text type="subheading" weight="large" color={Color.shark['800']}>
          {currency(balance || 0, {
            pattern: `! #`,
            symbol: 'Rp',
            separator: '.',
            precision: 0,
          }).format()}
        </Text>
      </VStack>
      <VStack>
        <Text type="label" weight="xsmall" color={Color.shark['300']}>
          Account Number
        </Text>
        <Text type="label" weight="xsmall" color={Color.shark['800']}>
          {accountNo}
        </Text>
      </VStack>
    </Pressable>
  );
};
const Card = () => {
  const ItemSeparatorComponent = () => <Divider thickness={12} />;
  const navigation = useNavigation();
  const {data} = useUserContext();
  const [balance, setBalance] = useState(0);
  const addNameRef = useRef<BottomSheetModal>();
  const [session] = useSessionStorage();
  const [accounts, setAccounts] = useState([]);
  const {mutate: mutateCard} = useCard();
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

  useEffect(() => {
    setBalance(accounts?.reduce((acc, now) => acc + now.balance, 0));
  }, [accounts]);
  const ListEmptyComponent = () => {
    return (
      <VStack fill spacing={20} padding={20} items="center" borderRadius={24}>
        <VStack fill items="center">
          <Text fill type="heading" weight="xsmall">
            You don't have account yet
          </Text>
          <Text align="center" fill type="paragraph" weight="xsmall">
            Expand Your Financial Horizons: Create a New Pocket and Watch Your
            Savings Soar!
          </Text>
        </VStack>

        <Pressable
          shrink={false}
          onPress={() => {
            navigation.navigate('Saving');
          }}
          items="center"
          spacing={5}
          borderRadius={8}
          padding={{
            paddingVertical: 10,
            paddingHorizontal: 12,
          }}
          backgroundColor={Color.shark['800']}>
          <Icon color={Color.shark['50']} name="IconLayoutGridAdd" size={24} />
          <Text color={Color.shark['50']} type="subheading" weight="small">
            Make a new account
          </Text>
        </Pressable>
      </VStack>
    );
  };

  return (
    <Container type="scrollview">
      <VStack spacing={20}>
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
        <HStack
          padding={{
            paddingHorizontal: 20,
          }}
          items="center"
          spacing={10}>
          <VStack
            items="center"
            justify="center"
            backgroundColor={Color.shark['50']}
            width={40}
            height={40}
            borderRadius={28}>
            <Text>{data?.username.charAt(0)}</Text>
          </VStack>
          <VStack fill>
            <Text type="subheading" weight="xsmall">
              Welcome Back,
            </Text>
            <Text type="subheading" weight="large">
              {data?.username.toLocaleLowerCase()}
            </Text>
          </VStack>
          <Pressable
            items="center"
            justify="center"
            borderRadius={20}
            width={40}
            height={40}
            backgroundColor={Color.shark['50']}>
            <Icon name="IconBell" size={24} />
          </Pressable>
        </HStack>
        <VStack
          padding={{
            paddingHorizontal: 20,
            paddingBottom: 80,
          }}>
          <Text>Total Balance</Text>
          <Text numberOfLines={1} type="heading" weight="medium">
            {currency(balance, {
              pattern: `! #`,
              symbol: 'Rp',
              separator: '.',
              precision: 0,
            }).format()}
          </Text>
        </VStack>
      </VStack>
      <Divider thickness={20} />
      <VStack
        borderRadius={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        padding={20}
        spacing={20}
        backgroundColor={Color.shark['50']}>
        <VStack
          style={{
            minHeight: 400,
          }}
          margin={{
            marginTop: accounts?.length > 0 ? -80 : 0,
          }}>
          <FlashList
            ItemSeparatorComponent={ItemSeparatorComponent}
            ListEmptyComponent={ListEmptyComponent}
            estimatedItemSize={400}
            scrollEnabled={false}
            data={accounts}
            extraData={accounts}
            renderItem={({item}) => (
              <CardAccount
                onPress={() =>
                  navigation.navigate('Detail', {
                    id: item.id,
                  })
                }
                {...item}
              />
            )}
          />
        </VStack>
      </VStack>
    </Container>
  );
};

export default Card;
