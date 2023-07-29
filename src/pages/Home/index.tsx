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
import {Giveaway, Vector} from '../../assets';
import {useWindowDimensions} from 'react-native';
import {useUser} from '../../core/apis/auth/user';
import {useSessionStorage} from '../../core/storage';
import {useUserContext} from '../../services/contexts/User/User.context';
import {useCard} from '../../core/apis/card';
import {useTransaction} from '../../core/apis/transaction';
import currency from 'currency.js';
import transactionsJsonOne from '../../data/transactions.json';
import bank from '../../data/bank.json';

const Card = props => {
  const {accountName, accountNo, status, balance} = props;
  const {colors} = useTheme();
  return (
    <Pressable
      width={280}
      direction="column"
      borderRadius={24}
      spacing={14}
      shrink={false}
      padding={20}
      backgroundColor={colors.card}>
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
const Home = () => {
  const ItemSeparatorComponent = () => <Divider horizontal thickness={24} />;
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [session] = useSessionStorage();
  const [accounts, setAccounts] = useState([]);
  const [activeAccount, setActiveAccount] = useState(0);
  const [transactions, setTransactions] = useState(transactionsJsonOne);
  const {data} = useUserContext();

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
            setActiveAccount(res.data.data.accounts[0]?.accountNo);
          },
          onError(err) {
            console.log(err);
          },
        },
      );
    }, [mutateCard, session]),
  );

  const ListEmptyComponent = () => {
    return (
      <HStack
        fill
        width={width - 40}
        backgroundColor={Color.shark['50']}
        padding={20}
        borderRadius={24}>
        <VStack fill spacing={10}>
          <VStack>
            <Text fill type="heading" weight="xsmall">
              You don't have account yet
            </Text>
            <Text fill type="paragraph" weight="xsmall">
              Are you ready to embark on an awesome adventure with us? 🚀{' '}
            </Text>
          </VStack>
          <Pressable
            shrink={false}
            onPress={() => navigation.navigate('Saving')}
            items="center"
            spacing={5}
            borderRadius={8}
            padding={{
              paddingVertical: 10,
              paddingHorizontal: 12,
            }}
            backgroundColor={Color.shark['800']}>
            <Icon
              color={Color.shark['50']}
              name="IconLayoutGridAdd"
              size={24}
            />
            <Text color={Color.shark['50']} type="subheading" weight="small">
              Make a new account
            </Text>
          </Pressable>
        </VStack>
        <Box
          margin={{
            marginTop: -30,
            marginRight: -50,
            marginLeft: -60,
            marginBottom: -50,
          }}
          backgroundColor={'transparent'}
          width={200}
          height={200}
          as={<Giveaway />}
        />
      </HStack>
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
        <FlashList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          ListEmptyComponent={ListEmptyComponent}
          ItemSeparatorComponent={ItemSeparatorComponent}
          estimatedItemSize={400}
          data={accounts}
          renderItem={({item}) => <Card {...item} />}
        />
        <HStack
          padding={{
            paddingHorizontal: 20,
          }}
          spacing={10}>
          <Pressable
            fill
            onPress={() => navigation.navigate('Transfer')}
            backgroundColor={Color.shark['50']}
            items="center"
            justify="center"
            padding={{
              paddingHorizontal: 10,
            }}
            height={48}
            borderRadius={24}
            spacing={4}>
            <Icon size={24} name="IconArrowUpRight" />
            <Text>Transfer</Text>
          </Pressable>
          <Pressable
            fill
            padding={{
              paddingHorizontal: 10,
            }}
            borderRadius={24}
            backgroundColor={Color.shark['50']}
            items="center"
            justify="center"
            height={48}
            spacing={4}>
            <Icon size={24} name="IconArrowDownLeft" />
            <Text>Request</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Saving')}
            backgroundColor={Color.shark['50']}
            items="center"
            justify="center"
            height={48}
            width={48}
            borderRadius={24}>
            <Icon size={24} name="IconPlus" />
          </Pressable>
        </HStack>
      </VStack>
      <Divider thickness={20} />
      <VStack
        borderRadius={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        padding={20}
        spacing={20}
        style={{
          minHeight: 600,
        }}
        backgroundColor={Color.shark['50']}>
        {transactions?.length > 0 ? (
          <VStack spacing={8}>
            <Text type="heading" weight="xsmall" color={Color.shark['900']}>
              Recent Send
            </Text>
            <FlashList
              horizontal
              data={bank}
              ItemSeparatorComponent={ItemSeparatorComponent}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => navigation.navigate('Transfer')}
                  direction="column"
                  items="center"
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
                  <Text type="label" weight="xsmall" color={Color.shark['300']}>
                    Mary
                  </Text>
                </Pressable>
              )}
            />
            <Text type="heading" weight="xsmall" color={Color.shark['900']}>
              Transactions
            </Text>
            <FlashList
              data={transactions}
              estimatedItemSize={400}
              ItemSeparatorComponent={() => <Divider thickness={20} />}
              renderItem={({item}) => {
                if (typeof item === 'string') {
                  return <Text>{item}</Text>;
                } else {
                  return (
                    <HStack items="center" spacing={10}>
                      <VStack
                        items="center"
                        justify="center"
                        borderRadius={20}
                        width={40}
                        height={40}
                        backgroundColor={'#fff'}>
                        <Icon
                          size={24}
                          name={
                            item.type === 'in'
                              ? 'IconArrowDownLeft'
                              : 'IconArrowUpRight'
                          }
                        />
                      </VStack>
                      <VStack fill>
                        <Text type="subheading" weight="small">
                          {item.name}
                        </Text>
                        <Text type="label" weight="xsmall">
                          {item.time}
                        </Text>
                      </VStack>
                      <Text
                        type="label"
                        color={item.type === 'in' ? '#479E11' : '#EE5045'}
                        weight="small">
                        {currency(item.number, {
                          pattern: `! #`,
                          symbol: 'Rp',
                          separator: '.',
                          precision: 0,
                        }).format()}
                      </Text>
                    </HStack>
                  );
                }
              }}
            />
          </VStack>
        ) : (
          <VStack spacing={20} padding={20} items="center" borderRadius={24}>
            <VStack fill items="center">
              <Text fill type="heading" weight="xsmall">
                No Transaction Yet
              </Text>
              <Text align="center" fill type="paragraph" weight="xsmall">
                No worries, take your time to explore our app and all the
                exciting features it has to offer!
              </Text>
            </VStack>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Home;
