import {FlatList, StyleSheet, SafeAreaView, View} from 'react-native';
import React from 'react';
import BaseComponent from '../../component/BaseComponent';
import {HStack} from 'native-base';
import {padding_horizontal, screenWidth} from '../../theme/layouts';
import CardItem from '../../component/order/CardItem';
import colors from '../../theme/colors';
import OrderCard from '../../component/dashboard/OrderCard';
import {AppImages} from '../../theme/images';

const Indelivery = () => {
  const _renderItem = () => {
    return <CardItem />;
  };

  return (
    <>
      <BaseComponent
        title="in_delivery"
        style={{paddingHorizontal: padding_horizontal, flex: 1}}>
        <>
          <View
            style={{
              marginBottom: screenWidth(120),
              marginTop: screenWidth(20),
            }}>
            <HStack justifyContent={'space-between'} zIndex={100}>
              <FlatList
                data={[1, 2]}
                renderItem={() => {
                  return (
                    <OrderCard
                      images={AppImages.Sunchhay}
                      title="Mao Keom Leang"
                      order="#00000014"
                      date="02 May,2023 10:15AM"
                      location="Street 31BT,Phnom Penh, GWJ4+97 Phnom Penh, 12351"
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

export default Indelivery;

const styles = StyleSheet.create({});
