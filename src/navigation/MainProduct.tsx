import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Routes} from '../temp/Routes';
import ProductScreen from '../screens/mainProduct/ProductScreen';
import ReviewScreen from '../screens/mainProduct/ReviewScreen';
import BaseComponent from '../component/BaseComponent';
import {MyTabBar} from '../component/mainProduct/CustomMainProduct';

const Tab = createMaterialTopTabNavigator();

function MainProduct() {
  return (
    <BaseComponent title="products" style={{flex: 1}} disabledCloseKeyboard>
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name={Routes.Products} component={ProductScreen} />
        <Tab.Screen name={Routes.Reviews} component={ReviewScreen} />
      </Tab.Navigator>
    </BaseComponent>
  );
}

export default MainProduct;
