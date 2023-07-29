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
import {useNavigation, useTheme} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {useUserContext} from '../../services/contexts/User/User.context';
import {useCard} from '../../core/apis/card';
import {useTransaction, useTransactionAll} from '../../core/apis/transaction';
import currency from 'currency.js';
import pockets from '../../data/pocket.json';
import {useAccountContext} from '../../services/contexts/Accounts/Account.context';
import AddName from './Add/components/Modal';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

const Card = props => {
  const {colors} = useTheme();
  const {name, onPress, target, now, type, savings} = props;
  return (
    <Pressable
      onPress={onPress}
      direction="column"
      borderRadius={24}
      fill
      spacing={14}
      shrink={false}
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
            {name}
          </Text>
          <Text type="paragraph" weight="xsmall">
            Monthly savings:
            {currency(savings, {
              pattern: `! #`,
              symbol: 'Rp',
              separator: '.',
              precision: 0,
            }).format()}
          </Text>
        </VStack>
        <Icon size={24} name="IconArrowUpRight" />
      </HStack>
      <VStack spacing={5}>
        <HStack justify="space-between">
          <Text type="label" weight="xsmall">
            {currency(now, {
              pattern: `! #`,
              symbol: 'Rp',
              separator: '.',
              precision: 0,
            }).format()}
          </Text>
          <Text type="paragraph" weight="xsmall">
            Target:{' '}
            {currency(target, {
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
    </Pressable>
  );
};
const Pocket = () => {
  const ItemSeparatorComponent = () => <Divider thickness={12} />;
  const navigation = useNavigation();
  const {data} = useUserContext();
  const [balance, setBalance] = useState(0);
  const addNameRef = useRef<BottomSheetModal>();
  const {data: accounts} = useAccountContext();
  useEffect(() => {
    setBalance(accounts?.reduce((acc, now) => acc + now.now, 0));
  }, [accounts]);
  const ListEmptyComponent = () => {
    return (
      <VStack fill spacing={20} padding={20} items="center" borderRadius={24}>
        <VStack fill items="center">
          <Text fill type="heading" weight="xsmall">
            Make More Pocket?
          </Text>
          <Text align="center" fill type="paragraph" weight="xsmall">
            Expand Your Financial Horizons: Create a New Pocket and Watch Your
            Savings Soar!
          </Text>
        </VStack>

        <Pressable
          shrink={false}
          onPress={() => {
            navigation.navigate('AddPocket');
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
          <Text type="heading" weight="medium">
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
            ListFooterComponent={ListEmptyComponent}
            estimatedItemSize={400}
            scrollEnabled={false}
            data={accounts}
            extraData={accounts}
            renderItem={({item}) => (
              <Card
                onPress={() =>
                  navigation.navigate('Detail', {
                    id: item.id,
                  })
                }
                name={item.name}
                type={item.type}
                now={item.now}
                target={item.capacity}
                savings={item.monthly}
              />
            )}
          />
        </VStack>
      </VStack>
      <AddName ref={addNameRef} />
    </Container>
  );
};

export default Pocket;
