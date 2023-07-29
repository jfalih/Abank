import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import {BottomNavbar} from '../components/molecules/BottomNavbar';
import Icon from '../components/atoms/Icon';
import Family from '../pages/Family';
import Pocket from '../pages/Pocket';
import Card from '../pages/Card';

const TabStack = createBottomTabNavigator();

const BottomNavigation = React.memo(
  React.forwardRef(() => {
    return (
      <TabStack.Navigator
        tabBar={props => <BottomNavbar {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <TabStack.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="IconSmartHome" color={color} size={size} />
            ),
          }}
          name="Home"
          component={Home}
        />
        <TabStack.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="IconWallet" color={color} size={size} />
            ),
            unmountOnBlur: true,
          }}
          name="Pocket"
          component={Pocket}
        />
        <TabStack.Screen
          options={{
            tabBarLabel: 'QR',
            tabBarIcon: ({color, size}) => (
              <Icon name="IconScan" color={color} size={size} />
            ),
          }}
          name="Profile"
          component={Home}
        />
        <TabStack.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="IconUsersGroup" color={color} size={size} />
            ),
            unmountOnBlur: true,
          }}
          name="Family"
          component={Family}
        />
        <TabStack.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="IconCreditCard" color={color} size={size} />
            ),
          }}
          name="Card"
          component={Card}
        />
      </TabStack.Navigator>
    );
  }),
);

export default BottomNavigation;
