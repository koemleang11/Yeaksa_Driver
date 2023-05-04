import {FlatList, StyleSheet, SafeAreaView, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import BaseComponent from '../../component/BaseComponent';
import PaymentStatusDropDown from '../../component/order/PaymentStatusDropDown';
import DeliveryStatusDropDown from '../../component/order/DeliveryStatusDropDown';
import {HStack} from 'native-base';
import {padding_horizontal, screenWidth} from '../../theme/layouts';
import CardItem from '../../component/order/CardItem';
import colors from '../../theme/colors';
import OrderCard from '../../component/dashboard/OrderCard';
import {AppImages} from '../../theme/images';
import {navigate} from '../../services/navigate/navigation';
import {Routes} from '../../temp/Routes';

const AssignedScreen = () => {
  const _renderItem = () => {
    return <CardItem />;
  };

  const onPressed = () => {
    navigate(Routes.OrderDetail);
  };

  return (
    <>
      <BaseComponent
        title="recently_assigned"
        style={{paddingHorizontal: padding_horizontal, flex: 1}}>
        <>
          <View
            style={{
              marginBottom: screenWidth(120),
              marginTop: screenWidth(20),
            }}>
            <HStack justifyContent={'space-between'} zIndex={100}>
              <FlatList
                data={[1, 2, 3, 4, 5, 6]}
                renderItem={() => {
                  return (
                    <OrderCard
                      images={AppImages.Sunchhay}
                      title="ReakSmey Sunchhay"
                      order="#00000014"
                      date="02 May,2023 10:15AM"
                      location="Street 31BT,Phnom Penh, GWJ4+97 Phnom Penh, 12351"
                      Statuse=" Assigned"
                      onPress={() => {
                        onPressed(), {type: 'assigned'};
                      }}
                    />
                  );
                }}
              />
            </HStack>
          </View>
        </>
      </BaseComponent>
      <SafeAreaView style={{backgroundColor: colors.mainColor}} />
    </>
  );
};

export default AssignedScreen;

const styles = StyleSheet.create({});
