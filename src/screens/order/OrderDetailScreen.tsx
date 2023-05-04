import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {screenWidth} from '../../theme/layouts';
import {ScrollView} from 'react-native';
import {Alert, Box, HStack} from 'native-base';
import BaseComponent from '../../component/BaseComponent';
import OrderItem from '../../component/orderDetail/OrderItem';
import SubmitButton from '../../component/custom/SubmitButton';
import colors from '../../theme/colors';
import {style} from '../../styles/style';
import CustomModal from '../../component/modal/CustomModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomRejectModal from '../../component/modal/CustomRejectModal';
import {AppImages} from '../../theme/images';
import ShopInformation from '../../component/orderDetail/ShopInfomation';
import SwipeButton from '../../component/custom/CustomSwipeButton';
import {navigate} from '../../services/navigate/navigation';
import {Routes} from '../../temp/Routes';
const OrderDetailScreen = () => {
  const [openReject, setOpenReject] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const [buttonAcceptText, setButtonAcceptText] = useState('accept_order');
  const [buttonRejectText, setButtonRejectText] = useState('rejected');
  const [statuseText, setstatuseText] = useState('Assigned');
  const [statuseColors, setstatuseColors] = useState(colors.red);

  const handleAccepted = () => {
    if (buttonAcceptText === 'accept_order') {
      setOpenConfirm(true);
      setButtonAcceptText('arrived_shop');
    } else if (buttonAcceptText === 'arrived_shop') {
      setButtonAcceptText('start_delivery');
    } else if (buttonAcceptText === 'start_delivery') {
      setstatuseText('Delivery');
      setButtonAcceptText('Finish');
    } else if (buttonAcceptText === 'Finish') {
      setstatuseText('Completed');
      setstatuseColors(colors.red);
      setOpenConfirm(true);

      navigate(Routes.MainProduct);
    }
  };
  const handleRejected = () => {
    if (buttonRejectText === 'rejected') {
      setstatuseText('rejected');
      setstatuseColors(colors.red);
      setOpenReject(true);
    }
  };

  const handleConfirm = () => {
    setOpenConfirm(false);
  };
  const handleReject = () => {
    setOpenReject(false);
  };

  return (
    <>
      <BaseComponent
        title="order_detail"
        style={{flex: 1}}
        disabledCloseKeyboard>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ShopInformation
            images={AppImages.ShopSticker}
            title="Leang Shop"
            phone="015673216"
            address="Street31BT"
          />
          <OrderItem
            orderNumber="#00000014"
            date="04 May,2023 04:11PM"
            Statuse={statuseText}
            colors={statuseColors}
            Distance="2 Km"
            payment="ABA Pay"
            total="$3.00"
          />
          <ShopInformation
            images={AppImages.Sunchhay}
            title="Reaksmey Sunchhay"
            phone="087286868"
            address="Street31BT"
          />
          <Box style={{height: screenWidth(30)}} />
        </ScrollView>
      </BaseComponent>
      <HStack style={styles.boxContainer}>
        <SubmitButton
          onPress={handleRejected}
          title="reject"
          width={'30%'}
          colors={statuseColors}
          borderRadius={screenWidth(50)}
          backgroundColor={colors.white}
          borderColor={colors.red}
          borderWidth={screenWidth(2)}
          color={colors.red}
        />

        <SubmitButton
          onPress={handleAccepted}
          title={buttonAcceptText}
          width={'65%'}
          borderRadius={screenWidth(50)}
          backgroundColor={colors.mainColor}
          borderWidth={screenWidth(2)}
          color={colors.white}
        />
        {/* <SwipeButton onToggle={handleClick} /> */}
      </HStack>
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
      <SafeAreaView style={{backgroundColor: colors.white}} />
    </>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: colors.white,
    paddingVertical: screenWidth(15),
    paddingHorizontal: screenWidth(20),
    justifyContent: 'space-between',
    borderTopLeftRadius: screenWidth(20),
    borderTopRightRadius: screenWidth(20),
    ...style.normalShadow,
    alignItems: 'center',
    elevation: screenWidth(5),
  },
  root: {
    width: '70%',
    height: screenWidth(70),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
