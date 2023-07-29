import React from 'react';
import FastImage from 'react-native-fast-image';
import {Box, Color, Pressable, Divider, Text, VStack} from '../../components';
import Container from '../../components/molecules/Container';
import {useTheme} from '@react-navigation/native';
import Icon from '../../components/atoms/Icon';

const Family = () => {
  const {colors} = useTheme();
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
        <VStack
          items="center"
          backgroundColor={'#fff'}
          padding={20}
          spacing={20}
          borderRadius={20}>
          <VStack items="center">
            <Text type="heading" weight="xsmall">
              Setup Family Sharing
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
            borderRadius={12}
            spacing={8}
            shrink={false}
            backgroundColor={colors.primary}
            padding={{
              paddingHorizontal: 20,
              paddingVertical: 14,
            }}>
            <Icon size={24} color={Color.shark['50']} name="IconUsersGroup" />
            <Text type="subheading" weight="medium" color={Color.shark['50']}>
              Setup Family Sharing
            </Text>
          </Pressable>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Family;
