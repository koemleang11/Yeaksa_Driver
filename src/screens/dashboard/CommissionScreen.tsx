import {FlatList, StyleSheet, SafeAreaView, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import BaseComponent from '../../component/BaseComponent';
import PaymentStatusDropDown from '../../component/order/PaymentStatusDropDown';
import DeliveryStatusDropDown from '../../component/order/DeliveryStatusDropDown';
import {HStack, VStack} from 'native-base';
import {padding_horizontal, screenWidth} from '../../theme/layouts';
import CardItem from '../../component/order/CardItem';
import colors from '../../theme/colors';
import OrderCard from '../../component/dashboard/OrderCard';
import {AppImages} from '../../theme/images';
import SelectDate from '../../component/dashboard/SelectDate';
import {dateFilter} from '../../temp/Date';
import CommisionButton from '../../component/commission/CommisionButton';
import CommissionCard from '../../component/commission/CommissionCard';

const CommissionScreen = () => {
  const [selected, setSelected] = useState(dateFilter[0]);
  const [openSelected, setOpenSelected] = useState(false);

  const _renderItem = () => {
    return <CardItem />;
  };

  return (
    <>
      <BaseComponent
        title="Total Commission"
        style={{paddingHorizontal: padding_horizontal, flex: 1}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={null}
          renderItem={() => <></>}
          ListHeaderComponent={
            <>
              <View
                style={{
                  marginBottom: screenWidth(120),
                  marginTop: screenWidth(20),
                }}>
                <HStack
                  justifyContent={'space-between'}
                  marginBottom={screenWidth(20)}>
                  <SelectDate
                    data={dateFilter}
                    title="Today"
                    isOpen={openSelected}
                    onPress={() => setOpenSelected(!openSelected)}
                    value={selected}
                    onSelectedChange={(value: any) => {
                      setSelected(value);
                      setOpenSelected(false);
                    }}
                  />
                  <SelectDate
                    data={dateFilter}
                    title="Weekly"
                    isOpen={openSelected}
                    onPress={() => setOpenSelected(!openSelected)}
                    value={selected}
                    onSelectedChange={(value: any) => {
                      setSelected(value);
                      setOpenSelected(false);
                    }}
                  />
                  <SelectDate
                    data={dateFilter}
                    title="Monthly"
                    isOpen={openSelected}
                    onPress={() => setOpenSelected(!openSelected)}
                    value={selected}
                    onSelectedChange={(value: any) => {
                      setSelected(value);
                      setOpenSelected(false);
                    }}
                  />
                </HStack>
                <VStack style={styles.buttonContainer}>
                  <CommisionButton
                    images={AppImages.Order}
                    title="Total Order"
                    value="$1550.00"
                  />
                  <CommisionButton
                    images={AppImages.Order}
                    title="Total Order"
                    value="$1550.00"
                  />
                  <CommisionButton
                    images={AppImages.Order}
                    title="Total Order"
                    value="$1550.00"
                  />
                  <CommisionButton
                    images={AppImages.Order}
                    title="Total Order"
                    value="$1550.00"
                  />
                </VStack>
                <FlatList
                  data={[1, 2, 3, 4]}
                  renderItem={() => {
                    return (
                      <CommissionCard
                        images={AppImages.Sunchhay}
                        name="Mao Keom Leang"
                        title="2 Km"
                        date="02 May,2023 10:15AM"
                        commision="$3.00"
                        Statuse="Completed"
                        location="Street 31BT,Phnom Penh, GWJ4+97 Phnom Penh, 12351"
                      />
                    );
                  }}
                />
                {/* </HStack> */}
              </View>
            </>
          }
        />
      </BaseComponent>
      <SafeAreaView style={{backgroundColor: colors.mainColor}} />
    </>
  );
};

export default CommissionScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: screenWidth(10),
    paddingHorizontal: padding_horizontal,
    backgroundColor: colors.white,
    paddingVertical: screenWidth(10),
    borderRadius: screenWidth(15),
    marginBottom: screenWidth(20),
    elevation: screenWidth(5),
  },
});
