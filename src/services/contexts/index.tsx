import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ScrollProvider} from './Scroll/Scroll.provider';
import RootNavigation from '../../navigation/RootNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {UserProvider} from './User/User.provider';
import {AccountProvider} from './Accounts/Account.provider';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {FamilyProvider} from './Family/Family.provider';

const queryClient = new QueryClient();

const Provider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <UserProvider>
          <AccountProvider>
            <FamilyProvider>
              <ScrollProvider>
                <GestureHandlerRootView style={{flex: 1}}>
                  <RootNavigation />
                  <Toast />
                </GestureHandlerRootView>
              </ScrollProvider>
            </FamilyProvider>
          </AccountProvider>
        </UserProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default Provider;
