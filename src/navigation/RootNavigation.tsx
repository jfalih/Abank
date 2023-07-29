import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from './BottomNavigation';
import {Color} from '../components';
import Login from '../pages/Auth/Login';
import Transfer from '../pages/Transfer';
import {useSessionStorage} from '../core/storage';
import Saving from '../pages/Auth/Register/Saving';
import Account from '../pages/Auth/Register/Account';
import Confirm from '../pages/Auth/Register/Confirm';
import Username from '../pages/Auth/Register/Username';
import Add from '../pages/Pocket/Add';
import Member from '../pages/Family/Member';
import {default as AddMember} from '../pages/Family/Member/Add';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useUser} from '../core/apis/auth/user';
import {useUserContext} from '../services/contexts/User/User.context';
import Detail from '../pages/Pocket/Detail';
import TransferTo from '../pages/Transfer/TransferTo';

const Native = createNativeStackNavigator();

const RootNavigation = React.memo(
  React.forwardRef(() => {
    const [session, setSession] = useSessionStorage();
    const {mutate: mutateUser} = useUser();
    const {setUser} = useUserContext();
    const MyTheme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: Color.shark['100'],
        text: Color.shark['900'],
        border: '#2F3133',
        card: Color.shark['50'],
        primary: Color.haze['800'],
      },
    };

    React.useEffect(() => {
      mutateUser(
        {
          token: session,
        },
        {
          onSuccess(res) {
            if (res.data.success) {
              setUser(res.data.data);
            } else {
              Toast.show({
                type: 'error',
                text1: 'Hmm.. kami nemu error nih!',
                text2: res?.data.errMsg,
              });
            }
          },
          onError(e) {
            setSession(null);
            Toast.show({
              type: 'error',
              text1: 'Hmm.. kami nemu error nih!',
              text2: (e as Error)?.message,
            });
          },
        },
      );
    }, []);
    return (
      <NavigationContainer theme={MyTheme}>
        <Native.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {!session ? (
            <>
              <Native.Screen name="Login" component={Login} />
              <Native.Screen name="Account" component={Account} />
              <Native.Screen name="Confirm" component={Confirm} />
              <Native.Screen name="Username" component={Username} />
            </>
          ) : (
            <>
              <Native.Screen
                name="BottomNavigation"
                component={BottomNavigation}
              />
              <Native.Screen name="Transfer" component={Transfer} />
              <Native.Screen name="TransferTo" component={TransferTo} />
              <Native.Screen name="Member" component={Member} />

              <Native.Screen name="AddMember" component={AddMember} />

              <Native.Screen name="Saving" component={Saving} />
              <Native.Screen name="Detail" component={Detail} />
              <Native.Screen name="AddPocket" component={Add} />
            </>
          )}
        </Native.Navigator>
      </NavigationContainer>
    );
  }),
);

export default RootNavigation;
