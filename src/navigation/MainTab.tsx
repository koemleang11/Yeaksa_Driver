import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardScreen from '../container/mainTab/DashboardScreen';
import ChatScreen from '../container/mainTab/MyJobScreen';
import OrderScreen from '../container/mainTab/AssignedScreen';
import AccountScreen from '../container/mainTab/AccountScreen';
import {CustomTabBar} from '../component/mainTab/CustomTabBar';
import {Routes, RoutesParams} from '../temp/Routes';
import LoginScreen from '../container/auth/LoginScreen';
import AssignedScreen from '../container/mainTab/AssignedScreen';
import MainProduct from './MainProduct';
import MyJobsScreen from '../container/mainTab/MyJobScreen';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: 'transparent'},
      }}
      initialRouteName={Routes.Dashboard}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name={Routes.Assigned} component={AssignedScreen} />
      <Tab.Screen name={Routes.MyJob} component={MyJobsScreen} />
      <Tab.Screen name={Routes.Dashboard} component={DashboardScreen} />
      <Tab.Screen name={Routes.MainProduct} component={MainProduct} />
      <Tab.Screen name={Routes.Account} component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default React.memo(MainTab);
