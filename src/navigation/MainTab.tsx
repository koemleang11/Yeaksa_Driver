import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DashboardScreen from '../container/mainTab/DashboardScreen';
import ChatScreen from '../container/mainTab/ChatScreen';
import AddProductScreen from '../container/mainTab/AddProductScreen';
import OrderScreen from '../container/mainTab/OrderScreen';
import AccountScreen from '../container/mainTab/AccountScreen';
import { CustomTabBar } from '../component/mainTab/CustomTabBar';
import { Routes, RoutesParams } from '../temp/Routes';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: 'transparent' } }} tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name={Routes.Dashboard} component={DashboardScreen} />
      <Tab.Screen name={Routes.Chat} component={ChatScreen} />
      <Tab.Screen name={Routes.AddProduct} component={AddProductScreen} initialParams={{ type: RoutesParams.AddProduct, productID: null }} />
      <Tab.Screen name={Routes.Order} component={OrderScreen} />
      <Tab.Screen name={Routes.Account} component={AccountScreen} />
    </Tab.Navigator>
  )
}

export default React.memo(MainTab)