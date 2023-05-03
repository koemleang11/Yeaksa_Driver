import {Box, Center, HStack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';
import {AppImages} from '../../theme/images';
import {padding_horizontal, screenWidth} from '../../theme/layouts';
import {size} from '../../theme/fonts';
import {style} from '../../styles/style';
import FastImage from 'react-native-fast-image';
import {navigate} from '../../services/navigate/navigation';
import {Routes} from '../../temp/Routes';

const AccountHeader = (props: any) => {
  const [notification, setNotification] = useState(false);

  return (
    <View>
      <StatusBar translucent={false} backgroundColor={colors.mainColor} />
      <HStack style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
      </HStack>
      <HStack style={styles.profileContainer}>
        <HStack>
          <Center>
            <FastImage
              source={AppImages.Sunchhay}
              style={styles.profile}></FastImage>
          </Center>
          <VStack>
            <Text style={styles.name}>ReakSmey Sunchhay</Text>
            <Text style={styles.name}>Code: 000123</Text>
          </VStack>
        </HStack>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigate(Routes.EditProfile)}>
          <Center>
            <FastImage source={AppImages.Edit} style={styles.icon}></FastImage>
          </Center>
        </TouchableOpacity>
      </HStack>
    </View>
  );
};

export default AccountHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: screenWidth(20),
    height: screenWidth(150),
    backgroundColor: colors.mainColor,
    width: screenWidth(480),
    justifyContent: 'center',
    ...style.normalShadow,
  },
  profileContainer: {
    height: screenWidth(120),
    backgroundColor: colors.white,
    marginTop: screenWidth(-60),
    marginHorizontal: screenWidth(20),
    elevation: screenWidth(5),
    borderRadius: screenWidth(8),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: padding_horizontal,
  },
  profile: {
    width: screenWidth(70),
    height: screenWidth(70),
    overflow: 'hidden',
    borderRadius: screenWidth(50),
  },
  icon: {
    height: screenWidth(30),
    width: screenWidth(30),
  },
  title: {
    fontSize: size.font24,
    color: colors.white,
  },
  name: {
    paddingLeft: screenWidth(20),
    color: colors.black,
    fontSize: size.font20,
  },
  subtitle: {
    color: colors.white,
  },
  active: {
    backgroundColor: colors.green,
    height: screenWidth(10),
    width: screenWidth(10),
    borderRadius: screenWidth(10),
    top: screenWidth(-10),
    marginLeft: screenWidth(30),
  },
});
