import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {HStack, Pressable, Text, VStack} from '../../../../components';
import Icon from '../../../../components/atoms/Icon';
import Container from '../../../../components/molecules/Container';

const Saving = () => {
  const navigation = useNavigation();
  return (
    <Container type="scrollview">
      <VStack spacing={20} padding={20}>
        <Pressable onPress={() => navigation.goBack()} shrink={false}>
          <Icon size={32} name="IconArrowLeft" />
        </Pressable>
        <VStack
          margin={{
            marginBottom: 10,
          }}
          spacing={2}>
          <Text type="heading" weight="large">
            Create Saving Account
          </Text>
          <Text type="paragraph" weight="medium">
            Opening a new savings account with us is quick and hassle-free.
            Here's a 3 step guide:
          </Text>
        </VStack>
        <HStack
          padding={{
            paddingHorizontal: 10,
          }}
          justify="space-between"
          items="flex-start"
          fill>
          <VStack spacing={5} width={90} items="center">
            <Icon name="IconIdBadge2" size={24} />
            <Text type="subheading" weight="medium">
              Step 1
            </Text>
            <Text>KTP Scan</Text>
          </VStack>
          <VStack spacing={5} justify="center" width={90} items="center">
            <Icon name="IconIdBadge2" size={24} />
            <Text type="subheading" weight="medium">
              Step 2
            </Text>
            <Text align="center">Personal Information</Text>
          </VStack>
          <VStack spacing={5} width={90} items="center">
            <Icon name="IconIdBadge2" size={24} />
            <Text type="subheading" weight="medium">
              Step 3
            </Text>
            <Text>KTP Scan</Text>
          </VStack>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Saving;
