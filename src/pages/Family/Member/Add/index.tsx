import React, {useRef} from 'react';
import {
  Color,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
} from '../../../../components';
import Icon from '../../../../components/atoms/Icon';
import {useNavigation, useTheme} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Controller, useForm} from 'react-hook-form';
import currency from 'currency.js';
import Modal from './Modal';
import Toast from 'react-native-toast-message';
import {useAccountContext} from '../../../../services/contexts/Accounts/Account.context';
import {useFamilyContext} from '../../../../services/contexts/Family/Family.context';

const Add = ({route}) => {
  const navigation = useNavigation();
  const {item} = route?.params || {};
  const limitModalRef = useRef<BottomSheetModal>(null);
  const {setFamily} = useFamilyContext();
  const ItemSeparatorComponent = () => <Divider horizontal thickness={12} />;
  const {colors} = useTheme();

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: {errors, isSubmitting},
  } = useForm({
    defaultValues: {
      limit: 0,
      now: 0,
      gender: item?.gender,
      name: item?.username,
      status: 'Member',
    },
  });

  const handleOnPressSubmit = handleSubmit(data => {
    if (data.limit <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Hmm.. Kami nemu error nih!',
        text2: 'Limit kamu kurang nih..',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Yey.. berhasil nih!',
        text2: 'Kamu berhasil menambahkan family.',
      });
      setFamily(prev => {
        return [...prev, {id: prev[prev.length - 1].id + 1, ...data}];
      });
      navigation.goBack();
    }
  });
  return (
    <VStack fill>
      <HStack padding={20} spacing={10}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="IconChevronLeft" size={24} />
        </Pressable>
        <Text type="subheading" weight="large">
          Add Family Member
        </Text>
      </HStack>
      <VStack
        fill
        borderRadius={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
        padding={20}
        spacing={20}
        backgroundColor={Color.shark['50']}>
        <VStack spacing={20}>
          <VStack
            borderRadius={30}
            backgroundColor={'#fff'}
            width={60}
            height={60}
            items="center"
            justify="center">
            <Text type="heading" weight="small">
              {item.username.charAt(0)}
            </Text>
          </VStack>
          <Text type="heading" weight="small">
            {item?.username}
          </Text>
        </VStack>
        <VStack spacing={4}>
          <Text color={Color.shark['300']} type="label" weight="small">
            Limit
          </Text>
          <Pressable
            onPress={() => limitModalRef?.current?.present()}
            shrink={false}
            items="center">
            <Text fill color={Color.shark['800']} type="heading" weight="small">
              {currency(watch('limit'), {
                pattern: `! #`,
                symbol: 'Rp',
                separator: '.',
                precision: 0,
              }).format()}
            </Text>
            <Icon name="IconPencil" size={24} />
          </Pressable>
        </VStack>
        <VStack spacing={4}>
          <Text color={Color.shark['300']} type="label" weight="small">
            Type
          </Text>
          <HStack
            self="start"
            borderRadius={8}
            backgroundColor={'#fff'}
            padding={8}>
            <Pressable
              shrink={false}
              onPress={() => setValue('status', 'Co-Owner')}
              borderRadius={5}
              backgroundColor={
                watch('status') === 'Co-Owner' ? colors.primary : undefined
              }
              padding={{
                paddingVertical: 8,
                paddingHorizontal: 16,
              }}>
              <Text
                color={
                  watch('status') === 'Co-Owner' ? '#fff' : Color.shark['300']
                }
                type="label"
                weight="small">
                Co-Owner
              </Text>
            </Pressable>
            <Pressable
              shrink={false}
              onPress={() => setValue('status', 'Member')}
              backgroundColor={
                watch('status') === 'Member' ? colors.primary : undefined
              }
              borderRadius={5}
              padding={{
                paddingVertical: 8,
                paddingHorizontal: 16,
              }}>
              <Text
                color={
                  watch('status') === 'Member' ? '#fff' : Color.shark['300']
                }
                type="label"
                weight="small">
                Member
              </Text>
            </Pressable>
          </HStack>
        </VStack>
        <Pressable
          disabled={isSubmitting}
          onPress={handleOnPressSubmit}
          borderRadius={8}
          margin={{
            marginBottom: 20,
          }}
          items="center"
          justify="center"
          height={50}
          backgroundColor={isSubmitting ? Color.shark['300'] : colors.primary}>
          {!isSubmitting ? (
            <Text color={Color.shark['50']} type="subheading" weight="medium">
              Add Family
            </Text>
          ) : (
            <ActivityIndicator size="small" color="#fff" />
          )}
        </Pressable>
      </VStack>

      <Controller
        name="limit"
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Modal
            label="Limit"
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
            keyboardType="numeric"
            placeholder="Limit family kamu"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            ref={limitModalRef}
          />
        )}
      />
    </VStack>
  );
};

export default Add;
