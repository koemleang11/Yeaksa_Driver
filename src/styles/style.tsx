import { StyleSheet } from 'react-native';
import { Battambang, BattambangBold, PoppinBold, PoppinMedium } from '../services/config/fonts';
import colors from '../theme/colors';
import { size } from '../theme/fonts';
import { screenWidth } from '../theme/layouts';

export const style = StyleSheet.create({
  poppinsMedium: {
    ...PoppinMedium
  },
  poppinsBold: {
    ...PoppinBold
  },
  battambang: {
    ...Battambang
  },
  battambangBold: {
    ...BattambangBold
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  normalShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,

    elevation: 0.2,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,

    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textInput: {
    minWidth: screenWidth(120),
    fontSize: size.font18,
    color: colors.black,
    ...Battambang,
    backgroundColor: colors.white,
    paddingHorizontal: screenWidth(25),
    height: screenWidth(60),
    borderRadius: screenWidth(10),
  },
  labelTextInput: {
    fontSize: size.font18,
    color: colors.grayColor,
    marginLeft: screenWidth(3),
    marginBottom: screenWidth(5),
    marginTop: screenWidth(15),
  },
});
