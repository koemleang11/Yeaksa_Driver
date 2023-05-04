import {FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import BaseComponent from '../../../component/BaseComponent';
import {padding_horizontal, screenWidth} from '../../../theme/layouts';
import {navigate} from '../../../services/navigate/navigation';
import {Routes} from '../../../temp/Routes';
import {HStack, VStack} from 'native-base';
import SelectDate from '../../../component/dashboard/SelectDate';
import {dateFilter} from '../../../temp/Date';
import DashBoardCard from '../../../component/dashboard/DashBoardCard';
import {AppImages} from '../../../theme/images';
import OrderCard from '../../../component/dashboard/OrderCard';

const VoucherScreen = () => {
  const [selected, setSelected] = useState(dateFilter[0]);
  const [openSelected, setOpenSelected] = useState(false);

  const handleAdd = () => {
    navigate(Routes.AddVoucher);
  };

  const _renderItem = useCallback(() => {
    return;
  }, []);

  return (
    <BaseComponent
      title="my_delivery"
      style={styles.container}
      disabledCloseKeyboard>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={null}
        renderItem={() => <></>}
        ListHeaderComponent={
          <>
            <View
              style={{
                marginBottom: screenWidth(120),
              }}>
              <HStack
                style={{
                  justifyContent: 'space-between',
                  marginVertical: screenWidth(20),
                }}>
                <SelectDate
                  data={dateFilter}
                  title="All"
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
                  title="Assigned"
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
                  title="Completed"
                  isOpen={openSelected}
                  onPress={() => setOpenSelected(!openSelected)}
                  value={selected}
                  onSelectedChange={(value: any) => {
                    setSelected(value);
                    setOpenSelected(false);
                  }}
                />
              </HStack>
              <VStack style={{paddingHorizontal: padding_horizontal}}>
                <FlatList
                  data={[1, 2, 3, 4, 5, 6]}
                  renderItem={() => {
                    return (
                      <OrderCard
                        images={AppImages.Sunchhay}
                        title="ReakSmey Sunchhay"
                        order="#00000014"
                        date="02 May,2023 10:15AM"
                        Statuse="Assigned"
                        location="Street 31BT,Phnom Penh, GWJ4+97 Phnom Penh, 12351"
                      />
                    );
                  }}
                />
              </VStack>
            </View>
          </>
        }
      />
    </BaseComponent>
  );
};

export default VoucherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: screenWidth(10),
  },
});
