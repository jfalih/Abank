import React, {useRef} from 'react';
import {
  Box,
  Color,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
} from '../../../components';
import Icon from '../../../components/atoms/Icon';
import Container from '../../../components/molecules/Container';
import {useNavigation, useTheme} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {FlashList} from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import Input from '../../../components/atoms/Input';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import AddName from './components/Modal';
import {Controller, useForm} from 'react-hook-form';
import currency from 'currency.js';
import Modal from './components/Modal';
import Toast from 'react-native-toast-message';
import {useAccountContext} from '../../../services/contexts/Accounts/Account.context';

const Add = () => {
  const navigation = useNavigation();
  const addNameModalRef = useRef<BottomSheetModal>(null);
  const capacityModalRef = useRef<BottomSheetModal>(null);
  const monthlyModalRef = useRef<BottomSheetModal>(null);
  const {setAccounts} = useAccountContext();
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
      name: 'Jajanan',
      capacity: 0,
      now: 0,
      type: 'saving',
      monthly: 0,
    },
  });

  const handleOnPressSubmit = handleSubmit(data => {
    if (data.capacity <= data.monthly) {
      Toast.show({
        type: 'error',
        text1: 'Hmm.. Kami nemu error nih!',
        text2: 'Kapasitas kamu kurang dari monthly transfer..',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Yey.. berhasil nih!',
        text2: 'Kamu berhasil menambahkan pocket.',
      });
      setAccounts(prev => {
        return [{id: prev[prev.length - 1].id + 1, ...data}, ...prev];
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
          Add New Pocket
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
        <VStack spacing={4}>
          <Text color={Color.shark['300']} type="label" weight="small">
            Pocket Name
          </Text>
          <Pressable
            onPress={() => addNameModalRef?.current?.present()}
            shrink={false}
            items="center">
            <Text fill color={Color.shark['800']} type="heading" weight="small">
              {watch('name')}
            </Text>
            <Icon name="IconPencil" size={24} />
          </Pressable>
        </VStack>
        <VStack spacing={4}>
          <Text color={Color.shark['300']} type="label" weight="small">
            Capacity
          </Text>
          <Pressable
            onPress={() => capacityModalRef?.current?.present()}
            shrink={false}
            items="center">
            <Text fill color={Color.shark['800']} type="heading" weight="small">
              {currency(watch('capacity'), {
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
              onPress={() => setValue('type', 'saving')}
              borderRadius={5}
              backgroundColor={
                watch('type') === 'saving' ? colors.primary : undefined
              }
              padding={{
                paddingVertical: 8,
                paddingHorizontal: 16,
              }}>
              <Text
                color={watch('type') === 'saving' ? '#fff' : Color.shark['300']}
                type="label"
                weight="small">
                Saving
              </Text>
            </Pressable>
            <Pressable
              shrink={false}
              onPress={() => setValue('type', 'paying')}
              backgroundColor={
                watch('type') === 'paying' ? colors.primary : undefined
              }
              borderRadius={5}
              padding={{
                paddingVertical: 8,
                paddingHorizontal: 16,
              }}>
              <Text
                color={watch('type') === 'paying' ? '#fff' : Color.shark['300']}
                type="label"
                weight="small">
                Paying
              </Text>
            </Pressable>
          </HStack>
        </VStack>
        <VStack spacing={4}>
          <Text color={Color.shark['200']} type="label" weight="small">
            Monthly transfer
          </Text>
          <Pressable
            onPress={() => monthlyModalRef?.current?.present()}
            shrink={false}
            items="center">
            <Text fill color={Color.shark['800']} type="heading" weight="small">
              {currency(watch('monthly'), {
                pattern: `! #`,
                symbol: 'Rp',
                separator: '.',
                precision: 0,
              }).format()}
            </Text>
            <Icon name="IconPencil" size={24} />
          </Pressable>
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
              Add Pocket
            </Text>
          ) : (
            <ActivityIndicator size="small" color="#fff" />
          )}
        </Pressable>
      </VStack>

      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Modal
            label="Pocket Name"
            placeholder="Masukan name pocket kamu"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            ref={addNameModalRef}
          />
        )}
      />
      <Controller
        name="capacity"
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Modal
            label="Capacity"
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
            placeholder="Kapasitas pocket kamu"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            ref={capacityModalRef}
          />
        )}
      />
      <Controller
        name="monthly"
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value, error}}) => (
          <Modal
            label="Monthly Transfer"
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
            placeholder="Monthly transfer kamu"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            ref={monthlyModalRef}
          />
        )}
      />
    </VStack>
  );
};

export default Add;
