import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {
  Box,
  Color,
  Pressable,
  Divider,
  Text,
  VStack,
  HStack,
} from '../../components';
import Container from '../../components/molecules/Container';
import {useNavigation, useTheme} from '@react-navigation/native';
import Icon from '../../components/atoms/Icon';
import currency from 'currency.js';
import {FlashList} from '@shopify/flash-list';
import {useFamilyContext} from '../../services/contexts/Family/Family.context';

const Card = props => {
  const {colors} = useTheme();
  const {name, onPress, limit, now, type, status} = props;
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
          <Text>{type === 'Man' ? '👱‍♂️' : '👩‍🦳'}</Text>
        </VStack>
        <VStack fill>
          <Text type="subheading" weight="large">
            {name}
          </Text>
          <Text type="paragraph" weight="xsmall">
            {status}
          </Text>
        </VStack>
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
            Daily limit:{' '}
            {currency(limit, {
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
            width={`${100 * (now / limit)}%`}
          />
        </VStack>
      </VStack>
    </VStack>
  );
};

const Family = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {data: family} = useFamilyContext();
  return (
    <Container type="scrollview">
      <VStack
        padding={{
          paddingHorizontal: 20,
        }}
        spacing={20}>
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
        <VStack width={300} self="center" items="center" justify="center">
          <Box
            width={150}
            height={200}
            as={
              <FastImage
                resizeMode="contain"
                source={require('../../assets/family.png')}
              />
            }
          />
          <Text type="heading" weight="medium">
            Family Sharing
          </Text>
          <Text align="center" type="paragraph" weight="large">
            Share and manage your family financial easily
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
        <FlashList
          data={family}
          estimatedItemSize={400}
          ItemSeparatorComponent={() => <Divider thickness={20} />}
          ListFooterComponent={() => (
            <VStack
              items="center"
              backgroundColor={'#fff'}
              padding={20}
              spacing={20}
              margin={{
                marginTop: 20,
              }}
              borderRadius={20}>
              <VStack items="center">
                <Text type="heading" weight="xsmall">
                  Add family member
                </Text>
                <Text weight="xsmall">Let’s invite your family member.</Text>
              </VStack>

              <Box
                width={120}
                height={60}
                as={
                  <FastImage
                    resizeMode="contain"
                    source={require('../../assets/family2.png')}
                  />
                }
              />
              <Pressable
                onPress={() => navigation.navigate('Member')}
                borderRadius={12}
                spacing={8}
                shrink={false}
                backgroundColor={colors.primary}
                padding={{
                  paddingHorizontal: 20,
                  paddingVertical: 14,
                }}>
                <Icon
                  size={24}
                  color={Color.shark['50']}
                  name="IconUsersGroup"
                />
                <Text
                  type="subheading"
                  weight="medium"
                  color={Color.shark['50']}>
                  Add family member
                </Text>
              </Pressable>
            </VStack>
          )}
          renderItem={({item}) => (
            <Card
              status={item.status}
              now={item.now}
              type={item.gender}
              limit={item.limit}
              name={item.name}
            />
          )}
        />
      </VStack>
    </Container>
  );
};

export default Family;
