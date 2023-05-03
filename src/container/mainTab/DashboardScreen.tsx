import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import DashboardHeader from '../../component/dashboard/DashboardHeader';
import colors from '../../theme/colors';
import {AppImages} from '../../theme/images';
import {HStack, VStack} from 'native-base';
import DashBoardCard from '../../component/dashboard/DashBoardCard';
import {padding_horizontal, screenWidth} from '../../theme/layouts';
import {style} from '../../styles/style';
import {size} from '../../theme/fonts';
import OrderCard from '../../component/dashboard/OrderCard';
import {navigate} from '../../services/navigate/navigation';
import {Routes} from '../../temp/Routes';
import CustomModal from '../../component/modal/CustomModal';
import CustomRejectModal from '../../component/modal/CustomRejectModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {dateFilter} from '../../temp/Date';
import SelectDate from '../../component/dashboard/SelectDate';
import {TouchableOpacity} from 'react-native';

const DashboardScreen = () => {
  const [openReject, setOpenReject] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selected, setSelected] = useState(dateFilter[0]);
  const [openSelected, setOpenSelected] = useState(false);

  const handleConfirm = () => {
    setOpenConfirm(false);
  };
  const handleReject = () => {
    setOpenReject(false);
  };
  return (
    <>
      <VStack flex={1}>
        <StatusBar barStyle={'dark-content'} />
        <SafeAreaView style={{backgroundColor: colors.white}} />
        <DashboardHeader />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={null}
          renderItem={() => <></>}
          ListHeaderComponent={
            <>
              <>
                <FlatList
                  style={{marginTop: screenWidth(60)}}
                  showsVerticalScrollIndicator={false}
                  data={null}
                  renderItem={() => <></>}
                  ListHeaderComponent={
                    <View
                      style={{
                        marginBottom: screenWidth(120),
                      }}>
                      <HStack
                        style={{
                          justifyContent: 'space-between',
                          marginHorizontal: screenWidth(20),
                          marginBottom: screenWidth(20),
                        }}>
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
                      <HStack
                        style={{
                          justifyContent: 'space-between',
                          marginHorizontal: padding_horizontal,
                        }}>
                        <DashBoardCard
                          value="25"
                          title="Total Assigned"
                          icon={AppImages.Assigned}
                          onPress={() => navigate(Routes.Assigned)}
                        />
                        <DashBoardCard
                          title="Total Accepted"
                          value="5"
                          icon={AppImages.Rating}
                          size={screenWidth(25)}
                        />
                      </HStack>
                      <HStack
                        style={{
                          justifyContent: 'space-between',
                          marginHorizontal: padding_horizontal,
                        }}>
                        <DashBoardCard
                          title="In Delivery"
                          value="20"
                          icon={AppImages.Order}
                          onPress={() => navigate(Routes.Indelivery)}
                        />
                        <DashBoardCard
                          title="Total Commission"
                          value="$35"
                          icon={AppImages.TotalSale}
                          size={screenWidth(22)}
                          onPress={() => navigate(Routes.Commission)}
                        />
                      </HStack>
                      <HStack
                        style={{
                          ...style.row,
                          paddingHorizontal: padding_horizontal,
                          paddingVertical: screenWidth(20),
                        }}>
                        <Text style={styles.recentlyText}>
                          Recently Assigned
                        </Text>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => navigate(Routes.Assigned)}>
                          <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                      </HStack>
                      <VStack style={{paddingHorizontal: padding_horizontal}}>
                        <FlatList
                          data={[1, 2, 3]}
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
                  }
                />
              </>
            </>
          }
        />
      </VStack>
      <CustomModal
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        title="are_you_sure"
        subTitle="you_want_to_confirm_this_order"
        firstButton="no"
        secondButton="yes"
        icon={
          <FontAwesome
            name="question"
            color={colors.white}
            size={screenWidth(44)}
          />
        }
        firstButtonPress={() => setOpenConfirm(false)}
        secondButtonPress={handleConfirm}
      />
      <CustomRejectModal
        isOpen={openReject}
        onClose={() => setOpenReject(false)}
        title="are_you_sure"
        subTitle="you_want_to_reject_this_order"
        firstButton="cancel"
        secondButton="confirm"
        icon={
          <FontAwesome
            name="question"
            color={colors.white}
            size={screenWidth(44)}
          />
        }
        firstButtonPress={() => setOpenReject(false)}
        secondButtonPress={handleReject}
      />
      <SafeAreaView style={{backgroundColor: colors.mainColor}} />
    </>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: size.font22,
    color: colors.black,
    marginLeft: screenWidth(5),
    marginBottom: screenWidth(5),
  },
  recentlyText: {
    fontSize: size.font22,
    color: colors.black,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: size.font22,
    color: colors.red,
    fontWeight: 'bold',
  },
});
