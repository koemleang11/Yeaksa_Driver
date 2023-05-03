import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Routes} from '../temp/Routes';
import ProductScreen from '../screens/mainProduct/CompletedScreen';
import ReviewScreen from '../screens/mainProduct/RejectedScreen';
import BaseComponent from '../component/BaseComponent';
import {MyTabBar} from '../component/mainProduct/CustomHistory';
import CompletedScreen from '../screens/mainProduct/CompletedScreen';
import RejectedScreen from '../screens/mainProduct/RejectedScreen';

const Tab = createMaterialTopTabNavigator();

function MainProduct() {
  return (
    <BaseComponent title="History" style={{flex: 1}} disabledCloseKeyboard>
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name={Routes.Completed} component={CompletedScreen} />
        <Tab.Screen name={Routes.Rejected} component={RejectedScreen} />
      </Tab.Navigator>
    </BaseComponent>
  );
}

export default MainProduct;
