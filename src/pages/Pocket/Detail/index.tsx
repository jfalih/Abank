import React, {useEffect, useRef, useState} from 'react';
import Container from '../../../components/molecules/Container';
import {
  Box,
  Color,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
} from '../../../components';
import FastImage from 'react-native-fast-image';
import Icon from '../../../components/atoms/Icon';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useUserContext} from '../../../services/contexts/User/User.context';
import currency from 'currency.js';
import transactionsJsonOne from '../../../data/transactions.json';
import {useAccountContext} from '../../../services/contexts/Accounts/Account.context';
import {FlashList} from '@shopify/flash-list';
const Card = props => {
  const {colors} = useTheme();
  const {name, onPress, target, now, type, savings} = props;
  return (
    <VStack
      borderRadius={24}
      fill
      spacing={14}
      padding={20}
      backgroundColor={'#fff'}>
      <HStack spacing={10} items="center">
        <VStack
          height={50}
          borderRadius={10}
          width={50}
          items="center"
          justify="center"
          backgroundColor={Color.shark['50']}>
          <Text>{type === 'saving' ? '💰' : '🍔'}</Text>
        </VStack>
        <VStack fill>
          <Text type="subheading" weight="large">
            {name || 'Loading'}
          </Text>
          <Text type="paragraph" weight="xsmall">
            Monthly savings:
            {currency(savings || 0, {
              pattern: `! #`,
              symbol: 'Rp',
              separator: '.',
              precision: 0,
            }).format()}
          </Text>
        </VStack>
      </HStack>
      <VStack spacing={5}>
        <HStack justify="space-between">
          <Text type="label" weight="xsmall">
            {currency(now || 0, {
              pattern: `! #`,
              symbol: 'Rp',
              separator: '.',
              precision: 0,
            }).format()}
          </Text>
          <Text type="paragraph" weight="xsmall">
            Target:{' '}
            {currency(target || 0, {
              pattern: `! #`,
              symbol: 'Rp',
              separator: '.',
              precision: 0,
            }).format()}
          </Text>
        </HStack>
        <VStack
          height={8}
          borderRadius={4}
          backgroundColor={Color.shark['50']}
          fill>
          <Box
            height={8}
            borderRadius={4}
            backgroundColor={'#FDAC74'}
            width={`${100 * (now / target)}%`}
          />
        </VStack>
      </VStack>
    </VStack>
  );
};
const Detail = ({route}) => {
  const navigation = useNavigation();
  const {id} = route?.params || {};
  const ItemSeparatorComponent = () => <Divider horizontal thickness={12} />;
  const [card, setCard] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const {data: accounts} = useAccountContext();

  useEffect(() => {
    setCard(accounts?.find(val => val.id === id));
  }, [accounts, id]);

  useEffect(() => {
    if (card?.id === 1) {
      setTransactions(transactionsJsonOne);
    }
  }, [card]);
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
          as={<FastImage source={require('../../../assets/Vector.png')} />}
        />
        <HStack
          padding={{
            paddingHorizontal: 20,
          }}
          items="center"
          spacing={10}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="IconChevronLeft" size={24} />
          </Pressable>
          <VStack fill>
            <Text type="subheading" weight="large">
              Pocket
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
          }}>
          <Card
            name={card?.name}
            target={card?.capacity}
            now={card?.now || 0}
            type={card?.type}
            savings={card?.monthly}
          />
        </VStack>
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
        style={{
          minHeight: 600,
        }}
        padding={20}
        spacing={20}
        backgroundColor={Color.shark['50']}>
        {transactions?.length > 0 ? (
          <VStack spacing={20}>
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
          <VStack
            borderRadius={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
            style={{
              minHeight: 600,
            }}
            padding={20}
            spacing={20}
            backgroundColor={Color.shark['50']}>
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
                <Text
                  color={Color.shark['50']}
                  type="subheading"
                  weight="small">
                  Make a new account
                </Text>
              </Pressable>
            </VStack>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Detail;
