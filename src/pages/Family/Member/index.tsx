import React, {useRef} from 'react';
import {
  Color,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
} from '../../../components';
import Icon from '../../../components/atoms/Icon';
import {useTheme} from '@react-navigation/native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useForm} from 'react-hook-form';
import Toast from 'react-native-toast-message';
import {useAccountContext} from '../../../services/contexts/Accounts/Account.context';
import {FlashList} from '@shopify/flash-list';
import bank from '../../../data/bank.json';

const Member = ({navigation}) => {
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
          Add New Member
        </Text>
      </HStack>
      <VStack
        fill
        borderRadius={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
        spacing={20}
        backgroundColor={Color.shark['50']}>
        <Text
          margin={{
            marginHorizontal: 20,
            marginTop: 20,
          }}
          type="heading"
          weight="xsmall">
          Contact List
        </Text>
        <FlashList
          ItemSeparatorComponent={() => <Divider thickness={20} />}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                navigation.navigate('AddMember', {item});
              }}
              items="center"
              spacing={10}
              shrink={false}
              padding={{
                paddingHorizontal: 20,
              }}>
              <VStack
                borderRadius={23}
                backgroundColor="#fff"
                items="center"
                justify="center"
                width={46}
                height={46}>
                <Text>{item?.username?.charAt(0)}</Text>
              </VStack>
              <Text>{item.username}</Text>
            </Pressable>
          )}
          data={bank}
        />
      </VStack>
    </VStack>
  );
};

export default Member;
