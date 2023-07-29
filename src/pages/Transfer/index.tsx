import React from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {FlashList} from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import Input from '../../components/atoms/Input';

const Transfer = () => {
  const navigation = useNavigation();
  const ItemSeparatorComponent = () => <Divider horizontal thickness={12} />;

  const isSubmitting = false;
  return (
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
                Bank BCA
              </Text>
            </VStack>
            <Icon name="IconChevronRight" size={24} />
          </Pressable>
          <Pressable shrink={false} padding={20} spacing={10} items="center">
            <Icon name="IconBuildingBank" size={24} />
            <VStack fill>
              <Text type="paragraph" weight="small">
                Account Number
              </Text>
              <Text type="subheading" weight="small">
                Insert Account Number
              </Text>
            </VStack>
            <Icon name="IconChevronRight" size={24} />
          </Pressable>
        </VStack>
        <Divider thickness={20} />
        <Pressable
          disabled={isSubmitting}
          shrink={false}
          onPress={() => {}}
          borderRadius={8}
          items="center"
          justify="center"
          height={50}
          backgroundColor={
            isSubmitting ? Color.shark['300'] : Color.shark['800']
          }>
          {!isSubmitting ? (
            <Text color={Color.shark['50']} type="subheading" weight="medium">
              Continue
            </Text>
          ) : (
            <ActivityIndicator size="small" color="#fff" />
          )}
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
        data={[1, 2, 3]}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({item}) => (
          <Pressable
            direction="column"
            items="center"
            justify="center"
            width={46}>
            <Box
              width={46}
              height={46}
              borderRadius={28}
              as={
                <FastImage
                  source={{
                    uri: 'https://images.unsplash.com/photo-1690535922441-939fb8e6e933?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60',
                  }}
                />
              }
            />
            <Text type="label" weight="xsmall" color={Color.shark['300']}>
              Mary
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
          data={[1, 2, 3, 4]}
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
                  A
                </Text>
              </VStack>
              <VStack>
                <Text type="subheading" weight="small">
                  Adam
                </Text>
                <Text type="paragraph" weight="small">
                  BCA - 123123123
                </Text>
              </VStack>
            </Pressable>
          )}
        />
      </VStack>
    </Container>
  );
};

export default Transfer;
