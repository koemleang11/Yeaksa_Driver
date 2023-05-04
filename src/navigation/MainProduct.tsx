import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Routes} from '../temp/Routes';
import ProductScreen from '../screens/mainHistory/CompletedScreen';
import ReviewScreen from '../screens/mainHistory/RejectedScreen';
import BaseComponent from '../component/BaseComponent';
import {MyTabBar} from '../component/mainHistory/CustomHistory';
import CompletedScreen from '../screens/mainHistory/CompletedScreen';
import RejectedScreen from '../screens/mainHistory/RejectedScreen';
import {navigate} from '../services/navigate/navigation';

const Tab = createMaterialTopTabNavigator();

function MainProduct() {
  return (
    <BaseComponent
      title="History"
      style={{flex: 1}}
      disabledCloseKeyboard
      enabledAdd
      onAdd={() => navigate(Routes.Search)}>
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name={Routes.Completed} component={CompletedScreen} />
        <Tab.Screen name={Routes.Rejected} component={RejectedScreen} />
      </Tab.Navigator>
    </BaseComponent>
  );
}

export default MainProduct;
